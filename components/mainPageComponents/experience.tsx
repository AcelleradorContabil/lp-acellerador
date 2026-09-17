"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Zap, ShieldCheck, TrendingUp, Bot, Users,
  Target, Award, CheckCircle2, Activity,
  Clock, Wifi, BarChart3, Building2, History, Gem, Play, Pause, Star
} from "lucide-react";
import { useCountAnimation, useInViewport } from "@/hooks/useCountAnimation";

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
      <span className="text-lg sm:text-2xl md:text-3xl font-black tabular-nums" style={{ color: "#e76714" }}>
        {animated}
      </span>
      <span className="text-xs font-bold text-white/70 mt-1 leading-tight">{label}</span>
      {sublabel && <span className="text-[10px] text-white/30 mt-0.5">{sublabel}</span>}
    </motion.div>
  );
};

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

      <div
        ref={statsRef as React.RefObject<HTMLDivElement>}
        className="grid grid-cols-3 sm:grid-cols-5 gap-px overflow-x-auto"
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

const values = [
  {
    icon: <Award className="w-5 h-5" />,
    title: "Referência nacional",
    description: "Reconhecidos como líderes em robotização contábil no Brasil, com cases reais e parceiros em grande parte do país.",
    color: "#fbbf24",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Escala junto com você",
    description: "De 50 a mais de 1.500 CNPJs, a estrutura cresce conforme o seu escritório. Sem retrabalho, sem novo sistema, sem nova contratação.",
    color: "#a78bfa",
  },
  {
    icon: <Bot className="w-5 h-5" />,
    title: "Tecnologia de ponta",
    description: "RPA com infraestrutura dedicada, monitoramento feito por pessoas e IA e painel de controle em tempo real via AcelleraHub.",
    color: "#f472b6",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Nascemos na Contabilidade",
    description: "Criamos a Acellerador para resolver um problema que vivemos na pele dentro do Grupo Megaoffice. Cada robô reflete o conhecimento de quem já operou escritório contábil.",
    color: "#e76714",
  },
  {
    icon: <History className="w-5 h-5" />,
    title: "Nossa História",
    description: "Mais de 25 anos de experiência no setor contábil através do Grupo Megaoffice, unindo tradição, confiança e inovação tecnológica.",
    color: "#60a5fa",
  },
  {
    icon: <Gem className="w-5 h-5" />,
    title: "Nossos Valores",
    description: "Somos obcecados pelo cliente, agimos com senso de dono e viés para ação. Não celebramos esforço — celebramos resultado. E fazemos tudo isso num ambiente de segurança psicológica, onde cada pessoa pode dar o seu melhor.",
    color: "#34d399",
  },
];

const StatsBarItem = ({
  end, prefix, suffix, label, isInView, delay,
}: {
  end: number; prefix?: string; suffix?: string; label: string; isInView: boolean; delay?: number;
}) => {
  const animated = useCountAnimation({ end, duration: 2200, startAnimation: isInView, prefix, suffix });
  return (
    <div className="flex flex-col items-center text-center px-4 py-6">
      <span
        className="text-2xl md:text-4xl lg:text-5xl font-black tabular-nums leading-none"
        style={{ color: "#e76714" }}
      >
        {animated}
      </span>
      <span className="text-xs sm:text-sm text-white/50 mt-2 font-medium">{label}</span>
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

  const statsBannerRef = useRef<HTMLDivElement>(null);
  const statsBannerInView = useInView(statsBannerRef, { once: true, amount: 0.4 });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.15 });

  const megaRef = useRef<HTMLDivElement>(null);
  const megaInView = useInView(megaRef, { once: true, amount: 0.2 });

  const jhonnyRef = useRef<HTMLDivElement>(null);
  const jhonnyInView = useInView(jhonnyRef, { once: true, amount: 0.2 });
  const jhonnyNearView = useInView(jhonnyRef, { once: true, margin: "600px 0px" });

  const [isPlayingJhonny, setIsPlayingJhonny] = useState(false);
  const videoJhonnyRef = useRef<HTMLVideoElement>(null);

  const togglePlayJhonny = () => {
    if (videoJhonnyRef.current) {
      if (isPlayingJhonny) {
        videoJhonnyRef.current.pause();
      } else {
        videoJhonnyRef.current.play();
      }
      setIsPlayingJhonny(!isPlayingJhonny);
    }
  };

  useEffect(() => {
    if (jhonnyNearView) videoJhonnyRef.current?.load();
  }, [jhonnyNearView]);

  useEffect(() => {
    const section = jhonnyRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoJhonnyRef.current && !videoJhonnyRef.current.paused) {
          videoJhonnyRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="sobre" className="scroll-mt-20 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-mainOrange/[0.04] blur-[140px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blueAcellera/20 blur-[100px]" />
      </div>

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
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent" />
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-mainOrange/[0.07] blur-[100px] pointer-events-none" />
        <div className="absolute -left-16 bottom-0 w-60 h-60 rounded-full bg-blueAcellera/30 blur-[80px] pointer-events-none" />

        <div className="relative z-10 px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-14 md:py-18">
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
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 }}
                className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5"
              >
                Inovação que nasceu de quem entende a{" "}
                <span style={{ color: "#e76714" }}>
                  vida real do contador.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-white/50 text-lg leading-relaxed"
              >
                A Acellerador não é apenas uma empresa de software. Somos uma extensão tecnológica do <strong>Grupo Megaoffice</strong>, trazendo décadas de expertise contábil para o mundo da hiperautomação.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col gap-3 shrink-0"
            >
              {[
                { value: "+25", label: "anos de experiência contábil" },
                { value: "+3,3M", label: "execuções realizadas" },
                { value: "60+", label: "robôs operando hoje" },
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
                    style={{ color: "#e76714" }}
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

      <div ref={megaRef} className="relative z-10 px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={megaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mainOrange/10 border border-mainOrange/25 text-mainOrange text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(231,103,20,0.10)]">
              <Building2 className="w-3.5 h-3.5" />
              A origem da Acellerador
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-4">
              Criada por contadores,{" "}
              <span style={{ color: "#e76714" }}>para contadores.</span>
            </h3>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              A Acellerador não nasceu numa garagem de tecnologia. Nasceu dentro de um dos maiores grupos contábeis do Sul do Brasil.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={megaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, rgba(4,50,95,0.95) 0%, rgba(2,18,44,0.98) 100%)",
                  border: "1px solid rgba(231,103,20,0.22)",
                  boxShadow: "0 32px 60px rgba(0,0,0,0.50), 0 0 80px rgba(231,103,20,0.05), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
              >
                <div className="h-[2px] bg-gradient-to-r from-transparent via-mainOrange/60 to-transparent" />

                <div className="flex items-center justify-center px-12 py-10 border-b border-white/[0.06]">
                  <Image
                    src="/partners/megaoffice.png"
                    alt="Grupo Megaoffice"
                    width={280}
                    height={90}
                    className="object-contain w-auto h-16"
                  />
                </div>

                <div className="grid grid-cols-3 divide-x divide-white/[0.06]">
                  {[
                    { value: "+25", label: "anos de mercado" },
                    { value: "Sul", label: "do Brasil" },
                    { value: "Real", label: "origem do produto" },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex flex-col items-center justify-center py-6 px-3 text-center">
                      <span className="text-xl font-black" style={{ color: "#e76714" }}>{value}</span>
                      <span className="text-[11px] text-white/40 mt-1 leading-snug">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-5 border-t border-white/[0.06]" style={{ background: "rgba(0,0,0,0.15)" }}>
                  <p className="text-sm text-white/35 italic leading-relaxed">
                    "Vivemos os mesmos prazos, a mesma pressão, o mesmo volume. Por isso a Acellerador funciona — criamos o que precisávamos."
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={megaInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4 text-white/60 text-base leading-relaxed">
                <p>
                  O <strong className="text-white/90">Grupo Megaoffice</strong> passou décadas gerenciando centenas de CNPJs, cumprindo prazos fiscais e formando equipes — na raça. Foi sentindo essa dor de perto que enxergamos onde a tecnologia poderia transformar a operação.
                </p>
                <p>
                  A Acellerador nasceu dessa necessidade real. Não somos desenvolvedores tentando entender a contabilidade — somos contadores que dominaram a tecnologia para resolver o que nós mesmos vivemos.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  "Décadas gerenciando conformidade fiscal no dia a dia",
                  "Centenas de CNPJs operados antes de criar os robôs",
                  "Cada automação resolve uma dor que a gente já sentiu",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: "#e76714" }} />
                    <span className="text-white/55 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        id="jhonny"
        ref={jhonnyRef}
        className="relative z-10 overflow-hidden"
        style={{
          borderTop: "1px solid rgba(231,103,20,0.12)",
          borderBottom: "1px solid rgba(231,103,20,0.12)",
          background: "linear-gradient(180deg, rgba(2,10,26,0.60) 0%, rgba(1,6,18,0.80) 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-mainOrange/[0.05] blur-[120px]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/15 to-transparent" />
        </div>

        <div className="relative z-10 px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-20 md:py-24">
          <div className="max-w-6xl mx-auto">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={jhonnyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mainOrange/10 border border-mainOrange/30 text-mainOrange text-xs font-black uppercase tracking-widest shadow-[0_0_24px_rgba(231,103,20,0.12)]">
                <Star className="w-3.5 h-3.5 fill-mainOrange" />
                Parceria oficial
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr] gap-8 md:gap-10 lg:gap-14 items-center">

              <motion.div
                initial={{ opacity: 0, x: -32, scale: 0.97 }}
                animate={jhonnyInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="relative mx-auto lg:mx-0 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-none"
              >
                <div
                  className="relative rounded-2xl overflow-hidden bg-black"
                  style={{
                    border: "1px solid rgba(231,103,20,0.35)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.65), 0 0 100px rgba(231,103,20,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange to-transparent z-10" />

                  <div className="relative aspect-[9/16]">
                    <video
                      ref={videoJhonnyRef}
                      className="w-full h-full object-cover"
                      playsInline
                      preload="metadata"
                      onPlay={() => setIsPlayingJhonny(true)}
                      onPause={() => setIsPlayingJhonny(false)}
                    >
                      {jhonnyNearView && <source src="/videos/jhonny-martins.mp4" type="video/mp4" />}
                    </video>

                    {!isPlayingJhonny && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group/play"
                        style={{ background: "linear-gradient(135deg, rgba(1,12,30,0.75) 0%, rgba(231,103,20,0.08) 100%)" }}
                        onClick={togglePlayJhonny}
                      >
                        <div
                          className="relative w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover/play:scale-105 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                            boxShadow: "0 0 40px rgba(231,103,20,0.55), 0 8px 24px rgba(0,0,0,0.40)",
                          }}
                        >
                          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "#e76714" }} />
                          <Play className="w-9 h-9 text-white fill-white ml-1.5" />
                        </div>
                        <span className="text-white/60 text-sm font-medium">Assistir depoimento</span>
                      </div>
                    )}

                    {isPlayingJhonny && (
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0,0,0,0.25)" }}
                        onClick={togglePlayJhonny}
                      >
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(0,0,0,0.55)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          <Pause className="w-7 h-7 text-white fill-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="flex items-center gap-3 px-5 py-3"
                    style={{ background: "rgba(0,0,0,0.50)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="relative w-2 h-2 rounded-full bg-mainOrange shrink-0">
                      <div className="absolute inset-0 rounded-full bg-mainOrange animate-ping opacity-50" />
                    </div>
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Jhonny Martins · Vice-Presidente SERAC</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 32 }}
                animate={jhonnyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-7"
              >
                <div className="flex flex-wrap gap-2">
                  {["Vice-Presidente · SERAC", "O Contador das Estrelas", "Speaker Nacional", "+10.000 clientes recorrentes"].map((chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(231,103,20,0.10)",
                        border: "1px solid rgba(231,103,20,0.28)",
                        color: "rgba(231,103,20,0.90)",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div>
                  <h3
                    className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter text-white mb-1"
                  >
                    Jhonny
                  </h3>
                  <h3
                    className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter"
                    style={{ color: "#e76714" }}
                  >
                    Martins.
                  </h3>
                </div>

                <blockquote
                  className="relative pl-5"
                  style={{ borderLeft: "2px solid rgba(231,103,20,0.50)" }}
                >
                  <p className="text-white/65 text-lg leading-relaxed italic">
                    "Eu sempre falo da importância de você ter pessoas competentes, processos inteligentes e sistemas eficientes — e a Acellerador vem impactando o mercado contábil."
                  </p>
                </blockquote>

                <p className="text-white/45 leading-relaxed">
                  Somos sócios de Jhonny Martins no Fireclub. Vice-Presidente da SERAC e referência nacional em contabilidade, ele atende mais de 10.000 clientes recorrentes em todo o Brasil — entre eles XP Investimentos, Bradesco, Thiago Nigro e Boca Rosa. Uma parceria construída sobre autoridade real e propósito compartilhado.
                </p>

                <div className="space-y-3 pt-1">
                  {[
                    { icon: <ShieldCheck className="w-4 h-4" />, text: "Sociedade no Fireclub — parceria de negócios real" },
                    { icon: <TrendingUp className="w-4 h-4" />, text: "+10.000 clientes recorrentes: XP, Bradesco, Thiago Nigro e mais" },
                    { icon: <Zap className="w-4 h-4" />, text: "Homenageado no Top of Business 2025 em Dubai" },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5" style={{ color: "rgba(231,103,20,0.70)" }}>{icon}</span>
                      <span className="text-sm text-white/55 leading-relaxed">{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={statsBannerRef}
        className="relative"
        style={{
          background: "rgba(2,12,30,0.98)",
          borderTop: "1px solid rgba(231,103,20,0.20)",
          borderBottom: "1px solid rgba(231,103,20,0.20)",
        }}
      >
        <div className="px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {[
              { end: 25, prefix: "+", suffix: " anos", label: "de expertise contábil" },
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

      <div className="relative z-10 px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-16">

        <div ref={valuesRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.20em] text-white/30 mb-2">Fundamentos e Pilares</p>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Nossa cultura reflete{" "}
              <span style={{ color: "#e76714" }}>nosso compromisso.</span>
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