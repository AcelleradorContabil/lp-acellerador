import type { GatedAction } from "@/app/lead-gate-context";
import { PURCHASE_MODAL_ENABLED } from "./feature-flags";

export const WHATSAPP_NUMBER = "5551993437038";

export const buildWaLink = (text: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const FALLBACK_URL = buildWaLink(
    "Olá! Gostaria de saber mais sobre os robôs da Acellerador e receber uma proposta."
);

/**
 * Destino de quem enviou o formulário sem ter clicado num CTA específico
 * (modal automático, formulário da seção de contato). Todo lead termina
 * numa conversa no WhatsApp — nunca só num toast.
 */
export const LEAD_THANKS_URL = buildWaLink(
    "Olá! Acabei de preencher o formulário no site da Acellerador e gostaria de falar com um especialista."
);

/**
 * Ação do CTA principal ("Começar agora" / "Quero este robô").
 * Com o modal de orçamento desligado, o clique vai direto para o WhatsApp.
 */
export const primaryCtaAction = (openPurchaseModal: () => void): GatedAction =>
    PURCHASE_MODAL_ENABLED
        ? { type: "run", run: openPurchaseModal }
        : { type: "url", url: FALLBACK_URL };
