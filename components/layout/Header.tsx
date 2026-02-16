"use client";

import Link from "next/link";
import Image from "next/image";
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
            <Image
              src="/logos/logo.png"
              alt="Logo Corembrion"
              width={48}
              height={48}
              className="object-contain"
            />
            <span className={`font-bold text-xl uppercase tracking-wide ${useLightNav ? "text-white" : "text-[#1a1a1a]"}`}>
              COREMBRION
            </span>
          </Link>
          <Navigation variant={useLightNav ? "light" : "dark"} />
        </div>
      </div>
    </motion.header>
  );
}
