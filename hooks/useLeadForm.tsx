"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { sendClickupLead, sendCrmLead, sendSheetLead } from "@/app/utils";
import { getLeadSource } from "@/lib/lead-source";

export type LeadFormValues = {
    name: string;
    email: string;
    whatsapp: string;
    company: string;
    employees: string;
    message: string;
};

const EMPTY_VALUES: LeadFormValues = {
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    employees: "",
    message: "",
};

const REQUIRED_FIELDS: (keyof LeadFormValues)[] = [
    "name",
    "email",
    "whatsapp",
    "company",
    "employees",
];

export const useLeadForm = (origin: string, onSuccess?: () => void) => {
    const [values, setValues] = useState<LeadFormValues>(EMPTY_VALUES);
    const [submitting, setSubmitting] = useState(false);

    const setField = (field: keyof LeadFormValues, value: string) =>
        setValues((prev) => ({ ...prev, [field]: value }));

    const isValid = REQUIRED_FIELDS.every((field) => !!values[field].trim());

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!isValid) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return false;
        }

        setSubmitting(true);

        const source = getLeadSource();

        const description = [
        `Email: ${values.email}`,
        `WhatsApp: ${values.whatsapp}`,
        `Empresa: ${values.company}`,
        `Colaboradores: ${values.employees}`,
        `Mensagem: ${values.message}`,
        `Origem: ${origin}`,
        ].join("\n");

        try {
        await Promise.all([
            sendClickupLead(values.name, description),
            sendCrmLead({ ...values, origin }),
            sendSheetLead({ ...values, origin, source }),
        ]);
        setValues(EMPTY_VALUES);
        onSuccess?.();
        return true;
        } catch (err) {
        console.error("Falha ao enviar lead:", err);
        toast.error("Não foi possível enviar. Tente novamente.");
        return false;
        } finally {
        setSubmitting(false);
        }
    };

    return { values, setField, submitting, isValid, submit };
};