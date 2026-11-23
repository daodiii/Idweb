/** Unsplash photo per article, keyed by slug. Shared by the blog index, article pages and related-post cards. */
const COVER_PHOTOS: Record<string, string> = {
  "webdesigntrender-2026": "photo-1545235617-9465d2a55698",
  konverteringsoptimalisering: "photo-1551288049-bebda4e38f71",
  "velge-riktig-webdesignbyra": "photo-1600880292203-757bb62b4baf",
  "wordpress-vs-skreddersydd": "photo-1555949963-ff9fe0c870eb",
  "google-analytics-guide": "photo-1551288049-bebda4e38f71",
  "seo-for-nybegynnere": "photo-1562577309-2592ab84b1bc",
  mobiloptimalisering: "photo-1512941937669-90a1b58e7e9c",
  "tegn-paa-ny-nettside": "photo-1454165804606-c3d57bc86b40",
  "vanlige-feil-med-nettsiden": "photo-1504639725590-34d0984388bd",
  "sosiale-medier-for-bedrifter": "photo-1611162617474-5b21e879e113",
  "hva-koster-en-nettside": "photo-1554224155-6726b3ff858f",
  "nettbutikk-guide": "photo-1472851294608-062f824d29cc",
  "webp-eller-ikke-webp": "photo-1516035069371-29a1b244cc32",
  "php-nettside-2026": "photo-1498050108023-c5249f4df085",
  "ai-sok-synlighet": "photo-1677442136019-21780ecad995",
};

const FALLBACK_PHOTO = "photo-1499750310107-5fef28a66643";

export function coverFor(slug: string, width: 800 | 1600 = 800): string {
  return `https://images.unsplash.com/${COVER_PHOTOS[slug] ?? FALLBACK_PHOTO}?w=${width}&q=80`;
}
