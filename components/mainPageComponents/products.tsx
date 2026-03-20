"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ShoppingCart, Play, Zap, ArrowRight, Clock,
  Users, FileText, Wallet, FileSpreadsheet, UserMinus, Home,
  BarChart2, Monitor, Upload, FileCheck, Receipt, Database,
  Package, Download, FileOutput, FileInput, Building2,
} from "lucide-react";
import { robotsData } from "@/app/cart-context";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useGlobalContext, GlobalContextType } from "@/app/context";

type Robot = {
  id: string;
  title: string;
  benefit: string;       // short orange hook line
  description: string;   // 2-line outcome-focused copy
  timeSaved: string;     // e.g. "~12h/mês"
  videoUrl?: string;
  highlight?: boolean;
  icon: React.ReactNode;
};

const dpRobots: Robot[] = [
  {
    id: "esocial",
    title: "eSocial",
    benefit: "Fim das transmissões manuais",
    description: "Transmite todos os eventos do eSocial automaticamente, valida, gera relatório e alerta erros em tempo real — sem sua equipe tocar no sistema.",
    timeSaved: "~12h/mês",
    highlight: true,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "dctf-web",
    title: "DCTF WEB",
    benefit: "Conferência e envio em 1 clique",
    description: "Confere Domínio × eCac, transmite automaticamente e salva guias e recibos organizados. Zero intervenção manual, 100% de conformidade.",
    timeSaved: "~8h/mês",
    videoUrl: "https://www.youtube.com/embed/0mxEvzoj8kI",
    highlight: true,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "fgts",
    title: "FGTS Digital",
    benefit: "Todas as guias em segundos",
    description: "Confere Domínio × FGTS Digital, emite a guia e salva os detalhamentos por empresa em segundos. Chega de abrir portal um a um.",
    timeSaved: "~6h/mês",
    videoUrl: "https://www.youtube.com/embed/tYlcLEI9ShY",
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    id: "folha",
    title: "Folha",
    benefit: "PDFs gerados e prontos para envio",
    description: "Gera automaticamente extrato mensal, recibos, pensão e líquidos em PDF — organizados e prontos para enviar ao cliente sem esforço.",
    timeSaved: "~5h/mês",
    videoUrl: "https://www.youtube.com/embed/RF_AuQPXfRM",
    icon: <FileSpreadsheet className="w-5 h-5" />,
  },
  {
    id: "rescisao",
    title: "Rescisão",
    benefit: "Documentos completos sem retrabalho",
    description: "Calcula, gera e salva todos os documentos de rescisão automaticamente. Seu time recebe o processo pronto — sem abrir o sistema.",
    timeSaved: "~4h/processo",
    videoUrl: "https://www.youtube.com/embed/74rR0g5cphs",
    icon: <UserMinus className="w-5 h-5" />,
  },
  {
    id: "domestica",
    title: "Doméstica",
    benefit: "Processamento completo sem esforço",
    description: "Processa guias, relatórios e conferência de valores de empregada doméstica de ponta a ponta. Libera sua equipe para o que importa.",
    timeSaved: "~3h/mês",
    icon: <Home className="w-5 h-5" />,
  },
];

const fiscalRobots: Robot[] = [
  {
    id: "reinf",
    title: "REINF",
    benefit: "Apuração e transmissão automática",
    description: "Apura, transmite todos os blocos, salva relatório de envio e totalizadores no eCac — sem você precisar acessar nenhum portal.",
    timeSaved: "~10h/mês",
    videoUrl: "https://www.youtube.com/embed/66oMW_UkQnc",
    highlight: true,
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    id: "mit",
    title: "MIT",
    benefit: "Monitora e transmite sozinho",
    description: "Monitora e transmite informações no MIT com validação e controle de status automático. Você não precisa nem abrir o portal.",
    timeSaved: "~6h/mês",
    highlight: true,
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    id: "transmissao-dctf",
    title: "Transmissão DCTF WEB",
    benefit: "Recibo salvo sem intervenção",
    description: "Realiza a transmissão final da DCTF WEB fiscal, confere valores e salva recibo e declaração automaticamente.",
    timeSaved: "~4h/mês",
    icon: <Upload className="w-5 h-5" />,
  },
  {
    id: "destda",
    title: "DESTDA",
    benefit: "Geração e envio sem esforço",
    description: "Gera e transmite a DESTDA automaticamente com validação de dados e salvamento de relatórios — sem abrir o sistema manualmente.",
    timeSaved: "~3h/mês",
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    id: "das",
    title: "DAS Simples",
    benefit: "Lote inteiro em minutos",
    description: "Emite automaticamente todas as guias DAS do Simples Nacional em lote, com conferência de vencimentos. Em minutos, não horas.",
    timeSaved: "~5h/mês",
    icon: <Receipt className="w-5 h-5" />,
  },
  {
    id: "efd",
    title: "EFD",
    benefit: "SPED sem uma linha de esforço",
    description: "Gera, valida e envia a Escrituração Fiscal Digital ao SPED de forma completamente automatizada. Zero intervenção humana.",
    timeSaved: "~8h/mês",
    icon: <Database className="w-5 h-5" />,
  },
  {
    id: "sped-fiscal",
    title: "SPED Fiscal",
    benefit: "Arquivo validado e transmitido",
    description: "Gera, valida inconsistências e transmite o arquivo SPED Fiscal automaticamente. Sem erros, sem retrabalho.",
    timeSaved: "~8h/mês",
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: "notas-sefaz",
    title: "Notas SEFAZ",
    benefit: "Download em lote, organizado",
    description: "Baixa e organiza automaticamente todas as notas fiscais direto da SEFAZ, em lote por empresa. Sem acesso manual.",
    timeSaved: "~4h/mês",
    icon: <Download className="w-5 h-5" />,
  },
  {
    id: "notas-prestadas",
    title: "Notas Prestadas",
    benefit: "Captura e organiza sozinho",
    description: "Captura e organiza automaticamente as notas de serviços prestados com conferência de valores. Tudo pronto na pasta certa.",
    timeSaved: "~3h/mês",
    icon: <FileOutput className="w-5 h-5" />,
  },
  {
    id: "notas-tomadas",
    title: "Notas Tomadas",
    benefit: "Lote baixado e conferido",
    description: "Baixa e organiza em lote as notas tomadas com conferência automática de dados fiscais. Sem abrir empresa por empresa.",
    timeSaved: "~3h/mês",
    icon: <FileInput className="w-5 h-5" />,
  },
  {
    id: "dec-poa",
    title: "DEC POA",
    benefit: "Documentos baixados automaticamente",
    description: "Acessa, baixa e organiza documentos fiscais do DEC Porto Alegre sem nenhum acesso manual. Simples e direto.",
    timeSaved: "~2h/mês",
    icon: <Building2 className="w-5 h-5" />,
  },
];

type Tab = "dp" | "fiscal";

const RobotCard = ({ robot, index }: { robot: Robot; index: number }) => {
  const { openPurchaseModal } = useGlobalContext() as GlobalContextType;
  const robotInfo = robotsData.find((r) => r.id === robot.id);
  const price = robotInfo?.defaultPrice ?? 1.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "linear-gradient(155deg, rgba(4,52,98,0.95) 0%, rgba(2,18,44,0.98) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        transition: "transform 350ms cubic-bezier(0.34,1.3,0.64,1), box-shadow 350ms, border-color 350ms",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-7px) scale(1.02)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 60px rgba(0,0,0,0.50), 0 0 50px rgba(231,103,20,0.18), inset 0 1px 0 rgba(255,255,255,0.14)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(231,103,20,0.55)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.10)";
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{
          background: robot.highlight
            ? "linear-gradient(180deg, #e76714 0%, rgba(231,103,20,0.30) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.03) 100%)",
        }}
      />

      {/* Shimmer top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Ambient glow for highlight cards */}
      {robot.highlight && (
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-mainOrange/[0.08] blur-[40px] pointer-events-none" />
      )}

      {/* Popular badge */}
      {robot.highlight && (
        <div
          className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
          style={{ background: "linear-gradient(135deg, #e76714, #f0821e)", boxShadow: "0 0 14px rgba(231,103,20,0.65), 0 2px 6px rgba(0,0,0,0.30)" }}
        >
          <Zap className="w-2.5 h-2.5" />
          Destaque
        </div>
      )}

      {/* Icon + title header */}
      <div className="pl-6 pr-5 pt-6 pb-5 flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: robot.highlight
              ? "linear-gradient(135deg, rgba(231,103,20,0.35) 0%, rgba(231,103,20,0.15) 100%)"
              : "linear-gradient(135deg, rgba(5,65,115,0.80) 0%, rgba(3,35,70,0.70) 100%)",
            border: robot.highlight
              ? "1px solid rgba(231,103,20,0.50)"
              : "1px solid rgba(255,255,255,0.14)",
            boxShadow: robot.highlight
              ? "0 0 28px rgba(231,103,20,0.35), inset 0 1px 0 rgba(255,255,255,0.20)"
              : "0 4px 16px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.14)",
            color: robot.highlight ? "#e76714" : "rgba(255,255,255,0.75)",
          }}
        >
          {robot.icon}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="text-base font-extrabold text-white leading-tight tracking-tight">{robot.title}</h3>
          <p
            className="text-xs font-bold mt-1.5 uppercase tracking-wide"
            style={{ color: "#e76714", textShadow: "0 0 8px rgba(231,103,20,0.35)" }}
          >
            {robot.benefit}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-gradient-to-r from-white/10 via-white/[0.06] to-transparent" />

      <div className="pl-6 pr-5 pt-4 pb-5 flex flex-col flex-1 gap-4">
        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed flex-1">{robot.description}</p>

        {/* Time saved badge */}
        <div
          className="self-start flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.20)",
          }}
        >
          <Clock className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-semibold text-green-300">{robot.timeSaved} economizados/mês</span>
        </div>

        {/* Price */}
        <div
          className="flex items-end justify-between px-4 py-3 rounded-xl"
          style={{
            background: "rgba(231,103,20,0.07)",
            border: "1px solid rgba(231,103,20,0.18)",
          }}
        >
          <div>
            <p className="text-[10px] text-white/35 uppercase tracking-wider mb-0.5">Investimento</p>
            <div className="flex items-baseline gap-1">
              <span
                className="text-2xl font-black"
                style={{ color: "#e76714", textShadow: "0 0 16px rgba(231,103,20,0.55)" }}
              >
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-xs text-white/35 mb-0.5">/CNPJ</span>
            </div>
          </div>
          <p className="text-[10px] text-white/30 text-right max-w-[80px] leading-snug">por mês, sem fidelidade</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={openPurchaseModal}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold active:scale-[0.97] transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
              boxShadow: "0 0 20px rgba(231,103,20,0.40), 0 4px 14px rgba(231,103,20,0.25), inset 0 1px 0 rgba(255,255,255,0.22)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 36px rgba(231,103,20,0.65), 0 4px 20px rgba(231,103,20,0.40), inset 0 1px 0 rgba(255,255,255,0.28)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(231,103,20,0.40), 0 4px 14px rgba(231,103,20,0.25), inset 0 1px 0 rgba(255,255,255,0.22)")}
          >
            <ShoppingCart className="w-4 h-4" />
            Quero este robô
          </button>
          {robot.videoUrl && (
            <a
              href={robot.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
              }}
              title="Ver demonstração"
            >
              <Play className="w-4 h-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const TYPED_PHRASE = "enquanto você lidera.";

const Products = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dp");
  const { scrollToSection } = useScrollToSection();
  const robots = activeTab === "dp" ? dpRobots : fiscalRobots;

  // Typing animation state
  const [typed, setTyped] = useState("");
  const [typingStarted, setTypingStarted] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });

  // Start typing when section enters view
  useEffect(() => {
    if (isInView && !typingStarted) {
      setTypingStarted(true);
    }
  }, [isInView, typingStarted]);

  useEffect(() => {
    if (!typingStarted) return;
    if (typed.length < TYPED_PHRASE.length) {
      const t = setTimeout(
        () => setTyped(TYPED_PHRASE.slice(0, typed.length + 1)),
        60
      );
      return () => clearTimeout(t);
    }
  }, [typed, typingStarted]);

  return (
    <section ref={sectionRef} id="produtos" className="scroll-mt-20 relative overflow-hidden">
      {/* Section ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-mainOrange/[0.04] blur-[120px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blueAcellera/30 blur-[100px]" />
      </div>

      <div className="relative z-10 px-6 md:px-16 lg:px-20 py-12">

      {/* ── Hero banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-3xl overflow-hidden mb-12"
        style={{
          background: "linear-gradient(135deg, rgba(4,48,90,0.98) 0%, rgba(2,18,44,1) 60%, rgba(10,30,60,0.98) 100%)",
          border: "1px solid rgba(231,103,20,0.28)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.55), 0 0 80px rgba(231,103,20,0.06), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent" />
        {/* Bottom shimmer */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* Ambient orbs */}
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-mainOrange/[0.09] blur-[80px] pointer-events-none" />
        <div className="absolute -left-10 bottom-0 w-48 h-48 rounded-full bg-blueAcellera/40 blur-[70px] pointer-events-none" />

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
            <span className="w-1.5 h-1.5 rounded-full bg-mainOrange animate-pulse" style={{ boxShadow: "0 0 6px #e76714" }} />
            Automação RPA · 17 robôs disponíveis
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4"
              >
                Seu escritório trabalhando{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 4px #e76714) drop-shadow(0 0 16px rgba(231,103,20,0.50))",
                  }}
                >
                  {typed}
                  {typed.length < TYPED_PHRASE.length && typingStarted && (
                    <span style={{ WebkitTextFillColor: "#e76714", filter: "none" }}>|</span>
                  )}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-white/50 text-base md:text-lg leading-relaxed"
              >
                Cada robô elimina horas de trabalho manual por mês. Pague apenas pelo que usar — por CNPJ, sem mensalidade fixa.
              </motion.p>
            </div>

            {/* Stats column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-row lg:flex-col gap-4 lg:gap-3 shrink-0"
            >
              {[
                { value: "50k+", label: "Execuções" },
                { value: "1.000h+", label: "Economizadas/mês" },
                { value: "120+", label: "Escritórios" },
              ].map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.45 + i * 0.08 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                  style={{
                    background: "rgba(231,103,20,0.08)",
                    border: "1px solid rgba(231,103,20,0.20)",
                  }}
                >
                  <span
                    className="text-xl font-black whitespace-nowrap"
                    style={{ color: "#e76714", textShadow: "0 0 14px rgba(231,103,20,0.55)" }}
                  >
                    {value}
                  </span>
                  <span className="text-xs text-white/40 leading-snug">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Price callout bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span className="text-white/40 text-xs">A partir de</span>
              <span className="text-white font-black text-lg" style={{ color: "#e76714", textShadow: "0 0 12px rgba(231,103,20,0.45)" }}>R$ 1,68</span>
              <span className="text-white/30 text-xs">/CNPJ/mês</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
              </div>
              <span className="text-xs text-white/40">Robôs operando agora · ativação imediata</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Nossos Robôs + Tab switcher ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.48 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Nossos{" "}
            <span style={{ color: "#e76714", textShadow: "0 0 18px rgba(231,103,20,0.50)" }}>
              Robôs
            </span>
          </h3>
          <p className="text-sm text-white/35 mt-0.5">Selecione o departamento para explorar</p>
        </div>

        <div
          className="flex p-1 rounded-2xl self-start sm:self-auto"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          {(["dp", "fiscal"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                ${
                  activeTab === tab
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }
              `}
              style={activeTab === tab ? {
                background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                boxShadow: "0 0 24px rgba(231,103,20,0.45), 0 4px 12px rgba(231,103,20,0.30)",
              } : {}}
            >
              {tab === "dp" ? "Depto. Pessoal" : "Fiscal"}
              <span className="ml-1.5 text-[10px] opacity-60 font-medium">
                {tab === "dp" ? "6" : "11"}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {robots.map((robot, i) => (
            <RobotCard key={robot.id} robot={robot} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA */}
      <div className="flex flex-col items-center gap-4 mt-12 pt-10 border-t border-white/[0.07]">
        <p className="text-white/40 text-sm">
          Precisa de mais robôs? Conheça nossos planos com todos inclusos.
        </p>
        <button
          onClick={() => scrollToSection("pacotes")}
          className="flex items-center gap-2 px-6 py-3 rounded-xl
            bg-white/[0.06] border border-white/[0.12] text-white/70 text-sm font-medium
            hover:bg-white/[0.10] hover:text-white transition-all duration-200
            active:scale-95"
        >
          Ver planos completos
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      </div>{/* end relative z-10 */}
    </section>
  );
};

export { Products };
