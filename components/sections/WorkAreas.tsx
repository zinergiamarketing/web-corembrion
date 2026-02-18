"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BookOpen, Sprout, Trees, ClipboardList } from "lucide-react";
import { MobileCarousel, CarouselItem } from "@/components/ui/MobileCarousel";

const areas = [
  {
    title: "Formación y Capacitación",
    Icon: BookOpen,
    items: [
      "Organizaciones comunitarias",
      "Agremiaciones",
      "Instituciones estatales y privadas",
      "Desarrollo tecnológico y cultural",
      "Intercambio técnico: académico, deportivo, cultural",
    ],
  },
  {
    title: "Desarrollo Productivo",
    Icon: Sprout,
    items: [
      "Acuicultura y piscicultura",
      "Agricultura (plátano hartón, hortofrutícolas)",
      "Patios productivos",
      "Agronegocios intensivos",
      "Comercialización agropecuaria",
    ],
  },
  {
    title: "Turismo Sostenible",
    Icon: Trees,
    items: [
      "Turismo deportivo y recreativo",
      "Ecoturismo",
      "Potencialidades: Ciénaga de Ayapel, caños, represas",
      "Recreación activa: moto náutica, sky",
      "Recreación pasiva: pesca deportiva, paseos en lancha",
    ],
  },
  {
    title: "Gestión de Proyectos",
    Icon: ClipboardList,
    items: [
      "Planificación estratégica",
      "Investigación y desarrollo",
      "Gestión administrativa",
      "Convenios interinstitucionales",
    ],
  },
];

interface WorkAreasProps {
  /** En la página dedicada, el banner ya muestra el título; no repetir encabezado */
  isPageView?: boolean;
}

export function WorkAreas({ isPageView }: WorkAreasProps) {
  return (
    <section id="areas-trabajo" className="py-12 md:py-20 bg-white">
      <Container>
        {isPageView ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-left text-lg text-gray-600 max-w-3xl mb-10 md:mb-14"
          >
            Formación, desarrollo productivo, turismo sostenible y gestión de proyectos — cuatro ámbitos que impulsan el desarrollo integral en la región del San Jorge.
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3 md:mb-4 font-heading">
              Áreas de Trabajo
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestras líneas de acción para el desarrollo integral de la región
            </p>
          </motion.div>
        )}

        {/* Carrusel móvil */}
        <div className="md:hidden">
          <MobileCarousel>
            {areas.map((area, index) => (
              <CarouselItem key={area.title}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-[#f5f5f5] rounded-xl p-5 h-full border border-transparent hover:border-[#1a4792]/20"
                >
                  <div className="mb-3">
                    <area.Icon className="w-9 h-9 text-[#1a4792]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-[#1a4792] mb-3 font-heading">
                    {area.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {area.items.map((item) => (
                      <li key={item} className="text-gray-600 text-xs flex items-start gap-2">
                        <span className="text-[#1a4792] mt-0.5 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </CarouselItem>
            ))}
          </MobileCarousel>
        </div>

        {/* Grid desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#f5f5f5] rounded-xl p-6 hover:bg-[#9cc0dd]/20 transition-colors border border-transparent hover:border-[#1a4792]/20"
            >
              <div className="mb-4">
                <area.Icon className="w-10 h-10 text-[#1a4792]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[#1a4792] mb-4 font-heading">
                {area.title}
              </h3>
              <ul className="space-y-2">
                {area.items.map((item) => (
                  <li key={item} className="text-gray-600 text-sm flex items-start gap-2">
                    <span className="text-[#1a4792] mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
