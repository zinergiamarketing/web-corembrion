"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/areas-trabajo", label: "Áreas de Trabajo" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

interface NavigationProps {
  variant?: "light" | "dark";
}

export function Navigation({ variant = "dark" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isLight = variant === "light";

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 right-4 z-50 p-2 rounded-lg bg-white/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1a4792] min-h-[44px] min-w-[44px]"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        <svg
          className="w-6 h-6 text-[#1a4792]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#1a4792] pt-24 pb-8 px-6"
          >
            <nav className="flex flex-col gap-6" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl font-medium hover:text-[#9cc0dd] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className="mt-4 inline-flex justify-center bg-white text-[#1a4792] px-6 py-3 rounded-lg font-semibold hover:bg-[#9cc0dd] transition-colors"
              >
                Contáctanos
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-medium transition-colors",
              isLight ? "text-white hover:text-[#9cc0dd]" : "text-[#1a1a1a] hover:text-[#1a4792]"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contacto"
          className="bg-[#1a4792] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#153a75] transition-colors"
        >
          Contáctanos
        </Link>
      </nav>
    </>
  );
}
