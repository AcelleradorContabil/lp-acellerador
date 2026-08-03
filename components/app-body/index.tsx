"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../header";
import { GlobalContextType, useGlobalContext } from "@/app/context";
import { Sidebar } from "../sidebar";
import Image from "next/image";
import FloatingWhatsappButton from "../whatsapp-icon";
import { PurchaseModal } from "../purchase-modal";
import { LeadGateModal } from "../lead-gate-modal";

type Props = {
    children: React.ReactNode;
};

const SidebarHeader = () => {
    const { isSidebarOpen, openSidebar, closeSidebar } =
        useGlobalContext() as GlobalContextType;

    return (
        <>
        <Sidebar />
        <div
            className="h-16 w-full flex items-center px-4 fixed top-0 left-0 right-0 z-30"
            style={{
            background: "linear-gradient(135deg, rgba(4,52,98,0.96) 0%, rgba(2,22,52,0.98) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderBottom: "1px solid rgba(231,103,20,0.15)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
            }}
        >
            <button
            onClick={() => (isSidebarOpen ? closeSidebar() : openSidebar())}
            className="p-2 rounded-xl transition-colors duration-200"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
            <Image alt="Menu logo" src="/icon/menu.svg" height={22} width={22} />
            </button>
            <Image
            className="mx-auto"
            alt="Logo acellerador"
            src="/logos/Icones/TituloBranco.png"
            height={38}
            width={120}
            />
        </div>
        </>
    );
};

const AppBody = ({ children }: Props) => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const { isMobile } = useGlobalContext() as GlobalContextType;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        isMounted && (
        <main>
            {isMobile ? <SidebarHeader /> : <Header />}
            <div
            className={`flex flex-col gap-10 md:gap-20 bg-blueAcellera ${
                isMobile ? "pt-16" : "pt-0"
            }`}
            >
            {children}
            <FloatingWhatsappButton/>
            </div>
            <PurchaseModal />
            <LeadGateModal />
        </main>
        )
    );
};

export { AppBody };