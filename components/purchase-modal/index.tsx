"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Bot,
    Plus,
    Minus,
    ChevronDown,
    ShoppingCart,
    MessageCircle,
    Zap,
} from "lucide-react";
import { robotsData } from "@/app/cart-context";
import { useGlobalContext, GlobalContextType } from "@/app/context";
import { trackWhatsappClick } from "@/lib/analytics";

const QtyControl = ({
    value,
    onChange,
}: {
    value: number;
    onChange: (v: number) => void;
}) => (
    <div className="flex items-center gap-1">
        <button
        onClick={() => onChange(Math.max(1, value - 10))}
        className="w-6 h-6 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.14] transition-all duration-150"
        >
        <Minus className="w-3 h-3" />
        </button>
        <input
        type="number"
        min={1}
        value={value}
        onChange={(e) => {
            const v = parseInt(e.target.value);
            if (!isNaN(v) && v >= 1) onChange(v);
        }}
        className="w-14 text-center text-xs font-semibold text-white bg-white/[0.06] border border-white/[0.12] rounded-lg py-1 focus:outline-none focus:border-mainOrange/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
        onClick={() => onChange(value + 10)}
        className="w-6 h-6 rounded-lg bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.14] transition-all duration-150"
        >
        <Plus className="w-3 h-3" />
        </button>
    </div>
);

const RobotRow = ({
    robot,
    selected,
    cnpjs,
    onToggle,
    onCnpjsChange,
}: {
    robot: (typeof robotsData)[0];
    selected: boolean;
    cnpjs: number;
    onToggle: () => void;
    onCnpjsChange: (v: number) => void;
}) => {
    return (
        <motion.div
        layout
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
            selected
            ? "bg-mainOrange/[0.09] border-mainOrange/30"
            : "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06]"
        }`}
        onClick={onToggle}
        >
        {/* Checkbox */}
        <div
            className={`w-4.5 h-4.5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all duration-150 ${
            selected ? "bg-mainOrange border-mainOrange" : "border-white/25"
            }`}
            style={{ width: 18, height: 18 }}
        >
            {selected && (
            <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 text-white"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </motion.svg>
            )}
        </div>

        {/* Name */}
        <span
            className={`flex-1 text-xs font-semibold truncate transition-colors duration-150 ${
            selected ? "text-white" : "text-white/55"
            }`}
        >
            {robot.title}
        </span>

        {/* Qty — only when selected */}
        <AnimatePresence>
            {selected && (
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center gap-3 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <QtyControl value={cnpjs} onChange={onCnpjsChange} />
                <div className="text-right min-w-[50px]">
                <p className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">CNPJs</p>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
        </motion.div>
    );
};

const PurchaseModal = () => {
    const { isPurchaseModalOpen, closePurchaseModal } =
        useGlobalContext() as GlobalContextType;

    const [activeTab, setActiveTab] = useState<"dp" | "fiscal">("dp");
    const [selected, setSelected] = useState<Record<string, number>>({}); // id → cnpjQty
    const [showDetails, setShowDetails] = useState(true);

    const dpRobots = robotsData.filter((r) => r.category === "dp");
    const fiscalRobots = robotsData.filter((r) => r.category === "fiscal");

    const toggleRobot = (id: string) => {
        setSelected((prev) => {
        if (prev[id] !== undefined) {
            const next = { ...prev };
            delete next[id];
            return next;
        }
        return { ...prev, [id]: 50 };
        });
    };

    const setCnpjs = (id: string, qty: number) => {
        setSelected((prev) => ({ ...prev, [id]: qty }));
    };

    const selectedList = useMemo(() => {
        const list: { title: string; cnpjs: number; category: string }[] = [];

        for (const [id, cnpjs] of Object.entries(selected)) {
        const robot = robotsData.find((r) => r.id === id);
        if (!robot) continue;
        list.push({ title: robot.title, cnpjs, category: robot.category });
        }

        return list;
    }, [selected]);

    const hasSelection = Object.keys(selected).length > 0;

    const handleWhatsApp = () => {
        if (!hasSelection) return;
        const lines = [
        "Olá! Gostaria de solicitar um orçamento para os seguintes robôs:",
        "",
        ...selectedList.map(
            (r) =>
            `• [${r.category.toUpperCase()}] ${r.title}: ${r.cnpjs} CNPJs`
        ),
        "",
        "Fico no aguardo de mais informações sobre valores e ativação!",
        ];

        const msg = encodeURIComponent(lines.join("\n"));
        trackWhatsappClick("purchase_modal");
        window.open(`https://wa.me/5551993437038?text=${msg}`, "_blank");
    };

    return (
        <AnimatePresence>
        {isPurchaseModalOpen && (
            <>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                onClick={closePurchaseModal}
            />

            {/* Modal */}
            <motion.div
                key="modal"
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
            >
                <div
                className="relative w-full max-w-4xl max-h-[92vh] sm:max-h-[90vh] flex flex-col pointer-events-auto rounded-t-2xl sm:rounded-2xl overflow-hidden"
                style={{
                    background:
                    "linear-gradient(135deg, rgba(3,40,70,0.97) 0%, rgba(2,28,50,0.99) 100%)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    boxShadow:
                    "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.10)",
                }}
                >
                {/* Top shimmer */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/40 to-transparent" />

                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/[0.07] shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-mainOrange/[0.15] border border-mainOrange/30 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-mainOrange" />
                    </div>
                    <div>
                    <h2 className="text-base font-bold text-white leading-tight">
                        Solicitar Orçamento
                    </h2>
                    <p className="text-xs text-white/40">
                        Selecione os robôs e quantidades para receber uma proposta personalizada
                    </p>
                    </div>
                    <button
                    onClick={closePurchaseModal}
                    className="ml-auto w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.09] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.12] transition-all duration-200"
                    >
                    <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-col lg:flex-row gap-0 flex-1 overflow-hidden min-h-0">
                    {/* ── Left: Robot selector ── */}
                    <div className="flex-1 flex flex-col overflow-hidden border-r-0 lg:border-r border-white/[0.06]">
                    {/* Tabs */}
                    <div className="flex gap-1 px-4 pt-4 pb-3 shrink-0">
                        {(["dp", "fiscal"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                            activeTab === tab
                                ? "bg-mainOrange text-white shadow-[0_0_16px_rgba(231,103,20,0.35)]"
                                : "bg-white/[0.05] text-white/50 hover:bg-white/[0.09] hover:text-white"
                            }`}
                        >
                            {tab === "dp" ? "Depart. Pessoal" : "Fiscal"}
                        </button>
                        ))}
                    </div>

                    {/* Robot list */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1.5 scrollbar-thin">
                        <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: activeTab === "dp" ? -12 : 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="space-y-1.5"
                        >
                            {(activeTab === "dp" ? dpRobots : fiscalRobots).map((robot) => (
                            <RobotRow
                                key={robot.id}
                                robot={robot}
                                selected={selected[robot.id] !== undefined}
                                cnpjs={selected[robot.id] ?? 50}
                                onToggle={() => toggleRobot(robot.id)}
                                onCnpjsChange={(v) => setCnpjs(robot.id, v)}
                            />
                            ))}
                        </motion.div>
                        </AnimatePresence>
                    </div>
                    </div>

                    {/* ── Right: Summary ── */}
                    <div className="w-full lg:w-80 flex flex-col shrink-0 overflow-hidden bg-white/[0.02] max-h-[45vh] lg:max-h-none border-t lg:border-t-0 border-white/[0.06]">
                    <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                        {/* Robots summary */}
                        {hasSelection ? (
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                            <Zap className="w-4 h-4 text-mainOrange" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Seu Pacote</span>
                            </div>
                            
                            <div className="space-y-2">
                            {selectedList.map((r) => (
                                <div
                                key={r.title}
                                className="flex justify-between items-center py-2 px-3 rounded-xl bg-white/[0.04] border border-white/[0.06]"
                                >
                                <div className="flex-1 min-w-0 pr-2">
                                    <p className="text-[12px] font-bold text-white truncate">
                                    {r.title}
                                    </p>
                                    <p className="text-[10px] text-white/30 uppercase tracking-tight">
                                    {r.category === 'dp' ? 'Depart. Pessoal' : 'Fiscal'}
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[12px] font-black text-mainOrange">
                                    {r.cnpjs}
                                    </p>
                                    <p className="text-[9px] text-white/40 font-bold">CNPJs</p>
                                </div>
                                </div>
                            ))}
                            </div>

                            <div className="mt-8 p-4 rounded-2xl bg-mainOrange/[0.05] border border-mainOrange/20">
                            <p className="text-[11px] text-white/60 leading-relaxed">
                                <strong className="text-white">Nota:</strong> Os valores finais de mensalidade e taxa de ativação dependem do volume total de CNPJs e serão calculados pelo nosso comercial.
                            </p>
                            </div>
                        </div>
                        ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                            <Bot className="w-12 h-12 text-white/10 mb-4" />
                            <p className="text-sm text-white/30 font-medium">
                            Selecione os robôs desejados para montar seu orçamento personalizado.
                            </p>
                        </div>
                        )}
                    </div>

                    {/* Footer CTA */}
                    <div className="px-5 pb-6 pt-4 border-t border-white/[0.06] shrink-0">
                        <button
                        onClick={handleWhatsApp}
                        disabled={!hasSelection}
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-black transition-all duration-300 ${
                            hasSelection
                            ? "bg-green-600 text-white hover:bg-green-500 hover:shadow-[0_8px_32px_rgba(22,163,74,0.3)] active:scale-95"
                            : "bg-white/[0.06] text-white/20 cursor-not-allowed"
                        }`}
                        >
                        <MessageCircle className="w-5 h-5" />
                        {hasSelection
                            ? "ENVIAR PARA O COMERCIAL"
                            : "SELECIONE OS ROBÔS"}
                        </button>
                        {hasSelection && (
                        <p className="text-[10px] text-white/30 text-center mt-3 font-medium">
                            Você será levado ao WhatsApp para finalizar a solicitação
                        </p>
                        )}
                    </div>
                    </div>
                </div>
                </div>
            </motion.div>
            </>
        )}
        </AnimatePresence>
    );
    };

export { PurchaseModal };