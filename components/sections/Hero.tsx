"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = ["/images/hero/hero-1.jpg", "/images/hero/hero-2.jpg", "/images/hero/hero-3.jpg"];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[activeIndex]}
              alt="Comunidad y naturaleza en la región del San Jorge"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#1a4792]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 font-heading"
        >
          Transformando comunidades en la región del San Jorge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-base sm:text-2xl text-white/90 max-w-3xl mx-auto mb-8 md:mb-10"
        >
          Desarrollo integral a través de proyectos agrícolas, piscícolas y de formación en Córdoba, Colombia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center bg-white text-[#1a4792] px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-[#9cc0dd] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
          >
            Conoce nuestros proyectos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a4792] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
          >
            Contáctanos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
