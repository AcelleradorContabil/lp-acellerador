"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  PenLine,
  PhoneCall,
  GraduationCap,
  Bot,
  Activity,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    day: "Dia 1",
    icon: PenLine,
    title: "Contrato assinado",
    description:
      "Você assina e é só isso. A partir daí, assumimos todo o processo. Nenhuma configuração técnica do seu lado — nada.",
    outcome: "Você não precisa fazer mais nada",
    accentColor: "#e76714",
    glowColor: "rgba(231,103,20,0.30)",
    borderColor: "rgba(231,103,20,0.50)",
  },
  {
    number: "02",
    day: "Dia 1–2",
    icon: PhoneCall,
    title: "Primeiro contato",
    description:
      "Nosso time de onboarding entra em contato em até 24h, entende o perfil do seu escritório e inicia as configurações necessárias.",
    outcome: "Atendimento humanizado desde o primeiro minuto",
    accentColor: "#60a5fa",
    glowColor: "rgba(96,165,250,0.25)",
    borderColor: "rgba(96,165,250,0.40)",
  },
  {
    number: "03",
    day: "Dia 2–3",
    icon: GraduationCap,
    title: "Treinamento da equipe",
    description:
      "Sua equipe recebe treinamento completo e prático de uso dos robôs e da plataforma AcelleraHub — sem complicação técnica.",
    outcome: "Sua equipe pronta para operar com autonomia",
    accentColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.25)",
    borderColor: "rgba(167,139,250,0.40)",
  },
  {
    number: "04",
    day: "Dia 3–4",
    icon: Bot,
    title: "Configuração e validação",
    description:
      "Nossa equipe de implantação configura cada robô contratado e valida todo o fluxo antes de ativar — zero margem de erro.",
    outcome: "Só ativamos quando está 100% validado",
    accentColor: "#34d399",
    glowColor: "rgba(52,211,153,0.25)",
    borderColor: "rgba(52,211,153,0.40)",
  },
  {
    number: "05",
    day: "Dia 5+",
    icon: Activity,
    title: "Operação monitorada",
    description:
      "Automações no ar. Seu escritório é acompanhado de perto pelo time de monitoramento com atendimento humanizado 24/7.",
    outcome: "Você lidera. Os robôs executam. Nós monitoramos.",
    accentColor: "#e76714",
    glowColor: "rgba(231,103,20,0.35)",
    borderColor: "rgba(231,103,20,0.55)",
    isLast: true,
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
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-8">

      {/* ── Timeline column ── */}
      <div className="flex flex-col items-center shrink-0" style={{ width: "56px" }}>
        {/* Step circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 200, damping: 15 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-2xl shrink-0 z-10"
          style={{
            background: `linear-gradient(135deg, ${step.accentColor}22 0%, ${step.accentColor}08 100%)`,
            border: `1.5px solid ${step.borderColor}`,
            boxShadow: hovered
              ? `0 0 32px ${step.glowColor}, inset 0 1px 0 rgba(255,255,255,0.15)`
              : `0 0 16px ${step.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
            transition: "box-shadow 350ms",
          }}
        >
          <Icon className="w-6 h-6" style={{ color: step.accentColor }} />
          {/* Pulse ring for last step */}
          {step.isLast && (
            <div
              className="absolute inset-0 rounded-2xl animate-ping"
              style={{ background: `${step.accentColor}14`, animationDuration: "2.5s" }}
            />
          )}
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={inView ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ originY: 0 }}
            className="flex-1 w-px mt-2"
          >
            <div
              className="w-full h-full min-h-[32px]"
              style={{
                background: `linear-gradient(180deg, ${step.accentColor}60 0%, rgba(255,255,255,0.06) 100%)`,
              }}
            />
          </motion.div>
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.15 + 0.1, ease: [0.4, 0, 0.2, 1] }}
        className={`flex-1 relative rounded-2xl overflow-hidden cursor-default mb-4 ${isLast ? "mb-0" : ""}`}
        style={{
          background: "linear-gradient(145deg, rgba(4,50,95,0.90) 0%, rgba(2,18,44,0.96) 100%)",
          border: hovered ? `1px solid ${step.borderColor}` : "1px solid rgba(255,255,255,0.09)",
          boxShadow: hovered
            ? `0 16px 48px rgba(0,0,0,0.45), 0 0 40px ${step.glowColor}, inset 0 1px 0 rgba(255,255,255,0.10)`
            : "0 4px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "transform 300ms cubic-bezier(0.34,1.3,0.64,1), box-shadow 300ms, border-color 300ms",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${step.accentColor}55, transparent)`,
          }}
        />
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
          style={{
            background: `linear-gradient(180deg, ${step.accentColor} 0%, ${step.accentColor}20 100%)`,
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 300ms",
          }}
        />
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
          style={{ background: `${step.glowColor}`, filter: "blur(50px)", opacity: hovered ? 0.8 : 0.3, transition: "opacity 300ms" }}
        />

        <div className="relative z-10 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              {/* Day badge */}
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] px-2 py-0.5 rounded-full mb-2"
                style={{
                  background: `${step.accentColor}14`,
                  border: `1px solid ${step.accentColor}30`,
                  color: step.accentColor,
                }}
              >
                {step.day}
              </span>
              {/* Title */}
              <h3
                className="text-lg font-extrabold tracking-tight leading-tight"
                style={{ color: hovered ? step.accentColor : "rgba(220,235,255,0.95)", transition: "color 300ms" }}
              >
                {step.title}
              </h3>
            </div>
            {/* Step number */}
            <span
              className="text-5xl font-black tabular-nums leading-none shrink-0 select-none"
              style={{
                color: `${step.accentColor}18`,
                letterSpacing: "-0.04em",
              }}
            >
              {step.number}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 leading-relaxed mb-4">{step.description}</p>

          {/* Outcome callout */}
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
            style={{
              background: `${step.accentColor}0d`,
              border: `1px solid ${step.accentColor}25`,
            }}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: step.accentColor }} />
            <span className="text-xs font-semibold" style={{ color: `${step.accentColor}cc` }}>
              {step.outcome}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Promise strip ─────────────────────────────────────────────────────────────
const promises = [
  { icon: <Clock className="w-4 h-4" />, text: "Ativo em até 5 dias úteis" },
  { icon: <Shield className="w-4 h-4" />, text: "0% de configuração técnica da sua parte" },
  { icon: <Bot className="w-4 h-4" />, text: "100% da implantação por nós" },
  { icon: <Activity className="w-4 h-4" />, text: "Monitoramento contínuo pós-ativação" },
];

// ── Main section ──────────────────────────────────────────────────────────────
const Onboarding = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section ref={sectionRef} id="onboarding" className="scroll-mt-20 relative overflow-hidden px-6 md:px-16 lg:px-20 py-12">

      {/* Section ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-mainOrange/[0.04] blur-[130px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blueAcellera/20 blur-[100px]" />
      </div>

      <div className="relative z-10">

        {/* ── Hero banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-3xl overflow-hidden mb-14"
          style={{
            background: "linear-gradient(135deg, rgba(4,48,90,0.98) 0%, rgba(2,18,44,1) 60%, rgba(10,30,60,0.98) 100%)",
            border: "1px solid rgba(231,103,20,0.28)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.55), 0 0 80px rgba(231,103,20,0.05), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
        >
          {/* Top shimmer */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent" />
          {/* Ambient orbs */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-mainOrange/[0.08] blur-[70px] pointer-events-none" />
          <div className="absolute -left-10 bottom-0 w-56 h-56 rounded-full bg-blueAcellera/30 blur-[70px] pointer-events-none" />

          <div className="relative z-10 px-8 md:px-14 py-10 md:py-12">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6"
              style={{
                background: "rgba(231,103,20,0.12)",
                border: "1px solid rgba(231,103,20,0.35)",
                color: "#e76714",
                boxShadow: "0 0 20px rgba(231,103,20,0.15)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Onboarding guiado · sem esforço da sua parte
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4"
                >
                  Do contrato ao robô operando{" "}
                  <span
                    style={{
                      background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 4px #e76714) drop-shadow(0 0 16px rgba(231,103,20,0.50))",
                    }}
                  >
                    em 5 dias úteis.
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="text-white/50 text-base md:text-lg leading-relaxed"
                >
                  Nenhuma complexidade técnica para você. Nosso time assume todo o processo de implantação — você assina e já pode focar no que importa.
                </motion.p>
              </div>

              {/* Promise pills */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col gap-2.5 shrink-0"
              >
                {promises.slice(0, 3).map(({ icon, text }, i) => (
                  <motion.div
                    key={text}
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.45 + i * 0.08 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                    style={{
                      background: "rgba(231,103,20,0.08)",
                      border: "1px solid rgba(231,103,20,0.20)",
                    }}
                  >
                    <span style={{ color: "#e76714" }}>{icon}</span>
                    <span className="text-xs font-semibold text-white/70 whitespace-nowrap">{text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Two-column layout: timeline left, details right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: vertical timeline */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>

          {/* Right: value proposition panel */}
          <div className="lg:sticky lg:top-28 space-y-5">

            {/* Main value card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(155deg, rgba(4,52,98,0.95) 0%, rgba(2,18,44,0.98) 100%)",
                border: "1px solid rgba(231,103,20,0.25)",
                boxShadow: "0 12px 50px rgba(0,0,0,0.40), 0 0 60px rgba(231,103,20,0.06), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/60 to-transparent" />
              <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-mainOrange/[0.08] blur-[60px] pointer-events-none" />

              <div className="relative z-10 p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(231,103,20,0.30), rgba(231,103,20,0.10))",
                      border: "1px solid rgba(231,103,20,0.45)",
                      boxShadow: "0 0 24px rgba(231,103,20,0.30)",
                    }}
                  >
                    <Zap className="w-6 h-6" style={{ color: "#e76714" }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-mainOrange/60 mb-0.5">Nossa promessa</p>
                    <h3 className="text-lg font-extrabold text-white tracking-tight">Você entra. Nós entregamos.</h3>
                  </div>
                </div>

                <p className="text-sm text-white/50 leading-relaxed mb-6">
                  Não existe "configurar por conta própria" aqui. Desde o primeiro contato até a validação final, nosso time de implantação cuida de absolutamente tudo.
                </p>

                {/* Checklist */}
                <div className="space-y-3">
                  {[
                    "Sem instalação de software da sua parte",
                    "Sem parametrização técnica manual",
                    "Treinamento incluso para toda a equipe",
                    "Validação completa antes de ativar",
                    "Suporte humanizado desde o dia 1",
                  ].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "rgba(231,103,20,0.15)", border: "1px solid rgba(231,103,20,0.30)" }}
                      >
                        <CheckCircle2 className="w-3 h-3" style={{ color: "#e76714" }} />
                      </div>
                      <span className="text-sm text-white/65">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Monitoring card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(4,42,85,0.88) 0%, rgba(2,18,44,0.94) 100%)",
                border: "1px solid rgba(52,211,153,0.22)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 40px rgba(52,211,153,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent" />
              <div className="p-5 flex items-start gap-4">
                <div className="relative shrink-0 mt-1">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(52,211,153,0.12)",
                      border: "1px solid rgba(52,211,153,0.28)",
                    }}
                  >
                    <Activity className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-blueAcellera">
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-70" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-1">Monitoramento contínuo após ativação</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Sua operação é acompanhada de perto pelo nosso time. Qualquer ajuste necessário é tratado com SLA garantido e atendimento humanizado.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* SLA strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { label: "Primeiro contato", value: "em até 24h" },
                { label: "Robô no ar", value: "em até 5 dias" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl px-4 py-3.5 text-center"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  <p className="text-xs text-white/35 mb-1">{label}</p>
                  <p className="text-base font-extrabold" style={{ color: "#e76714", textShadow: "0 0 12px rgba(231,103,20,0.45)" }}>
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export { Onboarding };
