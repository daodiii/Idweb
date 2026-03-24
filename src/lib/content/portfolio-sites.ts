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
      collageBackground: "/images/portfolio/Brobekk-background.png",
      collage: [
        { src: "/images/portfolio/brobekk-collage-4.png", alt: "Brobekk Legekontor — mobil visning", position: "center", aspectRatio: "mobile" },
        { src: "/images/portfolio/brobekk-collage-2.png", alt: "Brobekk Legekontor — mobil smal visning", position: "top-left", aspectRatio: "mobile" },
        { src: "/images/portfolio/brobekk-collage-3.png", alt: "Brobekk Legekontor — tablet visning", position: "top-right", aspectRatio: "mobile" },
        { src: "/images/portfolio/brobekk-collage-1.png", alt: "Brobekk Legekontor — tablet visning alternativ", position: "bottom-left", aspectRatio: "mobile" },
        { src: "/images/portfolio/brobekk-collage-5.png", alt: "Brobekk Legekontor — desktop visning", position: "bottom-right", aspectRatio: "desktop" },
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
      collageBackground: "/images/portfolio/Centerrahma-background.png",
      collage: [
        { src: "/images/portfolio/centerrahma-collage-4.png", alt: "Center Rahma — Hjem dark mobile", position: "center", aspectRatio: "mobile" },
        { src: "/images/portfolio/centerrahma-collage-2.png", alt: "Center Rahma — Ny Moské light mode fullside", position: "top-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-3.png", alt: "Center Rahma — Hjem light desktop", position: "top-right", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-1.png", alt: "Center Rahma — Ny Moské dark mode fullside", position: "bottom-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-5.png", alt: "Center Rahma — Hjem dark desktop", position: "bottom-right", aspectRatio: "desktop" },
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
      collageBackground: "/images/portfolio/vocura-background.png",
      collage: [
        { src: "/images/portfolio/vocura-collage-4.png", alt: "Vocura — mobil visning", position: "center", aspectRatio: "mobile" },
        { src: "/images/portfolio/vocura-collage-2.png", alt: "Vocura — desktop fullside", position: "top-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/vocura-collage-6.png", alt: "Vocura — desktop visning", position: "top-right", aspectRatio: "desktop" },
        { src: "/images/portfolio/vocura-collage-1.png", alt: "Vocura — desktop alternativ", position: "bottom-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/vocura-collage-5.png", alt: "Vocura — desktop bred visning", position: "bottom-right", aspectRatio: "desktop" },
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
      collageBackground: "/images/portfolio/Iqra-background.png",
      collage: [
        { src: "/images/portfolio/iqra-collage-4.png", alt: "Iqra Senter — desktop fullside", position: "center", aspectRatio: "desktop" },
        { src: "/images/portfolio/iqra-collage-2.png", alt: "Iqra Senter — mobil visning", position: "top-left", aspectRatio: "mobile" },
        { src: "/images/portfolio/iqra-collage-3.png", alt: "Iqra Senter — mobil visning alternativ", position: "top-right", aspectRatio: "mobile" },
        { src: "/images/portfolio/iqra-collage-1.png", alt: "Iqra Senter — desktop bred visning", position: "bottom-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/iqra-collage-5.png", alt: "Iqra Senter — tablet visning", position: "bottom-right", aspectRatio: "mobile" },
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
