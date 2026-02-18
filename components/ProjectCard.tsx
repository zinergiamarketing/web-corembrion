"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Fish, Leaf, GraduationCap, Mountain, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Proyecto } from "@/types";

interface ProjectCardProps {
  proyecto: Proyecto;
  index: number;
}

const categoriaConfig: Record<string, { label: string; Icon: typeof Fish; color: string; bg: string }> = {
  piscicultura: {
    label: "Piscicultura",
    Icon: Fish,
    color: "text-[#0d6b8a]",
    bg: "bg-[#0d6b8a]/10",
  },
  agricultura: {
    label: "Agricultura",
    Icon: Leaf,
    color: "text-[#2d7a3e]",
    bg: "bg-[#2d7a3e]/10",
  },
  formacion: {
    label: "Formación",
    Icon: GraduationCap,
    color: "text-[#1a4792]",
    bg: "bg-[#1a4792]/10",
  },
  turismo: {
    label: "Turismo",
    Icon: Mountain,
    color: "text-[#8b5a2b]",
    bg: "bg-[#8b5a2b]/10",
  },
};

export function ProjectCard({ proyecto, index }: ProjectCardProps) {
  const config = categoriaConfig[proyecto.categoria] || categoriaConfig.formacion;
  const { Icon, label, color, bg } = config;
  const tieneImagen = Boolean(proyecto.imagen);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
    >
      <Link href={`/proyectos/${proyecto.id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col border border-gray-100">
          {tieneImagen ? (
            <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
              <Image
                src={proyecto.imagen!}
                alt={proyecto.titulo}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                <span className="bg-white/95 text-[#1a1a1a] text-xs font-medium px-2.5 py-1 rounded-full">
                  {label}
                </span>
                <span className="bg-[#1a4792] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {proyecto.fecha}
                </span>
              </div>
            </div>
          ) : (
            <div className={`flex items-center justify-between px-5 py-4 ${bg} border-b border-gray-100`}>
              <div className={`flex items-center gap-3 ${color}`}>
                <div className={`p-2 rounded-lg ${bg}`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
                  <span className="block text-sm font-bold">{proyecto.fecha}</span>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#1a4792] group-hover:translate-x-1 transition-all" />
            </div>
          )}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-base font-bold text-[#1a1a1a] mb-2 group-hover:text-[#1a4792] transition-colors line-clamp-2 leading-snug">
              {proyecto.titulo}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1 leading-relaxed">
              {proyecto.descripcion}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <p className="text-[#1a4792] font-bold text-sm">
                {formatCurrency(proyecto.valor)}
              </p>
              <span className="text-xs text-gray-400 group-hover:text-[#1a4792] font-medium flex items-center gap-1">
                Ver detalle
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
