/**
 * JSON-LD structured data for SEO.
 * Uses Next.js Script component for safe injection.
 * All data is hardcoded (no user input).
 */
import Script from "next/script";

const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://idweb.no/#business",
  name: "IDweb",
  description:
    "Vi lager skreddersydde, mobiloptimaliserte nettsider for norske bedrifter. SEO, design og vedlikehold.",
  url: "https://idweb.no",
  telephone: "+4798406164",
  email: "hei@idweb.no",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oslo",
    addressRegion: "Oslo",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.9139,
    longitude: 10.7522,
  },
  areaServed: {
    "@type": "Country",
    name: "Norway",
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
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Drift og vedlikehold",
          description:
            "Løpende vedlikehold, sikkerhetskopier og oppdateringer for nettsiden din.",
        },
      },
    ],
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://idweb.no/#website",
  name: "IDweb",
  url: "https://idweb.no",
  description:
    "Skreddersydde nettsider, SEO og vedlikehold for norske bedrifter.",
  publisher: {
    "@id": "https://idweb.no/#business",
  },
  inLanguage: "nb-NO",
};

export function JsonLd() {
  return (
    <Script
      id="business-json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify([BUSINESS_SCHEMA, WEBSITE_SCHEMA])}
    </Script>
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script id="faq-json-ld" type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}

export function BlogPostJsonLd({
  title,
  description,
  slug,
  publishedDate,
  category,
}: {
  title: string;
  description: string;
  slug: string;
  publishedDate: string;
  category: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: `https://idweb.no/blogg/${slug}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@type": "Person",
      name: "IDweb",
      url: "https://idweb.no/om-oss",
    },
    publisher: {
      "@id": "https://idweb.no/#business",
    },
    articleSection: category,
    inLanguage: "nb-NO",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://idweb.no/blogg/${slug}`,
    },
  };

  return (
    <Script
      id={`blog-json-ld-${slug}`}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schema)}
    </Script>
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://idweb.no${item.href}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schema)}
    </Script>
  );
}

export function ServiceJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://idweb.no/tjenester/${slug}`,
    provider: {
      "@id": "https://idweb.no/#business",
    },
    areaServed: {
      "@type": "Country",
      name: "Norway",
    },
  };

  return (
    <Script
      id={`service-json-ld-${slug}`}
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {JSON.stringify(schema)}
    </Script>
  );
}
