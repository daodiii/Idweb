// NOTE: This file holds real site metadata for hero device frames and portfolio showcase.
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
      full: "/images/portfolio/brobekk-full.png",
      showcase: [
        "/images/portfolio/brobekk-s1.png",
        "/images/portfolio/brobekk-s2.png",
        "/images/portfolio/brobekk-s3.png",
      ],
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
      full: "/images/portfolio/centerrahma-full.png",
      showcase: [
        "/images/portfolio/centerrahma-s1.png",
        "/images/portfolio/centerrahma-s2.png",
        "/images/portfolio/centerrahma-s3.png",
      ],
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
      full: "/images/portfolio/vocura-full.png",
      showcase: [
        "/images/portfolio/vocura-s1.png",
        "/images/portfolio/vocura-s2.png",
        "/images/portfolio/vocura-s3.png",
      ],
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
      full: "/images/portfolio/iqra-full.png",
      showcase: [
        "/images/portfolio/iqra-s1.png",
        "/images/portfolio/iqra-s2.png",
        "/images/portfolio/iqra-s3.png",
      ],
    },
  },
  {
    id: "ringebu",
    name: "Ringebu Tannlegeklinikk",
    domain: "ringebu.vercel.app",
    images: {
      desktop: "/images/portfolio/ringebu-desktop.webp",
      tablet: "/images/portfolio/ringebu-tablet.webp",
      mobile: "/images/portfolio/ringebu-mobile.webp",
      full: "/images/portfolio/ringebu-full.png",
      showcase: [
        "/images/portfolio/ringebu-s1.png",
        "/images/portfolio/ringebu-s2.png",
        "/images/portfolio/ringebu-s3.png",
      ],
    },
  },
];

/** Helper: look up a site by ID */
export function getSiteById(id: PortfolioSiteId) {
  return PORTFOLIO_SITES.find((site) => site.id === id) ?? null;
}

/**
 * Static hero device showcase — hand-picked sites for each device.
 * Vocura (laptop), Brobekk (tablet), Center Rahma (phone).
 */
export const ROTATION_SETS: RotationSet[] = [
  { laptop: "vocura", tablet: "brobekk", phone: "centerrahma" },
];
