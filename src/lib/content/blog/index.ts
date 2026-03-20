import type { BlogPost } from "@/types";
import { hvaKosterEnNettside } from "./hva-koster-en-nettside";
import { tegnPaaNyNettside } from "./tegn-paa-ny-nettside";
import { seoForNybegynnere } from "./seo-for-nybegynnere";
import { wordpressVsSkreddersydd } from "./wordpress-vs-skreddersydd";
import { vanligeFeilMedNettsiden } from "./vanlige-feil-med-nettsiden";
import { mobiloptimalisering } from "./mobiloptimalisering";
import { konverteringsoptimalisering } from "./konverteringsoptimalisering";
import { velgeRiktigWebdesignbyra } from "./velge-riktig-webdesignbyra";
import { nettbutikkGuide } from "./nettbutikk-guide";
import { googleAnalyticsGuide } from "./google-analytics-guide";
import { sosialeMedierForBedrifter } from "./sosiale-medier-for-bedrifter";
import { webdesigntrender2026 } from "./webdesigntrender-2026";

/** Sorted by publishedDate descending (newest first). */
export const BLOG_POSTS: BlogPost[] = [
  webdesigntrender2026,
  konverteringsoptimalisering,
  velgeRiktigWebdesignbyra,
  wordpressVsSkreddersydd,
  googleAnalyticsGuide,
  seoForNybegynnere,
  mobiloptimalisering,
  tegnPaaNyNettside,
  vanligeFeilMedNettsiden,
  sosialeMedierForBedrifter,
  hvaKosterEnNettside,
  nettbutikkGuide,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
