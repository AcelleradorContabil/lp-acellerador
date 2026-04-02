"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  PenLine,
  PhoneCall,
  GraduationCap,
  Bot,
  Activity,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";

const steps = [
  {
    number: "01",
    day: "Dia 1",
    icon: PenLine,
    title: "Contrato assinado",
    description: "Você assina e nossa equipe assume a implantação. Cuidamos de todo o processo e orientamos cada etapa necessária.",
    outcome: "Equipe mobilizada imediatamente",
    accentColor: "#e76714",
    glowColor: "rgba(231,103,20,0.4)",
  },
  {
    number: "02",
    day: "Dia 1–2",
    icon: PhoneCall,
    title: "Primeiro contato",
    description: "Nosso time de onboarding entra em contato para entender o perfil do seu escritório e iniciar as configurações.",
    outcome: "Atendimento humanizado 1-para-1",
    accentColor: "#60a5fa",
    glowColor: "rgba(96,165,250,0.3)",
  },
  {
    number: "03",
    day: "Dia 2–3",
    icon: GraduationCap,
    title: "Treinamento da equipe",
    description: "Sua equipe recebe treinamento prático de uso dos robôs e da plataforma AcelleraHub — sem complicação.",
    outcome: "Time pronto para a autonomia",
    accentColor: "#e76714",
    glowColor: "rgba(231,103,20,0.4)",
  },
  {
    number: "04",
    day: "Dia 3–4",
    icon: Bot,
    title: "Configuração e validação",
    description: "Configuramos cada robô e validamos todo o fluxo antes de ativar — garantindo precisão total.",
    outcome: "Zero margem de erro garantida",
    accentColor: "#60a5fa",
    glowColor: "rgba(96,165,250,0.3)",
  },
  {
    number: "05",
    day: "Dia 5+",
    icon: Activity,
    title: "Operação monitorada",
    description: "Automações no ar. Seu escritório é acompanhado de perto pelo time de monitoramento 24/7.",
    outcome: "Você lidera. Robôs executam.",
    accentColor: "#e76714",
    glowColor: "rgba(231,103,20,0.4)",
    isLast: true,
  },
];

const Onboarding = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="onboarding" className="scroll-mt-20 relative overflow-hidden px-4 sm:px-6 md:px-16 lg:px-20 xl:px-24 py-16 md:py-28">
      
      {/* Background High-Tech Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-mainOrange/[0.03] blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-blueAcellera/[0.07] blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-mainOrange/10 border border-mainOrange/25 text-mainOrange text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] sm:tracking-[0.20em] mb-8 shadow-[0_0_20px_rgba(231,103,20,0.15)]"
          >
            <Sparkles className="w-4 h-4" /> 
            Implementação em Tempo Recorde
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter mb-8"
          >
            Sua jornada para o <br />
            <span className="relative inline-block mt-2">
               <span className="relative z-10 text-mainOrange italic">sucesso digital.</span>
               <div className="absolute -bottom-2 left-0 w-full h-3 bg-mainOrange/20 -rotate-1 blur-sm" />
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-base sm:text-lg md:text-xl text-white/40 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Acellera assume a complexidade. Você assume o controle. <br className="hidden md:block" />
            O processo mais rápido e seguro do mercado contábil.
          </motion.p>
        </div>

        {/* Horizontal Journey Timeline */}
        <div className="relative">
          
          {/* Main Circuit Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-[2px] bg-white/[0.05] overflow-hidden">
             <motion.div 
               initial={{ x: "-100%" }}
               animate={isInView ? { x: "100%" } : {}}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="w-1/3 h-full bg-gradient-to-r from-transparent via-mainOrange/60 to-transparent"
             />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 xl:gap-6 items-stretch">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isHovered = hoveredIndex === i;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex flex-col relative"
                >
                  {/* Step Connector Node */}
                  <div className="flex flex-col items-center mb-6 md:mb-10 relative shrink-0">
                    <div 
                      className="w-24 h-24 rounded-[32px] shrink-0 flex items-center justify-center text-white border transition-all duration-500 relative z-30 group"
                      style={{ 
                        backgroundColor: isHovered ? "rgba(4,50,95,0.9)" : "rgba(4,50,95,0.4)",
                        borderColor: isHovered ? step.accentColor : "rgba(255,255,255,0.1)",
                        boxShadow: isHovered 
                          ? `0 0 50px ${step.glowColor}, inset 0 0 20px ${step.accentColor}40` 
                          : "0 10px 30px rgba(0,0,0,0.3)",
                        transform: isHovered ? "translateY(-8px) scale(1.05)" : "none",
                      }}
                    >
                      <Icon className="w-10 h-10 transition-all duration-500" style={{ color: isHovered ? "#fff" : step.accentColor }} />
                      
                      <div 
                        className="absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-[#02122c] border-2 flex items-center justify-center text-sm font-black transition-all duration-500"
                        style={{ borderColor: isHovered ? step.accentColor : "rgba(255,255,255,0.15)", color: isHovered ? "#fff" : "rgba(255,255,255,0.4)" }}
                      >
                        {step.number}
                      </div>

                      {isHovered && (
                        <div className="absolute inset-0 rounded-[32px] animate-ping opacity-20" style={{ backgroundColor: step.accentColor }} />
                      )}
                    </div>
                  </div>

                  {/* Glass Content Card */}
                  <div
                    className="flex-1 flex flex-col p-5 md:p-8 rounded-3xl md:rounded-[40px] border transition-all duration-500 relative overflow-hidden group/card backdrop-blur-md"
                    style={{ 
                      backgroundColor: isHovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                      borderColor: isHovered ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Background number (Adjusted to not be cut off) */}
                    <span 
                       className="absolute bottom-[-1rem] right-2 text-9xl font-black text-white/[0.03] pointer-events-none select-none leading-none z-0"
                    >
                       {step.number}
                    </span>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-5">
                        <span 
                          className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                          style={{ backgroundColor: `${step.accentColor}15`, borderColor: `${step.accentColor}30`, color: step.accentColor }}
                        >
                          {step.day}
                        </span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover/card:text-mainOrange transition-colors duration-300 md:min-h-[3.5rem] flex items-start">
                        {step.title}
                      </h3>
                      
                      <p className="text-sm text-white/40 leading-relaxed mb-5 md:mb-8 flex-1 md:min-h-[4.5rem]">
                        {step.description}
                      </p>
                      
                      {/* Premium Outcome Badge - Fixed Height and Aligned */}
                      <div
                        className="mt-auto flex items-center gap-3 p-3 md:p-4 rounded-2xl transition-all duration-500 min-h-[56px] md:min-h-[72px]"
                        style={{ 
                          backgroundColor: isHovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
                          border: `1px solid ${isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${step.accentColor}20` }}>
                           <CheckCircle2 className="w-4 h-4" style={{ color: step.accentColor }} />
                        </div>
                        <span className="text-[12px] font-bold text-white/70 leading-tight">
                          {step.outcome}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Onboarding };
