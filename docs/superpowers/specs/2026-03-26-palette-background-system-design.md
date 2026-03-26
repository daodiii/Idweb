# Palette Background System

Replace the uniform aurora dark backgrounds with distinct kaleidoscope-derived palette backgrounds per section, giving each section its own color identity across the entire site.

## Decisions

- **Scope:** All pages site-wide (Homepage, Priser, Referanser, Kontakt, Tjenester)
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
  className?: string;       // passed to outer section element
  speed?: number;           // rotation duration in seconds (default: 60)
  blur?: number;            // blur amount in px (default: 55)
  intensity?: number;       // gradient opacity 0-1 (default: 0.8)
  fromDeg?: number;         // conic-gradient starting angle (default: 0)
  children: React.ReactNode;
}
```

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
| Services Grid | "horisonten" |

## What Stays Unchanged

- **Light sections:** SocialProofBar, PortfolioShowcase, ServiceFeatureSteps, FaqTeaser (light-section-warm backgrounds)
- **Yellow CTA:** CtaSection homepage (yellow gradient)
- **Card styles:** Glass-morphism cards (backdrop-blur, border-white/5, etc.)
- **GlowingEffect component:** Independent of background system
- **Text colors:** var(--color-dark-text), var(--color-dark-muted) — same contrast
- **Rainbow button:** Own color system (--color-1 through --color-5)
- **CSS variables:** --color-dark-bg, --color-dark-text, etc. all retained

## Files Changed

**New (1):**
- `src/components/ui/palette-background.tsx`

**Deleted (2):**
- `src/components/ui/aurora-background.tsx`
- `src/components/ui/kaleidoscope-background.tsx`

**Modified (~18 section files):**
- Swap AuroraBackground/KaleidoscopeBackground imports to PaletteBackground
- Add palette prop to each usage

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
