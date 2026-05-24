"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "À propos", href: "#about" },
  { label: "Réalisations", href: "#portfolio" },
  { label: "Processus", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        animate={{
          backgroundColor: scrolled ? "rgba(13,27,14,0.96)" : "rgba(13,27,14,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          borderBottomColor: scrolled ? "rgba(82,183,136,0.15)" : "rgba(82,183,136,0)",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#52b788] to-[#1a3c2b] flex items-center justify-center shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8 2 5 6 5 10c0 5 7 12 7 12s7-7 7-12c0-4-3-8-7-8z" fill="white" fillOpacity="0.9"/>
                <path d="M12 8v8M9 11l3-3 3 3" stroke="rgba(82,183,136,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span
              className="font-display text-white text-xl font-bold tracking-wide"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Verdant
            </span>
          </motion.a>

          <motion.ul
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {navLinks.map((link, i) => (
              <motion.li key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <a
                  href={link.href}
                  className="text-white/75 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#52b788] group-hover:w-full transition-all duration-300" />
                </a>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="tel:+33612345678"
              className="text-[#52b788] text-sm font-medium hover:text-[#74c69d] transition-colors"
            >
              +33 6 12 34 56 78
            </a>
            <a
              href="#contact"
              className="bg-[#52b788] hover:bg-[#74c69d] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#52b788]/30 hover:-translate-y-0.5"
            >
              Devis gratuit
            </a>
          </motion.div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0d1b0e] flex flex-col"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-white text-xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
                Verdant
              </span>
              <button onClick={() => setMenuOpen(false)} className="text-white p-2">
                <X size={24} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-white/70 hover:text-white text-4xl font-display font-bold py-4 border-b border-white/10 transition-colors"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-8 bg-[#52b788] text-white text-center py-4 rounded-2xl text-lg font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Devis gratuit
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
