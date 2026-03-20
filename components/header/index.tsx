"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useActiveSection } from "@/hooks/useActiveSection";

type LineProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

const Line = ({ children, isActive }: LineProps) => {
  return (
    <li
      className={`
      relative cursor-pointer transition-all duration-300 ease-out
      hover:text-mainOrange 
      ${isActive ? "text-mainOrange" : "text-white"}
      after:content-[''] after:absolute after:bottom-[-8px] after:left-0 
      after:w-full after:h-[2px] after:bg-mainOrange 
      after:transform after:origin-left
      ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
      hover:after:scale-x-100 after:transition-transform after:duration-300
    `}
    >
      {children}
    </li>
  );
};

const Header = () => {
  const { scrollToSection, isScrolling } = useScrollToSection();
  const [isScrolled, setIsScrolled] = useState(false);

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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <header
      className={`
      fixed top-0 left-0 right-0 z-40
      h-[80px] w-full flex bg-black px-8 md:px-20 lg:px-40 items-center
      transition-all duration-300 ease-out
      ${isScrolled ? "shadow-2xl backdrop-blur-md bg-opacity-90" : ""}
    `}
    >
      <div className="flex items-center gap-2">
        <Image
          src="/logos/Icones/TituloBranco.png"
          alt="Logo acelerador"
          width="150"
          height="70"
          className="cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => handleNavClick("inicio")}
          priority
        />
      </div>

      <nav className="mx-auto" aria-label="Navegação principal">
        <ul className="flex gap-6 lg:gap-8 text-sm uppercase">
          {navigationItems.map((item) => (
            <Line key={item.id} isActive={activeSection === item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`
                  py-2 px-1 font-medium tracking-wider
                  transition-all duration-200
                  ${isScrolling ? "pointer-events-none" : ""}
                  ${activeSection === item.id ? "font-bold" : ""}
                `}
                aria-current={activeSection === item.id ? "page" : undefined}
                disabled={isScrolling}
              >
                {item.label}
              </button>
            </Line>
          ))}
        </ul>
      </nav>

      <div>
        <button
          className={`
            px-4 py-3 bg-mainOrange text-white rounded-md font-medium
            transition-all duration-300 ease-out
            hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-600/20 hover:scale-105
            active:scale-95 active:shadow-lg
            ${isScrolling ? "pointer-events-none opacity-80" : ""}
          `}
          disabled={isScrolling}
          onClick={() => handleNavClick("contato")}
        >
          Acelere sua produtividade
        </button>
      </div>
    </header>
  );
};

export { Header };
