"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useGlobalContext, GlobalContextType } from "@/app/context";

const Header = () => {
  const { scrollToSection, isScrolling } = useScrollToSection();
  const { openPurchaseModal } = useGlobalContext() as GlobalContextType;
  const [isMinimized, setIsMinimized] = useState(false);

  const navigationItems = [
    { id: "inicio", label: "Início" },
    { id: "produtos", label: "Produtos" },
    { id: "pacotes", label: "Pacotes" },
    { id: "depoimentos-video", label: "Depoimentos" },
    { id: "sobre", label: "Sobre" },
    { id: "parceiros", label: "Parceiros" },
    { id: "contato", label: "Contato" },
  ];

  const sectionIds = navigationItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      const inicioEl = document.getElementById("inicio");
      const threshold = inicioEl
        ? inicioEl.offsetTop + inicioEl.offsetHeight - 80
        : window.innerHeight * 0.85;
      setIsMinimized(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const ease = "700ms cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 pt-4">
      <div
        className="flex items-center pointer-events-auto w-full"
        style={{
          maxWidth: isMinimized ? "860px" : "82%",
          borderRadius: "16px",
          padding: isMinimized ? "5px 12px" : "12px 20px",
          background: isMinimized
            ? "rgba(5,65,115,0.62)"
            : "linear-gradient(135deg, rgba(4,52,98,0.92) 0%, rgba(2,22,52,0.96) 60%, rgba(6,38,80,0.90) 100%)",
          backdropFilter: "blur(28px) saturate(1.6)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6)",
          border: "1px solid rgba(231,103,20,0.18)",
          boxShadow: isMinimized
            ? "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(231,103,20,0.08), inset 0 1px 0 rgba(231,103,20,0.10)"
            : "0 16px 48px rgba(0,0,0,0.55), 0 0 40px rgba(231,103,20,0.08), inset 0 1px 0 rgba(231,103,20,0.12)",
          transition: [
            `max-width ${ease}`,
            `padding ${ease}`,
            `box-shadow ${ease}`,
            `background ${ease}`,
          ].join(", "),
        }}
      >
        {/* Logo — left */}
        <button
          onClick={() => scrollToSection("inicio")}
          className="flex items-center px-1.5 py-1 rounded-xl hover:bg-white/[0.08] transition-colors duration-300 shrink-0"
        >
          <Image
            src="/logos/Icones/TituloBranco.png"
            alt="Acellerador"
            width={isMinimized ? 100 : 140}
            height={40}
            className="transition-all duration-700 hover:opacity-85"
            priority
          />
        </button>

        {/* Nav — flex centered between logo and CTA */}
        <nav
          aria-label="Navegação principal"
          className="flex-1 flex justify-center"
        >
          <ul className={`flex items-center transition-all duration-700 ${isMinimized ? "gap-0.5" : "gap-2"}`}>
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    disabled={isScrolling}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      relative rounded-lg font-medium
                      transition-all duration-300
                      ${isScrolling ? "pointer-events-none" : ""}
                      ${isMinimized ? "px-2.5 py-1.5 text-[11px]" : "px-4 py-2 text-sm"}
                      ${
                        isActive
                          ? "text-mainOrange bg-mainOrange/[0.12] border border-mainOrange/40"
                          : "text-white/55 hover:text-white hover:bg-white/[0.07] border border-transparent"
                      }
                    `}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-mainOrange" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA — right */}
        <button
          onClick={openPurchaseModal}
          disabled={isScrolling}
          style={{ boxShadow: "0 0 14px rgba(231,103,20,0.40), 0 2px 10px rgba(231,103,20,0.25)" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 28px rgba(231,103,20,0.65), 0 4px 16px rgba(231,103,20,0.40)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 14px rgba(231,103,20,0.40), 0 2px 10px rgba(231,103,20,0.25)")}
          className={`
            ml-3 font-semibold rounded-xl shrink-0
            bg-mainOrange text-white
            transition-all duration-300
            hover:brightness-110
            active:scale-95
            ${isScrolling ? "pointer-events-none opacity-80" : ""}
            ${isMinimized ? "px-3.5 py-1.5 text-xs" : "px-6 py-2.5 text-sm font-bold"}
          `}
        >
          Começar agora
        </button>
      </div>
    </header>
  );
};

export { Header };
