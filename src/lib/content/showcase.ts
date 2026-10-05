/**
 * Projects cycled through the homepage showcase, in display order.
 *
 * `desktopHeight` / `mobileHeight` are the full-page screenshots' heights at
 * 1440 and 375 CSS px wide. The showcase scrolls each one inside a
 * fixed-ratio frame and needs the height to know how far to go. Update them
 * if a screenshot is replaced.
 *
 * `desktopStop` / `mobileStop` (same units) are where the frame's bottom edge
 * stops. They keep the scroll calm (a few screens, not the whole page) and
 * stop it short of the blank stretches some older screenshots have, where
 * scroll-triggered content was never captured.
 */
export interface ShowcaseSite {
  id: string;
  name: string;
  category: string;
  /** Shown in the browser frame's address bar. */
  address: string;
  desktop: string;
  desktopHeight: number;
  desktopStop?: number;
  mobile: string;
  mobileHeight: number;
  mobileStop?: number;
}

export const SHOWCASE_SITES: ShowcaseSite[] = [
  {
    id: "brobekk",
    name: "Brobekk Legekontor",
    category: "Legekontor",
    address: "brobekklegekontor.no",
    desktop: "/images/showcase/brobekk-desktop.webp",
    desktopHeight: 5935,
    desktopStop: 2900,
    mobile: "/images/showcase/brobekk-mobile.webp",
    mobileHeight: 6249,
    mobileStop: 2800,
  },
  {
    id: "vocura",
    name: "Vocura",
    category: "Helseklinikk",
    address: "Vocura",
    desktop: "/images/portfolio/vocura-desktop.webp",
    desktopHeight: 5590,
    desktopStop: 1780,
    mobile: "/images/portfolio/vocura-mobile.webp",
    mobileHeight: 6744,
    mobileStop: 880,
  },
  {
    id: "centerrahma",
    name: "Center Rahma",
    category: "Trossamfunn",
    address: "centerrahma.no",
    desktop: "/images/portfolio/centerrahma-desktop.webp",
    desktopHeight: 3110,
    desktopStop: 1990,
    mobile: "/images/portfolio/centerrahma-mobile.webp",
    mobileHeight: 3090,
    mobileStop: 1560,
  },
  {
    id: "ringebu",
    name: "Ringebu Tannlegesenter",
    category: "Tannlegesenter",
    address: "ringebutannlegesenter.no",
    desktop: "/images/portfolio/ringebu-desktop.webp",
    desktopHeight: 1008,
    mobile: "/images/portfolio/ringebu-mobile.webp",
    mobileHeight: 1004,
  },
  {
    id: "iqra",
    name: "Iqra Senter",
    category: "Kultursenter",
    address: "Iqra Senter",
    desktop: "/images/portfolio/iqra-desktop.webp",
    desktopHeight: 900,
    mobile: "/images/portfolio/iqra-mobile.webp",
    mobileHeight: 3248,
    mobileStop: 812,
  },
];

/** How long each project stays on screen, in milliseconds. */
export const SHOWCASE_SLIDE_MS = 7000;
