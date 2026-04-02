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
  const needsBg = darkLogos.has(item);

  return (
    <div
      className={`
        group mx-8 flex items-center justify-center
        transition-all duration-500 py-4 px-6 rounded-xl
        ${needsBg
          ? "bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.10] hover:border-white/[0.15]"
          : "hover:bg-white/[0.04] hover:border-white/[0.08] border border-transparent"}
      `}
    >
      <Image
        alt={`Parceiro ${item}`}
        src={`/partners/${item}`}
        height={100}
        width={140}
        className="object-contain transition-all duration-500 group-hover:scale-105"
        style={{ width: "auto", height: "48px" }}
      />
    </div>
  );
};

const Partners = ({ partners }: { partners: string[] }) => {
  const row1 = partners.slice(0, Math.ceil(partners.length / 2));
  const row2 = partners.slice(Math.ceil(partners.length / 2));

  return (
    <section id="parceiros" className="scroll-mt-20 py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-blueAcellera/5 to-transparent">

      {/* top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/20 to-transparent" />

      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-mainOrange/[0.06] blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-16 px-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/10 border border-mainOrange/20 text-mainOrange text-xs font-bold uppercase tracking-wider mb-4">
            Nossos Parceiros
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            Escritórios que já lideram com <span className="text-mainOrange">automação.</span>
          </h2>
          
          {/* Stats strip */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm md:text-base text-white/40 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-mainOrange" />
              <span>Presente em 16 estados do Brasil</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-mainOrange" />
              <span>+3,3M execuções realizadas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-mainOrange" />
              <span>98% de satisfação</span>
            </div>
          </div>
        </motion.div>

        {/* Marquee rows */}
        <div className="flex flex-col gap-8">
          {/* Row 1 — left */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#020c1e] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#020c1e] to-transparent z-10" />
            <Marquee
              speed={40}
              pauseOnHover
              gradient={false}
            >
              {[...row1, ...row1].map((item, i) => (
                <LogoItem key={`r1-${item}-${i}`} item={item} />
              ))}
            </Marquee>
          </div>

          {/* Row 2 — right */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#020c1e] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#020c1e] to-transparent z-10" />
            <Marquee
              direction="right"
              speed={35}
              pauseOnHover
              gradient={false}
            >
              {[...row2, ...row2].map((item, i) => (
                <LogoItem key={`r2-${item}-${i}`} item={item} />
              ))}
            </Marquee>
          </div>
        </div>

      </div>

      {/* bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mainOrange/20 to-transparent" />
    </section>
  );
};

export { Partners };
