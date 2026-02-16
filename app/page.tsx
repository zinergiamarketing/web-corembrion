import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { WorkAreas } from "@/components/sections/WorkAreas";
import { Projects } from "@/components/sections/Projects";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Saltar al contenido principal
      </a>
      <Header />
      <main id="main" className="overflow-x-hidden">
        <Hero />
        <AboutUs />
        <WorkAreas />
        <Projects />
        <Stats />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
