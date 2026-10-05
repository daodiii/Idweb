import type { MetadataRoute } from "next";

const BASE_URL = "https://www.idweb.no";

// Build time — refreshes on every deploy so Google sees fresh `lastmod`.
const BUILD_DATE = new Date().toISOString().split("T")[0];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tjenester`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/nettside`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/seo`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/vedlikehold`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/nettbutikk`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE_URL}/referanser`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/om-oss`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kontakt`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/personvern`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/vilkar`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];
}
