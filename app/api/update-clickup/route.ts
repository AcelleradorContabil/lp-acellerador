export async function POST(request: Request) {
  const data = await request.json();

  if (!data.title || !data.description) {
    return Response.json(
      { ok: false, error: "Title and description are required" },
      { status: 400 }
    );
  }

  if (!process.env.CLICKUP_API_KEY) {
    console.error("CLICKUP_API_KEY ausente no .env");
    return Response.json(
      { ok: false, error: "ClickUp não configurado" },
      { status: 500 }
    );
  }

  const response = await fetch(
    `https://api.clickup.com/api/v2/list/901317677882/task`,
    {
      method: "POST",
      headers: {
        Authorization: process.env.CLICKUP_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${data.title}`,
        description: `${data.description}`,
        start_date: new Date().getTime(),
        start_date_time: true,
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("Erro ao criar task no ClickUp:", response.status, text);
    return Response.json(
      { ok: false, error: "Falha ao criar task no ClickUp" },
      { status: 502 }
    );
  }

  const task = await response.json();

  return Response.json({ ok: true, id: task?.id ?? null });
}
