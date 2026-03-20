export const sendClickupLead = async (title: string, description: string) => {
  const response = await fetch("/api/update-clickup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  return await response.json();
}