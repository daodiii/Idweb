# Project Screenshot Collage Component

## Overview

A reusable `<ProjectCollage>` component that displays 5 project screenshots as floating, angled layers on a dark atmospheric background image. Replaces the current flat screenshot strips on the homepage and grey placeholder boxes on the referanser page.

## Design Decisions

- **Collage style:** Floating & layered — screenshots at slight angles with overlapping depth
- **Background:** Dark moody forest photograph with a 50-60% dark overlay gradient
- **Layout:** Hero center with 4 scattered — one large center screenshot, four smaller ones fanned out behind
- **Hero screenshot:** The most visually rich screenshot per project (for Center Rahma: dark full-page Ny Moské)

## Component API

```tsx
// src/components/ui/project-collage.tsx
"use client"; // Required — uses Framer Motion (motion/react)

import { motion } from "motion/react"; // NOT framer-motion — project uses the motion package

export function ProjectCollage({ images, projectName, backgroundImage }: ProjectCollageProps) {}
```

### Props

```ts
// Exported from src/types/index.ts as interfaces (consistent with file conventions)

export interface CollageImage {
  src: string;
  alt: string;
  position: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  aspectRatio: "desktop" | "mobile";
}

export interface ProjectCollageProps {
  images: CollageImage[]; // exactly 5 images
  projectName: string; // used as aria-label on the collage container for accessibility
  backgroundImage?: string; // defaults to "/images/backgrounds/collage-bg.jpg"
}
```

### `aspectRatio` to CSS mapping

| Value | CSS class | Ratio |
|-------|-----------|-------|
| `"desktop"` | `aspect-[16/10]` | 16:10 landscape |
| `"mobile"` | `aspect-[9/19]` | 9:19 tall portrait |

## Screenshot Positions

| Position | Width | Rotation | Z-index | Description |
|----------|-------|----------|---------|-------------|
| center | ~45% | 0° | 5 (top) | Hero shot, largest, front and center |
| top-left | ~32% | -4° | 2 | Behind center, peeking out top-left |
| top-right | ~30% | +3° | 2 | Behind center, peeking out top-right |
| bottom-left | ~13% | -2° | 3 | Mobile screenshot, phone aspect ratio |
| bottom-right | ~30% | +2° | 3 | Behind center, peeking out bottom-right |

All screenshots: `rounded-xl`, `border border-white/10`, `shadow-2xl` (heavy drop shadow).

## Background Image

- Stored at `/public/images/backgrounds/collage-bg.jpg`
- User sources a dark moody forest/nature photo (Unsplash)
- Rendered via `next/image` with `fill` + `object-cover`
- Dark overlay: `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)`
- Container: `rounded-2xl overflow-hidden` with `aspect-[16/9]` on desktop

## Data Model Changes

### Exact type change in `src/types/index.ts`

The existing `PortfolioSite.images` type is an intersection. Extend it:

```ts
// Before:
images: Record<DeviceViewport, string> & { full?: string; showcase?: string[] };

// After:
images: Record<DeviceViewport, string> & { full?: string; showcase?: string[]; collage?: CollageImage[] };
```

### Center Rahma collage data

In `src/lib/content/portfolio-sites.ts`, add to the `centerrahma` entry:

```ts
collage: [
  { src: "/images/portfolio/centerrahma-collage-1.png", alt: "Center Rahma — Ny Moské dark mode", position: "center", aspectRatio: "desktop" },
  { src: "/images/portfolio/centerrahma-collage-2.png", alt: "Center Rahma — Ny Moské light mode", position: "top-left", aspectRatio: "desktop" },
  { src: "/images/portfolio/centerrahma-collage-3.png", alt: "Center Rahma — Hjem light desktop", position: "top-right", aspectRatio: "desktop" },
  { src: "/images/portfolio/centerrahma-collage-4.png", alt: "Center Rahma — Hjem dark mobile", position: "bottom-left", aspectRatio: "mobile" },
  { src: "/images/portfolio/centerrahma-collage-5.png", alt: "Center Rahma — Hjem dark desktop", position: "bottom-right", aspectRatio: "desktop" },
]
```

The user will place their 5 screenshots with these filenames in `/public/images/portfolio/`.

## Animation

- **Scroll entrance** via `motion` package (`from "motion/react"`), using `whileInView`
- Each screenshot fades in + slides up with staggered delays (center first at 0ms, then corners at 100ms, 200ms, 300ms, 400ms)
- **No parallax/mouse tracking** — keep it simple, entrance animation only

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `lg` (1024px+) | Full scattered layout as designed |
| `md` (768-1023px) | Tighter arrangement, proportionally smaller, same composition |
| `sm` (< 768px) | Simplified: 3 screenshots (center hero large, 2 smaller below), mobile-friendly stack |

## Integration Points

### 1. Homepage (`PortfolioShowcase` section)

The existing `PortfolioShowcase` in `src/components/sections/portfolio-showcase.tsx` shows 2 featured projects as vertical screenshot strips. Update to:

- Keep the same section wrapper, header ("Utvalgte prosjekter"), and link
- For each featured project: check if `site.images.collage` exists
- If collage data exists → render `<ProjectCollage>` **full-width** (spanning both grid columns)
- If no collage data → fall back to the existing vertical showcase strip in the 2-column grid
- This means Center Rahma (with collage) renders as a full-width dramatic collage, while other projects without collage data keep the current strip layout below

### 2. Referanser page (replace grey placeholders)

In `src/app/referanser/page.tsx`, the grey placeholder box (lines 52-59) shows client name.

**Cross-referencing data:** The referanser page uses `PROJECTS` from `src/lib/content/portfolio.ts`, which has no `images` field. To get collage data:
- Import `getSiteById` from `src/lib/content/portfolio-sites.ts`
- For each project, call `getSiteById(project.id)` to look up the matching `PortfolioSite`
- If the site has `collage` data → render `<ProjectCollage>`
- If no match or no collage data → keep the grey placeholder fallback

**Client/Server boundary:** `ProjectCollage` is a `"use client"` component (uses motion). The referanser page is a Server Component (exports metadata). This works fine via composition — Server Components can render Client Components as children.

## Files to Create/Modify

| Action | File | Purpose |
|--------|------|---------|
| Create | `src/components/ui/project-collage.tsx` | The `"use client"` collage component |
| Modify | `src/types/index.ts` | Add `CollageImage` interface + extend `PortfolioSite.images` |
| Modify | `src/lib/content/portfolio-sites.ts` | Add collage data for Center Rahma |
| Modify | `src/components/sections/portfolio-showcase.tsx` | Render `ProjectCollage` full-width for projects with collage |
| Modify | `src/app/referanser/page.tsx` | Import `getSiteById`, render `ProjectCollage` instead of grey boxes |
| Add | `/public/images/backgrounds/collage-bg.jpg` | Background image (user-sourced) |
| Add | `/public/images/portfolio/centerrahma-collage-{1-5}.png` | User's 5 screenshots |

## Out of Scope

- Collage images for other projects (only Center Rahma for now)
- Interactive hover effects on individual screenshots
- Lightbox/modal to view full screenshots
- Different background images per project (single shared background for now)
