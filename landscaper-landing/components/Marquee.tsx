"use client";

import { motion } from "framer-motion";

const logos = [
  "Design Paysager",
  "Terrasses & Pergolas",
  "Jardins Contemporains",
  "Piscines & Bassins",
  "Éclairage Extérieur",
  "Arrosage Automatique",
  "Espaces Verts Pro",
  "Jardins Zen",
];

export default function Marquee() {
  return (
    <div className="bg-[#1a3c2b] py-5 overflow-hidden border-y border-[#52b788]/20">
      <div className="flex">
        {[0, 1].map((rep) => (
          <motion.div
            key={rep}
            className="flex items-center gap-0 shrink-0"
            animate={{ x: rep === 0 ? [0, "-100%"] : ["0%", "-100%"] }}
            style={{ x: rep === 1 ? "0%" : "0%" }}
            transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          >
            {logos.map((logo, i) => (
              <div key={i} className="flex items-center gap-6 px-6">
                <span className="text-[#52b788]/60 text-xs tracking-widest uppercase font-medium whitespace-nowrap">
                  {logo}
                </span>
                <span className="text-[#52b788]/30 text-base">◆</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
