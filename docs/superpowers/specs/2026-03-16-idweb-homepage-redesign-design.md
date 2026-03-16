# IDweb Homepage Redesign — Design Spec

## Overview

Redesign the IDweb homepage to convert local Norwegian business owners into leads. The site positions IDweb as a results-focused solo expert using modern technology, with honest trust signals and a value-led conversion funnel.

## Positioning

- **Angle:** Results-focused solo expert + tech-forward digital partner
- **Tone:** Direct, honest, no-fluff Norwegian. Like a skilled tradesperson who knows their craft and explains clearly.
- **Target audience:** Small local service businesses (plumbers, dentists, restaurants) initially, growing into established SMBs (5-50 employees) as the portfolio expands.
- **Key differentiator:** Direct contact with the person who builds. Modern tech (Next.js, React) vs template agencies. Measurable results.

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
- **Project showcase:** Rotating display of best projects using existing device frame components (LaptopFrame).
- **Pagination dots:** 3 dots indicating multiple projects.
- **Floating badge:** "⚡ 98/100 PageSpeed" — glassmorphic yellow-tinted badge, positioned bottom-right.

### Responsive
- Stacks to single column on mobile. Text first, project showcase below.

## Homepage Section Flow (11 Sections)

### Section 1: Hero (described above)

### Section 2: Social Proof Bar
- **Purpose:** Build instant credibility with real stats.
- **Layout:** Compact horizontal bar, light background.
- **Content:** 3-4 real metrics separated by dividers:
  - "5 prosjekter levert"
  - "100% kundetilfredshet"
  - "5.0 ★ vurdering"
  - "Basert i [city]"
- **Change from current:** Replaces inflated "10+ years, 200+ projects" with honest numbers.

### Section 3: Problem Agitation (NEW)
- **Purpose:** Make visitors feel the pain of a bad website.
- **Layout:** 3 cards in a row, dark background.
- **Cards:**
  1. "Treg lasting = tapte kunder" — with speed icon + stat about bounce rates
  2. "Usynlig på Google" — with search icon + stat about local search
  3. "Ser ut som 2015" — with calendar icon + stat about trust and outdated design
- **Transition text:** "Det trenger ikke være slik." — leads into portfolio.
- **Replaces:** Current "Why Us" comparison cards.

### Section 4: Portfolio Showcase
- **Purpose:** Prove quality through real work.
- **Layout:** 2-3 featured case studies (not all 6).
- **Each card:** Device mockups (laptop + mobile), client name, industry tag, 1-line result metric.
- **Interaction:** Click to navigate to /referanser for full case study.
- **Change from current:** Curated to strongest 2-3 projects instead of showing all.

### Section 5: Tech Advantage (NEW)
- **Purpose:** Differentiate from template/WordPress agencies.
- **Layout:** Side-by-side comparison table/visual.
- **Left column:** "Mal-nettside" — Load time 4.2s, PageSpeed 45/100, Ikke mobilvennlig, Generisk design.
- **Right column:** "Skreddersydd nettside" — Load time 0.8s, PageSpeed 98/100, Mobiltilpasset, Unikt design.
- **Visual treatment:** Left side muted/grayed, right side highlighted with yellow accents.

### Section 6: Services Overview
- **Purpose:** Show range of services without overwhelming.
- **Layout:** Bento grid, 4-6 service cards.
- **Each card:** Icon + title + 1-line description + link to /tjenester/[slug].
- **Keep:** Existing bento-services component with refinements.

### Section 7: Process — "Slik jobber jeg"
- **Purpose:** Remove uncertainty about what happens after contact.
- **Layout:** 3-step vertical timeline or horizontal steps.
- **Steps:**
  1. "Gratis samtale" — We discuss your needs and goals
  2. "Design & utvikling" — I build your site with your input along the way
  3. "Lansering & oppfølging" — Launch and ongoing support
- **Key message:** "Du snakker alltid direkte med meg — ingen mellomledd."
- **Keep:** Existing process section structure, refine copy.

### Section 8: Testimonials
- **Purpose:** Social proof through client words.
- **Layout:** 2-3 testimonial cards, clean layout (not marquee).
- **Content:** Placeholder testimonials with realistic Norwegian names and businesses. Will be swapped for real testimonials later.
- **Each card:** Quote, client name, business name, role, star rating.
- **Change from current:** Remove Unsplash stock avatars. Use initials or simple avatar placeholders until real photos are available.

### Section 9: Pricing Preview (NEW)
- **Purpose:** Pre-qualify leads, remove price anxiety.
- **Layout:** Compact section with 3 tier previews.
- **Content:** Brief summary of each tier with starting price ("Fra kr X"). Link to full /priser page.
- **Tone:** Transparent, no "kontakt oss for pris" — Norwegians appreciate knowing upfront.

### Section 10: FAQ Teaser (NEW)
- **Purpose:** Handle top objections before they prevent contact.
- **Layout:** 3-4 questions in accordion style.
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
- **CTA:** Inline contact form (name, email, brief message) + submit button. Reduces friction vs navigating to /kontakt.
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

## Technical Notes

- All new sections are React components in `src/components/sections/`
- Content data stays in `src/lib/content/homepage.ts` — add new entries for new sections
- Existing components to reuse: device frames, bento grid, section wrapper, button
- New components needed: ProblemAgitation, TechAdvantage, PricingPreview, FaqTeaser, SocialProofBar, inline ContactForm
