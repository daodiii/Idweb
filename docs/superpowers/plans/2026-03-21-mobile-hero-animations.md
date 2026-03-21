# Mobile Hero Animation Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the mobile hero from a static fade-in to a choreographed 4-effect animation (staggered text reveal, animated aurora, headline shimmer, scroll parallax).

**Architecture:** Motion variants API for text stagger and scroll parallax. CSS keyframes for aurora drift (existing) and headline shimmer. DOM restructured to scope parallax to mobile-only inner wrapper with duplicate CTA buttons.

**Tech Stack:** Motion v12 (`motion/react`), CSS keyframes, Tailwind CSS 4

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/sections/hero-section.tsx` | Modify | Add variants, scroll hooks, restructure DOM for mobile parallax |
| `src/app/globals.css` | Modify | Add `@keyframes hero-shimmer` and `.hero-shimmer` class |

---

## Chunk 1: CSS Shimmer

### Task 1: Add hero-shimmer keyframes and class to globals.css

**Files:**
- Modify: `src/app/globals.css:142` (after the existing `aurora-glow-layer` reduced-motion block)

- [ ] **Step 1: Add `@keyframes hero-shimmer` and `.hero-shimmer` class**

Insert after line 142 (after the `aurora-glow-layer` reduced-motion block):

```css
/* ── Hero headline shimmer (single sweep) ── */
@keyframes hero-shimmer {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: -50% 50%;
  }
}

.hero-shimmer {
  background-image:
    linear-gradient(
      90deg,
      #D4A017 0%,
      #D4A017 35%,
      rgba(255, 255, 255, 0.4) 50%,
      #8B6914 65%,
      #8B6914 100%
    );
  background-size: 200% 100%;
  background-position: 100% 50%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: hero-shimmer 0.6s ease-in-out 0.9s both;
}

@media (prefers-reduced-motion: reduce) {
  .hero-shimmer {
    background-image: linear-gradient(135deg, #D4A017, #8B6914);
    background-size: 100% 100%;
    animation: none;
  }
}
```

- [ ] **Step 2: Verify the CSS compiles**

Run: `npx next build 2>&1 | head -20` or check the dev server for CSS errors.
Expected: No build errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add hero-shimmer CSS keyframes and class"
```

---

## Chunk 2: Hero Section Refactor

### Task 2: Update imports and add hooks

**Files:**
- Modify: `src/components/sections/hero-section.tsx:1-14`

- [ ] **Step 1: Update imports**

Replace lines 1-4:

```tsx
"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
```

- [ ] **Step 2: Add ref and scroll transforms inside the component**

After line 14 (`const prefersReducedMotion = useReducedMotion();`), add:

```tsx
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
```

- [ ] **Step 3: Bind ref to section element**

Change line 17 from:
```tsx
    <section className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[var(--color-dark-bg)]">
```
To:
```tsx
    <section ref={sectionRef} className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[var(--color-dark-bg)]">
```

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: add scroll hooks and section ref for hero parallax"
```

---

### Task 3: Add animation variants

**Files:**
- Modify: `src/components/sections/hero-section.tsx` (above the component, after imports)

- [ ] **Step 1: Define variant objects**

Add after the imports (before `export function HeroSection()`):

```tsx
const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const headlineWord = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", delay },
  }),
};
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: add Motion animation variants for hero stagger"
```

---

### Task 4: Add aurora-glow-layer class to mobile aurora div

**Files:**
- Modify: `src/components/sections/hero-section.tsx:22-32`

- [ ] **Step 1: Add the class**

Change line 23 from:
```tsx
        className="pointer-events-none absolute inset-0 z-[1] lg:hidden"
```
To:
```tsx
        className="aurora-glow-layer pointer-events-none absolute inset-0 z-[1] lg:hidden"
```

- [ ] **Step 2: Verify aurora animation works in dev**

Open the dev server on mobile viewport. The aurora gradient blobs should now gently drift on a 12s loop.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: activate aurora drift animation on mobile hero"
```

---

### Task 5: Restructure mobile text block with stagger + shimmer + parallax

This is the main refactor. Replace the entire mobile text block and CTA section.

**Files:**
- Modify: `src/components/sections/hero-section.tsx:48-89` (the z-10 text content div)

- [ ] **Step 1: Replace the text content block**

Replace everything from `{/* Layer 10: Text content */}` through the closing `</motion.div>` and its parent `</div>` (lines 47-89) with:

```tsx
      {/* Layer 10: Text content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        >
          {/* Mobile hero — staggered reveal with parallax */}
          <motion.div
            className="mb-8 lg:hidden"
            style={
              prefersReducedMotion
                ? undefined
                : { y: parallaxY, opacity: parallaxOpacity }
            }
          >
            <motion.p
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-4 text-xs font-semibold tracking-[0.2em] text-[var(--color-dark-muted)]"
            >
              {HERO.eyebrow}
            </motion.p>

            <motion.h1
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
              className="hero-shimmer bg-clip-text text-4xl font-black leading-[1.1] tracking-tight text-transparent sm:text-5xl"
            >
              {["IDWEB", "BYGGER", "DIN", "NYE", "NETTSIDE"].map(
                (word, i) => (
                  <motion.span
                    key={word}
                    variants={headlineWord}
                    className="inline-block"
                  >
                    {word}
                    {i < 4 && " "}
                  </motion.span>
                ),
              )}
            </motion.h1>

            <motion.p
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              custom={0.9}
              className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--color-dark-muted)]"
            >
              {HERO.subheadline}
            </motion.p>

            {/* Mobile CTAs */}
            <motion.div
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              custom={1.1}
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/referanser"
                className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-bold`}
              >
                {HERO.primaryCta}{" "}
                <MoveRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/kontakt"
                className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-medium`}
              >
                {HERO.secondaryCta}
              </Link>
            </motion.div>
          </motion.div>

          {/* Desktop CTAs (no parallax, no stagger) */}
          <div className="hidden flex-col items-center justify-center gap-3 sm:flex-row lg:flex">
            <Link
              href="/referanser"
              className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-bold`}
            >
              {HERO.primaryCta}{" "}
              <MoveRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/kontakt"
              className={`${RAINBOW_BUTTON_CLASSES} gap-2 px-6 py-3 text-sm font-medium`}
            >
              {HERO.secondaryCta}
            </Link>
          </div>
        </motion.div>
      </div>
```

Note: The inline `style={{ backgroundImage }}` is removed from the `<h1>` — the gold gradient now comes from the `.hero-shimmer` CSS class. Regular spaces (not `\u00A0`) are used between words to allow natural word-wrapping on narrow viewports.

- [ ] **Step 2: Verify the build compiles**

Run: `npx next build 2>&1 | head -30`
Expected: No TypeScript or build errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: add staggered text reveal, shimmer, and scroll parallax to mobile hero"
```

---

## Chunk 3: Visual Verification

### Task 6: Verify all 4 effects on mobile viewport

- [ ] **Step 1: Open dev server at mobile viewport (375px)**

Check:
1. Aurora gradient blobs drift slowly (12s loop)
2. Eyebrow text fades in first
3. Headline words appear one by one left-to-right (~0.08s between each)
4. Gold shimmer sweeps across headline once after words are visible
5. Subheadline fades in after headline
6. CTA buttons slide up last
7. Scrolling down causes text to fade out and translate upward

- [ ] **Step 2: Verify desktop is unaffected**

Check at 1280px viewport:
1. Spline 3D scene still renders
2. CTA buttons appear (no stagger animation, just the existing fade)
3. No parallax on scroll
4. No shimmer visible (headline is not shown on desktop)

- [ ] **Step 3: Verify reduced motion**

Enable `prefers-reduced-motion: reduce` in browser dev tools:
1. All text appears immediately (no stagger, no slide)
2. No aurora drift
3. No shimmer sweep
4. No parallax on scroll
5. Gold gradient still visible on headline

- [ ] **Step 4: Final commit if any tweaks were needed**

```bash
git add -A
git commit -m "fix: adjust mobile hero animation timing"
```
