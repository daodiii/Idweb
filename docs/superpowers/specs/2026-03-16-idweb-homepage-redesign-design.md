# IDweb Homepage Redesign — Design Spec

## Overview

Redesign the IDweb homepage to convert local Norwegian business owners into leads. The site positions IDweb as a results-focused solo expert using modern technology, with honest trust signals and a value-led conversion funnel.

## Positioning

- **Angle:** Results-focused solo expert + tech-forward digital partner
- **Tone:** Direct, honest, no-fluff Norwegian. Like a skilled tradesperson who knows their craft and explains clearly.
- **Target audience:** Small local service businesses (plumbers, dentists, restaurants) initially, growing into established SMBs (5-50 employees) as the portfolio expands.
- **Key differentiator:** Direct contact with the person who builds. Modern tech (Next.js, React) vs template agencies. Measurable results.
- **Voice:** First-person singular ("jeg", "meg", "min") throughout all copy. Replace all existing "vi" / "oss" with "jeg" / "meg" to match solo-expert positioning. Exception: legal pages can remain formal/neutral.

## Hero Section — "Proof First" Split Layout

### Structure
- **Layout:** Two-column split. Text left, project showcase right.
- **Background:** Dark (#0F172A) with existing interactive grid component.

### Left Column
- **Eyebrow:** `5 PROSJEKTER · 5 FORNØYDE KUNDER · 100% TILFREDSHET` — yellow (#F4CE14), uppercase, tracked.
- **Headline:** `Din nettside skal jobbe for deg — ikke mot deg` — Crimson Pro, ~3.5rem, bold. "jobbe for deg" highlighted in yellow.
- **Subheadline:** `Bygget med moderne teknologi. Optimalisert for Google. Designet for å konvertere besøkende til kunder.` — muted text, 1.1rem.
- **CTAs:** Primary yellow button "Se mine prosjekter →" + secondary ghost button "Få et tilbud".

### Right Column
- **Project showcase:** Auto-rotating carousel (5s interval) of best 3 projects using existing `LaptopFrame` component. Uses Motion `AnimatePresence` for crossfade transitions.
- **Featured projects:** Configurable via `FEATURED_PORTFOLIO_IDS` array in `homepage.ts`. Default: Solberg Interiør, Haugen Elektro, Nordfjord Bakeri (pick 3 strongest visually).
- **Pagination dots:** 3 dots below the frame. Active dot = yellow, inactive = muted. Clickable to jump to specific project.
- **Floating badge:** "⚡ 98/100 PageSpeed" — glassmorphic yellow-tinted badge (`bg-[rgba(244,206,20,0.12)] border border-[rgba(244,206,20,0.25)]`), positioned absolute bottom-right of the showcase container.
- **Removes:** Current rotating word animation (`rotatingWords`) — replaced by the project carousel. The static three-device-frame layout is replaced by the single LaptopFrame carousel.

### Responsive
- Stacks to single column on mobile (< 768px). Text first, project showcase below.
- Carousel dots and floating badge remain visible on mobile.
- Hero padding reduces from `py-24` to `py-16` on mobile.

## Homepage Section Flow (11 Sections)

### Section 1: Hero (described above)

### Section 2: Social Proof Bar
- **Purpose:** Build instant credibility with real stats.
- **Background:** Light (#F5F7F8).
- **Layout:** Compact horizontal bar, centered, items separated by `·` or thin dividers.
- **Content:** 4 real metrics:
  - "5 prosjekter levert"
  - "100% kundetilfredshet"
  - "5.0 ★ vurdering"
  - "Basert i Drammen" *(update to actual city)*
- **Change from current:** Replaces inflated "10+ years, 200+ projects" with honest numbers.

### Section 3: Problem Agitation (NEW)
- **Purpose:** Make visitors feel the pain of a bad website.
- **Background:** Dark (#0F172A).
- **Layout:** 3 cards in a row.
- **Cards:**
  1. "Treg lasting = tapte kunder" — with speed icon + stat about bounce rates
  2. "Usynlig på Google" — with search icon + stat about local search
  3. "Ser ut som 2015" — with calendar icon + stat about trust and outdated design
- **Transition text:** "Det trenger ikke være slik." — leads into portfolio.
- **Replaces:** Current "Why Us" comparison cards.

### Section 4: Portfolio Showcase
- **Purpose:** Prove quality through real work.
- **Background:** Light (#F5F7F8).
- **Layout:** 2-3 featured case studies (uses same `FEATURED_PORTFOLIO_IDS` from hero config).
- **Each card:** LaptopFrame + PhoneFrame mockups side by side, client name, industry tag, first result from `results` array in `portfolio.ts`.
- **Interaction:** Click navigates to `/referanser` page.
- **Change from current:** Curated to strongest 2-3 projects instead of showing all 6.

### Section 5: Tech Advantage (NEW)
- **Purpose:** Differentiate from template/WordPress agencies.
- **Background:** Light (#F5F7F8).
- **Layout:** Two styled cards side by side (not a `<table>`). Each card is a glassmorphic panel.
- **Left card — "Mal-nettside":**
  - Muted/grayed styling: `opacity-60`, gray border, red ✗ icons.
  - Metrics: Lastetid 4.2s, PageSpeed 45/100, Ikke mobilvennlig ✗, Generisk design ✗.
- **Right card — "Skreddersydd nettside":**
  - Highlighted: yellow border, yellow ✓ checkmarks, subtle glow.
  - Metrics: Lastetid 0.8s, PageSpeed 98/100, Mobiltilpasset ✓, Unikt design ✓.
- **Responsive:** Stacks vertically on mobile, left card on top.

### Section 6: Services Overview
- **Purpose:** Show range of services without overwhelming.
- **Background:** Dark (#0F172A).
- **Layout:** Bento grid, 6 service cards. Uses existing `bento-services.tsx` component (currently exists but is not on the homepage — add it).
- **Each card:** Icon + title + 1-line description + link to /tjenester/[slug].
- **Note:** This replaces `ServiceFeatureSteps` on the homepage. `BentoServices` already exists as a standalone component.

### Section 7: Process — "Slik jobber jeg"
- **Purpose:** Remove uncertainty about what happens after contact.
- **Background:** Light (#F5F7F8).
- **Layout:** 3-step vertical timeline (desktop) / stacked cards (mobile).
- **Steps:**
  1. "Gratis samtale" — We discuss your needs and goals
  2. "Design & utvikling" — I build your site with your input along the way
  3. "Lansering & oppfølging" — Launch and ongoing support
- **Key message:** "Du snakker alltid direkte med meg — ingen mellomledd."
- **Keep:** Existing process section structure, refine copy.

### Section 8: Testimonials
- **Purpose:** Social proof through client words.
- **Background:** Dark (#0F172A).
- **Layout:** 3 testimonial cards in a horizontal row (not marquee). Build new `TestimonialGrid` component — do NOT modify existing `testimonials-with-marquee.tsx` (may be used on other pages later).
- **Content:** 3 placeholder testimonials with realistic Norwegian names and businesses. Will be swapped for real testimonials later. Keep existing testimonial data in `homepage.ts` but trim to 3.
- **Each card:** Glassmorphic card with quote, client name, business name, role, 5-star rating.
- **Avatars:** Colored circle with initials (e.g., "EL" for Erik Larsen). Use deterministic color from name hash. No stock photos.
- **Responsive:** Stacks to single column on mobile.

### Section 9: Pricing Preview (NEW)
- **Purpose:** Pre-qualify leads, remove price anxiety.
- **Background:** Light (#F5F7F8).
- **Layout:** Compact section with 3 cards (matching existing `PACKAGES` from `pricing.ts`).
- **Each card:** Tier name + starting price ("Fra kr X") + 2-3 key features. Pulls from existing `pricing.ts` data — no duplicate content.
- **Footer:** "Se alle detaljer →" link to `/priser`.
- **Tone:** Transparent, no "kontakt oss for pris" — Norwegians appreciate knowing upfront.

### Section 10: FAQ Teaser (NEW)
- **Purpose:** Handle top objections before they prevent contact.
- **Background:** Dark (#0F172A).
- **Layout:** 4 questions in accordion style (click to expand/collapse).
- **Questions:**
  - "Hvor lang tid tar det å lage en nettside?"
  - "Hva om jeg allerede har en nettside?"
  - "Hva koster vedlikehold?"
  - "Trenger jeg virkelig en skreddersydd nettside?"
- **Footer:** Link to full /faq page.

### Section 11: Final CTA
- **Purpose:** Convert.
- **Layout:** Full-width section with yellow gradient background.
- **Headline:** "Klar for en nettside som faktisk leverer?"
- **CTA:** Inline contact form with 3 fields:
  - Name (text input, required)
  - Email (email input, required, validated client-side)
  - Message (textarea, optional, placeholder: "Fortell kort om prosjektet ditt")
  - Submit button: "Send forespørsel"
- **Form backend:** Next.js API route at `/api/contact`. Sends email via Resend (or similar email API). Returns JSON `{ success: true }` or `{ error: string }`.
- **Success state:** Form replaced by green checkmark + "Takk! Jeg tar kontakt innen 24 timer."
- **Error state:** Red inline error message below form: "Noe gikk galt. Prøv igjen eller send e-post til [email]."
- **Client-side validation:** Required fields highlighted with red border + "Vennligst fyll ut dette feltet" on blur.
- **Shared component:** Same `ContactForm` component used on both homepage CTA and `/kontakt` page. `/kontakt` version adds optional phone and company fields.
- **Keep:** Existing CTA section structure, add inline form.

## Pages — Full Site Map

### Core Pages (redesign/improve)
| Page | Changes |
|------|---------|
| `/` | Full 11-section redesign (this spec) |
| `/tjenester/[slug]` | Keep existing 6 service detail pages — no changes needed |
| `/referanser` | Strengthen with real screenshots, result metrics, industry tags |
| `/priser` | Keep current 3-tier pricing |
| `/kontakt` | Add inline contact form (name, email, message) |
| `/om-oss` | Rewrite to tell honest self-taught story as a strength |

### Supporting Pages (keep as-is)
| Page | Status |
|------|--------|
| `/blogg` | Keep — SEO content engine |
| `/faq` | Keep — objection handling |
| `/personvern` | Keep — legal |
| `/vilkar` | Keep — legal |

## Content Changes

### Trust Signals — Replace Inflated Stats
| Current (fake) | New (real) |
|----------------|------------|
| "10+ års erfaring" | "5 prosjekter levert" |
| "200+ prosjekter" | "100% kundetilfredshet" |
| "98% tilfredshet" | "5.0 ★ vurdering" |
| "5.0 vurdering" | "Basert i [city]" |

### About Page Rewrite
- Frame self-taught journey as a strength
- Key message: "Jeg lærte webdesign ved å bygge ekte nettsider for ekte bedrifter — ikke i et klasserom."
- Emphasize: practical, results-driven, always learning, every client happy

### Testimonials
- Use realistic placeholder data for now
- Structure: quote, client name, business name, role, rating
- Plan to collect real testimonials from 5 existing clients and swap in

## Sections Removed from Current Site

| Section | Reason | Replaced By |
|---------|--------|-------------|
| Client Logo Marquee | Fake logos hurt trust | Social Proof Bar with real stats |
| "Why Us" Comparison Cards | Generic | Problem Agitation + Tech Advantage |
| Blog Articles on Homepage | Lower conversion priority | Blog stays at /blogg in nav |
| ServiceFeatureSteps | Redundant | Simplified Process section |

## Design System — No Changes

The existing design system is strong and distinctive. Keep:

- **Fonts:** Crimson Pro (headings), Outfit (body), JetBrains Mono (code)
- **Colors:** Yellow accent (#F4CE14) on navy (#0F172A) / light gray (#F5F7F8)
- **Effects:** Interactive grid, glassmorphism, sticky scroll, Motion animations
- **Dark mode:** CSS variable swap via prefers-color-scheme
- **Layout:** max-w-6xl (1152px), px-6 padding

## Section Background Pattern

Alternating dark/light for visual rhythm:

| Section | Background |
|---------|-----------|
| 1. Hero | Dark (#0F172A) + interactive grid |
| 2. Social Proof Bar | Light (#F5F7F8) |
| 3. Problem Agitation | Dark (#0F172A) |
| 4. Portfolio Showcase | Light (#F5F7F8) |
| 5. Tech Advantage | Light (#F5F7F8) *(same as above, visually grouped)* |
| 6. Services Overview | Dark (#0F172A) |
| 7. Process | Light (#F5F7F8) |
| 8. Testimonials | Dark (#0F172A) |
| 9. Pricing Preview | Light (#F5F7F8) |
| 10. FAQ Teaser | Dark (#0F172A) |
| 11. Final CTA | Yellow gradient |

## Animation Specifications

All new sections use the same entrance animation pattern as existing sections:
- **Default entrance:** `motion.div` with `initial={{ opacity: 0, y: 30 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-100px" }}`, `transition={{ duration: 0.6 }}`.
- **Staggered children:** Cards within a section use `staggerChildren: 0.1` on the parent.
- **Problem Agitation cards:** Use `staggerChildren: 0.15` for a slightly more dramatic reveal, since the purpose is to create urgency.
- **Tech Advantage comparison:** Left card animates in from left, right card from right (`x: -30` and `x: 30`).
- **No new animation libraries.** Use existing Motion (framer-motion) setup.

## Technical Notes

- All new sections are React components in `src/components/sections/`
- Content data stays in `src/lib/content/homepage.ts` — add new entries for new sections
- Existing components to reuse: device frames, bento grid, section wrapper, button
- New components needed: `SocialProofBar`, `ProblemAgitation`, `TechAdvantage`, `PricingPreview`, `FaqTeaser`, `TestimonialGrid`, `ContactForm`
- `ContactForm` is shared between homepage CTA and `/kontakt` page (with optional extra fields)
- API route needed: `/api/contact` — accepts POST `{ name, email, message, phone?, company? }`, sends email via Resend or similar
