"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../header";
import { GlobalContextType, useGlobalContext } from "@/app/context";
import { Sidebar } from "../sidebar";
import { Cart } from "../cart";
import Image from "next/image";
import FloatingWhatsappButton from "../whatsapp-icon";
import { PurchaseModal } from "../purchase-modal";

type Props = {
  children: React.ReactNode;
};

const SidebarHeader = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } =
    useGlobalContext() as GlobalContextType;

  return (
    <>
      <Sidebar />
      <div className="h-16 w-full flex items-center px-4 fixed top-0 left-0 right-0 z-30 bg-white/[0.05] backdrop-blur-2xl border-b border-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        <button
          onClick={() => (isSidebarOpen ? closeSidebar() : openSidebar())}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
        >
          <Image alt="Menu logo" src="/icon/menu.svg" height={28} width={28} />
        </button>
        <Image
          className="mx-auto"
          alt="Logo acellerador"
          src="/logos/Icones/TituloBranco.png"
          height={44}
          width={130}
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
          className={`flex flex-col gap-20 bg-blueAcellera ${
            isMobile ? "pt-16" : ""
          }`}
        >
          {children}
          <FloatingWhatsappButton/>
        </div>
        <Cart />
        <PurchaseModal />
      </main>
    )
  );
};

export { AppBody };
