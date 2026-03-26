# Palette Background System

Replace the uniform aurora dark backgrounds with distinct kaleidoscope-derived palette backgrounds per section, giving each section its own color identity across the entire site.

## Decisions

- **Scope:** All pages site-wide (Homepage, Priser, Referanser, Kontakt, Tjenester, Om Oss) plus the global Footer and shared service section components
- **Hero:** One fixed palette (no rotation UI). Best palette chosen during implementation — either an existing one or a new 6th palette if warranted.
- **Background treatment:** Slow ambient drift — blurred conic gradient rotating at 60s+. Barely perceptible movement that feels premium without affecting readability.
- **Architecture:** New `<PaletteBackground>` React component replaces both `AuroraBackground` and `KaleidoscopeBackground`.
- **Aurora fate:** Delete entirely. One unified system.

## The 5 Palettes

| ID | Name | Colors | Mood |
|----|------|--------|------|
| horisonten | Horisonten | #0B132B, #1C2541, #3A506B, #5BC0BE, #F4F4F4, #FF6B6B | Ocean calm, teal confidence |
| stille-spenning | Stille Spenning | #1A1A1D, #4E4E50, #6F2232, #950740, #C3073F, #EAEAEA | Tension, urgency, contrast |
| drommeslor | Drommeslor | #1F1D36, #3F3351, #864879, #E9A6A6, #F0F0F0, #2E2E2E | Dreamy, creative, approachable |
| orkenblomst | Orkenblomst | #3E2723, #6D4C41, #D7CCC8, #FFAB91, #FF7043, #FFF3E0 | Warm desert, inviting |
| kosmos | Kosmos | #0F0F1B, #1B1B2F, #16213E, #533483, #E94560, #F5F5F5 | Cosmic drama, high energy |

## PaletteBackground Component

**File:** `src/components/ui/palette-background.tsx`

**Props:**

```typescript
interface PaletteBackgroundProps {
  palette: "horisonten" | "stille-spenning" | "drommeslor" | "orkenblomst" | "kosmos";
  as?: React.ElementType;   // polymorphic element type (default: "section"). Footer uses as="footer".
  className?: string;       // passed to outer element
  speed?: number;           // rotation duration in seconds (default: 60)
  blur?: number;            // blur amount in px (default: 55)
  intensity?: number;       // gradient opacity 0-1 (default: 0.8)
  fromDeg?: number;         // conic-gradient starting angle (default: 0)
  children: React.ReactNode;
}
```

**Client component:** Uses `"use client"` directive. IntersectionObserver initialized in `useEffect`.

**Color order in conic gradient:** Colors used in array order as listed in the palettes table (dark → mid → accent → light). This is the order from the original kaleidoscope and produces smooth gradients because adjacent colors have natural transitions.

**Noise texture:** Inline SVG data URI in a `background-image` CSS property on a `::before` pseudo-element or dedicated div. Same technique as the current aurora component (SVG feTurbulence filter, `baseFrequency="0.9"`, `numOctaves="4"`). No external file.

**Starfield:** Dropped. The current aurora starfield was only enabled on a few sections and disabled on most text-heavy pages. The palette gradient provides enough visual interest without it.

**Internal layers (bottom to top):**

1. **z-0 — Base:** `bg-[var(--color-dark-bg)]` (#0a0a0a)
2. **z-1 — Conic gradient:** `conic-gradient(from {fromDeg}deg, ...colors, colors[0])`. Blurred (`filter: blur({blur}px) saturate(160%)`), opacity set by `intensity`. Slow CSS rotation animation.
3. **z-2 — Noise texture:** SVG feTurbulence overlay at ~3% opacity (carried over from current aurora).
4. **z-3 — Dark vignette:** `radial-gradient(ellipse at 50% 50%, rgba(10,10,10,0.25) 0%, transparent 70%)` for center readability.
5. **z-10 — Children:** Section content renders on top.

**Performance:**

- `will-change: transform` on the gradient layer for GPU compositing
- IntersectionObserver pauses CSS animation when section is out of viewport (toggle `animation-play-state`)
- Only 1-2 gradients animating at any given scroll position

**Accessibility:**

- `prefers-reduced-motion` media query: animation disabled, static gradient shown
- `aria-hidden="true"` on all decorative layers
- Existing dark theme text colors maintain WCAG contrast on new backgrounds

## Migration Map

### Homepage (/)

| Section | Current | New |
|---------|---------|-----|
| HeroSection | KaleidoscopeBackground (rotating, interactive) | PaletteBackground "horisonten" (fixed, no UI controls) |
| ComparisonBento | AuroraBackground (center, 0.10) | PaletteBackground "stille-spenning" |
| ProcessSection | AuroraBackground (center) | PaletteBackground "drommeslor" |
| PricingPreview | AuroraBackground (bottom-left) | PaletteBackground "orkenblomst" |
| TestimonialGrid | AuroraBackground (top-left) | PaletteBackground "kosmos" |

### Priser (/priser)

| Section | New |
|---------|-----|
| Pricing Hero | "orkenblomst" |
| Build Packages | "horisonten" |
| Maintenance | "drommeslor" |
| Add-ons | "stille-spenning" |
| Pricing FAQ | "drommeslor" |
| Pricing CTA | "kosmos" |

### Referanser (/referanser)

| Section | New |
|---------|-----|
| Portfolio Hero | "horisonten" |
| Project sections | Cycle through all 5 palettes (index % 5) |
| Portfolio CTA | "kosmos" |

### Kontakt (/kontakt)

| Section | New |
|---------|-----|
| Contact Hero | "drommeslor" |
| Contact Form | "kosmos" |

### Tjenester (/tjenester)

| Section | New |
|---------|-----|
| Services Hero | "stille-spenning" |

Note: The Services Grid on the index page does not use AuroraBackground — no change needed there.

### Tjenester shared section components (used across service pages)

| Component | Current | New |
|-----------|---------|-----|
| service-hero.tsx | AuroraBackground (top-center) | PaletteBackground "stille-spenning" |
| service-bento-features.tsx | AuroraBackground (center) | PaletteBackground "horisonten" |
| service-process.tsx | AuroraBackground (bottom-left) | PaletteBackground "drommeslor" |
| service-faq.tsx | AuroraBackground (bottom-right) | PaletteBackground "orkenblomst" |

### Om Oss (/om-oss)

| Section | Current | New |
|---------|---------|-----|
| Hero | AuroraBackground (top-center, 0.25) | PaletteBackground "horisonten" |
| Story | AuroraBackground (center, 0.15) | PaletteBackground "drommeslor" |
| Values | AuroraBackground (bottom-left, 0.2) | PaletteBackground "stille-spenning" |
| Approach | AuroraBackground (top-right, 0.15) | PaletteBackground "orkenblomst" |
| CTA | AuroraBackground (bottom-center, 0.25) | PaletteBackground "kosmos" |

### Footer (global, every page)

| Component | Current | New |
|-----------|---------|-----|
| footer.tsx | AuroraBackground (as="footer", bottom-center, 0.05) | PaletteBackground (as="footer", "kosmos", intensity=0.4) — subtle, low intensity to not overpower footer content |

## What Stays Unchanged

- **Light sections:** SocialProofBar, PortfolioShowcase, ServiceFeatureSteps, FaqTeaser (light-section-warm backgrounds)
- **Yellow CTA:** CtaSection homepage (yellow gradient)
- **Card styles:** Glass-morphism cards (backdrop-blur, border-white/5, etc.)
- **GlowingEffect component:** Independent of background system
- **Text colors:** var(--color-dark-text), var(--color-dark-muted) — same contrast
- **Rainbow button:** Own color system (--color-1 through --color-5)
- **CSS variables:** --color-dark-bg, --color-dark-text, etc. all retained
- **Pages without AuroraBackground:** /faq, /blogg, /personvern, /vilkar — these use plain backgrounds and are not affected
- **Tjenester index Services Grid:** Plain div, no background component — not affected

## Files Changed

**New (1):**
- `src/components/ui/palette-background.tsx`

**Deleted (2):**
- `src/components/ui/aurora-background.tsx`
- `src/components/ui/kaleidoscope-background.tsx`

**Modified (~24 section/page files):**
- Swap AuroraBackground/KaleidoscopeBackground imports to PaletteBackground
- Add palette prop to each usage
- Files: hero-section.tsx, comparison-bento.tsx, process-section.tsx, pricing-preview.tsx, testimonial-grid.tsx, service-hero.tsx, service-bento-features.tsx, service-process.tsx, service-faq.tsx, footer.tsx, priser/page.tsx (6 sections), referanser/page.tsx (3+ sections), kontakt/page.tsx (2 sections), om-oss/page.tsx (5 sections), tjenester/page.tsx (1 section)

**Responsive note:** ProcessSection renders two AuroraBackground wrappers (desktop and mobile). Both get the same palette ("drommeslor"). The component handles its own responsive layout — PaletteBackground does not need responsive variants.

**CSS (globals.css):**
- Remove: `aurora-drift`, `kaleidoscope-spin` keyframes, `.kaleidoscope` class, `.aurora-glow-layer` class
- Add: `palette-drift` keyframe (single slow rotation)
- Keep: all dark theme CSS variables (--color-dark-bg, etc.)

## Palette Mapping Rationale

Each palette is assigned based on emotional fit:

- **Horisonten** (ocean/teal) → Hero, main packages, portfolio hero — calm confidence for first impressions
- **Stille Spenning** (reds) → Comparison, add-ons, services hero — tension and contrast for competitive positioning
- **Drommeslor** (purples) → Process, maintenance, FAQ, contact hero — dreamy and approachable for guidance moments
- **Orkenblomst** (warm) → Pricing sections — warm and inviting, makes pricing feel non-threatening
- **Kosmos** (cosmic pink) → Testimonials, CTAs, contact form — high energy for conversion moments

Palette assignments can be adjusted during implementation by changing the `palette` prop.
