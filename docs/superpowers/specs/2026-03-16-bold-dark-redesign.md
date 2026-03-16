# Bold & Dark Homepage Redesign

## Summary
Transform IDweb homepage from light gray/yellow to a bold dark navy/slate aesthetic with yellow accents. Add "Hvorfor oss" differentiator section. Add featured images to blog cards. Alternate dark/light sections for visual rhythm.

## Decisions
- **Visual direction:** Bold & Dark — `#0F172A` / `#1E293B` navy + `#F4CE14` yellow accents
- **Differentiator:** Triple edge — personal touch + modern tech + results-focused
- **Blog images:** Unsplash stock photos (curated per post)
- **Section order:** Hero → Hvorfor oss → Services → Process → Blog → Testimonials → CTA
- **Removed:** Social proof one-liner section

## CSS Changes (`globals.css`)
Add dark section variables:
```
--color-dark-bg: #0F172A
--color-dark-bg-alt: #1E293B
--color-dark-text: #F1F5F9
--color-dark-muted: #94A3B8
--color-dark-border: rgba(255, 255, 255, 0.08)
```

## New Component: `why-us-section.tsx`
Location: `src/components/sections/why-us-section.tsx`

Dark background section with:
1. **Header:** Yellow label "Hvorfor velge oss" + heading "Alt du trenger — én kontaktperson"
2. **3 pillar cards** (glass-morphic on dark): Direkte kontakt / Moderne teknologi / Målbare resultater — using Lucide icons (User, Zap, TrendingUp). Middle card has subtle yellow border glow.
3. **Comparison box:** 2-column "Typisk byrå" (red-tinted) vs "IDweb" (yellow-tinted) with bullet points.

## Modified Components

### `hero-section.tsx`
- Background: `linear-gradient(135deg, #0F172A, #1E293B)` with grid texture overlay
- Rotating word: gradient yellow text (`bg-gradient-to-r from-[#F4CE14] to-[#FBBF24]` with `bg-clip-text`)
- Ghost CTA: translucent white border instead of gray
- Trust signals: white text on dark

### `process-section.tsx`
- Wrap in dark background
- `StickyScroll` text adapts to light-on-dark colors

### `blogs.tsx` (homepage featured)
- Keep Unsplash images (already has them)
- Ensure cards work well on light background with current design

### `/blogg/page.tsx`
- Add Unsplash featured images to all 12 blog cards
- Add cover image mapping per slug in blog content
- Cards get image headers with category badge overlay

### `testimonials-with-marquee.tsx`
- Dark background wrapper
- Cards: glass-morphic (`bg-white/4`, `border-white/8`)
- Text colors adapted to light-on-dark

### Final CTA (in `page.tsx`)
- Full yellow gradient background (`from-[#F4CE14] to-[#FBBF24]`)
- Dark text, dark CTA button (inverted)

### `footer.tsx`
- Dark background to match overall theme

### `navbar.tsx`
- Dark glass style on dark sections, adapts on scroll/light sections

## Section Background Pattern
```
Hero:         dark (gradient + grid)
Hvorfor oss:  dark (connected to hero, subtle divider)
Services:     light (existing #F5F7F8)
Process:      dark (gradient + grid)
Blog:         light (#F5F7F8)
Testimonials: dark (gradient)
CTA:          yellow gradient
Footer:       dark
```

## Blog Cover Images
Curate Unsplash images for all 12 posts. Map by slug in a `BLOG_COVER_IMAGES` record. Categories: workspace/tech photos without people, relevant to each post topic.

## Out of Scope
- Mobile responsive adjustments
- Portfolio/referanser page
- Placeholder text replacement
- Contact form backend
- Trust signal verification
