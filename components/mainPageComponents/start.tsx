"use client";
import { useEffect, useState } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useGlobalContext, GlobalContextType } from "@/app/context";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2, Zap, MapPin,
  ArrowRight, Play, ShieldCheck,
} from "lucide-react";

// ── Robot visual ──────────────────────────────────────────────────────────────
const RoboVisual = ({ visible }: { visible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={visible ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.9, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
    className="relative flex items-center justify-center select-none"
  >
    {/* Ambient glow layers */}
    <div className="absolute w-[420px] h-[420px] rounded-full bg-mainOrange/[0.12] blur-[90px] pointer-events-none" />
    <div className="absolute w-[280px] h-[280px] rounded-full bg-blueAcellera/40 blur-[60px] pointer-events-none" />

    {/* Floating group — robot + pills move together */}
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
      style={{ filter: "drop-shadow(0 30px 60px rgba(231,103,20,0.30)) drop-shadow(0 0 40px rgba(231,103,20,0.15))" }}
    >
      <Image
        src="/logos/Icones/RoboSolito.png"
        alt="Robô Acellerador"
        width={480}
        height={480}
        className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] xl:w-[460px] h-auto"
        priority
      />

      {/* Pill — top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -10 }}
        animate={visible ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute top-[12%] left-[-14%] flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: "rgba(3,42,82,0.90)",
          border: "1px solid rgba(231,103,20,0.30)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
          filter: "none",
        }}
      >
        <div className="relative w-2 h-2 rounded-full bg-green-400 shrink-0">
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
        </div>
        <span className="text-[11px] font-bold text-white/80">+60 robôs disponíveis</span>
      </motion.div>

      {/* Pill — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 10 }}
        animate={visible ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.97 }}
        className="absolute top-[12%] right-[-14%] flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: "rgba(3,42,82,0.90)",
          border: "1px solid rgba(231,103,20,0.30)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
          filter: "none",
        }}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-mainOrange shrink-0" />
        <span className="text-[11px] font-bold text-white/80">Sem fidelidade</span>
      </motion.div>

      {/* Pill — bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 10 }}
        animate={visible ? { opacity: 1, scale: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.05 }}
        className="absolute bottom-[14%] right-[-14%] flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: "rgba(3,42,82,0.90)",
          border: "1px solid rgba(231,103,20,0.30)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
          filter: "none",
        }}
      >
        <Zap className="w-3.5 h-3.5 text-mainOrange shrink-0" />
        <span className="text-[11px] font-bold text-white/80">+500mil horas economizadas</span>
      </motion.div>

      {/* Pill — bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={visible ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.18 }}
        className="absolute bottom-[34%] left-[-18%] flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          background: "rgba(3,42,82,0.90)",
          border: "1px solid rgba(120,180,255,0.20)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
          filter: "none",
        }}
      >
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(74,222,128,0.80)" }} />
        <span className="text-[11px] font-bold text-white/80">Ativo em até 5 dias</span>
      </motion.div>
    </motion.div>
  </motion.div>
);

// ── Hero section ──────────────────────────────────────────────────────────────
const Start = () => {
  const { scrollToSection } = useScrollToSection();
  const { openPurchaseModal } = useGlobalContext() as GlobalContextType;
  const [isVisible, setIsVisible] = useState(false);
  const [typedExec, setTypedExec] = useState("");
  const [typedLider, setTypedLider] = useState("");

  const wordExec = "executam.";
  const wordLider = "lideram.";

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typedExec.length < wordExec.length) {
      const t = setTimeout(() => setTypedExec(wordExec.slice(0, typedExec.length + 1)), 90);
      return () => clearTimeout(t);
    }
  }, [typedExec]);

  useEffect(() => {
    if (typedExec.length === wordExec.length && typedLider.length < wordLider.length) {
      const t = setTimeout(() => setTypedLider(wordLider.slice(0, typedLider.length + 1)), 75);
      return () => clearTimeout(t);
    }
  }, [typedExec, typedLider]);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
    >
      {/* ── Background glows ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute bottom-[-10%] left-1/4 w-[700px] h-[600px] rounded-full bg-mainOrange/[0.10] blur-[140px]" />
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[500px] rounded-full bg-blue-700/[0.10] blur-[110px]" />
        <div className="absolute top-[30%] right-[20%] w-[500px] h-[500px] rounded-full bg-blueAcellera/30 blur-[100px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Two-column layout ── */}
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-20 md:py-24">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-16 items-center">

          {/* ── LEFT: copy ── */}
          <div className="flex flex-col items-start">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-7 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(231,103,20,0.08)",
                border: "1px solid rgba(231,103,20,0.28)",
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-mainOrange animate-pulse shrink-0"
                style={{ boxShadow: "0 0 8px rgba(231,103,20,0.90), 0 0 16px rgba(231,103,20,0.40)" }}
              />
              <span className="text-white/65 text-xs sm:text-sm font-medium">Automação inteligente para escritórios contábeis</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[1.75rem] xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[78px] font-black text-white leading-[1.04] tracking-[-0.025em] mb-6"
            >
              Robôs{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {typedExec}
                {typedExec.length < wordExec.length && (
                  <span style={{ WebkitTextFillColor: "#e76714", filter: "none" }}>|</span>
                )}
              </span>
              <br />
              Pessoas{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {typedLider}
                {typedExec.length === wordExec.length && typedLider.length < wordLider.length && (
                  <span style={{ WebkitTextFillColor: "#e76714", filter: "none" }}>|</span>
                )}
              </span>
            </motion.h1>

            {/* Robot — mobile only, between title and paragraph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="lg:hidden flex justify-center w-full mb-4 -mt-2"
            >
              <Image
                src="/logos/Icones/RoboSolito.png"
                alt="Robô Acellerador"
                width={260}
                height={260}
                className="w-[160px] sm:w-[200px] md:w-[220px] h-auto"
                style={{ filter: "drop-shadow(0 20px 40px rgba(231,103,20,0.25))" }}
              />
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg"
            >
              Automatize as tarefas repetitivas do seu escritório e libere sua equipe
              para o que realmente importa: crescer.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 w-full sm:w-auto"
            >
              <button
                onClick={openPurchaseModal}
                className="flex items-center justify-center gap-2 px-7 py-4 sm:py-3.5 rounded-xl bg-mainOrange text-white font-bold text-sm active:scale-95 transition-all duration-200"
                style={{ boxShadow: "0 0 20px rgba(231,103,20,0.50), 0 4px 16px rgba(231,103,20,0.30)" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 36px rgba(231,103,20,0.75), 0 4px 24px rgba(231,103,20,0.45)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(231,103,20,0.50), 0 4px 16px rgba(231,103,20,0.30)")}
              >
                Começar agora
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection("produtos")}
                className="flex items-center justify-center gap-2 px-7 py-4 sm:py-3.5 rounded-xl font-medium text-sm text-white/80 bg-white/[0.07] border border-white/[0.18] backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.13] hover:text-white hover:border-white/30 active:scale-95"
              >
                <Play className="w-3.5 h-3.5" />
                Ver os robôs
              </button>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center gap-5"
            >
              {[
                { icon: <Zap className="w-3.5 h-3.5" />, text: "Ativo em até 5 dias" },
                { icon: <CheckCircle2 className="w-3.5 h-3.5" />, text: "Sem fidelidade" },
                { icon: <MapPin className="w-3.5 h-3.5" />, text: "Presentes em mais de 16 estados" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                  <span style={{ color: "rgba(231,103,20,0.70)" }}>{icon}</span>
                  <span className="text-xs font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: robot (desktop only) ── */}
          <div className="hidden lg:flex justify-center items-center">
            <RoboVisual visible={isVisible} />
          </div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-[10px] tracking-widest uppercase">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent animate-bounce" />
      </motion.div>
    </section>
  );
};

export { Start };
