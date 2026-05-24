"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Villa Méditerranée",
    location: "Côte d'Azur",
    category: "Design",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&q=80",
    span: "col-span-1 row-span-2",
  },
  {
    id: 2,
    title: "Jardin Japonisant",
    location: "Paris 16e",
    category: "Zen",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Terrasse Rooftop",
    location: "Lyon",
    category: "Terrasse",
    image: "https://images.unsplash.com/photo-1490750967868-88df5691cc03?w=800&h=400&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Domaine Bordelais",
    location: "Bordeaux",
    category: "Domaine",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&q=80",
    span: "col-span-2 row-span-1",
  },
  {
    id: 5,
    title: "Espace Minimaliste",
    location: "Nantes",
    category: "Contemporain",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=400&fit=crop&q=80",
    span: "col-span-1 row-span-1",
  },
];

const categories = ["Tous", "Design", "Zen", "Terrasse", "Domaine", "Contemporain"];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = activeCategory === "Tous"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#f5f0e8]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="w-8 h-px bg-[#52b788]" />
            Nos réalisations
            <span className="w-8 h-px bg-[#52b788]" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-[#1a3c2b] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Chaque projet,
            <br />
            <em>une signature</em>
          </motion.h2>
        </div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1a3c2b] text-white shadow-md"
                  : "bg-white text-[#6b7c6d] hover:bg-[#1a3c2b]/10 hover:text-[#1a3c2b]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px]"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                className={`relative rounded-3xl overflow-hidden cursor-pointer group ${project.span}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#0d1b0e]/90 via-[#0d1b0e]/20 to-transparent"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block bg-[#52b788] text-white text-xs px-3 py-1 rounded-full mb-2">
                      {project.category}
                    </span>
                  </motion.div>
                  <h3
                    className="text-white font-bold text-lg"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-0.5">{project.location}</p>
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ↗
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 border-2 border-[#1a3c2b] text-[#1a3c2b] hover:bg-[#1a3c2b] hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
          >
            Parler de votre projet
            <span className="text-sm">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
