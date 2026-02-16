"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isLight = variant === "light";

  // Cerrar menú al cambiar de página (evita estado inconsistente)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a4792] focus:ring-offset-2 min-h-[44px] min-w-[44px] -mr-2"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className={cn("w-6 h-6", isLight ? "text-white" : "text-[#1a4792]")} strokeWidth={2} />
        ) : (
          <Menu className={cn("w-6 h-6", isLight ? "text-white" : "text-[#1a4792]")} strokeWidth={2} />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[100] bg-black/50"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-[280px] z-[101] bg-[#1a4792] shadow-2xl flex flex-col pt-20 pb-8 px-5 overflow-y-auto relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-lg text-white hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </button>
              <nav className="flex flex-col gap-2" aria-label="Navegación principal">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-lg font-medium hover:text-[#9cc0dd] transition-colors py-3 px-4 rounded-lg hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contacto"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 inline-flex justify-center bg-white text-[#1a4792] px-6 py-3 rounded-lg font-semibold hover:bg-[#9cc0dd] transition-colors"
                >
                  Contáctanos
                </Link>
              </nav>
            </motion.div>
          </>
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
