import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Link preview images (/og/*), the favicon and the manifest stay crawlable: LinkedIn, X and Google's favicon
        // fetcher obey robots.txt. next.config.ts keeps them out of search with an X-Robots-Tag header instead.
        disallow: ["/api/", "/studio"],
      },
    ],
    sitemap: "https://www.idweb.no/sitemap.xml",
  };
}
