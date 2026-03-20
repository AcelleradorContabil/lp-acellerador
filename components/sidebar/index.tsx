"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context, GlobalContextType } from "@/app/context";
import Image from "next/image";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useActiveSection } from "@/hooks/useActiveSection";

const Sidebar = () => {
  const { closeSidebar, isSidebarOpen } = useContext(
    Context
  ) as GlobalContextType;
  const { scrollToSection } = useScrollToSection();
  const [isClosing, setIsClosing] = useState(false);

  const navigationItems = [
    { id: "inicio", label: "Home", icon: "🏠" },
    { id: "produtos", label: "Produtos", icon: "🤖" },
    { id: "sobre", label: "Sobre", icon: "📊" },
    { id: "parceiros", label: "Parceiros", icon: "🤝" },
    { id: "contato", label: "Contato", icon: "📧" },
  ];

  const sectionIds = navigationItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  const handleNavClick = async (sectionId: string) => {
    setIsClosing(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    closeSidebar();
    setIsClosing(false);
    scrollToSection(sectionId);
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  return (
    <div
      className={`
      w-full h-screen top-0 left-0 z-50 bg-transparent fixed
      transition-all duration-300 ease-out
      ${isSidebarOpen ? "visible" : "invisible"}
    `}
    >
      <div className="flex h-full">
        <div
          className={`
          flex flex-col p-5 bg-gradient-to-br from-mainOrange to-orange-700 
          h-full w-[75%] max-w-[320px] shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isSidebarOpen && !isClosing ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex items-center gap-2 mb-8 pb-4 border-b-2 border-white/30">
            <Image
              src="/logos/Icones/TituloBranco2.png"
              alt="Logo acelerador"
              width="180"
              height="60"
              className="animate-fade-in"
            />
          </div>
          <nav className="flex flex-col gap-4">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  group flex items-center gap-4 text-white text-2xl font-medium
                  transition-all duration-300 ease-out
                  transform hover:translate-x-2
                  ${activeSection === item.id ? "translate-x-2" : ""}
                  animate-slide-in
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-3xl opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                <span
                  className={`
                  relative
                  ${
                    activeSection === item.id
                      ? "after:scale-x-100"
                      : "after:scale-x-0"
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0
                  after:w-full after:h-[2px] after:bg-white
                  after:transform after:origin-left
                  group-hover:after:scale-x-100 after:transition-transform after:duration-300
                `}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <button
              className="
              w-full p-4 bg-white/20 backdrop-blur-sm text-white rounded-lg
              border border-white/30
              transition-all duration-300 ease-out
              hover:bg-white/30 hover:shadow-lg
              active:scale-95
            "
              onClick={() => {
                closeSidebar();
                scrollToSection("contato");
              }}
            >
              Acelere sua produtividade
            </button>
          </div>
        </div>

        <div
          onClick={() => closeSidebar()}
          className={`
            flex-1 h-full bg-black/50 backdrop-blur-sm
            transition-opacity duration-300 ease-out
            ${isSidebarOpen && !isClosing ? "opacity-100" : "opacity-0"}
          `}
        />
      </div>
    </div>
  );
};

export { Sidebar };
