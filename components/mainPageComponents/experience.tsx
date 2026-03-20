"use client";
import { useCountAnimation, useInViewport } from "@/hooks/useCountAnimation";
import { useEffect, useState } from "react";

interface StatItemProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
  isInView: boolean;
  size?: "large" | "medium";
  icon?: string;
}

const StatItem = ({
  value,
  label,
  prefix = "",
  suffix = "",
  delay = 0,
  isInView,
  size = "medium",
  icon,
}: StatItemProps) => {
  const animatedValue = useCountAnimation({
    end: value,
    duration: 2500,
    startAnimation: isInView,
    prefix,
    suffix,
  });

  const sizeClasses =
    size === "large" ? "text-6xl md:text-7xl" : "text-4xl md:text-5xl";

  return (
    <div
      className={`
        relative group
        flex flex-col items-center text-center
        transform transition-all duration-700 ease-out
        ${
          isInView
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95"
        }
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-mainOrange/20 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />

      {icon && (
        <div className="text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
          {icon}
        </div>
      )}

      <span
        className={`
        ${sizeClasses} text-mainOrange font-bold mb-3
        bg-gradient-to-r from-mainOrange to-orange-300 bg-clip-text text-transparent
        drop-shadow-[0_0_25px_rgba(231,103,20,0.5)]
      `}
      >
        {animatedValue}
      </span>

      <span className="text-lg md:text-xl text-white/90 max-w-[250px] leading-tight">
        {label}
      </span>
    </div>
  );
};

// Componente de partículas flutuantes
const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-mainOrange/10 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
};

const Experience = () => {
  const { ref, isInView } = useInViewport();

  const stats = {
    main: {
      value: 7,
      label: "Anos de Experiência em Automação!",
      prefix: "+",
      icon: "",
    },
    grid: [
      {
        value: 1330000,
        label: "Automações executadas",
        prefix: "+",
        icon: "🔁",
      },
      { value: 500000, label: "Horas Economizadas", prefix: "+", icon: "⏰" },
      { value: 100, label: "Taxa de Satisfação", suffix: "%", icon: "⭐" },
      { value: 24, label: "Automação", suffix: "/7", icon: "🤖" },
    ],
  };

  return (
    <section id="sobre" className="scroll-mt-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mainOrange/5 to-transparent pointer-events-none" />

      <FloatingParticles />

      <div className="relative z-10">
        <div
          className={`
          flex gap-3 flex-col md:text-center md:px-10 px-6 my-14
          transform transition-all duration-1000
          ${isInView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
        `}
        >
          <h1 className="md:text-5xl text-3xl text-white font-bold">
            Entenda como o{" "}
            <span className="text-mainOrange">Acellerador Contábil</span> é
            Referência Nacional!
          </h1>
          <span className="md:text-xl text-lg text-white/80 max-w-3xl mx-auto">
            Acelerando seu dia, automatizando sua Contabilidade: Eficiência em
            cada clique.
          </span>
        </div>

        <div ref={ref} className="w-full max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            {/* Estatística Principal */}
            <div className="flex-shrink-0 relative">
              {/* Círculo decorativo */}
              <div className="absolute inset-0 -m-8">
                <div className="w-full h-full border-2 border-mainOrange/20 rounded-full animate-pulse" />
                <div
                  className="absolute inset-2 border border-mainOrange/10 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>

              <StatItem
                value={stats.main.value}
                label={stats.main.label}
                prefix={stats.main.prefix}
                icon={stats.main.icon}
                isInView={isInView}
                size="large"
                delay={0}
              />
            </div>

            {/* Grid de Estatísticas */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-16 md:gap-x-20">
              {stats.grid.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  icon={stat.icon}
                  isInView={isInView}
                  delay={300 + index * 150}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Experience };
