export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
        fbq?: (...args: unknown[]) => void;
        _fbq?: unknown;
    }
}

export type WhatsappLocation =
    | "floating"
    | "footer"
    | "contact_cta"
    | "packages_cta"
    | "packages_footer"
    | "packages_custom"
    | "cart_checkout"
    | "cart_plan_accept"
    | "purchase_modal";

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

// ── Meta (Facebook) Pixel ──
const isDev = process.env.NODE_ENV === "development";

export const trackMetaEvent = (
    name: string,
    params: Record<string, unknown> = {}
) => {
    if (typeof window === "undefined" || typeof window.fbq !== "function") {
        // Em dev, avisa que o evento NÃO foi enviado (pixel não carregado —
        // geralmente porque o usuário ainda não aceitou os cookies).
        if (isDev) console.log(`[Meta Pixel] ✗ não enviado (pixel não carregado): ${name}`, params);
        return;
    }
    if (isDev) console.log(`[Meta Pixel] ✓ track: ${name}`, params);
    window.fbq("track", name, params);
};

// Dispara o evento de conversão "Lead" quando um formulário é enviado.
export const trackLead = (params: Record<string, unknown> = {}) => {
    trackMetaEvent("Lead", params);
};