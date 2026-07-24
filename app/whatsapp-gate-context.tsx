"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { trackWhatsappClick, trackMetaEvent, type WhatsappLocation } from "@/lib/analytics";

// Visitante fechou/enviou o formulário nesta visita → não reabrir o popup de 5s.
// Usa sessionStorage: some quando a aba fecha, então numa nova visita o popup volta.
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
  /** Marca que o lead foi enviado (chamado pelo modal após envio com sucesso) */
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

  // ── Abre o formulário sozinho após 5s ──
  // Acontece toda vez que a pessoa entra no site. Só não abre se ela já tiver
  // fechado (X) ou enviado o formulário NESTA visita (sessionStorage).
  useEffect(() => {
    if (readSessionFlag(DISMISSED_KEY)) return;

    autoTimer.current = setTimeout(() => {
      setPendingUrl(null); // popup automático não tem destino de WhatsApp
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => clearAutoTimer();
  }, [clearAutoTimer]);

  const requestWhatsapp = useCallback(
    (url: string, location: WhatsappLocation) => {
      trackWhatsappClick(location); // GA4
      trackMetaEvent("Contact", { location }); // Meta Pixel

      // SEMPRE abre o formulário antes de ir para o WhatsApp.
      clearAutoTimer(); // não deixa o popup de 5s sobrescrever este fluxo
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
    // Enviou o formulário → não reabrir o popup automático nesta visita.
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
