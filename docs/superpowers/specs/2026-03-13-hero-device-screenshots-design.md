# Hero Section — Real Portfolio Screenshots in Device Frames

**Date:** 2026-03-13
**Status:** Approved
**Scope:** Replace abstract device mockups with real full-page screenshots of portfolio sites

---

## Goal

Replace the abstract/stylized LaptopMockup, TabletMockup, and PhoneMockup components in the hero section with actual full-page screenshots of 6 portfolio websites. The screenshots rotate through 3 curated sets every ~6 seconds, and each screenshot uses a "scaled + gentle scroll" animation inside its device frame.

## Portfolio Sites

| # | Site | Domain | Character |
|---|------|--------|-----------|
| 1 | Center Rahma | centerrahma.no | Mosque/community, light theme, prayer time cards |
| 2 | Brobekk Legekontor | brobekklegekontor.no | Medical practice, dark navy + gold serif |
| 3 | Vocura | vocura-7orm.vercel.app | Health SaaS, clean white + purple accent |
| 4 | Herbs Oslo | herbsoslo.vercel.app | E-commerce, dark moody + gold botanical |
| 5 | Iqra Senter | iqra-senter.vercel.app | Community center, full-bleed photo hero |
| 6 | Ringebu | ringebu.vercel.app | Dental clinic, minimal cream + green accents |

## Screenshot Assets

Full-page screenshots already captured at 3 responsive viewports:
- **Desktop**: 1440px viewport → for laptop frame
- **Tablet**: 768px viewport → for tablet frame
- **Mobile**: 375px viewport → for phone frame

Source: `.firecrawl/responsive/{site}-{viewport}-full.png` (18 files total)

Production assets will be optimized WebP images stored in `public/images/portfolio/`.

## Rotation Sets

Three curated sets that mix light/dark themes, industries, and visual styles:

| Set | Laptop (desktop) | Tablet (tablet) | Phone (mobile) |
|-----|-------------------|-----------------|----------------|
| 1 | Brobekk Legekontor | Iqra Senter | Herbs Oslo |
| 2 | Vocura | Brobekk Legekontor | Center Rahma |
| 3 | Herbs Oslo | Ringebu | Iqra Senter |

**Rotation timing**: 6-second interval per set. Crossfade transition between sets (~0.6s opacity fade).

## Display Approach: Scaled + Gentle Scroll

Each full-page screenshot is rendered at full width inside its device frame. Since the page is taller than the frame, a JS-driven scroll animation tours through the content:

1. **Hold at top** (0–25% of cycle) — hero/fold is clearly visible
2. **Scroll down** (25–60%) — eased scroll reveals the full page
3. **Hold at bottom** (60–80%) — footer/bottom content visible
4. **Scroll back up** (80–100%) — smooth return to top

**Cycle duration**: 12 seconds per image. Uses `requestAnimationFrame` with easeInOutQuad for smooth motion. Scroll distance is calculated dynamically based on actual image dimensions vs container height.

## Component Architecture

### Files to modify
- `src/components/sections/hero-section.tsx` — main changes

### Files to create
- `src/components/ui/device-frame.tsx` — reusable device frame components (LaptopFrame, TabletFrame, PhoneFrame)
- `src/hooks/use-scroll-animation.ts` — custom hook for the gentle scroll effect
- `src/lib/content/portfolio-sites.ts` — site metadata and rotation set definitions

### Asset pipeline
- Convert 18 source PNGs (named `{site}-{viewport}-full.png`) to optimized WebP (quality 80)
- Rename to `{site}-{viewport}.webp` (drop `-full` suffix) and store in `public/images/portfolio/`
- Use Next.js `<Image>` component with proper width/height/alt

### Data shape

```typescript
// src/lib/content/portfolio-sites.ts
// NOTE: This file holds real site metadata for hero device frames.
// Separate from src/lib/content/portfolio.ts which has case study content.

type DeviceViewport = "desktop" | "tablet" | "mobile";

type PortfolioSiteId =
  | "brobekk"
  | "centerrahma"
  | "vocura"
  | "herbs"
  | "iqra"
  | "ringebu";

interface PortfolioSite {
  id: PortfolioSiteId;
  name: string;
  domain: string;
  images: Record<DeviceViewport, string>; // paths to WebP files
}

interface RotationSet {
  laptop: PortfolioSiteId;
  tablet: PortfolioSiteId;
  phone: PortfolioSiteId;
}

const PORTFOLIO_SITES: PortfolioSite[];
const ROTATION_SETS: RotationSet[];
```

### DeviceFrame components

Each frame component accepts:
- `imageSrc: string` — path to the screenshot
- `imageAlt: string` — accessibility text
- `className?: string` — for positioning

Frame styling matches current mockups (dark bezels, browser chrome dots, camera dot, notch) but replaces abstract colored shapes with an `<Image>` inside an overflow-hidden container.

Perspective transforms preserved from current code:
- Laptop: `rotateY(18deg)` with `perspective(1200px)`
- Tablet: `rotateY(-12deg)`
- Phone: `rotateY(-15deg)`

### Scroll animation hook

```typescript
// src/hooks/use-scroll-animation.ts

function useScrollAnimation(
  imageRef: RefObject<HTMLImageElement>,
  containerRef: RefObject<HTMLDivElement>,
  options?: { cycleDuration?: number }
): void;
```

Uses `requestAnimationFrame` loop. Calculates scroll distance from `image.naturalHeight * scale - container.offsetHeight`. Pauses when not in viewport (IntersectionObserver).

### Rotation logic

- `useState` tracks the active set index (0, 1, 2)
- `useEffect` with `setInterval(6000)` cycles through sets
- Crossfade via motion/react `AnimatePresence` with opacity transition (~0.6s)
- On set change: scroll animation resets to top, stays paused during the fade-in, then starts scrolling once the new set is fully visible
- Next set's images preloaded via hidden `<Image>` components during current set display

### Layout (unchanged)

The hero layout stays the same:
- Laptop on the left (hidden below `lg`)
- Center text content (headline, rotating words, CTAs)
- Tablet + Phone on the right (hidden below `lg`)
- Trust signals bar at bottom

## Responsive behavior

- `lg+` (1024px+): All three devices visible with scroll animation
- Below `lg`: Devices hidden entirely (same as current behavior)

## Performance considerations

- WebP images with explicit width/height to prevent CLS
- `loading="eager"` for the first set (above the fold), `loading="lazy"` for sets 2 and 3
- `requestAnimationFrame` animation paused when out of viewport
- Images preloaded for the next set during the current set's display
- Total asset budget: ~600KB for 18 WebP images (avg ~33KB each after optimization)

## Accessibility

- Device frames have `aria-hidden="true"` and `role="presentation"` (matches current)
- Each image gets descriptive `alt` text: e.g. "Brobekk Legekontor website — desktop view"
- `prefers-reduced-motion`: disable scroll animation, show static top-of-page view

## Testing

- Visual regression: verify devices render at correct sizes
- Animation: verify scroll resets on set change, pauses off-screen
- Responsive: verify devices hidden below lg breakpoint
- Performance: verify no layout shift, images load without blocking
