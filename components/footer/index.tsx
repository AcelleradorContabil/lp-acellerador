"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MapPin, Phone, ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const navLinks = [
  { id: "inicio", label: "Início" },
  { id: "produtos", label: "Produtos" },
  { id: "pacotes", label: "Pacotes" },
  { id: "onboarding", label: "Como funciona" },
  { id: "sobre", label: "Sobre" },
  { id: "parceiros", label: "Parceiros" },
  { id: "contato", label: "Contato" },
];

const Footer = () => {
  const { scrollToSection } = useScrollToSection();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden" style={{
      background: "linear-gradient(180deg, rgba(1,10,28,0) 0%, rgba(1,8,22,0.98) 8%)",
      borderTop: "1px solid rgba(231,103,20,0.20)",
    }}>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-mainOrange/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blueAcellera/[0.12] blur-[100px] rounded-full pointer-events-none" />

      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/40 to-transparent" />

      <div className="relative z-10 px-6 md:px-16 lg:px-20 pt-16 pb-8">

        {/* ── Main grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-12"
        >

          {/* ── Brand column ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <button onClick={() => scrollToSection("inicio")}>
              <Image
                src="/logos/Icones/TituloBranco.png"
                alt="Acellerador"
                width={160}
                height={56}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            </button>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              Automatizamos o trabalho repetitivo do seu escritório contábil para que sua equipe foque no que realmente importa — crescer.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                {
                  label: "Instagram",
                  icon: <Instagram className="w-4 h-4" />,
                  href: "https://instagram.com/acelleradorcontabil",
                },
                {
                  label: "LinkedIn",
                  icon: <Linkedin className="w-4 h-4" />,
                  href: "https://linkedin.com/company/acellerador",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center
                    bg-white/[0.05] border border-white/[0.09] text-white/40
                    hover:bg-white/[0.10] hover:text-white hover:border-white/[0.18]
                    transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">
              Navegação
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-white/30 uppercase tracking-widest">
              Contato
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:joao.v@acelleradorcontabil.com.br"
                  className="group flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  <div className="w-7 h-7 shrink-0 rounded-lg bg-mainOrange/[0.10] border border-mainOrange/20 flex items-center justify-center text-mainOrange mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug break-all">
                    joao.v@acelleradorcontabil.com.br
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5551993437038"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  <div className="w-7 h-7 shrink-0 rounded-lg bg-mainOrange/[0.10] border border-mainOrange/20 flex items-center justify-center text-mainOrange mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">
                    +55 (51) 99343-7038
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-white/50">
                  <div className="w-7 h-7 shrink-0 rounded-lg bg-mainOrange/[0.10] border border-mainOrange/20 flex items-center justify-center text-mainOrange mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug">
                    Porto Alegre, RS — Brasil
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-6" />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25"
        >
          <span>
            © {year} Acellerador Contábil. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Robôs operando agora</span>
          </div>
        </motion.div>

      </div>
    </footer>
  );
};

export { Footer };
