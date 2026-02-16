"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1920&q=80"
          alt="Comunidad y naturaleza en la región del San Jorge"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a4792]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading"
        >
          Transformando comunidades en la región del San Jorge
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto mb-10"
        >
          Desarrollo integral a través de proyectos agrícolas, piscícolas y de formación en Córdoba, Colombia.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center bg-white text-[#1a4792] px-8 py-4 rounded-lg font-semibold hover:bg-[#9cc0dd] transition-colors min-h-[44px]"
          >
            Conoce nuestros proyectos
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1a4792] transition-colors min-h-[44px]"
          >
            Contáctanos
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
