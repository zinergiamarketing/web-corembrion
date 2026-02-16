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
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-2 -mx-4 pl-16 pr-16 md:overflow-visible md:flex-wrap md:mx-0 md:pl-0 md:pr-0 scrollbar-hide"
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
        className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center text-[#1a4792] hover:bg-white active:scale-95 transition-all border border-gray-200/50"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/95 shadow-md flex items-center justify-center text-[#1a4792] hover:bg-white active:scale-95 transition-all border border-gray-200/50"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
