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
        className="relative flex items-center pointer-events-auto w-full"
        style={{
          maxWidth: isMinimized ? "720px" : "82%",
          borderRadius: "16px",
          padding: isMinimized ? "5px 10px" : "8px 14px",
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
          className="flex items-center px-1.5 py-1 rounded-xl hover:bg-white/[0.08] transition-colors duration-300 shrink-0 z-10"
        >
          <Image
            src="/logos/Icones/TituloBranco.png"
            alt="Acellerador"
            width={isMinimized ? 100 : 116}
            height={40}
            className="transition-all duration-700 hover:opacity-85"
            priority
          />
        </button>

        {/* Nav — always absolutely centered, never moves */}
        <nav
          aria-label="Navegação principal"
          className="absolute left-1/2 -translate-x-1/2"
        >
          <ul className="flex items-center gap-0.5">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  disabled={isScrolling}
                  aria-current={activeSection === item.id ? "page" : undefined}
                  className={`
                    relative rounded-xl font-medium
                    transition-all duration-300
                    ${isScrolling ? "pointer-events-none" : ""}
                    ${isMinimized ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-sm"}
                    ${
                      activeSection === item.id
                        ? "text-white bg-mainOrange/[0.18] shadow-[inset_0_1px_0_rgba(231,103,20,0.25),0_0_12px_rgba(231,103,20,0.15)]"
                        : "text-white/55 hover:text-white hover:bg-mainOrange/[0.08]"
                    }
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
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
            ml-auto font-semibold rounded-xl shrink-0 z-10
            bg-mainOrange text-white
            transition-all duration-300
            hover:brightness-110
            active:scale-95
            ${isScrolling ? "pointer-events-none opacity-80" : ""}
            ${isMinimized ? "px-3.5 py-1.5 text-xs" : "px-4 py-2 text-sm"}
          `}
        >
          Começar agora
        </button>
      </div>
    </header>
  );
};

export { Header };
