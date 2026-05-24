"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section className="relative overflow-hidden py-0" ref={ref}>
      <div className="relative h-[70vh] min-h-[500px] flex items-center">
        {/* Background */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <Image
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&q=80"
            alt="Votre futur jardin"
            fill
            className="object-cover scale-110"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a3c2b]/95 via-[#1a3c2b]/80 to-[#1a3c2b]/50" />
        </motion.div>

        {/* Decorative */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#52b788]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -right-48 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#52b788]/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <motion.div
              className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-[#52b788]" />
              Votre projet commence ici
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              Transformons
              <br />
              <em className="text-[#52b788]">votre espace</em>
              <br />
              ensemble
            </motion.h2>

            <motion.p
              className="text-white/60 text-lg mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Devis gratuit sous 48h. Premier rendez-vous offert.
              Aucun engagement avant votre accord.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="group relative overflow-hidden bg-[#52b788] hover:bg-[#74c69d] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-[#52b788]/30 hover:-translate-y-1 text-base text-center"
              >
                <span className="relative z-10">Demander un devis gratuit</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
              </a>
              <a
                href="tel:+33612345678"
                className="flex items-center justify-center gap-3 border border-white/30 text-white hover:border-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base"
              >
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">☎</span>
                +33 6 12 34 56 78
              </a>
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: "✓", text: "Devis gratuit" },
                { icon: "✓", text: "RDV offert" },
                { icon: "✓", text: "Garantie décennale" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/50 text-sm">
                  <span className="text-[#52b788] font-bold">{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
