"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { sendClickupLead } from "@/app/utils";
import toast from "react-hot-toast";
import {
  Zap,
  Clock,
  Bot,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
} from "lucide-react";

// ── Floating rocket SVG ───────────────────────────────────────────────────────
const RocketIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M32 4C32 4 20 16 20 34C20 42.837 25.163 48 32 48C38.837 48 44 42.837 44 34C44 16 32 4 32 4Z"
      fill="url(#rocketGrad)" />
    <path d="M20 34C20 34 12 36 10 44C14 44 18 42 20 38" fill="rgba(231,103,20,0.6)" />
    <path d="M44 34C44 34 52 36 54 44C50 44 46 42 44 38" fill="rgba(231,103,20,0.6)" />
    <circle cx="32" cy="32" r="5" fill="rgba(255,255,255,0.9)" />
    <path d="M28 48L26 58L32 54L38 58L36 48" fill="rgba(231,103,20,0.8)" />
    <defs>
      <linearGradient id="rocketGrad" x1="32" y1="4" x2="32" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="1" stopColor="rgba(231,103,20,0.7)" />
      </linearGradient>
    </defs>
  </svg>
);

// ── Flying rocket (corner to corner) ─────────────────────────────────────────
const FlyingRocket = () => {
  // Path: bottom-left → top-right → bottom-left (loop)
  // Each leg has its own rotation angle to match the flight direction
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <motion.div
        className="absolute w-16 opacity-50"
        style={{ filter: "drop-shadow(0 0 10px rgba(231,103,20,0.7))" }}
        animate={{
          x: ["0vw", "88vw", "0vw"],
          y: ["85vh", "5vh", "85vh"],
          rotate: [-45, -45, -45],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
        }}
      >
        <RocketIcon />
      </motion.div>

      {/* Second smaller rocket — opposite direction, offset timing */}
      <motion.div
        className="absolute w-8 opacity-25"
        style={{ filter: "drop-shadow(0 0 8px rgba(231,103,20,0.5))" }}
        animate={{
          x: ["90vw", "5vw", "90vw"],
          y: ["10vh", "80vh", "10vh"],
          rotate: [135, 135, 135],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
          times: [0, 0.5, 1],
        }}
      >
        <RocketIcon />
      </motion.div>
    </div>
  );
};

// ── Animated background elements ──────────────────────────────────────────────
const BackgroundElements = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
    {/* Ambient glows */}
    <div className="absolute top-[-10%] right-[10%] w-[700px] h-[500px] bg-mainOrange/[0.07] blur-[140px] rounded-full" />
    <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[400px] bg-blue-700/[0.08] blur-[120px] rounded-full" />

    {/* Grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "52px 52px",
      }}
    />

    {/* Robot - right */}
    <motion.div
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute right-[-30px] bottom-[60px] w-[340px] opacity-[0.18]"
      style={{ filter: "drop-shadow(0 0 40px rgba(231,103,20,0.4))" }}
    >
      <Image
        src="/logos/Icones/RoboAlternativo.png"
        alt=""
        width={340}
        height={340}
        className="w-full h-auto"
      />
    </motion.div>

    {/* Flying rockets */}
    <FlyingRocket />

    {/* Floating orbs */}
    {[
      { top: "20%", left: "30%", size: 6, delay: 0 },
      { top: "60%", left: "70%", size: 4, delay: 1.5 },
      { top: "40%", left: "15%", size: 5, delay: 3 },
      { top: "75%", left: "45%", size: 3, delay: 2 },
    ].map((orb, i) => (
      <motion.div
        key={i}
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        className="absolute rounded-full bg-mainOrange"
        style={{ top: orb.top, left: orb.left, width: orb.size, height: orb.size, filter: "blur(1px)" }}
      />
    ))}
  </div>
);

// ── Glass input ───────────────────────────────────────────────────────────────
const GlassInput = ({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  textarea,
  rows,
}: {
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className={`
      relative flex items-start gap-3 rounded-xl px-4
      border transition-all duration-200
      ${focused
        ? "bg-white/[0.09] border-mainOrange/40 shadow-[0_0_0_3px_rgba(231,103,20,0.08)]"
        : "bg-white/[0.05] border-white/[0.09] hover:border-white/[0.15]"
      }
    `}>
      <Icon className={`w-4 h-4 mt-3.5 shrink-0 transition-colors duration-200 ${focused ? "text-mainOrange" : "text-white/30"}`} />
      <Tag
        type={type}
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full py-3.5 bg-transparent outline-none text-sm text-white placeholder-white/30
          caret-mainOrange resize-none
        `}
      />
    </div>
  );
};

// ── Contact form (glass card) ─────────────────────────────────────────────────
const ContactForm = ({ inView }: { inView: boolean }) => {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "", terms: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.whatsapp) {
      toast.error("Preencha todos os campos obrigatórios."); return;
    }
    if (!form.terms) {
      toast.error("Aceite os termos para continuar."); return;
    }
    setLoading(true);
    await sendClickupLead(form.name, `Email: ${form.email}\nWhatsApp: ${form.whatsapp}\nMensagem: ${form.message}`);
    toast.success("Recebemos seu contato! Nossa equipe entrará em breve.");
    setForm({ name: "", email: "", whatsapp: "", message: "", terms: false });
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="relative rounded-2xl overflow-hidden flex-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.10)",
      }}
    >
      {/* top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="p-5 md:p-7 flex flex-col gap-5">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">Fale com a gente</h3>
          <p className="text-sm text-white/40">Nossa equipe responde em até 24 horas úteis.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <GlassInput icon={User} placeholder="Seu nome *" value={form.name}
            onChange={(v) => setForm({ ...form, name: v })} />
          <GlassInput icon={Mail} type="email" placeholder="Seu e-mail *" value={form.email}
            onChange={(v) => setForm({ ...form, email: v })} />
          <GlassInput icon={Phone} placeholder="Seu WhatsApp *" value={form.whatsapp}
            onChange={(v) => setForm({ ...form, whatsapp: v })} />
          <GlassInput icon={MessageSquare} textarea rows={4} placeholder="Mensagem (opcional)"
            value={form.message} onChange={(v) => setForm({ ...form, message: v })} />

          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div
              onClick={() => setForm({ ...form, terms: !form.terms })}
              className={`
                mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center
                transition-all duration-200
                ${form.terms ? "bg-mainOrange border-mainOrange" : "border-white/25 bg-white/[0.05]"}
              `}
            >
              {form.terms && <CheckCircle2 className="w-3 h-3 text-white" />}
            </div>
            <span className="text-xs text-white/40 leading-relaxed">
              Autorizo o uso dos dados acima para contato comercial.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
              bg-mainOrange text-white text-sm font-bold mt-1
              hover:brightness-110 hover:shadow-[0_0_28px_rgba(231,103,20,0.55)]
              active:scale-[0.98] transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : (
              <>
                <Send className="w-4 h-4" />
                Enviar mensagem
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// ── Info panel ────────────────────────────────────────────────────────────────
const InfoPanel = ({ inView }: { inView: boolean }) => {
  const benefits = [
    { icon: ShieldCheck, title: "Sem fidelidade", desc: "Você cancela quando quiser, sem multa ou burocracia." },
    { icon: Bot, title: "Onboarding de 5 a 15 dias úteis", desc: "Do contrato ao robô operando, com parametrização completa." },
    { icon: Clock, title: "Resposta em até 24h", desc: "Nosso time comercial entra em contato rapidamente." },
    { icon: MessageCircle, title: "Suporte humanizado", desc: "Atendimento real, não bots, direto no WhatsApp." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col gap-5 flex-1"
    >
      {/* Headline */}
      <div>
        <p className="text-xs text-mainOrange font-bold uppercase tracking-widest mb-3">
          Pronto para começar?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
          Acelere sua{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #e76714 0%, #ff9a56 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            contabilidade.
          </span>
        </h2>
        <p className="text-white/45 leading-relaxed">
          Fale com nosso time, entenda como os robôs se encaixam no seu escritório e comece a economizar horas toda semana.
        </p>
      </div>

      {/* Benefits */}
      <div className="flex flex-col gap-3">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-start gap-3 p-4 rounded-xl
              bg-white/[0.04] border border-white/[0.07]
              hover:bg-white/[0.07] transition-all duration-200"
          >
            <div className="w-8 h-8 shrink-0 rounded-lg bg-mainOrange/[0.12] border border-mainOrange/20 flex items-center justify-center text-mainOrange">
              <b.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{b.title}</p>
              <p className="text-xs text-white/40 mt-0.5">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* WhatsApp CTA */}
      <motion.a
        href="https://wa.me/5551993437038?text=Olá! Quero saber mais sobre a Acellerador."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="flex items-center justify-center gap-2.5 py-3.5 rounded-xl
          bg-[#25D366]/[0.12] border border-[#25D366]/25 text-[#25D366] font-semibold text-sm
          hover:bg-[#25D366]/[0.2] hover:shadow-[0_0_24px_rgba(37,211,102,0.25)]
          active:scale-[0.98] transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Falar no WhatsApp agora
        <ArrowRight className="w-4 h-4" />
      </motion.a>
    </motion.div>
  );
};

// ── Statement banner ──────────────────────────────────────────────────────────
const StatementBanner = ({ inView }: { inView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    className="w-full mb-14"
    style={{
      background: "linear-gradient(155deg, rgba(4,50,95,0.92) 0%, rgba(2,18,44,0.97) 100%)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderLeft: "none",
      borderRight: "none",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: "0 0 80px rgba(231,103,20,0.06), inset 0 1px 0 rgba(255,255,255,0.10)",
    }}
  >
    {/* top shimmer */}
    <div className="h-px bg-gradient-to-r from-transparent via-mainOrange/40 to-transparent" />

    <div className="px-6 md:px-16 lg:px-20 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left: headline */}
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/[0.12] border border-mainOrange/25 text-mainOrange text-xs font-semibold uppercase tracking-wider mb-5">
          <Zap className="w-3 h-3" />
          Comece agora
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
          Pronto para parar de{" "}
          <br className="hidden md:block" />
          perder tempo{" "}
          <span style={{ color: "#e76714" }}>
            com o manual?
          </span>
        </h2>
      </div>

      {/* Right: action pills */}
      <div className="flex flex-col gap-3 shrink-0 md:items-end">
        {[
          { icon: Clock, text: "Resposta em até 24h úteis" },
          { icon: Bot, text: "Robô no ar em até 5 dias" },
          { icon: ShieldCheck, text: "Sem fidelidade contratual" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 text-sm"
            style={{ color: "rgba(180,210,255,0.70)" }}>
            <Icon className="w-4 h-4 shrink-0" style={{ color: "#e76714" }} />
            {text}
          </div>
        ))}
      </div>
    </div>

    {/* bottom shimmer */}
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
  </motion.div>
);

// ── Main section ──────────────────────────────────────────────────────────────
const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.10 });

  return (
    <section id="contato" className="scroll-mt-20 relative overflow-hidden py-10">
      <BackgroundElements />

      {/* top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      <div ref={ref} className="relative z-10 w-full">

        {/* Full-width statement banner */}
        <StatementBanner inView={inView} />

        {/* Two-column layout */}
        <div className="px-6 md:px-16 lg:px-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <InfoPanel inView={inView} />
            <ContactForm inView={inView} />
          </div>
        </div>

      </div>
    </section>
  );
};

export { Contact };
