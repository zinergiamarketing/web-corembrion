import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Proyectos | Corembrion",
  description:
    "Conoce los proyectos de piscicultura, agricultura y desarrollo comunitario ejecutados por Corembrion en Córdoba y la región.",
};

export default function ProyectosPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-[#1a4792] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold font-heading">Nuestros Proyectos</h1>
            <p className="text-xl text-white/90 mt-4">
              Más de 13 proyectos ejecutados transformando comunidades en la región
            </p>
          </div>
        </section>
        <Projects hideViewAll isPageView />
      </main>
      <Footer />
    </>
  );
}
