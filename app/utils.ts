import { trackLead } from "@/lib/analytics";

export const sendClickupLead = async (title: string, description: string) => {
    const response = await fetch("/api/update-clickup", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
    });

    // A rota pode responder com texto puro em caso de erro inesperado —
    // por isso o parse é tolerante, nunca lança por corpo não-JSON.
    const raw = await response.text();
    let data: any = null;
    try {
        data = raw ? JSON.parse(raw) : null;
    } catch {
        data = { ok: response.ok, raw };
    }

    if (!response.ok) {
        throw new Error(data?.error || `Falha ao enviar lead (${response.status})`);
    }

    trackLead();

    return data;
}

export type SheetLead = {
    name: string;
    email: string;
    whatsapp?: string;
    message?: string;
    origin?: string;
};

// Grava o lead na planilha do Google Sheets (colunas separadas).
// Fire-and-forget: nunca lança nem bloqueia o fluxo — falha só vai para o console.
export const sendSheetLead = async (lead: SheetLead) => {
    try {
        await fetch("/api/update-sheet", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lead),
        });
    } catch (err) {
        console.error("sendSheetLead falhou:", err);
    }
};