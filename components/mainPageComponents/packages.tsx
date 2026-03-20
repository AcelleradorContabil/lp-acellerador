"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Check, Zap, Clock, Users, Shield, Star,
  ArrowRight, MessageCircle, Bot, ChevronDown,
} from "lucide-react";

interface SLA { whatsapp: string; ajustes: string; }
interface Package {
  id: string; name: string; tagline: string; ideal_for: string;
  cnpj_range: string; popular?: boolean; robots: string; users: string;
  features: string[]; sla: SLA;
  cta_label: string; cta_custom?: boolean;
}

const packages: Package[] = [
  {
    id: "starter", name: "Starter", tagline: "Comece a automatizar hoje",
    ideal_for: "Ideal para escritórios que estão iniciando na automação e querem reduzir o trabalho manual sem grande investimento.",
    cnpj_range: "Até 100 CNPJs", robots: "Até 5 robôs", users: "1 usuário",
    features: [
      "5 robôs padrão (DP e Fiscal)", "Painel AcelleraHub completo",
      "Robôs rodam 24h por dia", "Monitoramento ativo das 8h às 18h",
      "Parametrização inicial (DP e Fiscal)", "Suporte via WhatsApp Central",
      "NPS mensal automatizado", "Infraestrutura AcelleraInfra",
    ],
    sla: { whatsapp: "Resposta em até 5 min", ajustes: "Resposta 24h úteis · Execução 72h úteis" },
    cta_label: "Começar com Starter",
  },
  {
    id: "growth", name: "Growth", tagline: "O preferido dos escritórios",
    ideal_for: "Para escritórios em crescimento que precisam de mais robôs, suporte estratégico e acompanhamento próximo.",
    cnpj_range: "101 a 300 CNPJs", popular: true, robots: "Até 8 robôs", users: "Até 3 usuários",
    features: [
      "Tudo do Starter, mais:", "8 robôs ativos (DP + Fiscal)",
      "Parametrização completa e estratégica", "Monitoramento com prioridade de atendimento",
      "NPS mensal + call de acompanhamento", "Reunião estratégica trimestral",
      "Auditoria trimestral de uso", "Sugestões proativas de novos robôs",
      "Infraestrutura para 3 usuários simultâneos",
    ],
    sla: { whatsapp: "Resposta em até 5 min", ajustes: "Resposta 24h úteis · Execução 72h úteis" },
    cta_label: "Quero o Growth",
  },
  {
    id: "scale", name: "Scale", tagline: "Para quem não pode parar",
    ideal_for: "Escritórios consolidados que precisam de automação robusta, suporte de alta performance e robôs sob medida.",
    cnpj_range: "301 a 500 CNPJs", robots: "Até 12 robôs", users: "Até 5 usuários",
    features: [
      "Tudo do Growth, mais:", "12 robôs ativos (padrão + sob demanda)",
      "1 robô customizado por trimestre", "Monitoramento com IA + ProcessPilots",
      "Auditoria mensal de uso dos robôs", "Check técnico antes de cada ativação",
      "Plano de automação por setor", "Reuniões mensais com Head técnico",
      "Infraestrutura para 5 usuários simultâneos",
    ],
    sla: { whatsapp: "Resposta em até 5 min", ajustes: "Resposta 24h úteis · Execução 48h úteis" },
    cta_label: "Falar com especialista", cta_custom: true,
  },
  {
    id: "enterprise", name: "Enterprise", tagline: "Performance máxima, estrutura robusta",
    ideal_for: "Para grandes escritórios que exigem hiperpersonalização, servidores dedicados, segurança avançada e suporte exclusivo.",
    cnpj_range: "500+ CNPJs", robots: "Até 20 robôs", users: "Ilimitado",
    features: [
      "Tudo do Scale, mais:", "Robôs hiperpersonalizados sob demanda",
      "Servidores dedicados com VPN segura", "Integração com infraestrutura própria",
      "Licenças ilimitadas de usuários", "Dashboards de uso, status e performance",
      "Canal exclusivo para melhorias", "Acesso completo à plataforma AcelleraHub",
      "SLA com garantia contratual",
    ],
    sla: { whatsapp: "Resposta em até 5 min", ajustes: "Resposta 24h úteis · Execução 48h úteis" },
    cta_label: "Falar com especialista", cta_custom: true,
  },
];

const WHATSAPP = "5551993437038";
function buildWaLink(pkg: Package) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre o pacote ${pkg.name} da Acellerador.`)}`;
}

// ── Glass text component ──────────────────────────────────────────────────────
const GlassLabel = ({ children, orange = false }: { children: React.ReactNode; orange?: boolean }) => (
  <span
    className="text-xs font-bold uppercase tracking-widest"
    style={{ color: orange ? "#e76714" : "rgba(160,200,255,0.65)" }}
  >
    {children}
  </span>
);

// ── Package Card ──────────────────────────────────────────────────────────────
const PackageCard = ({
  pkg, index, expanded, onToggle, isInView,
}: {
  pkg: Package; index: number; expanded: boolean; onToggle: () => void; isInView: boolean;
}) => {
  const isPopular = !!pkg.popular;
  const [hovered, setHovered] = useState(false);

  // orange only while this card is hovered — popular badge stays but color follows hover
  const orange = hovered;

  const cardShadow = isPopular
    ? "0 0 0 1px rgba(231,103,20,0.15), 0 12px 48px rgba(0,0,0,0.55), 0 0 60px rgba(231,103,20,0.10), inset 0 1px 0 rgba(255,255,255,0.12)"
    : "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(120,180,255,0.12)";

  const cardShadowHover = isPopular
    ? "0 0 0 1px rgba(231,103,20,0.30), 0 20px 60px rgba(0,0,0,0.60), 0 0 80px rgba(231,103,20,0.14), inset 0 1px 0 rgba(255,255,255,0.16)"
    : "0 16px 50px rgba(0,0,0,0.55), 0 0 50px rgba(231,103,20,0.09), inset 0 1px 0 rgba(231,103,20,0.14)";

  // icon/accent color
  const accent = orange ? "#e76714" : "rgba(120,180,255,0.80)";
  const textMid = orange ? "rgba(255,200,150,0.70)" : "rgba(180,210,255,0.55)";
  const textSub = orange ? "rgba(255,190,130,0.55)" : "rgba(160,200,255,0.50)";
  const textFeat = orange ? "rgba(255,210,170,0.70)" : "rgba(200,225,255,0.60)";

  const titleColor = { color: orange ? "#e76714" : "rgba(220,235,255,0.95)" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2 + index * 0.10, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: isPopular
          ? "linear-gradient(145deg, rgba(6,55,110,0.90) 0%, rgba(3,35,75,0.95) 50%, rgba(1,20,48,0.98) 100%)"
          : "linear-gradient(145deg, rgba(4,42,85,0.80) 0%, rgba(2,28,60,0.88) 55%, rgba(1,15,38,0.92) 100%)",
        border: orange
          ? "1px solid rgba(231,103,20,0.45)"
          : "1px solid rgba(120,170,255,0.15)",
        boxShadow: hovered ? cardShadowHover : cardShadow,
        backdropFilter: "blur(24px)",
        transform: hovered ? "translateY(-6px) scale(1.04)" : "translateY(0px) scale(1)",
        transformOrigin: "center center",
        zIndex: hovered ? 10 : 1,
        transition: "transform 350ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 350ms, border-color 350ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Entrance shimmer sweep */}
      {isInView && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
          initial={{ x: "-100%", opacity: 0.6 }}
          animate={{ x: "200%", opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.35 + index * 0.10, ease: "easeOut" }}
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
          }}
        />
      )}

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-300"
        style={{
          background: orange
            ? "linear-gradient(90deg, transparent, rgba(231,103,20,0.70), transparent)"
            : "linear-gradient(90deg, transparent, rgba(120,180,255,0.35), transparent)",
        }}
      />

      {/* Popular badge — always orange, never changes */}
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
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-2xl font-extrabold tracking-tight" style={titleColor}>
              {pkg.name}
            </h3>
            <span
              className="text-[11px] font-semibold mt-1 px-2 py-0.5 rounded-full"
              style={{
                background: orange ? "rgba(231,103,20,0.10)" : "rgba(120,180,255,0.08)",
                border: orange ? "1px solid rgba(231,103,20,0.25)" : "1px solid rgba(120,180,255,0.18)",
                color: orange ? "rgba(255,190,130,0.80)" : "rgba(160,200,255,0.70)",
              }}
            >
              {pkg.cnpj_range}
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: textMid }}>
            {pkg.tagline}
          </p>
        </div>

        {/* Quick specs */}
        <div className="flex gap-2.5">
          {[{ icon: <Bot className="w-3.5 h-3.5" />, label: pkg.robots },
            { icon: <Users className="w-3.5 h-3.5" />, label: pkg.users }].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{
                background: orange ? "rgba(231,103,20,0.06)" : "rgba(255,255,255,0.05)",
                border: orange ? "1px solid rgba(231,103,20,0.18)" : "1px solid rgba(120,180,255,0.14)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span style={{ color: accent, transition: "color 300ms" }}>{icon}</span>
              <span className="text-xs font-medium transition-colors duration-300" style={{ color: textFeat }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Pricing on request */}
        <div
          className="rounded-xl p-4 flex items-center gap-3"
          style={{
            background: orange ? "rgba(231,103,20,0.06)" : "rgba(255,255,255,0.04)",
            border: orange ? "1px solid rgba(231,103,20,0.20)" : "1px solid rgba(120,180,255,0.12)",
            backdropFilter: "blur(12px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          <MessageCircle className="w-4 h-4 shrink-0" style={{ color: orange ? "#e76714" : "rgba(120,180,255,0.55)" }} />
          <div>
            <p className="text-xs font-bold" style={{ color: orange ? "rgba(255,210,170,0.90)" : "rgba(200,225,255,0.80)" }}>
              Valor sob consulta
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: textSub }}>
              Fale com nosso comercial para uma proposta personalizada
            </p>
          </div>
        </div>

        {/* Features */}
        <div>
          <button onClick={onToggle} className="flex items-center justify-between w-full mb-3">
            <GlassLabel orange={orange}>O que está incluso</GlassLabel>
            <ChevronDown
              className={`w-4 h-4 transition-all duration-300 ${expanded ? "rotate-180" : ""}`}
              style={{ color: orange ? "rgba(231,103,20,0.55)" : "rgba(120,180,255,0.45)" }}
            />
          </button>
          <ul className="space-y-2">
            {pkg.features.slice(0, 4).map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accent }} />
                <span className="text-xs leading-snug" style={{ color: textFeat }}>{feat}</span>
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
                    <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accent }} />
                    <span className="text-xs leading-snug" style={{ color: textFeat }}>{feat}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          {pkg.features.length > 4 && (
            <button
              onClick={onToggle}
              className="mt-2 text-xs transition-colors duration-200"
              style={{ color: orange ? "rgba(231,103,20,0.70)" : "rgba(120,180,255,0.60)" }}
            >
              {expanded ? "Ver menos" : `+${pkg.features.length - 4} itens inclusos`}
            </button>
          )}
        </div>

        {/* SLA */}
        <div
          className="rounded-xl p-3.5 transition-all duration-300"
          style={{
            background: orange ? "rgba(231,103,20,0.04)" : "rgba(255,255,255,0.03)",
            border: orange ? "1px solid rgba(231,103,20,0.12)" : "1px solid rgba(120,180,255,0.10)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <Shield className="w-3.5 h-3.5 transition-colors duration-300" style={{ color: orange ? "rgba(231,103,20,0.55)" : "rgba(120,180,255,0.45)" }} />
            <GlassLabel orange={orange}>SLA garantido</GlassLabel>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3 h-3 shrink-0" style={{ color: "rgba(74,222,128,0.65)" }} />
              <span className="text-xs" style={{ color: textSub }}>{pkg.sla.whatsapp}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 shrink-0" style={{ color: orange ? "rgba(231,103,20,0.55)" : "rgba(96,165,250,0.65)" }} />
              <span className="text-xs" style={{ color: textSub }}>{pkg.sla.ajustes}</span>
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
            style={orange ? {
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              boxShadow: "0 0 20px rgba(231,103,20,0.45), inset 0 1px 0 rgba(255,255,255,0.20)",
            } : {
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(120,180,255,0.22)",
              backdropFilter: "blur(8px)",
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
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

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
    <section ref={sectionRef} id="pacotes" className="scroll-mt-20 px-6 md:px-12 lg:px-16 py-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="text-center mb-12 max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/[0.12] border border-mainOrange/25 text-mainOrange text-xs font-semibold uppercase tracking-wider mb-5"
        >
          <Zap className="w-3 h-3" />
          Planos e pacotes
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
          Automatize na medida{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 3px #e76714) drop-shadow(0 0 12px rgba(231,103,20,0.40))",
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
          className="text-white/45 text-lg leading-relaxed"
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
        className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm"
      >
        {[
          { icon: <Shield className="w-4 h-4" />, text: "Sem fidelidade contratual" },
          { icon: <Clock className="w-4 h-4" />, text: "Suporte com SLA garantido" },
          { icon: <Zap className="w-4 h-4" />, text: "Ativação em até 72h" },
          { icon: <Bot className="w-4 h-4" />, text: "Robôs rodando 24h por dia" },
        ].map(({ icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
            className="flex items-center gap-2"
            style={{ color: "rgba(160,200,255,0.45)" }}
          >
            <span style={{ color: "rgba(231,103,20,0.65)" }}>{icon}</span>
            <span>{text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Benefits strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="w-full mb-10 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(155deg, rgba(4,50,95,0.90) 0%, rgba(2,18,44,0.96) 100%)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-mainOrange/35 to-transparent" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/[0.06]">
          {[
            { n: "01", text: "Sem fidelidade" },
            { n: "02", text: "Onboarding em 5 dias" },
            { n: "03", text: "Suporte via WhatsApp" },
            { n: "04", text: "Robôs 24h por dia" },
            { n: "05", text: "Parametrização incluída" },
            { n: "06", text: "Cancele quando quiser" },
          ].map(({ n, text }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
              className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center"
            >
              <span className="text-2xl font-black" style={{ color: "rgba(231,103,20,0.55)" }}>{n}</span>
              <span className="text-xs font-medium leading-snug" style={{ color: "rgba(180,210,255,0.65)" }}>{text}</span>
            </motion.div>
          ))}
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
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
        className="text-center text-sm mt-10"
        style={{ color: "rgba(160,200,255,0.30)" }}
      >
        Todos os planos incluem suporte via WhatsApp · Dúvidas?{" "}
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
    </section>
  );
}
