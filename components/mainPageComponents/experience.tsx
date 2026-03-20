"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Zap, ShieldCheck, TrendingUp, Bot, Users,
  Target, Award, CheckCircle2, Activity,
  Clock, Wifi, BarChart3,
} from "lucide-react";
import { useCountAnimation, useInViewport } from "@/hooks/useCountAnimation";

// ── Live feed data ─────────────────────────────────────────────────────────────
const FEED_POOL = [
  { robot: "eSocial", company: "Omega Contábil", action: "Transmitido com sucesso" },
  { robot: "DCTF WEB", company: "MegaOffice", action: "Recibo salvo automaticamente" },
  { robot: "FGTS Digital", company: "Cardeal Contabilidade", action: "Guia emitida e arquivada" },
  { robot: "Folha", company: "CG Contábil", action: "PDFs gerados e organizados" },
  { robot: "REINF", company: "Mazzola & Assoc.", action: "Todos os blocos transmitidos" },
  { robot: "DAS Simples", company: "Silveira & Soares", action: "Lote de guias emitido" },
  { robot: "EFD", company: "Akartos Consultoria", action: "Arquivo enviado ao SPED" },
  { robot: "Rescisão", company: "Zeleve Contábil", action: "Documentos gerados" },
  { robot: "MIT", company: "Pessato Assessoria", action: "Monitoramento concluído" },
  { robot: "DESTDA", company: "Omnia Contábil", action: "Declaração transmitida" },
  { robot: "Notas SEFAZ", company: "Conzatti Contabil.", action: "Notas baixadas em lote" },
  { robot: "SPED Fiscal", company: "ECS Soluções", action: "Validado e transmitido" },
];

let feedIndex = 0;
function nextFeedItem() {
  const item = FEED_POOL[feedIndex % FEED_POOL.length];
  feedIndex++;
  return { ...item, id: Date.now() + Math.random(), ago: "agora" };
}

type FeedItem = ReturnType<typeof nextFeedItem>;

// ── Stat counter (used inside dashboard) ──────────────────────────────────────
const StatCounter = ({
  value, prefix = "", suffix = "", label, sublabel, delay = 0, isInView,
}: {
  value: number; prefix?: string; suffix?: string;
  label: string; sublabel?: string; delay?: number; isInView: boolean;
}) => {
  const animated = useCountAnimation({ end: value, duration: 2000, startAnimation: isInView, prefix, suffix });
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center text-center px-2"
    >
      <span className="text-2xl md:text-3xl font-black tabular-nums" style={{ color: "#e76714", textShadow: "0 0 14px rgba(231,103,20,0.50)" }}>
        {animated}
      </span>
      <span className="text-xs font-bold text-white/70 mt-1 leading-tight">{label}</span>
      {sublabel && <span className="text-[10px] text-white/30 mt-0.5">{sublabel}</span>}
    </motion.div>
  );
};

// ── Dashboard mockup ───────────────────────────────────────────────────────────
const ACTIVE_ROBOTS = [
  "eSocial", "DCTF WEB", "FGTS Digital", "Folha",
  "REINF", "DAS Simples", "EFD", "MIT", "Rescisão",
];

const DashboardMockup = ({ isInView }: { isInView: boolean }) => {
  const { ref: statsRef, isInView: statsInView } = useInViewport({ threshold: 0.1 });
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [barWidths, setBarWidths] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;
    const initial = Array.from({ length: 4 }, () => nextFeedItem());
    setFeed(initial);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setFeed(prev => [nextFeedItem(), ...prev.slice(0, 4)]);
    }, 2500);
    return () => clearInterval(interval);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const targets = [92, 78, 85, 63, 97];
    targets.forEach((target, i) => {
      setTimeout(() => {
        setBarWidths(prev => {
          const next = [...prev];
          next[i] = target;
          return next;
        });
      }, 600 + i * 150);
    });
  }, [isInView]);

  const barDays = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        background: "linear-gradient(155deg, rgba(3,42,82,0.98) 0%, rgba(1,14,36,1) 100%)",
        border: "1px solid rgba(231,103,20,0.22)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.60), 0 0 100px rgba(231,103,20,0.06), inset 0 1px 0 rgba(255,255,255,0.07)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/60 to-transparent" />

      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.20)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs font-bold text-white/40 tracking-wide">AcelleraHub · Painel de Controle</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-2 h-2 rounded-full bg-green-400">
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
          </div>
          <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Ao vivo</span>
        </div>
      </div>

      {/* Stats row */}
      <div
        ref={statsRef as React.RefObject<HTMLDivElement>}
        className="grid grid-cols-3 md:grid-cols-5 gap-px"
        style={{ background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {[
          { value: 3300000, prefix: "+", suffix: "", label: "Execuções", sublabel: "total histórico" },
          { value: 500000, prefix: "+", suffix: "", label: "Horas econ.", sublabel: "DP e Fiscal" },
          { value: 16, prefix: "+", suffix: "", label: "Estados", sublabel: "atendidos" },
          { value: 24, prefix: "", suffix: "/7", label: "Operação", sublabel: "ininterrupta" },
          { value: 60, prefix: "+", suffix: "", label: "Robôs", sublabel: "disponíveis" },
        ].map((s, i) => (
          <div key={s.label} className="bg-[#010e24] py-4 px-2 flex items-center justify-center">
            <StatCounter {...s} delay={i * 100} isInView={statsInView} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
        <div className="md:col-span-2 bg-[#010e24] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-mainOrange" />
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Automações em tempo real</span>
            </div>
            <span className="text-[10px] text-white/25">atualizando...</span>
          </div>

          <div className="space-y-2 min-h-[160px]">
            <AnimatePresence initial={false}>
              {feed.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -16, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="relative shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" style={{ animationDuration: "2s" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold" style={{ color: "#e76714" }}>{item.robot}</span>
                      <span className="text-[10px] text-white/30">·</span>
                      <span className="text-[10px] text-white/45 truncate">{item.company}</span>
                    </div>
                    <p className="text-[10px] text-white/30 mt-0.5">{item.action}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-[10px] text-white/25">{item.ago}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Automações esta semana</span>
            </div>
            <div className="flex items-end gap-2 h-12">
              {barDays.map((day, i) => (
                <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end" style={{ height: "36px" }}>
                    <motion.div
                      className="w-full rounded-t-md"
                      style={{
                        height: `${barWidths[i]}%`,
                        background: i === 4
                          ? "linear-gradient(180deg, #e76714 0%, rgba(231,103,20,0.40) 100%)"
                          : "linear-gradient(180deg, rgba(96,165,250,0.60) 0%, rgba(96,165,250,0.15) 100%)",
                        transition: "height 800ms cubic-bezier(0.34,1.2,0.64,1)",
                        boxShadow: i === 4 ? "0 0 10px rgba(231,103,20,0.40)" : "none",
                      }}
                    />
                  </div>
                  <span className="text-[9px] text-white/25">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#010e24] p-5" style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-3.5 h-3.5 text-mainOrange" />
            <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Robôs ativos</span>
          </div>
          <div className="space-y-2">
            {ACTIVE_ROBOTS.map((robot, i) => (
              <motion.div
                key={robot}
                initial={{ opacity: 0, x: 12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                className="flex items-center justify-between px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-xs text-white/60">{robot}</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ boxShadow: "0 0 4px rgba(74,222,128,0.70)" }} />
                  <span className="text-[10px] text-green-400 font-semibold">ON</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl"
            style={{ background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.20)" }}
          >
            <Wifi className="w-3.5 h-3.5 text-green-400" />
            <div>
              <p className="text-[10px] font-bold text-green-400">Infraestrutura estável</p>
              <p className="text-[9px] text-white/30">99.9% uptime nos últimos 30 dias</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center justify-between px-5 py-2.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.15)" }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-white/20" />
            <span className="text-[10px] text-white/25">Monitoramento 24h · 7 dias</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-white/20" />
            <span className="text-[10px] text-white/25">SLA garantido</span>
          </div>
        </div>
        <span className="text-[10px] text-white/20">AcelleraHub v3.4</span>
      </div>
    </motion.div>
  );
};

// ── Value cards data ───────────────────────────────────────────────────────────
const values = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Nascemos contadores",
    description: "Criamos a Acellerador para resolver um problema que vivemos na pele. Cada robô reflete o conhecimento de quem já operou escritório contábil.",
    color: "#e76714",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Velocidade com precisão",
    description: "Robôs executam em segundos o que levaria horas — com validação automática, conferência de dados e zero margem para erro humano.",
    color: "#60a5fa",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Operação 24h garantida",
    description: "Robôs não faltam, não cansam, não erram por distração. Trabalham enquanto sua equipe foca em análise e crescimento.",
    color: "#34d399",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Escala junto com você",
    description: "De 50 a 500+ CNPJs, a estrutura cresce conforme o seu escritório. Sem retrabalho, sem novo sistema, sem nova contratação.",
    color: "#a78bfa",
  },
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Tecnologia de ponta",
    description: "RPA com infraestrutura dedicada, monitoramento com IA e painel de controle em tempo real via AcelleraHub.",
    color: "#f472b6",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Referência nacional",
    description: "Reconhecidos como líderes em automação contábil no Brasil, com cases reais e parceiros em todo o país.",
    color: "#fbbf24",
  },
];

// ── Stats bar item ─────────────────────────────────────────────────────────────
const StatsBarItem = ({
  end, prefix, suffix, label, isInView, delay,
}: {
  end: number; prefix?: string; suffix?: string; label: string; isInView: boolean; delay?: number;
}) => {
  const animated = useCountAnimation({ end, duration: 2200, startAnimation: isInView, prefix, suffix });
  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <span
        className="text-4xl md:text-5xl font-black tabular-nums leading-none"
        style={{ color: "#e76714", textShadow: "0 0 16px rgba(231,103,20,0.55), 0 0 40px rgba(231,103,20,0.25)" }}
      >
        {animated}
      </span>
      <span className="text-sm text-white/50 mt-2 font-medium">{label}</span>
    </div>
  );
};

// ── Main section ───────────────────────────────────────────────────────────────
const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  const statsBannerRef = useRef<HTMLDivElement>(null);
  const statsBannerInView = useInView(statsBannerRef, { once: true, amount: 0.4 });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.15 });

  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} id="sobre" className="scroll-mt-20 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-mainOrange/[0.04] blur-[140px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blueAcellera/20 blur-[100px]" />
      </div>

      {/* ── 1. Full-width statement banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(155deg, rgba(4,50,95,0.96) 0%, rgba(2,18,44,0.99) 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Orange top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent" />
        {/* Ambient orbs */}
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-mainOrange/[0.07] blur-[100px] pointer-events-none" />
        <div className="absolute -left-16 bottom-0 w-60 h-60 rounded-full bg-blueAcellera/30 blur-[80px] pointer-events-none" />

        <div className="relative z-10 px-6 md:px-16 lg:px-20 py-14 md:py-18">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-8"
            style={{
              background: "rgba(231,103,20,0.12)",
              border: "1px solid rgba(231,103,20,0.35)",
              color: "#e76714",
              boxShadow: "0 0 20px rgba(231,103,20,0.12)",
            }}
          >
            <Users className="w-3.5 h-3.5" />
            Sobre a Acellerador
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Left: Statement */}
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5"
              >
                7 anos construindo a automação que o escritório contábil{" "}
                <span style={{ color: "#e76714", textShadow: "0 0 4px #e76714, 0 0 24px rgba(231,103,20,0.50)" }}>
                  precisava.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-white/50 text-lg leading-relaxed"
              >
                Nascemos dentro de um escritório contábil e entendemos cada dor de perto. Nossa missão é devolver às equipes o tempo que o trabalho repetitivo rouba — para que contadores sejam contadores, não operadores de sistema.
              </motion.p>
            </div>

            {/* Right: 3 metric pills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col gap-3 shrink-0"
            >
              {[
                { value: "+7", label: "anos de mercado" },
                { value: "+3,3M", label: "execuções realizadas" },
                { value: "16+", label: "estados atendidos" },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.40 + i * 0.09 }}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-2xl"
                  style={{
                    background: "rgba(231,103,20,0.08)",
                    border: "1px solid rgba(231,103,20,0.22)",
                  }}
                >
                  <span
                    className="text-2xl font-black whitespace-nowrap"
                    style={{ color: "#e76714", textShadow: "0 0 14px rgba(231,103,20,0.55)" }}
                  >
                    {value}
                  </span>
                  <span className="text-sm text-white/45 leading-snug">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. Dark stats bar ── */}
      <div
        ref={statsBannerRef}
        className="relative"
        style={{
          background: "rgba(2,12,30,0.98)",
          borderTop: "1px solid rgba(231,103,20,0.20)",
          borderBottom: "1px solid rgba(231,103,20,0.20)",
        }}
      >
        <div className="px-6 md:px-16 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { end: 7, prefix: "+", suffix: " anos", label: "de mercado" },
              { end: 3300000, prefix: "+", suffix: "", label: "execuções realizadas" },
              { end: 16, prefix: "", suffix: "+", label: "estados atendidos" },
              { end: 60, prefix: "+", suffix: "", label: "robôs disponíveis" },
            ].map((stat, i) => (
              <StatsBarItem
                key={stat.label}
                end={stat.end}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                isInView={statsBannerInView}
                delay={i * 100}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. 2-col: Values + Dashboard ── */}
      <div className="relative z-10 px-6 md:px-16 lg:px-20 py-16">

        {/* Dashboard mockup (full-width above the grid) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8 max-w-3xl mx-auto"
        >
          <p className="text-xs font-bold uppercase tracking-[0.20em] text-white/30 mb-2">Acompanhe em tempo real</p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Veja o AcelleraHub{" "}
            <span style={{ color: "#e76714", textShadow: "0 0 12px rgba(231,103,20,0.40)" }}>em ação.</span>
          </h3>
        </motion.div>

        <div className="mb-16">
          <DashboardMockup isInView={isInView} />
        </div>

        {/* Values section */}
        <div ref={valuesRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.20em] text-white/30 mb-2">Por que a Acellerador</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Seis razões para{" "}
              <span style={{ color: "#e76714", textShadow: "0 0 12px rgba(231,103,20,0.40)" }}>não olhar para trás.</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 28 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex flex-col gap-4 p-5 rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: "linear-gradient(155deg, rgba(4,50,95,0.90) 0%, rgba(2,18,44,0.96) 100%)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
                  transition: "transform 300ms cubic-bezier(0.34,1.2,0.64,1), box-shadow 300ms, border-color 300ms",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.borderColor = `${v.color}40`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.40), 0 0 30px ${v.color}18, inset 0 1px 0 rgba(255,255,255,0.08)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)";
                }}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${v.color} 0%, ${v.color}20 100%)` }} />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${v.color}30, transparent)` }} />

                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${v.color}14`,
                    border: `1px solid ${v.color}35`,
                    color: v.color,
                    boxShadow: `0 0 20px ${v.color}20`,
                  }}
                >
                  {v.icon}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white mb-1.5 tracking-tight">{v.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export { Experience };
