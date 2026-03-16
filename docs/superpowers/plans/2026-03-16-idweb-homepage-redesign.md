# IDweb Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the IDweb homepage from a 7-section layout to an 11-section value-led conversion funnel with honest trust signals, new sections (Problem Agitation, Tech Advantage, Pricing Preview, FAQ Teaser), and a working contact form with API backend.

**Architecture:** Content-first approach — update data files first, then build new section components, then rewire the homepage. Each section is an independent React component in `src/components/sections/` pulling content from `src/lib/content/`. The contact form uses a Next.js API route with Resend for email delivery.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (framer-motion), Lucide React icons, Resend (email API)

**Spec:** `docs/superpowers/specs/2026-03-16-idweb-homepage-redesign-design.md`

---

## File Structure

### New Files
| File | Responsibility |
|------|---------------|
| `src/components/sections/social-proof-bar.tsx` | Section 2: horizontal bar with 4 real trust metrics |
| `src/components/sections/problem-agitation.tsx` | Section 3: 3 pain-point cards + transition text |
| `src/components/sections/portfolio-showcase.tsx` | Section 4: 2-3 featured projects with device frames |
| `src/components/sections/tech-advantage.tsx` | Section 5: template vs custom side-by-side comparison |
| `src/components/sections/testimonial-grid.tsx` | Section 8: 3 testimonial cards with initial avatars |
| `src/components/sections/pricing-preview.tsx` | Section 9: 3 tier preview cards |
| `src/components/sections/faq-teaser.tsx` | Section 10: 4-question accordion |
| `src/components/sections/cta-section.tsx` | Section 11: yellow CTA with inline contact form |
| `src/components/ui/contact-form.tsx` | Shared contact form component (homepage + /kontakt) |
| `src/app/api/contact/route.ts` | API route: accepts POST, sends email via Resend |

### Modified Files
| File | Changes |
|------|---------|
| `src/lib/content/homepage.ts` | Replace HERO, TRUST_SIGNALS, TESTIMONIALS, FINAL_CTA, add FEATURED_PORTFOLIO_IDS, PROBLEM_CARDS, TECH_COMPARISON, FAQ_TEASER_ITEMS. Rewrite all "vi"→"jeg" |
| `src/components/sections/hero-section.tsx` | Full rewrite: split layout, LaptopFrame carousel, PageSpeed badge |
| `src/components/sections/bento-services.tsx` | Update "vi"→"jeg" copy, add dark background wrapper |
| `src/components/sections/process-section.tsx` | Update "vi"→"jeg" copy, update heading |
| `src/app/page.tsx` | Replace all section imports and ordering |
| `src/lib/content/services.ts` | Voice migration: "vi"→"jeg" |
| `src/lib/content/pricing.ts` | Voice migration: "vi"→"jeg" |
| `src/lib/content/faq.ts` | Voice migration: "vi"→"jeg" |
| `src/lib/content/about.ts` | Voice migration: "vi"→"jeg" |

### Untouched Files
- `src/components/ui/testimonials-with-marquee.tsx` — keep for potential use on other pages
- `src/components/sections/client-logos.tsx` — no longer imported on homepage but don't delete
- `src/components/sections/why-us-section.tsx` — no longer imported on homepage but don't delete
- `src/components/sections/service-feature-steps.tsx` — no longer imported on homepage but don't delete

---

## Chunk 1: Content Data & Voice Migration

### Task 1: Update homepage.ts — Hero, Trust Signals, and New Content Data

**Files:**
- Modify: `src/lib/content/homepage.ts`
- Modify: `src/lib/content/portfolio-sites.ts` (add helper export)

**⚠️ NOTE:** Changing HERO here will temporarily break the existing hero-section.tsx (which reads `HERO.rotatingWords` and `HERO.headline` differently). This is expected — the hero component is fully rewritten in Task 11 (Chunk 4). The site will not compile between Task 1 and Task 11. If you need intermediate builds, do Task 11 immediately after Task 1.

- [ ] **Step 1: Replace HERO constant with new copy**

In `src/lib/content/homepage.ts`, replace the entire `HERO` export:

```typescript
export const HERO = {
  eyebrow: "5 PROSJEKTER · 5 FORNØYDE KUNDER · 100% TILFREDSHET",
  headline: "Din nettside skal",
  headlineHighlight: "jobbe for deg",
  headlineEnd: "— ikke mot deg",
  subheadline:
    "Bygget med moderne teknologi. Optimalisert for Google. Designet for å konvertere besøkende til kunder.",
  primaryCta: "Se mine prosjekter",
  secondaryCta: "Få et tilbud",
} as const;
```

- [ ] **Step 2: Replace TRUST_SIGNALS with honest numbers**

Replace the entire `TRUST_SIGNALS` export:

```typescript
export const TRUST_SIGNALS: TrustSignal[] = [
  { value: 5, suffix: "", label: "Prosjekter levert" },
  { value: 100, suffix: "%", label: "Kundetilfredshet" },
  { value: 5.0, suffix: "", label: "Google-vurdering", decimals: 1 },
];

export const TRUST_LOCATION = "Basert i Drammen" as const;
```

- [ ] **Step 3: Add FEATURED_PORTFOLIO_IDS**

Add below TRUST_LOCATION:

```typescript
import type { PortfolioSiteId } from "@/types";

export const FEATURED_PORTFOLIO_IDS: PortfolioSiteId[] = [
  "vocura",
  "brobekk",
  "centerrahma",
];
```

Note: Move the `PortfolioSiteId` import to the top of the file with other type imports.

- [ ] **Step 4: Add PROBLEM_CARDS content**

```typescript
export const PROBLEM_CARDS = [
  {
    icon: "Gauge",
    title: "Treg lasting = tapte kunder",
    stat: "53%",
    statLabel: "forlater en side som bruker mer enn 3 sekunder på å laste",
  },
  {
    icon: "SearchX",
    title: "Usynlig på Google",
    stat: "75%",
    statLabel: "klikker aldri forbi første side i søkeresultatene",
  },
  {
    icon: "CalendarX",
    title: "Ser ut som 2015",
    stat: "94%",
    statLabel: "av førsteinntrykket handler om design og troverdighet",
  },
] as const;

export const PROBLEM_TRANSITION = "Det trenger ikke være slik." as const;
```

- [ ] **Step 5: Add TECH_COMPARISON content**

```typescript
export const TECH_COMPARISON = {
  headline: "Hvorfor moderne teknologi gir deg en fordel",
  template: {
    title: "Mal-nettside",
    metrics: [
      { label: "Lastetid", value: "4.2s", pass: false },
      { label: "PageSpeed", value: "45/100", pass: false },
      { label: "Mobilvennlig", value: "Begrenset", pass: false },
      { label: "Design", value: "Generisk", pass: false },
    ],
  },
  custom: {
    title: "Skreddersydd nettside",
    metrics: [
      { label: "Lastetid", value: "0.8s", pass: true },
      { label: "PageSpeed", value: "98/100", pass: true },
      { label: "Mobilvennlig", value: "Fullt tilpasset", pass: true },
      { label: "Design", value: "Unikt for deg", pass: true },
    ],
  },
} as const;
```

- [ ] **Step 6: Add FAQ_TEASER_ITEMS**

```typescript
export const FAQ_TEASER_ITEMS = [
  {
    question: "Hvor lang tid tar det å lage en nettside?",
    answer:
      "En standard bedriftsnettside tar vanligvis 3–6 uker fra oppstart til lansering. Enklere prosjekter kan leveres raskere, mens større skreddersydde løsninger kan ta 6–10 uker.",
  },
  {
    question: "Hva om jeg allerede har en nettside?",
    answer:
      "Jeg tilbyr både redesign av eksisterende nettsider og optimalisering av ytelse, SEO og brukeropplevelse. Jeg gir deg en ærlig vurdering av hva som gir best resultat.",
  },
  {
    question: "Hva koster vedlikehold?",
    answer:
      "Driftsavtaler starter fra 490 kr/mnd og dekker hosting, sikkerhetskopier, oppdateringer og support. Ingen bindingstid — du kan si opp når som helst.",
  },
  {
    question: "Trenger jeg virkelig en skreddersydd nettside?",
    answer:
      "Maler kan fungere som et utgangspunkt, men en skreddersydd nettside gir deg bedre ytelse, unikt design og full kontroll. Det er en investering som betaler seg gjennom flere kunder.",
  },
] as const;
```

- [ ] **Step 7: Update TESTIMONIALS — trim to 3 and remove Unsplash avatars**

Replace with 3 testimonials. Remove `avatar` URLs (component will use initials instead):

```typescript
export const TESTIMONIALS: Testimonial[] = [
  {
    author: {
      name: "Marte Solberg",
      handle: "Daglig leder",
      company: "Solberg Interiør AS",
      avatar: "",
      rating: 5,
    },
    text: "IDweb forstod umiddelbart hva jeg trengte. Nettsiden ble levert raskere enn forventet, og jeg merket økning i henvendelser allerede den første måneden. Profesjonelt fra start til slutt.",
  },
  {
    author: {
      name: "Erik Haugen",
      handle: "Eier",
      company: "Haugen Elektro",
      avatar: "",
      rating: 5,
    },
    text: "Jeg hadde en gammel nettside som knapt fungerte på mobil. Etter at IDweb bygde den nye siden min, har jeg doblet antall forespørsler via nettet. Best av alt — han tar seg av alt det tekniske etterpå også.",
  },
  {
    author: {
      name: "Linda Kristiansen",
      handle: "Partner",
      company: "Kristiansen Regnskap",
      avatar: "",
      rating: 5,
    },
    text: "Endelig en nettside som speiler kvaliteten jeg leverer til kundene mine. IDweb var tålmodig, kreativ og leverte et resultat som overgikk forventningene. Anbefales på det sterkeste.",
  },
];
```

- [ ] **Step 8: Update FINAL_CTA, SOCIAL_PROOF, and PROCESS_STEPS — "vi"→"jeg" voice**

```typescript
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Gratis samtale",
    description:
      "Jeg starter med en uforpliktende samtale der jeg kartlegger behovene dine, målgruppen din og hva du ønsker å oppnå. Du forteller — jeg lytter.",
  },
  {
    step: 2,
    title: "Design og utvikling",
    description:
      "Basert på det jeg har lært, lager jeg et skreddersydd design og utvikler nettsiden med fokus på hastighet, SEO og brukervennlighet. Du godkjenner underveis.",
  },
  {
    step: 3,
    title: "Lansering og oppfølging",
    description:
      "Når du er fornøyd, lanserer jeg nettsiden. Men jeg stopper ikke der — jeg tilbyr løpende vedlikehold, oppdateringer og support slik at siden alltid presterer optimalt.",
  },
];

export const FINAL_CTA = {
  headline: "Klar for en nettside som faktisk leverer?",
  description:
    "Fortell meg om prosjektet ditt, så sender jeg et uforpliktende tilbud innen 24 timer. Ingen skjulte kostnader, ingen bindingstid.",
  buttonText: "Send forespørsel",
  secondaryText: "Eller ring meg direkte: 123 45 678",
} as const;

export const SOCIAL_PROOF = {
  heading: "Stolt samarbeidspartner for norske bedrifter",
  description:
    "Fra lokale håndverkere til etablerte bedrifter — jeg har hjulpet bedrifter med å lykkes på nett.",
} as const;
```

- [ ] **Step 9: Update SERVICE_TESTIMONIAL_MAP — fix out-of-bounds indices**

The map references testimonial indices 0-4 but we trimmed to 3 entries (indices 0-2). Update:

```typescript
export const SERVICE_TESTIMONIAL_MAP: Record<string, number> = {
  nettside: 0,
  nettbutikk: 2,
  seo: 1,
  markedsforing: 1,
  vedlikehold: 0,
  design: 2,
};
```

- [ ] **Step 10: Update SERVICES_OVERVIEW — "vi"→"jeg"**

```typescript
export const SERVICES_OVERVIEW = [
  {
    id: "nettside",
    title: "Nettsider",
    description:
      "Profesjonelle, raske nettsider som representerer merkevaren din og tiltrekker nye kunder gjennom søkemotorer.",
  },
  {
    id: "nettbutikk",
    title: "Nettbutikk",
    description:
      "Brukervennlige nettbutikker med sikker betaling, enkel administrasjon og høy konverteringsrate.",
  },
  {
    id: "seo",
    title: "SEO-optimalisering",
    description:
      "Bli funnet av kundene dine. Jeg sørger for at bedriften din rangerer høyt i Google-søk.",
  },
  {
    id: "markedsforing",
    title: "Digital markedsføring",
    description:
      "Målrettet annonsering på Google og sosiale medier som gir målbar avkastning på investeringen.",
  },
  {
    id: "vedlikehold",
    title: "Drift og vedlikehold",
    description:
      "Løpende oppdateringer, sikkerhetskopier og support slik at nettsiden alltid er trygg og oppdatert.",
  },
  {
    id: "design",
    title: "Grafisk design",
    description:
      "Visuell identitet, logodesign og grafisk materiell som skiller deg fra konkurrentene.",
  },
] as const;
```

- [ ] **Step 11: Run type check to verify no errors**

Run: `npx tsc --noEmit`
Expected: No errors (or only pre-existing ones unrelated to homepage.ts)

- [ ] **Step 12: Commit content data updates**

```bash
git add src/lib/content/homepage.ts
git commit -m "feat: update homepage content — honest trust signals, new section data, vi→jeg voice"
```

---

### Task 2: Voice Migration — Other Content Files

**Files:**
- Modify: `src/lib/content/services.ts`
- Modify: `src/lib/content/pricing.ts`
- Modify: `src/lib/content/faq.ts`
- Modify: `src/lib/content/about.ts`
- Modify: `src/components/sections/bento-services.tsx`
- Modify: `src/components/sections/process-section.tsx`

- [ ] **Step 1: Update services.ts — all "vi"/"oss"/"vår" → "jeg"/"meg"/"min"**

Search for every occurrence of "vi ", "Vi ", "oss ", "vår", "våre", "vårt" and replace with first-person singular equivalents. Key changes:
- "Vi designer" → "Jeg designer"
- "Vi sørger for" → "Jeg sørger for"
- "Kontakt oss" → "Ta kontakt"
- "vi har" → "jeg har"

- [ ] **Step 2: Update pricing.ts — voice migration**

Key changes in PRICING_PAGE, PACKAGES, ADDON_SERVICES, PRICING_FAQ, PRICING_CTA:
- "Vi tror på transparens" → "Jeg tror på transparens"
- "våre tjenester" → "mine tjenester"
- "Kontakt oss" → "Ta kontakt"
- "vi har ingen" → "jeg har ingen"
- "Vi gir" → "Jeg gir"

- [ ] **Step 3: Update faq.ts — voice migration**

Key changes in FAQ_PAGE and FAQS:
- "vi får" → "jeg får"
- "Vi gir alltid" → "Jeg gir alltid"
- "Vi bygger" → "Jeg bygger"
- "vi tilbyr" → "jeg tilbyr"
- "Kontakt oss" → "Ta kontakt"

- [ ] **Step 4: Update about.ts — voice migration**

Read the file first to understand current content, then apply voice changes.

- [ ] **Step 5: Update bento-services.tsx — heading copy**

Change line 128-131:
```typescript
// Old:
"Vi tilbyr helhetlige digitale tjenester — fra design og utvikling til SEO og løpende vedlikehold."
// New:
"Jeg tilbyr helhetlige digitale tjenester — fra design og utvikling til SEO og løpende vedlikehold."
```

- [ ] **Step 6: Update process-section.tsx — all headings, copy, AND content array**

Change the heading/label text:
- "Slik jobber vi" → "Slik jobber jeg"
- "Vår velprøvde prosess" → "Min velprøvde prosess"

Change the `content` array (the StickyScroll data defined in the component):
- "1. Vi blir kjent" → "1. Jeg blir kjent med deg"
- "2. Vi designer og utvikler" → "2. Jeg designer og utvikler"
- "3. Vi lanserer og følger opp" → "3. Jeg lanserer og følger opp"
- All description text in each content item: "Vi lytter" → "Jeg lytter", "Vi starter" → "Jeg starter", "vi har lært" → "jeg har lært", etc.

This is the `content` array at the top of the file (lines 8-57) — not just the heading text.

- [ ] **Step 7: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 8: Commit voice migration**

```bash
git add src/lib/content/services.ts src/lib/content/pricing.ts src/lib/content/faq.ts src/lib/content/about.ts src/components/sections/bento-services.tsx src/components/sections/process-section.tsx
git commit -m "feat: voice migration vi→jeg across all content files"
```

---

## Chunk 2: New Section Components (Sections 2-5)

### Task 3: Social Proof Bar (Section 2)

**Files:**
- Create: `src/components/sections/social-proof-bar.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";
import { TRUST_SIGNALS, TRUST_LOCATION } from "@/lib/content/homepage";
import { CountUpStat } from "@/components/ui/count-up-stat";

export function SocialProofBar() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-8">
      <motion.div
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        {TRUST_SIGNALS.map((signal, i) => (
          <div key={signal.label} className="flex items-center gap-2">
            {i > 0 && (
              <span className="mr-6 hidden text-[var(--color-border)] sm:inline">
                ·
              </span>
            )}
            <span className="text-lg font-bold text-[var(--color-text)]">
              <CountUpStat
                value={signal.value}
                suffix={signal.suffix}
              />
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">
              {signal.label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="mr-6 hidden text-[var(--color-border)] sm:inline">
            ·
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">
            {TRUST_LOCATION}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/social-proof-bar.tsx
git commit -m "feat: add SocialProofBar section with honest trust metrics"
```

---

### Task 4: Problem Agitation (Section 3)

**Files:**
- Create: `src/components/sections/problem-agitation.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";
import { Gauge, SearchX, CalendarX } from "lucide-react";
import { PROBLEM_CARDS, PROBLEM_TRANSITION } from "@/lib/content/homepage";

const ICONS = { Gauge, SearchX, CalendarX } as const;

export function ProblemAgitation() {
  return (
    <section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {PROBLEM_CARDS.map((card) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={card.title}
                className="rounded-xl border border-white/5 bg-[var(--color-dark-bg-alt)] p-8"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <Icon className="mb-4 h-8 w-8 text-red-400" aria-hidden="true" />
                <h3 className="mb-3 text-lg font-bold text-[var(--color-dark-text)]">
                  {card.title}
                </h3>
                <p className="text-3xl font-black text-red-400">{card.stat}</p>
                <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                  {card.statLabel}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="mt-12 text-center text-xl font-semibold text-[var(--color-dark-text)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {PROBLEM_TRANSITION}
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/problem-agitation.tsx
git commit -m "feat: add ProblemAgitation section with pain-point cards"
```

---

### Task 5: Portfolio Showcase (Section 4)

**Files:**
- Create: `src/components/sections/portfolio-showcase.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { LaptopFrame, PhoneFrame } from "@/components/ui/device-frame";
import { FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { PROJECTS } from "@/lib/content/portfolio";

export function PortfolioShowcase() {
  const featuredSites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(Boolean);
  // Match portfolio case studies to featured sites by approximate name matching
  const featuredCases = PROJECTS.slice(0, FEATURED_PORTFOLIO_IDS.length);

  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Prosjekter jeg har levert
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]">
            Hver nettside er skreddersydd for kundens behov og bransje.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {featuredSites.map((site, index) => {
            if (!site) return null;
            const caseStudy = featuredCases[index];
            return (
              <motion.div
                key={site.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4 flex items-end gap-3">
                  <LaptopFrame
                    imageSrc={site.images.desktop}
                    imageAlt={`${site.name} — desktop`}
                    className="w-[200px] flex-shrink-0"
                  />
                  <PhoneFrame
                    imageSrc={site.images.mobile}
                    imageAlt={`${site.name} — mobil`}
                    className="w-[60px] flex-shrink-0"
                  />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">
                  {site.name}
                </h3>
                {caseStudy && (
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {caseStudy.industry} · {caseStudy.results[0]}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle referanser <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Check that portfolio.ts exports PORTFOLIO and has the right structure**

Read `src/lib/content/portfolio.ts` to verify the export name and data shape. Adjust the import if needed.

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/portfolio-showcase.tsx
git commit -m "feat: add PortfolioShowcase section with featured projects"
```

---

### Task 6: Tech Advantage (Section 5)

**Files:**
- Create: `src/components/sections/tech-advantage.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";
import { X, Check } from "lucide-react";
import { TECH_COMPARISON } from "@/lib/content/homepage";

export function TechAdvantage() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold text-[var(--color-text)] sm:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {TECH_COMPARISON.headline}
        </motion.h2>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Template card — muted */}
          <motion.div
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-8 opacity-60"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-xl font-bold text-[var(--color-text)]">
              {TECH_COMPARISON.template.title}
            </h3>
            <div className="space-y-4">
              {TECH_COMPARISON.template.metrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {metric.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {metric.value}
                    </span>
                    <X className="h-4 w-4 text-red-400" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Custom card — highlighted */}
          <motion.div
            className="rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-alt)] p-8 shadow-[0_0_30px_rgba(244,206,20,0.08)]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-xl font-bold text-[var(--color-text)]">
              {TECH_COMPARISON.custom.title}
            </h3>
            <div className="space-y-4">
              {TECH_COMPARISON.custom.metrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {metric.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-accent)]">
                      {metric.value}
                    </span>
                    <Check className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/tech-advantage.tsx
git commit -m "feat: add TechAdvantage comparison section"
```

---

## Chunk 3: New Section Components (Sections 8-11) + Contact Form

### Task 7: Testimonial Grid (Section 8)

**Files:**
- Create: `src/components/sections/testimonial-grid.tsx`

- [ ] **Step 1: Create the component with initial-based avatars**

```tsx
"use client";

import { motion } from "motion/react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

const AVATAR_COLORS = [
  "bg-blue-600", "bg-emerald-600", "bg-violet-600",
  "bg-amber-600", "bg-rose-600", "bg-cyan-600",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
}

export function TestimonialGrid({
  testimonials,
  title = "Hva kundene sier",
  description,
}: TestimonialGridProps) {
  return (
    <section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-[var(--color-dark-text)] sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-dark-muted)]">
              {description}
            </p>
          )}
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author.name}
              className="rounded-xl border border-white/5 bg-[var(--color-dark-glass)] p-6 backdrop-blur-sm"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.author.rating ?? 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-sm leading-relaxed text-[var(--color-dark-muted)]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(t.author.name)}`}
                >
                  {getInitials(t.author.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-dark-text)]">
                    {t.author.name}
                  </p>
                  <p className="text-xs text-[var(--color-dark-muted)]">
                    {t.author.handle}
                    {t.author.company && `, ${t.author.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/testimonial-grid.tsx
git commit -m "feat: add TestimonialGrid section with initial-based avatars"
```

---

### Task 8: Pricing Preview (Section 9)

**Files:**
- Create: `src/components/sections/pricing-preview.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { PACKAGES } from "@/lib/content/pricing";

export function PricingPreview() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Ærlige priser, ingen overraskelser
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]">
            Alle prosjekter skreddersys — her er utgangspunktene.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`rounded-xl border p-6 ${
                pkg.highlight
                  ? "border-[var(--color-accent)] bg-[var(--color-bg-alt)] shadow-[0_0_20px_rgba(244,206,20,0.06)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg-alt)]"
              }`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {pkg.highlight && (
                <span className="mb-3 inline-block rounded-full bg-[var(--color-accent)] px-3 py-0.5 text-xs font-bold text-[var(--color-dark-bg)]">
                  Mest populær
                </span>
              )}
              <h3 className="text-lg font-bold text-[var(--color-text)]">
                {pkg.name}
              </h3>
              <p className="mt-2 text-2xl font-black text-[var(--color-text)]">
                {pkg.price}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                + {pkg.monthly} vedlikehold
              </p>
              <ul className="mt-4 space-y-1.5">
                {pkg.features.slice(0, 3).map((feat) => (
                  <li
                    key={feat}
                    className="text-xs text-[var(--color-text-muted)]"
                  >
                    ✓ {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/priser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle detaljer <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/pricing-preview.tsx
git commit -m "feat: add PricingPreview section with 3-tier cards"
```

---

### Task 9: FAQ Teaser (Section 10)

**Files:**
- Create: `src/components/sections/faq-teaser.tsx`

- [ ] **Step 1: Create the component with accordion**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ChevronDown, MoveRight } from "lucide-react";
import { FAQ_TEASER_ITEMS } from "@/lib/content/homepage";

export function FaqTeaser() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-[var(--color-dark-text)] sm:text-4xl">
            Vanlige spørsmål
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {FAQ_TEASER_ITEMS.map((faq, index) => (
            <motion.div
              key={faq.question}
              className="rounded-lg border border-white/5 bg-[var(--color-dark-bg-alt)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-semibold text-[var(--color-dark-text)]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-[var(--color-dark-muted)] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm leading-relaxed text-[var(--color-dark-muted)]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline"
          >
            Se alle spørsmål <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/faq-teaser.tsx
git commit -m "feat: add FaqTeaser section with accordion"
```

---

### Task 10: Contact Form + API Route (Section 11)

**Files:**
- Create: `src/components/ui/contact-form.tsx`
- Create: `src/components/sections/cta-section.tsx`
- Create: `src/app/api/contact/route.ts`

- [ ] **Step 1: Create the shared ContactForm component**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface ContactFormProps {
  showExtendedFields?: boolean;
  className?: string;
}

export function ContactForm({
  showExtendedFields = false,
  className = "",
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Noe gikk galt");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Noe gikk galt. Prøv igjen eller send e-post direkte."
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        className={`flex flex-col items-center gap-3 py-8 ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <CheckCircle2 className="h-12 w-12 text-green-500" />
        <p className="text-lg font-semibold">Takk for henvendelsen!</p>
        <p className="text-sm opacity-70">
          Jeg tar kontakt innen 24 timer.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          required
          placeholder="Ditt navn"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Din e-post"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
        />
      </div>

      {showExtendedFields && (
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="tel"
            name="phone"
            placeholder="Telefon (valgfritt)"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
          />
          <input
            type="text"
            name="company"
            placeholder="Bedriftsnavn (valgfritt)"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
          />
        </div>
      )}

      <textarea
        name="message"
        rows={3}
        placeholder="Fortell kort om prosjektet ditt"
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-inherit placeholder:text-inherit/50 focus:border-[var(--color-accent)] focus:outline-none"
      />

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-8 py-3 text-sm font-bold text-[var(--color-dark-bg)] transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Send forespørsel"
        )}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create the CTA section wrapper**

```tsx
"use client";

import { motion } from "motion/react";
import { FINAL_CTA } from "@/lib/content/homepage";
import { ContactForm } from "@/components/ui/contact-form";

export function CtaSection() {
  return (
    <section className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] px-6 py-24">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-[var(--color-dark-bg)] sm:text-4xl">
          {FINAL_CTA.headline}
        </h2>
        <p className="mt-4 text-lg text-[var(--color-dark-bg)]/70">
          {FINAL_CTA.description}
        </p>

        <div className="mt-8">
          <ContactForm className="text-[var(--color-dark-bg)]" />
        </div>

        <p className="mt-6 text-sm text-[var(--color-dark-bg)]/60">
          {FINAL_CTA.secondaryText}
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Create the API route**

```typescript
import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message?: string;
  phone?: string;
  company?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Navn og e-post er påkrevd." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse." },
        { status: 400 }
      );
    }

    // TODO: Integrate with Resend or similar email service
    // For now, log the submission (replace with actual email sending)
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      message: body.message ?? "",
      phone: body.phone ?? "",
      company: body.company ?? "",
    });

    // When Resend is set up, replace the console.log above with:
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'IDweb <noreply@idweb.no>',
    //   to: 'your-email@idweb.no',
    //   subject: `Ny henvendelse fra ${body.name}`,
    //   text: `Navn: ${body.name}\nE-post: ${body.email}\nTelefon: ${body.phone}\nBedrift: ${body.company}\n\nMelding:\n${body.message}`,
    // });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: Verify all three files compile**

Run: `npx tsc --noEmit`

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/contact-form.tsx src/components/sections/cta-section.tsx src/app/api/contact/route.ts
git commit -m "feat: add ContactForm, CtaSection, and /api/contact route"
```

---

## Chunk 4: Hero Rewrite + Homepage Assembly

### Task 11: Rewrite Hero Section

**Files:**
- Modify: `src/components/sections/hero-section.tsx`

- [ ] **Step 1: Rewrite the hero section entirely**

Replace the full content of `hero-section.tsx` with the "Proof First" split layout:

```tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { LaptopFrame } from "@/components/ui/device-frame";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { HERO, FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(Boolean);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % sites.length);
  }, [sites.length]);

  useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance]);

  const activeSite = sites[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-dark-bg)]">
      <InteractiveGrid id="hero-grid" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse, rgba(244,206,20,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-40">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-[var(--color-accent)]">
              {HERO.eyebrow}
            </p>

            <h1 className="text-3xl font-black leading-tight tracking-tight text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
              {HERO.headline}{" "}
              <span className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] bg-clip-text text-transparent">
                {HERO.headlineHighlight}
              </span>{" "}
              {HERO.headlineEnd}
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[var(--color-dark-muted)] md:text-base">
              {HERO.subheadline}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/referanser"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-bold text-[var(--color-dark-bg)] transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                {HERO.primaryCta} <MoveRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-[var(--color-dark-text)] transition-colors hover:border-white/30 hover:bg-white/5"
              >
                {HERO.secondaryCta}
              </Link>
            </div>
          </motion.div>

          {/* Right — Project carousel */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-xl border border-white/5 bg-[var(--color-dark-bg-alt)] p-4 sm:p-6">
              <AnimatePresence mode="popLayout">
                {activeSite && (
                  <motion.div
                    key={activeSite.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LaptopFrame
                      imageSrc={activeSite.images.desktop}
                      imageAlt={`${activeSite.name} nettside`}
                      priority={activeIndex === 0}
                      className="w-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination dots */}
              <div className="mt-4 flex justify-center gap-2">
                {sites.map((site, i) => (
                  <button
                    key={site?.id ?? i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === activeIndex
                        ? "bg-[var(--color-accent)]"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Vis prosjekt ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating PageSpeed badge */}
            <div className="absolute -bottom-3 -right-3 rounded-lg border border-[rgba(244,206,20,0.25)] bg-[rgba(244,206,20,0.12)] px-3 py-1.5 text-xs font-bold text-[var(--color-accent)] backdrop-blur-sm sm:bottom-4 sm:right-4">
              ⚡ 98/100 PageSpeed
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: rewrite hero — Proof First split layout with project carousel"
```

---

### Task 12: Rewire Homepage — Assemble All 11 Sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace page.tsx with new 11-section layout**

```tsx
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { TESTIMONIALS } from "@/lib/content/homepage";
import { HeroSection } from "@/components/sections/hero-section";
import { SocialProofBar } from "@/components/sections/social-proof-bar";
import { ProblemAgitation } from "@/components/sections/problem-agitation";
import { PortfolioShowcase } from "@/components/sections/portfolio-showcase";
import { TechAdvantage } from "@/components/sections/tech-advantage";
import { BentoServices } from "@/components/sections/bento-services";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialGrid } from "@/components/sections/testimonial-grid";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: SEO.home.title,
  description: SEO.home.description,
  keywords: SEO.home.keywords,
};

export default function Home() {
  return (
    <main>
      {/* 1. Hero — Dark */}
      <HeroSection />

      {/* 2. Social Proof Bar — Light */}
      <SocialProofBar />

      {/* 3. Problem Agitation — Dark */}
      <ProblemAgitation />

      {/* 4. Portfolio Showcase — Light */}
      <PortfolioShowcase />

      {/* 5. Tech Advantage — Light */}
      <TechAdvantage />

      {/* 6. Services Overview — Dark */}
      <BentoServices />

      {/* 7. Process — Light */}
      <ProcessSection />

      {/* 8. Testimonials — Dark */}
      <TestimonialGrid testimonials={TESTIMONIALS} />

      {/* 9. Pricing Preview — Light */}
      <PricingPreview />

      {/* 10. FAQ Teaser — Dark */}
      <FaqTeaser />

      {/* 11. Final CTA — Yellow gradient */}
      <CtaSection />
    </main>
  );
}
```

- [ ] **Step 2: Update BentoServices background for dark section**

In `src/components/sections/bento-services.tsx`, change the `<section>` wrapper to use dark background:

```tsx
// Old:
<section className="px-6 py-24">
// New:
<section className="bg-[var(--color-dark-bg)] px-6 py-24">
```

And update text colors in the heading/description to use dark-mode text variables:

```tsx
// Old heading class:
"text-center text-3xl font-bold text-pretty sm:text-4xl"
// New:
"text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl"

// Old description class:
"mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]"
// New:
"mx-auto mt-4 max-w-2xl text-center text-[var(--color-dark-muted)]"
```

- [ ] **Step 3: Update ProcessSection to light background**

In `src/components/sections/process-section.tsx`, change the background from dark gradient to light:

```tsx
// Old:
<section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-dark-bg)] to-[#162032] px-6 py-24">
// New:
<section className="relative overflow-hidden bg-[var(--color-bg)] px-6 py-24">
```

And update all text colors from dark-text to regular text:
- `text-[var(--color-accent)]` label → keep as is (yellow label still works on light)
- `text-[var(--color-dark-text)]` → `text-[var(--color-text)]`
- `text-[var(--color-dark-muted)]` → `text-[var(--color-text-muted)]`

Remove the grid texture overlay div (not needed on light bg), or keep it with adjusted opacity.

- [ ] **Step 4: Verify the full app compiles and runs**

Run: `npx tsc --noEmit`
Run: `npm run build` (check for build errors)

- [ ] **Step 5: Commit the homepage assembly**

```bash
git add src/app/page.tsx src/components/sections/bento-services.tsx src/components/sections/process-section.tsx
git commit -m "feat: assemble redesigned homepage — 11-section conversion funnel"
```

---

## Chunk 5: Visual Polish & Verification

### Task 13: Visual Review and Final Adjustments

**Files:**
- Potentially any section component

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Open http://localhost:3000 and scroll through all 11 sections**

Verify each section:
1. Hero — split layout, carousel rotates, PageSpeed badge visible
2. Social Proof Bar — 4 metrics centered
3. Problem Agitation — 3 cards, red stats, transition text
4. Portfolio Showcase — device mockups load, correct projects shown
5. Tech Advantage — two cards, left muted, right highlighted with yellow
6. Services Overview — bento grid on dark background, text readable
7. Process — 3 steps, light background, "jeg" voice
8. Testimonials — 3 cards, initial avatars, star ratings
9. Pricing Preview — 3 tiers, highlighted middle, correct prices
10. FAQ Teaser — accordion opens/closes smoothly
11. CTA — yellow gradient, form submits, success/error states work

- [ ] **Step 3: Test responsive — resize to mobile width (375px)**

Check that all sections stack properly:
- Hero: text above, carousel below
- Cards: single column
- Two-column layouts: stack
- Form: full width

- [ ] **Step 4: Test contact form submission**

Submit the form. Check browser console for the logged data. Verify success state appears.
Test validation: submit with empty name → check for browser validation.
Test error: temporarily break the API route to verify error state shows.

- [ ] **Step 5: Fix any visual issues found**

Common things to fix:
- Spacing between sections
- Text color contrast on different backgrounds
- Image loading/sizing
- Animation timing

- [ ] **Step 6: Final build check**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 7: Commit any polish fixes**

```bash
git add -A
git commit -m "fix: visual polish and responsive adjustments"
```

---

### Task 14: Clean Up Dead Imports

**Files:**
- No files to delete — just verify no import errors

- [ ] **Step 1: Verify no unused components cause build warnings**

The old components (`client-logos.tsx`, `why-us-section.tsx`, `service-feature-steps.tsx`) are no longer imported on the homepage but remain in the codebase for potential use. This is intentional per the spec.

Run: `npm run build`
Expected: No warnings about removed imports

- [ ] **Step 2: Final commit**

If there were any cleanup changes:

```bash
git add -A
git commit -m "chore: clean up unused imports from homepage redesign"
```
