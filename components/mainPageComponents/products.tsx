"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    ShoppingCart, Play, Zap, ArrowRight, Clock,
    Users, FileText, Wallet, FileSpreadsheet, UserMinus,
    BarChart2, Monitor, Upload, FileCheck,
    Download, FileInput, RefreshCw,
    ChevronRight,
} from "lucide-react";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useGlobalContext, GlobalContextType } from "@/app/context";
import { useLeadGate } from "@/app/lead-gate-context";

type Robot = {
    id: string;
    title: string;
    benefit: string;
    description: string;
    timeSaved: string;
    videoUrl?: string;
    highlight?: boolean;
    icon: React.ReactNode;
};

const dpRobots: Robot[] = [
  {
    id: "fgts",
    title: "FGTS",
    benefit: "Todas as guias em segundos",
    description: "Confere Domínio × FGTS Digital, emite a guia e salva os detalhamentos por empresa em segundos. Chega de abrir portal um a um.",
    timeSaved: "~5min",
    videoUrl: "https://www.youtube.com/embed/tYlcLEI9ShY",
    highlight: true,
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    id: "esocial",
    title: "eSocial",
    benefit: "Fim das transmissões manuais",
    description: "Transmite todos os eventos do eSocial automaticamente, valida, gera relatório e alerta erros em tempo real — sem sua equipe tocar no sistema.",
    timeSaved: "~4min",
    highlight: true,
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "dctf-web",
    title: "DCTFWEB",
    benefit: "Conferência e envio em 1 clique",
    description: "Confere Domínio × eCac, transmite automaticamente e salva guias e recibos organizados. Zero intervenção manual, 100% de conformidade.",
    timeSaved: "~7min",
    videoUrl: "https://www.youtube.com/embed/0mxEvzoj8kI",
    highlight: true,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: "folha",
    title: "Relatório de Folha / Holerite",
    benefit: "PDFs gerados e prontos para envio",
    description: "Gera automaticamente extrato mensal, recibos, pensão e líquidos em PDF — organizados e prontos para enviar ao cliente sem esforço.",
    timeSaved: "~8min",
    videoUrl: "https://www.youtube.com/embed/RF_AuQPXfRM",
    icon: <FileSpreadsheet className="w-5 h-5" />,
  },
  {
    id: "recalculo-fgts",
    title: "Recalculo FGTS Sefip / Digital",
    benefit: "Recálculo sem abrir empresa a empresa",
    description: "Realiza o recálculo do FGTS via SEFIP ou FGTS Digital automaticamente, gerando os relatórios de diferença por empresa sem intervenção manual.",
    timeSaved: "~15min (SEFIP) / ~5min (Digital)",
    icon: <RefreshCw className="w-5 h-5" />,
  },
  {
    id: "rescisao",
    title: "Rescisão",
    benefit: "Documentos completos sem retrabalho",
    description: "Calcula, gera e salva todos os documentos de rescisão automaticamente. Seu time recebe o processo pronto — sem abrir o sistema.",
    timeSaved: "~30min",
    videoUrl: "https://www.youtube.com/embed/74rR0g5cphs",
    icon: <UserMinus className="w-5 h-5" />,
  },
];

const fiscalRobots: Robot[] = [
  {
    id: "reinf",
    title: "REINF",
    benefit: "Apuração e transmissão automática",
    description: "Apura, transmite todos os blocos, salva relatório de envio e totalizadores no eCac — sem você precisar acessar nenhum portal.",
    timeSaved: "~7min",
    videoUrl: "https://www.youtube.com/embed/66oMW_UkQnc",
    highlight: true,
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    id: "destda",
    title: "DESTDA",
    benefit: "Geração e envio sem esforço",
    description: "Gera e transmite a DESTDA automaticamente com validação de dados e salvamento de relatórios — sem abrir o sistema manualmente.",
    timeSaved: "~6min",
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    id: "mit",
    title: "MIT",
    benefit: "Monitora e transmite sozinho",
    description: "Monitora e transmite informações no MIT com validação e controle de status automático. Você não precisa nem abrir o portal.",
    timeSaved: "~7min",
    highlight: true,
    icon: <Monitor className="w-5 h-5" />,
  },
  {
    id: "notas-tomadas",
    title: "Tomados",
    benefit: "Lote baixado e conferido",
    description: "Baixa e organiza em lote as notas tomadas com conferência automática de dados fiscais. Sem abrir empresa por empresa.",
    timeSaved: "~8min/nota",
    icon: <FileInput className="w-5 h-5" />,
  },
  {
    id: "download-portal-nacional",
    title: "Download Portal Nacional",
    benefit: "Documentos baixados em lote",
    description: "Acessa o Portal Nacional e baixa automaticamente documentos e certidões por empresa, sem nenhum acesso manual ao portal.",
    timeSaved: "Depende do volume",
    icon: <Download className="w-5 h-5" />,
  },
  {
    id: "transmissao-dctf",
    title: "Transmissão Final DCTFWEB",
    benefit: "Recibo salvo sem intervenção",
    description: "Realiza a transmissão final da DCTF WEB fiscal, confere valores e salva recibo e declaração automaticamente.",
    timeSaved: "~4min",
    icon: <Upload className="w-5 h-5" />,
  },
];

type Tab = "dp" | "fiscal";

const TYPED_PHRASE = "enquanto você lidera.";

const MobileRobotCard = ({ robot, index }: { robot: Robot; index: number }) => {
    const { openPurchaseModal } = useGlobalContext() as GlobalContextType;
    const { requireLead } = useLeadGate();
    return (
        <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col rounded-2xl overflow-hidden"
        style={{
            background: "linear-gradient(155deg, rgba(4,52,98,0.95) 0%, rgba(2,18,44,0.98) 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
        >
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{
            background: robot.highlight
            ? "linear-gradient(180deg, #e76714 0%, rgba(231,103,20,0.30) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 100%)",
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {robot.highlight && (
            <div
            className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ background: "linear-gradient(135deg, #e76714, #f0821e)", boxShadow: "0 0 14px rgba(231,103,20,0.65)" }}
            >
            <Zap className="w-2.5 h-2.5" />
            Destaque
            </div>
        )}

        <div className="pl-6 pr-5 pt-5 pb-4 flex items-start gap-3">
            <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
                background: robot.highlight
                ? "linear-gradient(135deg, rgba(231,103,20,0.30) 0%, rgba(231,103,20,0.12) 100%)"
                : "linear-gradient(135deg, rgba(5,65,115,0.80) 0%, rgba(3,35,70,0.70) 100%)",
                border: robot.highlight ? "1px solid rgba(231,103,20,0.45)" : "1px solid rgba(255,255,255,0.12)",
                color: robot.highlight ? "#e76714" : "rgba(255,255,255,0.65)",
            }}
            >
            {robot.icon}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-sm font-extrabold text-white leading-tight">{robot.title}</h3>
            <p className="text-xs font-bold mt-1 uppercase tracking-wide" style={{ color: "#e76714" }}>{robot.benefit}</p>
            </div>
        </div>

        <div className="mx-5 h-px bg-gradient-to-r from-white/10 via-white/[0.05] to-transparent" />

        <div className="pl-6 pr-5 pt-3 pb-5 flex flex-col gap-3">
            <p className="text-xs text-white/50 leading-relaxed">{robot.description}</p>

            <div className="flex items-center gap-2 self-start px-3 py-1.5 rounded-xl" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.20)" }}>
            <Clock className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-300">{robot.timeSaved} economizados/processo</span>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(231,103,20,0.07)", border: "1px solid rgba(231,103,20,0.18)" }}>
            <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: "#e76714" }} />
            <div>
                <p className="text-xs font-bold text-white/80">Valor sob consulta</p>
                <p className="text-[10px] text-white/35 mt-0.5">Fale com nosso comercial e receba uma proposta personalizada</p>
            </div>
            </div>

            <div className="flex gap-2">
            <button
                onClick={() => requireLead("products_card_mobile", { type: "run", run: openPurchaseModal })}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-bold transition-all duration-200"
                style={{
                background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                boxShadow: "0 0 18px rgba(231,103,20,0.38), 0 4px 12px rgba(231,103,20,0.22)",
                }}
            >
                <ShoppingCart className="w-3.5 h-3.5" />
                Quero este robô
            </button>
            {robot.videoUrl ? (
                <a
                href={robot.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
                >
                <Play className="w-3.5 h-3.5" />
                Demo
                </a>
            ) : (
                <span
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-not-allowed select-none"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.22)" }}
                >
                <Play className="w-3.5 h-3.5" />
                Demo
                </span>
            )}
            </div>
        </div>
        </motion.div>
    );
};

const DetailPanel = ({ robot }: { robot: Robot }) => {
    const { openPurchaseModal } = useGlobalContext() as GlobalContextType;
    const { requireLead } = useLeadGate();

    return (
        <motion.div
        key={robot.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
        className="relative rounded-3xl overflow-hidden flex flex-col"
        style={{
            background: "linear-gradient(155deg, rgba(4,50,95,0.96) 0%, rgba(2,18,44,0.99) 100%)",
            border: "1px solid rgba(231,103,20,0.28)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.55), 0 0 60px rgba(231,103,20,0.06), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
        >
        {/* Orange top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent" />
        {/* Ambient orb */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-mainOrange/[0.07] blur-[80px] pointer-events-none" />

        <div className="relative z-10 p-8 flex flex-col gap-6 flex-1">
            {/* Icon + badge row */}
            <div className="flex items-start justify-between gap-4">
            <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0"
                style={{
                background: robot.highlight
                    ? "linear-gradient(135deg, rgba(231,103,20,0.32) 0%, rgba(231,103,20,0.14) 100%)"
                    : "linear-gradient(135deg, rgba(5,65,115,0.85) 0%, rgba(3,35,70,0.75) 100%)",
                border: robot.highlight ? "1px solid rgba(231,103,20,0.50)" : "1px solid rgba(255,255,255,0.15)",
                boxShadow: robot.highlight
                    ? "0 0 40px rgba(231,103,20,0.35), inset 0 1px 0 rgba(255,255,255,0.18)"
                    : "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                color: robot.highlight ? "#e76714" : "rgba(255,255,255,0.70)",
                }}
            >
                {/* Clone icon at larger size */}
                <div className="scale-[2.2]">{robot.icon}</div>
            </div>

            {robot.highlight && (
                <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #e76714, #f0821e)", boxShadow: "0 0 18px rgba(231,103,20,0.65), 0 2px 6px rgba(0,0,0,0.30)" }}
                >
                <Zap className="w-3 h-3" />
                Destaque
                </div>
            )}
            </div>

            {/* Title + benefit */}
            <div>
            <h3 className="text-3xl font-black text-white leading-tight tracking-tight mb-2">{robot.title}</h3>
            <p
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: "#e76714" }}
            >
                {robot.benefit}
            </p>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            {robot.description}
            </p>

            {/* Time saved badge */}
            <div
            className="self-start flex items-center gap-2.5 px-4 py-2 rounded-2xl"
            style={{ background: "rgba(34,197,94,0.09)", border: "1px solid rgba(34,197,94,0.22)" }}
            >
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-300">{robot.timeSaved} economizados/processo</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-white/10 via-white/[0.06] to-transparent" />

            {/* Pricing on request */}
            <div
            className="flex items-center gap-3 px-5 py-4 rounded-2xl"
            style={{ background: "rgba(231,103,20,0.07)", border: "1px solid rgba(231,103,20,0.20)" }}
            >
            <Zap className="w-4 h-4 shrink-0" style={{ color: "#e76714" }} />
            <div>
                <p className="text-sm font-bold text-white/85">Valor sob consulta</p>
                <p className="text-xs text-white/35 mt-0.5">Fale com nosso comercial e receba uma proposta personalizada</p>
            </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto">
            <button
                onClick={() => requireLead("products_card", { type: "run", run: openPurchaseModal })}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white text-sm font-bold active:scale-[0.97] transition-all duration-200"
                style={{
                background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                boxShadow: "0 0 24px rgba(231,103,20,0.45), 0 6px 18px rgba(231,103,20,0.28), inset 0 1px 0 rgba(255,255,255,0.22)",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(231,103,20,0.70), 0 6px 22px rgba(231,103,20,0.45), inset 0 1px 0 rgba(255,255,255,0.28)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 24px rgba(231,103,20,0.45), 0 6px 18px rgba(231,103,20,0.28), inset 0 1px 0 rgba(255,255,255,0.22)")}
            >
                <ShoppingCart className="w-4 h-4" />
                Quero este robô
            </button>

            {robot.videoUrl ? (
                <a
                href={robot.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200"
                style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.60)",
                }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.60)";
                }}
                >
                <Play className="w-4 h-4" />
                Demo
                </a>
            ) : (
                <span
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold cursor-not-allowed select-none"
                style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.25)",
                }}
                >
                <Play className="w-4 h-4" />
                Demo
                </span>
            )}
            </div>
        </div>
        </motion.div>
    );
};

const Products = () => {
    const [activeTab, setActiveTab] = useState<Tab>("dp");
    const [selectedId, setSelectedId] = useState<string>(dpRobots[0].id);
    const { scrollToSection } = useScrollToSection();

    const [typed, setTyped] = useState("");
    const [typingStarted, setTypingStarted] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    const robots = activeTab === "dp" ? dpRobots : fiscalRobots;
    const selectedRobot = robots.find(r => r.id === selectedId) ?? robots[0];

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        setSelectedId(tab === "dp" ? dpRobots[0].id : fiscalRobots[0].id);
    };

    useEffect(() => {
        if (isInView && !typingStarted) setTypingStarted(true);
    }, [isInView, typingStarted]);

    useEffect(() => {
        if (!typingStarted) return;
        if (typed.length < TYPED_PHRASE.length) {
        const t = setTimeout(() => setTyped(TYPED_PHRASE.slice(0, typed.length + 1)), 60);
        return () => clearTimeout(t);
        }
    }, [typed, typingStarted]);

    return (
        <section ref={sectionRef} id="produtos" className="scroll-mt-20 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-mainOrange/[0.04] blur-[120px]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blueAcellera/30 blur-[100px]" />
        </div>

        <div className="relative z-10 px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 py-12">

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
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-mainOrange/[0.09] blur-[80px] pointer-events-none" />
            <div className="absolute -left-10 bottom-0 w-48 h-48 rounded-full bg-blueAcellera/40 blur-[70px] pointer-events-none" />

            <div className="relative z-10 px-5 md:px-14 py-8 md:py-12">
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
                Automação RPA · +60 robôs disponíveis
                </motion.div>

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                <div className="max-w-2xl">
                    <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-2xl md:text-4xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4"
                    >
                    Seu escritório trabalhando{" "}
                    <span
                        style={{
                        background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
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
                    Cada robô elimina horas de trabalho manual por mês. Mensalidade por CNPJ, sem fidelidade — cancele quando quiser.
                    </motion.p>
                </div>

                {/* Stats pills */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0"
                >
                    {[
                    { value: "+3,3M", label: "Execuções realizadas" },
                    { value: "+500k", label: "Horas economizadas" },
                    { value: "16+", label: "Estados atendidos" },
                    ].map(({ value, label }, i) => (
                    <motion.div
                        key={label}
                        initial={{ opacity: 0, x: 16 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.45 + i * 0.08 }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
                        style={{ background: "rgba(231,103,20,0.08)", border: "1px solid rgba(231,103,20,0.20)" }}
                    >
                        <span className="text-xl font-black whitespace-nowrap" style={{ color: "#e76714" }}>{value}</span>
                        <span className="text-xs text-white/40 leading-snug">{label}</span>
                    </motion.div>
                    ))}
                </motion.div>
                </div>

                {/* Live indicator */}
                <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="mt-8 flex flex-wrap items-center gap-3"
                >
                <div className="flex items-center gap-2">
                    <div className="relative shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
                    </div>
                    <span className="text-xs text-white/40">Robôs operando agora · ativação imediata · valores sob consulta</span>
                </div>
                </motion.div>
            </div>
            </motion.div>

            {/* ── Interactive 2-column layout (lg+) / card grid (mobile) ── */}
            <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.48 }}
            >
            {/* Tab switcher + heading */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    Nossos{" "}
                    <span style={{ color: "#e76714" }}>Robôs</span>
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
                    onClick={() => handleTabChange(tab)}
                    className={`relative px-4 sm:px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab ? "text-white" : "text-white/40 hover:text-white/70"}`}
                    style={activeTab === tab ? {
                        background: "linear-gradient(135deg, #e76714 0%, #f0821e 100%)",
                        boxShadow: "0 0 24px rgba(231,103,20,0.45), 0 4px 12px rgba(231,103,20,0.30)",
                    } : {}}
                    >
                    {tab === "dp" ? "Depto. Pessoal" : "Fiscal"}
                    <span className="ml-1.5 text-[10px] opacity-60 font-medium">{tab === "dp" ? "6" : "11"}</span>
                    </button>
                ))}
                </div>
            </div>

            {/* Desktop: 2-column interactive layout */}
            <AnimatePresence mode="wait">
                <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:grid lg:grid-cols-5 gap-5 items-start"
                >
                {/* LEFT: Robot list */}
                <div
                    className="lg:col-span-2 sticky top-28 rounded-3xl overflow-hidden"
                    style={{
                    background: "linear-gradient(155deg, rgba(4,50,95,0.92) 0%, rgba(2,18,44,0.97) 100%)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.07)",
                    }}
                >
                    {/* Panel header */}
                    <div
                    className="px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.15)" }}
                    >
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                        {activeTab === "dp" ? "Depto. Pessoal" : "Fiscal"} · {robots.length} robôs
                    </p>
                    </div>

                    {/* List */}
                    <div className="py-2 max-h-[520px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(231,103,20,0.20) transparent" }}>
                    {robots.map((robot, i) => {
                        const isSelected = selectedId === robot.id;
                        return (
                        <motion.button
                            key={robot.id}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.04 }}
                            onClick={() => setSelectedId(robot.id)}
                            className="w-full flex items-center gap-3 px-5 py-3.5 text-left relative transition-all duration-200"
                            style={{
                            background: isSelected ? "rgba(231,103,20,0.08)" : "transparent",
                            borderLeft: isSelected ? "3px solid #e76714" : "3px solid transparent",
                            }}
                            onMouseEnter={e => {
                            if (!isSelected) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                            }}
                            onMouseLeave={e => {
                            if (!isSelected) (e.currentTarget as HTMLElement).style.background = "transparent";
                            }}
                        >
                            <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                                background: isSelected
                                ? "rgba(231,103,20,0.18)"
                                : robot.highlight
                                    ? "rgba(231,103,20,0.10)"
                                    : "rgba(255,255,255,0.05)",
                                border: isSelected
                                ? "1px solid rgba(231,103,20,0.40)"
                                : robot.highlight
                                    ? "1px solid rgba(231,103,20,0.22)"
                                    : "1px solid rgba(255,255,255,0.08)",
                                color: isSelected ? "#e76714" : robot.highlight ? "rgba(231,103,20,0.70)" : "rgba(255,255,255,0.50)",
                            }}
                            >
                            {robot.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold leading-tight ${isSelected ? "text-white" : "text-white/65"}`}>
                                {robot.title}
                                </span>
                                {robot.highlight && (
                                <span className="w-1.5 h-1.5 rounded-full bg-mainOrange shrink-0" style={{ boxShadow: "0 0 5px #e76714" }} />
                                )}
                            </div>
                            <p className="text-[11px] text-white/35 truncate mt-0.5">{robot.benefit}</p>
                            </div>

                            <ChevronRight
                            className="w-3.5 h-3.5 shrink-0 transition-all duration-200"
                            style={{ color: isSelected ? "#e76714" : "rgba(255,255,255,0.20)", opacity: isSelected ? 1 : 0.5 }}
                            />
                        </motion.button>
                        );
                    })}
                    </div>
                </div>

                {/* RIGHT: Detail panel */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                    <DetailPanel key={selectedRobot.id} robot={selectedRobot} />
                    </AnimatePresence>
                </div>
                </motion.div>
            </AnimatePresence>

            {/* Mobile: card grid */}
            <AnimatePresence mode="wait">
                <motion.div
                key={`mobile-${activeTab}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                {robots.map((robot, i) => (
                    <MobileRobotCard key={robot.id} robot={robot} index={i} />
                ))}
                </motion.div>
            </AnimatePresence>
            </motion.div>

            {/* Bottom CTA */}
            <div className="flex flex-col items-center gap-4 mt-12 pt-10 border-t border-white/[0.07]">
            <p className="text-white/40 text-sm">Precisa de mais robôs? Conheça nossos planos com todos inclusos.</p>
            <button
                onClick={() => scrollToSection("pacotes")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.12] text-white/70 text-sm font-medium hover:bg-white/[0.10] hover:text-white transition-all duration-200 active:scale-95"
            >
                Ver planos completos
                <ArrowRight className="w-4 h-4" />
            </button>
            </div>

        </div>
        </section>
    );
};

export { Products };