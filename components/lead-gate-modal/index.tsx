"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, X } from "lucide-react";
import toast from "react-hot-toast";
import { sendClickupLead, sendSheetLead } from "@/app/utils";
import { useWhatsappGate } from "@/app/whatsapp-gate-context";
import { GlassInput } from "@/components/glass-input";

const LeadGateModal = () => {
    const { isOpen, pendingUrl, close, markCaptured } = useWhatsappGate();
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        whatsapp: "",
        message: "",
        terms: false,
    });

    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
        document.body.style.overflow = prev;
        };
    }, [isOpen]);

    const handleClose = () => close();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!form.name || !form.email || !form.whatsapp) {
        toast.error("Por favor, preencha todos os campos obrigatórios.");
        return;
        }

        if (!form.terms) {
        toast.error("Por favor, aceite os termos para continuar.");
        return;
        }

        setSubmitting(true);

        const waWindow = pendingUrl ? window.open("about:blank", "_blank") : null;
        if (waWindow) waWindow.opener = null;

        const description = `
        Email: ${form.email}
        Whatsapp: ${form.whatsapp}
        Mensagem: ${form.message}
        Origem: ${pendingUrl ? "Botão de WhatsApp (formulário)" : "Formulário automático (5s)"}
        `;

        try {
        sendClickupLead(form.name, description);
        await sendSheetLead({
            name: form.name,
            email: form.email,
            whatsapp: form.whatsapp,
            message: form.message,
            origin: pendingUrl
            ? "Botão de WhatsApp (formulário)"
            : "Formulário automático (5s)",
        });
        markCaptured();

        if (pendingUrl) {
            if (waWindow) waWindow.location.href = pendingUrl;
            else window.location.href = pendingUrl;
        } else {
            toast.success("Obrigado! Em breve nossa equipe entrará em contato.");
        }

        close();
        } catch {
        waWindow?.close();
        toast.error("Não foi possível enviar. Tente novamente.");
        } finally {
        setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
        {isOpen && (
            <>
            {/* Backdrop — clicar fecha */}
            <motion.div
                key="lead-gate-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={handleClose}
                className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                key="lead-gate-modal"
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
            >
                <div
                className="relative w-full max-w-md flex flex-col pointer-events-auto rounded-t-2xl sm:rounded-2xl overflow-hidden"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow:
                    "0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
                >
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Botão fechar */}
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Fechar"
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-white/30 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200"
                >
                    <X className="w-5 h-5" strokeWidth={2} />
                </button>

                <div className="p-5 md:p-7 flex flex-col gap-5">
                    <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                        {pendingUrl ? "Antes de continuar" : "Fale com a gente"}
                    </h3>
                    <p className="text-sm text-white/40">
                        {pendingUrl
                        ? "Deixe seus dados e te levamos direto para o WhatsApp."
                        : "Nossa equipe responde em até 24 horas úteis."}
                    </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <GlassInput
                        icon={User}
                        placeholder="Seu nome *"
                        value={form.name}
                        onChange={(v) => setForm({ ...form, name: v })}
                    />
                    <GlassInput
                        icon={Mail}
                        type="email"
                        placeholder="Seu e-mail *"
                        value={form.email}
                        onChange={(v) => setForm({ ...form, email: v })}
                    />
                    <GlassInput
                        icon={Phone}
                        placeholder="Seu WhatsApp *"
                        value={form.whatsapp}
                        onChange={(v) => setForm({ ...form, whatsapp: v })}
                    />
                    <GlassInput
                        icon={MessageSquare}
                        textarea
                        rows={4}
                        placeholder="Mensagem (opcional)"
                        value={form.message}
                        onChange={(v) => setForm({ ...form, message: v })}
                    />

                    <label className="flex items-start gap-2.5 cursor-pointer group">
                        <div
                        onClick={() => setForm({ ...form, terms: !form.terms })}
                        className={`
                            mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center
                            transition-all duration-200
                            ${form.terms ? "bg-mainOrange border-mainOrange" : "border-white/25 bg-white/[0.05]"}
                        `}
                        >
                        {form.terms && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-xs text-white/40 leading-relaxed">
                        Autorizo o uso dos dados acima para contato comercial.
                        </span>
                    </label>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                        bg-mainOrange text-white text-sm font-bold mt-1
                        hover:brightness-110 hover:shadow-[0_0_28px_rgba(231,103,20,0.55)]
                        active:scale-[0.98] transition-all duration-200
                        disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Enviando..." : (
                        <>
                            <Send className="w-4 h-4" />
                            {pendingUrl ? "Ir para o WhatsApp" : "Enviar mensagem"}
                        </>
                        )}
                    </button>
                    </form>
                </div>
                </div>
            </motion.div>
            </>
        )}
        </AnimatePresence>
    );
};

export { LeadGateModal };