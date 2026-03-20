/**
 * JSON-LD structured data for SEO.
 * Uses Next.js Script component for safe injection.
 * All data is hardcoded (no user input).
 */
import Script from "next/script";

const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "IDweb",
  description:
    "Vi lager skreddersydde, mobiloptimaliserte nettsider for norske bedrifter. SEO, design og vedlikehold.",
  url: "https://idweb.no",
  telephone: "+4798406164",
  email: "hei@idweb.no",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NO",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  sameAs: [],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "47",
    bestRating: "5",
    worstRating: "1",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Webtjenester",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Skreddersydd nettside",
          description:
            "Profesjonell, mobiloptimalisert nettside designet for å tiltrekke kunder.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO-optimalisering",
          description:
            "Søkemotoroptimalisering som gir bedriften din synlighet i Google.",
        },
      },
    ],
  },
};

export function JsonLd() {
  return (
    <Script
      id="business-json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(BUSINESS_SCHEMA)}
    </Script>
  );
}
