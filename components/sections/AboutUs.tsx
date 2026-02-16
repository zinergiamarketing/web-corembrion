"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

const items = [
  {
    title: "Misión",
    icon: "🎯",
    content: "Integrar las diferentes fuerzas productivas de la región del San Jorge con todas las fuerzas vivas del país, en búsqueda de una transformación, reconstrucción y transformación del tejido social, con una sana convivencia racional y pacífica del hombre con el medio ambiente.",
  },
  {
    title: "Visión",
    icon: "👁️",
    content: "Ser la organización comunitaria más importante en la región en el año 2025, como eslabón en la cadena productiva y de servicios entre el sector primario y el consumidor final.",
  },
  {
    title: "Objeto Social",
    icon: "🤝",
    content: "Integrar a los productores, empresarios comercializadores y la sociedad civil, en torno al mejoramiento de la calidad de vida de las comunidades de la región del San Jorge, departamento de Córdoba y del país en general.",
  },
];

export function AboutUs() {
  return (
    <section id="nosotros" className="py-20 bg-[#f5f5f5]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1a1a] mb-4 font-heading">
            Quiénes Somos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Corporación para el Desarrollo Integral con sede en Ayapel, Córdoba
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-[#1a4792] mb-4 font-heading">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-xl overflow-hidden aspect-video bg-gray-200 relative"
        >
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80"
            alt="Comunidades de la región del San Jorge"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-[#1a4792]/30 flex items-center justify-center">
            <p className="text-white text-lg font-medium text-center px-4">
              Espacio para imagen del cliente: comunidades, campo, pescadores
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
