# IDweb SEO Overhaul — Master Plan

_Owner: Ilyas · Started 2026-06-21 · Site: https://www.idweb.no (Next.js 16 + Sanity, Oslo-based)_

## Diagnosis (evidence-based, from live audit)

**Already excellent — do not touch:**
- Fully indexed (`site:idweb.no` returns all ~25 pages incl. every service + blog post).
- `www` canonical + per-page canonicals; valid `robots.ts` (no `/_next/` block); sitemap with `lastmod`/priorities.
- Rich JSON-LD live & confirmed in raw HTML: `ProfessionalService`, `WebSite`, `FAQPage`, `BreadcrumbList`, `Service`, `BlogPosting`.
- Clean titles/descriptions, OG/Twitter, `lang="nb"`, SSR'd H1 + `sr-only` headline.
- ~16 blog posts + 5 service pages.

**The 3 real problems:**
1. **Domain age + authority.** 3 months old, very few backlinks → new-site phase. Competitive terms take 6–12 months. (Confirm backlinks in GSC/Ahrefs.)
2. **Aimed only at the hardest head terms.** Everything targets `webutvikler oslo` / `nettside oslo` — among the most competitive commercial keywords in Norway. Indexed at position ~40 → impressions, ~0 clicks → "few active keywords."
3. **Tiny keyword surface.** ~25 pages can only rank for so many queries. To own *many* keywords you need many *targeted, winnable* pages.

## Strategy

Stay Oslo (legit — HQ is Oslo). Win by **widening the keyword surface to winnable long-tail** + **building authority**:
- **Industry pages** (`nettside for [bransje]`) — strong commercial intent, far lower competition than `webutvikler oslo`.
- **Geo pages** around Oslo (`webutvikler [sted]`) — Bærum, Asker, Lillestrøm, Sandvika, Lørenskog, Ski, Drammen…
- **Topical clusters + internal links** to funnel authority to money pages.
- **Authority**: GBP + reviews, citations, and the agency super-lever — "Laget av IDweb →" follow-links in every client footer.

Quality bar: every programmatic page must be genuinely differentiated (real industry pain points, features, FAQ, local angle). **No thin doorway pages** — Google penalizes those.

## Workstreams (prioritized by impact)

| # | Workstream | Status | Owner |
|---|---|---|---|
| **P1** | **Industry landing-page engine** (`/nettside/[bransje]`) — biggest lever for "many keywords" | ✅ first wave done (10 pages + hub + internal links + sitemap) | Claude |
| **P2** | Geo landing pages (`/webutvikler/[sted]`) around Oslo | ✅ first wave done (6 steder + hub, interlinked with Oslo) | Claude |
| **P3** | Topical clusters + internal linking (16 posts → pillars → money pages) | ⬜ todo | Claude |
| **P4** | Core Web Vitals pass | 🟡 in progress — see notes | Claude |
| **P5** | Authority/off-page (GBP, reviews, citations, client footer backlinks, outreach drafts) | ⬜ todo | Ilyas + Claude drafts |
| **P6** | Measurement (Search Console, rank tracking, monthly review) | ⬜ todo | Ilyas grants GSC |

## P1 — Industry page model

- **URL:** `/nettside/[bransje]` (keyword-in-path). E.g. `/nettside/tannlege`.
- **Data:** Service-shaped objects in `src/lib/content/industries.ts` + `INDUSTRY_SEO` map (mirrors `SERVICES`/`SERVICE_SEO`).
- **Template:** reuses existing section components (Hero, PainPoints, BentoFeatures, Process, FAQ, CTA) — on-brand, SSG via `generateStaticParams`.
- **Schema:** `Service` + `FAQPage` + `BreadcrumbList` per page.
- **Wiring:** added to `sitemap.ts`; internal links from `/tjenester/nettside` + relevant blog posts.

### Target industries
Built (10): **tannlege, elektriker, rørlegger, advokat, frisør, regnskapsfører, eiendomsmegler, restaurant, fysioterapeut, byggefirma** — each a unique, substantive page (real pain points/features/FAQ). Hub at `/nettside` ("Nettsider for alle bransjer") links to all; footer links to hub; each spoke breadcrumbs back to hub.
Next industries to add: treningssenter, optiker, bilverksted, tatovør, eiendomsforvalter, klinikk (lege/hud), interiørarkitekt, transport/flytte, renhold, catering.

> Note: "all businesses" is covered by **breadth of industry pages + the broad pages** (home, /tjenester/nettside, /nettside hub). Each industry page is a capture net for a specific search — it does not narrow positioning.

### Target geos (P2)
Bærum, Asker, Sandvika, Lillestrøm, Lørenskog, Ski/Nordre Follo, Drammen, Skedsmo, Oslo districts (Grünerløkka, Nordstrand, Majorstuen).

## P4 — Core Web Vitals notes

Measured, not assumed:
- **Animation layer is already fine.** CursorAura is `(hover:hover)+(pointer:fine)` and reduced-motion gated; Lenis bails on `pointer:coarse` + reduced-motion; Preloader is once-per-session + reduced-motion gated and home-only. No global mobile drag. (Earlier assumption was wrong — verified in code.)
- **FIXED — lucide barrel import.** `service-bento-features.tsx` did `import { icons } from "lucide-react"` and resolved by string key → shipped the entire lucide library (1000+ icons, confirmed: unused icons like Webhook/Banana were in built chunks) to every service/industry/geo page (22+). Replaced with an explicit map of the 19 icons actually used. Verified: unused icons now absent from all chunks; pages still render (18 icon SVGs on /nettside/tannlege).
- The 4.2 MB chunk in the build is **Sanity Studio**, loaded only on `/studio` (admin, noindex) — not public pages. Leave as-is.

Remaining P4 todo:
- Get real lab/field numbers (PSI needs an API key — shared quota exhausted; or grant Search Console access for CrUX).
- Audit homepage (3D carousel, motion) LCP/INP once numbers exist.
- Image formats/sizes + `next/image` coverage check.

## Honest timeline
- Long-tail industry/geo pages: traction within **weeks of indexing**.
- Competitive Oslo head terms: **6–12 months** with authority work.
- Anyone promising faster is lying.

## Measurement targets (set baseline once GSC access is granted)
- Indexed pages, total impressions, total clicks, # queries with impressions ("active keywords"), avg position for the target set.
