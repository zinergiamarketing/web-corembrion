import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { formatCurrency } from "@/lib/utils";
import projectsData from "@/data/projects.json";
import type { Proyecto } from "@/types";

const categoriaLabels: Record<string, string> = {
  piscicultura: "Piscicultura",
  agricultura: "Agricultura",
  formacion: "Formación",
  turismo: "Turismo",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const proyectos = projectsData as Proyecto[];
  return proyectos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const proyectos = projectsData as Proyecto[];
  const proyecto = proyectos.find((p) => p.id === id);
  if (!proyecto) return { title: "Proyecto no encontrado" };
  return {
    title: `${proyecto.titulo} | Corembrion`,
    description: proyecto.descripcion,
  };
}

export default async function ProyectoDetallePage({ params }: PageProps) {
  const { id } = await params;
  const proyectos = projectsData as Proyecto[];
  const proyecto = proyectos.find((p) => p.id === id);

  if (!proyecto) notFound();

  return (
    <>
      <Header />
      <main className="pt-20">
        <article>
          <div className="relative h-64 sm:h-96 bg-gray-200">
            <Image
              src={proyecto.imagen || "/images/proyectos/proyectos-1-01.jpg"}
              alt={proyecto.titulo}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#1a4792]/60" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <Container>
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-2">
                  {categoriaLabels[proyecto.categoria]}
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-heading">
                  {proyecto.titulo}
                </h1>
                <p className="text-white/90 mt-2">{proyecto.municipio} • {proyecto.fecha}</p>
              </Container>
            </div>
          </div>

          <Container className="py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1a4792] mb-2">Descripción</h2>
                  <p className="text-gray-600 leading-relaxed">{proyecto.descripcion}</p>
                </div>

                {proyecto.logros && proyecto.logros.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-[#1a4792] mb-2">Logros</h2>
                    <ul className="space-y-2">
                      {proyecto.logros.map((logro) => (
                        <li key={logro} className="flex items-start gap-2 text-gray-600">
                          <span className="text-[#1a4792]">✓</span>
                          {logro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {proyecto.imagenes && proyecto.imagenes.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-[#1a4792] mb-4">Galería del proyecto</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {proyecto.imagenes.map((src, i) => (
                        <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
                          <Image
                            src={src}
                            alt={`${proyecto.titulo} - imagen ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-[#f5f5f5] rounded-xl p-6">
                  <h3 className="font-bold text-[#1a1a1a] mb-4">Información del proyecto</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Valor</dt>
                      <dd className="font-bold text-[#1a4792] text-lg">
                        {formatCurrency(proyecto.valor)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Contrato</dt>
                      <dd className="font-medium">{proyecto.contrato}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Municipio</dt>
                      <dd className="font-medium">{proyecto.municipio}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Año</dt>
                      <dd className="font-medium">{proyecto.fecha}</dd>
                    </div>
                  </dl>
                </div>

                <Link
                  href="/proyectos"
                  className="block text-center bg-[#1a4792] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#153a75] transition-colors"
                >
                  ← Volver a proyectos
                </Link>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
