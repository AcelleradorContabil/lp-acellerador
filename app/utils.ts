import { trackLead } from "@/lib/analytics";

// ClickUp foi descontinuado internamente. Mantemos o envio como best-effort:
// nunca lança, nunca bloqueia o formulário e nunca decide o sucesso do envio.
// Qualquer falha fica só no console — quem manda é o Google Sheets.
export const sendClickupLead = async (title: string, description: string) => {
    try {
        await fetch("/api/update-clickup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, description }),
        });
    } catch (err) {
        console.warn("sendClickupLead falhou (ignorado):", err);
    }
};

export type SheetLead = {
    name: string;
    email: string;
    whatsapp?: string;
    message?: string;
    origin?: string;
};

// Grava o lead na planilha do Google Sheets (colunas separadas).
// Esta é a fonte de verdade do envio: lança em caso de falha para que o
// formulário mostre erro, e só dispara a conversão do Pixel se gravou mesmo.
export const sendSheetLead = async (lead: SheetLead) => {
    const response = await fetch("/api/update-sheet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
    });

    // A rota responde com texto puro ("OK" ou a mensagem de erro).
    const body = await response.text();

    if (!response.ok) {
        throw new Error(body || `Falha ao gravar lead (${response.status})`);
    }

    trackLead();

    return body;
};
