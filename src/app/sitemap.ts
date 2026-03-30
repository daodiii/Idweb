import type { MetadataRoute } from "next";
import { getAllSlugs, getBlogPost } from "@/lib/content/blog";

const BASE_URL = "https://www.idweb.no";

// Launch date — update when pages are meaningfully changed
const LAUNCH_DATE = "2026-03-26";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tjenester`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tjenester/nettside`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tjenester/seo`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/tjenester/vedlikehold`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/priser`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/referanser`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/om-oss`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blogg`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/personvern`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/vilkar`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => {
    const post = getBlogPost(slug);
    return {
      url: `${BASE_URL}/blogg/${slug}`,
      lastModified: post?.publishedDate ?? LAUNCH_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  return [...staticPages, ...blogPages];
}
