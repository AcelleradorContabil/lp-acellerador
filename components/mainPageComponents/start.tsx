"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const Start = () => {
  const { scrollToSection } = useScrollToSection();
  const [isVisible, setIsVisible] = useState(false);
  const [typedExec, setTypedExec] = useState("");
  const [typedLider, setTypedLider] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  const wordExec = "executam.";
  const wordLider = "lideram.";

  // fade-in on mount
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // typing: first word
  useEffect(() => {
    if (typedExec.length < wordExec.length) {
      const t = setTimeout(
        () => setTypedExec(wordExec.slice(0, typedExec.length + 1)),
        90
      );
      return () => clearTimeout(t);
    }
  }, [typedExec]);

  // typing: second word (after first is done)
  useEffect(() => {
    if (typedExec.length === wordExec.length && typedLider.length < wordLider.length) {
      const t = setTimeout(
        () => setTypedLider(wordLider.slice(0, typedLider.length + 1)),
        75
      );
      return () => clearTimeout(t);
    }
    if (typedExec.length === wordExec.length && typedLider.length === wordLider.length) {
      setTypingDone(true);
    }
  }, [typedExec, typedLider]);

  return (
    <section
      id="inicio"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* center-bottom orange glow */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-mainOrange/[0.13] blur-[130px]" />
        {/* top-right blue glow */}
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[500px] rounded-full bg-blue-700/[0.12] blur-[100px]" />
        {/* left deep blue */}
        <div className="absolute bottom-[20%] left-[-8%] w-[500px] h-[500px] rounded-full bg-blueAcellera/40 blur-[90px]" />
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Floating robot (decorative) ── */}
      <div
        className={`
          absolute right-[-40px] bottom-0 md:block hidden pointer-events-none select-none
          transition-all duration-1000 ease-out delay-700
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
        `}
      >
        {/* robot glow halo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[340px] h-[340px] rounded-full bg-mainOrange/[0.18] blur-[80px]" />
        </div>
        <Image
          src="/logos/Icones/RoboAlternativo.png"
          width={480}
          height={480}
          alt=""
          className="relative z-10 animate-float drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 0 40px rgba(231,103,20,0.25))" }}
        />
      </div>

      {/* ── Main content ── */}
      <div
        className={`
          relative z-10 flex flex-col items-center text-center px-6
          max-w-4xl mx-auto transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="/logos/Icones/TituloBranco.png"
            alt="Acellerador"
            width={200}
            height={72}
            priority
          />
        </div>

        {/* Badge pill */}
        <div
          className={`
            mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full
            bg-mainOrange/[0.07] border border-mainOrange/[0.22] backdrop-blur-md
            text-white/65 text-sm font-medium
            transition-all duration-1000 ease-out delay-300
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-mainOrange animate-pulse shrink-0"
            style={{ boxShadow: "0 0 8px rgba(231,103,20,0.9), 0 0 16px rgba(231,103,20,0.4)" }}
          />
          Automação RPA para escritórios contábeis
        </div>

        {/* Headline */}
        <h1
          className={`
            text-5xl sm:text-6xl md:text-7xl lg:text-[82px]
            font-bold text-white leading-[1.06] tracking-[-0.02em]
            mb-6 transition-all duration-1000 ease-out delay-200
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          Robôs{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 3px #e76714) drop-shadow(0 0 12px rgba(231,103,20,0.45))",
            }}
          >
            {typedExec}
            {typedExec.length < wordExec.length && (
              <span className="animate-blink" style={{ WebkitTextFillColor: "#e76714" }}>
                |
              </span>
            )}
          </span>
          <br />
          Pessoas{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 3px #e76714) drop-shadow(0 0 12px rgba(231,103,20,0.45))",
            }}
          >
            {typedLider}
            {typedExec.length === wordExec.length &&
              typedLider.length < wordLider.length && (
                <span className="animate-blink" style={{ WebkitTextFillColor: "#e76714" }}>
                  |
                </span>
              )}
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className={`
            text-lg md:text-xl text-white/45 max-w-2xl leading-relaxed mb-10
            transition-all duration-1000 ease-out delay-500
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          Automatize as tarefas repetitivas do seu escritório e libere sua equipe para
          o que realmente importa: crescer.
        </p>

        {/* CTAs */}
        <div
          className={`
            flex items-center gap-4 flex-wrap justify-center
            transition-all duration-1000 ease-out delay-[600ms]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <button
            onClick={() => scrollToSection("produtos")}
            className="
              px-7 py-3.5 rounded-xl bg-mainOrange text-white font-semibold text-sm
              transition-all duration-200
              active:scale-95
            "
            style={{
              boxShadow: "0 0 18px rgba(231,103,20,0.45), 0 4px 16px rgba(231,103,20,0.30)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 32px rgba(231,103,20,0.70), 0 4px 24px rgba(231,103,20,0.45)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 18px rgba(231,103,20,0.45), 0 4px 16px rgba(231,103,20,0.30)")}
          >
            Conhecer os robôs
          </button>
          <button
            onClick={() => scrollToSection("contato")}
            className="
              px-7 py-3.5 rounded-xl font-medium text-sm text-white/80
              bg-white/[0.07] border border-white/[0.18] backdrop-blur-sm
              transition-all duration-200
              hover:bg-white/[0.13] hover:text-white hover:border-white/30
              active:scale-95
            "
          >
            Falar com especialista
          </button>
        </div>

        {/* Social proof micro-line */}
        <p
          className={`
            mt-8 text-xs text-white/25 tracking-wide
            transition-all duration-1000 ease-out delay-700
            ${isVisible ? "opacity-100" : "opacity-0"}
          `}
        >
          +120 escritórios parceiros · sem fidelidade · suporte incluído
        </p>
      </div>

      {/* ── Scroll cue ── */}
      <div
        className={`
          absolute bottom-10 left-1/2 -translate-x-1/2
          flex flex-col items-center gap-2 text-white/25
          transition-all duration-1000 ease-out delay-[900ms]
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/25 to-transparent animate-bounce" />
      </div>
    </section>
  );
};

export { Start };
