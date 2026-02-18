import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/areas-trabajo", label: "Áreas de Trabajo" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image
                src="/logos/logo.png"
                alt="Logo Corembrion"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-xl uppercase tracking-wide">COREMBRION</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Corporación para el Desarrollo Integral. Transformando comunidades en la región del San Jorge.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <address className="text-gray-300 text-sm not-italic space-y-2">
              <p>Calle 11 No 6-87, Ayapel - Córdoba</p>
              <p>
                <a href="mailto:info@corembrion.com" className="hover:text-white transition-colors">
                  info@corembrion.com
                </a>
              </p>
              <p>
                <a href="tel:+573002824880" className="hover:text-white transition-colors">
                  +57 300 282 4880
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© 2026 COREMBRION - Corporación para el Desarrollo Integral. NIT: 830504939-5</p>
        </div>
      </div>
    </footer>
  );
}
