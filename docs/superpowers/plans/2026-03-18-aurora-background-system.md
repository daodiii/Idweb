# Aurora Background System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unified teal + gold aurora glows with SVG noise texture to all dark sections, replacing scattered ad-hoc gradients with a single reusable `AuroraBackground` component.

**Architecture:** New `AuroraBackground` client component wraps dark section content, rendering positioned radial gradients + SVG noise behind children via absolute positioning. CSS variables centralize colors. Each section gets a different `variant` prop for visual variety.

**Tech Stack:** React 19, Tailwind CSS 4, CSS radial-gradient, SVG feTurbulence

**Spec:** `docs/superpowers/specs/2026-03-18-aurora-background-system-design.md`

---

## Chunk 1: Foundation

### Task 1: Update CSS Variables

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update dark background colors and add aurora variables**

In `globals.css`, inside `:root`, change:
```css
--color-dark-bg: #0F172A;
--color-dark-bg-alt: #1E293B;
```
to:
```css
--color-dark-bg: #0C1220;
--color-dark-bg-alt: #151D2E;

/* Aurora glow palette */
--color-aurora-teal: 6, 182, 212;
--color-aurora-gold: 244, 206, 20;
--aurora-noise-opacity: 0.03;
```

- [ ] **Step 2: Verify the dev server still compiles**

Run: `npm run dev` (or check existing dev server)
Expected: No errors. Site renders with slightly darker backgrounds on all existing dark sections (CSS variable change cascades automatically).

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update dark palette to near-black and add aurora CSS variables"
```

---

### Task 2: Create AuroraBackground Component

**Files:**
- Create: `src/components/ui/aurora-background.tsx`

- [ ] **Step 1: Create the component file**

```tsx
"use client";

import { useId, type ReactNode } from "react";

const VARIANTS = {
  "top-left":    { teal: "15% 20%", gold: "60% 70%" },
  "top-right":   { teal: "85% 20%", gold: "30% 65%" },
  "top-center":  { teal: "50% 10%", gold: "75% 60%" },
  center:        { teal: "30% 45%", gold: "70% 55%" },
  "bottom-left": { teal: "20% 75%", gold: "70% 30%" },
  "bottom-right":{ teal: "80% 70%", gold: "25% 35%" },
  "bottom-center":{ teal: "50% 85%", gold: "40% 30%" },
} as const;

type AuroraVariant = keyof typeof VARIANTS;

type AuroraElement = "section" | "div" | "footer";

interface AuroraBackgroundProps {
  variant?: AuroraVariant;
  intensity?: number;
  as?: AuroraElement;
  children: ReactNode;
  className?: string;
}

export function AuroraBackground({
  variant = "center",
  intensity = 0.08,
  as: Tag = "section",
  children,
  className = "",
}: AuroraBackgroundProps) {
  const filterId = useId();
  const positions = VARIANTS[variant];
  const goldIntensity = intensity * 0.75;

  return (
    <Tag className={`relative overflow-hidden bg-[var(--color-dark-bg)] ${className}`}>
      {/* Aurora glow layer */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: [
            `radial-gradient(ellipse 70% 50% at ${positions.teal}, rgba(var(--color-aurora-teal), ${intensity}) 0%, transparent 70%)`,
            `radial-gradient(ellipse 70% 50% at ${positions.gold}, rgba(var(--color-aurora-gold), ${goldIntensity}) 0%, transparent 70%)`,
          ].join(", "),
        }}
      />

      {/* Noise texture layer */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{ opacity: "var(--aurora-noise-opacity)" }}
      >
        <filter id={filterId}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={3} />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors related to `aurora-background.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/aurora-background.tsx
git commit -m "feat: add AuroraBackground component with variant positioning and SVG noise"
```

---

## Chunk 2: Homepage Dark Sections

### Task 3: Migrate PortfolioShowcase

**Files:**
- Modify: `src/components/sections/portfolio-showcase.tsx`

- [ ] **Step 1: Add AuroraBackground import**

Add at the top of the imports:
```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper with AuroraBackground**

Replace the opening `<section>` tag (line 59):
```tsx
<section
  className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28"
  onKeyDown={handleKeyDown}
  tabIndex={0}
>
```
with:
```tsx
<AuroraBackground variant="top-right" className="px-6 py-20 sm:py-28">
<div onKeyDown={handleKeyDown} tabIndex={0}>
```

And replace the closing `</section>` (line 327) with:
```tsx
</div>
</AuroraBackground>
```

Note: `AuroraBackground` renders `<section>` by default (semantic HTML preserved). The `onKeyDown`/`tabIndex` move to an inner div because they need a focusable element.

- [ ] **Step 3: Remove the ad-hoc gold glow div**

Delete lines 94-103 (the "Radial gold glow" div inside the desktop section):
```tsx
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
```

- [ ] **Step 4: Verify visually in browser**

Check the homepage PortfolioShowcase section. Should see teal+gold aurora glow behind device frames with noise texture. No more isolated gold blob.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/portfolio-showcase.tsx
git commit -m "feat: migrate PortfolioShowcase to AuroraBackground"
```

---

### Task 4: Migrate ComparisonBento

**Files:**
- Modify: `src/components/sections/comparison-bento.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper**

Replace (line 60):
```tsx
<section className="relative bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
```
with:
```tsx
<AuroraBackground variant="center" className="px-6 py-20 sm:py-28">
```

Replace closing `</section>` (line 96) with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: Remove the decorative gradient div**

Delete lines 61-68 (the "Decorative gradient for glassmorphism blur" div):
```tsx
{/* Decorative gradient for glassmorphism blur */}
<div
  className="pointer-events-none absolute inset-0"
  style={{
    background:
      "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(244,206,20,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 80% 70%, rgba(56,189,248,0.05) 0%, transparent 70%)",
  }}
/>
```

- [ ] **Step 4: Remove `relative` from the inner div**

The inner `<div className="relative mx-auto max-w-6xl">` (line 70) no longer needs `relative` since it was only needed to sit above the old gradient. However, keeping `relative` is harmless and content already uses it for stacking. **Leave as-is.**

- [ ] **Step 5: Verify visually in browser**

Check ComparisonBento section. Should see unified teal+gold aurora instead of the old gold+cyan split.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/comparison-bento.tsx
git commit -m "feat: migrate ComparisonBento to AuroraBackground"
```

---

### Task 5: Migrate ProcessSection

**Files:**
- Modify: `src/components/sections/process-section.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper**

Replace (line 60):
```tsx
<section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
```
with:
```tsx
<AuroraBackground variant="bottom-left" className="px-6 py-20 sm:py-28">
```

Replace closing `</section>` (line 80) with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/components/sections/process-section.tsx
git commit -m "feat: migrate ProcessSection to AuroraBackground"
```

---

### Task 6: Migrate TestimonialGrid

**Files:**
- Modify: `src/components/sections/testimonial-grid.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper**

Replace (line 45):
```tsx
<section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
```
with:
```tsx
<AuroraBackground variant="top-left" className="px-6 py-20 sm:py-28">
```

Replace closing `</section>` (line 117) with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/components/sections/testimonial-grid.tsx
git commit -m "feat: migrate TestimonialGrid to AuroraBackground"
```

---

### Task 7: Migrate FaqTeaser

**Files:**
- Modify: `src/components/sections/faq-teaser.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper**

Replace (line 13):
```tsx
<section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
```
with:
```tsx
<AuroraBackground variant="bottom-right" className="px-6 py-20 sm:py-28">
```

Replace closing `</section>` (line 82) with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/components/sections/faq-teaser.tsx
git commit -m "feat: migrate FaqTeaser to AuroraBackground"
```

---

## Chunk 3: Service Page Dark Sections

### Task 8: Migrate ServiceHero

**Files:**
- Modify: `src/components/sections/service-hero.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper and remove old gradients**

Replace the entire opening section (lines 14-25):
```tsx
<section
  className="relative overflow-hidden px-6 py-24 text-center sm:py-32"
  style={{ background: "linear-gradient(180deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
>
  {/* Radial gold glow */}
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(244, 206, 20, 0.1) 0%, transparent 70%)",
    }}
    aria-hidden="true"
  />
```
with:
```tsx
<AuroraBackground variant="top-center" className="px-6 py-24 text-center sm:py-32">
```

Replace closing `</section>` (line 65) with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: The inner `<div className="relative ...">` (line 27) can drop `relative`**

Change `<div className="relative mx-auto max-w-4xl">` to `<div className="mx-auto max-w-4xl">`. The `relative` was only needed to stack above the old gradient div; now `AuroraBackground` handles z-index via its content wrapper.

- [ ] **Step 4: Verify and commit**

```bash
git add src/components/sections/service-hero.tsx
git commit -m "feat: migrate ServiceHero to AuroraBackground"
```

---

### Task 9: Migrate ServiceBentoFeatures

**Files:**
- Modify: `src/components/sections/service-bento-features.tsx`

- [ ] **Step 1: Add AuroraBackground import and remove Section import**

Replace:
```tsx
import { Section } from "@/components/ui/section";
```
with:
```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace Section wrapper and inner gradient div**

Replace lines 39-48:
```tsx
<Section>
  <h2 className="mb-12 text-center text-3xl font-bold text-pretty sm:text-4xl">
    Dette inkluderer
  </h2>

  <div
    className="rounded-3xl p-6 sm:p-10"
    style={{ background: "linear-gradient(135deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
  >
```
with:
```tsx
<AuroraBackground variant="center" className="rounded-3xl px-6 py-20 sm:px-10 sm:py-28">
  <h2 className="mb-12 text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
    Dette inkluderer
  </h2>
```

Note: The `h2` text color changes to `text-[var(--color-dark-text)]` since it's now on a dark background (previously the `Section` wrapper was light, with only the inner div being dark).

Replace lines 68-70:
```tsx
    </div>
  </Section>
```
with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/components/sections/service-bento-features.tsx
git commit -m "feat: migrate ServiceBentoFeatures to AuroraBackground"
```

---

### Task 10: Migrate ServiceProcess

**Files:**
- Modify: `src/components/sections/service-process.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper**

Replace (lines 11-14):
```tsx
<section
  className="px-6 py-20 sm:py-28"
  style={{ background: "linear-gradient(135deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
>
```
with:
```tsx
<AuroraBackground variant="bottom-left" className="px-6 py-20 sm:py-28">
```

Replace closing `</section>` (line 81) with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/components/sections/service-process.tsx
git commit -m "feat: migrate ServiceProcess to AuroraBackground"
```

---

### Task 11: Migrate ServiceFaq

**Files:**
- Modify: `src/components/sections/service-faq.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Replace section wrapper**

Replace (lines 13-16):
```tsx
<section
  className="px-6 py-20 sm:py-28"
  style={{ background: "linear-gradient(135deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
>
```
with:
```tsx
<AuroraBackground variant="bottom-right" className="px-6 py-20 sm:py-28">
```

Replace closing `</section>` (line 71) with:
```tsx
</AuroraBackground>
```

- [ ] **Step 3: Verify and commit**

```bash
git add src/components/sections/service-faq.tsx
git commit -m "feat: migrate ServiceFaq to AuroraBackground"
```

---

## Chunk 4: Footer

### Task 12: Migrate Footer

**Files:**
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Add AuroraBackground import**

```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```

- [ ] **Step 2: Wrap footer content with AuroraBackground**

Replace (line 8):
```tsx
<footer className="border-t border-[var(--color-dark-border)] bg-[var(--color-dark-bg)]">
```
with:
```tsx
<AuroraBackground as="footer" variant="bottom-center" intensity={0.05} className="border-t border-[var(--color-dark-border)]">
```

Replace closing `</footer>` (line 117) with:
```tsx
</AuroraBackground>
```

Note: Using `as="footer"` so the component renders a semantic `<footer>` element instead of `<section>`.

- [ ] **Step 3: Verify and commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "feat: add subtle AuroraBackground to Footer"
```

---

## Chunk 5: Final Verification

### Task 13: Full Visual Verification

- [ ] **Step 1: Check homepage top-to-bottom**

Scroll through the entire homepage. Verify:
- Hero: Spline 3D unchanged, darker background
- PortfolioShowcase: Teal+gold aurora, no isolated gold blob
- ComparisonBento: Unified aurora, no old gold+cyan split
- ProcessSection: Aurora glow bottom-left
- TestimonialGrid: Aurora glow top-left
- FaqTeaser: Aurora glow bottom-right
- Light sections: All unchanged, clean white
- CtaSection: Yellow gradient unchanged
- Footer: Subtle aurora at bottom

- [ ] **Step 2: Check a service detail page**

Navigate to any `/tjenester/[slug]` page. Verify:
- ServiceHero: Aurora glow top-center, no old linear gradient
- ServiceBentoFeatures: Aurora glow center
- ServiceProcess: Aurora glow bottom-left
- ServiceFaq: Aurora glow bottom-right

- [ ] **Step 3: Check mobile viewport**

Resize browser to 375px width. Verify:
- Aurora glows scale proportionally (no clipping or off-balance)
- All content readable
- No horizontal scrolling

- [ ] **Step 4: Check for TypeScript errors**

Run: `npx tsc --noEmit`
Expected: Zero errors.

- [ ] **Step 5: Check for build errors**

Run: `npm run build`
Expected: Build succeeds with no errors.

---

## Excluded from scope

**WhyUsSection** (`src/components/sections/why-us-section.tsx`): The spec mentions migrating this component, but it is not rendered on any current page — it was replaced by `ComparisonBento` during a previous redesign. The file remains in the codebase but is unused. No migration needed.
