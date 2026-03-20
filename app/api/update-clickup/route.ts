export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  if (!data.title || !data.description) {
    return new Response("Title and description are required", { status: 400 });
  }

  console.log(data)

  const response = await fetch(
    `https://api.clickup.com/api/v2/list/901317677882/task`,
    {
      method: "POST",
      headers: {
        Authorization: process.env.CLICKUP_API_KEY || "",
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

  await response.json()

  return new Response("OK", { status: 200 });
}