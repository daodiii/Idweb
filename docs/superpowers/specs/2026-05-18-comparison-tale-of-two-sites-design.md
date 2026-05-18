# Comparison Section — "Tale of Two Sites" Design Spec

**Date:** 2026-05-18
**Status:** Approved
**Author:** IDweb / Ilyas

---

## Problem

The current `comparison-bento.tsx` lays out two columns of bullet rows: "Typisk byrå" on the left, "IDweb" on the right. Each row pairs a small stat with a one-line description. It reads as a list — visitors skim it and move on. It tells, doesn't show. For an agency whose pitch is "we ship faster, cleaner sites than WordPress shops," a list of words is the weakest possible proof.

## Goal

Replace the two-column bullet comparison with a synchronized **dual-browser race**: two mini browser windows side-by-side, each rendering a different loading experience. The left ("Typisk byrå") struggles — skeletons, spinners, a cookie banner, layout shifts, slow PageSpeed. The right ("IDweb") loads instantly — staggered fade-in, no shifts, fast PageSpeed. A metrics readout below counts up the numbers. The section now demonstrates the value prop instead of describing it.

Non-goals:
- No new dependencies
- Don't render real page content — abstract greyscale rectangles communicate the loading state without trying to fake real-looking pages
- Don't remove the `COMPARISON_GRID` data export (kept for potential future use)
- Don't change the existing headline / eyebrow / subhead

## Architecture

### Files

| File | Change |
|------|--------|
| `src/components/ui/tale-of-two-sites.tsx` | **NEW** — the dual-browser component (~400 lines incl. helpers) |
| `src/components/sections/comparison-bento.tsx` | Replace the two-column comparison block with `<TaleOfTwoSites />`; keep headline + eyebrow + subhead + background layers |
| `src/app/globals.css` | Add ~30 lines: progress-bar shimmer, spinner rotation, CLS shake keyframe, reduced-motion guards |
| `src/lib/content/homepage.ts` | No change — `COMPARISON_GRID` stays exported |

### Component boundary

- `TaleOfTwoSites` is the only public export. It owns the rAF state machine and renders both browsers.
- Internal helpers `MiniBrowser`, `MiniPageBYRA`, `MiniPageIDWEB`, `MetricsReadout` are local components in the same file.
- The component is `"use client"` — animation requires the browser. Initial server render shows the "loaded" final state of both browsers to avoid an empty flash; client hydration kicks off the animation loop after a small startup delay.

### State machine

Single rAF loop with a global `Phase`:

```
IDLE → IDWEB_LOADING → BYRA_LOADING → METRICS_COUNTING → HOLDING → RESETTING → (loop)
```

- **IDLE** (0 → 200ms): both browsers blank. Phase advances on time elapsed.
- **IDWEB_LOADING** (200 → 1500ms): IDweb side runs its staggered fade. After 1300ms it's fully loaded; the left side hasn't started yet beyond the initial white-flash skeleton.
- **BYRA_LOADING** (200 → 4600ms): The slow side ticks through its own sub-states based on elapsed time within the phase:
  - 0–500ms: white flash → header skeleton
  - 500–1200ms: hero placeholder (skeleton pulse)
  - 1200–1800ms: hero image pops in (triggers CLS shake on adjacent rows)
  - 1800–2400ms: spinner appears with "LOADING SLIDER…" label
  - 2400–2900ms: sidebar widget renders (second CLS shake)
  - 2900–3500ms: stable
  - 3500–4100ms: cookie banner slides up from bottom (covers content)
  - 4100–4600ms: stable, "cluttered" final state
- **METRICS_COUNTING** (4600 → 6000ms): both PageSpeed numbers count up. IDweb already hit 98 by ~1s relative; the slow side ticks 0 → 47 over 1400ms with a slight stall midway. Bars fill in parallel with the numbers.
- **HOLDING** (6000 → 7500ms): caption "Samme innhold. Helt forskjellig opplevelse." fades in; everything else holds.
- **RESETTING** (7500 → 7700ms): cross-fade out (200ms), then loop back to IDLE.

Notes:
- IDweb's loading runs **in parallel** with the byrå loading — that's the point. The phase name reflects which side is the focus of the current beat, but rendering uses elapsed time from a single phase clock.
- Loop pauses when `document.visibilityState !== "visible"`.

### Visual breakdown

Each mini-browser:
- Outer container: `rounded-2xl border border-white/[0.08] bg-[#0c0c0e]`, width 100% up to 460px, fixed aspect ~ 4:3 (height ~ 340px).
- **Title bar** (28px): traffic-light dots, centered URL pill in mono, refresh/forward icons faint.
- **Loading progress bar** (3px row beneath title bar): yellow `#F4CE14` filling left-to-right; IDweb fills smoothly in 600ms ease-out; byrå inches with a 1.5s stall midway and completes at 4.4s.
- **Page area** (rest of the height): the rendered content blocks (see below).

**IDweb page area** (clean):
- Header row (32px): logo dot + 3 nav dots
- Hero block (96px tall): solid darker rectangle, hint of yellow gradient at 18%
- Content row 1 (text lines simulated by stacked 2px-tall bars)
- Content row 2 (same)
- Footer strip (16px)
- All five blocks fade in staggered (60ms apart) during the load phase, no layout shift, no spinners

**Byrå page area** (chaotic):
- Header row (same)
- Hero block — first appears as skeleton (pulsing gradient), then jumps to solid image (causes other rows to shift down)
- "LOADING SLIDER…" spinner — a rotating arc with mono caption, on a dim row below hero
- Sidebar widget — appears late, displaces existing content
- Cookie banner — full-width yellow-tinted bar slides up from the bottom edge, covering ~30% of the page area
- Visible at end: cluttered five-element stack with cookie banner overlay
- Each new element animates `translateY` to push others down (CLS shake — siblings get a 200ms `transform: translateY(2px)` impulse using a keyframe, then back)

**Metrics readout** (below both browsers):
- A 3-row mini table, mono font:
  - PageSpeed: meter bar + animated count (byrå 47 red-tinted, IDweb 98 yellow)
  - Lastetid: "4.6 s" vs "0.8 s" (count down/up animation optional; static OK)
  - Layout-skift: "Høy" vs "Null" (text only)
- Bars: 8 segments each, fill from left, byrå fills slowly and stops at 5/10, IDweb fills smoothly to 10/10
- Numbers use `tabular-nums` to prevent width jitter while counting

**Caption** (at the bottom, after 6s):
- `Samme innhold. Helt forskjellig opplevelse.`
- Centered, font-serif italic in `text-white/55`

### Responsive behavior

- **≥1024px (lg)**: side-by-side dual-browser, full visual treatment
- **768–1023px (md)**: same layout but slightly smaller; metrics row stays beneath
- **640–767px (sm)**: browsers stack vertically; animation still runs but one above the other
- **<640px**: dual-browser hidden entirely. Replace with a static text summary:
  ```
  Typisk byrå: 4.6 s lastetid · PageSpeed 47
  IDweb:       0.8 s lastetid · PageSpeed 98
  ```
  in mono on a dark card. The headline above still does the heavy lifting.

### Accessibility

- The browser visualization is `role="img"` with `aria-label="Sammenligning: sakte WordPress-side mot rask IDweb-side"`
- All inner content marked `aria-hidden="true"`
- Caption "Samme innhold..." is a regular `<p>` (semantic, not in the role=img)
- `prefers-reduced-motion: reduce`: renders the final state of both browsers (IDweb clean, byrå cluttered) with metrics fully filled and the caption visible. No rAF loop, no animations.
- The mobile static fallback is fully accessible plain text

### Performance budget

- All animation runs via a single `requestAnimationFrame` loop, paused on tab blur
- Animations are pure `transform` and `opacity`; no layout-property changes (the "CLS shake" is a transform impulse — visually communicates shift without actual layout reflow)
- Browser content is rendered with `<div>` blocks and Tailwind classes — no SVG filters, no canvas, no images on the loading sequence
- No new dependencies; no font additions
- The slow-loading visualization isn't actually slow — it's deterministic, ~400 frames over 7.5 seconds, single rAF callback per frame

### What's removed

From `comparison-bento.tsx`:
- The `ComparisonRow` internal component (no other consumers)
- The `byråItems` / `idwebItems` filter calls
- The `"vs."` watermark span
- The "01 / Slik det vanligvis er" and "02 / Slik vi gjør det" column headers

Kept:
- Eyebrow ("Hvorfor oss?")
- Headline ("Ikke alle nettsider er skapt like.")
- Subhead ("Slik ser forskjellen ut mellom et typisk byrå og det vi leverer.")
- Background layers (radial glow + dotted grid)
- The dark section wrapper itself

The data export `COMPARISON_GRID` stays in `homepage.ts` — not deleted, just not referenced by this section anymore.

## Error handling

This is a deterministic visualization. No real failure modes. Edge cases:
- Tab backgrounded mid-animation: rAF loop pauses on `visibilityState !== "visible"`, resumes from current state when visible again
- `prefers-reduced-motion` toggled after mount: initial-load value wins (acceptable; vanishingly rare)
- JS disabled: client component renders nothing — the headline + caption (if part of static markup) still convey the message; the dual-browser is a decoration

## Testing

Visual change, no business logic. Verification:
1. Browser preview at `localhost:3000`, scrolled to the comparison section
2. Observe full 7.5s cycle: IDweb loads first → byrå struggles → metrics count up → caption appears → reset
3. Resize to mobile (375px): static text summary appears, dual-browser hidden
4. DevTools rendering panel: enable `prefers-reduced-motion: reduce` → final state of both shown, no animation
5. CPU throttle 4x in DevTools: animation stays smooth
6. `web-design-guidelines` audit pass

## Out of scope

- Real-time Web Vitals measurement (the 47 and 98 are brand statements, not telemetry)
- Pulling real WordPress page screenshots (the abstract greyscale rectangles are the design)
- Localizing the byrå URL to a real domain (using `wpagency.no` as a generic placeholder; if it resolves to a real site we'll change to `slow-agency.no` or similar non-existent domain)
- Mobile animated version (intentionally static below 640px)
- Hover interactions on the browsers (no clicks, no tooltips)
