"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import type { Proyecto } from "@/types";

interface ProjectCardProps {
  proyecto: Proyecto;
  index: number;
}

const categoriaLabels: Record<string, string> = {
  piscicultura: "Piscicultura",
  agricultura: "Agricultura",
  formacion: "Formación",
  turismo: "Turismo",
};

export function ProjectCard({ proyecto, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/proyectos/${proyecto.id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
          <div className="relative aspect-video bg-gray-200 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80"
              alt={proyecto.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-[#1a4792] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {proyecto.fecha}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-white/90 text-[#1a1a1a] text-xs font-medium px-3 py-1 rounded-full">
                {categoriaLabels[proyecto.categoria] || proyecto.categoria}
              </span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 group-hover:text-[#1a4792] transition-colors line-clamp-2">
              {proyecto.titulo}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
              {proyecto.descripcion}
            </p>
            <p className="text-[#1a4792] font-bold">
              {formatCurrency(proyecto.valor)}
            </p>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
