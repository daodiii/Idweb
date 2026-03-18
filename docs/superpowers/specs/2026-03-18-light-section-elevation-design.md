# Light Section Elevation Design

**Date:** 2026-03-18
**Goal:** Elevate all light/white landing page sections to match the premium quality of the dark sections (hero, bento, comparison). The dark sections demonstrate creative innovation; the light sections must demonstrate professional polish at the same craft level.

**Principle:** The dark/light duality is intentional brand positioning — dark = creative/innovative, light = professional/clean. Both must feel equally *designed*.

---

## 1. Global Light Section Foundation

### Background Treatment
- Replace flat `var(--color-bg)` (`#F5F7F8`) backgrounds with a subtle radial gradient warmth
- Add a barely-visible gold radial gradient: `radial-gradient(ellipse at 70% 20%, rgba(244,206,20,0.025), transparent 60%)`
- Apply per-section with slight position variation to avoid repetition
- This eliminates the "flat template" feel without adding visible decoration

### Spacing Upgrade
- Increase light section vertical padding from `py-20 sm:py-28` to `py-24 sm:py-32`
- ~20% more breathing room signals confidence and premium positioning
- Apply to: portfolio showcase, blog section, pricing sections, social proof

### Scroll Animations
- Add consistent staggered fade-in reveals to light section content
- Animation: `opacity: 0 → 1, y: 16 → 0` with 80ms stagger between sibling elements
- Use existing `use-scroll-animation` hook patterns
- Match the orchestrated entrance quality of dark sections
- Respect `prefers-reduced-motion`

---

## 2. Dark-to-Light Transitions

### Gradient Fade Zones
- Add CSS pseudo-element to bottom of dark sections: gradient from dark bg → transparent over last 120px
- Hero bottom: fade from `#0C1220` toward `#F5F7F8`
- Other dark→light boundaries: same treatment with section-appropriate dark color
- Implementation: CSS `::after` pseudo-element with `pointer-events-none`

### Visual Bridging
- Portfolio section devices can be positioned to visually overlap section boundaries where layout allows
- Gold accent color (`#F4CE14`) should appear in both the last dark element and first light element at each transition

---

## 3. Typography Scale-Up (Light Sections Only)

### Heading Size Increase
- Light section main headings: `text-3xl sm:text-4xl` → `text-4xl sm:text-5xl lg:text-6xl`
- Add `tracking-tight` to large headings for editorial feel
- Applies to: portfolio showcase, blog section, pricing hero, feature steps

### Weight Contrast
- Headings: `font-bold` or `font-extrabold` (700-800)
- Subheadings/descriptions: `font-normal` or `font-light` (300-400)
- The dramatic weight jump creates hierarchy that reads as intentionally designed

---

## 4. Portfolio Showcase Refinements

### Background Depth
- Add subtle radial gradient behind device cluster: `radial-gradient(ellipse at center, rgba(244,206,20,0.04), transparent 70%)`
- Creates a "spotlight" effect on the showcase without visible decoration

### Stat Badges
- Increase badge size slightly (text and padding bump)
- Enhance glassmorphism: stronger `backdrop-blur` (from `sm` to `md`), slightly more opaque backgrounds

### Entrance Animation
- Staggered scroll-triggered entrance for the device group
- Devices enter with slight scale (0.95 → 1) and opacity (0 → 1)
- Stat badges enter 200ms after devices with upward float

---

## 5. Blog Section Asymmetric Layout

### Hero Card Pattern
- First article spans 2 columns in the 3-column grid (`col-span-2`)
- Larger image area, bigger title text (`text-xl sm:text-2xl`), more padding
- Remaining articles stay in standard single-column grid cells

### Card Styling Upgrade
- Remove visible borders on all blog cards
- Rely on shadow depth + white background against the section's slightly warm bg
- Increase border-radius from `rounded-2xl` to `rounded-3xl`
- On hover: deeper shadow with gold tint (`shadow-[var(--color-accent)]/8`)

---

## 6. Pricing Cards Differentiation

### Standard Cards
- Remove borders, use shadow-only elevation
- Slightly increase padding for more breathing room
- Softer border-radius (`rounded-2xl` → `rounded-3xl`)

### Highlighted (Popular) Card
- Keep existing dark background treatment
- Add subtle gold glow: `shadow-2xl shadow-[var(--color-accent)]/20`
- Increase the lift offset slightly

### Spacing
- Increase gap between pricing cards from `gap-8` to `gap-10`

---

## 7. Accent Color Threading

Ensure gold `#F4CE14` appears as a subtle accent in every light section:
- Portfolio: stat badge borders (already present), section eyebrow color
- Blog: category badge accent, hover shadow tint
- Pricing: checkmark color (already present), highlighted card glow
- Feature steps: active step indicator (already present)
- This creates visual continuity across the dark/light boundary

---

## Scope Boundaries

**IN SCOPE:**
- CSS/styling changes to light sections
- Animation additions to light sections
- Typography scale adjustments
- Section transition treatments
- Blog layout restructure (hero card pattern)

**OUT OF SCOPE:**
- Dark sections (hero, bento, comparison, Aurora sections) — untouched
- Font or color palette changes
- Component architecture restructuring
- New dependencies
- Content changes (Norwegian text stays as-is)

---

## Backup Strategy
- Create backup branch before any changes
- All changes are CSS/styling only — easily reversible via git

---

## Files to Modify

1. `src/app/globals.css` — subtle background gradient utilities, transition zone styles
2. `src/components/ui/section.tsx` — optional warm gradient variant
3. `src/components/sections/portfolio-showcase.tsx` — background depth, badge sizing, entrance animation
4. `src/components/ui/blogs.tsx` — hero card layout, card styling upgrade
5. `src/app/priser/page.tsx` — pricing card refinements
6. `src/components/ui/feature-section.tsx` — typography scale, scroll animations
7. `src/app/page.tsx` — section spacing adjustments, transition zones
