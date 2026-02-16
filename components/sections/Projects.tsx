"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
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

const años = ["todos", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2022", "2023", "2024"];

export function Projects() {
  const [filtroCategoria, setFiltroCategoria] = useState("todos");
  const [filtroAño, setFiltroAño] = useState("todos");

  const proyectos = projectsData as Proyecto[];

  const proyectosFiltrados = useMemo(() => {
    return proyectos.filter((p) => {
      const matchCategoria = filtroCategoria === "todos" || p.categoria === filtroCategoria;
      const matchAño = filtroAño === "todos" || p.fecha === filtroAño;
      return matchCategoria && matchAño;
    });
  }, [proyectos, filtroCategoria, filtroAño]);

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
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1a1a1a] mb-3 md:mb-4 font-heading">
            Nuestros Proyectos
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8">
            Más de 12 proyectos ejecutados transformando comunidades en la región
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-[#1a4792] text-white px-6 py-3 md:px-8 md:py-4 rounded-xl mb-8 md:mb-12"
          >
            <p className="text-xs md:text-sm text-white/80">Inversión total (proyectos filtrados)</p>
            <p className="text-lg md:text-2xl font-bold">{formatCurrency(inversionTotal)}</p>
          </motion.div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
          <div className="flex-1">
            <label htmlFor="filtro-categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="filtro-categoria"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792]"
            >
              {categorias.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="filtro-año" className="block text-sm font-medium text-gray-700 mb-1">
              Año
            </label>
            <select
              id="filtro-año"
              value={filtroAño}
              onChange={(e) => setFiltroAño(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#1a4792] focus:border-[#1a4792]"
            >
              {años.map((a) => (
                <option key={a} value={a}>
                  {a === "todos" ? "Todos" : a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Carrusel móvil */}
        {proyectosFiltrados.length > 0 && (
          <div className="md:hidden">
            <MobileCarousel>
              {proyectosFiltrados.map((proyecto, index) => (
                <CarouselItem key={proyecto.id}>
                  <ProjectCard proyecto={proyecto} index={index} />
                </CarouselItem>
              ))}
            </MobileCarousel>
          </div>
        )}

        {/* Grid desktop */}
        <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectosFiltrados.map((proyecto, index) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} index={index} />
          ))}
        </div>

        {proyectosFiltrados.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No se encontraron proyectos con los filtros seleccionados.
          </p>
        )}

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
      </Container>
    </section>
  );
}
