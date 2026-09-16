export const runtime = "nodejs";

const CRM_BASE = "https://api.pipe.run/v1";

const PIPELINE_ID = Number(process.env.CRM_PIPELINE_ID || 80972);
const STAGE_ID = Number(process.env.CRM_STAGE_ID || 629576);
const ORIGIN_ID = Number(process.env.CRM_ORIGIN_ID || 714765);

type CrmLead = {
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  employees?: string;
  clients?: string;
  message?: string;
  origin?: string;
};

async function crm(path: string, init: RequestInit = {}) {
  const res = await fetch(`${CRM_BASE}${path}`, {
    ...init,
    headers: {
      token: process.env.CRM_KEY || "",
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const body = await res.text();

  if (!res.ok) {
    throw new Error(
      `PipeRun ${init.method || "GET"} ${path} -> ${res.status}: ${body.slice(0, 300)}`
    );
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new Error(`PipeRun ${path} devolveu resposta nao-JSON: ${body.slice(0, 200)}`);
  }
}

async function findOrCreateCompany(name?: string): Promise<number | null> {
  const clean = name?.trim();
  if (!clean) return null;

  const found = await crm(`/companies?name=${encodeURIComponent(clean)}&show=20`);
  const match = (found?.data ?? []).find(
    (c: { id: number; name: string }) =>
      c.name?.trim().toLowerCase() === clean.toLowerCase()
  );
  if (match) return match.id;

  const created = await crm("/companies", {
    method: "POST",
    body: JSON.stringify({ name: clean }),
  });
  return created?.data?.id ?? null;
}

async function findOrCreatePerson(
  lead: CrmLead,
  companyId: number | null
): Promise<number | null> {
  const email = lead.email.trim();

  const found = await crm(`/persons?email=${encodeURIComponent(email)}&show=5`);
  const existing = found?.data?.[0];
  if (existing?.id) return existing.id;

  const observation = [
    lead.employees ? `Colaboradores: ${lead.employees}` : null,
    lead.clients ? `Quantidade de clientes: ${lead.clients}` : null,
    lead.company ? `Empresa: ${lead.company}` : null,
    lead.message ? `Mensagem: ${lead.message}` : null,
    lead.origin ? `Origem do formulario: ${lead.origin}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const created = await crm("/persons", {
    method: "POST",
    body: JSON.stringify({
      name: lead.name.trim(),
      contactEmails: [email],
      contactPhones: lead.whatsapp ? [lead.whatsapp.trim()] : [],
      ...(companyId ? { company_id: companyId } : {}),
      ...(observation ? { observation } : {}),
    }),
  });
  return created?.data?.id ?? null;
}

function buildTitle(lead: CrmLead) {
  const company = lead.company?.trim();
  const employees = lead.employees?.trim();

  if (company && employees) return `${company} (${employees} colab.)`;
  if (company) return company;
  return lead.name.trim();
}

export async function POST(request: Request) {
  let lead: CrmLead;

  try {
    lead = await request.json();
  } catch {
    return Response.json({ ok: false, error: "JSON invalido" }, { status: 400 });
  }

  if (!lead?.name || !lead?.email) {
    return Response.json(
      { ok: false, error: "name e email sao obrigatorios" },
      { status: 400 }
    );
  }

  if (!process.env.CRM_KEY) {
    console.error("PipeRun: CRM_KEY ausente - lead nao foi para o CRM");
    return Response.json({ ok: false, skipped: "CRM_KEY ausente" });
  }

  try {
    const companyId = await findOrCreateCompany(lead.company);
    const personId = await findOrCreatePerson(lead, companyId);

    const deal = await crm("/deals", {
      method: "POST",
      body: JSON.stringify({
        pipeline_id: PIPELINE_ID,
        stage_id: STAGE_ID,
        title: buildTitle(lead),
        reference: `LP acellerador.com.br${lead.origin ? ` - ${lead.origin}` : ""}`,
        ...(personId ? { person_id: personId } : {}),
        ...(companyId ? { company_id: companyId } : {}),
        ...(ORIGIN_ID ? { origin_id: ORIGIN_ID } : {}),
      }),
    });

    return Response.json({
      ok: true,
      dealId: deal?.data?.id ?? null,
      personId,
      companyId,
    });
  } catch (err) {
    console.error("PipeRun: falha ao registrar lead:", err);
    return Response.json({ ok: false });
  }
}