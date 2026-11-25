/**
 * JSON-LD structured data for SEO.
 * Uses inline <script> tags for immediate availability to crawlers.
 * All data is hardcoded (no user input) — safe to render server-side.
 */

const SITE = "https://www.idweb.no";

const LOGO = {
  "@type": "ImageObject",
  "@id": `${SITE}/#logo`,
  url: `${SITE}/images/idweb-logo.png`,
  width: 512,
  height: 512,
};

// One entry per service page. Each page's ServiceJsonLd emits a Service with the same @id, so the catalog below and
// the pages describe one set of entities instead of two unlinked lists.
const SERVICES = [
  { name: "Skreddersydd nettside", path: "/tjenester/nettside" },
  { name: "Timebestilling på nettsiden", path: "/tjenester/timebestilling" },
  { name: "Nettbutikk", path: "/tjenester/nettbutikk" },
  { name: "AI-chatbot", path: "/tjenester/ai-chatbot" },
  { name: "SEO og AI-synlighet", path: "/tjenester/seo" },
  { name: "Drift og vedlikehold", path: "/tjenester/vedlikehold" },
  { name: "Kundeportal", path: "/tjenester/kundeportal" },
  { name: "Webbyrå i Oslo", path: "/webbyra-oslo" },
] as const;

const BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.idweb.no/#business",
  name: "IDweb",
  // The Brønnøysund-registered name of org.nr 837228972. "IDweb" is the trading name; alternateName adds the
  // qualifier that separates it from other "IDweb"s (Den norske kirke's login system, foreign agencies).
  legalName: "Ilyas Solutions",
  alternateName: "IDweb webbyrå",
  founder: {
    "@type": "Person",
    "@id": `${SITE}/#founder`,
    name: "Daod Ilyas",
    worksFor: { "@id": `${SITE}/#business` },
  },
  description:
    "Vi lager skreddersydde, mobiloptimaliserte nettsider for norske bedrifter. SEO, design og vedlikehold.",
  url: "https://www.idweb.no",
  telephone: "+4798406164",
  email: "hei@idweb.no",
  taxID: "837228972",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Organisasjonsnummer",
    value: "837228972",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+4798406164",
    email: "hei@idweb.no",
    areaServed: "NO",
    availableLanguage: ["nb", "en"],
  },
  logo: LOGO,
  image: { "@id": `${SITE}/#logo` },
  // Service-area business — no physical office. We assert the locality we
  // operate from (Oslo) and the areas we serve, but no street address, postal
  // code or map coordinates that would imply a visitable location.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Oslo",
    addressRegion: "Oslo",
    addressCountry: "NO",
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
  sameAs: [
    // Google Business Profile, by its Knowledge Graph id. The share.google short link it replaces was a redirect, not
    // a stable profile URL.
    "https://www.google.com/search?kgmid=/g/11n9y9c5rc",
  ],
  knowsLanguage: ["nb", "en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Webtjenester",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE}${s.path}#service`,
        name: s.name,
        url: `${SITE}${s.path}`,
      },
    })),
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.idweb.no/#website",
  name: "IDweb",
  url: "https://www.idweb.no",
  description:
    "Skreddersydde nettsider, SEO og vedlikehold for norske bedrifter.",
  publisher: {
    "@id": "https://www.idweb.no/#business",
  },
  inLanguage: "nb-NO",
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
    url: `https://www.idweb.no/blogg/${slug}`,
    // The same 1200x630 card the page's og:image uses (src/app/og/[image]/route.tsx).
    image: {
      "@type": "ImageObject",
      url: `https://www.idweb.no/og/blogg-${slug}.png`,
      width: 1200,
      height: 630,
    },
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      "@id": "https://www.idweb.no/#business",
    },
    publisher: {
      "@id": "https://www.idweb.no/#business",
    },
    articleSection: category,
    inLanguage: "nb-NO",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.idweb.no/blogg/${slug}`,
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
      item: `https://www.idweb.no${item.href}`,
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
  basePath = "tjenester",
  areaServed = { "@type": "Country", name: "Norway" },
}: {
  name: string;
  description: string;
  slug: string;
  /** Empty string for a top-level page such as /webbyra-oslo. */
  basePath?: string;
  areaServed?: { "@type": "Country" | "City"; name: string };
}) {
  const url = `https://www.idweb.no/${[basePath, slug].filter(Boolean).join("/")}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    url,
    provider: {
      "@id": "https://www.idweb.no/#business",
    },
    areaServed,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
