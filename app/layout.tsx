import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { OrganizationSchema, LocalBusinessSchema } from "@/components/StructuredData";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Corembrion | Desarrollo Integral en Córdoba",
  description:
    "Corporación para el Desarrollo Integral. Transformando comunidades en la región del San Jorge con proyectos de acuicultura, agricultura, formación y turismo sostenible.",
  keywords: [
    "desarrollo comunitario Córdoba",
    "piscicultura Ayapel",
    "proyectos agrícolas Córdoba",
    "fundación Colombia",
  ],
  authors: [{ name: "Corembrion" }],
  openGraph: {
    title: "Corembrion | Desarrollo Integral",
    description: "20 años transformando comunidades en la región del San Jorge",
    url: "https://www.corembrion.com",
    siteName: "Corembrion",
    locale: "es_CO",
    type: "website",
  },
  metadataBase: new URL("https://www.corembrion.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body className="antialiased">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
