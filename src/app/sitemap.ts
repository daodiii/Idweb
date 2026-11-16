import type { MetadataRoute } from "next";
import { getAllSlugs, getBlogPost } from "@/lib/content/blog";
import { CASES } from "@/lib/content/kundecase";

const BASE_URL = "https://www.idweb.no";

// Only dated entries get `lastmod`. The pages below used to carry the build date, which changed on every deploy
// whether the page did or not; Google stops trusting lastmod that doesn't track real edits, the blog dates included.
// `changefreq` and `priority` are left out: Google ignores both.
const STATIC_PATHS = [
  "",
  "/tjenester",
  "/tjenester/nettside",
  "/tjenester/timebestilling",
  "/tjenester/nettbutikk",
  "/tjenester/ai-chatbot",
  "/tjenester/seo",
  "/tjenester/vedlikehold",
  "/tjenester/kundeportal",
  "/webbyra-oslo",
  "/referanser",
  ...CASES.map((c) => `/referanser/${c.slug}`),
  "/om-oss",
  "/kontakt",
  "/faq",
  "/personvern",
  "/vilkar",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((p) => p !== undefined);
  const newest = posts.map((p) => p.publishedDate).sort().at(-1);

  return [
    ...STATIC_PATHS.map((path) => ({ url: `${BASE_URL}${path}` })),
    { url: `${BASE_URL}/blogg`, ...(newest && { lastModified: newest }) },
    ...posts.map((p) => ({ url: `${BASE_URL}/blogg/${p.slug}`, lastModified: p.publishedDate })),
  ];
}
