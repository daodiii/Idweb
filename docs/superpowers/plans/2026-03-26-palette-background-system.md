# Palette Background System Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all AuroraBackground and KaleidoscopeBackground usages site-wide with a new PaletteBackground component that renders distinct, slow-drifting conic gradients per section.

**Architecture:** Single new `PaletteBackground` component with palette data, IntersectionObserver for viewport-aware animation pausing, and polymorphic `as` prop. Each dark section gets a named palette. Old components are deleted after migration.

**Tech Stack:** React 19, Next.js App Router ("use client"), Tailwind CSS 4, CSS animations, IntersectionObserver API

**Spec:** `docs/superpowers/specs/2026-03-26-palette-background-system-design.md`

---

## Chunk 1: Build the PaletteBackground Component

### Task 1: Create palette-background.tsx with palette data and rendering

**Files:**
- Create: `src/components/ui/palette-background.tsx`

- [ ] **Step 1: Create the component file with palette data, props, and all layers**

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

const PALETTES = {
  horisonten: ["#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#F4F4F4", "#FF6B6B"],
  "stille-spenning": ["#1A1A1D", "#4E4E50", "#6F2232", "#950740", "#C3073F", "#EAEAEA"],
  drommeslor: ["#1F1D36", "#3F3351", "#864879", "#E9A6A6", "#F0F0F0", "#2E2E2E"],
  orkenblomst: ["#3E2723", "#6D4C41", "#D7CCC8", "#FFAB91", "#FF7043", "#FFF3E0"],
  kosmos: ["#0F0F1B", "#1B1B2F", "#16213E", "#533483", "#E94560", "#F5F5F5"],
} as const;

export type PaletteId = keyof typeof PALETTES;

interface PaletteBackgroundProps {
  palette: PaletteId;
  as?: React.ElementType;
  className?: string;
  speed?: number;
  blur?: number;
  intensity?: number;
  fromDeg?: number;
  children: ReactNode;
}

export function PaletteBackground({
  palette,
  as: Tag = "section",
  className = "",
  speed = 60,
  blur = 55,
  intensity = 0.8,
  fromDeg = 0,
  children,
}: PaletteBackgroundProps) {
  const gradientRef = useRef<HTMLDivElement>(null);

  // Pause animation when out of viewport
  useEffect(() => {
    const el = gradientRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const colors = PALETTES[palette];
  const gradient = `conic-gradient(from ${fromDeg}deg, ${colors.join(", ")}, ${colors[0]})`;

  return (
    <Tag className={`relative overflow-hidden bg-[var(--color-dark-bg)] ${className}`}>
      {/* z-1: Conic gradient with slow drift */}
      <div
        ref={gradientRef}
        className="palette-drift pointer-events-none absolute inset-[-20%] z-[1]"
        aria-hidden="true"
        style={{
          background: gradient,
          filter: `blur(${blur}px) saturate(160%)`,
          opacity: intensity,
          animationDuration: `${speed}s`,
          willChange: "transform",
        }}
      />

      {/* z-2: Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* z-3: Dark vignette for readability */}
      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0.25) 0%, transparent 70%)",
        }}
      />

      {/* z-10: Content */}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
```

- [ ] **Step 2: Add the palette-drift CSS animation to globals.css**

Add after the existing `kaleidoscope-spin` keyframe block (which will be removed later). Add this at the end of the kaleidoscope section (around line 236):

```css
/* ── Palette drift animation ── */
@keyframes palette-drift {
  to {
    transform: rotate(360deg);
  }
}

.palette-drift {
  animation: palette-drift 60s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .palette-drift {
    animation: none;
  }
}
```

- [ ] **Step 3: Verify the component builds without errors**

Run: `npx next build 2>&1 | head -20` or `npx tsc --noEmit`
Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/palette-background.tsx src/app/globals.css
git commit -m "feat: add PaletteBackground component with 5 palettes and slow drift animation"
```

---

## Chunk 2: Migrate Homepage Sections

### Task 2: Migrate HeroSection (KaleidoscopeBackground → PaletteBackground)

**Files:**
- Modify: `src/components/sections/hero-section.tsx`

- [ ] **Step 1: Replace KaleidoscopeBackground import and usage**

In `src/components/sections/hero-section.tsx`:
- Remove import: `import { KaleidoscopeBackground } from "@/components/ui/kaleidoscope-background";`
- Add import: `import { PaletteBackground } from "@/components/ui/palette-background";`
- Replace the outer `<section>` with `<PaletteBackground palette="horisonten" className="flex h-svh w-full items-center justify-center">`
- Remove `<KaleidoscopeBackground />` usage
- Remove the readability overlay div (z-[5]) — PaletteBackground has its own vignette layer
- Keep the text content div but change `z-10` to `relative` (it's already inside PaletteBackground's z-10 content wrapper)
- Close with `</PaletteBackground>` instead of `</section>`

The hero-section.tsx should become:

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { HERO } from "@/lib/content/homepage";
import { PaletteBackground } from "@/components/ui/palette-background";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <PaletteBackground palette="horisonten" className="flex h-svh w-full items-center justify-center">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
        >
          <div className="flex flex-col items-center justify-center gap-3 pt-48 sm:flex-row">
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
    </PaletteBackground>
  );
}
```

- [ ] **Step 2: Verify homepage loads without errors**

Run dev server, check homepage loads. Check browser console for errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "refactor: migrate hero section from KaleidoscopeBackground to PaletteBackground"
```

### Task 3: Migrate ComparisonBento

**Files:**
- Modify: `src/components/sections/comparison-bento.tsx`

- [ ] **Step 1: Swap AuroraBackground → PaletteBackground**

In `src/components/sections/comparison-bento.tsx`:
- Replace `import { AuroraBackground } from "@/components/ui/aurora-background";` with `import { PaletteBackground } from "@/components/ui/palette-background";`
- Replace `<AuroraBackground variant="center" className="...">` with `<PaletteBackground palette="stille-spenning" className="...">`
- Replace closing `</AuroraBackground>` with `</PaletteBackground>`
- The inner content div already has `relative z-[1]` — this is now redundant since PaletteBackground wraps children in its own `relative z-10` div, but it won't cause issues (extra relative is harmless)

- [ ] **Step 2: Verify the comparison section renders**

Check homepage, scroll to comparison section. Cards should display against the new red-toned palette.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/comparison-bento.tsx
git commit -m "refactor: migrate comparison section to PaletteBackground stille-spenning"
```

### Task 4: Migrate ProcessSection

**Files:**
- Modify: `src/components/sections/process-section.tsx`

- [ ] **Step 1: Swap AuroraBackground → PaletteBackground**

Replace the AuroraBackground import with PaletteBackground import. Both the desktop and mobile wrappers use AuroraBackground — replace both with `<PaletteBackground palette="drommeslor">`. Keep all other props (className, etc.) the same.

- [ ] **Step 2: Verify process section renders on desktop and mobile viewports**

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/process-section.tsx
git commit -m "refactor: migrate process section to PaletteBackground drommeslor"
```

### Task 5: Migrate PricingPreview

**Files:**
- Modify: `src/components/sections/pricing-preview.tsx`

- [ ] **Step 1: Swap AuroraBackground → PaletteBackground**

Replace import and usage: `<AuroraBackground variant="bottom-left" className="...">` → `<PaletteBackground palette="orkenblomst" className="...">`

- [ ] **Step 2: Verify pricing section renders**

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/pricing-preview.tsx
git commit -m "refactor: migrate pricing preview to PaletteBackground orkenblomst"
```

### Task 6: Migrate TestimonialGrid

**Files:**
- Modify: `src/components/sections/testimonial-grid.tsx`

- [ ] **Step 1: Swap AuroraBackground → PaletteBackground**

Replace import and usage: `<AuroraBackground variant="top-left" className="...">` → `<PaletteBackground palette="kosmos" className="...">`

- [ ] **Step 2: Verify testimonial section renders** (only visible if TESTIMONIALS.length > 0)

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/testimonial-grid.tsx
git commit -m "refactor: migrate testimonial grid to PaletteBackground kosmos"
```

### Task 7: Commit all homepage migrations together (checkpoint)

- [ ] **Step 1: Run full build check**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds.

---

## Chunk 3: Migrate Other Pages

### Task 8: Migrate Priser page (/priser)

**Files:**
- Modify: `src/app/priser/page.tsx`

- [ ] **Step 1: Replace AuroraBackground import with PaletteBackground**

- [ ] **Step 2: Replace all 6 AuroraBackground usages with PaletteBackground**

Map each section to its palette per the spec:
1. Pricing Hero → `palette="orkenblomst"`
2. Build Packages → `palette="horisonten"`
3. Maintenance → `palette="drommeslor"`
4. Add-ons → `palette="stille-spenning"`
5. Pricing FAQ → `palette="drommeslor"`
6. Pricing CTA → `palette="kosmos"`

Drop `variant`, `intensity`, and `showStarfield` props (not used by PaletteBackground). Keep `className`.

- [ ] **Step 3: Verify /priser page loads correctly**

- [ ] **Step 4: Commit**

```bash
git add src/app/priser/page.tsx
git commit -m "refactor: migrate priser page to PaletteBackground (6 sections)"
```

### Task 9: Migrate Referanser page (/referanser)

**Files:**
- Modify: `src/app/referanser/page.tsx`

- [ ] **Step 1: Replace AuroraBackground with PaletteBackground**

Map sections:
1. Portfolio Hero → `palette="horisonten"`
2. Project sections → cycle palettes using index: `palette={PALETTE_ORDER[index % PALETTE_ORDER.length]}`
   Define at top of file: `const PALETTE_ORDER = ["horisonten", "stille-spenning", "drommeslor", "orkenblomst", "kosmos"] as const;`
3. Portfolio CTA → `palette="kosmos"`

- [ ] **Step 2: Verify /referanser page loads with different palette per project**

- [ ] **Step 3: Commit**

```bash
git add src/app/referanser/page.tsx
git commit -m "refactor: migrate referanser page to PaletteBackground with rotating palettes"
```

### Task 10: Migrate Kontakt page (/kontakt)

**Files:**
- Modify: `src/app/kontakt/page.tsx`

- [ ] **Step 1: Replace AuroraBackground with PaletteBackground**

Map sections:
1. Contact Hero → `palette="drommeslor"`
2. Contact Form → `palette="kosmos"`

- [ ] **Step 2: Verify /kontakt page loads correctly**

- [ ] **Step 3: Commit**

```bash
git add src/app/kontakt/page.tsx
git commit -m "refactor: migrate kontakt page to PaletteBackground"
```

### Task 11: Migrate Tjenester index page (/tjenester)

**Files:**
- Modify: `src/app/tjenester/page.tsx`

- [ ] **Step 1: Replace AuroraBackground with PaletteBackground for the Services Hero only**

Services Hero → `palette="stille-spenning"`. The Services Grid does not use AuroraBackground — leave it alone.

- [ ] **Step 2: Verify /tjenester page loads correctly**

- [ ] **Step 3: Commit**

```bash
git add src/app/tjenester/page.tsx
git commit -m "refactor: migrate tjenester hero to PaletteBackground stille-spenning"
```

### Task 12: Migrate Om Oss page (/om-oss)

**Files:**
- Modify: `src/app/om-oss/page.tsx`

- [ ] **Step 1: Replace AuroraBackground with PaletteBackground for all 5 sections**

Map sections:
1. Hero → `palette="horisonten"`
2. Story → `palette="drommeslor"`
3. Values → `palette="stille-spenning"`
4. Approach → `palette="orkenblomst"`
5. CTA → `palette="kosmos"`

- [ ] **Step 2: Verify /om-oss page loads correctly**

- [ ] **Step 3: Commit**

```bash
git add src/app/om-oss/page.tsx
git commit -m "refactor: migrate om-oss page to PaletteBackground (5 sections)"
```

### Task 13: Migrate shared service section components

**Files:**
- Modify: `src/components/sections/service-hero.tsx`
- Modify: `src/components/sections/service-bento-features.tsx`
- Modify: `src/components/sections/service-process.tsx`
- Modify: `src/components/sections/service-faq.tsx`

- [ ] **Step 1: Replace AuroraBackground in all 4 files**

Map:
1. service-hero.tsx → `palette="stille-spenning"`
2. service-bento-features.tsx → `palette="horisonten"`
3. service-process.tsx → `palette="drommeslor"`
4. service-faq.tsx → `palette="orkenblomst"`

- [ ] **Step 2: Verify a service page renders correctly** (navigate to any /tjenester/[slug] page)

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service-hero.tsx src/components/sections/service-bento-features.tsx src/components/sections/service-process.tsx src/components/sections/service-faq.tsx
git commit -m "refactor: migrate service section components to PaletteBackground"
```

### Task 14: Migrate Footer

**Files:**
- Modify: `src/components/layout/footer.tsx`

- [ ] **Step 1: Replace AuroraBackground with PaletteBackground**

Replace:
```tsx
import { AuroraBackground } from "@/components/ui/aurora-background";
```
With:
```tsx
import { PaletteBackground } from "@/components/ui/palette-background";
```

Replace:
```tsx
<AuroraBackground as="footer" variant="bottom-center" intensity={0.05} className="border-t border-[var(--color-dark-border)]">
```
With:
```tsx
<PaletteBackground as="footer" palette="kosmos" intensity={0.4} className="border-t border-[var(--color-dark-border)]">
```

Replace closing tag accordingly.

- [ ] **Step 2: Verify footer renders on any page**

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/footer.tsx
git commit -m "refactor: migrate footer to PaletteBackground kosmos"
```

---

## Chunk 4: Cleanup — Delete Old Components and CSS

### Task 15: Delete AuroraBackground and KaleidoscopeBackground

**Files:**
- Delete: `src/components/ui/aurora-background.tsx`
- Delete: `src/components/ui/kaleidoscope-background.tsx`

- [ ] **Step 1: Verify no remaining imports of AuroraBackground or KaleidoscopeBackground**

Run: `grep -r "AuroraBackground\|KaleidoscopeBackground" src/ --include="*.tsx" --include="*.ts"`
Expected: No results (all imports migrated).

- [ ] **Step 2: Delete dead code — sticky-scroll-reveal.tsx**

`src/components/ui/sticky-scroll-reveal.tsx` is unused dead code that references aurora CSS variables and imports Starfield. Delete it to avoid build errors when aurora variables are removed.

```bash
rm src/components/ui/sticky-scroll-reveal.tsx
```

- [ ] **Step 3: Delete the old background components**

```bash
rm src/components/ui/aurora-background.tsx src/components/ui/kaleidoscope-background.tsx
```

- [ ] **Step 4: Delete Starfield component**

With both aurora-background.tsx and sticky-scroll-reveal.tsx deleted, the Starfield component (`src/components/ui/starfield.tsx`) has no remaining consumers. Delete it.

```bash
rm src/components/ui/starfield.tsx
```

Verify: `grep -r "Starfield\|starfield" src/ --include="*.tsx" --include="*.ts"` should return no results.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: delete AuroraBackground, KaleidoscopeBackground, Starfield, and dead code"
```

### Task 16: Clean up globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Remove old CSS**

Remove these blocks from globals.css:
- `@keyframes kaleidoscope-spin` and `.kaleidoscope` class (lines ~215-236)
- `@keyframes aurora-drift` and `.aurora-glow-layer` class (lines ~239-260)
- Remove `--kc1` through `--kc6` CSS variables from `:root` (lines ~33-38) — these were for the old kaleidoscope
- Remove `--color-aurora-teal`, `--color-aurora-gold`, `--aurora-noise-opacity` if no longer referenced

Keep:
- All `--color-dark-*` variables
- The new `palette-drift` keyframe (added in Task 1)
- All hero entrance animations (still used)

- [ ] **Step 2: Verify build succeeds**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: remove aurora and kaleidoscope CSS, keep palette-drift"
```

### Task 17: Final verification

- [ ] **Step 1: Run full build**

Run: `npx next build`
Expected: Build succeeds.

- [ ] **Step 2: Visual check of all pages**

Navigate to each page and verify palette backgrounds render:
- `/` (homepage) — 5 dark sections with different palettes
- `/priser` — 6 sections with varied palettes
- `/referanser` — rotating palettes per project
- `/kontakt` — 2 sections
- `/om-oss` — 5 sections
- `/tjenester` — 1 hero section
- Footer on every page — subtle kosmos palette

- [ ] **Step 3: Check prefers-reduced-motion**

Enable reduced motion in OS settings. Verify all palette backgrounds show static gradient (no animation).

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: address issues found during final visual verification"
```
