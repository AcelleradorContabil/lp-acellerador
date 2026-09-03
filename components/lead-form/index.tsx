import React from "react";
import toast from "react-hot-toast";
import { useLeadForm } from "@/hooks/useLeadForm";
import { useLeadGate } from "@/app/lead-gate-context";

const LeadForm = () => {
    const { markCaptured } = useLeadGate();
    const { values, setField, submitting, submit } = useLeadForm(
        "Formulário (lead-form)",
        () => {
        markCaptured();
        toast.success(
            "Seu contato foi salvo com sucesso em nossa base de dados. Em breve nossa equipe entrará em contato!"
        );
        }
    );

    return (
        <form
        onSubmit={submit}
        className="flex flex-col gap-3 items-center text-black"
        >
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="text"
            placeholder="Seu Nome *"
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
        />
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="email"
            placeholder="Seu Email *"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
        />
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="tel"
            inputMode="tel"
            placeholder="Seu Whatsapp *"
            value={values.whatsapp}
            onChange={(e) => setField("whatsapp", e.target.value)}
        />
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="text"
            placeholder="Nome da sua empresa *"
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
        />
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="number"
            min={1}
            inputMode="numeric"
            placeholder="Quantidade de colaboradores *"
            value={values.employees}
            onChange={(e) => setField("employees", e.target.value)}
        />
        <textarea
            rows={5}
            placeholder="Sua mensagem"
            className="w-full resize-none p-3 outline-none caret-mainOrange rounded-md"
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
        />
        <button
            className="p-2 bg-mainOrange rounded-md w-1/2 text-white disabled:opacity-60"
            type="submit"
            disabled={submitting}
        >
            {submitting ? "Enviando..." : "Enviar"}
        </button>
        </form>
    );
};

export { LeadForm };
