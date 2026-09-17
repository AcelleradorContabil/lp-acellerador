"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useGlobalContext, GlobalContextType } from "@/app/context";
import { useLeadGate } from "@/app/lead-gate-context";
import { primaryCtaAction } from "@/lib/cta";
import Image from "next/image";
import {
    CheckCircle2, Zap, MapPin,
    ArrowRight, Play, ShieldCheck,
} from "lucide-react";

const heroIn = (delay: number, from: string, extra: CSSProperties = {}): CSSProperties =>
    ({ "--hero-delay": `${delay}s`, "--hero-from": from, ...extra } as CSSProperties);

const RoboVisual = () => (
    <div
        className="hero-in relative flex items-center justify-center select-none"
        style={heroIn(0.5, "translateX(40px)", { "--hero-duration": "0.9s" } as CSSProperties)}
    >
        <div className="absolute w-[420px] h-[420px] rounded-full bg-mainOrange/[0.12] blur-[90px] pointer-events-none" />
        <div className="absolute w-[280px] h-[280px] rounded-full bg-blueAcellera/40 blur-[60px] pointer-events-none" />

        <div
        className="hero-float relative"
        style={{ filter: "drop-shadow(0 30px 60px rgba(231,103,20,0.30)) drop-shadow(0 0 40px rgba(231,103,20,0.15))" }}
        >
        <Image
            src="/logos/Icones/RoboSolito.png"
            alt="Robô Acellerador"
            width={480}
            height={480}
            className="w-[220px] sm:w-[280px] md:w-[340px] lg:w-[400px] xl:w-[460px] h-auto"
        />

        <div
            className="hero-in absolute top-[12%] left-[-14%] flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
            ...heroIn(1.02, "scale(0.8) translateX(-10px)", { "--hero-duration": "0.5s" } as CSSProperties),
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
        </div>

        <div
            className="hero-in absolute top-[12%] right-[-14%] flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
            ...heroIn(1.09, "scale(0.8) translateX(10px)", { "--hero-duration": "0.5s" } as CSSProperties),
            background: "rgba(3,42,82,0.90)",
            border: "1px solid rgba(231,103,20,0.30)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
            filter: "none",
            }}
        >
            <ShieldCheck className="w-3.5 h-3.5 text-mainOrange shrink-0" />
            <span className="text-[11px] font-bold text-white/80">Sem fidelidade</span>
        </div>

        <div
            className="hero-in absolute bottom-[14%] right-[-14%] flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
            ...heroIn(1.17, "scale(0.8) translateX(10px)", { "--hero-duration": "0.5s" } as CSSProperties),
            background: "rgba(3,42,82,0.90)",
            border: "1px solid rgba(231,103,20,0.30)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
            filter: "none",
            }}
        >
            <Zap className="w-3.5 h-3.5 text-mainOrange shrink-0" />
            <span className="text-[11px] font-bold text-white/80">+500mil horas economizadas</span>
        </div>

        <div
            className="hero-in absolute bottom-[34%] left-[-18%] flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
            ...heroIn(1.3, "scale(0.8) translateY(10px)", { "--hero-duration": "0.5s" } as CSSProperties),
            background: "rgba(3,42,82,0.90)",
            border: "1px solid rgba(120,180,255,0.20)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.40)",
            filter: "none",
            }}
        >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: "rgba(74,222,128,0.80)" }} />
            <span className="text-[11px] font-bold text-white/80">Ativo em até 5 dias</span>
        </div>
        </div>
    </div>
);

const Start = () => {
    const { scrollToSection } = useScrollToSection();
    const { openPurchaseModal } = useGlobalContext() as GlobalContextType;
    const { requireLead } = useLeadGate();
    const [typedExec, setTypedExec] = useState("");
    const [typedLider, setTypedLider] = useState("");

    const wordExec = "executam.";
    const wordLider = "lideram.";

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

        className="relative min-h-[100svh] flex items-center overflow-hidden"
        >
        <div className="absolute inset-0 pointer-events-none select-none">
            <div className="absolute bottom-[-10%] left-1/4 w-[700px] h-[600px] rounded-full bg-mainOrange/[0.10] blur-[140px]" />
            <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[500px] rounded-full bg-blue-700/[0.10] blur-[110px]" />
            <div className="absolute top-[30%] right-[20%] w-[500px] h-[500px] rounded-full bg-blueAcellera/30 blur-[100px]" />
            <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
            }}
            />
        </div>

        <div className="relative z-10 w-full px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-20 md:py-24">
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-16 items-center">

            <div className="flex flex-col items-start">

                <div
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
                </div>

                <h1
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
                </h1>

                <div
                className="hero-pop lg:hidden flex justify-center w-full mb-4 -mt-2"
                >
                <Image
                    src="/logos/Icones/RoboSolito.png"
                    alt="Robô Acellerador"
                    width={260}
                    height={260}
                    className="w-[160px] sm:w-[200px] md:w-[220px] h-auto"
                    priority
                    style={{ filter: "drop-shadow(0 20px 40px rgba(231,103,20,0.25))" }}
                />
                </div>

                <p
                className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed mb-10 max-w-lg"
                >
                Automatize as tarefas repetitivas do seu escritório e libere sua equipe
                para o que realmente importa: crescer.
                </p>

                <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 w-full sm:w-auto"
                >
                <button
                    onClick={() => requireLead("hero", primaryCtaAction(openPurchaseModal))}
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
                </div>

                <div
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
                </div>
            </div>

            <div className="hidden lg:flex justify-center items-center">
                <RoboVisual />
            </div>

            </div>
        </div>

        </section>
    );
};

export { Start };