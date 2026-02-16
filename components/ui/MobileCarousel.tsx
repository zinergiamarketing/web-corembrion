"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MobileCarouselProps {
  children: React.ReactNode;
  className?: string;
}

interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselItem({ children, className = "" }: CarouselItemProps) {
  return (
    <div className={`flex-shrink-0 snap-start snap-always w-[85%] min-w-[280px] max-w-[340px] md:w-auto md:min-w-0 md:max-w-none ${className}`}>
      {children}
    </div>
  );
}

export function MobileCarousel({ children, className = "" }: MobileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.9;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-2 -mx-4 px-4 md:overflow-visible md:flex-wrap md:mx-0 md:px-0 scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
      <button
        onClick={() => scroll("left")}
        className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#1a4792] hover:bg-white transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 z-10 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-[#1a4792] hover:bg-white transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
