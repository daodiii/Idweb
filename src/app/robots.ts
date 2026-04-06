import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/", "/*opengraph-image*", "/favicon.ico", "/site.webmanifest"],
      },
    ],
    sitemap: "https://www.idweb.no/sitemap.xml",
  };
}
