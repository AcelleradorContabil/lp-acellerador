"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, User, Building2, Star } from "lucide-react";

const videoTestimonials = [
  {
    id: 1,
    title: "Relato Mazzola Contabilidade",
    client: "Rodolfo Mazzola",
    role: "Sócio",
    company: "Mazzola Contabilidade — Jundiaí, SP",
    highlight: "Eles fazem o robô, mas o atendimento é humanizado.",
    quote: "Trabalhar com o pessoal da Acellerador é muito fácil, muito tranquilo. Eles têm todo um atendimento personalizado conosco — fazem o robô, mas o atendimento é humanizado. Recomendo pela tranquilidade, pela segurança das informações e pela produtividade que trouxe pro nosso time.",
    videoUrl: "/videos/Mazzola.mp4",
    thumbnail: "/partners/mazzola.png",
    color: "from-emerald-500 to-emerald-600",
    avatar: "RM",
  },
  {
    id: 2,
    title: "Relato ECS Escritório Contábil",
    client: "Felipe Spolavori",
    role: "Contador e Sócio",
    company: "ECS Escritório Contábil — Porto Alegre, RS",
    highlight: "Mil horas por mês. Mais de 5 funcionários produtivos.",
    quote: "O robô já trabalha em torno de mil horas por mês — equivalente a mais de cinco funcionários. Nosso colaborador parou de correr atrás de prazo e passou a atender melhor o cliente. O trabalho chato de clica, transmite e salva? O robô faz por ele.",
    videoUrl: "/videos/Ecs.mp4",
    thumbnail: "/partners/ecs.png",
    color: "from-red-500 to-red-600",
    avatar: "FS",
  },
  {
    id: 3,
    title: "Relato Silveira Soares",
    client: "Renata",
    role: "Equipe Contábil",
    company: "Silveira Soares — Novo Hamburgo, RS",
    highlight: "No mínimo, cinco dias por colaborador.",
    quote: "No primeiro mês com o Tomados, a gente fez o cálculo: no mínimo cinco dias economizados por colaborador. São 15 pessoas no contábil. Isso é revolucionar os tempos de todo o escritório que abraça a tecnologia.",
    videoUrl: "/videos/Silveira Soares.mp4",
    thumbnail: "/partners/silveirasoares.png",
    color: "from-pink-500 to-pink-600",
    avatar: "SS",
  },
  {
    id: 4,
    title: "Relato Contab Express",
    client: "William",
    role: "Coordenador",
    company: "Contab Express",
    highlight: "Cinco dias da nossa operação. De um cliente só.",
    quote: "A gente tinha uma dor com serviços tomados — um cliente com trezentas notas. O robô de vocês acelerou o processo e otimizou praticamente cinco dias da nossa operação. Conseguimos melhorar o serviço entregue ao cliente.",
    videoUrl: "/videos/ContabExpress.mp4",
    thumbnail: "/partners/contabexpress.png",
    color: "from-blue-500 to-blue-600",
    avatar: "WC",
  },
];

const VideoTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const nearView = useInView(sectionRef, { once: true, margin: "600px 0px" });

  const current = videoTestimonials[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % videoTestimonials.length);
    setIsPlaying(false);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (videoRef.current && nearView) {
      videoRef.current.load();
      setIsPlaying(false);
    }
  }, [currentIndex, nearView]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section ref={sectionRef} id="depoimentos-video" className="py-16 md:py-24 relative overflow-hidden bg-[#020c1e]">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-mainOrange/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blueAcellera/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-5 sm:px-8 md:px-16 lg:px-20 xl:px-24 relative z-10">

        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mainOrange/10 border border-mainOrange/20 text-mainOrange text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Play className="w-3 h-3 fill-current" />
            Depoimentos em Vídeo
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white mb-4"
          >
            O que nossos clientes <span className="text-mainOrange">dizem.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base md:text-lg max-w-xl mx-auto"
          >
            Relatos reais de quem já transformou a rotina do escritório.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-14">

          <div className="relative flex items-center gap-4 lg:gap-6 flex-shrink-0">

            <button
              onClick={prev}
              className="hidden md:flex w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white items-center justify-center hover:bg-mainOrange hover:border-mainOrange transition-all duration-300 shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.94, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.94, x: -30 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="relative rounded-2xl overflow-hidden bg-black group cursor-pointer"
                style={{
                  width: "min(72vw, 300px)",
                  aspectRatio: "9 / 16",
                  border: "1px solid rgba(231,103,20,0.30)",
                  boxShadow: "0 32px 64px rgba(0,0,0,0.65), 0 0 60px rgba(231,103,20,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
                onClick={togglePlay}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-mainOrange/70 to-transparent z-10" />

                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  playsInline
                  preload="metadata"
                >
                  {nearView && <source src={current.videoUrl} type="video/mp4" />}
                </video>

                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/25 transition-all duration-300">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-mainOrange flex items-center justify-center text-white"
                      style={{ boxShadow: "0 0 40px rgba(231,103,20,0.60), 0 8px 24px rgba(0,0,0,0.40)" }}
                    >
                      <Play className="w-7 h-7 md:w-9 md:h-9 fill-current ml-1" />
                    </motion.div>
                  </div>
                )}

                {isPlaying && (
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0,0,0,0.20)" }}
                  >
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)" }}
                    >
                      <Pause className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pointer-events-none">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${current.color} flex items-center justify-center shrink-0`}>
                      <span className="text-[10px] font-bold text-white">{current.avatar}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-xs font-bold truncate">{current.client}</p>
                      <p className="text-white/50 text-[10px] truncate">{current.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={next}
              className="hidden md:flex w-11 h-11 rounded-full bg-white/5 border border-white/10 text-white items-center justify-center hover:bg-mainOrange hover:border-mainOrange transition-all duration-300 shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col gap-6 flex-1 w-full lg:max-w-none"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-mainOrange text-mainOrange" />
                ))}
              </div>

              <div>
                <p className="text-mainOrange text-xs font-black uppercase tracking-widest mb-3">Destaque</p>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
                  "{current.highlight}"
                </h3>
              </div>

              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                "{current.quote}"
              </p>

              <div
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center shrink-0`}>
                  <span className="text-sm font-bold text-white">{current.avatar}</span>
                </div>
                <div>
                  <p className="text-white font-bold">{current.client}</p>
                  <p className="text-white/40 text-sm">{current.role} · {current.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={prev}
                  className="md:hidden flex w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white items-center justify-center active:bg-mainOrange active:border-mainOrange transition-all duration-300 shrink-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {videoTestimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setCurrentIndex(i); setIsPlaying(false); }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === currentIndex ? "w-8 bg-mainOrange" : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="md:hidden flex w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white items-center justify-center active:bg-mainOrange active:border-mainOrange transition-all duration-300 shrink-0"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="text-white/25 text-xs font-medium ml-auto">
                  {currentIndex + 1} / {videoTestimonials.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export { VideoTestimonials };