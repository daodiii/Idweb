# Hero Section Redesign — Design Spec

## Problem
The current hero section is text-only: a rotating-word headline, subtitle, and two CTA buttons centered on a plain background. It feels empty and does not visually communicate the company's core offering (building websites).

## Solution
Add flanking device mockups (laptop + phone) with abstract/stylized screen content, a subtle dot grid background, and integrated trust signals — transforming the hero from a text block into a visually rich, space-filling section that communicates "we build excellent websites" at a glance.

## Layout

### Spatial Arrangement
- **Center**: Badge link, headline with rotating words, subtitle, and CTAs (unchanged structure, badge preserved as-is)
- **Left**: Laptop mockup angled inward via CSS `perspective(1200px) rotateY(18deg)`
- **Right**: Phone mockup angled inward via CSS `perspective(1200px) rotateY(-15deg)`
- **Bottom**: Trust signals bar (4 stats) integrated into the hero section with a subtle top border

### CSS Layout Mechanism
The hero content area uses **flexbox** with `items-center justify-center`:
- Container: `flex items-center justify-center gap-10` inside a widened `max-w-7xl` wrapper (replacing current `max-w-6xl`)
- Center text column: `flex-1` with `max-w-lg` (512px) — wider than `max-w-md` to accommodate the existing headline text sizes
- Devices use `flex-shrink-0` to maintain their size
- The existing headline `text-5xl md:text-7xl` and subtitle `max-w-2xl` are adjusted to fit within the center column: headline stays `text-5xl lg:text-6xl`, subtitle constrained to the center column's natural width

### Z-Index Stacking Order (bottom to top)
1. Dot grid background (`z-0`, absolute-positioned div)
2. Device mockups (`z-[1]`)
3. Center text content (`z-[2]`)
4. Trust signals bar (`z-[5]`, at bottom of section)

### Responsive Behavior
- **Desktop (lg+, ≥1024px)**: Full flanked layout — laptop, text, phone side by side
- **Below lg (<1024px)**: Devices hidden via `hidden lg:block` — hero is centered text-only (current behavior preserved)
- No intermediate tablet state for devices — they are either fully visible (lg+) or hidden

### Accessibility
- Device mockups are purely decorative: wrap each in a div with `aria-hidden="true"` and `role="presentation"`
- This prevents screen readers from attempting to parse the abstract div-based content inside devices

## Device Mockups

### Laptop (left side)
- Browser chrome with red/yellow/green dots and URL bar placeholder
- Screen shows abstract/stylized website: mini nav, headline blocks, card grid
- All content is colored rectangles/gradients — not a screenshot
- Subtle box shadow with faint blue glow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,235,0.08)`
- Base/stand element below the screen
- Total dimensions: width ~280-320px, total height ~240-280px (chrome + screen ~200px + base ~20px)

### Phone (right side)
- Phone frame with notch indicator
- Screen shows mobile version of the abstract site: hamburger nav, stacked content, CTA button
- Same shadow treatment as laptop but slightly lighter
- Total dimensions: width ~90-100px, total height ~220-260px (taller than wide, realistic phone proportions)

### Device Height Guidance
The current hero text content (badge + headline + subtitle + CTAs + gaps) is approximately 300-350px tall at desktop. Devices should be **vertically centered** against this text block. At ~240-280px (laptop) and ~220-260px (phone), they fill roughly 70-80% of the text height — substantial enough to feel "large and proud" without exceeding the text area.

### Screen Content Style
- Dark theme inside screens (matches site's dark mode palette)
- Rounded rectangle placeholders for text, buttons, cards
- Blue accent color (`--color-accent`) for highlighted elements
- No real text inside devices — purely geometric/abstract

## Background
- Subtle dot grid pattern across entire hero section
- Implementation: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)` with `background-size: 28px 28px`
- Light mode: use `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)` (dark dots on light bg)
- Replace current `bg-white dark:bg-[var(--color-bg)]` with `bg-[var(--color-bg)]` for consistency with the rest of the site (uses off-white `#fafaf9` instead of pure white)
- No gradient glow — clean and technical

## Trust Signals Integration

### Data Shape Change
The existing `TRUST_SIGNALS` in `homepage.ts` is a flat string object. Restructure to an array of objects to support separate number/label rendering and counter animation:

```ts
export const TRUST_SIGNALS: TrustSignal[] = [
  { value: 10, suffix: "+", label: "Års erfaring" },
  { value: 200, suffix: "+", label: "Leverte prosjekter" },
  { value: 98, suffix: "%", label: "Kundetilfredshet" },
  { value: 5.0, suffix: "", label: "Google-vurdering", decimals: 1 },
];
```

Add `TrustSignal` type in `src/types/index.ts`:
```ts
export interface TrustSignal {
  value: number;
  suffix: string;
  label: string;
  decimals?: number; // for 5.0 display — defaults to 0
}
```

### Display
- Horizontal bar at the bottom of the hero with subtle top border
- Numbers rendered large and bold, labels in small muted text below

### Counter Animation Implementation
Use `useInView` from `motion/react` combined with a `useEffect` + `requestAnimationFrame` loop:

```
1. useInView ref detects when trust bar enters viewport
2. On entry, start a rAF loop that increments a state value from 0 to target
3. Integer values: increment by ceil(target/60) per frame (~1.5s at 60fps)
4. Decimal values (5.0): increment by 0.1 per frame (~0.8s)
5. Display: value.toFixed(decimals ?? 0) + suffix
6. Only run once (guard with a ref flag)
```

This avoids depending on any motion-specific animation primitive that doesn't exist for number counting.

## Animations

All animations use `motion` from `"motion/react"` (already imported in current hero — no new library needed).

### Preserved
- Rotating word animation: spring physics, 2-second interval (unchanged)

### New
- **Device entrance** (mount-based, using `initial` + `animate` — NOT scroll-based):
  - Laptop: `initial={{ x: -40, opacity: 0 }}` → `animate={{ x: 0, opacity: 1 }}`
  - Phone: `initial={{ x: 40, opacity: 0 }}` → `animate={{ x: 0, opacity: 1 }}`
  - Staggered: laptop `transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}`, phone `transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}`
- **Trust signal counters** (scroll-based, via `useInView` + rAF as described above)
- **Dot grid**: Static — no animation

## Component Changes

### `hero-section.tsx` (modify)
- Replace `bg-white dark:bg-[var(--color-bg)]` with `bg-[var(--color-bg)]`
- Widen container from `max-w-6xl` to `max-w-7xl`
- Add dot grid background as absolute-positioned div
- Wrap existing text content in a center column div (`flex-1 max-w-lg`)
- Add laptop mockup div (left, `hidden lg:block`, `aria-hidden="true"`)
- Add phone mockup div (right, `hidden lg:block`, `aria-hidden="true"`)
- Add trust signals bar at bottom of section
- Add Motion entrance animations for devices (`initial` + `animate`)
- Add `useInView` + counter animation for trust signals
- Import `TRUST_SIGNALS` from `@/lib/content/homepage`
- Adjust headline from `text-5xl md:text-7xl` to `text-5xl lg:text-6xl` for center column fit
- Badge link element preserved in its current position (top of center column)

### `src/lib/content/homepage.ts` (modify)
- Restructure `TRUST_SIGNALS` from flat string object to `TrustSignal[]` array
- Import `TrustSignal` type

### `src/types/index.ts` (modify)
- Add `TrustSignal` interface

### `src/app/page.tsx` (modify)
- Remove the standalone trust signals section JSX (the `Object.values(TRUST_SIGNALS).map(...)` block)
- Remove `TRUST_SIGNALS` from the import statement (now only consumed by `hero-section.tsx`)

### No new files needed
- Device mockups are pure JSX/CSS — no images or SVGs required
- All abstract screen content is built with div elements and gradients

## Visual Properties

### Colors
- Device frames: `#1a1a1a` (dark gray)
- Screen backgrounds: `linear-gradient(180deg, #0f172a, #1e293b)` (dark blue-gray)
- Screen content accents: `var(--color-accent)` / `#3b82f6`
- Box shadows: black with subtle blue tint

### Light Mode Adaptation
- Device frames stay dark (devices are always dark — this is realistic)
- Dot grid uses dark dots on light bg (`rgba(0,0,0,0.04)`)
- Trust signals text uses `var(--color-text)` and `var(--color-text-muted)`
- Hero background uses `var(--color-bg)` (off-white, not pure white)

## Out of Scope
- No interactive elements on devices (no hover states on screen content)
- No tablet/iPad mockup — laptop + phone is sufficient
- No real website screenshots — abstract only
- No parallax scrolling effects on devices
