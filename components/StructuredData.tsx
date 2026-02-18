export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Corembrion - Corporación para el Desarrollo Integral",
    url: "https://www.corembrion.com",
    logo: "https://www.corembrion.com/logo.png",
    description:
      "Corporación para el Desarrollo Integral. Transformando comunidades en la región del San Jorge con proyectos de acuicultura, agricultura, formación y turismo sostenible.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 11 No 6-87",
      addressLocality: "Ayapel",
      addressRegion: "Córdoba",
      addressCountry: "CO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+57-300-282-4880",
      email: "info@corembrion.com",
      contactType: "customer service",
      areaServed: "CO",
    },
    taxID: "830504939-5",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.corembrion.com/#organization",
    name: "Corembrion",
    image: "https://www.corembrion.com/logo.png",
    url: "https://www.corembrion.com",
    telephone: "+57-300-282-4880",
    email: "info@corembrion.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle 11 No 6-87",
      addressLocality: "Ayapel",
      addressRegion: "Córdoba",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 8.3137,
      longitude: -75.5447,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
