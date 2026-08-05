import crypto from "crypto";

// Roda no runtime Node (precisamos do módulo crypto para assinar o JWT).
export const runtime = "nodejs";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL || "";
// A chave vem do .env com "\n" literais — convertemos de volta para quebras reais.
const PRIVATE_KEY = (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n");
const SHEET_TAB = process.env.GOOGLE_SHEET_TAB || "Leads";

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

// Assina um JWT com a service account e troca por um access token OAuth2.
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(
    JSON.stringify(claim)
  )}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsigned);
  const signature = base64url(signer.sign(PRIVATE_KEY));
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    throw new Error(`Falha ao obter token: ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp, message, origin } = await request.json();

    if (!name || !email) {
      return new Response("name e email são obrigatórios", { status: 400 });
    }

    if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
      console.error("Google Sheets não configurado (variáveis de ambiente ausentes)");
      return new Response("Google Sheets não configurado", { status: 500 });
    }

    // A private_key correta é um bloco PEM. Se não for, o erro é de configuração
    // (provavelmente colaram o private_key_id no lugar da private_key).
    if (!PRIVATE_KEY.includes("BEGIN PRIVATE KEY")) {
      console.error(
        "GOOGLE_SHEETS_PRIVATE_KEY inválida: esperado bloco PEM (-----BEGIN PRIVATE KEY-----). " +
          "Confira se você colou o campo 'private_key' do JSON, e não o 'private_key_id'."
      );
      return new Response("Chave privada inválida (ver terminal)", { status: 500 });
    }

    let token: string;
    try {
      token = await getAccessToken();
    } catch (err) {
      console.error("Falha na autenticação da service account:", err);
      return new Response("Falha de autenticação (ver terminal)", { status: 500 });
    }

    const timestamp = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    const row = [
      timestamp,
      name,
      email,
      whatsapp || "",
      message || "",
      origin || "",
    ];

    const range = `${SHEET_TAB}!A:F`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro ao gravar no Sheets:", text);
      return new Response(text, { status: 502 });
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("update-sheet error:", err);
    return new Response("Erro interno", { status: 500 });
  }
}
