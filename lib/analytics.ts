export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const DEFAULT_META_PIXEL_ID = "1048834397539711";

export const META_PIXEL_IDS = (
    process.env.NEXT_PUBLIC_META_PIXEL_ID || DEFAULT_META_PIXEL_ID
)
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
        fbq?: (...args: unknown[]) => void;
        _fbq?: unknown;
    }
}

export type CtaLocation =
    | "header"
    | "sidebar"
    | "hero"
    | "products_card"
    | "products_card_mobile"
    | "packages_card"
    | "packages_footer"
    | "packages_custom"
    | "contact_cta"
    | "footer"
    | "floating"
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

export const trackCtaClick = (location: CtaLocation) => {
    trackEvent("cta_form_click", { location });
};

const isDev = process.env.NODE_ENV === "development";

export const trackMetaEvent = (
    name: string,
    params: Record<string, unknown> = {}
) => {
    if (typeof window === "undefined" || typeof window.fbq !== "function") {
        if (isDev) console.log(`[Meta Pixel] ✗ não enviado (pixel não carregado): ${name}`, params);
        return;
    }
    if (isDev) console.log(`[Meta Pixel] ✓ track: ${name}`, params);
    window.fbq("track", name, params);
};

export const trackLead = (params: Record<string, unknown> = {}) => {
    trackMetaEvent("Lead", params);
};