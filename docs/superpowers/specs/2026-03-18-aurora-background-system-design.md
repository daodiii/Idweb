# Aurora Background System — Design Spec

## Summary

Add a unified teal + gold aurora glow with SVG noise texture to all dark sections across the site. Shift dark base color from navy (#0F172A) to near-black (#0C1220). Light sections remain clean white (#F5F7F8). Hard cuts between dark and light sections.

## Goals

- Consistent aurora identity across all dark sections (homepage + service pages)
- Replace scattered ad-hoc gold radial gradients with a single reusable system
- Zero performance cost — static CSS gradients + SVG noise only
- Preserve the Spline 3D hero as-is (it's the statement piece)
- Maintain the dark/light alternating rhythm that communicates "futuristic AND clean"

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Aurora palette | Teal (#06B6D4) + Gold (#F4CE14) | Builds on existing gold accents; teal adds depth without introducing new brand colors |
| Base dark color | Near-black #0C1220 | More dramatic than current navy; aurora glows pop harder; less stark than true black |
| Light sections | No changes (#F5F7F8) | Maximum contrast with dark sections; clean professional counterpoint |
| Section transitions | Hard cut | Bold, intentional visual rhythm; gradient fades look muddy at aurora/white boundary |
| Implementation | Static radial gradients + SVG fractal noise | Zero animation cost; noise texture already used in WhyUsSection |
| Hero section | No changes | Spline 3D is the hero's identity; aurora system applies to all other dark sections |

## CSS Variable Changes

### globals.css

```
/* Before */
--color-dark-bg: #0F172A;
--color-dark-bg-alt: #1E293B;

/* After */
--color-dark-bg: #0C1220;
--color-dark-bg-alt: #151D2E;

/* New aurora variables */
--color-aurora-teal: 6, 182, 212;       /* rgba() friendly */
--color-aurora-gold: 244, 206, 20;      /* rgba() friendly */
--aurora-noise-opacity: 0.03;
```

## New Component: AuroraBackground

**Path:** `src/components/ui/aurora-background.tsx`

A wrapper component that renders teal/gold radial gradient glows + SVG noise overlay behind section content.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"top-left" \| "top-right" \| "top-center" \| "center" \| "bottom-left" \| "bottom-right" \| "bottom-center"` | `"center"` | Controls radial gradient positioning. Varied across sections to avoid repetition. |
| `intensity` | `number` | `0.08` | Glow opacity multiplier (0-1 range). Most sections use default; hero-adjacent sections may use slightly higher. |
| `children` | `ReactNode` | required | Section content |
| `className` | `string` | `""` | Additional classes passed to the wrapper |

### Rendering

1. Outer `<div>` with `position: relative; overflow: hidden;` and `bg-[var(--color-dark-bg)]`
2. Absolute-positioned glow layer with 2-3 `radial-gradient`s positioned per variant
3. Absolute-positioned SVG noise layer at `--aurora-noise-opacity`
4. `{children}` rendered with `position: relative; z-index: 1;` so content sits above glows

### Gradient Specification

Each variant renders 2 radial gradients: one teal, one gold. Both use elliptical shapes sized at **70% width x 50% height** of the container, fading to transparent at 70% of their radius.

**Reference gradient string** (for `top-left` variant at default intensity 0.08):
```css
background:
  radial-gradient(ellipse 70% 50% at 15% 20%, rgba(var(--color-aurora-teal), 0.08) 0%, transparent 70%),
  radial-gradient(ellipse 70% 50% at 60% 70%, rgba(var(--color-aurora-gold), 0.06) 0%, transparent 70%);
```

The gold gradient is always slightly less intense than teal (75% of the `intensity` prop) so teal reads as primary and gold as accent warmth.

**Gradient center positions per variant:**

| Variant | Teal position | Gold position |
|---------|--------------|---------------|
| `top-left` | 15%, 20% | 60%, 70% |
| `top-right` | 85%, 20% | 30%, 65% |
| `top-center` | 50%, 10% | 75%, 60% |
| `center` | 30%, 45% | 70%, 55% |
| `bottom-left` | 20%, 75% | 70%, 30% |
| `bottom-right` | 80%, 70% | 25%, 35% |
| `bottom-center` | 50%, 85% | 40%, 30% |

Percentage-based positions scale naturally across viewport widths. No responsive overrides needed — the ellipses resize proportionally on mobile.

### SVG Noise

```html
<svg class="pointer-events-none absolute inset-0 h-full w-full" style="opacity: var(--aurora-noise-opacity);">
  <filter id="aurora-noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
  </filter>
  <rect width="100%" height="100%" filter="url(#aurora-noise)" />
</svg>
```

Each instance must use `React.useId()` for a unique filter ID to prevent SVG filter collisions when multiple AuroraBackground instances render on the same page. This makes the component a client component (`"use client"`), which is acceptable since it's a thin wrapper with no data fetching.

### Accessibility

The noise texture at 0.03 opacity is imperceptible as a pattern — it reads as subtle grain. No `prefers-reduced-motion` handling needed since there are no animations. The component renders `aria-hidden="true"` on both the glow and noise layers.

### WhyUsSection Migration

`src/components/sections/why-us-section.tsx` already uses an inline SVG data URI noise approach with `bg-[#111827]`. This section should be migrated to use `AuroraBackground` with `variant="center"` to consolidate the noise implementation. Add to the files modified list if this section is rendered on any current page.

## Section-by-Section Application

### Homepage (page.tsx)

| Section | Current Background | New Treatment |
|---------|-------------------|---------------|
| HeroSection | Spline 3D on #0F172A | **No change** — only inherits new --color-dark-bg value |
| SocialProofBar | Light #F5F7F8 | No change |
| PortfolioShowcase | #0F172A + ad-hoc gold glow | AuroraBackground `variant="top-right"` — replaces existing glow |
| ComparisonBento | #0F172A + dual gold/cyan glows | AuroraBackground `variant="center"` — replaces existing glows |
| ServiceFeatureSteps | Light | No change |
| ProcessSection | Linear gradient dark-bg to dark-bg-alt | AuroraBackground `variant="bottom-left"` — replaces linear gradient |
| BlogArticles | Light | No change |
| TestimonialGrid | #0F172A | AuroraBackground `variant="top-left"` |
| PricingPreview | Light #F5F7F8 | No change |
| FaqTeaser | #0F172A | AuroraBackground `variant="bottom-right"` |
| CtaSection | Yellow gradient | No change |

### Service Detail Pages ([slug]/page.tsx)

| Section | Current Background | New Treatment |
|---------|-------------------|---------------|
| ServiceHero | Linear gradient + gold radial | AuroraBackground `variant="top-center"` — replaces both |
| ServicePainPoints | Light | No change |
| ServiceBentoFeatures | Linear gradient 135deg | AuroraBackground `variant="center"` |
| ServiceProcess | Linear gradient 135deg | AuroraBackground `variant="bottom-left"` |
| ServiceTestimonial | Light | No change |
| ServiceFaq | Linear gradient 135deg | AuroraBackground `variant="bottom-right"` |
| ServiceCta | Light | No change |

### Layout Components

| Component | Current | New Treatment |
|-----------|---------|---------------|
| Footer | #0F172A flat | AuroraBackground `variant="bottom-center"` `intensity={0.05}` — subtle, lower intensity |
| Navbar | Semi-transparent dark | **No change** — backdrop-blur handles this |

## Sections Modified

Files that need editing (background replacement):

1. `src/app/globals.css` — CSS variable updates
2. `src/components/ui/aurora-background.tsx` — **New file**
3. `src/components/sections/portfolio-showcase.tsx` — Remove ad-hoc gold glow, wrap with AuroraBackground
4. `src/components/sections/comparison-bento.tsx` — Remove dual glow backdrop, wrap with AuroraBackground
5. `src/components/sections/process-section.tsx` — Replace linear gradient, wrap with AuroraBackground
6. `src/components/sections/testimonial-grid.tsx` — Add AuroraBackground wrapper
7. `src/components/sections/faq-teaser.tsx` — Add AuroraBackground wrapper
8. `src/components/sections/service-hero.tsx` — Replace gradient + gold glow, wrap with AuroraBackground
9. `src/components/sections/service-bento-features.tsx` — Replace linear gradient, wrap with AuroraBackground
10. `src/components/sections/service-process.tsx` — Replace linear gradient, wrap with AuroraBackground
11. `src/components/sections/service-faq.tsx` — Replace linear gradient, wrap with AuroraBackground
12. `src/components/layout/footer.tsx` — Add subtle AuroraBackground wrapper

## What Does NOT Change

- HeroSection (Spline 3D stays as-is)
- All light sections (SocialProofBar, ServiceFeatureSteps, BlogArticles, PricingPreview, ServicePainPoints, ServiceTestimonial, ServiceCta)
- CtaSection (yellow gradient)
- Navbar (semi-transparent backdrop-blur)
- Typography, spacing, content, animations
- No new JS dependencies
- No animated effects added

## Performance Impact

Zero measurable impact:
- CSS `radial-gradient` is composited once on paint, not per-frame
- SVG `feTurbulence` noise filter renders once on paint
- No JavaScript, no animation frames, no WebGL
- No Intersection Observer needed (no animations to pause)
- Total additional DOM: ~3 elements per dark section (glow div, noise svg, content wrapper)
