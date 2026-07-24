import { trackLead } from "@/lib/analytics";

export const sendClickupLead = async (title: string, description: string) => {
  const response = await fetch("/api/update-clickup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  const data = await response.json();

  // Dispara o evento de conversão "Lead" do Meta Pixel a cada formulário enviado.
  if (response.ok) {
    trackLead();
  }

  return data;
}