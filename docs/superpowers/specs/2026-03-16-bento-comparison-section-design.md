# Bento Comparison Section — Design Spec

**Date:** 2026-03-16
**Status:** Approved
**Replaces:** `TechAdvantage` section on homepage + unused `WhyUsSection`

## Overview

Merge two overlapping sections into a single glassmorphism bento grid that contrasts "Typisk byrå" weaknesses against IDweb strengths. Each comparison point gets its own card with a distinct accent color.

## Section Structure

- **Background:** Full-bleed dark (`#0F172A` / `var(--color-dark-bg)`) applied to the outer `<section>` element. Inner content constrained to `max-w-6xl`.
- **Label:** "Hvorfor oss?" in accent yellow, uppercase
- **Heading:** "Ikke alle nettsider er skapt like"
- **Subheading:** "Se forskjellen mellom en typisk leverandør og det vi bygger for deg."
- Add a subtle decorative gradient or noise texture behind the cards so `backdrop-filter` has content to blur against.

## Card Grid

3-column, 3-row bento grid. Each card is a glassmorphism panel with `backdrop-filter: blur(12px)` and a colored tint + border matching its accent.

### Layout (desktop)

| Row | Col 1 | Col 2 | Col 3 |
|-----|-------|-------|-------|
| 1 | Byrå: WordPress + plugins (red) | IDweb: Next.js fra bunnen av (green) | Byrå: 3-5s treg lastetid (red) |
| 2 | IDweb: Direkte til utvikleren (yellow) | IDweb: <1s lastetid (sky blue) | IDweb: PageSpeed 98 (purple) |
| 3 | Byrå: Snakker med en selger (red) | IDweb: 100% skreddersydd (orange) | Byrå: Ferdigmaler (red) |

### Card Types

**Icon cards** (most cards): Type label ("Typisk byrå" or "IDweb") + emoji + title + description
**Stat cards** (<1s, 3-5s, 98): Type label + large bold stat value + smaller unit suffix + title + description

The `type` field (`byrå` | `idweb`) determines the rendered label text: `byrå` → "Typisk byrå", `idweb` → "IDweb".

### Full Card Content

| # | type | icon | stat | unit | title | description |
|---|------|------|------|------|-------|-------------|
| 1 | byrå | 🧱 | — | — | WordPress + plugins | Tunge ferdigløsninger som bremser ytelse og sikkerhet |
| 2 | idweb | ⚡ | — | — | Next.js — fra bunnen av | Moderne rammeverk, lynrask og skalerbar |
| 3 | byrå | — | 3-5 | s | Treg lastetid | Besøkende forlater siden før den laster |
| 4 | idweb | 💬 | — | — | Direkte til utvikleren | Ingen mellomledd — du snakker med den som bygger |
| 5 | idweb | — | <1 | s | Lastetid | Mens typiske sider bruker 3–5 sekunder |
| 6 | idweb | — | 98 | /100 | PageSpeed-score | Typiske byrå-sider scorer 40–60 |
| 7 | byrå | 🤵 | — | — | Snakker med en selger | Mellomledd som ikke kjenner koden |
| 8 | idweb | 🎨 | — | — | 100 % skreddersydd | Designet kun for din bedrift — ingen maler |
| 9 | byrå | 📋 | — | — | Ferdigmaler | Tilpasset «litt» — ser ut som alle andre |

### Color Mapping

| Card | Type | Accent Color |
|------|------|-------------|
| WordPress + plugins | Byrå | red (`#ef4444`) |
| 3-5s treg lastetid | Byrå | red (`#ef4444`) |
| Snakker med en selger | Byrå | red (`#ef4444`) |
| Ferdigmaler | Byrå | red (`#ef4444`) |
| Next.js fra bunnen av | IDweb | green (`#22c55e`) |
| <1s lastetid | IDweb | sky blue (`#38bdf8`) |
| Direkte til utvikleren | IDweb | yellow (`#fbbf24`) |
| PageSpeed 98 | IDweb | purple (`#a855f7`) |
| 100% skreddersydd | IDweb | orange (`#f97316`) |

### Card Styling

```
background: rgba(<accent>, 0.08)
backdrop-filter: blur(12px)
border: 1px solid rgba(<accent>, 0.2-0.25)
border-radius: 14px
padding: 1.2rem
```

Byrå cards use border opacity 0.2. IDweb cards use 0.25.

## TypeScript Types

Add to `src/types/index.ts`:

```typescript
export interface ComparisonCard {
  type: 'byrå' | 'idweb';
  icon?: string;
  stat?: string;
  unit?: string;
  title: string;
  description: string;
  accent: string;
}
```

`icon` and `stat`/`unit` are mutually exclusive: icon cards have `icon`, stat cards have `stat` + `unit`.

## Content Data

All card data lives in `src/lib/content/homepage.ts` as `COMPARISON_GRID: ComparisonCard[]`. Remove the existing `TECH_COMPARISON` object.

## Component

**File:** `src/components/sections/comparison-bento.tsx`

- Named export `ComparisonBento`
- Does NOT reuse `BentoGrid` from `ui/bento-grid.tsx` — that component has different semantics (navigation cards with links, CTA buttons, dot-grid patterns). This section has static display cards with no interactivity. A standalone grid is simpler.
- Uses `motion/react` for staggered entrance animation (each card delayed by `index * 0.1` to match project convention)
- Hover: subtle lift (`translateY(-2px)`) and border opacity increase
- Outer `<section>` has full-bleed dark background. Inner `<div>` uses `max-w-6xl mx-auto px-6`.
- Non-interactive cards — no ARIA roles needed beyond semantic HTML. Type labels are decorative (not headings).

## Responsive Behavior

- **Desktop (`md` / 768px+):** 3-column grid (`grid-cols-3`)
- **Tablet (`sm` / 640px+):** 2-column grid (`grid-cols-2`), last card spans full width (`col-span-2`)
- **Mobile (< 640px):** Single column stack (`grid-cols-1`)

## Homepage Integration

Replace `TechAdvantage` import in `src/app/page.tsx` with `ComparisonBento`. This section is dark, and the next section (`BentoServices`) is also dark. This is intentional — the two dark sections create a visually immersive "dark zone" in the middle of the page. The surrounding sections (PortfolioShowcase above, ProcessSection below) are light, maintaining overall contrast.

## Files to Create/Modify

1. **Create** `src/components/sections/comparison-bento.tsx` — new component
2. **Modify** `src/types/index.ts` — add `ComparisonCard` type
3. **Modify** `src/lib/content/homepage.ts` — add `COMPARISON_GRID`, remove `TECH_COMPARISON`
4. **Modify** `src/app/page.tsx` — swap `TechAdvantage` for `ComparisonBento`
5. **Delete** `src/components/sections/tech-advantage.tsx` — replaced
