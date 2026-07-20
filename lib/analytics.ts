export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
    }
}

export type WhatsappLocation =
  | "floating" // botão flutuante (todas as telas)
  | "footer" // rodapé
  | "contact_cta" // seção Contato — "Falar no WhatsApp agora"
  | "packages_cta" // card de pacote — CTA principal
  | "packages_footer" // link "Dúvidas?" abaixo dos pacotes
  | "packages_custom" // CTA de projeto personalizado
  | "cart_checkout" // finalizar compra pelo carrinho
  | "cart_plan_accept" // aceitou a sugestão de pacote no carrinho
  | "purchase_modal"; // modal de orçamento de robôs

export const trackEvent = (
    name: string,
    params: Record<string, unknown> = {}
) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", name, params);
};

export const trackWhatsappClick = (location: WhatsappLocation) => {
    trackEvent("whatsapp_click", { location });
};