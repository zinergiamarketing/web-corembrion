import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Corembrion - Corporación para el Desarrollo Integral",
    short_name: "Corembrion",
    description: "Transformando comunidades en la región del San Jorge",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a4792",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
