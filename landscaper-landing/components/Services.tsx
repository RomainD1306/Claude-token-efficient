"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Design Paysager",
    desc: "Conception sur-mesure de votre espace extérieur. Plans 3D, choix des essences, harmonie des volumes et des textures pour un résultat unique.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
    color: "#52b788",
  },
  {
    id: "02",
    title: "Plantations & Vegétal",
    desc: "Sélection d'espèces adaptées à votre climat, votre sol et votre style de vie. Vivaces, arbustes, arbres remarquables et couvre-sols.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&q=80",
    color: "#74c69d",
  },
  {
    id: "03",
    title: "Terrasses & Minéral",
    desc: "Création de terrasses en pierre naturelle, béton ciré ou bois exotique. Escaliers, murets et allées qui subliment votre extérieur.",
    image: "https://images.unsplash.com/photo-1590750215253-80bd7ad59e24?w=800&h=600&fit=crop&q=80",
    color: "#c9a84c",
  },
  {
    id: "04",
    title: "Entretien & Saisons",
    desc: "Contrats d'entretien personnalisés. Taille, tonte, fertilisation, préparation hivernale — votre jardin rayonne toute l'année.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=600&fit=crop&q=80",
    color: "#a8d8b9",
  },
];


export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 bg-[#f5f0e8]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-[#52b788]" />
              Nos expertises
            </motion.div>
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-[#1a3c2b] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Ce que nous
              <br />
              <em>créons pour vous</em>
            </motion.h2>
          </div>
          <motion.p
            className="text-[#6b7c6d] max-w-xs leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            De la conception à l&apos;entretien, nous accompagnons chaque étape
            de votre projet avec passion et savoir-faire.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: service.color }}
                >
                  {service.id}
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="text-lg font-bold text-[#1a3c2b] mb-3 group-hover:text-[#52b788] transition-colors"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {service.title}
                </h3>
                <p className="text-[#6b7c6d] text-sm leading-relaxed">{service.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-[#52b788] text-sm font-semibold">
                  <span>En savoir plus</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: service.color }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
