"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Zap,
  Clock,
  ShieldCheck,
  TrendingUp,
  Bot,
  Users,
  Target,
  Award,
  Rocket,
  Code2,
  BarChart3,
  Globe,
  Trophy,
} from "lucide-react";
import { useCountAnimation, useInViewport } from "@/hooks/useCountAnimation";

// ─── Stat counter item ───────────────────────────────────────────────────────
const StatCounter = ({
  value,
  prefix = "",
  suffix = "",
  label,
  sublabel,
  delay = 0,
  isInView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel?: string;
  delay?: number;
  isInView: boolean;
}) => {
  const animated = useCountAnimation({
    end: value,
    duration: 2200,
    startAnimation: isInView,
    prefix,
    suffix,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center text-center group"
    >
      <span
        className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums"
        style={{
          background: "linear-gradient(135deg, #e76714 0%, #ff9a56 60%, #ffbb85 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 20px rgba(231,103,20,0.4))",
        }}
      >
        {animated}
      </span>
      <span className="mt-2 text-base font-semibold text-white/80 leading-tight">
        {label}
      </span>
      {sublabel && (
        <span className="mt-0.5 text-xs text-white/35">{sublabel}</span>
      )}
    </motion.div>
  );
};

// ─── Value card ───────────────────────────────────────────────────────────────
const ValueCard = ({
  icon,
  title,
  description,
  delay,
  isInView,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.55, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
    className="group relative flex flex-col gap-4 p-6 rounded-2xl
      bg-white/[0.04] border border-white/[0.08]
      hover:bg-white/[0.08] hover:border-white/[0.14]
      transition-all duration-300"
    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow =
        "0 8px 40px rgba(0,0,0,0.35), 0 0 40px rgba(231,103,20,0.06)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.2)";
    }}
  >
    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-mainOrange/[0.12] border border-mainOrange/20 text-mainOrange group-hover:bg-mainOrange/[0.18] transition-colors duration-300">
      {icon}
    </div>
    <div>
      <h3 className="text-base font-bold text-white mb-1.5">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// ─── Team card ────────────────────────────────────────────────────────────────
type TeamMember = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  quote: string;
  tags: string[];
  featured?: boolean;
};

const TeamCard = ({
  member,
  delay,
  isInView,
}: {
  member: TeamMember;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 36 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.65, delay: delay / 1000, ease: [0.4, 0, 0.2, 1] }}
    className={`
      group relative flex flex-col sm:flex-row gap-0 rounded-2xl overflow-hidden
      transition-all duration-300
      ${member.featured
        ? "border border-mainOrange/35 shadow-[0_0_48px_rgba(231,103,20,0.14),0_8px_32px_rgba(0,0,0,0.4)]"
        : "border border-white/[0.09] shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      }
    `}
  >
    {/* ── Photo column ── */}
    <div className="relative w-full sm:w-56 sm:shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden">
      <Image
        src={member.photo}
        alt={member.name}
        fill
        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#021c32]/80 via-[#021c32]/20 to-transparent" />
      {member.featured && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(160deg, rgba(231,103,20,0.12) 0%, transparent 50%)" }}
        />
      )}
    </div>

    {/* ── Content column ── */}
    <div className={`
      flex flex-col justify-between gap-5 p-6 flex-1
      ${member.featured ? "bg-mainOrange/[0.04]" : "bg-white/[0.03]"}
    `}>
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <h3 className="text-xl font-bold text-white">{member.name}</h3>
          <span className={`
            px-2.5 py-0.5 rounded-full text-xs font-semibold
            ${member.featured
              ? "bg-mainOrange/20 border border-mainOrange/35 text-mainOrange"
              : "bg-white/[0.07] border border-white/[0.12] text-white/55"
            }
          `}>
            {member.role}
          </span>
        </div>

        {/* Bio */}
        <p className="text-sm text-white/55 leading-relaxed">{member.bio}</p>
      </div>

      {/* Quote */}
      <blockquote className={`
        relative pl-4 border-l-2 italic text-sm leading-relaxed
        ${member.featured ? "border-mainOrange/50 text-white/60" : "border-white/20 text-white/40"}
      `}>
        "{member.quote}"
      </blockquote>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {member.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs font-medium
              bg-white/[0.05] border border-white/[0.09] text-white/45
              group-hover:border-white/[0.14] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ─── Timeline ─────────────────────────────────────────────────────────────────
const milestones = [
  {
    year: "2017",
    label: "O início",
    text: "Primeiros scripts de automação contábil criados internamente para resolver a dor do próprio escritório.",
    icon: Rocket,
    metric: null,
    current: false,
  },
  {
    year: "2019",
    label: "AcelleraHub",
    text: "Lançamento da plataforma AcelleraHub — o painel central que conecta robôs, clientes e monitoramento em tempo real.",
    icon: Code2,
    metric: null,
    current: false,
  },
  {
    year: "2021",
    label: "Escala real",
    text: "Marca de 500 mil automações executadas. A prova de que a tecnologia funciona em produção, todos os dias.",
    icon: BarChart3,
    metric: "+500K automações",
    current: false,
  },
  {
    year: "2023",
    label: "Expansão nacional",
    text: "120 escritórios parceiros em todo o Brasil. A Acellerador se consolida como referência nacional em RPA contábil.",
    icon: Globe,
    metric: "18 parceiros",
    current: false,
  },
  {
    year: "2024",
    label: "Agora",
    text: "Mais de 1,3 milhão de automações executadas. 17 robôs ativos, infraestrutura dedicada e crescendo todo mês.",
    icon: Trophy,
    metric: "+1,3M automações",
    current: true,
  },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative mt-4">
      {/* Vertical spine */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.07] hidden md:block" />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-mainOrange via-orange-400 to-orange-300/30 hidden md:block origin-top"
        style={{ height: lineHeight }}
      />
      {/* Mobile spine */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-white/[0.07] md:hidden" />
      <motion.div
        className="absolute left-5 top-0 w-px bg-gradient-to-b from-mainOrange to-orange-300/30 md:hidden origin-top"
        style={{ height: lineHeight }}
      />

      <div className="flex flex-col gap-12 md:gap-16">
        {milestones.map((m, i) => {
          const isLeft = i % 2 === 0;
          const Icon = m.icon;
          const cardRef = useRef<HTMLDivElement>(null);
          const cardInView = useInView(cardRef, { once: true, amount: 0.4 });

          return (
            <div key={m.year} className="relative grid md:grid-cols-2 gap-6 md:gap-16 items-center pl-14 md:pl-0">
              {/* ── Desktop: left side ── */}
              <motion.div
                ref={!isLeft ? undefined : cardRef}
                initial={{ opacity: 0, x: -60 }}
                animate={cardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                className={`hidden md:flex ${isLeft ? "justify-end" : "justify-start order-2"}`}
              >
                {isLeft ? (
                  <MilestoneCard m={m} Icon={Icon} inView={cardInView} />
                ) : (
                  <YearBadge year={m.year} current={m.current} />
                )}
              </motion.div>

              {/* ── Center dot ── */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
                <MilestoneDot current={m.current} inView={cardInView} />
              </div>

              {/* ── Desktop: right side ── */}
              <motion.div
                ref={isLeft ? undefined : cardRef}
                initial={{ opacity: 0, x: 60 }}
                animate={cardInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                className={`hidden md:flex ${isLeft ? "order-2 justify-start" : "justify-end"}`}
              >
                {isLeft ? (
                  <YearBadge year={m.year} current={m.current} />
                ) : (
                  <MilestoneCard m={m} Icon={Icon} inView={cardInView} />
                )}
              </motion.div>

              {/* ── Mobile layout ── */}
              <MobileMilestone m={m} Icon={Icon} index={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MilestoneDot = ({ current, inView }: { current: boolean; inView: boolean }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={inView ? { scale: 1 } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
    className="relative flex items-center justify-center"
  >
    {current && (
      <>
        <div className="absolute w-12 h-12 rounded-full bg-mainOrange/20 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="absolute w-8 h-8 rounded-full bg-mainOrange/15 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.4s" }} />
      </>
    )}
    <div className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center
      ${current ? "border-mainOrange bg-mainOrange shadow-[0_0_16px_rgba(231,103,20,0.7)]" : "border-mainOrange/60 bg-[#021c32]"}`}
    >
      {!current && <div className="w-1.5 h-1.5 rounded-full bg-mainOrange/70" />}
    </div>
  </motion.div>
);

const YearBadge = ({ year, current }: { year: string; current: boolean }) => (
  <div className="flex items-center">
    <span
      className={`text-5xl md:text-6xl font-black tabular-nums leading-none
        ${current ? "text-mainOrange" : "text-white/15"}`}
      style={current ? {
        background: "linear-gradient(135deg, #e76714, #ff9a56)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 20px rgba(231,103,20,0.5))",
      } : {}}
    >
      {year}
    </span>
  </div>
);

const MilestoneCard = ({
  m,
  Icon,
  inView,
}: {
  m: typeof milestones[0];
  Icon: React.ElementType;
  inView: boolean;
}) => (
  <div className={`
    max-w-sm w-full p-5 rounded-2xl flex flex-col gap-3
    transition-all duration-300
    ${m.current
      ? "bg-mainOrange/[0.08] border border-mainOrange/30 shadow-[0_0_32px_rgba(231,103,20,0.12)]"
      : "bg-white/[0.04] border border-white/[0.09]"
    }
  `}>
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
        ${m.current ? "bg-mainOrange/20 border border-mainOrange/30" : "bg-white/[0.07] border border-white/[0.10]"}`}
      >
        <Icon className={`w-4 h-4 ${m.current ? "text-mainOrange" : "text-white/50"}`} />
      </div>
      <span className={`text-sm font-bold uppercase tracking-wider
        ${m.current ? "text-mainOrange" : "text-white/60"}`}>
        {m.label}
      </span>
    </div>
    <p className="text-sm text-white/55 leading-relaxed">{m.text}</p>
    {m.metric && (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mainOrange/[0.12] border border-mainOrange/20 w-fit mt-1">
        <TrendingUp className="w-3 h-3 text-mainOrange" />
        <span className="text-xs font-bold text-mainOrange">{m.metric}</span>
      </div>
    )}
  </div>
);

const MobileMilestone = ({
  m,
  Icon,
  index,
}: {
  m: typeof milestones[0];
  Icon: React.ElementType;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
      className="md:hidden col-span-2 flex flex-col gap-2"
    >
      {/* Mobile dot on spine */}
      <div className="absolute left-[14px] flex items-center justify-center">
        <MilestoneDot current={m.current} inView={inView} />
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-2xl font-black ${m.current ? "text-mainOrange" : "text-white/30"}`}>{m.year}</span>
        <span className={`text-xs font-bold uppercase tracking-wider ${m.current ? "text-mainOrange" : "text-white/40"}`}>{m.label}</span>
      </div>
      <p className="text-sm text-white/50 leading-relaxed">{m.text}</p>
      {m.metric && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mainOrange/[0.12] border border-mainOrange/20 w-fit">
          <TrendingUp className="w-3 h-3 text-mainOrange" />
          <span className="text-xs font-bold text-mainOrange">{m.metric}</span>
        </div>
      )}
    </motion.div>
  );
};

// ─── Main section ─────────────────────────────────────────────────────────────
const Experience = () => {
  const { ref: statsRef, isInView: statsInView } = useInViewport({ threshold: 0.2 });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.15 });
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, amount: 0.2 });

  const stats = [
    { value: 7, prefix: "+", suffix: " anos", label: "Experiência", sublabel: "em automação contábil" },
    { value: 1330000, prefix: "+", label: "Automações", sublabel: "executadas até hoje" },
    { value: 500000, prefix: "+", label: "Horas economizadas", sublabel: "devolvidas aos escritórios" },
    { value: 18, prefix: "+", label: "Parceiros ativos", sublabel: "em todo o Brasil" },
    { value: 100, suffix: "%", label: "Satisfação", sublabel: "dos nossos clientes" },
  ];

  const values = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Nascemos contadores",
      description: "Entendemos o problema porque vivemos ele. Nossa automação foi construída por quem conhece o dia a dia de um escritório contábil.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Velocidade sem abrir mão da precisão",
      description: "Nossos robôs executam em segundos o que levaria horas — com conferência automática, validação de dados e zero margem para erro humano.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Confiabilidade 24h por dia",
      description: "Os robôs não faltam, não cansam e não erram por distração. Trabalham enquanto sua equipe foca em análise, relacionamento e crescimento.",
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Escala junto com você",
      description: "De 50 a 500+ CNPJs, a estrutura cresce conforme o seu escritório. Sem retrabalho, sem novo sistema, sem nova equipe.",
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "Tecnologia de ponta",
      description: "RPA com infraestrutura dedicada, monitoramento com IA e painel de controle em tempo real via AcelleraHub.",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Referência nacional",
      description: "Reconhecidos como líderes em automação contábil no Brasil, com cases reais, resultados mensuráveis e parceiros em todo o país.",
    },
  ];

  return (
    <section id="sobre" className="scroll-mt-20 relative overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-mainOrange/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-20 py-8">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/[0.12] border border-mainOrange/25 text-mainOrange text-xs font-semibold uppercase tracking-wider mb-5">
            <Users className="w-3 h-3" />
            Sobre nós
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Somos a{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e76714 0%, #ff9a56 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              referência nacional
            </span>{" "}
            em automação contábil.
          </h2>
          <p className="text-white/45 text-lg leading-relaxed">
            Combinamos tecnologia RPA de ponta com conhecimento profundo do mercado contábil brasileiro para transformar escritórios comuns em operações de alta performance.
          </p>
        </motion.div>

        {/* ── Stats band ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px mb-16
            rounded-2xl overflow-hidden border border-white/[0.08]
            bg-white/[0.08]"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center
                py-8 px-4 bg-[#021c32]"
            >
              <StatCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                sublabel={stat.sublabel}
                delay={i * 120}
                isInView={statsInView}
              />
            </div>
          ))}
        </div>

        {/* ── Values grid ── */}
        <div ref={valuesRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-8 text-center"
          >
            Por que a Acellerador
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <ValueCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                description={v.description}
                delay={i * 80}
                isInView={valuesInView}
              />
            ))}
          </div>
        </div>

        {/* ── Team ── */}
        <div ref={teamRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={teamInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-8 text-center"
          >
            Quem está por trás
          </motion.p>
          <div className="flex flex-col gap-5 max-w-3xl mx-auto">
            {([
              {
                name: "João",
                role: "CEO & Fundador",
                photo: "/team/joao.jpg",
                bio: "Contador de formação que virou empreendedor ao perceber que a maior dor dos escritórios não era falta de talento — era excesso de trabalho repetitivo. Fundou a Acellerador para transformar essa realidade, liderando a visão de produto, a estratégia comercial e o relacionamento com os parceiros.",
                quote: "Quando um robô executa o trabalho chato, o contador finalmente tem tempo de ser contador.",
                tags: ["Estratégia", "Visão de Produto", "Contabilidade", "Liderança", "RPA"],
                featured: true,
              },
              {
                name: "Matheus",
                role: "Sócio Desenvolvedor",
                photo: "/team/matheus.jpeg",
                bio: "O arquiteto técnico por trás de cada robô da Acellerador. Responsável por construir e evoluir toda a infraestrutura de automação — do primeiro script ao AcelleraHub. Une profundo conhecimento de desenvolvimento com entendimento real do fluxo contábil para criar soluções que funcionam de verdade no dia a dia dos escritórios.",
                quote: "Um robô bem construído não precisa de atenção — ele simplesmente funciona.",
                tags: ["RPA", "Desenvolvimento", "Infraestrutura", "AcelleraHub", "Automação"],
                featured: false,
              },
            ] as TeamMember[]).map((member, i) => (
              <TeamCard
                key={member.name}
                member={member}
                delay={i * 150}
                isInView={teamInView}
              />
            ))}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-3">
              Nossa trajetória
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Cada ano,{" "}
              <span style={{
                background: "linear-gradient(135deg, #e76714, #ff9a56)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                um novo nível.
              </span>
            </h3>
          </motion.div>
          <TimelineSection />
        </div>

      </div>
    </section>
  );
};

export { Experience };
