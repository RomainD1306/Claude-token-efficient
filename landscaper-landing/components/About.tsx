"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Jardins créés" },
  { value: 20, suffix: " ans", label: "D'expérience" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 12, suffix: "", label: "Prix reçus" },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="py-24 md:py-32 bg-[#0d1b0e] overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative" ref={imageRef}>
            <motion.div
              className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl"
              initial={{ opacity: 0, x: -60, clipPath: "inset(0 100% 0 0)" }}
              animate={inView ? { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.div className="absolute inset-0" style={{ y: imageY }}>
                <Image
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&h=1000&fit=crop&q=80"
                  alt="Notre équipe au travail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b0e]/60 to-transparent" />
            </motion.div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -right-6 lg:-right-10 bg-[#52b788] rounded-2xl p-6 shadow-xl max-w-[200px]"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <div className="text-4xl font-bold text-white font-display mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}>
                20+
              </div>
              <div className="text-white/80 text-sm leading-tight">
                Années d&apos;expérience dans le paysagisme
              </div>
            </motion.div>

            {/* Decorative ring */}
            <motion.div
              className="absolute -top-8 -left-8 w-32 h-32 rounded-full border border-[#52b788]/30"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              style={{ animation: inView ? "spin-slow 20s linear infinite" : "none" }}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#52b788]" />
            </motion.div>
          </div>

          {/* Text side */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-6"
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-[#52b788]" />
              Notre histoire
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Nous façonnons la nature
              <br />
              <em className="text-[#52b788]">avec respect</em>
            </motion.h2>

            <motion.p
              className="text-white/60 leading-relaxed mb-6 text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Fondée en 2003 par Pierre et Marie Verdant, notre entreprise est née d&apos;une
              conviction profonde : chaque espace extérieur mérite une attention particulière,
              une vision artistique et un savoir-faire artisanal.
            </motion.p>

            <motion.p
              className="text-white/60 leading-relaxed mb-10 text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Aujourd&apos;hui, notre équipe de 28 passionnés réalise des jardins exceptionnels
              à travers toute la France, de la résidence privée aux espaces collectifs de prestige.
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="border border-white/10 rounded-2xl p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                  whileHover={{ borderColor: "rgba(82,183,136,0.4)", backgroundColor: "rgba(82,183,136,0.05)" }}
                >
                  <div
                    className="text-3xl font-bold text-[#52b788] mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 bg-[#52b788] hover:bg-[#74c69d] text-white font-semibold px-7 py-4 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#52b788]/30 hover:-translate-y-0.5"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileTap={{ scale: 0.97 }}
            >
              Nous rencontrer
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">→</span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
