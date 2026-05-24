"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";

const WORDS = ["Jardins", "Espaces", "Visions", "Univers"];

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 120, opacity: 0, rotateX: -80 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            delay: 0.4 + i * 0.035,
            duration: 0.7,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block overflow-hidden align-bottom" style={{ height: "1.15em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          className="absolute inset-0 text-[#52b788] italic"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const FloatingLeaf = ({ delay = 0, x = 0, size = 1 }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={{
      left: `${x}%`,
      top: "-10%",
      fontSize: `${size * 2}rem`,
      opacity: 0.15,
    }}
    animate={{
      y: ["0vh", "110vh"],
      rotate: [0, 360],
      x: [0, 30, -20, 10, 0],
    }}
    transition={{
      duration: 12 + delay * 3,
      delay: delay * 2,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    🌿
  </motion.div>
);

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    mouseX.set((e.clientX - rect.left - cx) / cx * 15);
    mouseY.set((e.clientY - rect.top - cy) / cy * 10);
  };

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouse}
    >
      {/* Video / Image background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1b0e]/50 via-[#0d1b0e]/30 to-[#0d1b0e]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b0e]/60 via-transparent to-transparent" />
      </motion.div>

      {/* Floating leaves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <FloatingLeaf key={i} delay={i * 1.5} x={10 + i * 18} size={0.8 + i * 0.2} />
      ))}

      {/* Parallax light orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(82,183,136,0.06) 0%, transparent 70%)",
          x: springX,
          y: springY,
          left: "40%",
          top: "20%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ opacity }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/80 text-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#52b788] animate-pulse" />
          Paysagiste d&apos;exception depuis 2003
        </motion.div>

        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-4 overflow-hidden"
          style={{ fontFamily: "var(--font-playfair)", lineHeight: 1.05 }}
        >
          <SplitText text="Vos" />
          {" "}
          <RotatingWord />
          <br />
          <div className="overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            >
              Prennent Vie
            </motion.span>
          </div>
        </h1>

        <motion.p
          className="text-lg md:text-xl text-white/65 max-w-xl mx-auto mt-6 mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        >
          Nous créons des espaces extérieurs où la nature et l&apos;architecture
          dialoguent — jardiniers d&apos;exception, architectes du végétal.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <a
            href="#portfolio"
            className="group relative overflow-hidden bg-[#52b788] hover:bg-[#74c69d] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#52b788]/30 hover:-translate-y-1 text-base"
          >
            <span className="relative z-10">Voir nos réalisations</span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </a>

          <button
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            onClick={() => {
              const el = document.querySelector("#about");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#52b788] transition-colors">
              <Play size={16} fill="currentColor" className="ml-0.5" />
            </span>
            <span className="text-sm font-medium">Notre histoire</span>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {[
            { n: "500+", label: "Projets réalisés" },
            { n: "20+", label: "Ans d'expertise" },
            { n: "98%", label: "Clients satisfaits" },
          ].map(({ n, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white font-display"
                style={{ fontFamily: "var(--font-playfair)" }}>
                {n}
              </div>
              <div className="text-xs text-white/50 mt-0.5 tracking-wide uppercase">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
