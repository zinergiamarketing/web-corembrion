"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "./Navigation";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const useLightNav = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ? "bg-white/95 shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2" aria-label="Corembrion - Inicio">
            <div className="w-12 h-12 rounded-lg bg-[#1a4792] flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className={`font-bold text-xl ${useLightNav ? "text-white" : "text-[#1a1a1a]"}`}>
              Corembrion
            </span>
          </Link>
          <Navigation variant={useLightNav ? "light" : "dark"} />
        </div>
      </div>
    </motion.header>
  );
}
