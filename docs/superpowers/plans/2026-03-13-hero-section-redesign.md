# Hero Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the text-only hero section into a visually rich composition with flanking device mockups, dot grid background, and integrated trust signals.

**Architecture:** Modify 5 existing files — add `TrustSignal` type, restructure trust signals data from flat strings to structured objects, rewrite the hero section component with device mockups and animations, add a dot grid CSS variable, and remove the standalone trust signals section from the homepage.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Motion (motion/react)

**Testing approach:** No test framework is configured in this project. Verification is done via TypeScript compilation (`npx tsc --noEmit`) and visual inspection using the dev server (`npm run dev`).

**Spec:** `docs/superpowers/specs/2026-03-13-hero-section-redesign.md`

---

## Chunk 1: Data Layer

### Task 1: Add TrustSignal type

**Files:**
- Modify: `src/types/index.ts:49-53` (append after ProcessStep interface)

- [ ] **Step 1: Add the TrustSignal interface**

Add to the end of `src/types/index.ts`:

```ts
export interface TrustSignal {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (new interface is additive, no consumers yet)

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: add TrustSignal type interface"
```

---

## Chunk 2: Hero Section + Integration (Atomic)

All changes in this chunk are committed together as one atomic unit so the codebase never enters a broken state. The data restructure, hero rewrite, CSS update, and page.tsx cleanup all land in a single commit.

### Task 2: Restructure TRUST_SIGNALS data

**Files:**
- Modify: `src/lib/content/homepage.ts:1` (add TrustSignal import)
- Modify: `src/lib/content/homepage.ts:19-24` (replace TRUST_SIGNALS object)

- [ ] **Step 1: Update the import statement**

In `src/lib/content/homepage.ts` line 1, change:
```ts
import type { Testimonial, ProcessStep } from "@/types";
```
to:
```ts
import type { Testimonial, ProcessStep, TrustSignal } from "@/types";
```

- [ ] **Step 2: Replace TRUST_SIGNALS with structured array**

Replace lines 19-24 of `src/lib/content/homepage.ts`:
```ts
export const TRUST_SIGNALS = {
  experience: "10+ års erfaring",
  projects: "200+ leverte prosjekter",
  satisfaction: "98% kundetilfredshet",
  googleRating: "5.0 på Google",
} as const;
```

With:
```ts
export const TRUST_SIGNALS: TrustSignal[] = [
  { value: 10, suffix: "+", label: "Års erfaring" },
  { value: 200, suffix: "+", label: "Leverte prosjekter" },
  { value: 98, suffix: "%", label: "Kundetilfredshet" },
  { value: 5.0, suffix: "", label: "Google-vurdering", decimals: 1 },
];
```

**Do NOT commit yet** — page.tsx still references the old shape. Continue to Task 3.

---

### Task 3: Rewrite hero-section.tsx

**Files:**
- Modify: `src/components/sections/hero-section.tsx` (full rewrite)

Key changes from current:
- Background: `bg-[var(--color-bg)]` with dot grid overlay (replaces `bg-white dark:bg-[var(--color-bg)]`)
- Container: `max-w-7xl` (was `max-w-6xl`)
- Layout: flexbox row for devices + center text
- Center text: wrapped in `flex-1 max-w-lg` column
- Headline: `text-5xl lg:text-6xl` (was `text-5xl md:text-7xl`)
- Subtitle: removed explicit `max-w-2xl` (constrained by column width)
- Badge: preserved as-is
- Laptop mockup on left, phone mockup on right (both `hidden lg:block`, `aria-hidden`)
- Trust signals bar at bottom with counter animation
- Device entrance animations via Motion

- [ ] **Step 1: Rewrite hero-section.tsx with new structure**

Replace the entire contents of `src/components/sections/hero-section.tsx`:

```tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HERO, TRUST_SIGNALS } from "@/lib/content/homepage";
import type { TrustSignal } from "@/types";

// -- Counter hook for trust signal animation --
function useCounter(target: number, decimals: number, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    let current = 0;
    const step = decimals > 0 ? 0.1 : Math.ceil(target / 60);

    function tick() {
      current += step;
      if (current >= target) {
        setCount(target);
        return;
      }
      setCount(current);
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, target, decimals]);

  return decimals > 0 ? count.toFixed(decimals) : Math.round(count).toString();
}

// -- Laptop mockup (abstract/stylized website) --
function LaptopMockup() {
  return (
    <div className="w-[300px] flex-shrink-0" style={{ perspective: "1200px" }}>
      <div style={{ transform: "rotateY(18deg)" }}>
        {/* Laptop frame */}
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
          {/* Screen content */}
          <div className="flex h-[180px] flex-col gap-1.5 bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-4">
            {/* Mini nav */}
            <div className="mb-1 flex items-center justify-between">
              <div className="h-1.5 w-12 rounded bg-white/25" />
              <div className="flex gap-2.5">
                <div className="h-1 w-6 rounded bg-white/10" />
                <div className="h-1 w-6 rounded bg-white/10" />
                <div className="h-1 w-6 rounded bg-white/10" />
              </div>
            </div>
            {/* Hero text blocks */}
            <div className="mt-3 flex flex-col items-center gap-1.5">
              <div className="h-2 w-[70%] rounded bg-white/30" />
              <div className="h-1.5 w-[45%] rounded bg-[var(--color-accent)]/50" />
              <div className="mt-0.5 h-1 w-[55%] rounded bg-white/10" />
            </div>
            {/* Cards row */}
            <div className="mt-auto flex gap-2">
              <div className="flex-1 rounded border border-white/5 bg-white/[0.03] p-2">
                <div className="mb-1 h-1 w-[60%] rounded bg-white/15" />
                <div className="h-0.5 w-[80%] rounded bg-white/5" />
              </div>
              <div className="flex-1 rounded border border-white/5 bg-white/[0.03] p-2">
                <div className="mb-1 h-1 w-[50%] rounded bg-white/15" />
                <div className="h-0.5 w-[70%] rounded bg-white/5" />
              </div>
              <div className="flex-1 rounded border border-white/5 bg-white/[0.03] p-2">
                <div className="mb-1 h-1 w-[55%] rounded bg-white/15" />
                <div className="h-0.5 w-[65%] rounded bg-white/5" />
              </div>
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div className="mx-auto h-2.5 w-[320px] rounded-b bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]" />
        <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-[#222]" />
      </div>
    </div>
  );
}

// -- Phone mockup (abstract/stylized mobile site) --
function PhoneMockup() {
  return (
    <div className="w-[100px] flex-shrink-0" style={{ perspective: "1200px" }}>
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
          {/* Screen content */}
          <div className="flex h-[200px] flex-col gap-1.5 rounded-xl bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-3">
            {/* Mobile nav */}
            <div className="flex items-center justify-between">
              <div className="h-1 w-7 rounded bg-white/20" />
              <div className="flex flex-col gap-0.5">
                <div className="h-[1.5px] w-3 bg-white/30" />
                <div className="h-[1.5px] w-2 bg-white/30" />
              </div>
            </div>
            {/* Hero text */}
            <div className="mt-3 flex flex-col items-center gap-1">
              <div className="h-1.5 w-16 rounded bg-white/25" />
              <div className="h-1 w-10 rounded bg-[var(--color-accent)]/40" />
              <div className="mt-1 h-0.5 w-14 rounded bg-white/8" />
            </div>
            {/* CTA button */}
            <div className="mx-auto mt-2 h-3 w-12 rounded bg-[var(--color-accent)]/50" />
            {/* Card */}
            <div className="mt-auto rounded-md border border-white/5 bg-white/[0.03] p-2">
              <div className="mb-1 h-1 w-[70%] rounded bg-white/10" />
              <div className="h-0.5 w-[90%] rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -- Single trust signal with counter --
function TrustSignalItem({
  signal,
  inView,
}: {
  signal: TrustSignal;
  inView: boolean;
}) {
  const display = useCounter(signal.value, signal.decimals ?? 0, inView);

  return (
    <div className="text-center">
      <div className="text-xl font-extrabold text-[var(--color-text)] sm:text-2xl">
        {display}
        {signal.suffix}
      </div>
      <div className="mt-1 text-xs text-[var(--color-text-muted)]">
        {signal.label}
      </div>
    </div>
  );
}

// -- Main hero section --
export function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => HERO.rotatingWords, []);
  const trustRef = useRef<HTMLDivElement>(null);
  const trustInView = useInView(trustRef, { once: true });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative w-full bg-[var(--color-bg)]">
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--dot-color) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-7xl px-6">
        {/* Main content row */}
        <div className="flex items-center justify-center gap-10 py-24 lg:py-40">
          {/* Laptop mockup — left */}
          <motion.div
            className="hidden lg:block"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <LaptopMockup />
          </motion.div>

          {/* Center text content */}
          <div className="flex max-w-lg flex-1 flex-col items-center justify-center gap-8">
            <div>
              <Link href="/referanser">
                <Button variant="secondary" size="sm" className="gap-3">
                  {HERO.badge} <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-5xl font-bold tracking-tight lg:text-6xl">
                <span>{HERO.headline}</span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-extrabold text-[var(--color-accent)]"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>
              <p className="mx-auto text-center text-lg leading-relaxed tracking-tight text-[var(--color-text-muted)] md:text-xl">
                {HERO.subheadline}
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Link href="/kontakt">
                <Button size="lg" variant="secondary" className="gap-3">
                  {HERO.secondaryCta} <PhoneCall className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button size="lg" className="gap-3">
                  {HERO.primaryCta} <MoveRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Phone mockup — right */}
          <motion.div
            className="hidden lg:block"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            aria-hidden="true"
            role="presentation"
          >
            <PhoneMockup />
          </motion.div>
        </div>

        {/* Trust signals bar */}
        <div
          ref={trustRef}
          className="relative z-[5] flex justify-center gap-12 border-t border-[var(--color-border)] py-6 sm:gap-16"
        >
          {TRUST_SIGNALS.map((signal) => (
            <TrustSignalItem
              key={signal.label}
              signal={signal}
              inView={trustInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add dot grid CSS variable to globals.css**

Add `--dot-color` to both light and dark mode blocks in `src/app/globals.css`:

In the `:root` block, add:
```css
--dot-color: rgba(0, 0, 0, 0.04);
```

In the `@media (prefers-color-scheme: dark)` `:root` block, add:
```css
--dot-color: rgba(255, 255, 255, 0.07);
```

**Do NOT commit yet** — continue to Task 4 to complete the atomic change.

---

### Task 4: Update page.tsx — remove standalone trust signals

**Files:**
- Modify: `src/app/page.tsx:4-9` (remove TRUST_SIGNALS import)
- Modify: `src/app/page.tsx:26-38` (remove trust signals section JSX)

- [ ] **Step 1: Remove TRUST_SIGNALS from import**

Change lines 4-9 of `src/app/page.tsx` from:
```ts
import {
  TRUST_SIGNALS,
  TESTIMONIALS,
  FINAL_CTA,
  SOCIAL_PROOF,
} from "@/lib/content/homepage";
```
to:
```ts
import {
  TESTIMONIALS,
  FINAL_CTA,
  SOCIAL_PROOF,
} from "@/lib/content/homepage";
```

- [ ] **Step 2: Remove the trust signals section JSX**

Remove this entire block from `src/app/page.tsx` (lines 26-38):
```tsx
{/* Trust Signals */}
<section className="border-y border-[var(--color-border)] bg-[var(--color-bg-alt)] px-6 py-8">
  <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 text-center">
    {Object.values(TRUST_SIGNALS).map((signal) => (
      <span
        key={signal}
        className="text-sm font-semibold tracking-wide uppercase"
      >
        {signal}
      </span>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: PASS — no errors. All files now use the new TRUST_SIGNALS shape correctly.

- [ ] **Step 4: Commit all changes from Tasks 2-4 atomically**

```bash
git add src/lib/content/homepage.ts src/components/sections/hero-section.tsx src/app/globals.css src/app/page.tsx
git commit -m "feat: redesign hero section with device mockups, dot grid, and trust signals

- Add flanking laptop and phone mockups with 3D perspective
- Add abstract/stylized website content inside device screens
- Add subtle dot grid background pattern
- Integrate trust signals bar with counter animation into hero
- Remove standalone trust signals section from homepage
- Add device entrance animations (staggered fade-in from sides)
- Replace bg-white with var(--color-bg) for consistency"
```

---

## Chunk 3: Visual Verification

### Task 5: Visual verification

- [ ] **Step 1: Start dev server**

Run: `npm run dev`
Open: `http://localhost:3000`

- [ ] **Step 2: Verify desktop layout (lg+)**

Check at 1280px+ width:
- Laptop mockup visible on left with 3D perspective angle
- Centered text with rotating word animation working
- Phone mockup visible on right with 3D perspective angle
- Dot grid background visible (subtle dots)
- Trust signals bar at bottom with numbers + labels
- Device entrance animations play on page load (slide in from sides)
- Badge link present above headline

- [ ] **Step 3: Verify mobile layout (<1024px)**

Resize to ~375px width:
- Device mockups hidden
- Hero is centered text only (same as before)
- Trust signals bar still visible (stacks naturally)
- Rotating word animation still works
- No horizontal overflow

- [ ] **Step 4: Verify dark mode**

Toggle system dark mode:
- Dot grid switches to light dots on dark background
- Device frames stay dark (should look the same)
- Trust signals text uses proper muted colors
- Overall hero background matches rest of site

- [ ] **Step 5: Check for console errors**

Open browser console and verify:
- No React errors
- No hydration mismatches
- No missing module warnings

- [ ] **Step 6: Final polish if needed**

Adjust any visual issues found during verification. Common things to check:
- Device shadow intensity
- Dot grid density (28px spacing)
- Trust signal number animation speed
- Spacing between devices and text
- Headline text wrapping at `lg` breakpoint boundary

---

## File Summary

| File | Action | What Changes |
|------|--------|--------------|
| `src/types/index.ts` | Modify | Add `TrustSignal` interface |
| `src/lib/content/homepage.ts` | Modify | Restructure `TRUST_SIGNALS` to typed array |
| `src/app/globals.css` | Modify | Add `--dot-color` CSS variable |
| `src/components/sections/hero-section.tsx` | Modify | Full rewrite with device mockups, dot grid, trust signals |
| `src/app/page.tsx` | Modify | Remove standalone trust signals section and import |
