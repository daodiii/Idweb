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
      full: "/images/portfolio/brobekk-full.webp",
      showcase: [
        "/images/portfolio/brobekk-s1.webp",
        "/images/portfolio/brobekk-s2.webp",
        "/images/portfolio/brobekk-s3.webp",
      ],
      heroImage: "/images/portfolio/brobekk-portefolje.webp",
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
      full: "/images/portfolio/centerrahma-full.webp",
      showcase: [
        "/images/portfolio/centerrahma-s1.webp",
        "/images/portfolio/centerrahma-s2.webp",
        "/images/portfolio/centerrahma-s3.webp",
      ],
      collageBackground: "/images/portfolio/Centerrahma-background.webp",
      collage: [
        { src: "/images/portfolio/centerrahma-collage-1.webp", alt: "Center Rahma — Ny Moské dark mode fullside", position: "center", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-2.webp", alt: "Center Rahma — Ny Moské light mode fullside", position: "top-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-3.webp", alt: "Center Rahma — Hjem light desktop", position: "top-right", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-4.webp", alt: "Center Rahma — Hjem dark mobile", position: "bottom-left", aspectRatio: "mobile" },
        { src: "/images/portfolio/centerrahma-collage-5.webp", alt: "Center Rahma — Hjem dark desktop", position: "bottom-right", aspectRatio: "desktop" },
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
      full: "/images/portfolio/vocura-full.webp",
      showcase: [
        "/images/portfolio/vocura-s1.webp",
        "/images/portfolio/vocura-s2.webp",
        "/images/portfolio/vocura-s3.webp",
      ],
      heroImage: "/images/portfolio/vocura-portefolje.webp",
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
      full: "/images/portfolio/iqra-full.webp",
      showcase: [
        "/images/portfolio/iqra-s1.webp",
        "/images/portfolio/iqra-s2.webp",
        "/images/portfolio/iqra-s3.webp",
      ],
      heroImage: "/images/portfolio/iqra-portefolje.webp",
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
