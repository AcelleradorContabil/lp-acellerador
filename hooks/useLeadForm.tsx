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

const PHONE_DIGITS = 11; // DDD (2) + 9 dígitos

/** Aplica a máscara (51) 99343-7038 conforme o usuário digita. */
export const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, PHONE_DIGITS);

    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const isValidPhone = (value: string) =>
    value.replace(/\D/g, "").length === PHONE_DIGITS;

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
        setValues((prev) => ({
        ...prev,
        [field]: field === "whatsapp" ? formatPhone(value) : value,
        }));

    const isValid =
        REQUIRED_FIELDS.every((field) => !!values[field].trim()) &&
        isValidPhone(values.whatsapp);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!REQUIRED_FIELDS.every((field) => !!values[field].trim())) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return false;
        }

        if (!isValidPhone(values.whatsapp)) {
        toast.error("Informe um WhatsApp válido com DDD e 9 dígitos.");
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

        // allSettled, não all: uma integração fora do ar não pode derrubar as
        // outras nem — principalmente — impedir que a pessoa caia no WhatsApp.
        // Antes, uma falha só do Sheets gravava o lead no CRM e mesmo assim
        // fechava a aba do WhatsApp já aberta.
        const results = await Promise.allSettled([
        sendClickupLead(values.name, description),
        sendCrmLead({ ...values, origin }),
        sendSheetLead({ ...values, origin, source }),
        ]);

        const failed = results.filter((r) => r.status === "rejected");
        if (failed.length) {
        console.error("Falha parcial ao registrar o lead:", failed);
        }

        setValues(EMPTY_VALUES);
        setSubmitting(false);
        onSuccess?.();
        return true;
    };

    return { values, setField, submitting, isValid, submit };
};