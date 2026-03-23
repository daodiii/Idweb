# Project Screenshot Collage — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `<ProjectCollage>` component that displays 5 floating, angled screenshots on a dark forest background image, and integrate it into the homepage and referanser page.

**Architecture:** A single `"use client"` component (`project-collage.tsx`) that accepts collage image data via props. Position styles are mapped from a config object per position slot. The component is composed into both a Server Component page (referanser) and an existing Client Component section (portfolio-showcase).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, motion/react (Framer Motion), next/image

**Spec:** `docs/superpowers/specs/2026-03-23-project-collage-design.md`

---

## Chunk 1: Types + Data + Component

### Task 1: Add `CollageImage` type and extend `PortfolioSite`

**Files:**
- Modify: `src/types/index.ts:86-103`

- [ ] **Step 1: Add `CollageImage` interface and extend `PortfolioSite.images`**

In `src/types/index.ts`, add the `CollageImage` interface before the `PortfolioSite` interface (around line 86), then extend the `images` field:

```ts
// Add after line 85 (after DeviceViewport)
export type CollagePosition = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface CollageImage {
  src: string;
  alt: string;
  position: CollagePosition;
  aspectRatio: "desktop" | "mobile";
}
```

Then change line 102 from:

```ts
images: Record<DeviceViewport, string> & { full?: string; showcase?: string[] };
```

to:

```ts
images: Record<DeviceViewport, string> & { full?: string; showcase?: string[]; collage?: CollageImage[] };
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No new errors (existing code doesn't reference `collage` yet)

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add CollageImage type and extend PortfolioSite.images"
```

---

### Task 2: Add Center Rahma collage data

**Files:**
- Modify: `src/lib/content/portfolio-sites.ts:23-38` (centerrahma entry)

- [ ] **Step 1: Add collage array to centerrahma entry**

In `src/lib/content/portfolio-sites.ts`, add the `collage` field to the `centerrahma` object inside its `images` block (after the `showcase` array, around line 36):

```ts
      collage: [
        { src: "/images/portfolio/centerrahma-collage-1.png", alt: "Center Rahma — Ny Moské dark mode fullside", position: "center", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-2.png", alt: "Center Rahma — Ny Moské light mode fullside", position: "top-left", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-3.png", alt: "Center Rahma — Hjem light desktop", position: "top-right", aspectRatio: "desktop" },
        { src: "/images/portfolio/centerrahma-collage-4.png", alt: "Center Rahma — Hjem dark mobile", position: "bottom-left", aspectRatio: "mobile" },
        { src: "/images/portfolio/centerrahma-collage-5.png", alt: "Center Rahma — Hjem dark desktop", position: "bottom-right", aspectRatio: "desktop" },
      ],
```

No new imports needed — the `collage` field is structurally typed via the `PortfolioSite` interface. The existing import of `PortfolioSite` already covers it.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/portfolio-sites.ts
git commit -m "feat: add collage image data for Center Rahma"
```

---

### Task 3: Create the `ProjectCollage` component

**Files:**
- Create: `src/components/ui/project-collage.tsx`

- [ ] **Step 1: Create the component file**

Create `src/components/ui/project-collage.tsx` with the full implementation:

```tsx
"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { CollageImage, CollagePosition } from "@/types";

const DEFAULT_BG = "/images/backgrounds/collage-bg.jpg";

// Position config: CSS properties for each slot
// hideOnMobile: true → hidden below md breakpoint (spec: show only 3 on mobile)
const POSITION_CONFIG: Record<CollagePosition, {
  className: string;
  width: string;
  rotation: string;
  zIndex: number;
  animDelay: number;
  hideOnMobile: boolean;
}> = {
  center: {
    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    width: "w-[45%]",
    rotation: "rotate-0",
    zIndex: 5,
    animDelay: 0,
    hideOnMobile: false,
  },
  "top-left": {
    className: "absolute top-[6%] left-[4%]",
    width: "w-[32%]",
    rotation: "-rotate-[4deg]",
    zIndex: 2,
    animDelay: 0.1,
    hideOnMobile: false,
  },
  "top-right": {
    className: "absolute top-[8%] right-[4%]",
    width: "w-[30%]",
    rotation: "rotate-[3deg]",
    zIndex: 2,
    animDelay: 0.2,
    hideOnMobile: true, // hidden on mobile — only 3 screenshots shown
  },
  "bottom-left": {
    className: "absolute bottom-[8%] left-[6%]",
    width: "w-[13%] md:w-[13%]",
    rotation: "-rotate-[2deg]",
    zIndex: 3,
    animDelay: 0.3,
    hideOnMobile: false,
  },
  "bottom-right": {
    className: "absolute bottom-[6%] right-[5%]",
    width: "w-[30%]",
    rotation: "rotate-[2deg]",
    zIndex: 3,
    animDelay: 0.4,
    hideOnMobile: true, // hidden on mobile — only 3 screenshots shown
  },
};

const ASPECT_CLASSES: Record<string, string> = {
  desktop: "aspect-[16/10]",
  mobile: "aspect-[9/19]",
};

interface ProjectCollageProps {
  images: CollageImage[];
  projectName: string;
  backgroundImage?: string;
}

export function ProjectCollage({
  images,
  projectName,
  backgroundImage = DEFAULT_BG,
}: ProjectCollageProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/9]"
      aria-label={`Skjermbilder fra ${projectName}`}
      role="img"
    >
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1152px"
        priority={false}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Floating screenshots */}
      {images.map((img) => {
        const config = POSITION_CONFIG[img.position];
        if (!config) return null;

        return (
          <motion.div
            key={img.position}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: config.animDelay }}
            className={`${config.className} ${config.width} ${config.rotation}${config.hideOnMobile ? " hidden md:block" : ""}`}
            style={{ zIndex: config.zIndex }}
          >
            <div
              className={`relative overflow-hidden rounded-xl border border-white/10 shadow-2xl ${ASPECT_CLASSES[img.aspectRatio] ?? "aspect-[16/10]"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes={img.position === "center" ? "45vw" : img.position === "bottom-left" ? "13vw" : "30vw"}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Mobile: only center + top-left + bottom-left visible (top-right and bottom-right have hidden md:block) */}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/project-collage.tsx
git commit -m "feat: create ProjectCollage component with floating screenshot layout"
```

---

## Chunk 2: Integration + Background Image

### Task 4: Integrate into homepage `PortfolioShowcase`

**Files:**
- Modify: `src/components/sections/portfolio-showcase.tsx`

- [ ] **Step 1: Update PortfolioShowcase to render collage for projects that have it**

Replace the contents of `src/components/sections/portfolio-showcase.tsx`:

```tsx
"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { ProjectCollage } from "@/components/ui/project-collage";
import type { PortfolioSite } from "@/types";

export function PortfolioShowcase() {
  const sites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(
    (s): s is PortfolioSite => s !== null
  );

  // Split into collage sites and showcase-strip sites
  const collageSites = sites.filter((s) => s.images.collage?.length);
  const showcaseSites = sites.filter((s) => !s.images.collage?.length && s.images.showcase?.length);

  return (
    <section className="light-section-warm px-6 py-14 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-end justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
              Utvalgte prosjekter
            </h2>
          </div>
          <Link
            href="/referanser"
            className="hidden items-center gap-1.5 text-sm font-semibold text-[var(--color-text)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-accent)] sm:inline-flex"
          >
            Se flere prosjekter
          </Link>
        </motion.div>

        {/* Full-width collage for projects with collage data */}
        {collageSites.map((site) => (
          <motion.article
            key={site.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <ProjectCollage
              images={site.images.collage!}
              projectName={site.name}
            />
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="font-heading text-base font-bold text-[var(--color-text)]">
                {site.name}
              </h3>
              <span className="shrink-0 font-heading text-sm font-medium text-[var(--color-text-muted)]">
                {site.domain}
              </span>
            </div>
          </motion.article>
        ))}

        {/* Existing showcase strip grid for projects without collage data */}
        {showcaseSites.length > 0 && (
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
            {showcaseSites.map((site, i) => {
              const imgs = site.images.showcase!;
              return (
                <motion.article
                  key={site.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                    {imgs.map((src, imgIdx) => (
                      <div
                        key={imgIdx}
                        className={`relative overflow-hidden ${imgIdx > 0 ? "hidden border-t border-[var(--color-border)] md:block" : ""}`}
                      >
                        <Image
                          src={src}
                          alt={`${site.name} — seksjon ${imgIdx + 1}`}
                          width={1440}
                          height={900}
                          className={`block w-full ${imgIdx === 0 ? "transition-transform duration-500 group-hover:scale-[1.02]" : ""}`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="font-heading text-base font-bold text-[var(--color-text)]">
                      {site.name}
                    </h3>
                    <span className="shrink-0 font-heading text-sm font-medium text-[var(--color-text-muted)]">
                      {site.domain}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Mobile CTA */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle referanser <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

Key changes:
- Filter splits sites into `collageSites` and `showcaseSites`
- Collage sites render full-width `<ProjectCollage>` above the grid
- Showcase sites keep the existing 2-column grid below
- Filter no longer requires `showcase` for all sites (collage-only sites pass through)

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/portfolio-showcase.tsx
git commit -m "feat: integrate ProjectCollage into homepage PortfolioShowcase"
```

---

### Task 5: Integrate into referanser page

**Files:**
- Modify: `src/app/referanser/page.tsx`

- [ ] **Step 1: Update referanser page to use ProjectCollage where available**

In `src/app/referanser/page.tsx`, add imports at the top (after existing imports):

```ts
import { getSiteById } from "@/lib/content/portfolio-sites";
import { ProjectCollage } from "@/components/ui/project-collage";
import type { PortfolioSiteId } from "@/types";
```

Then replace the grey placeholder div (lines 52-59):

```tsx
              {/* Placeholder for project image */}
              <div className="flex flex-1 items-center justify-center rounded-lg bg-[var(--color-bg-alt)] p-12">
                <div className="text-center">
                  <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {project.industry}
                  </p>
                  <p className="mt-2 text-2xl font-bold">{project.client}</p>
                </div>
              </div>
```

with:

```tsx
              {/* Project image — collage or placeholder */}
              <div className="flex-1">
                {(() => {
                  const site = getSiteById(project.id as PortfolioSiteId);
                  if (site?.images.collage?.length) {
                    return (
                      <ProjectCollage
                        images={site.images.collage}
                        projectName={site.name}
                      />
                    );
                  }
                  return (
                    <div className="flex items-center justify-center rounded-lg bg-[var(--color-bg-alt)] p-12 min-h-[300px]">
                      <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                          {project.industry}
                        </p>
                        <p className="mt-2 text-2xl font-bold">{project.client}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
```

Note: `project.id` is typed as `string` in the PROJECTS array (not `PortfolioSiteId`), so we cast with `as PortfolioSiteId` for the lookup. `getSiteById` returns `null` for non-matching IDs, which the fallback handles gracefully.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/app/referanser/page.tsx
git commit -m "feat: integrate ProjectCollage into referanser page"
```

---

### Task 6: Add placeholder background image + verify dev server

**Files:**
- Add: `public/images/backgrounds/collage-bg.jpg`

- [ ] **Step 1: Create backgrounds directory and add a placeholder**

```bash
mkdir -p public/images/backgrounds
```

Download a dark forest image from Unsplash for development (the user will replace with their chosen image):

```bash
curl -L "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1920&q=85" -o public/images/backgrounds/collage-bg.jpg
```

- [ ] **Step 2: Start dev server and verify homepage renders**

Run: `npm run dev`

Open `http://localhost:3000` and check:
- The "Utvalgte prosjekter" section shows a collage for Center Rahma (images won't load yet — user needs to add the 5 `centerrahma-collage-*.png` files)
- Vocura still shows the old showcase strip layout below
- No console errors

- [ ] **Step 3: Verify referanser page**

Open `http://localhost:3000/referanser` and check:
- Center Rahma shows the collage component (with missing images until user adds them)
- Other projects show the grey placeholder fallback
- No console errors

- [ ] **Step 4: Commit**

```bash
git add public/images/backgrounds/collage-bg.jpg
git commit -m "feat: add placeholder forest background for project collage"
```

---

## User Action Required (post-implementation)

After all tasks are complete, the user needs to:

1. **Add their 5 Center Rahma screenshots** to `public/images/portfolio/`:
   - `centerrahma-collage-1.png` — Dark full-page (Ny Moské) → center hero
   - `centerrahma-collage-2.png` — Light full-page (Ny Moské) → top-left
   - `centerrahma-collage-3.png` — Desktop hero light → top-right
   - `centerrahma-collage-4.png` — Mobile dark → bottom-left
   - `centerrahma-collage-5.png` — Desktop hero dark → bottom-right

2. **Optionally replace** `public/images/backgrounds/collage-bg.jpg` with their preferred dark moody forest photo from Unsplash.

3. **Visual QA** — review the collage on both homepage and referanser page, adjust if needed.
