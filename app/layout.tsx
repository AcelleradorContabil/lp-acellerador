import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "./context";
import { CartProvider } from "./cart-context";
import { WhatsappGateProvider } from "./whatsapp-gate-context";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { GA_ID } from "@/lib/analytics";
import { CookieConsent } from "@/components/cookie-consent";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://acellerador.com.br"),
    title: "Acellerador Contábil | Automação e RPA para Escritórios Contábeis",
    description: "Elimine o trabalho manual com robôs fiscais e de DP. Especialistas em RPA contábil, transmissão de DCTFWeb, Reinf, eSocial e desenvolvimento de robôs personalizados sob medida.",
    keywords: ["automação contábil", "RPA para contabilidade", "robôs fiscais", "robôs de DP", "DCTFWeb automática", "eSocial RPA", "robôs personalizados contabilidade"],
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Acellerador Contábil | Automação e RPA para Escritórios Contábeis",
        description: "Transforme seu escritório com robôs especialistas em rotinas fiscais e de DP. Soluções sob medida para o seu sistema.",
        type: "website",
        locale: "pt_BR",
        url: "https://acellerador.com.br",
        siteName: "Acellerador Contábil",
        images: [
        {
            url: "/logos/logo_horizontal.png",
            width: 1200,
            height: 630,
            alt: "Acellerador Contábil Logo",
        },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Acellerador Contábil | Automação e RPA para Escritórios Contábeis",
        description: "Transforme seu escritório com robôs especialistas em rotinas fiscais e de DP. Soluções sob medida para o seu sistema.",
        images: ["/logos/logo_horizontal.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Acellerador Contábil",
        "url": "https://acellerador.com.br",
        "logo": "https://acellerador.com.br/logos/logo_horizontal.png",
        "description": "Especialistas em RPA e automação para o setor contábil.",
        "sameAs": [
        "https://www.instagram.com/acelleradorcontabil"
        ],
        "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Soluções de Automação Contábil",
        "itemListElement": [
            {
            "@type": "Service",
            "name": "Robôs para Departamento Pessoal",
            "description": "Automação de Folha, Rescisão e eSocial Doméstica."
            },
            {
            "@type": "Service",
            "name": "Robôs para Setor Fiscal",
            "description": "Transmissão automática de DCTFWeb, EFD-Reinf e MIT."
            },
            {
            "@type": "Service",
            "name": "Desenvolvimento de Robôs RPA Personalizados",
            "description": "Criação de robôs sob medida de acordo com os sistemas e processos do cliente."
            }
        ]
        }
    };

    return (
        <html lang="pt-BR">
        <head>
            <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {GA_ID && (
            <>
                <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                strategy="afterInteractive"
                />
                <Script id="ga-init" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_ID}');
                `}
                </Script>
            </>
            )}
        </head>
        <body className={`${outfit.className} bg-blueAcellera`}>
            <CookieConsent />
            <GlobalContextProvider>
            <CartProvider>
                <WhatsappGateProvider>
                {children}
                </WhatsappGateProvider>
                <Toaster
                position="top-right"
                toastOptions={{
                    className: "",
                    style: {
                    padding: "16px",
                    borderRadius: "4px",
                    },
                }}
                />
            </CartProvider>
            </GlobalContextProvider>
        </body>
        </html>
    );
}