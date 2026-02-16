import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { AboutUs } from "@/components/sections/AboutUs";

export const metadata: Metadata = {
  title: "Nosotros | Corembrion",
  description:
    "Conoce la misión, visión y objeto social de Corembrion - Corporación para el Desarrollo Integral en la región del San Jorge.",
};

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="py-16 bg-[#1a4792] text-white">
          <Container>
            <h1 className="text-4xl font-bold font-heading">Nosotros</h1>
            <p className="text-xl text-white/90 mt-4">
              Corporación para el Desarrollo Integral
            </p>
          </Container>
        </section>
        <AboutUs />
      </main>
      <Footer />
    </>
  );
}
