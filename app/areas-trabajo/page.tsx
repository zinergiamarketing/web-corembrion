import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorkAreas } from "@/components/sections/WorkAreas";

export const metadata: Metadata = {
  title: "Áreas de Trabajo | Corembrion",
  description:
    "Formación, desarrollo productivo, turismo sostenible y gestión de proyectos en la región del San Jorge.",
};

export default function AreasTrabajoPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-[#1a4792] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold font-heading">Áreas de Trabajo</h1>
            <p className="text-xl text-white/90 mt-4">
              Nuestras líneas de acción para el desarrollo integral
            </p>
          </div>
        </section>
        <WorkAreas />
      </main>
      <Footer />
    </>
  );
}
