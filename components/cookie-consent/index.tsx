"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { META_PIXEL_IDS } from "@/lib/analytics";

const CONSENT_KEY = "cookie_consent";

const CookieConsent = () => {
    const [consent, setConsent] = useState<string | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setConsent(localStorage.getItem(CONSENT_KEY));
        setReady(true);
    }, []);

    const choose = (value: "accepted" | "declined") => {
        localStorage.setItem(CONSENT_KEY, value);
        setConsent(value);
    };

    const showBanner = ready && consent === null;
    const pixelEnabled = consent === "accepted" && META_PIXEL_IDS.length > 0;

    return (
        <>
        {/* ── Meta Pixel: só é injetado DEPOIS do aceite ── */}
        {pixelEnabled && (
            <>
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                ${META_PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join(" ")}
                fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                {META_PIXEL_IDS.map((id) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    key={id}
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    alt=""
                    src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
                />
                ))}
            </noscript>
            </>
        )}

        {/* ── Banner ── */}
        <AnimatePresence>
            {showBanner && (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="fixed bottom-4 inset-x-4 sm:left-6 sm:right-auto sm:bottom-6 z-[70] sm:max-w-md"
            >
                <div
                className="relative rounded-2xl overflow-hidden p-5 flex flex-col gap-4"
                style={{
                    background: "rgba(6,28,54,0.85)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow:
                    "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
                >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/40 to-transparent" />

                {/* Recusar rápido pelo X */}
                <button
                    type="button"
                    onClick={() => choose("declined")}
                    aria-label="Recusar"
                    className="absolute top-3 right-3 p-1 rounded-full text-white/30 hover:text-white/80 hover:bg-white/[0.06] transition-all duration-200"
                >
                    <X className="w-4 h-4" strokeWidth={2} />
                </button>

                <div className="flex items-start gap-3 pr-6">
                    <div className="w-9 h-9 shrink-0 rounded-xl bg-mainOrange/[0.12] border border-mainOrange/25 flex items-center justify-center text-mainOrange">
                    <Cookie className="w-4 h-4" />
                    </div>
                    <div>
                    <p className="text-sm font-bold text-white mb-1">
                        Nós usamos cookies
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed">
                        Utilizamos cookies para medir o desempenho da página e melhorar
                        sua experiência. Você pode aceitar ou recusar o rastreamento de
                        marketing.
                    </p>
                    </div>
                </div>

                <div className="flex gap-2.5">
                    <button
                    type="button"
                    onClick={() => choose("declined")}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold
                        text-white/70 bg-white/[0.05] border border-white/[0.10]
                        hover:bg-white/[0.09] active:scale-[0.98] transition-all duration-200"
                    >
                    Recusar
                    </button>
                    <button
                    type="button"
                    onClick={() => choose("accepted")}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white
                        bg-mainOrange hover:brightness-110
                        hover:shadow-[0_0_24px_rgba(231,103,20,0.5)]
                        active:scale-[0.98] transition-all duration-200"
                    >
                    Aceitar
                    </button>
                </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </>
    );
};

export { CookieConsent };