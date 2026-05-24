"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#52b788]/60 focus:bg-white/8 transition-all duration-300 text-sm";

const services = [
  "Design paysager",
  "Plantations",
  "Terrasse",
  "Entretien",
  "Autre",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0d1b0e]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="w-8 h-px bg-[#52b788]" />
              Contactez-nous
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Parlons de
              <br />
              <em className="text-[#52b788]">votre projet</em>
            </motion.h2>

            <motion.p
              className="text-white/50 leading-relaxed mb-10 text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Décrivez-nous votre projet et nous vous répondrons sous 24 heures
              avec une première proposition et un rendez-vous gratuit.
            </motion.p>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "Téléphone", value: "+33 6 12 34 56 78", href: "tel:+33612345678" },
                { icon: Mail, label: "Email", value: "contact@verdant.fr", href: "mailto:contact@verdant.fr" },
                { icon: MapPin, label: "Siège", value: "12 Allée des Jardins, 75016 Paris", href: "#" },
              ].map(({ icon: Icon, label, value, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#52b788]/10 border border-[#52b788]/20 flex items-center justify-center text-[#52b788] group-hover:bg-[#52b788] group-hover:text-white transition-all duration-300">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-white/30 text-xs uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-white group-hover:text-[#52b788] transition-colors text-sm">{value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Hours */}
            <motion.div
              className="mt-10 p-6 rounded-2xl border border-white/10 bg-white/3"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="text-white/50 text-xs uppercase tracking-wide mb-3">Horaires</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-white/70">Lun – Ven</div>
                <div className="text-white">8h – 18h</div>
                <div className="text-white/70">Samedi</div>
                <div className="text-white">9h – 13h</div>
                <div className="text-white/70">Dimanche</div>
                <div className="text-white/40">Fermé</div>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-wide block mb-2">
                          Prénom & Nom *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Pierre Martin"
                          className={inputClass}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-white/40 text-xs uppercase tracking-wide block mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          placeholder="+33 6 12 34 56 78"
                          className={inputClass}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wide block mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="pierre@exemple.fr"
                        className={inputClass}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wide block mb-2">
                        Service souhaité
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSelectedService(s)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                              selectedService === s
                                ? "bg-[#52b788] text-white"
                                : "border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-white/40 text-xs uppercase tracking-wide block mb-2">
                        Décrivez votre projet *
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Surface du terrain, style souhaité, délais envisagés..."
                        className={`${inputClass} resize-none`}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#52b788] hover:bg-[#74c69d] disabled:opacity-70 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-[#52b788]/20"
                      whileTap={{ scale: 0.98 }}
                    >
                      {loading ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send size={16} />
                          Envoyer ma demande
                        </>
                      )}
                    </motion.button>

                    <p className="text-white/30 text-xs text-center">
                      Réponse sous 24h — Devis gratuit et sans engagement
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle size={64} className="text-[#52b788] mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3"
                      style={{ fontFamily: "var(--font-playfair)" }}>
                      Message envoyé !
                    </h3>
                    <p className="text-white/50 leading-relaxed">
                      Merci {form.name.split(" ")[0]} ! Nous vous recontacterons
                      <br />sous 24 heures pour organiser votre rendez-vous gratuit.
                    </p>
                    <motion.div
                      className="mt-6 flex gap-2 text-[#52b788] text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="animate-pulse">✦</span>
                      À très bientôt
                      <span className="animate-pulse" style={{ animationDelay: "0.5s" }}>✦</span>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
