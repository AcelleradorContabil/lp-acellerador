"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../header";
import { GlobalContextType, useGlobalContext } from "@/app/context";
import { Sidebar } from "../sidebar";
import { Cart } from "../cart";
import Image from "next/image";
import FloatingWhatsappButton from "../whatsapp-icon";

type Props = {
  children: React.ReactNode;
};

const SidebarHeader = () => {
  const { isSidebarOpen, openSidebar, closeSidebar } =
    useGlobalContext() as GlobalContextType;

  return (
    <>
      <Sidebar />
      <div className="h-20 w-full bg-black flex items-center px-4 fixed top-0 left-0 right-0 z-30 shadow-lg">
        <button
          onClick={() => (isSidebarOpen ? closeSidebar() : openSidebar())}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          <Image alt="Menu logo" src="/icon/menu.svg" height={32} width={32} />
        </button>
        <Image
          className="mx-auto"
          alt="Logo acellerador"
          src="/logos/Icones/TituloBranco.png"
          height={50}
          width={150}
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
          className={`flex flex-col gap-20 md:px-40 px-0 bg-blueAcellera ${
            isMobile ? "pt-20" : "pt-[80px]"
          }`}
        >
          {children}
          <FloatingWhatsappButton/>
        </div>
        <Cart />
      </main>
    )
  );
};

export { AppBody };
