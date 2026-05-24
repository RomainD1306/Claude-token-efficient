"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Play, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function VideoReel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [videoOpen, setVideoOpen] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section className="py-0 overflow-hidden bg-[#0d1b0e]" ref={ref}>
      <div className="relative h-[60vh] md:h-[80vh]">
        {/* Background image with parallax */}
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src="https://images.unsplash.com/photo-1564419320461-6870880221ad?w=1920&h=1080&fit=crop&q=80"
            alt="Notre travail en vidéo"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#0d1b0e]/60" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            className="inline-flex items-center gap-2 text-[#52b788] text-sm font-semibold tracking-widest uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="w-8 h-px bg-[#52b788]" />
            Notre showreel
            <span className="w-8 h-px bg-[#52b788]" />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-8 max-w-2xl leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Voyez notre art
            <br />
            <em className="text-[#52b788]">en action</em>
          </motion.h2>

          <motion.button
            className="group relative w-24 h-24 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-[#52b788] hover:border-[#52b788] transition-all duration-400"
            onClick={() => setVideoOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
            <span className="absolute inset-[-12px] rounded-full border border-white/15 animate-ping" style={{ animationDelay: "0.3s" }} />
            <Play size={32} fill="currentColor" className="ml-1" />
          </motion.button>

          <motion.p
            className="mt-6 text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            Voir notre showreel 2024
          </motion.p>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                autoPlay
                controls
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1564419320461-6870880221ad?w=1280&h=720&fit=crop&q=80"
              >
                <source
                  src="https://videos.pexels.com/video-files/3571543/3571543-hd_1920_1080_30fps.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_25fps.mp4"
                  type="video/mp4"
                />
              </video>

              <button
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                onClick={() => setVideoOpen(false)}
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
