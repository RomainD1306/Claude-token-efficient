"use client";

import { motion } from "framer-motion";

const links = {
  Services: ["Design Paysager", "Plantations", "Terrasses", "Entretien"],
  Entreprise: ["Notre histoire", "Notre équipe", "Références", "Partenaires"],
  Contact: ["Devis gratuit", "+33 6 12 34 56 78", "contact@verdant.fr", "Paris & ÃŽle-de-France"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a1509] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#52b788] to-[#1a3c2b] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z" fill="white" fillOpacity="0.9"/>
                  <path d="M12 8v8M9 11l3-3 3 3" stroke="rgba(82,183,136,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-white text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
                Verdant
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              Paysagistes d&apos;exception depuis 2003. Nous créons des espaces
              extérieurs qui racontent votre histoire.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {["Instagram", "Pinterest", "Houzz", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#52b788]/50 hover:text-[#52b788] transition-all duration-300 text-xs"
                  title={s}
                >
                  {s[0]}
                </a>
              ))}
            </div>

            {/* Awards */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Jardins Excellence 2023", "Prix Innovation 2022"].map((award) => (
                <span
                  key={award}
                  className="inline-flex items-center gap-1.5 bg-[#52b788]/10 border border-[#52b788]/20 text-[#52b788] text-xs px-3 py-1.5 rounded-full"
                >
                  <span>★</span>
                  {award}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-5 tracking-wide">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200 block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Zones */}
        <div className="py-8 border-t border-white/5 border-b">
          <p className="text-white/30 text-xs text-center tracking-wide mb-3">Zones d&apos;intervention</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Paris", "Île-de-France", "Versailles", "Lyon", "Bordeaux", "Aix-en-Provence", "Côte d'Azur", "Normandie"].map((zone) => (
              <span key={zone} className="text-white/30 text-xs px-3 py-1 rounded-full border border-white/5">
                {zone}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2024 Verdant Paysagistes. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {["Mentions légales", "Politique de confidentialité", "CGV"].map((item) => (
              <a key={item} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Back to top */}
      <div className="text-center pb-8">
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 text-white/20 hover:text-white/60 text-xs transition-colors group"
          whileHover={{ y: -2 }}
        >
          <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
          Retour en haut
        </motion.button>
      </div>
    </footer>
  );
}
