"use client";

/**
 * De onde o lead veio, resolvido em UMA frase legível.
 *
 * Os parâmetros de campanha são capturados na primeira carga da sessão
 * (first-touch) e nunca sobrescritos: se a pessoa chega por um anúncio,
 * recarrega a página perdendo os parâmetros da URL e só então envia o
 * formulário, o crédito continua com a campanha que a trouxe.
 */

const STORAGE_KEY = "lead_source";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

/** IDs de clique que as plataformas de anúncio grudam sozinhas no link. */
const CLICK_ID_KEYS = ["gclid", "fbclid", "ttclid", "msclkid"] as const;

type Captured = {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    click_id: string;
    referrer: string;
};

const EMPTY: Captured = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    click_id: "",
    referrer: "",
};

/** Domínios de origem traduzidos para nome de gente. */
const HOSTS: Record<string, string> = {
    "instagram.com": "Instagram",
    "l.instagram.com": "Instagram",
    "facebook.com": "Facebook",
    "l.facebook.com": "Facebook",
    "m.facebook.com": "Facebook",
    "lm.facebook.com": "Facebook",
    "google.com": "Google",
    "google.com.br": "Google",
    "bing.com": "Bing",
    "duckduckgo.com": "DuckDuckGo",
    "linkedin.com": "LinkedIn",
    "lnkd.in": "LinkedIn",
    "youtube.com": "YouTube",
    "t.co": "X/Twitter",
    "wa.me": "WhatsApp",
    "web.whatsapp.com": "WhatsApp",
    "api.whatsapp.com": "WhatsApp",
    "tiktok.com": "TikTok",
};

/** Valores comuns de utm_source escritos do jeito certo. */
const SOURCES: Record<string, string> = {
    instagram: "Instagram",
    ig: "Instagram",
    facebook: "Facebook",
    fb: "Facebook",
    meta: "Meta",
    google: "Google",
    youtube: "YouTube",
    linkedin: "LinkedIn",
    tiktok: "TikTok",
    whatsapp: "WhatsApp",
    email: "E-mail",
    newsletter: "Newsletter",
};

const hostOf = (url: string) => {
    try {
        return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
        return "";
    }
};

const prettySource = (value: string) => {
    const key = value.trim().toLowerCase();
    return SOURCES[key] ?? value.trim().charAt(0).toUpperCase() + value.trim().slice(1);
};

const readFromUrl = (): Captured => {
    const params = new URLSearchParams(window.location.search);
    const captured = { ...EMPTY };

    for (const key of UTM_KEYS) {
        captured[key] = params.get(key)?.trim() ?? "";
    }

    for (const key of CLICK_ID_KEYS) {
        const value = params.get(key)?.trim();
        if (value) {
        captured.click_id = value;
        break;
        }
    }

    captured.referrer = document.referrer || "";
    return captured;
};

/** Só vale gravar se houver algum sinal de origem. */
const hasSignal = (c: Captured) =>
    UTM_KEYS.some((key) => !!c[key]) || !!c.click_id || !!c.referrer;

const read = (): Captured | null => {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? { ...EMPTY, ...JSON.parse(raw) } : null;
    } catch {
        return null;
    }
};

/**
 * Grava a origem na primeira carga da sessão. Chamada cedo, no provider,
 * porque o formulário pode ser enviado muitos minutos (e um refresh) depois.
 */
export const captureLeadSource = () => {
    if (typeof window === "undefined") return;

    try {
        const stored = read();
        // Já temos uma origem com sinal: first-touch vence, não sobrescreve.
        if (stored && hasSignal(stored)) return;

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(readFromUrl()));
    } catch {
        // sessionStorage indisponível (modo restrito): seguimos sem origem.
    }
};

/**
 * Uma frase só, pronta para ler na planilha. Exemplos:
 *   "Instagram (campanha: robos-dp-set26)"
 *   "Google (orgânico)"
 *   "Anúncio (sem UTM)"
 *   "Direto"
 */
export const getLeadSource = (): string => {
    if (typeof window === "undefined") return "";

    const c = read() ?? readFromUrl();

    // 1. Campanha marcada com UTM: a resposta mais precisa.
    if (c.utm_source) {
        const detail = c.utm_campaign
        ? `campanha: ${c.utm_campaign}`
        : c.utm_medium || "";
        return detail
        ? `${prettySource(c.utm_source)} (${detail})`
        : prettySource(c.utm_source);
    }

    // 2. Sem UTM, mas com ID de clique: veio de anúncio mal etiquetado.
    if (c.click_id) return "Anúncio (sem UTM)";

    // 3. Sem UTM: o site que encaminhou responde a pergunta.
    if (c.referrer) {
        const host = hostOf(c.referrer);
        const own = window.location.hostname.replace(/^www\./, "").toLowerCase();
        if (host && host !== own) return `${HOSTS[host] ?? host} (orgânico)`;
    }

    return "Direto";
};
