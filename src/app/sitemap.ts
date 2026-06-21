import type { MetadataRoute } from "next";
import { getAllSlugs, getBlogPost } from "@/lib/content/blog";
import { getAllIndustrySlugs } from "@/lib/content/industries";
import { getAllLocationSlugs } from "@/lib/content/locations";

const BASE_URL = "https://www.idweb.no";

// Build time — refreshes on every deploy so Google sees fresh `lastmod`.
const BUILD_DATE = new Date().toISOString().split("T")[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tjenester`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/nettside`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/webutvikler`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/nettside`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/seo`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/vedlikehold`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tjenester/webutvikler-oslo`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE_URL}/tjenester/nettbutikk`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE_URL}/priser`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/referanser`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/om-oss`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kontakt`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blogg`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/personvern`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/vilkar`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  const industryPages: MetadataRoute.Sitemap = getAllIndustrySlugs().map((slug) => ({
    url: `${BASE_URL}/nettside/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const locationPages: MetadataRoute.Sitemap = getAllLocationSlugs().map((slug) => ({
    url: `${BASE_URL}/webutvikler/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const post = getBlogPost(slug);
    return {
      url: `${BASE_URL}/blogg/${slug}`,
      lastModified: post?.publishedDate ?? BUILD_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  return [...staticPages, ...industryPages, ...locationPages, ...blogPages];
}
