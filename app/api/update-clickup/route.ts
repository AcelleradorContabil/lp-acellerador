export async function POST(request: Request) {
  const data = await request.json();

  if (!data.title || !data.description) {
    return Response.json({ ok: false, error: "Title and description are required" });
  }

  if (!process.env.CLICKUP_API_KEY) {
    return Response.json({ ok: false, skipped: "CLICKUP_API_KEY ausente" });
  }

  try {
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
      console.warn(
        "ClickUp (descontinuado) recusou a task:",
        response.status,
        (await response.text()).slice(0, 200)
      );
      return Response.json({ ok: false });
    }

    const task = await response.json();
    return Response.json({ ok: true, id: task?.id ?? null });
  } catch (err) {
    console.warn("ClickUp (descontinuado) indisponível:", err);
    return Response.json({ ok: false });
  }
}
