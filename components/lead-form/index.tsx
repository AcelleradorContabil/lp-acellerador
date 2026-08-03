import React, { useEffect, useState } from "react";
import { sendClickupLead } from "@/app/utils";
import toast from "react-hot-toast";

const LeadForm = () => {
    const [emailData, setEmailData] = useState({
        name: "",
        email: "",
        whatsapp: "",
        message: "",
        check_terms: false,
    });

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!emailData.name || !emailData.email || !emailData.whatsapp) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
        }

        if (!emailData.check_terms) {
        toast.error("Por favor, aceite os termos para continuar");
        return;
        }

        const title = emailData.name;
        const description = `
        Email: ${emailData.email}
        Whatsapp: ${emailData.whatsapp}
        Mensagem: ${emailData.message}
        `;

        sendClickupLead(title, description);
        toast.success(
        "Seu contato foi salvo com sucesso em nossa base de dados. Em breve nossa equipe entrará em contato!"
        );
        setEmailData({
        name: "",
        email: "",
        whatsapp: "",
        message: "",
        check_terms: false,
        });
    };

    return (
        <form
        onSubmit={(e) => handleSave(e)}
        className="flex flex-col gap-3 items-center text-black"
        >
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="text"
            placeholder="Seu Nome *"
            value={emailData.name}
            onChange={(e) => setEmailData({ ...emailData, name: e.target.value })}
        />
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="email"
            placeholder="Seu Email *"
            value={emailData.email}
            onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
        />
        <input
            className="p-3 w-full outline-none caret-mainOrange rounded-md"
            type="text"
            placeholder="Seu Whatsapp *"
            value={emailData.whatsapp}
            onChange={(e) =>
            setEmailData({ ...emailData, whatsapp: e.target.value })
            }
        />
        <textarea
            rows={5}
            placeholder="Sua mensagem"
            className="w-full resize-none p-3 outline-none caret-mainOrange rounded-md"
            value={emailData.message}
            onChange={(e) =>
            setEmailData({ ...emailData, message: e.target.value })
            }
        />
        <label className="text-white gap-1 flex">
            <input
            type="checkbox"
            className="accent-mainOrange"
            checked={emailData.check_terms}
            onChange={(e) =>
                setEmailData({ ...emailData, check_terms: e.target.checked })
            }
            />
            <span>
            Autorizo que os dados preenchidos acima sejam utilizados para nosso
            contato comercial.
            </span>
        </label>
        <button
            className="p-2 bg-mainOrange rounded-md w-1/2 text-white"
            type="submit"
        >
            Enviar
        </button>
        </form>
    );
};

export { LeadForm };