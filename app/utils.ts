import { trackLead } from "@/lib/analytics";

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
    company?: string;
    employees?: string;
    message?: string;
    origin?: string;
    /** De onde o lead veio, em uma frase: "Instagram (campanha: x)", "Direto". */
    source?: string;
};

/**
 * Cria a oportunidade no PipeRun. Best-effort, igual ao ClickUp: o lead já
 * está garantido no Sheets, então uma falha aqui não bloqueia o usuário.
 */
export const sendCrmLead = async (lead: SheetLead) => {
    try {
        const response = await fetch("/api/crm-lead", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(lead),
        });

        const result = await response.json();

        if (!result?.ok) {
            console.warn("sendCrmLead não registrou a oportunidade:", result);
        }

        return result;
    } catch (err) {
        console.warn("sendCrmLead falhou (ignorado):", err);
        return { ok: false };
    }
};

export const sendSheetLead = async (lead: SheetLead) => {
    const response = await fetch("/api/update-sheet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(lead),
    });

    const body = await response.text();

    if (!response.ok) {
        throw new Error(body || `Falha ao gravar lead (${response.status})`);
    }

    trackLead();

    return body;
};