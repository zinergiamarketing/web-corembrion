import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contacto | Corembrion",
  description:
    "Contacta a Corembrion - Calle 11 No 6-87, Ayapel, Córdoba. Email: corembrion@hotmail.com | Tel: +57 300 282 4880",
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-[#1a4792] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold font-heading">Contacto</h1>
            <p className="text-xl text-white/90 mt-4">
              Estamos aquí para responder tus preguntas
            </p>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
