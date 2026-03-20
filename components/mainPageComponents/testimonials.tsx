"use client";

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Eduardo",
    role: "Sócio",
    company: "Cardeal Contabilidade",
    avatar: "CE",
    color: "from-orange-500 to-orange-600",
    stars: 5,
    highlight: "3h de trabalho virou 20 minutos.",
    text: "Antes da Acellerador, minha equipe passava 3 horas por dia só transmitindo DCTF WEB. Hoje o robô faz isso enquanto o time atende os clientes. É literalmente outra empresa.",
  },
  {
    name: "Ana Paula Freitas",
    role: "Gestora de Operações",
    company: "MegaOffice Contábil",
    avatar: "AP",
    color: "from-blue-500 to-blue-600",
    stars: 5,
    highlight: "4 dias do contrato ao robô rodando.",
    text: "Assinar foi a decisão mais fácil do ano. Em 4 dias o robô já estava operando. Minha equipe me perguntou: 'por que a gente não fez isso antes?' Eu me pergunto a mesma coisa.",
  },
  {
    name: "Roberto Mazzola",
    role: "Diretor",
    company: "Mazzola & Associados",
    avatar: "RM",
    color: "from-emerald-500 to-emerald-600",
    stars: 5,
    highlight: "Medo zero. Resultado real.",
    text: "Tínhamos medo de automação — achávamos que ia complicar tudo. Pelo contrário: o treinamento foi rápido, o suporte é humano de verdade e os robôs simplesmente funcionam.",
  },
  {
    name: "Fernanda Costa",
    role: "Sócia Fundadora",
    company: "CG Contabilidade",
    avatar: "FC",
    color: "from-purple-500 to-purple-600",
    stars: 5,
    highlight: "80h economizadas = 2 novos clientes.",
    text: "Economizamos 80 horas por mês só com o robô de Folha e FGTS. Esse tempo virou capacidade para atender 2 novos clientes. O robô literalmente pagou a mensalidade e ainda deu lucro.",
  },
  {
    name: "Marcos Oliveira",
    role: "CEO",
    company: "ECS Soluções Contábeis",
    avatar: "MO",
    color: "from-red-500 to-red-600",
    stars: 5,
    highlight: "ROI no primeiro mês.",
    text: "O retorno foi imediato. No primeiro mês já cobri o investimento só com o tempo economizado no eSocial. Hoje não consigo imaginar como operávamos antes dos robôs.",
  },
  {
    name: "Juliana Rezende",
    role: "Gerente Financeira",
    company: "Silveira & Soares",
    avatar: "JR",
    color: "from-pink-500 to-pink-600",
    stars: 5,
    highlight: "Suporte humano. De verdade.",
    text: "O que me conquistou foi o atendimento. Não é bot, não é FAQ — é uma pessoa real resolvendo meu problema em minutos. Em um mercado de automação, isso não tem preço.",
  },
  {
    name: "Thiago Conzatti",
    role: "Sócio",
    company: "Conzatti Contabilidade",
    avatar: "TC",
    color: "from-amber-500 to-amber-600",
    stars: 5,
    highlight: "40% de crescimento sem nova contratação.",
    text: "Crescemos 40% na carteira sem contratar ninguém novo. Os robôs absorveram o volume e a equipe passou a focar em consultoria. Os clientes perceberam a diferença na hora.",
  },
  {
    name: "Priscila Mendes",
    role: "Diretora",
    company: "Moreira & Mendes",
    avatar: "PM",
    color: "from-cyan-500 to-cyan-600",
    stars: 5,
    highlight: "Simples, rápido e não te abandona.",
    text: "Tentei 2 outras soluções antes. Eram complexas, caras e dependiam de TI. A Acellerador foi diferente — processo simples, implantação rápida e o suporte não some depois da venda.",
  },
  {
    name: "Leonardo Akartos",
    role: "Gestor de DP",
    company: "Akartos Consultoria",
    avatar: "LA",
    color: "from-teal-500 to-teal-600",
    stars: 5,
    highlight: "A equipe pediu mais robôs.",
    text: "Comecei com 3 robôs no plano Starter. Dois meses depois, minha própria equipe veio me pedir mais automações. Quando o time pede tecnologia, você sabe que acertou.",
  },
  {
    name: "Camila Zeleve",
    role: "Sócia",
    company: "Zeleve Contabilidade",
    avatar: "CZ",
    color: "from-indigo-500 to-indigo-600",
    stars: 5,
    highlight: "Virei referência no meu mercado.",
    text: "Meus clientes perceberam que estamos entregando mais rápido e com menos erros. Hoje me posiciono como escritório tech-first e capturei clientes que buscavam exatamente isso.",
  },
  {
    name: "Rafael Pessato",
    role: "Contador Responsável",
    company: "Pessato Assessoria",
    avatar: "RP",
    color: "from-orange-400 to-red-500",
    stars: 5,
    highlight: "Dormi tranquilo pela primeira vez.",
    text: "Chegar na virada do mês sem aquele estresse de prazo fiscal é uma sensação nova. Os robôs não faltam, não ficam doentes e não pedem hora extra. Mudou minha qualidade de vida.",
  },
  {
    name: "Beatriz Omnia",
    role: "Diretora de Processos",
    company: "Omnia Contábil",
    avatar: "BO",
    color: "from-violet-500 to-violet-600",
    stars: 5,
    highlight: "Escalamos sem caos.",
    text: "Dobrar o número de clientes costumava significar dobrar a equipe e o estresse. Com os robôs, escalamos a operação sem escalar o caos. A Acellerador foi o divisor de águas.",
  },
];

const row1 = testimonials.slice(0, 6);
const row2 = testimonials.slice(6);

// ── Stars ─────────────────────────────────────────────────────────────────────
const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-3.5 h-3.5 fill-mainOrange text-mainOrange" />
    ))}
  </div>
);

// ── Card ──────────────────────────────────────────────────────────────────────
const TestimonialCard = ({ t }: { t: (typeof testimonials)[0] }) => (
  <div
    className="group relative mx-3 w-80 shrink-0 flex flex-col gap-4 p-5 rounded-2xl
      bg-white/[0.04] border border-white/[0.08]
      hover:bg-white/[0.08] hover:border-white/[0.15]
      transition-all duration-300 cursor-default"
    style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}
  >
    {/* Quote icon */}
    <Quote className="w-5 h-5 text-mainOrange/40 shrink-0" />

    {/* Highlight */}
    <p className="text-sm font-bold text-white leading-snug">{t.highlight}</p>

    {/* Text */}
    <p className="text-sm text-white/50 leading-relaxed flex-1">"{t.text}"</p>

    {/* Footer */}
    <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center shrink-0`}>
        <span className="text-xs font-bold text-white">{t.avatar}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{t.name}</p>
        <p className="text-xs text-white/35 truncate">{t.role} · {t.company}</p>
      </div>
      <Stars count={t.stars} />
    </div>

    {/* Hover glow */}
    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: "radial-gradient(circle at 50% 0%, rgba(231,103,20,0.06) 0%, transparent 60%)" }}
    />
  </div>
);

// ── Section ───────────────────────────────────────────────────────────────────
const Testimonials = () => (
  <section className="scroll-mt-20 relative overflow-hidden py-8">

    {/* Separators */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

    {/* Ambient glow */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-mainOrange/[0.05] blur-[100px] rounded-full" />
    </div>

    <div className="relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="text-center mb-12 px-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/[0.12] border border-mainOrange/25 text-mainOrange text-xs font-semibold uppercase tracking-wider mb-5">
          <Star className="w-3 h-3 fill-mainOrange" />
          Depoimentos
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
          Escritórios que já{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #ff9a56 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            viraram o jogo.
          </span>
        </h2>
        <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
          Mais de 120 escritórios já eliminaram o trabalho repetitivo. Veja o que eles têm a dizer.
        </p>
      </motion.div>

      {/* Marquee row 1 — left */}
      <div className="mb-4">
        <Marquee speed={30} pauseOnHover gradient gradientColor="#033f6f" gradientWidth={100}>
          {[...row1, ...row1].map((t, i) => (
            <TestimonialCard key={`r1-${t.name}-${i}`} t={t} />
          ))}
        </Marquee>
      </div>

      {/* Marquee row 2 — right */}
      <Marquee direction="right" speed={24} pauseOnHover gradient gradientColor="#033f6f" gradientWidth={100}>
        {[...row2, ...row2].map((t, i) => (
          <TestimonialCard key={`r2-${t.name}-${i}`} t={t} />
        ))}
      </Marquee>

      {/* Bottom social proof bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-2 mt-10 px-6"
      >
        <div className="flex -space-x-2">
          {testimonials.slice(0, 8).map((t) => (
            <div
              key={t.name}
              className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} border-2 border-blueAcellera flex items-center justify-center`}
            >
              <span className="text-[9px] font-bold text-white">{t.avatar}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-1.5 ml-2">
          <Stars count={5} />
          <span className="text-sm text-white/50">
            <span className="text-white font-semibold">+120 escritórios</span> avaliam com 5 estrelas
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

export { Testimonials };
