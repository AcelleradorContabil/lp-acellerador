export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
        dataLayer?: unknown[];
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