"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { trackWhatsappClick, trackLead, type WhatsappLocation } from "@/lib/analytics";

const DISMISSED_KEY = "lead_gate_dismissed";
const AUTO_OPEN_DELAY_MS = 5000;

type WhatsappGateContextType = {
    isOpen: boolean;
    pendingUrl: string | null;
    requestWhatsapp: (url: string, location: WhatsappLocation) => void;
    close: () => void;
    markCaptured: () => void;
};

const Context = createContext<WhatsappGateContextType | null>(null);

const readSessionFlag = (key: string) =>
    typeof window !== "undefined" && sessionStorage.getItem(key) === "true";

const WhatsappGateProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);
    const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearAutoTimer = useCallback(() => {
        if (autoTimer.current) {
        clearTimeout(autoTimer.current);
        autoTimer.current = null;
        }
    }, []);

    useEffect(() => {
        if (readSessionFlag(DISMISSED_KEY)) return;

        autoTimer.current = setTimeout(() => {
        setPendingUrl(null);
        setIsOpen(true);
        }, AUTO_OPEN_DELAY_MS);

        return () => clearAutoTimer();
    }, [clearAutoTimer]);

    const requestWhatsapp = useCallback(
        (url: string, location: WhatsappLocation) => {
        trackWhatsappClick(location); // GA4
        trackLead({ location }); // Meta Pixel → evento "Lead"

        clearAutoTimer();
        setPendingUrl(url);
        setIsOpen(true);
        },
        [clearAutoTimer]
    );

    const close = useCallback(() => {
        if (typeof window !== "undefined") {
        sessionStorage.setItem(DISMISSED_KEY, "true");
        }
        clearAutoTimer();
        setIsOpen(false);
        setPendingUrl(null);
    }, [clearAutoTimer]);

    const markCaptured = useCallback(() => {
        if (typeof window !== "undefined") {
        sessionStorage.setItem(DISMISSED_KEY, "true");
        }
        clearAutoTimer();
    }, [clearAutoTimer]);

    return (
        <Context.Provider
        value={{ isOpen, pendingUrl, requestWhatsapp, close, markCaptured }}
        >
        {children}
        </Context.Provider>
    );
};

const useWhatsappGate = () => {
    const ctx = useContext(Context);
    if (!ctx) {
        throw new Error("useWhatsappGate deve ser usado dentro de WhatsappGateProvider");
    }
    return ctx;
};

export { WhatsappGateProvider, useWhatsappGate };