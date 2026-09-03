import type { GatedAction } from "@/app/lead-gate-context";
import { PURCHASE_MODAL_ENABLED } from "./feature-flags";

export const WHATSAPP_NUMBER = "5551993437038";

const FALLBACK_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Olá! Gostaria de saber mais sobre os robôs da Acellerador e receber uma proposta."
)}`;

/**
 * Ação do CTA principal ("Começar agora" / "Quero este robô").
 * Com o modal de orçamento desligado, o clique vai direto para o WhatsApp.
 */
export const primaryCtaAction = (openPurchaseModal: () => void): GatedAction =>
    PURCHASE_MODAL_ENABLED
        ? { type: "run", run: openPurchaseModal }
        : { type: "url", url: FALLBACK_URL };
