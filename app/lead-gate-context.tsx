"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { trackCtaClick, type CtaLocation } from "@/lib/analytics";
import { captureLeadSource } from "@/lib/lead-source";

const CAPTURED_KEY = "lead_captured";
const DISMISSED_KEY = "lead_gate_dismissed";
const AUTO_OPEN_DELAY_MS = 5000;

export type GatedAction =
    | { type: "url"; url: string }
    | { type: "run"; run: () => void };

type LeadGateContextType = {
    isOpen: boolean;
    captured: boolean;
    pendingAction: GatedAction | null;
    requireLead: (location: CtaLocation, action: GatedAction) => void;
    close: () => void;
    markCaptured: () => void;
};

const Context = createContext<LeadGateContextType | null>(null);

export const runGatedAction = (action: GatedAction) => {
    if (action.type === "url") {
        window.open(action.url, "_blank", "noopener,noreferrer");
    } else {
        action.run();
    }
};

const LeadGateProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    const [pendingAction, setPendingAction] = useState<GatedAction | null>(null);
    const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearAutoTimer = useCallback(() => {
        if (autoTimer.current) {
        clearTimeout(autoTimer.current);
        autoTimer.current = null;
        }
    }, []);

    useEffect(() => {
        // Antes de qualquer coisa: a URL ainda tem os parâmetros de campanha.
        captureLeadSource();
        // O gate vale por sessão, não para sempre: quem voltar noutro dia
        // preenche de novo. Limpa o registro antigo em localStorage, que
        // deixava os CTAs pulando o formulário permanentemente.
        localStorage.removeItem(CAPTURED_KEY);
        setCaptured(sessionStorage.getItem(CAPTURED_KEY) === "true");
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (!hydrated || captured) return;
        if (sessionStorage.getItem(DISMISSED_KEY) === "true") return;

        autoTimer.current = setTimeout(() => {
        setPendingAction(null);
        setIsOpen(true);
        }, AUTO_OPEN_DELAY_MS);

        return () => clearAutoTimer();
    }, [hydrated, captured, clearAutoTimer]);

    const markCaptured = useCallback(() => {
        sessionStorage.setItem(CAPTURED_KEY, "true");
        setCaptured(true);
        clearAutoTimer();
    }, [clearAutoTimer]);

    const requireLead = useCallback(
        (location: CtaLocation, action: GatedAction) => {
        trackCtaClick(location);
        clearAutoTimer();

        if (captured) {
            runGatedAction(action);
            return;
        }

        setPendingAction(action);
        setIsOpen(true);
        },
        [captured, clearAutoTimer]
    );

    const close = useCallback(() => {
        sessionStorage.setItem(DISMISSED_KEY, "true");
        clearAutoTimer();
        setIsOpen(false);
        setPendingAction(null);
    }, [clearAutoTimer]);

    return (
        <Context.Provider
        value={{ isOpen, captured, pendingAction, requireLead, close, markCaptured }}
        >
        {children}
        </Context.Provider>
    );
};

const useLeadGate = () => {
    const ctx = useContext(Context);
    if (!ctx) {
        throw new Error("useLeadGate deve ser usado dentro de LeadGateProvider");
    }
    return ctx;
};

export { LeadGateProvider, useLeadGate };