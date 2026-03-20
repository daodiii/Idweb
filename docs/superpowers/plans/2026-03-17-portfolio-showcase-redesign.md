# Portfolio Showcase Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat portfolio grid with a cinematic device stage that spotlights one project at a time using large device frames on a dark background.

**Architecture:** Rewrite `portfolio-showcase.tsx` as a single component with separate desktop (device trio) and mobile (phone-only) layouts, powered by shared carousel state. Add `PORTFOLIO_STATS` data to `homepage.ts`.

**Tech Stack:** Next.js 16, React 19, motion/react, Tailwind CSS 4, Lucide icons

**Spec:** `docs/superpowers/specs/2026-03-17-portfolio-showcase-redesign.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/lib/content/homepage.ts` | Modify (add export) | `PORTFOLIO_STATS` data |
| `src/components/sections/portfolio-showcase.tsx` | Full rewrite | Cinematic device stage component |

Files unchanged: `device-frame.tsx`, `portfolio-sites.ts`, `page.tsx`

---

## Chunk 1: Data & Component Rewrite

### Task 1: Add PORTFOLIO_STATS data

**Files:**
- Modify: `src/lib/content/homepage.ts` (add after `FEATURED_PORTFOLIO_IDS` on line 27)

- [ ] **Step 1: Add the stats record**

Add this export after `FEATURED_PORTFOLIO_IDS`:

```ts
export const PORTFOLIO_STATS: Partial<Record<PortfolioSiteId, { pagespeed: string; result: string }>> = {
  vocura: { pagespeed: "98/100", result: "+60% bookinger" },
  brobekk: { pagespeed: "96/100", result: "+45% henvendelser" },
  centerrahma: { pagespeed: "97/100", result: "+80% besøkende" },
};
```

- [ ] **Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors related to `homepage.ts`

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/homepage.ts
git commit -m "feat: add PORTFOLIO_STATS data for showcase badges"
```

---

### Task 2: Rewrite portfolio-showcase.tsx — Desktop layout

**Files:**
- Rewrite: `src/components/sections/portfolio-showcase.tsx`

- [ ] **Step 1: Write the new component with desktop layout**

Replace the entire file with the new cinematic component. Key structure:

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame, LaptopFrame, TabletFrame } from "@/components/ui/device-frame";
import { FEATURED_PORTFOLIO_IDS, PORTFOLIO_STATS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";
import type { PortfolioSite } from "@/types";

export function PortfolioShowcase() {
  const sites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(
    (s): s is PortfolioSite => s !== null
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSite = sites[activeIndex];
  const stats = activeSite ? PORTFOLIO_STATS[activeSite.id] : undefined;

  // --- Navigation helpers ---
  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % sites.length);
  }, [sites.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + sites.length) % sites.length);
  }, [sites.length]);

  // --- Auto-rotation (5s, pauses on hover) ---
  useEffect(() => {
    if (isPaused) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  // --- Keyboard navigation ---
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") { goPrev(); setIsPaused(true); }
    if (e.key === "ArrowRight") { goNext(); setIsPaused(true); }
  }

  return (
    <section
      className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[var(--color-accent)]">
            Våre prosjekter
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-dark-text)] sm:text-4xl">
            Prosjekter vi har levert
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--color-dark-muted)]">
            Hver nettside er skreddersydd for kundens behov og bransje.
          </p>
        </motion.div>

        {/* ── Desktop: Device trio stage ── */}
        <motion.div
          className="relative mt-16 hidden md:block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Radial gold glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "600px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(244,206,20,0.07) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />

          {/* Device trio container */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeSite && (
                <motion.div
                  key={activeSite.id}
                  className="flex items-end justify-center gap-5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Phone (left) — flat to avoid competing perspective with laptop */}
                  <PhoneFrame
                    imageSrc={activeSite.images.mobile}
                    imageAlt={`${activeSite.name} — mobil`}
                    className="z-10 w-[60px] -translate-y-4 flex-shrink-0 lg:w-[80px]"
                    flat
                  />
                  {/* Laptop (center, dominant) */}
                  <LaptopFrame
                    imageSrc={activeSite.images.desktop}
                    imageAlt={`${activeSite.name} — desktop`}
                    className="z-20 w-[280px] flex-shrink-0 lg:w-[380px]"
                  />
                  {/* Tablet (right) */}
                  <TabletFrame
                    imageSrc={activeSite.images.tablet}
                    imageAlt={`${activeSite.name} — nettbrett`}
                    className="z-10 w-[90px] -translate-y-2 flex-shrink-0 lg:w-[120px]"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floating stat badges */}
            {stats && (
              <>
                <motion.div
                  className="absolute bottom-4 right-4 rounded-lg border border-[rgba(244,206,20,0.25)] bg-[rgba(244,206,20,0.12)] px-3 py-1.5 text-xs font-bold text-[var(--color-accent)] backdrop-blur-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, y: [0, -3, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.3 },
                    x: { duration: 0.4, delay: 0.3 },
                    y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.7 },
                  }}
                >
                  {stats.pagespeed} PageSpeed
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-4 rounded-lg border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.12)] px-3 py-1.5 text-xs font-bold text-[#22c55e] backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, y: [0, -3, 0] }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.45 },
                    x: { duration: 0.4, delay: 0.45 },
                    y: { duration: 3, ease: "easeInOut", repeat: Infinity, delay: 0.85 },
                  }}
                >
                  {stats.result}
                </motion.div>
              </>
            )}
          </div>

          {/* Project info */}
          <AnimatePresence mode="wait">
            {activeSite && (
              <motion.div
                key={`info-${activeSite.id}`}
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-[var(--color-dark-text)]">
                  {activeSite.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                  {activeSite.domain}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="mt-6 flex justify-center gap-2">
            {sites.map((site, i) => (
              <button
                key={site.id}
                onClick={() => { setActiveIndex(i); setIsPaused(true); }}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-[var(--color-accent)]"
                    : "w-1.5 bg-white/15 hover:bg-white/30"
                }`}
                aria-label={`Vis ${site.name}`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Mobile: Phone carousel ── */}
        <div
          className="mt-16 md:hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* ... mobile layout (Task 3) */}
        </div>

        {/* CTA link */}
        <div className="mt-12 text-center">
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

Key changes from the current component:
- Dark background (`--color-dark-bg`) instead of light
- Eyebrow label above heading
- Device trio (phone + laptop + tablet) instead of grid
- `AnimatePresence` with crossfade for project rotation
- Auto-rotation with 5s interval, pauses on hover
- Floating stat badges from `PORTFOLIO_STATS`
- Keyboard navigation via `onKeyDown`
- `prefers-reduced-motion` check disables auto-rotation
- Responsive device widths: `w-[280px] lg:w-[380px]` for laptop

- [ ] **Step 2: Verify the desktop layout renders**

Run: `npm run dev`
Open `http://localhost:3000` and verify:
- Dark background section appears after social proof bar
- Device trio shows with laptop dominant in center
- Auto-rotation cycles through 3 projects
- Floating badges appear with PageSpeed + result stat
- Hovering pauses rotation
- Dots are clickable

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/portfolio-showcase.tsx
git commit -m "feat: rewrite portfolio showcase with cinematic device stage (desktop)"
```

---

### Task 3: Add mobile layout

**Files:**
- Modify: `src/components/sections/portfolio-showcase.tsx` (replace the mobile placeholder)

- [ ] **Step 1: Replace the mobile placeholder with the full mobile layout**

Replace `{/* ... mobile layout (Task 3) */}` inside the `md:hidden` div with:

```tsx
<div className="relative flex flex-col items-center">
  {/* Phone frame — large and centered */}
  <AnimatePresence mode="wait">
    {activeSite && (
      <motion.div
        key={activeSite.id}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[280px]"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_e, info) => {
          if (info.offset.x > 50 || info.velocity.x > 200) {
            goPrev();
            setIsPaused(true);
          } else if (info.offset.x < -50 || info.velocity.x < -200) {
            goNext();
            setIsPaused(true);
          }
        }}
      >
        <PhoneFrame
          imageSrc={activeSite.images.mobile}
          imageAlt={`${activeSite.name} — mobil`}
          className="w-full"
          flat
        />
      </motion.div>
    )}
  </AnimatePresence>

  {/* Project info */}
  <AnimatePresence mode="wait">
    {activeSite && (
      <motion.div
        key={`mobile-info-${activeSite.id}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mt-6 text-center"
      >
        <h3 className="text-xl font-bold text-[var(--color-dark-text)]">
          {activeSite.name}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
          {activeSite.domain}
        </p>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Inline stat badges (mobile) */}
  {stats && (
    <div className="mt-4 flex justify-center gap-2">
      <span className="rounded-lg border border-[rgba(244,206,20,0.25)] bg-[rgba(244,206,20,0.12)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-accent)]">
        {stats.pagespeed} PageSpeed
      </span>
      <span className="rounded-lg border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.12)] px-2.5 py-1 text-[10px] font-bold text-[#22c55e]">
        {stats.result}
      </span>
    </div>
  )}

  {/* Navigation: arrows + dots */}
  <div className="mt-6 flex items-center gap-6">
    <button
      onClick={() => { goPrev(); setIsPaused(true); }}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-[var(--color-dark-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-dark-text)]"
      aria-label="Forrige prosjekt"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>

    <div className="flex gap-2">
      {sites.map((site, i) => (
        <button
          key={site.id}
          onClick={() => { setActiveIndex(i); setIsPaused(true); }}
          className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
            i === activeIndex
              ? "w-6 bg-[var(--color-accent)]"
              : "w-2 bg-white/15"
          }`}
          aria-label={`Vis ${site.name}`}
        />
      ))}
    </div>

    <button
      onClick={() => { goNext(); setIsPaused(true); }}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-[var(--color-dark-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-dark-text)]"
      aria-label="Neste prosjekt"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  </div>
</div>
```

Key mobile differences from desktop:
- Single `PhoneFrame` at 280px (flat, no perspective)
- `drag="x"` enables swipe gestures with 50px / 200px/s thresholds
- Stat badges inline (not floating) below project info
- Arrow buttons use dark theme border colors (`white/15`)

- [ ] **Step 2: Test mobile layout**

Run dev server, resize browser to <768px or use DevTools mobile view. Verify:
- Large phone frame centered
- Swipe left/right cycles projects
- Arrow buttons work
- Stat badges appear inline
- Auto-rotation works and pauses on touch

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/portfolio-showcase.tsx
git commit -m "feat: add mobile layout with swipe gestures to portfolio showcase"
```

---

### Task 4: Visual verification & polish

- [ ] **Step 1: Verify desktop at multiple breakpoints**

Check at 768px, 1024px, 1280px, 1440px:
- Device trio scales properly (280px laptop at md, 380px at lg+)
- No horizontal overflow
- Gold glow centered behind devices
- Badges don't overlap devices

- [ ] **Step 2: Verify mobile at 375px and 414px**

Check:
- Phone frame fits without horizontal scroll
- Swipe threshold feels natural
- Badges text is readable at 10px font size

- [ ] **Step 3: Verify reduced motion**

In DevTools, enable "Prefers reduced motion" in Rendering tab:
- No auto-rotation
- Transitions still work but are simple opacity fades

- [ ] **Step 4: Verify keyboard navigation**

Tab to the section, press left/right arrow keys:
- Projects cycle correctly
- Auto-rotation pauses after keyboard interaction

- [ ] **Step 5: Final commit if any polish changes were needed**

```bash
git add src/components/sections/portfolio-showcase.tsx
git commit -m "fix: polish portfolio showcase responsive behavior"
```

---

## Verification Checklist

After all tasks, verify against spec success criteria:

- [ ] Laptop frame ≥380px on lg+ desktop
- [ ] Dark background creates seamless flow from hero
- [ ] All 3 device types shown on desktop
- [ ] Stats visible on badges
- [ ] Auto-rotation with 5s interval
- [ ] Mobile touch-friendly with 280px phone frame
- [ ] No layout shift during transitions
- [ ] `prefers-reduced-motion` respected
