// NOTE: This file holds real site metadata for hero device frames.
// Separate from src/lib/content/portfolio.ts which has case study content.

import type { PortfolioSite, PortfolioSiteId, RotationSet } from "@/types";

export const PORTFOLIO_SITES: PortfolioSite[] = [
  {
    id: "brobekk",
    name: "Brobekk Legekontor",
    domain: "brobekklegekontor.no",
    images: {
      desktop: "/images/portfolio/brobekk-desktop.webp",
      tablet: "/images/portfolio/brobekk-tablet.webp",
      mobile: "/images/portfolio/brobekk-mobile.webp",
    },
  },
  {
    id: "centerrahma",
    name: "Center Rahma",
    domain: "centerrahma.no",
    images: {
      desktop: "/images/portfolio/centerrahma-desktop.webp",
      tablet: "/images/portfolio/centerrahma-tablet.webp",
      mobile: "/images/portfolio/centerrahma-mobile.webp",
    },
  },
  {
    id: "vocura",
    name: "Vocura",
    domain: "vocura-7orm.vercel.app",
    images: {
      desktop: "/images/portfolio/vocura-desktop.webp",
      tablet: "/images/portfolio/vocura-tablet.webp",
      mobile: "/images/portfolio/vocura-mobile.webp",
    },
  },
  {
    id: "herbs",
    name: "Herbs Oslo",
    domain: "herbsoslo.vercel.app",
    images: {
      desktop: "/images/portfolio/herbs-desktop.webp",
      tablet: "/images/portfolio/herbs-tablet.webp",
      mobile: "/images/portfolio/herbs-mobile.webp",
    },
  },
  {
    id: "iqra",
    name: "Iqra Senter",
    domain: "iqra-senter.vercel.app",
    images: {
      desktop: "/images/portfolio/iqra-desktop.webp",
      tablet: "/images/portfolio/iqra-tablet.webp",
      mobile: "/images/portfolio/iqra-mobile.webp",
    },
  },
  {
    id: "ringebu",
    name: "Ringebu",
    domain: "ringebu.vercel.app",
    images: {
      desktop: "/images/portfolio/ringebu-desktop.webp",
      tablet: "/images/portfolio/ringebu-tablet.webp",
      mobile: "/images/portfolio/ringebu-mobile.webp",
    },
  },
];

/** Helper: look up a site by ID */
export function getSiteById(id: PortfolioSiteId): PortfolioSite | undefined {
  return PORTFOLIO_SITES.find((s) => s.id === id);
}

/**
 * Three curated rotation sets — each set shows a different combination
 * of sites across laptop/tablet/phone to maximize visual variety.
 *
 * Set 1 (High Contrast): dark medical + photo-heavy + moody e-commerce
 * Set 2 (Clean Professional): white SaaS + dark medical + light community
 * Set 3 (Bold Variety): moody e-commerce + minimal dental + photo-heavy
 */
export const ROTATION_SETS: RotationSet[] = [
  { laptop: "brobekk", tablet: "iqra", phone: "herbs" },
  { laptop: "vocura", tablet: "brobekk", phone: "centerrahma" },
  { laptop: "herbs", tablet: "ringebu", phone: "iqra" },
];
