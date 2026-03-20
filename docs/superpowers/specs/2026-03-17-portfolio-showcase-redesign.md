# Portfolio Showcase Redesign — Cinematic Device Stage

**Date:** 2026-03-17
**Status:** Approved
**Goal:** Replace the current flat portfolio grid with a dramatic, cinematic device showcase that impresses visitors immediately.

## Context

The current `PortfolioShowcase` section shows 3 featured projects (Vocura, Brobekk, Center Rahma) using small device frames in a basic 3-column grid on desktop and a phone carousel on mobile. The screenshots are too small to appreciate, there's no visual hierarchy, no stats, and the light background blends with surrounding sections.

### What exists
- `src/components/sections/portfolio-showcase.tsx` — current component (will be rewritten)
- `src/components/ui/device-frame.tsx` — LaptopFrame, TabletFrame, PhoneFrame components (keep as-is)
- `src/lib/content/portfolio-sites.ts` — 6 portfolio sites with desktop/tablet/mobile images
- `src/lib/content/homepage.ts` — `FEATURED_PORTFOLIO_IDS` array (currently 3 sites)
- motion/react already installed and used throughout the site

## Design

### Desktop Layout (md+ breakpoints)

Full-width dark section (`--color-dark-bg`, #0F172A) with:

1. **Section header** — eyebrow label ("VÅRE PROSJEKTER" in accent color, uppercase, tracked), heading ("Prosjekter vi har levert"), and subtitle. Centered.

2. **Device trio** — Flex container (`items-end justify-center gap-5`), max-width scales proportionally within available space. On md (768px) the laptop shrinks to ~280px; on lg+ it reaches ~380px. Z-index: phone z-10, laptop z-20, tablet z-10. Three device frames arranged horizontally, aligned to bottom:
   - **Phone** (left): ~80px wide, elevated 16px from baseline
   - **Laptop** (center, dominant): ~380px wide, sits on baseline. Uses existing `LaptopFrame` which already has `perspective: 1200px` and `rotateY(18deg)` built in — no wrapper transform needed
   - **Tablet** (right): ~120px wide, elevated 8px from baseline
   - All three show the same project's corresponding device screenshots (desktop, tablet, mobile)

3. **Radial gold glow** — `radial-gradient(ellipse, rgba(244,206,20,0.07), transparent 65%)` centered behind the device trio

4. **Project info** — Below devices, centered: project name (bold, white) + domain (muted)

5. **Navigation dots** — Active dot is pill-shaped (24px wide, accent color), inactive are circles (6px, white/15%)

6. **Floating stat badges** — Two glass-blur badges, positioned absolute relative to the device trio container:
   - Bottom-right (`right-4 bottom-4`): PageSpeed score (gold border/text on gold/12% bg)
   - Bottom-left (`left-4 bottom-4`): Key result stat (green border/text on green/12% bg)
   - Per-project stats defined in content data. Only rendered if stats exist for the active project.

7. **CTA link** — "Se alle referanser →" in accent-hover color, centered below dots

### Mobile Layout (<md breakpoint)

- **Phone frame only** — Single large PhoneFrame (280px wide), centered. No laptop/tablet.
- **Swipe gestures** + chevron arrow buttons for navigation
- **Inline stat badges** — Centered row below project info (not floating)
- **Same auto-rotation** behavior as desktop

### Data Shape

Add per-project stats to `FEATURED_PORTFOLIO_IDS` or create a new mapping:

```ts
// Only featured sites need stats — use Partial to avoid requiring all 6 IDs
export const PORTFOLIO_STATS: Partial<Record<PortfolioSiteId, { pagespeed: string; result: string }>> = {
  vocura: { pagespeed: "98/100", result: "+60% bookinger" },
  brobekk: { pagespeed: "96/100", result: "+45% henvendelser" },
  centerrahma: { pagespeed: "97/100", result: "+80% besøkende" },
};
```

Component should gracefully handle missing stats (don't render badges if no stats for active project).

### Animation

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Section header | Scroll into view | Fade in + slide up 30px | 600ms ease-out |
| Device trio | Scroll into view | Fade in + slide up 30px, 200ms delay | 600ms ease-out |
| Project rotation | Auto (5s interval) | Crossfade: opacity 0→1, scale 0.95→1 | 500ms ease-out |
| Stat badges | After devices enter | Slide in from edges, staggered 150ms | 400ms ease-out |
| Badges idle | Continuous | Subtle float (translateY ±3px) | 3s ease-in-out infinite |
| Reduced motion | `prefers-reduced-motion` | All animations → simple opacity fade, no auto-rotation | 200ms |

### Auto-rotation behavior
- 5-second interval between projects
- Pauses on hover (desktop) or touch (mobile)
- Manual click on dots or arrows overrides and resets timer
- Uses `AnimatePresence` with `mode="wait"` for clean transitions

### Interaction
- Dot navigation: click to jump to project
- Arrow buttons (mobile): prev/next with wrap-around
- Swipe (mobile): use `drag="x"` on the frame container with `dragConstraints={{ left: 0, right: 0 }}`. On `onDragEnd`, check if `offset.x > 50` or velocity `> 200` to trigger prev/next. Reset position with `animate`.
- Keyboard: left/right arrow keys cycle projects when dots or section are focused
- CTA link: navigates to `/referanser`

## Files to Modify

| File | Change |
|------|--------|
| `src/components/sections/portfolio-showcase.tsx` | Full rewrite — new cinematic layout |
| `src/lib/content/homepage.ts` | Add `PORTFOLIO_STATS` record |

## Files Unchanged

- `src/components/ui/device-frame.tsx` — existing frames used as-is
- `src/lib/content/portfolio-sites.ts` — existing site data used as-is (note: `ROTATION_SETS` becomes unused and can be removed in a cleanup pass)
- `src/app/page.tsx` — already imports and renders `PortfolioShowcase`

## Accessibility

- Navigation dots have `aria-label` per project
- Arrow buttons have `aria-label` ("Forrige prosjekt", "Neste prosjekt")
- `prefers-reduced-motion`: disable auto-rotation, replace all animations with opacity-only fades
- Device frame images already have descriptive `alt` text via existing components
- Section uses semantic heading hierarchy (h2 for section title)
- Keyboard navigation: left/right arrow keys cycle projects when section/dots are focused

## Success Criteria

1. Screenshots are large enough to actually see the design work (laptop frame ≥380px on desktop)
2. Dark background creates seamless visual flow from hero section
3. All 3 device types shown simultaneously on desktop (proves responsive design)
4. Stats build credibility without being the focus
5. Smooth auto-rotation with clean transitions
6. Mobile version is touch-friendly with large phone frame
7. No layout shift during transitions
8. Respects reduced-motion preferences
