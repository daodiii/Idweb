# Mobile Hero Animation Upgrade

## Overview

Upgrade the mobile hero section from a static fade-in to a choreographed 4-effect animation system: staggered text reveal, animated aurora background, headline shimmer, and scroll parallax fade-out.

**Goal:** Make the mobile hero as visually impressive as the desktop Spline 3D experience, using lightweight Motion + CSS animations.

## Scope

- **Mobile only** (`lg:hidden` block in `hero-section.tsx`)
- Desktop Spline 3D experience is untouched
- Two files modified: `hero-section.tsx`, `globals.css`
- Zero new dependencies (Motion v12 already installed)

## Animation Choreography

Total entrance duration: ~1.5s

| Effect | Start | End | Mechanism |
|--------|-------|-----|-----------|
| Aurora drift | 0s | continuous 12s loop | CSS `.aurora-glow-layer` (existing) |
| Eyebrow text | 0s | 0.4s | Motion fade + slide up |
| "IDWEB" | 0.15s | 0.5s | Motion variants + staggerChildren |
| "BYGGER" | 0.23s | 0.58s | Motion variants + staggerChildren |
| "DIN" | 0.31s | 0.66s | Motion variants + staggerChildren |
| "NYE" | 0.39s | 0.74s | Motion variants + staggerChildren |
| "NETTSIDE" | 0.47s | 0.82s | Motion variants + staggerChildren |
| Headline shimmer | 0.9s | 1.5s | CSS `@keyframes` single sweep |
| Subheadline | 0.9s | 1.3s | Motion fade in |
| CTA buttons | 1.1s | 1.45s | Motion slide up |
| Scroll parallax | on scroll | 40% progress | Motion useScroll + useTransform |

### Stagger Details

Uses the Motion **variants** API (required for `staggerChildren` to work):

```tsx
const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const headlineWord = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};
```

- Parent `<motion.h1 variants={headlineContainer} initial="hidden" animate="visible">`
- Each word: `<motion.span variants={headlineWord} className="inline-block">`
- Headline text is hardcoded as five separate `<motion.span>` elements (matching current hardcoded approach), separated by `{" "}` for word spacing
- `display: inline-block` on each span (required for transforms to work on inline elements)

### Shimmer Details

The headline uses `background-clip: text` with `text-transparent`, so a `::after` pseudo-element cannot be clipped to the text glyphs. Instead, the shimmer is achieved with a **multi-stop background-image** on the `<h1>` itself:

- The `<h1>` `background-image` becomes a combined gradient: the existing gold gradient PLUS an animated shimmer highlight
- The shimmer highlight is a narrow bright band (`rgba(255,255,255,0.4)`) within the gradient
- **The existing inline `style={{ backgroundImage }}` on the `<h1>` must be removed** — the gold gradient moves into the `.hero-shimmer` CSS class. Inline styles have higher specificity and would override the class.
- Animated via `@keyframes hero-shimmer` which shifts `background-position` to sweep the highlight across
- `background-size: 200% 100%` to allow the sweep travel
- `animation-delay: 0.9s` — waits for all words to be visible
- `animation-duration: 0.6s`
- `animation-fill-mode: forwards` — plays once, does not repeat
- Both the gold gradient and shimmer are clipped via `background-clip: text`, keeping the text-transparent effect intact

### Aurora Details

- The existing mobile aurora gradient div gets the `.aurora-glow-layer` class added
- This class is already defined in `globals.css` with `aurora-drift` keyframes (12s loop, gentle translate + scale)
- No new CSS needed for this effect

### Scroll Parallax Details

- `useScroll({ target: sectionRef, offset: ["start start", "end start"] })` tracks section scroll progress
- `useTransform(scrollYProgress, [0, 0.4], [0, -80])` maps scroll to Y translation
- `useTransform(scrollYProgress, [0, 0.4], [1, 0])` maps scroll to opacity

**DOM structure for parallax scoping:**

The current hero has a single `<motion.div>` wrapper (z-10) that contains both the mobile text block (`lg:hidden`) and the CTA buttons (shared mobile+desktop). To scope parallax to mobile only:

1. Create a **new inner `<motion.div>`** inside the existing z-10 wrapper
2. This inner wrapper is `lg:hidden` and contains: eyebrow, headline, subheadline, AND a duplicate of the CTA buttons for mobile
3. The existing CTA block outside becomes `hidden lg:flex` (desktop only)
4. The scroll-driven `style={{ y: parallaxY, opacity: parallaxOpacity }}` binds to this inner wrapper
5. The existing outer `<motion.div>` keeps its entrance animation (`opacity: 0, y: 30` → `opacity: 1, y: 0` over 0.35s). During the first 0.35s, the outer wrapper's opacity modulates the inner stagger reveals, producing a slightly softer entrance — this is intentional and avoids needing a `useMediaQuery` hook

This ensures:
- Desktop CTAs are unaffected by parallax
- Mobile gets the full choreography including parallax on everything
- No `useMediaQuery` hook needed — pure CSS visibility handles the split

## Reduced Motion Support

- Motion: `useReducedMotion()` hook (already present) — when true, set `initial` to `false` on all animated elements (skips stagger, parallax, entrance animations; shows content immediately)
- CSS: `@media (prefers-reduced-motion: reduce)` disables `aurora-drift` animation (already present) and `hero-shimmer` animation
- All content remains visible — only animation is removed

## Performance

- Motion automatically applies `will-change` for its animated properties (opacity, transform)
- The CSS shimmer uses `background-position` animation which is NOT compositor-friendly, but at 0.6s single-fire it's negligible
- Aurora drift uses `will-change: transform` (already present in `.aurora-glow-layer`)
- Total simultaneous animations at peak: 2 (aurora loop + shimmer sweep) — well within budget for mid-range mobile devices

## Files Modified

### `src/components/sections/hero-section.tsx`

Changes:
1. Add `useRef` import from React; add `useScroll`, `useTransform` imports from `motion/react`
2. Create `sectionRef = useRef<HTMLElement>(null)` and bind to `<section>`
3. Define `headlineContainer` and `headlineWord` variant objects
4. Create scroll-driven `parallaxY` and `parallaxOpacity` transforms
5. Create a new inner `<motion.div className="lg:hidden">` for mobile content with parallax style bindings:
   - Eyebrow → `<motion.p>` with fade + slide up
   - Headline → `<motion.h1 variants={headlineContainer}>` with five `<motion.span variants={headlineWord}>` children, plus `hero-shimmer` class
   - Subheadline → `<motion.p>` with `delay: 0.9`
   - CTA buttons (mobile duplicate) → `<motion.div>` with `delay: 1.1`
6. Make existing CTA block `hidden lg:flex` (desktop only)
7. Add `.aurora-glow-layer` class to mobile aurora gradient div

### `src/app/globals.css`

Changes:
1. Add `@keyframes hero-shimmer` — shifts `background-position` from right to left
2. Add `.hero-shimmer` styles:
   - `background-image` combining gold gradient + shimmer highlight
   - `background-size: 200% 100%`
   - `animation: hero-shimmer 0.6s ease-in-out 0.9s forwards`
   - `background-clip: text` (maintains existing text-transparent effect)
3. Add `@media (prefers-reduced-motion: reduce)` override for `.hero-shimmer` — disables animation, uses plain gold gradient

## What Is NOT Changing

- Desktop Spline 3D scene — untouched
- `HeroFallback` component — untouched
- Content text (`HERO` constants) — untouched
- Rainbow button styles — untouched
- CTA link targets — untouched
