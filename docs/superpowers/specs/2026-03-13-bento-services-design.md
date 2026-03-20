# Bento Grid Services Section

## Goal
Replace the plain 3-column services grid on the homepage with a visually striking bento grid layout featuring zigzag wide cards, dot-grid backgrounds, gradient accent borders, and scroll-triggered animations.

## Layout — Zigzag Wide Cards (3 rows x 3 cols)

| Row | Col 1 | Col 2 | Col 3 |
|-----|-------|-------|-------|
| 1 | **Nettsider** (wide, 2 cols) | — | Nettbutikk |
| 2 | SEO | **Digital markedsf.** (wide, 2 cols) | — |
| 3 | Vedlikehold | Grafisk design (wide, 2 cols) | — |

Mobile: single column stack, all cards full-width.

## Card Style
- Light background matching site white (`var(--color-bg)`)
- Subtle dot-grid pattern overlay at low opacity
- Gradient accent border at top (blue to purple)
- Featured wide cards get more prominent gradient
- Each card: Lucide icon, title, description, hover-reveal CTA

## Animations (Motion library)
- **Entrance**: Staggered fade-in + translateY on scroll via InView
- **Hover**: Lift (-4px) + shadow increase + CTA slides up
- **Icon**: Scales down on hover

## Files

### New
- `src/lib/utils.ts` — `cn()` utility (clsx + twMerge)
- `src/components/ui/bento-grid.tsx` — BentoGrid + BentoCard primitives
- `src/components/sections/bento-services.tsx` — Services data + layout

### Modified
- `src/app/page.tsx` — Replace old services grid with `<BentoServices />`

### Dependencies
- `clsx`, `tailwind-merge`

## Decisions
- Use existing `Button` component, not shadcn Button
- Lucide React icons (already installed)
- Motion library for animations (already installed)
- Adapt provided BentoCard pattern to fit project conventions (named exports, CSS variables, Tailwind v4)
