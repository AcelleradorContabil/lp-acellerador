"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Mail,
    Phone,
    Building2,
    Users,
    MessageSquare,
    Send,
    X,
} from "lucide-react";
import toast from "react-hot-toast";
import { useLeadGate } from "@/app/lead-gate-context";
import { useLeadForm } from "@/hooks/useLeadForm";
import { GlassInput } from "@/components/glass-input";

const LeadGateModal = () => {
    const { isOpen, pendingAction, close, markCaptured } = useLeadGate();
    const { values, setField, submitting, isValid, submit } = useLeadForm(
        pendingAction ? "Formulário de acesso (CTA)" : "Formulário automático (5s)"
    );

    const handleSubmit = async (event: React.FormEvent) => {
        // A aba precisa ser aberta ANTES do await, senão o navegador bloqueia
        // o popup por não estar mais dentro do gesto do usuário.
        const target =
        isValid && pendingAction?.type === "url"
            ? window.open("about:blank", "_blank")
            : null;
        if (target) target.opener = null;

        const sent = await submit(event);

        if (!sent) {
        target?.close();
        return;
        }

        markCaptured();

        if (pendingAction?.type === "url") {
        if (target) target.location.href = pendingAction.url;
        else window.location.href = pendingAction.url;
        } else if (pendingAction?.type === "run") {
        pendingAction.run();
        } else {
        toast.success("Obrigado! Em breve nossa equipe entrará em contato.");
        }

        close();
    };

    useEffect(() => {
        if (!isOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
        document.body.style.overflow = prev;
        };
    }, [isOpen]);

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
                onClick={close}
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
                className="relative w-full max-w-md max-h-[92vh] sm:max-h-[90vh] overflow-y-auto flex flex-col pointer-events-auto rounded-t-2xl sm:rounded-2xl"
                style={{
                    background: "rgba(6,28,54,0.92)",
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
                    onClick={close}
                    aria-label="Fechar"
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full text-white/30 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200"
                >
                    <X className="w-5 h-5" strokeWidth={2} />
                </button>

                <div className="p-5 md:p-7 flex flex-col gap-5">
                    <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                        {pendingAction ? "Antes de continuar" : "Fale com a gente"}
                    </h3>
                    <p className="text-sm text-white/40">
                        {pendingAction
                        ? "Deixe seus dados uma única vez e siga navegando à vontade."
                        : "Nossa equipe responde em até 24 horas úteis."}
                    </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <GlassInput
                        icon={User}
                        placeholder="Seu nome *"
                        value={values.name}
                        onChange={(v) => setField("name", v)}
                    />
                    <GlassInput
                        icon={Mail}
                        type="email"
                        placeholder="Seu e-mail *"
                        value={values.email}
                        onChange={(v) => setField("email", v)}
                    />
                    <GlassInput
                        icon={Phone}
                        placeholder="Seu WhatsApp *"
                        value={values.whatsapp}
                        onChange={(v) => setField("whatsapp", v)}
                    />
                    <GlassInput
                        icon={Building2}
                        placeholder="Nome da sua empresa *"
                        value={values.company}
                        onChange={(v) => setField("company", v)}
                    />
                    <GlassInput
                        icon={Users}
                        type="number"
                        min={1}
                        inputMode="numeric"
                        placeholder="Quantidade de colaboradores *"
                        value={values.employees}
                        onChange={(v) => setField("employees", v)}
                    />
                    <GlassInput
                        icon={MessageSquare}
                        textarea
                        rows={3}
                        placeholder="Mensagem (opcional)"
                        value={values.message}
                        onChange={(v) => setField("message", v)}
                    />

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
                            {pendingAction ? "Enviar e continuar" : "Enviar mensagem"}
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
