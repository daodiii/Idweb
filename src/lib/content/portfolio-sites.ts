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
      collageBackground: "/images/portfolio/Brobekk-background.webp",
      collage: [
        { src: "/images/portfolio/brobekk-collage-4.webp", alt: "Brobekk Legekontor — tablet visning", position: "center", aspectRatio: "tablet" },
        { src: "/images/portfolio/brobekk-collage-2.webp", alt: "Brobekk Legekontor — mobil visning", position: "top-left", aspectRatio: "mobile" },
        { src: "/images/portfolio/brobekk-collage-3.webp", alt: "Brobekk Legekontor — tablet visning alternativ", position: "top-right", aspectRatio: "tablet" },
        { src: "/images/portfolio/brobekk-collage-1.webp", alt: "Brobekk Legekontor — tablet oversikt", position: "bottom-left", aspectRatio: "tablet" },
        { src: "/images/portfolio/brobekk-collage-5.webp", alt: "Brobekk Legekontor — desktop visning", position: "bottom-right", aspectRatio: "landscape" },
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
      full: "/images/portfolio/centerrahma-full.webp",
      showcase: [
        "/images/portfolio/centerrahma-s1.webp",
        "/images/portfolio/centerrahma-s2.webp",
        "/images/portfolio/centerrahma-s3.webp",
      ],
      collageBackground: "/images/portfolio/Centerrahma-background.webp",
      collage: [
        { src: "/images/portfolio/centerrahma-collage-4.webp", alt: "Center Rahma — Hjem dark mobile", position: "center", aspectRatio: "mobile" },
        { src: "/images/portfolio/centerrahma-collage-2.webp", alt: "Center Rahma — Ny Moské light mode fullside", position: "top-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-3.webp", alt: "Center Rahma — Hjem light desktop", position: "top-right", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-1.webp", alt: "Center Rahma — Ny Moské dark mode fullside", position: "bottom-left", aspectRatio: "desktop" },
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
      collageBackground: "/images/portfolio/vocura-background.webp",
      collage: [
        { src: "/images/portfolio/vocura-collage-4.webp", alt: "Vocura — mobil visning", position: "center", aspectRatio: "mobile" },
        { src: "/images/portfolio/vocura-collage-2.webp", alt: "Vocura — desktop fullside", position: "top-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/vocura-collage-6.webp", alt: "Vocura — desktop visning", position: "top-right", aspectRatio: "desktop" },
        { src: "/images/portfolio/vocura-collage-1.webp", alt: "Vocura — desktop alternativ", position: "bottom-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/vocura-collage-5.webp", alt: "Vocura — desktop bred visning", position: "bottom-right", aspectRatio: "desktop" },
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
      full: "/images/portfolio/iqra-full.webp",
      showcase: [
        "/images/portfolio/iqra-s1.webp",
        "/images/portfolio/iqra-s2.webp",
        "/images/portfolio/iqra-s3.webp",
      ],
      collageBackground: "/images/portfolio/Iqra-background.webp",
      collage: [
        { src: "/images/portfolio/iqra-collage-4.webp", alt: "Iqra Senter — desktop fullside", position: "center", aspectRatio: "wide" },
        { src: "/images/portfolio/iqra-collage-2.webp", alt: "Iqra Senter — tablet visning", position: "top-left", aspectRatio: "square-portrait" },
        { src: "/images/portfolio/iqra-collage-3.webp", alt: "Iqra Senter — tablet visning alternativ", position: "top-right", aspectRatio: "square-portrait" },
        { src: "/images/portfolio/iqra-collage-1.webp", alt: "Iqra Senter — desktop bred visning", position: "bottom-left", aspectRatio: "wide" },
        { src: "/images/portfolio/iqra-collage-5.webp", alt: "Iqra Senter — tablet oversikt", position: "bottom-right", aspectRatio: "square-portrait" },
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
      full: "/images/portfolio/ringebu-full.webp",
      showcase: [
        "/images/portfolio/ringebu-s1.webp",
        "/images/portfolio/ringebu-s2.webp",
        "/images/portfolio/ringebu-s3.webp",
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
