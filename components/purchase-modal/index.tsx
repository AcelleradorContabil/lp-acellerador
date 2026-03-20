"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bot,
  CheckCircle2,
  Plus,
  Minus,
  ChevronDown,
  ShoppingCart,
  Calendar,
  CreditCard,
  MessageCircle,
  Zap,
} from "lucide-react";
import { robotsData, getDiscountPercent } from "@/app/cart-context";
import { useGlobalContext, GlobalContextType } from "@/app/context";

// ── Types ────────────────────────────────────────────────────────────────────
interface SelectedRobot {
  id: string;
  cnpjs: number;
}

// ── Payment schedule helper ───────────────────────────────────────────────────
function getPaymentSchedule() {
  const today = new Date();
  const day = today.getDate();

  // Activation: day ≤ 5 → day 10 same month; day > 5 → day 10 next month
  const activationDate = new Date(today.getFullYear(), today.getMonth() + (day <= 5 ? 0 : 1), 10);

  // First monthly: 1 month after activation
  const firstMonthlyDate = new Date(activationDate);
  firstMonthlyDate.setMonth(firstMonthlyDate.getMonth() + 1);

  const fmt = (d: Date) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  return {
    activationDate: fmt(activationDate),
    firstMonthlyDate: fmt(firstMonthlyDate),
    activationRaw: activationDate,
    firstMonthlyRaw: firstMonthlyDate,
  };
}

// ── QtyControl ───────────────────────────────────────────────────────────────
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

// ── RobotRow ─────────────────────────────────────────────────────────────────
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
  const discount = getDiscountPercent(cnpjs);
  const unitPrice = robot.defaultPrice * (1 - discount);
  const lineTotal = unitPrice * cnpjs;

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

      {/* Qty + price — only when selected */}
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
            <div className="text-right min-w-[68px]">
              <p className="text-xs font-bold text-white">
                {lineTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
              {discount > 0 && (
                <p className="text-[10px] text-mainOrange">-{(discount * 100).toFixed(0)}%</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const PurchaseModal = () => {
  const { isPurchaseModalOpen, closePurchaseModal } =
    useGlobalContext() as GlobalContextType;

  const [activeTab, setActiveTab] = useState<"dp" | "fiscal">("dp");
  const [selected, setSelected] = useState<Record<string, number>>({}); // id → cnpjQty
  const [installments, setInstallments] = useState<1 | 2 | 3>(1);
  const [showDetails, setShowDetails] = useState(false);

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

  const { monthlyTotal, activationFee, selectedList } = useMemo(() => {
    let total = 0;
    const list: { title: string; cnpjs: number; unitPrice: number; lineTotal: number }[] = [];

    for (const [id, cnpjs] of Object.entries(selected)) {
      const robot = robotsData.find((r) => r.id === id);
      if (!robot) continue;
      const discount = getDiscountPercent(cnpjs);
      const unitPrice = robot.defaultPrice * (1 - discount);
      const lineTotal = unitPrice * cnpjs;
      total += lineTotal;
      list.push({ title: robot.title, cnpjs, unitPrice, lineTotal });
    }

    return {
      monthlyTotal: total,
      activationFee: total, // activation = 1x monthly
      selectedList: list,
    };
  }, [selected]);

  const installmentValue = activationFee / installments;
  const { activationDate, firstMonthlyDate } = getPaymentSchedule();

  const hasSelection = Object.keys(selected).length > 0;

  const handleWhatsApp = () => {
    if (!hasSelection) return;
    const lines = [
      "Olá! Gostaria de contratar os seguintes robôs:",
      "",
      ...selectedList.map(
        (r) =>
          `• ${r.title}: ${r.cnpjs} CNPJs — ${r.lineTotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}/mês`
      ),
      "",
      `*Mensalidade total:* ${monthlyTotal.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`,
      `*Taxa de ativação:* ${activationFee.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })} (${installments}x de ${installmentValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })})`,
      "",
      `*Vencimento ativação:* ${activationDate}`,
      `*Início mensalidade:* ${firstMonthlyDate}`,
    ];

    const msg = encodeURIComponent(lines.join("\n"));
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col pointer-events-auto rounded-2xl overflow-hidden"
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
                    Monte seu pacote
                  </h2>
                  <p className="text-xs text-white/40">
                    Selecione os robôs e a quantidade de CNPJs
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
                <div className="flex-1 flex flex-col overflow-hidden border-r border-white/[0.06]">
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

                  {/* Discount legend */}
                  <div className="px-4 pb-4 shrink-0">
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { min: 101, max: null, pct: 20 },
                        { min: 201, max: null, pct: 30 },
                        { min: 301, max: null, pct: 35 },
                        { min: 401, max: null, pct: 40 },
                        { min: 501, max: null, pct: 50 },
                      ].map((d) => (
                        <span
                          key={d.min}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-mainOrange/[0.08] border border-mainOrange/20 text-mainOrange/80"
                        >
                          +{d.min} CNPJs → -{d.pct}%
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Right: Summary ── */}
                <div className="w-full lg:w-72 flex flex-col shrink-0 overflow-hidden">
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {/* Robots summary */}
                    {hasSelection ? (
                      <div>
                        <button
                          onClick={() => setShowDetails((v) => !v)}
                          className="w-full flex items-center justify-between text-xs font-semibold text-white/50 uppercase tracking-wider mb-2"
                        >
                          <span>Robôs selecionados ({selectedList.length})</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              showDetails ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {showDetails && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 mb-3">
                                {selectedList.map((r) => (
                                  <div
                                    key={r.title}
                                    className="flex justify-between items-center py-1 px-2 rounded-lg bg-white/[0.03]"
                                  >
                                    <div>
                                      <p className="text-[11px] font-semibold text-white/80">
                                        {r.title}
                                      </p>
                                      <p className="text-[10px] text-white/35">
                                        {r.cnpjs} CNPJs ×{" "}
                                        {r.unitPrice.toLocaleString("pt-BR", {
                                          style: "currency",
                                          currency: "BRL",
                                          minimumFractionDigits: 2,
                                        })}
                                      </p>
                                    </div>
                                    <p className="text-[11px] font-bold text-white">
                                      {r.lineTotal.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Bot className="w-10 h-10 text-white/15 mb-3" />
                        <p className="text-xs text-white/30">
                          Selecione ao menos um robô para ver o resumo
                        </p>
                      </div>
                    )}

                    {/* Billing */}
                    {hasSelection && (
                      <>
                        {/* Monthly */}
                        <div className="rounded-xl bg-white/[0.04] border border-white/[0.07] p-3 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-3.5 h-3.5 text-mainOrange" />
                            <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                              Mensalidade
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-white/50 text-xs">Total mensal</span>
                            <span className="text-xl font-bold text-white">
                              {monthlyTotal.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </div>
                          <p className="text-[10px] text-white/30">
                            Cobrado todo dia 10, a partir de{" "}
                            <span className="text-white/50">{firstMonthlyDate}</span>
                          </p>
                        </div>

                        {/* Activation */}
                        <div className="rounded-xl bg-mainOrange/[0.07] border border-mainOrange/25 p-3 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="w-3.5 h-3.5 text-mainOrange" />
                            <span className="text-xs font-semibold text-mainOrange/80 uppercase tracking-wider">
                              Taxa de ativação
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-white/50 text-xs">Total</span>
                            <span className="text-lg font-bold text-white">
                              {activationFee.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </div>

                          {/* Installments */}
                          <div>
                            <p className="text-[10px] text-white/40 mb-1.5">Parcelamento</p>
                            <div className="flex gap-1.5">
                              {([1, 2, 3] as const).map((n) => (
                                <button
                                  key={n}
                                  onClick={() => setInstallments(n)}
                                  className={`flex-1 py-1 rounded-lg text-xs font-semibold transition-all duration-150 ${
                                    installments === n
                                      ? "bg-mainOrange text-white"
                                      : "bg-white/[0.07] text-white/50 hover:bg-white/[0.12] hover:text-white"
                                  }`}
                                >
                                  {n}x
                                </button>
                              ))}
                            </div>
                            <p className="text-[11px] font-semibold text-white/70 mt-1.5 text-center">
                              {installments}x de{" "}
                              {installmentValue.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </div>
                        </div>

                        {/* Payment schedule */}
                        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 space-y-2">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-3.5 h-3.5 text-white/40" />
                            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">
                              Calendário de pagamentos
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-mainOrange mt-1.5 shrink-0" />
                              <div>
                                <p className="text-[11px] font-semibold text-white/80">
                                  Ativação — {activationDate}
                                </p>
                                <p className="text-[10px] text-white/35">
                                  {installments}x de{" "}
                                  {installmentValue.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                              <div>
                                <p className="text-[11px] font-semibold text-white/80">
                                  1ª mensalidade — {firstMonthlyDate}
                                </p>
                                <p className="text-[10px] text-white/35">
                                  Todo dia 10 a partir desta data
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Footer CTA */}
                  <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] shrink-0">
                    <button
                      onClick={handleWhatsApp}
                      disabled={!hasSelection}
                      className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                        hasSelection
                          ? "bg-green-500 text-white hover:bg-green-400 hover:shadow-[0_0_24px_rgba(74,222,128,0.35)] active:scale-95"
                          : "bg-white/[0.06] text-white/25 cursor-not-allowed"
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {hasSelection
                        ? "Finalizar pelo WhatsApp"
                        : "Selecione ao menos um robô"}
                    </button>
                    {hasSelection && (
                      <p className="text-[10px] text-white/25 text-center mt-2">
                        Você será redirecionado ao WhatsApp com o resumo completo
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
