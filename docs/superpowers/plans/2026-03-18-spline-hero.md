# Spline 3D Hero Section — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the two-column hero section (headline + laptop carousel) with a full-viewport immersive hero where a Spline 3D scene fills the background and centered text overlays on top.

**Architecture:** Three new files (useMediaQuery hook, HeroFallback gradient component, SplineScene client component) plus a rewrite of the existing hero-section.tsx. Spline loads only on desktop (≥1024px) via next/dynamic code splitting. A gradient placeholder crossfades out when the 3D scene is ready.

**Tech Stack:** Next.js 16, React 19, @splinetool/react-spline, @splinetool/runtime, Motion (motion/react), Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-03-18-spline-hero-design.md`

---

## Chunk 1: Foundation — Dependencies and useMediaQuery Hook

### Task 1: Install Spline dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install packages**

```bash
npm install @splinetool/react-spline @splinetool/runtime
```

- [ ] **Step 2: Verify installation**

```bash
cat node_modules/@splinetool/react-spline/package.json | head -5
```

Expected: Shows package name and version.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add @splinetool/react-spline and runtime dependencies"
```

---

### Task 2: Create useMediaQuery hook

**Files:**
- Create: `src/hooks/use-media-query.ts`

- [ ] **Step 1: Create the SSR-safe useMediaQuery hook**

```typescript
"use client";

import { useState, useEffect } from "react";

/**
 * SSR-safe media query hook.
 * Returns `false` on the server and during initial hydration.
 * After hydration, returns the live match state of the given query.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | grep -i "use-media-query" || echo "No errors"
```

Expected: "No errors"

- [ ] **Step 3: Commit**

```bash
git add src/hooks/use-media-query.ts
git commit -m "feat: add SSR-safe useMediaQuery hook"
```

---

## Chunk 2: Background Components — HeroFallback and SplineScene

### Task 3: Create HeroFallback component

**Files:**
- Create: `src/components/ui/hero-fallback.tsx`

- [ ] **Step 1: Create the gradient fallback component**

```tsx
"use client";

import { motion } from "motion/react";

type HeroFallbackProps = {
  isSplineLoaded: boolean;
};

export function HeroFallback({ isSplineLoaded }: HeroFallbackProps) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
      initial={{ opacity: 1 }}
      animate={{ opacity: isSplineLoaded ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, rgba(244,206,20,0.08), #0F172A 70%)",
      }}
    />
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | grep -i "hero-fallback" || echo "No errors"
```

Expected: "No errors"

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/hero-fallback.tsx
git commit -m "feat: add HeroFallback gradient placeholder component"
```

---

### Task 4: Create SplineScene component

**Files:**
- Create: `src/components/ui/spline-scene.tsx`

This is the most complex new component. It lazy-loads the Spline runtime only on desktop, handles the onLoad crossfade, reduced-motion preference, and WebGL context loss recovery.

- [ ] **Step 1: Create the SplineScene client component**

```tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Application as SplineApplication } from "@splinetool/runtime";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

const SPLINE_SCENE_URL =
  "https://my.spline.design/claritystream-r57sGCeLIqTWMePyprTC76lE/";

type SplineSceneProps = {
  onLoaded: (loaded: boolean) => void;
};

export function SplineScene({ onLoaded }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<SplineApplication | null>(null);

  const handleLoad = useCallback(
    (splineApp: SplineApplication) => {
      splineAppRef.current = splineApp;

      if (prefersReducedMotion) {
        splineApp.stop();
      }

      setLoaded(true);
      onLoaded(true);
    },
    [onLoaded, prefersReducedMotion],
  );

  // WebGL context loss recovery
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContextLost = () => {
      setLoaded(false);
      onLoaded(false);
    };

    // The Spline runtime creates a <canvas> inside our container.
    // We use a MutationObserver to find it and attach the listener.
    const observer = new MutationObserver(() => {
      const canvas = container.querySelector("canvas");
      if (canvas) {
        canvas.addEventListener("webglcontextlost", handleContextLost);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const canvas = container.querySelector("canvas");
      canvas?.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, [onLoaded]);

  // Pause/resume based on reduced motion preference changes
  useEffect(() => {
    const app = splineAppRef.current;
    if (!app) return;

    if (prefersReducedMotion) {
      app.stop();
    } else {
      app.play();
    }
  }, [prefersReducedMotion]);

  if (!isDesktop) return null;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      aria-hidden="true"
    >
      <Spline scene={SPLINE_SCENE_URL} onLoad={handleLoad} />
    </motion.div>
  );
}
```

**Key decisions:**
- `next/dynamic` with `ssr: false` — prevents Spline from being included in server bundle
- `useMediaQuery` gate — on mobile, returns `null` so the dynamic import never triggers
- `MutationObserver` to find the canvas created by Spline runtime and attach `webglcontextlost` listener
- `useReducedMotion` from Motion — pauses scene and removes crossfade for accessibility
- **Opacity is state-driven:** The `motion.div` wrapping the scene uses `animate={{ opacity: loaded ? 1 : 0 }}`. It stays at `opacity: 0` until `onLoad` fires and sets `loaded = true`. On WebGL context loss, `loaded` resets to `false`, fading the scene back out and letting the fallback gradient show through again.

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | grep -i "spline-scene\|error" | head -20
```

Expected: No errors related to spline-scene.tsx. There may be warnings about the dynamic import — those are acceptable.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/spline-scene.tsx
git commit -m "feat: add SplineScene client component with lazy loading and WebGL recovery"
```

---

## Chunk 3: Hero Section Rewrite

### Task 5: Rewrite hero-section.tsx

**Files:**
- Modify: `src/components/sections/hero-section.tsx`

This is a full rewrite of the file. The old two-column layout with laptop carousel is replaced by a full-viewport centered layout with the Spline background.

- [ ] **Step 1: Replace the entire hero-section.tsx**

```tsx
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { SplineScene } from "@/components/ui/spline-scene";
import { HeroFallback } from "@/components/ui/hero-fallback";

export function HeroSection() {
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  return (
    <section className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[var(--color-dark-bg)]">
      {/* Layer 0: Gradient fallback (always renders, fades when Spline ready) */}
      <HeroFallback isSplineLoaded={isSplineLoaded} />

      {/* Layer 1: Spline 3D scene (desktop only, lazy loaded) */}
      <SplineScene onLoaded={setIsSplineLoaded} />

      {/* Layer 5: Readability overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0.5) 0%, transparent 70%)",
        }}
      />

      {/* Layer 10: Text content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[var(--color-accent)]">
            {HERO.eyebrow}
          </p>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-[var(--color-dark-text)] sm:text-4xl md:text-5xl lg:text-6xl">
            {HERO.headline}{" "}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] bg-clip-text text-transparent">
              {HERO.headlineHighlight}
            </span>{" "}
            {HERO.headlineEnd}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--color-dark-muted)] md:text-base lg:text-lg">
            {HERO.subheadline}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/referanser"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-bold text-[var(--color-dark-bg)] transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              {HERO.primaryCta}{" "}
              <MoveRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-[var(--color-dark-text)] transition-colors hover:border-white/30 hover:bg-white/5"
            >
              {HERO.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

**Changes from original:**
- Removed: `InteractiveGrid`, `LaptopFrame`, `AnimatePresence`, portfolio carousel state/logic, `PageSpeedBadge`, `useEffect`/`useCallback` imports, `getSiteById`/`FEATURED_PORTFOLIO_IDS` imports, `PortfolioSite` type import
- Added: `SplineScene`, `HeroFallback`, readability overlay div, `isSplineLoaded` state
- Layout: Changed from `grid lg:grid-cols-2` to `flex items-center justify-center` with `text-center`
- Height: Changed from content-driven to `h-svh` (100svh)
- Text: Bumped up heading sizes for centered layout (`lg:text-6xl`), added `mx-auto` to subheadline for centered max-width
- CTAs: Added `items-center justify-center` to center the button row

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit --pretty 2>&1 | head -20
```

Expected: No errors.

- [ ] **Step 3: Run the dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Verify:
- Hero fills the full viewport height
- Gradient placeholder is visible immediately
- On desktop: Spline scene loads and crossfades in after a few seconds
- Text is centered horizontally and vertically
- CTAs are clickable
- Scroll down: subsequent sections render normally

- [ ] **Step 4: Run the build to verify no SSR issues**

```bash
npm run build
```

Expected: Build succeeds. No errors about `window`, `document`, or Spline runtime during SSR.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: rewrite hero section with full-viewport Spline 3D background"
```

---

## Chunk 4: Verification

### Task 6: Final verification

- [ ] **Step 1: Production build**

```bash
npm run build
```

Expected: Successful build with no errors.

- [ ] **Step 2: Check bundle — Spline not in main chunk**

```bash
ls -la .next/static/chunks/ | grep -i spline || echo "Spline not in static chunks (good — it is code-split)"
```

The Spline runtime should be in a dynamically-loaded chunk, not the main bundle.

- [ ] **Step 3: Visual verification checklist**

Run `npm run dev` and verify each item:

1. **Desktop (≥1024px viewport):**
   - [ ] Gradient placeholder shows immediately on load
   - [ ] Spline 3D scene fades in after loading (2-5 seconds)
   - [ ] Text is centered and readable over the scene
   - [ ] Both CTA buttons work (navigate to /referanser and /kontakt)
   - [ ] Scrolling down shows the next section (SocialProofBar) normally

2. **Mobile (<1024px viewport):**
   - [ ] Gradient background shows (no Spline)
   - [ ] No WebGL errors in console
   - [ ] Text is centered and readable
   - [ ] CTAs work

3. **Accessibility:**
   - [ ] Enable "Reduce motion" in OS settings → crossfade is instant, scene is static
   - [ ] Tab through the page → CTAs are focusable in correct order

- [ ] **Step 4: Commit any final adjustments**

If any visual tweaks are needed (gradient opacity, text sizing, spacing), make them and commit:

```bash
git add -A
git commit -m "fix: polish hero section spacing and readability overlay"
```
