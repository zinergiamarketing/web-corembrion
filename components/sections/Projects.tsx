"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fish, Leaf, GraduationCap, Mountain, LayoutGrid, List, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { MobileCarousel, CarouselItem } from "@/components/ui/MobileCarousel";
import projectsData from "@/data/projects.json";
import type { Proyecto } from "@/types";

const categorias = [
  { value: "todos", label: "Todos" },
  { value: "piscicultura", label: "Piscicultura" },
  { value: "agricultura", label: "Agricultura" },
  { value: "formacion", label: "Formación" },
  { value: "turismo", label: "Turismo" },
];

const años = ["todos", "2026", "2024", "2023", "2022", "2020", "2019", "2018", "2017", "2016", "2015", "2014"];

const ordenOpciones = [
  { value: "recientes", label: "Más recientes primero" },
  { value: "antiguos", label: "Más antiguos primero" },
];

const categoriaIcons: Record<string, typeof Fish> = {
  piscicultura: Fish,
  agricultura: Leaf,
  formacion: GraduationCap,
  turismo: Mountain,
};

const categoriaLabels: Record<string, string> = {
  piscicultura: "Piscicultura",
  agricultura: "Agricultura",
  formacion: "Formación",
  turismo: "Turismo",
};

interface ProjectsProps {
  /** Ocultar el botón "Ver todos" cuando ya estamos en la página de proyectos */
  hideViewAll?: boolean;
  /** En la página dedicada, el banner ya muestra título y subtítulo; no repetir */
  isPageView?: boolean;
}

export function Projects({ hideViewAll, isPageView }: ProjectsProps) {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroAño, setFiltroAño] = useState("todos");
  const [orden, setOrden] = useState<"recientes" | "antiguos">("recientes");
  const [vista, setVista] = useState<"grid" | "lista">("lista");

  const proyectos = projectsData as Proyecto[];

  const proyectosFiltrados = useMemo(() => {
    let resultado = proyectos.filter((p) => {
      const matchCategoria = filtroCategoria === "todos" || p.categoria === filtroCategoria;
      const matchAño = filtroAño === "todos" || p.fecha === filtroAño;
      return matchCategoria && matchAño;
    });
    resultado = [...resultado].sort((a, b) => {
      const añoA = parseInt(a.fecha, 10);
      const añoB = parseInt(b.fecha, 10);
      return orden === "recientes" ? añoB - añoA : añoA - añoB;
    });
    return resultado;
  }, [proyectos, filtroCategoria, filtroAño, orden]);

  const inversionTotal = useMemo(() => {
    return proyectosFiltrados.reduce((sum, p) => sum + p.valor, 0);
  }, [proyectosFiltrados]);

  return (
    <section id="proyectos" className="py-12 md:py-20 bg-[#f5f5f5]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={isPageView ? "mb-8 md:mb-10" : "text-center mb-8 md:mb-10"}
        >
          {!isPageView && (
            <>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3 md:mb-4 font-heading">
                Nuestros Proyectos
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Más de 13 proyectos ejecutados transformando comunidades en la región
              </p>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100 mb-8"
          >
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Inversión total (filtrados)</p>
              <p className="text-xl md:text-2xl font-bold text-[#1a4792]">{formatCurrency(inversionTotal)}</p>
            </div>
            <div className="h-px sm:h-8 sm:w-px bg-gray-200" />
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Proyectos mostrados</p>
              <p className="text-xl font-bold text-[#1a1a1a]">{proyectosFiltrados.length}</p>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="flex-1 min-w-0">
              <label htmlFor="filtro-categoria" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                id="filtro-categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792] bg-white"
              >
                {categorias.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="filtro-año" className="block text-sm font-medium text-gray-700 mb-1">
                Año
              </label>
              <select
                id="filtro-año"
                value={filtroAño}
                onChange={(e) => setFiltroAño(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792] bg-white"
              >
                {años.map((a) => (
                  <option key={a} value={a}>
                    {a === "todos" ? "Todos" : a}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0">
              <label htmlFor="filtro-orden" className="block text-sm font-medium text-gray-700 mb-1">
                Orden
              </label>
              <select
                id="filtro-orden"
                value={orden}
                onChange={(e) => setOrden(e.target.value as "recientes" | "antiguos")}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792] bg-white"
              >
                {ordenOpciones.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 hidden sm:inline">Vista:</span>
            <div className="flex rounded-lg overflow-hidden border border-gray-300 bg-white">
              <button
                type="button"
                onClick={() => setVista("lista")}
                className={`p-2.5 transition-colors ${vista === "lista" ? "bg-[#1a4792] text-white" : "text-gray-600 hover:bg-gray-50"}`}
                aria-label="Vista lista"
                title="Vista lista"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setVista("grid")}
                className={`p-2.5 transition-colors ${vista === "grid" ? "bg-[#1a4792] text-white" : "text-gray-600 hover:bg-gray-50"}`}
                aria-label="Vista cuadrícula"
                title="Vista cuadrícula"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Vista lista - compacta, ideal para proyectos sin fotos */}
        {vista === "lista" && proyectosFiltrados.length > 0 && (
          <motion.div
            layout
            className="space-y-2 mb-8"
            initial={false}
          >
            {proyectosFiltrados.map((proyecto, index) => {
              const Icon = categoriaIcons[proyecto.categoria] || GraduationCap;
              const label = categoriaLabels[proyecto.categoria] || proyecto.categoria;
              return (
                <motion.div
                  key={proyecto.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={`/proyectos/${proyecto.id}`}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1a4792]/20 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#1a4792]/10 flex items-center justify-center text-[#1a4792]">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-gray-500">{label}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs font-semibold text-[#1a4792]">{proyecto.fecha}</span>
                        </div>
                        <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#1a4792] transition-colors line-clamp-2 sm:line-clamp-1">
                          {proyecto.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-1 mt-0.5">{proyecto.descripcion}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                      <p className="text-sm font-bold text-[#1a4792]">{formatCurrency(proyecto.valor)}</p>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#1a4792] transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Vista grid - tarjetas con imagen cuando existe */}
        {vista === "grid" && proyectosFiltrados.length > 0 && (
          <>
            <div className="md:hidden">
              <MobileCarousel>
                {proyectosFiltrados.map((proyecto, index) => (
                  <CarouselItem key={proyecto.id}>
                    <ProjectCard proyecto={proyecto} index={index} />
                  </CarouselItem>
                ))}
              </MobileCarousel>
            </div>
            <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {proyectosFiltrados.map((proyecto, index) => (
                <ProjectCard key={proyecto.id} proyecto={proyecto} index={index} />
              ))}
            </div>
          </>
        )}

        {proyectosFiltrados.length === 0 && (
          <p className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-100">
            No se encontraron proyectos con los filtros seleccionados.
          </p>
        )}

        {!hideViewAll && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 md:mt-12"
          >
            <Button href="/proyectos" variant="primary" size="lg">
              Ver todos los proyectos
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
