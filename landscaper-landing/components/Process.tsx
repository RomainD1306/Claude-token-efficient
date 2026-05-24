"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Consultation",
    desc: "Rencontre sur site pour comprendre votre vision, analyser votre terrain et définir vos besoins et votre budget.",
    duration: "1–2h",
    icon: "🤝",
  },
  {
    n: "02",
    title: "Conception",
    desc: "Élaboration d'un plan paysager détaillé avec rendus 3D, sélection des espèces et devis personnalisé.",
    duration: "1–2 semaines",
    icon: "✏️",
  },
  {
    n: "03",
    title: "Réalisation",
    desc: "Notre équipe prend vie votre projet avec soin et précision, en respectant les délais et votre tranquillité.",
    duration: "Variable",
    icon: "🌱",
  },
  {
    n: "04",
    title: "Suivi & Entretien",
    desc: "Accompagnement dans la durée avec un contrat d'entretien adapté pour que votre jardin reste parfait.",
    duration: "Continu",
    icon: "♾️",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 md:py-32 bg-[#1a3c2b] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="w-8 h-px bg-[#52b788]" />
            Notre méthode
            <span className="w-8 h-px bg-[#52b788]" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            De l&apos;idée au jardin
          </motion.h2>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="w-full bg-[#52b788]/60 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                  i % 2 === 0 ? "" : "lg:direction-rtl"
                }`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <div className={`lg:pb-24 ${i % 2 === 0 ? "lg:text-right" : "lg:col-start-2 lg:row-start-1"}`}>
                  <div className={`${i % 2 === 0 ? "lg:flex lg:flex-col lg:items-end" : ""}`}>
                    <span className="text-[#52b788]/40 text-6xl font-bold font-display mb-2 block"
                      style={{ fontFamily: "var(--font-playfair)" }}>
                      {step.n}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "var(--font-playfair)" }}>
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed max-w-sm">{step.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-white/50">
                      <span className="text-[#52b788] text-xs">⏱</span>
                      {step.duration}
                    </div>
                  </div>
                </div>

                {/* Center icon */}
                <div className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center ${i % 2 === 0 ? "" : "lg:col-start-1 lg:row-start-1"}`}
                  style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                  <motion.div
                    className="w-14 h-14 rounded-full bg-[#1a3c2b] border-2 border-[#52b788] flex items-center justify-center text-2xl shadow-lg shadow-[#52b788]/20"
                    whileHover={{ scale: 1.2, borderColor: "#74c69d" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Mobile icon */}
                <div className="lg:hidden flex items-center gap-4 mt-4 ml-0">
                  <span className="text-3xl">{step.icon}</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20 pt-16 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-white/50 mb-6 text-lg">
            Prêt à commencer votre transformation ?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-[#52b788] hover:bg-[#74c69d] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#52b788]/30 hover:-translate-y-0.5 text-base"
          >
            Démarrer mon projet
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
