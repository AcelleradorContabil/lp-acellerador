"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

// logos that have dark background and need a light pill
const darkLogos = new Set(["cardeal.png", "ers.webp", "conzatti.png", "contabexpress.png"]);

// logos that need a smaller render size
const smallLogos = new Set(["lk.png", "medassist.svg", "cg.png"]);
const largeLogos = new Set(["3c.jpg", "apice.webp"]);

const LogoItem = ({ item }: { item: string }) => {
  const size = smallLogos.has(item) ? 64 : largeLogos.has(item) ? 110 : 90;
  const needsBg = darkLogos.has(item);

  return (
    <div
      className={`
        group mx-6 flex items-center justify-center
        transition-all duration-400
        ${needsBg
          ? "px-4 py-2 rounded-xl bg-white/[0.07] hover:bg-white/[0.12]"
          : ""}
      `}
      style={{ filter: "grayscale(1) brightness(0.65)", transition: "filter 0.4s ease" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.filter = "grayscale(0) brightness(1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.filter = "grayscale(1) brightness(0.65)";
      }}
    >
      <Image
        alt={`Parceiro ${item}`}
        src={`/partners/${item}`}
        height={size}
        width={size}
        className="object-contain max-h-10"
        style={{ width: "auto", height: "auto", maxHeight: "40px" }}
      />
    </div>
  );
};

const Partners = ({ partners }: { partners: string[] }) => {
  const row1 = partners.slice(0, Math.ceil(partners.length / 2));
  const row2 = partners.slice(Math.ceil(partners.length / 2));

  return (
    <section id="parceiros" className="scroll-mt-20 py-16 relative overflow-hidden">

      {/* top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-mainOrange/[0.04] blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-10 px-6"
        >
          <p className="text-xs text-white/30 font-semibold uppercase tracking-[0.2em] mb-3">
            Confiado por
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white/80 leading-tight">
            Escritórios que já lideram com automação.
          </h2>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center justify-center gap-2 mb-10 text-sm text-white/30"
        >
          <span>18+ escritórios parceiros</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>+3,3M execuções realizadas</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>100% de satisfação</span>
        </motion.div>

        {/* Marquee rows */}
        <div className="flex flex-col gap-6">
          {/* Row 1 — left */}
          <div className="relative">
            <Marquee
              speed={28}
              pauseOnHover
              gradient
              gradientColor="#033f6f"
              gradientWidth={120}
            >
              {[...row1, ...row1].map((item, i) => (
                <LogoItem key={`r1-${item}-${i}`} item={item} />
              ))}
            </Marquee>
          </div>

          {/* Row 2 — right */}
          <div className="relative">
            <Marquee
              direction="right"
              speed={22}
              pauseOnHover
              gradient
              gradientColor="#033f6f"
              gradientWidth={120}
            >
              {[...row2, ...row2].map((item, i) => (
                <LogoItem key={`r2-${item}-${i}`} item={item} />
              ))}
            </Marquee>
          </div>
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs text-white/20 mt-10 px-6"
        >
          Passe o cursor sobre os logos para conhecer nossos parceiros.
        </motion.p>
      </div>

      {/* bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
    </section>
  );
};

export { Partners };
