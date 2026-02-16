"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { MobileCarousel, CarouselItem } from "@/components/ui/MobileCarousel";

const galleryItems = [
  { id: 1, src: "/images/proyectos/proyecto-1.jpeg", category: "Proyectos", alt: "Proyecto Corembrion" },
  { id: 2, src: "/images/nosotros/nosotros-1.jpeg", category: "Comunidades", alt: "Comunidad de la región del San Jorge" },
  { id: 3, src: "/images/hero/hero-1.jpeg", category: "Naturaleza", alt: "Región del San Jorge" },
];

const categories = ["Todos", "Proyectos", "Comunidades", "Capacitaciones", "Naturaleza"];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = activeCategory === "Todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="galeria" className="py-12 md:py-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3 md:mb-4 font-heading">
            Galería de Imágenes
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Nuestro trabajo en la región del San Jorge
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 md:px-4 rounded-lg font-medium transition-all duration-300 min-h-[44px] text-sm md:text-base ${
                activeCategory === cat
                  ? "bg-[#1a4792] text-white scale-105"
                  : "bg-[#f5f5f5] text-gray-600 hover:bg-[#9cc0dd]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carrusel móvil */}
        <div className="md:hidden">
          <MobileCarousel>
            {filteredItems.map((item, index) => (
              <CarouselItem key={item.id} className="!min-w-[75%]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-square relative overflow-hidden rounded-xl cursor-pointer group"
                  onClick={() => setSelectedImage(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-active:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 75vw, 400px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-active:opacity-100 transition-opacity text-white font-medium text-sm">
                      Ver más
                    </span>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </MobileCarousel>
        </div>

        {/* Grid desktop */}
        <motion.div
          layout
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="aspect-square relative overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium">
                  Ver más
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative max-w-4xl w-full aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Cerrar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
