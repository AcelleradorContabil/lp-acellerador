"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { trackWhatsappClick, trackMetaEvent, type WhatsappLocation } from "@/lib/analytics";

// Visitante já preencheu o formulário → próximos cliques vão direto pro WhatsApp
const CAPTURED_KEY = "lead_captured";
// Visitante fechou o formulário sem enviar → não abrir o popup de 5s novamente
const DISMISSED_KEY = "lead_gate_dismissed";
const AUTO_OPEN_DELAY_MS = 5000;

type WhatsappGateContextType = {
  /** Estado interno consumido pelo modal */
  isOpen: boolean;
  /** URL do WhatsApp a abrir após o envio (null = popup automático, sem destino) */
  pendingUrl: string | null;
  /** Chamado pelos botões de "Fale conosco" */
  requestWhatsapp: (url: string, location: WhatsappLocation) => void;
  /** Fecha o modal (dispensa) */
  close: () => void;
  /** Marca o lead como capturado (chamado pelo modal após envio com sucesso) */
  markCaptured: () => void;
};

const Context = createContext<WhatsappGateContextType | null>(null);

const readFlag = (key: string) =>
  typeof window !== "undefined" && localStorage.getItem(key) === "true";

const WhatsappGateProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  // ── Abre o formulário sozinho após 5s (uma única vez por navegador) ──
  useEffect(() => {
    if (readFlag(CAPTURED_KEY) || readFlag(DISMISSED_KEY)) return;

    const timer = setTimeout(() => {
      setPendingUrl(null); // popup automático não tem destino de WhatsApp
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const requestWhatsapp = useCallback(
    (url: string, location: WhatsappLocation) => {
      trackWhatsappClick(location); // GA4
      trackMetaEvent("Contact", { location }); // Meta Pixel

      // Já preencheu antes → pula o formulário e vai direto pro WhatsApp
      if (readFlag(CAPTURED_KEY)) {
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }

      setPendingUrl(url);
      setIsOpen(true);
    },
    []
  );

  const close = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISSED_KEY, "true");
    }
    setIsOpen(false);
    setPendingUrl(null);
  }, []);

  const markCaptured = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CAPTURED_KEY, "true");
    }
  }, []);

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
