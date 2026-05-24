"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sophie & Marc Beaumont",
    location: "Versailles",
    project: "Jardin contemporain 800m²",
    rating: 5,
    text: "Verdant a transformé notre terrain nu en un jardin d'exception. Leur équipe a su capturer notre vision tout en apportant une expertise botanique remarquable. Chaque détail est pensé, chaque plante choisie avec soin.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Henri Marchand",
    location: "Bordeaux",
    project: "Terrasse et piscine paysagée",
    rating: 5,
    text: "Un travail d'artiste. La terrasse en pierre naturelle et les massifs de lavandes créent une harmonie provençale parfaite. Leur suivi post-installation est exemplaire, ils sont encore là six mois après.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Isabelle Fontaine",
    location: "Lyon",
    project: "Jardin zen & rooftop",
    rating: 5,
    text: "Je cherchais un espace de sérénité en pleine ville. Verdant a créé un jardin zen sur ma terrasse qui dépasse tout ce que j'imaginais. Les bambous, les pierres et l'eau créent une atmosphère japonaise authentique.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Antoine & Claire Dubois",
    location: "Aix-en-Provence",
    project: "Domaine 2 hectares",
    rating: 5,
    text: "Un projet d'envergure mené avec professionnalisme et passion. Verdant a su préserver l'âme provençale de notre propriété tout en modernisant les espaces. Leur connaissance des plantes locales est incomparable.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 md:py-32 bg-[#f5f0e8] overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: label + main testimonial */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-[#52b788]" />
              Témoignages
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-[#1a3c2b] mb-10 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Ce que disent
              <br />
              <em>nos clients</em>
            </motion.h2>

            {/* Large quote */}
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <div className="text-[#52b788] text-7xl font-display leading-none mb-4 opacity-30"
                  style={{ fontFamily: "var(--font-playfair)" }}>
                  "
                </div>
                <p className="text-[#2a3b2c] text-lg leading-relaxed mb-8 italic font-light">
                  {t.text}
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#52b788]/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a3c2b]">{t.name}</div>
                    <div className="text-[#6b7c6d] text-sm">{t.location} — {t.project}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-[#c9a84c] text-sm">★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-[#1a3c2b] flex items-center justify-center text-[#1a3c2b] hover:bg-[#1a3c2b] hover:text-white transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-[#1a3c2b] flex items-center justify-center text-white hover:bg-[#52b788] transition-all duration-300"
              >
                →
              </button>
              <div className="flex gap-2 ml-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-[#52b788]" : "w-1.5 bg-[#1a3c2b]/20"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: card stack */}
          <div className="relative h-[480px]">
            {testimonials.map((item, i) => {
              const offset = (i - current + testimonials.length) % testimonials.length;
              const isActive = offset === 0;
              const isBehind1 = offset === 1;
              const isBehind2 = offset === 2;

              return (
                <motion.div
                  key={item.id}
                  className="absolute inset-0 rounded-3xl bg-white p-8 shadow-lg cursor-pointer"
                  animate={{
                    scale: isActive ? 1 : isBehind1 ? 0.95 : isBehind2 ? 0.9 : 0.85,
                    y: isActive ? 0 : isBehind1 ? 20 : isBehind2 ? 40 : 60,
                    zIndex: isActive ? 10 : isBehind1 ? 9 : isBehind2 ? 8 : 7,
                    opacity: isActive ? 1 : isBehind1 ? 0.7 : isBehind2 ? 0.4 : 0,
                  }}
                  transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  onClick={() => !isActive && setCurrent(i)}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: item.rating }).map((_, j) => (
                          <span key={j} className="text-[#c9a84c]">★</span>
                        ))}
                      </div>
                      <p className="text-[#2a3b2c] leading-relaxed italic text-sm line-clamp-3">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#f5f0e8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-[#1a3c2b] text-sm">{item.name}</div>
                        <div className="text-[#6b7c6d] text-xs">{item.location}</div>
                      </div>
                      <div className="ml-auto text-xs text-[#52b788] font-medium bg-[#52b788]/10 px-3 py-1 rounded-full">
                        {item.project.split(" ").slice(0, 2).join(" ")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
