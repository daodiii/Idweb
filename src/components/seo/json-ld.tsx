/**
 * JSON-LD structured data for SEO.
 * Uses inline <script> tags for immediate availability to crawlers.
 * All data is hardcoded (no user input) — safe to render server-side.
 */

const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://idweb.no/#business",
  name: "IDweb",
  legalName: "IDweb v/ Daod Ilyas",
  description:
    "Vi lager skreddersydde, mobiloptimaliserte nettsider for norske bedrifter. SEO, design og vedlikehold.",
  url: "https://idweb.no",
  telephone: "+4798406164",
  email: "hei@idweb.no",
  logo: "https://idweb.no/images/idweb-logo.png",
  image: "https://idweb.no/images/idweb-logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oslo",
    addressRegion: "Oslo",
    postalCode: "0001",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 59.9139,
    longitude: 10.7522,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Norway",
    },
    {
      "@type": "City",
      name: "Oslo",
    },
  ],
  priceRange: "$$",
  currenciesAccepted: "NOK",
  paymentAccepted: "Faktura, Bankoverføring",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  sameAs: [],
  knowsLanguage: ["nb", "en"],
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
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://idweb.no/blogg?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// SAFETY NOTE: dangerouslySetInnerHTML is used here intentionally.
// All data is hardcoded constants — no user input is ever injected.
// This is the recommended pattern for JSON-LD in Next.js to ensure
// crawlers see structured data on initial HTML parse (not deferred).

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([BUSINESS_SCHEMA, WEBSITE_SCHEMA]),
      }}
    />
  );
}

export function FaqJsonLd({
  faqs,
}: {
  faqs: readonly { readonly question: string; readonly answer: string }[];
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
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
      "@type": "Organization",
      name: "IDweb",
      url: "https://idweb.no",
      logo: "https://idweb.no/images/idweb-logo.png",
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
