# Hero Device Screenshots Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace abstract hero device mockups with real portfolio screenshots that rotate through 3 curated sets with scaled + gentle scroll animation.

**Architecture:** Data layer defines 6 sites and 3 rotation sets. Device frame components render screenshots inside styled frames. A scroll animation hook drives the gentle-scroll effect per image. Hero section orchestrates rotation with crossfade transitions.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, motion/react, sips (macOS image conversion)

**Spec:** `docs/superpowers/specs/2026-03-13-hero-device-screenshots-design.md`

---

## File Structure

| File | Responsibility |
|------|---------------|
| `public/images/portfolio/*.webp` | 18 optimized WebP screenshots (static assets) |
| `src/lib/content/portfolio-sites.ts` | Site metadata, image paths, rotation set definitions |
| `src/types/index.ts` | New types: `PortfolioSiteId`, `DeviceViewport`, `PortfolioSite`, `RotationSet` |
| `src/components/ui/device-frame.tsx` | `LaptopFrame`, `TabletFrame`, `PhoneFrame` components |
| `src/hooks/use-scroll-animation.ts` | `useScrollAnimation` hook (requestAnimationFrame-based) |
| `src/components/sections/hero-section.tsx` | Modified: rotation logic, crossfade, replace abstract mockups |

---

## Chunk 1: Assets and Data Layer

### Task 1: Convert Screenshots to WebP

**Files:**
- Create: `public/images/portfolio/` (directory + 18 WebP files)
- Source: `.firecrawl/responsive/*-full.png`

- [ ] **Step 1: Create the portfolio images directory**

```bash
mkdir -p public/images/portfolio
```

- [ ] **Step 2: Convert all 18 PNGs to optimized WebP**

Run this script from the project root:

```bash
cd .firecrawl/responsive && for f in *-full.png; do
  out="../../public/images/portfolio/$(echo "$f" | sed 's/-full\.png/.webp/')"
  sips -s format webp -s formatOptions 80 "$f" --out "$out" 2>/dev/null
  echo "$(basename "$out"): $(stat -f%z "$out" | awk '{printf "%.0fKB\n", $1/1024}')"
done
```

Expected: 18 `.webp` files in `public/images/portfolio/`. Total size should be under 600KB.

Output filenames:
- `brobekk-desktop.webp`, `brobekk-tablet.webp`, `brobekk-mobile.webp`
- `centerrahma-desktop.webp`, `centerrahma-tablet.webp`, `centerrahma-mobile.webp`
- `vocura-desktop.webp`, `vocura-tablet.webp`, `vocura-mobile.webp`
- `herbs-desktop.webp`, `herbs-tablet.webp`, `herbs-mobile.webp`
- `iqra-desktop.webp`, `iqra-tablet.webp`, `iqra-mobile.webp`
- `ringebu-desktop.webp`, `ringebu-tablet.webp`, `ringebu-mobile.webp`

- [ ] **Step 3: Verify asset sizes are reasonable**

```bash
ls -la public/images/portfolio/*.webp | awk '{total+=$5; printf "%-35s %dKB\n", $NF, $5/1024} END {printf "\nTotal: %dKB\n", total/1024}'
```

Expected: Each file under 200KB, total under 600KB. If any file is too large, re-convert with quality 60.

- [ ] **Step 4: Commit assets**

```bash
git add public/images/portfolio/
git commit -m "feat: add portfolio site screenshots as WebP assets"
```

---

### Task 2: Add Types

**Files:**
- Modify: `src/types/index.ts` (append new types at the end)

- [ ] **Step 1: Add portfolio types to the shared types file**

Append these types at the end of `src/types/index.ts`:

```typescript
// -- Portfolio device showcase types --

export type DeviceViewport = "desktop" | "tablet" | "mobile";

export type PortfolioSiteId =
  | "brobekk"
  | "centerrahma"
  | "vocura"
  | "herbs"
  | "iqra"
  | "ringebu";

export interface PortfolioSite {
  id: PortfolioSiteId;
  name: string;
  domain: string;
  images: Record<DeviceViewport, string>;
}

export interface RotationSet {
  laptop: PortfolioSiteId;
  tablet: PortfolioSiteId;
  phone: PortfolioSiteId;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add portfolio showcase types"
```

---

### Task 3: Create Portfolio Sites Data

**Files:**
- Create: `src/lib/content/portfolio-sites.ts`

- [ ] **Step 1: Create the data file**

Create `src/lib/content/portfolio-sites.ts`:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/portfolio-sites.ts
git commit -m "feat: add portfolio sites data and rotation sets"
```

---

## Chunk 2: Components and Hook

### Task 4: Create Device Frame Components

**Files:**
- Create: `src/components/ui/device-frame.tsx`

- [ ] **Step 1: Create the device frame component file**

Create `src/components/ui/device-frame.tsx`:

```typescript
"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface DeviceFrameProps {
  imageSrc: string;
  imageAlt: string;
  paused?: boolean;
  priority?: boolean;
  className?: string;
}

// -- Laptop frame with browser chrome --
export function LaptopFrame({ imageSrc, imageAlt, paused, priority, className }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { paused });

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(18deg)" }}>
        <div
          className="rounded-t-xl bg-[#1a1a1a] p-1"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.08)",
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 rounded-t-lg bg-[#111] px-3 py-1.5">
            <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
            <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
            <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
            <div className="ml-3 h-2 flex-1 rounded bg-white/5" />
          </div>
          {/* Screen */}
          <div
            ref={containerRef}
            className="relative h-[180px] overflow-hidden rounded-b bg-black"
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={1440}
              height={3600}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="300px"
              priority={priority ?? false}
            />
          </div>
        </div>
        {/* Base */}
        <div className="mx-auto h-2.5 w-[320px] rounded-b bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
        <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-[#222]" />
      </div>
    </div>
  );
}

// -- Tablet frame with camera dot --
export function TabletFrame({ imageSrc, imageAlt, paused, priority, className }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { paused });

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(-12deg)" }}>
        <div
          className="rounded-2xl bg-[#1a1a1a] p-1.5"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.06)",
          }}
        >
          {/* Camera */}
          <div className="mx-auto mb-1 h-1.5 w-1.5 rounded-full bg-[#111]" />
          {/* Screen */}
          <div
            ref={containerRef}
            className="relative h-[230px] overflow-hidden rounded-xl bg-black"
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={768}
              height={3200}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="180px"
              priority={priority ?? false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// -- Phone frame with notch --
export function PhoneFrame({ imageSrc, imageAlt, paused, priority, className }: DeviceFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useScrollAnimation(imageRef, containerRef, { paused });

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(-15deg)" }}>
        <div
          className="rounded-[18px] bg-[#1a1a1a] p-1"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(37,99,235,0.06)",
          }}
        >
          {/* Notch */}
          <div className="mx-auto mb-1 h-1.5 w-10 rounded-b-md bg-[#111]" />
          {/* Screen */}
          <div
            ref={containerRef}
            className="relative h-[200px] overflow-hidden rounded-xl bg-black"
          >
            <Image
              ref={imageRef}
              src={imageSrc}
              alt={imageAlt}
              width={375}
              height={3400}
              className="absolute left-0 top-0 w-full"
              style={{ height: "auto" }}
              sizes="100px"
              priority={priority ?? false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: Will fail because `useScrollAnimation` doesn't exist yet. That's fine — we create it next.

- [ ] **Step 3: Commit (WIP — depends on hook)**

Hold this commit until Task 5 is done.

---

### Task 5: Create Scroll Animation Hook

**Files:**
- Create: `src/hooks/use-scroll-animation.ts`

- [ ] **Step 1: Create the hooks directory**

```bash
mkdir -p src/hooks
```

- [ ] **Step 2: Create the scroll animation hook**

Create `src/hooks/use-scroll-animation.ts`:

```typescript
"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Drives a gentle scroll animation on an absolutely-positioned image
 * inside a fixed-height container.
 *
 * Cycle: hold top → scroll down → hold bottom → scroll back up
 * Timing (12s default): 0-25% hold, 25-60% down, 60-80% hold, 80-100% up
 *
 * Pauses automatically when the container is off-screen.
 * Respects prefers-reduced-motion — stays static at top.
 */
export function useScrollAnimation(
  imageRef: RefObject<HTMLImageElement | null>,
  containerRef: RefObject<HTMLDivElement | null>,
  options?: { cycleDuration?: number; paused?: boolean }
) {
  const rafId = useRef<number>(0);
  const startTime = useRef<number>(0);
  const isVisible = useRef(true);
  const cycleDuration = options?.cycleDuration ?? 12000;
  const paused = options?.paused ?? false;

  useEffect(() => {
    const image = imageRef.current;
    const container = containerRef.current;
    if (!image || !container) return;

    // Respect reduced-motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      image.style.top = "0px";
      return;
    }

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    function easeInOutQuad(t: number): number {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function tick(now: number) {
      if (!image || !container) return;

      if (!startTime.current) startTime.current = now;

      if (isVisible.current && !paused) {
        const containerH = container.offsetHeight;
        const scale = container.offsetWidth / (image.naturalWidth || 1);
        const imgH = (image.naturalHeight || 1) * scale;
        const scrollDist = Math.max(0, imgH - containerH);

        const elapsed = (now - startTime.current) % cycleDuration;
        const progress = elapsed / cycleDuration;

        let top = 0;

        if (progress < 0.25) {
          // Hold at top
          top = 0;
        } else if (progress < 0.6) {
          // Scroll down
          const p = (progress - 0.25) / 0.35;
          top = -scrollDist * easeInOutQuad(p);
        } else if (progress < 0.8) {
          // Hold at bottom
          top = -scrollDist;
        } else {
          // Scroll back up
          const p = (progress - 0.8) / 0.2;
          top = -scrollDist * (1 - easeInOutQuad(p));
        }

        image.style.top = `${top}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [imageRef, containerRef, cycleDuration, paused]);

  /** Reset scroll position to top (call on set change) */
  return {
    reset: () => {
      startTime.current = 0;
      if (imageRef.current) {
        imageRef.current.style.top = "0px";
      }
    },
  };
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors (device-frame.tsx can now resolve the import).

- [ ] **Step 4: Commit both the hook and device frames together**

```bash
git add src/hooks/use-scroll-animation.ts src/components/ui/device-frame.tsx
git commit -m "feat: add device frame components and scroll animation hook"
```

---

## Chunk 3: Hero Section Integration

### Task 6: Rewrite Hero Section with Rotation

**Files:**
- Modify: `src/components/sections/hero-section.tsx`

This is the main integration task. We replace the three abstract mockup functions with the new device frame components, add rotation state, and wire up crossfade transitions.

- [ ] **Step 1: Update imports at the top of hero-section.tsx**

Replace the existing imports block (lines 1-9) with:

```typescript
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MoveRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LaptopFrame, TabletFrame, PhoneFrame } from "@/components/ui/device-frame";
import { HERO, TRUST_SIGNALS } from "@/lib/content/homepage";
import { ROTATION_SETS, getSiteById } from "@/lib/content/portfolio-sites";
import type { TrustSignal } from "@/types";
```

- [ ] **Step 2: Remove the three abstract mockup functions**

Delete the `LaptopMockup` function (lines 40-99), `TabletMockup` function (lines 102-148), and `PhoneMockup` function (lines 151-192). These are fully replaced by the device frame components.

- [ ] **Step 3: Add rotation state and preloading to HeroSection**

Inside the `HeroSection` component, after the existing `titleNumber` state (line 219), add the rotation logic:

```typescript
  // -- Rotation state for portfolio device sets --
  const [activeSet, setActiveSet] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Cycle through rotation sets: 6s visible + 0.6s fade = 6.6s total cycle
  useEffect(() => {
    let fadeTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setIsFading(true);
      // After fade-out completes, switch set and fade back in
      fadeTimeout = setTimeout(() => {
        setActiveSet((prev) => (prev + 1) % ROTATION_SETS.length);
        setIsFading(false);
      }, 600);
    }, 6600);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, []);

  // Resolve current set's image paths
  const currentSet = ROTATION_SETS[activeSet];
  const laptopSite = getSiteById(currentSet.laptop);
  const tabletSite = getSiteById(currentSet.tablet);
  const phoneSite = getSiteById(currentSet.phone);

  // Resolve next set for preloading
  const nextSetIndex = (activeSet + 1) % ROTATION_SETS.length;
  const nextSet = ROTATION_SETS[nextSetIndex];
  const nextLaptop = getSiteById(nextSet.laptop);
  const nextTablet = getSiteById(nextSet.tablet);
  const nextPhone = getSiteById(nextSet.phone);
```

- [ ] **Step 4: Replace the laptop mockup slot (left side)**

Replace the left-side motion.div that contains `<LaptopMockup />` (around lines 251-260 in the original) with:

```typescript
          {/* Laptop — left */}
          <motion.div
            className="hidden w-[300px] flex-shrink-0 lg:block"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <div
              className="transition-opacity duration-[600ms]"
              style={{ opacity: isFading ? 0 : 1 }}
            >
              {laptopSite && (
                <LaptopFrame
                  key={`laptop-${currentSet.laptop}`}
                  imageSrc={laptopSite.images.desktop}
                  imageAlt={`${laptopSite.name} nettside — desktop`}
                  paused={isFading}
                  priority={activeSet === 0}
                  className="w-[300px] flex-shrink-0"
                />
              )}
            </div>
          </motion.div>
```

- [ ] **Step 5: Replace the tablet + phone mockup slot (right side)**

Replace the right-side motion.div that contains `<TabletMockup />` and `<PhoneMockup />` (around lines 315-325 in the original) with:

```typescript
          {/* Tablet + Phone — right */}
          <motion.div
            className="hidden w-[300px] flex-shrink-0 items-end gap-4 lg:flex"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <div
              className="flex items-end gap-4 transition-opacity duration-[600ms]"
              style={{ opacity: isFading ? 0 : 1 }}
            >
              {tabletSite && (
                <TabletFrame
                  key={`tablet-${currentSet.tablet}`}
                  imageSrc={tabletSite.images.tablet}
                  imageAlt={`${tabletSite.name} nettside — nettbrett`}
                  paused={isFading}
                  priority={activeSet === 0}
                  className="w-[180px] flex-shrink-0"
                />
              )}
              {phoneSite && (
                <PhoneFrame
                  key={`phone-${currentSet.phone}`}
                  imageSrc={phoneSite.images.mobile}
                  imageAlt={`${phoneSite.name} nettside — mobil`}
                  paused={isFading}
                  priority={activeSet === 0}
                  className="w-[100px] flex-shrink-0"
                />
              )}
            </div>
          </motion.div>
```

- [ ] **Step 6: Add hidden preload images before the closing `</section>` tag**

Just before the closing `</section>` tag, add preloading for the next set:

```typescript
        {/* Preload next rotation set (hidden) */}
        <div className="hidden" aria-hidden="true">
          {nextLaptop && (
            <Image
              src={nextLaptop.images.desktop}
              alt=""
              width={1440}
              height={3600}
              priority={false}
            />
          )}
          {nextTablet && (
            <Image
              src={nextTablet.images.tablet}
              alt=""
              width={768}
              height={3200}
              priority={false}
            />
          )}
          {nextPhone && (
            <Image
              src={nextPhone.images.mobile}
              alt=""
              width={375}
              height={3400}
              priority={false}
            />
          )}
        </div>
```

- [ ] **Step 7: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 8: Run the dev server and visually verify**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
1. Three device frames visible on desktop (laptop left, tablet+phone right)
2. Real screenshots visible inside each frame
3. Screenshots gently scroll up and down
4. Every 6 seconds, screenshots crossfade to the next set
5. Below `lg` breakpoint: devices hidden, only text content visible
6. No layout shift on page load

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: replace abstract device mockups with real portfolio screenshots

Adds rotating portfolio showcase with 3 curated sets cycling every 6s.
Each screenshot uses scaled + gentle scroll animation inside device frames.
Crossfade transitions between sets, preloads next set's images."
```

---

### Task 7: Final Verification and Cleanup

- [ ] **Step 1: Run full build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 2: Verify the old mockup code is fully removed**

Search for any remnants of the old abstract mockup code:

```bash
grep -r "LaptopMockup\|TabletMockup\|PhoneMockup" src/
```

Expected: No matches. If any found, remove them.

- [ ] **Step 3: Verify prefers-reduced-motion behavior**

In the browser, enable reduced motion (macOS: System Settings → Accessibility → Display → Reduce Motion). Reload the page. Screenshots should show the top of the page statically — no scroll animation.

- [ ] **Step 4: Final commit if any cleanup was needed**

```bash
git add -A
git commit -m "chore: cleanup old mockup references"
```

Only create this commit if there were changes to make.
