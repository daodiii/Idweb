import type { Metadata } from "next";
import { ogKey, ogPages } from "@/lib/og-pages";

interface PageMetadataInput {
  /** The page's own title; the layout adds « | IDweb» to the <title>. */
  title: string;
  description: string;
  /** Canonical path, e.g. "/om-oss". Also names the page's link preview image. */
  path: string;
  type?: "website" | "article";
  /** Article fields for blog posts. */
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Metadata every indexable page needs, so a shared link always shows the page's own title, address and preview
 * image instead of the homepage's: canonical, Open Graph and Twitter card. Fails the build if the page has no
 * entry in ogPages.
 */
export function pageMetadata({ title, description, path, type = "website", publishedTime, modifiedTime }: PageMetadataInput): Metadata {
  const key = ogKey(path);
  const card = ogPages()[key];
  if (!card) throw new Error(`No link preview for ${path}: add "${key}" to ogPages in lib/og-pages.ts`);
  const image = { url: `/og/${key}.png`, width: 1200, height: 630, alt: card.title };

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "nb_NO",
      siteName: "IDweb",
      url: path,
      title,
      description,
      images: [image],
      ...(type === "article" && { publishedTime, modifiedTime, authors: ["IDweb"] }),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}
