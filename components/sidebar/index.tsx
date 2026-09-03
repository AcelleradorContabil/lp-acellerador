"use client";
import React, { useContext, useEffect, useState } from "react";
import { Context, GlobalContextType } from "@/app/context";
import Image from "next/image";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home, Bot, Users, Handshake, Mail, X, ArrowRight, ChevronRight,
} from "lucide-react";
import { useGlobalContext } from "@/app/context";
import { useLeadGate } from "@/app/lead-gate-context";
import { primaryCtaAction } from "@/lib/cta";

const navigationItems = [
    { id: "inicio",    label: "Início",    icon: Home },
    { id: "produtos",  label: "Produtos",  icon: Bot },
    { id: "sobre",     label: "Sobre",     icon: Users },
    { id: "parceiros", label: "Parceiros", icon: Handshake },
    { id: "contato",   label: "Contato",   icon: Mail },
];

const Sidebar = () => {
    const { closeSidebar, isSidebarOpen } = useContext(Context) as GlobalContextType;
    const { openPurchaseModal } = useGlobalContext() as GlobalContextType;
    const { requireLead } = useLeadGate();
    const { scrollToSection } = useScrollToSection();

    const sectionIds = navigationItems.map((item) => item.id);
    const activeSection = useActiveSection(sectionIds);

    const handleNavClick = (sectionId: string) => {
        closeSidebar();
        setTimeout(() => scrollToSection(sectionId), 300);
    };

    useEffect(() => {
        document.body.style.overflow = isSidebarOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isSidebarOpen]);

    return (
        <AnimatePresence>
        {isSidebarOpen && (
            <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={closeSidebar}
            />

            {/* Panel */}
            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-0 left-0 h-full w-[85%] max-w-[300px] sm:w-[78%] sm:max-w-[320px] flex flex-col overflow-y-auto overflow-x-hidden"
                style={{
                background: "linear-gradient(155deg, rgba(4,50,95,0.99) 0%, rgba(2,18,44,1) 100%)",
                borderRight: "1px solid rgba(231,103,20,0.22)",
                boxShadow: "4px 0 40px rgba(0,0,0,0.60)",
                }}
            >
                {/* Orange top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent" />
                {/* Ambient orb */}
                <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-mainOrange/[0.07] blur-[80px] pointer-events-none" />

                {/* Header */}
                <div
                className="relative z-10 flex items-center justify-between px-5 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                >
                <Image
                    src="/logos/Icones/TituloBranco.png"
                    alt="Acellerador"
                    width={120}
                    height={40}
                    priority
                />
                <button
                    onClick={closeSidebar}
                    className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors duration-200"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
                >
                    <X className="w-4 h-4 text-white/60" />
                </button>
                </div>

                {/* Nav */}
                <nav className="relative z-10 flex flex-col gap-4 px-4 pt-12 flex-1">
                {navigationItems.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                    <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        onClick={() => handleNavClick(item.id)}
                        className="flex items-center gap-5 px-5 py-4 rounded-2xl text-left transition-all duration-300 group relative"
                        style={{
                        background: isActive ? "rgba(231,103,20,0.08)" : "transparent",
                        border: "1px solid",
                        borderColor: isActive ? "rgba(231,103,20,0.2)" : "transparent",
                        }}
                    >
                        <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300"
                        style={{
                            background: isActive ? "rgba(231,103,20,0.15)" : "rgba(255,255,255,0.03)",
                            border: "1px solid",
                            borderColor: isActive ? "rgba(231,103,20,0.3)" : "rgba(255,255,255,0.06)",
                            color: isActive ? "#e76714" : "rgba(255,255,255,0.4)",
                            boxShadow: isActive ? "0 0 15px rgba(231,103,20,0.2)" : "none",
                        }}
                        >
                        <Icon className="w-6 h-6" />
                        </div>
                        <span
                        className="text-lg font-bold tracking-tight transition-colors duration-300"
                        style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.5)" }}
                        >
                        {item.label}
                        </span>
                        <ChevronRight
                        className="w-5 h-5 ml-auto transition-all duration-300"
                        style={{ 
                            color: isActive ? "#e76714" : "rgba(255,255,255,0.15)",
                            transform: isActive ? "translateX(0)" : "translateX(-4px)",
                            opacity: isActive ? 1 : 0.5
                        }}
                        />
                    </motion.button>
                    );
                })}
                </nav>

                {/* CTA */}
                <div
                className="relative z-10 p-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.28 }}
                    onClick={() => { closeSidebar(); setTimeout(() => requireLead("sidebar", primaryCtaAction(openPurchaseModal)), 300); }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm font-bold active:scale-95 transition-all duration-200"
                    style={{
                    background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                    boxShadow: "0 0 20px rgba(231,103,20,0.40), 0 4px 14px rgba(231,103,20,0.25)",
                    }}
                >
                    Começar agora
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
                </div>
            </motion.div>
            </div>
        )}
        </AnimatePresence>
    );
};

export { Sidebar };