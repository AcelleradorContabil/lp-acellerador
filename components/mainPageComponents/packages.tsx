"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Check, Zap, Clock, Shield, Star,
  ArrowRight, MessageCircle, Bot, ChevronDown, Building2,
  Wrench, Sparkles,
} from "lucide-react";

interface SLA { whatsapp: string; ajustes: string; }
interface Package {
  id: string; name: string; tagline: string; ideal_for: string;
  cnpj_range: string; popular?: boolean; robots: string;
  features: string[]; sla: SLA;
  cta_label: string; cta_custom?: boolean;
}

const packages: Package[] = [
  {
    id: "starter", name: "Starter", tagline: "Comece a automatizar hoje",
    ideal_for: "Ideal para escritórios que estão iniciando na automação e querem reduzir o trabalho manual sem grande investimento.",
    cnpj_range: "50 a 100 CNPJs", robots: "Até 5 robôs",
    features: [
      "5 robôs padrão (DP e Fiscal)", "Criação de novos robôs sem custo de desenvolvimento",
      "Painel AcelleraHub completo", "Robôs rodam 24h por dia",
      "Monitoramento ativo das 8h às 01h", "Parametrização inicial (DP e Fiscal)",
      "Suporte via WhatsApp Central", "NPS mensal automatizado",
      "Infraestrutura AcelleraInfra",
    ],
    sla: { whatsapp: "Resposta em até 6 min (média)", ajustes: "Resposta 16h úteis · Execução 32h úteis" },
    cta_label: "Começar com Starter",
  },
  {
    id: "growth", name: "Growth", tagline: "O preferido dos escritórios",
    ideal_for: "Para escritórios em crescimento que precisam de mais robôs, suporte estratégico e acompanhamento próximo.",
    cnpj_range: "101 a 300 CNPJs", popular: true, robots: "Até 7 robôs",
    features: [
      "Tudo do Starter, mais:", "7 robôs ativos (DP + Fiscal)",
      "Criação de novos robôs sem custo de desenvolvimento", "Parametrização completa e estratégica",
      "Monitoramento com prioridade de atendimento", "NPS mensal + call de acompanhamento",
      "Reunião estratégica trimestral", "Auditoria trimestral de uso",
      "Sugestões proativas de novos robôs",
    ],
    sla: { whatsapp: "Resposta em até 6 min (média)", ajustes: "Resposta 16h úteis · Execução 32h úteis" },
    cta_label: "Quero o Growth",
  },
  {
    id: "scale", name: "Scale", tagline: "Para quem não pode parar",
    ideal_for: "Escritórios consolidados que precisam de automação robusta, suporte de alta performance e robôs sob medida.",
    cnpj_range: "301 a 500 CNPJs", robots: "Até 10 robôs",
    features: [
      "Tudo do Growth, mais:", "10 robôs ativos (padrão + sob demanda)",
      "Criação de novos robôs sem custo de desenvolvimento", "1 robô customizado por trimestre",
      "Monitoramento com IA + ProcessPilots", "Auditoria mensal de uso dos robôs",
      "Check técnico antes de cada ativação", "Plano de automação por setor",
      "Reuniões mensais com Head técnico",
    ],
    sla: { whatsapp: "Resposta em até 6 min (média)", ajustes: "Resposta 16h úteis · Execução 32h úteis" },
    cta_label: "Falar com especialista", cta_custom: true,
  },
  {
    id: "enterprise", name: "Enterprise", tagline: "Performance máxima, estrutura robusta",
    ideal_for: "Para grandes escritórios que exigem hiperpersonalização, servidores dedicados, segurança avançada e suporte exclusivo.",
    cnpj_range: "500+ CNPJs", robots: "Todos os robôs inclusos",
    features: [
      "Tudo do Scale, mais:", "Todos os robôs disponíveis na plataforma",
      "Criação de novos robôs sem custo de desenvolvimento", "Servidores dedicados com VPN segura",
      "Integração com infraestrutura própria", "Dashboards de uso, status e performance",
      "Canal exclusivo para melhorias", "Acesso completo à plataforma AcelleraHub",
      "SLA com garantia contratual",
    ],
    sla: { whatsapp: "Resposta em até 6 min (média)", ajustes: "Resposta 16h úteis · Execução 32h úteis" },
    cta_label: "Falar com especialista", cta_custom: true,
  },
];

const WHATSAPP = "5551993437038";
function buildWaLink(pkg: Package) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o pacote ${pkg.name} da Acellerador.`)}`;
}

// ── Package Card ──────────────────────────────────────────────────────────────
const PackageCard = ({
  pkg, index, expanded, onToggle, isInView,
}: {
  pkg: Package; index: number; expanded: boolean; onToggle: () => void; isInView: boolean;
}) => {
  const isPopular = !!pkg.popular;
  const [hovered, setHovered] = useState(false);

  const active = hovered || isPopular;

  const borderColor = hovered
    ? "rgba(231,103,20,0.55)"
    : isPopular
    ? "rgba(231,103,20,0.35)"
    : "rgba(231,103,20,0.12)";

  const accent = hovered ? "#e76714" : isPopular ? "rgba(231,103,20,0.75)" : "rgba(231,103,20,0.45)";
  const textMid = active ? "rgba(255,210,180,0.80)" : "rgba(200,220,255,0.55)";
  const textSub = active ? "rgba(255,200,160,0.55)" : "rgba(180,205,240,0.45)";
  const textFeat = active ? "rgba(255,215,185,0.75)" : "rgba(210,228,255,0.60)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.10, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: isPopular
          ? "linear-gradient(145deg, rgba(6,55,110,0.90) 0%, rgba(3,35,75,0.95) 50%, rgba(1,20,48,0.98) 100%)"
          : "linear-gradient(145deg, rgba(4,42,85,0.75) 0%, rgba(2,28,60,0.85) 55%, rgba(1,15,38,0.90) 100%)",
        border: `1px solid ${borderColor}`,
        boxShadow: hovered
          ? "0 0 0 1px rgba(231,103,20,0.20), 0 20px 60px rgba(0,0,0,0.55), 0 0 60px rgba(231,103,20,0.10), inset 0 1px 0 rgba(255,255,255,0.12)"
          : isPopular
          ? "0 0 0 1px rgba(231,103,20,0.10), 0 12px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.10)"
          : "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
        transform: hovered ? "translateY(-6px)" : "translateY(0px)",
        zIndex: hovered ? 10 : 1,
        transition: "transform 350ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 350ms, border-color 350ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Entrance shimmer */}
      {isInView && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
          initial={{ x: "-100%", opacity: 0.6 }}
          animate={{ x: "200%", opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.35 + index * 0.10, ease: "easeOut" }}
          style={{ background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)" }}
        />
      )}

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{
          background: active
            ? "linear-gradient(90deg, transparent, rgba(231,103,20,0.65), transparent)"
            : "linear-gradient(90deg, transparent, rgba(231,103,20,0.20), transparent)",
        }}
      />

      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div
            className="flex items-center gap-1.5 px-4 py-1 rounded-b-xl text-white text-[11px] font-bold uppercase tracking-wider"
            style={{
              background: "linear-gradient(135deg, #e76714, #f0821e)",
              boxShadow: "0 4px 16px rgba(231,103,20,0.50)",
            }}
          >
            <Star className="w-3 h-3 fill-white" />
            Mais popular
          </div>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-6 gap-5 ${isPopular ? "pt-10" : ""}`}>

        {/* Plan header */}
        <div>
          <h3
            className="text-2xl font-extrabold tracking-tight mb-1 transition-colors duration-300"
            style={{ color: active ? "#e76714" : "rgba(220,235,255,0.95)" }}
          >
            {pkg.name}
          </h3>
          <p className="text-sm leading-relaxed mb-3 transition-colors duration-300" style={{ color: textMid }}>
            {pkg.tagline}
          </p>
          {/* CNPJ range — destaque */}
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300"
            style={{
              background: active ? "rgba(231,103,20,0.10)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${active ? "rgba(231,103,20,0.35)" : "rgba(255,255,255,0.10)"}`,
            }}
          >
            <Building2 className="w-4 h-4 shrink-0 transition-colors duration-300" style={{ color: accent }} />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300" style={{ color: active ? "rgba(231,103,20,0.65)" : "rgba(200,220,255,0.35)" }}>
                CNPJs atendidos
              </p>
              <p className="text-sm font-extrabold leading-tight transition-colors duration-300" style={{ color: active ? "rgba(255,210,170,0.95)" : "rgba(220,235,255,0.85)" }}>
                {pkg.cnpj_range}
              </p>
            </div>
          </div>
        </div>

        {/* Quick specs — robots only */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit transition-all duration-300"
          style={{
            background: "rgba(231,103,20,0.06)",
            border: `1px solid ${active ? "rgba(231,103,20,0.22)" : "rgba(231,103,20,0.12)"}`,
          }}
        >
          <Bot className="w-3.5 h-3.5 transition-colors duration-300" style={{ color: accent }} />
          <span className="text-xs font-medium transition-colors duration-300" style={{ color: textFeat }}>{pkg.robots}</span>
        </div>

        {/* Pricing on request */}
        <div
          className="rounded-xl p-4 flex items-center gap-3 transition-all duration-300"
          style={{
            background: active ? "rgba(231,103,20,0.07)" : "rgba(255,255,255,0.04)",
            border: `1px solid ${active ? "rgba(231,103,20,0.22)" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <MessageCircle className="w-4 h-4 shrink-0 transition-colors duration-300" style={{ color: active ? "#e76714" : "rgba(231,103,20,0.45)" }} />
          <div>
            <p className="text-xs font-bold transition-colors duration-300" style={{ color: active ? "rgba(255,210,170,0.95)" : "rgba(200,225,255,0.80)" }}>
              Valor sob consulta
            </p>
            <p className="text-[10px] mt-0.5 transition-colors duration-300" style={{ color: textSub }}>
              Fale com nosso comercial para uma proposta personalizada
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <button onClick={onToggle} className="flex items-center justify-between w-full mb-3">
            <span
              className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
              style={{ color: active ? "rgba(231,103,20,0.80)" : "rgba(231,103,20,0.45)" }}
            >
              O que está incluso
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-all duration-300 ${expanded ? "rotate-180" : ""}`}
              style={{ color: active ? "rgba(231,103,20,0.60)" : "rgba(231,103,20,0.35)" }}
            />
          </button>
          <ul className="space-y-2">
            {pkg.features.slice(0, 4).map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors duration-300" style={{ color: accent }} />
                <span className="text-xs leading-snug transition-colors duration-300" style={{ color: textFeat }}>{feat}</span>
              </li>
            ))}
          </ul>
          <AnimatePresence>
            {expanded && pkg.features.length > 4 && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 mt-2 overflow-hidden"
              >
                {pkg.features.slice(4).map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 transition-colors duration-300" style={{ color: accent }} />
                    <span className="text-xs leading-snug transition-colors duration-300" style={{ color: textFeat }}>{feat}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          {pkg.features.length > 4 && (
            <button
              onClick={onToggle}
              className="mt-2 text-xs transition-colors duration-200"
              style={{ color: active ? "rgba(231,103,20,0.75)" : "rgba(231,103,20,0.45)" }}
            >
              {expanded ? "Ver menos" : `+${pkg.features.length - 4} itens inclusos`}
            </button>
          )}
        </div>

        {/* SLA */}
        <div
          className="rounded-xl p-3.5 transition-all duration-300"
          style={{
            background: active ? "rgba(231,103,20,0.05)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${active ? "rgba(231,103,20,0.15)" : "rgba(255,255,255,0.07)"}`,
          }}
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <Shield className="w-3.5 h-3.5 transition-colors duration-300" style={{ color: active ? "rgba(231,103,20,0.65)" : "rgba(231,103,20,0.35)" }} />
            <span
              className="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
              style={{ color: active ? "rgba(231,103,20,0.80)" : "rgba(231,103,20,0.45)" }}
            >
              SLA garantido
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3 h-3 shrink-0" style={{ color: "rgba(74,222,128,0.65)" }} />
              <span className="text-xs transition-colors duration-300" style={{ color: textSub }}>{pkg.sla.whatsapp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 shrink-0 transition-colors duration-300" style={{ color: active ? "rgba(231,103,20,0.60)" : "rgba(231,103,20,0.40)" }} />
              <span className="text-xs transition-colors duration-300" style={{ color: textSub }}>{pkg.sla.ajustes}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <a
            href={buildWaLink(pkg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm active:scale-[0.97] text-white transition-all duration-300"
            style={active ? {
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              boxShadow: "0 0 20px rgba(231,103,20,0.45), inset 0 1px 0 rgba(255,255,255,0.20)",
            } : {
              background: "rgba(231,103,20,0.10)",
              border: "1px solid rgba(231,103,20,0.25)",
            }}
          >
            {pkg.cta_label}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ── Typed phrase ──────────────────────────────────────────────────────────────
const TYPED = "do seu escritório.";

export function Packages() {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [typed, setTyped] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.10 });

  useEffect(() => {
    if (isInView && !typingStarted) setTypingStarted(true);
  }, [isInView, typingStarted]);

  useEffect(() => {
    if (!typingStarted || typed.length >= TYPED.length) return;
    const t = setTimeout(() => setTyped(TYPED.slice(0, typed.length + 1)), 65);
    return () => clearTimeout(t);
  }, [typed, typingStarted]);

  const toggleCard = (id: string) =>
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section ref={sectionRef} id="pacotes" className="scroll-mt-20 relative overflow-hidden px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-20 md:py-28 max-w-[1800px] mx-auto">

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-mainOrange/[0.04] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-blueAcellera/[0.08] blur-[120px] rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/20 to-transparent" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 text-center mb-14 max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/[0.10] border border-mainOrange/25 text-mainOrange text-xs font-semibold uppercase tracking-wider mb-5 shadow-[0_0_20px_rgba(231,103,20,0.12)]"
        >
          <Zap className="w-3 h-3" />
          Planos e pacotes
        </motion.div>

        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5">
          Automatize na medida{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {typed}
            {typed.length < TYPED.length && typingStarted && (
              <span style={{ WebkitTextFillColor: "#e76714", filter: "none" }}>|</span>
            )}
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-white/55 text-base md:text-lg leading-relaxed"
        >
          Sem fidelidade. Sem surpresas. Você escolhe o plano e pode crescer
          quando quiser — os robôs acompanham o seu ritmo.
        </motion.p>
      </motion.div>

      {/* Guarantee strip */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.25 }}
        className="relative z-10 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-x-6 sm:gap-y-3 mb-12 text-xs sm:text-sm"
      >
        {[
          { icon: <Shield className="w-4 h-4" />, text: "Sem fidelidade contratual" },
          { icon: <Clock className="w-4 h-4" />, text: "Suporte com SLA garantido" },
          { icon: <Zap className="w-4 h-4" />, text: "Ativação em até 5 dias úteis" },
          { icon: <Bot className="w-4 h-4" />, text: "Robôs rodando 24h por dia" },
        ].map(({ icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
            className="flex items-center gap-2"
            style={{ color: "rgba(200,220,255,0.45)" }}
          >
            <span style={{ color: "rgba(231,103,20,0.65)" }}>{icon}</span>
            <span>{text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {packages.map((pkg, i) => (
          <PackageCard
            key={pkg.id} pkg={pkg} index={i}
            expanded={!!expandedCards[pkg.id]}
            onToggle={() => toggleCard(pkg.id)}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 text-center text-sm mt-12"
        style={{ color: "rgba(200,220,255,0.30)" }}
      >
        Todos os planos incluem usuários ilimitados e suporte via WhatsApp · Dúvidas?{" "}
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 transition-colors duration-200"
          style={{ color: "rgba(231,103,20,0.60)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#e76714")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(231,103,20,0.60)")}
        >
          Fale com a gente agora
        </a>
      </motion.p>

      {/* ── Custom project banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: 0.75, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 mt-16 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(4,42,85,0.80) 0%, rgba(2,22,52,0.95) 60%, rgba(30,15,5,0.90) 100%)",
          border: "1px solid rgba(231,103,20,0.25)",
          boxShadow: "0 0 80px rgba(231,103,20,0.07), 0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/50 to-transparent" />

        {/* Glow blob */}
        <div className="absolute right-[-80px] top-[-60px] w-[360px] h-[260px] rounded-full bg-mainOrange/[0.07] blur-[80px] pointer-events-none" />

        <div className="relative px-6 py-8 sm:px-8 sm:py-10 md:px-14 md:py-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">

          {/* Icon */}
          <div
            className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(231,103,20,0.10)",
              border: "1px solid rgba(231,103,20,0.25)",
              boxShadow: "0 0 24px rgba(231,103,20,0.15)",
            }}
          >
            <Wrench className="w-6 h-6 text-mainOrange" />
          </div>

          {/* Copy */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-mainOrange/70" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(231,103,20,0.65)" }}>
                Projeto personalizado
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white leading-snug mb-3">
              Seu escritório tem uma dor que pode ser automatizada?
            </h3>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: "rgba(200,220,255,0.55)" }}>
              Desenvolvemos projetos específicos para atender a rotina contábil do seu escritório.{" "}
              <span style={{ color: "rgba(255,200,150,0.80)" }}>Clientes Acellerador não têm custos de desenvolvimento.</span>
              {" "}Também atendemos escritórios que ainda não são clientes e querem automatizar uma rotina específica.
            </p>
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Tenho uma rotina que gostaria de automatizar e quero saber mais sobre projetos personalizados.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white whitespace-nowrap transition-all duration-200 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              boxShadow: "0 0 20px rgba(231,103,20,0.40), 0 4px 16px rgba(231,103,20,0.25)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 36px rgba(231,103,20,0.65), 0 4px 24px rgba(231,103,20,0.40)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(231,103,20,0.40), 0 4px 16px rgba(231,103,20,0.25)")}
          >
            Falar com o comercial
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
