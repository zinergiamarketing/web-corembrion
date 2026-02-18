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
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
