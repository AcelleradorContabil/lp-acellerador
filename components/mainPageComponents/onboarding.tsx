"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  PenLine,
  PhoneCall,
  GraduationCap,
  Bot,
  Activity,
  CheckCircle2,
  Zap,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    day: "Dia 1",
    icon: PenLine,
    title: "Contrato assinado",
    description:
      "Você assina e é só isso. A partir daí, assumimos todo o processo. Nenhuma configuração técnica do seu lado.",
    detail: "Simples assim — uma assinatura e o relógio começa.",
    color: "from-orange-500/20 to-orange-400/5",
    glow: "rgba(231,103,20,0.35)",
  },
  {
    number: "02",
    day: "Dia 1–2",
    icon: PhoneCall,
    title: "Primeiro contato",
    description:
      "Nosso time de onboarding entra em contato em até 24h, entende o perfil do seu escritório e inicia as configurações necessárias.",
    detail: "Atendimento humanizado desde o primeiro minuto.",
    color: "from-blue-500/20 to-blue-400/5",
    glow: "rgba(59,130,246,0.3)",
  },
  {
    number: "03",
    day: "Dia 2–3",
    icon: GraduationCap,
    title: "Treinamento da equipe",
    description:
      "Sua equipe recebe treinamento completo e prático de uso dos robôs e da plataforma AcelleraHub — sem complicação.",
    detail: "Sua equipe pronta para operar tudo com autonomia.",
    color: "from-purple-500/20 to-purple-400/5",
    glow: "rgba(168,85,247,0.3)",
  },
  {
    number: "04",
    day: "Dia 3–4",
    icon: Bot,
    title: "Configuração e validação",
    description:
      "Nossa equipe de implantação configura cada robô contratado e valida todo o fluxo antes de ativar — zero margem de erro.",
    detail: "Só ativamos quando tudo está 100% validado.",
    color: "from-emerald-500/20 to-emerald-400/5",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    number: "05",
    day: "Dia 5+",
    icon: Activity,
    title: "Operação monitorada",
    description:
      "Automações no ar. Seu escritório é acompanhado de perto pelo time de monitoramento com atendimento humanizado 24/7.",
    detail: "Você lidera. Os robôs executam. Nós monitoramos.",
    color: "from-mainOrange/25 to-mainOrange/5",
    glow: "rgba(231,103,20,0.45)",
    highlight: true,
  },
];

// ── Step card ─────────────────────────────────────────────────────────────────
const StepCard = ({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: [0.4, 0, 0.2, 1],
        }}
        className={`
          group relative w-full rounded-2xl overflow-hidden
          border transition-all duration-500 cursor-default
          ${step.highlight
            ? "border-mainOrange/40 shadow-[0_0_48px_rgba(231,103,20,0.15)]"
            : "border-white/[0.09]"
          }
          hover:border-white/[0.18]
        `}
        style={{
          background: "rgba(255,255,255,0.03)",
          boxShadow: `0 4px 24px rgba(0,0,0,0.25)`,
        }}
        whileHover={{
          boxShadow: `0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06), 0 0 32px ${step.glow}`,
          y: -6,
          transition: { duration: 0.3 },
        }}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-60`} />

        <div className="relative z-10 p-6 flex flex-col gap-4">
          {/* Day badge + number */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
              {step.day}
            </span>
            <span
              className="text-4xl font-black tabular-nums leading-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {step.number}
            </span>
          </div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.12 + 0.2, type: "spring", stiffness: 200 }}
            className={`
              w-12 h-12 rounded-2xl flex items-center justify-center
              border transition-all duration-300
              ${step.highlight
                ? "bg-mainOrange/20 border-mainOrange/30 text-mainOrange"
                : "bg-white/[0.07] border-white/[0.10] text-white/60"
              }
              group-hover:scale-110
            `}
          >
            <Icon className="w-5 h-5" />
          </motion.div>

          {/* Title */}
          <h3 className="text-base font-bold text-white leading-tight">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed">
            {step.description}
          </p>

          {/* Detail line */}
          <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
            <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${step.highlight ? "text-mainOrange" : "text-white/25"}`} />
            <span className={`text-xs font-medium ${step.highlight ? "text-mainOrange/80" : "text-white/30"}`}>
              {step.detail}
            </span>
          </div>
        </div>

        {/* Glow sweep on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${step.glow} 0%, transparent 60%)`,
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* ── Connector arrow (desktop) ── */}
      {!isLast && (
        <ConnectorArrow index={index} />
      )}
    </div>
  );
};

// ── Connector between cards (desktop only) ────────────────────────────────────
const ConnectorArrow = ({ index }: { index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="hidden lg:flex absolute top-16 -right-[18px] z-20 items-center"
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ originX: 0 }}
        className="w-8 h-px bg-gradient-to-r from-white/20 to-white/5"
      />
      <motion.div
        initial={{ opacity: 0, x: -4 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.3, delay: index * 0.12 + 0.7 }}
      >
        <ArrowRight className="w-3.5 h-3.5 text-white/20 -ml-1" />
      </motion.div>
    </div>
  );
};

// ── Progress bar ──────────────────────────────────────────────────────────────
const ProgressBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative w-full h-px bg-white/[0.06] rounded-full overflow-hidden mb-12 hidden lg:block">
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{
          width,
          background: "linear-gradient(90deg, #e76714, #ff9a56, #e76714)",
          boxShadow: "0 0 12px rgba(231,103,20,0.6)",
        }}
      />
      {/* Moving glow dot */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-mainOrange shadow-[0_0_12px_rgba(231,103,20,0.9)] -mt-[1px]"
        style={{ left: width }}
      />
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
const Onboarding = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section id="onboarding" className="scroll-mt-20 relative overflow-hidden px-6 md:px-16 lg:px-20 py-8">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-mainOrange/[0.05] blur-[130px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div ref={sectionRef} className="relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/[0.12] border border-mainOrange/25 text-mainOrange text-xs font-semibold uppercase tracking-wider mb-5">
            <Zap className="w-3 h-3" />
            Onboarding
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
            Do contrato à automação em{" "}
            <span className="relative inline-block">
              <span
                style={{
                  background: "linear-gradient(135deg, #e76714 0%, #ff9a56 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                menos de 5 dias úteis.
              </span>
              {/* Underline accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={headerInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ originX: 0 }}
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-mainOrange to-orange-400/30"
              />
            </span>
          </h2>

          <p className="text-white/45 text-lg leading-relaxed">
            Nenhuma complexidade técnica para você. Nosso time assume todo o processo de implantação — você só precisa assinar.
          </p>
        </motion.div>

        {/* ── Scroll-driven progress bar ── */}
        <ProgressBar />

        {/* ── Steps grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 relative">
          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* ── Bottom callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-2xl
            bg-white/[0.03] border border-white/[0.07] max-w-2xl mx-auto text-center sm:text-left"
        >
          <div className="w-12 h-12 shrink-0 rounded-xl bg-mainOrange/[0.12] border border-mainOrange/25 flex items-center justify-center text-mainOrange">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white mb-0.5">
              Monitoramento contínuo após a implantação
            </p>
            <p className="text-sm text-white/40">
              Sua operação é acompanhada de perto pelo nosso time. Qualquer ajuste necessário é tratado com SLA garantido e atendimento humanizado.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export { Onboarding };
