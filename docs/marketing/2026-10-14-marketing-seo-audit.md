# IDweb — Verified Website Audit & Marketing Plan

**Date:** 14 October 2026
**Code audited:** `main` @ `1f867ca` (24 Aug 2026)
**Replaces:** the 13 Oct report. That report audited an old March commit by mistake, so ignore it.

---

## Status: fixes shipped on this branch

**Fixed: #1, #2, #23, #24, #25, #26, #27** (commits `ab488ec`, `363116a`).

**Lead-capture fixes, verified with Playwright:**
- A message containing `https://…` now reaches the send step instead of being dropped.
- A missing Resend key now shows the visitor an error instead of crashing.
- A URL in the name field is still silently discarded as a bot.
- Softer spam signals are delivered with a `[Mulig spam]` subject prefix.

**Speed fixes, measured:**

| Measurement | Before | After |
|---|---|---|
| Observed homepage LCP (mobile viewport, 4× CPU, production build) | 2.4–2.7 s | ~0.4 s |
| Observed LCP, /kontakt | 0.64–0.69 s | ~0.22 s |
| Observed LCP, /om-oss | ~0.68 s | ~0.2 s |
| Lighthouse mobile performance, homepage (average of 2 runs) | 82 | 90 |
| Lighthouse Speed Index, homepage | 3.35 s | 1.40 s |
| Lighthouse simulated LCP, homepage | 4.67 s | 3.59 s |
| Lighthouse mobile performance, other tested pages | 84–91 | 90–94 |
| Desktop performance, all pages | — | 99–100 |
| Script transfer, every tested page | — | ~45 KB less |

Lighthouse's *simulated* mobile LCP is still around 3–3.6 s because its model counts the async JS. The real browser measurement above shows the main text now paints at first paint.

**Still open:**
- #3 (calendar link)
- #6–#14 (claims)
- #15–#22 (offer pages)
- #28 (contrast)
- #29–#38 (content and privacy)

---

## 0. How this was verified

| Layer | Method | Coverage |
|---|---|---|
| Server HTML (what Google and AI crawlers receive) | `next build` + `next start` of `main`; every URL in `/sitemap.xml` fetched and parsed: title, description, canonical, H1/H2, JSON-LD, links, word count | 52/52 pages |
| Rendered page (what visitors see) | Playwright + Chromium, desktop (1440×900) and mobile (390×844). Recorded: fold and full-page screenshots, visible headings, CTAs, forms, tel/mailto, console errors, LCP/CLS | 52/52 pages |
| Performance, SEO, accessibility | Lighthouse 12.8.2, mobile (simulated slow 4G / Moto G Power, 2 runs) + desktop | 8 key pages, 24 runs |
| Content and trust | Every claim, number and promise quoted from the **rendered** text, then traced to `file:line` | 52 pages |
| Contact form | Submitted with Playwright against the local build | /kontakt |
| Market, social and legal | Web research (sources at the end) | — |

**Limits — read these before acting on anything:**
- **The live site (www.idweb.no) has not been crawled yet.** This environment's network policy blocks the domain. This report shows what `main` produces. If production deploys something else, section 7 explains how to diff it.
- **Production form delivery can't be confirmed from here**, because it depends on the `RESEND_API_KEY` set in your hosting. Send one real test enquiry yourself.
- Blog cover images come from Unsplash, which this sandbox blocks. Their 500 errors here are **not** a site bug.
- Lighthouse mobile numbers are simulated: good for comparison, not identical to a real phone.

**Re-running it:** the crawler is saved as `tools/render-audit.mjs` (see section 7).

---

## 1. Summary

**The site itself is in good shape.**
- Lighthouse SEO is **100 on every tested page**.
- Every page has a unique title, a description, a canonical URL and structured data.
- It has a sitemap, robots.txt and OG images.
- It shows your real phone, email and org.nr.
- The contact form is wired to email.
- /referanser shows your real projects.
- The cookie consent loads Google Analytics only after "Godta".

**So the main reason the internet doesn't bring clients is outside the site:**
- no visible Google reviews or Google Business Profile activity
- no directory or Bing presence that we can see
- no social presence
- no outreach
- a blog that has been silent since March

**On the site itself, a handful of things leak leads or trust:**
1. **The spam filter silently drops real enquiries.** Any message containing `http://` or `https://` (e.g. "her er siden vår: https://…") shows "Takk!" but is never sent (`src/app/actions/send-email.ts:19,56-61`).
2. **Several unbacked or contradicting claims:**
   - "5/5 Google-vurdering · 100 % Kundetilfredshet" (/om-oss)
   - "6+ prosjekter levert" vs 5 projects on /referanser
   - "Servere i Norge"
   - "kunder fra Kristiansand til Tromsø"
   - "bransjene vi oftest bygger for i Drammen/Bærum"
3. **Your highest-value work has no page.** Booking systems, customer and member portals, and backend/integrations are pitched only in the homepage "Sekundet" animation, which has no CTA and links nowhere.
4. **There is no person on the site.** /om-oss, the blog and the schema have no name and no photo. The copy says "ett team" / "webbyrå". For a solo developer, *you* are the selling point.
5. **Mobile speed is held back by animations, not by the server.** All page content is invisible until JavaScript runs (`src/app/template.tsx`). The homepage adds a ~2 s preloader and a 0.85 s delayed fade on the main text. Result: homepage mobile LCP is 4.67 s and Speed Index 3.1–3.6 s; Lighthouse attributes about 90 % of LCP to "render delay".

---

## 2. What's already good (verified)

| Area | Evidence |
|---|---|
| Titles, descriptions, canonicals | Present and unique on 52/52 pages; Lighthouse SEO 100 on all 8 tested pages |
| Structured data | `ProfessionalService` (name, legalName "IDweb v/ Daod Ilyas", phone, Oslo, hours) + `WebSite` sitewide; `Service` + `FAQPage` + `BreadcrumbList` on service, industry and area pages; `BlogPosting` on posts. **No fake review/rating markup.** |
| robots.txt and sitemap | Present; all crawlers allowed; `/api` and `/studio` blocked; 52 URLs |
| Contact details | "+47 984 06 164", "hei@idweb.no" and "ORG.NR 837 228 972" on all 52 pages (org.nr checksum valid) |
| Contact form | Server action → Resend email, with honeypot, timing check, validation and a privacy notice on /kontakt |
| Real portfolio | /referanser: Center Rahma (donations payment, API), Ringebu Tannlegesenter, Brobekk Legekontor, Iqra Senter, Vocura (backend with login) |
| Industry and area pages | 15 `/nettside/[bransje]` pages + 6 `/webutvikler/[sted]` pages. Not near-duplicates (shared text: median 21 % for industry pages, 16 % for area pages). Area pages have real local facts. |
| Honest demo labelling | The Sekundet demo says "DEMODATA · TIDENE ER TYPISKE, IKKE MÅLT"; blog examples are marked "fiktivt" |
| Cookies and analytics | GA4 loads only on "Godta"; "Avvis" is equally prominent; no other trackers |
| No fake testimonials or years-of-experience claims | Testimonials list is empty and not rendered |
| Desktop performance | Lighthouse 98–100 on all tested pages |

---

## 3. Verified issues, by priority

Severity: 🔴 losing leads or legal/trust risk · 🟠 costs conversions or rankings · 🟡 polish.

### 3.1 Lead capture

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 🔴 1 | **Spam filter drops any message containing a URL**, while showing the visitor the success message | `send-email.ts:19` regex `/\bhttps?:\/\//i` is applied to `message` at line 58. The comment says it's meant for name/company only. | Apply the URL rule to `name`/`company` only. Also: drop "loan" (an English word, irrelevant in Norwegian); for borderline matches, send the email with a `[MULIG SPAM]` subject instead of discarding it. |
| 🔴 2 | **The form crashes if the Resend key is missing or invalid.** `new Resend(process.env.RESEND_API_KEY)` runs at module load (`send-email.ts:6`), outside the `try`. Locally the submit returned a server error and the visitor got no message. | Reproduced locally with no key; server log: `Missing API key` | Create the client inside the `try`. Send **one real test enquiry on production today**, and repeat after every deploy. |
| 🟠 3 | **No calendar booking.** "Book en gratis samtale" (26 pages) goes to /kontakt, like every other CTA. | CTA map from server HTML | Add a Cal.com/Calendly "20 min samtale" link next to "Få tilbud". |
| 🟡 4 | Inconsistent `tel:` link ("Eller ring oss direkte" uses `tel:98406164`; elsewhere `tel:+4798406164`) | Homepage | Use `+47` everywhere. |
| 🟡 5 | The 24-hour promise differs between pages: "tilbud innen 24 timer" (home) vs "kontakt innen 24 timer" + "Hverdager 08–17" (/kontakt) vs "vi svarer **alltid** innen 24 timer" (/faq) | `homepage.ts:141`, `kontakt/page.tsx:44`, `faq.ts:6` | Pick one realistic promise, e.g. "Svar innen én virkedag". |

### 3.2 Trust and claims

| # | Claim (as rendered) | Where | Problem | Fix |
|---|---|---|---|---|
| 🔴 6 | "5 /5 GOOGLE-VURDERING · 100 % KUNDETILFREDSHET" | /om-oss (`homepage.ts:13-14`) | No review count, no link, no source. Markedsføringsloven requires factual claims to be documentable. | Remove it, or show the real Google rating **with count and a link** once you have reviews. |
| 🟠 7 | "6 + PROSJEKTER LEVERT", "6 + OSLO-PROSJEKTER LEVERT", "6 + prosjekter SEO-optimalisert" | /tjenester/* (`services.ts:51,96,181`) | /referanser shows 5 projects, and Ringebu isn't in Oslo | Use real, matching numbers. |
| 🟠 8 | "Servere i Norge", "pålitelige norske servere" | /tjenester/webutvikler-oslo, /tjenester/vedlikehold, /faq, /vilkar, area pages (`services.ts:118,160`, `locations.ts:39,85`, `faq.ts:53`) | If hosting is on Vercel or similar, this is likely untrue; it's also written into the terms | State the real host and region (e.g. "EU-region"). |
| 🟠 9 | "kunder fra Kristiansand til Tromsø"; "hjulpet bedrifter over hele Norge med å bygge nettbutikker" | /faq (`faq.ts:73`), /blogg/nettbutikk-guide (`:125`) | No evidence; no online-shop project on /referanser | Remove, or replace with true facts. |
| 🟠 10 | "Dette er bransjene vi oftest bygger nettsider for her" / "…oftest bygger for i Drammen" / "Vi kjenner markedet i Bærum" | Area pages (`locations-local.ts:49,79,109`, `locations.ts:56`) | Implies a local client base that isn't shown anywhere | Rephrase as offer ("Bransjer vi bygger for i Bærum") or back it with a real local client. |
| 🟠 11 | Load-time claims disagree: "Under 1 sekund" (home) / "2 s gjennomsnittlig lastetid" (/tjenester/nettside) / "Lastetid under 1,5 sekunder" (Vocura); "90+ Score på alle våre prosjekter" | `spec-duel.tsx:26,34`, `services.ts:53`, `portfolio.ts:78` | The site's own homepage measures LCP 4.67 s on simulated mobile | Use one dated, measured figure and say how it was measured (e.g. "PageSpeed mobil, okt 2026"). |
| 🟡 12 | "Sikkert innloggingssystem med personnummer" (Vocura) | `portfolio.ts:76` | Reads as login with a national ID number, which isn't secure | If it's BankID/ID-porten, say so. |
| 🟡 13 | Small contradictions: hosting "inkludert i leveransen" vs "kan inkluderes i driftsavtalen"; "si opp når som helst" vs "én måneds varsel"; FAQ says "velprøvde plattformer" for online shops vs the nettbutikk page's custom Next.js + Stripe/Vipps | `services.ts:48`, `faq.ts:43,48`, `homepage.ts:103`, /vilkar | — | Align them. |
| 🟡 14 | Code-only but wrong: `TEAM_MEMBERS` = "Idris Osman — Webutvikler & Grunder" | `about.ts:69-73` (not rendered) | — | Delete it before it gets reused. |

### 3.3 Offer and positioning

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 🔴 15 | **No page for booking systems, customer/member portals, or backend/integrations.** The OfferCatalog lists 5 services (nettside, webutvikler-oslo, nettbutikk, SEO, drift). "Medlemsportal" appears nowhere; "kundeportal" appears only in a blog price list. | `json-ld.tsx`, nav, `/tjenester` | Create `/tjenester/booking-og-portaler` (or two pages). Content: what you build (login with BankID/Vipps, booking with conflict check, Vipps payments, admin panel, SMS/email, integrations), the Vocura and Center Rahma proof, the process, FAQ. Add it to the nav, the footer and the OfferCatalog. |
| 🟠 16 | **The "Sekundet" section** (homepage: "Vi bygger backend også. Database, innlogging, betaling, varsling og admin-panel.") **has no CTA and no link** | `sekundet.ts:36-45` | End it with "Se hvordan vi bygger booking og portaler →" pointing at the page from #15. |
| 🟠 17 | **Industry pages present booking as integrating a third-party system, not building one**, and don't mention your real clients. /nettside/legekontor doesn't mention Brobekk; /nettside/tannlege doesn't mention Ringebu. | Industry-page text | Add a "Levert for: Brobekk Legekontor →" proof block on legekontor, tannlege and similar pages. Add "trossamfunn/forening" as an industry page (Center Rahma, Iqra). |
| 🟠 18 | **No person.** /om-oss: "IDweb er en norsk webutvikler som…", with no name or photo. "Fem tjenester, ett team" (/tjenester); "et Oslo-basert webbyrå" (`services.ts:146`). The blog byline is "IDweb". | Rendered text | Add your name, photo and a short story on /om-oss, written as "jeg". Add a `Person` (founder) to the schema. Make blog posts "Av Daod Ilyas". Keep "Du snakker direkte med utvikleren", which is your best line. |
| 🟠 19 | **References don't link to the live client sites.** /referanser has no outbound links. Code still holds `vocura-7orm.vercel.app` and `iqra-senter.vercel.app`. | `portfolio-sites.ts:59,76` | Link brobekklegekontor.no, centerrahma.no and ringebutannlegesenter.no. Give Vocura and Iqra real domains, or don't link them. Ask clients for a "Nettside av IDweb" footer link back. |
| 🟡 20 | Nettbutikk isn't in the nav dropdown or footer | `navbar.tsx:114-126`, `constants.ts:5-9` | Add it. |
| 🟡 21 | Industry mockups use realistic fictional brands ("frognertannhelse.no", "Volt Elektro +47 22 14 90 21") with no label | `landing-identity.ts:38-48` | Add a small "Eksempel" label. |
| 🟡 22 | Industry pages say "Hver side settes sammen for hånd — ingen mal" on templated pages | `service-bento-features.tsx:132` | Reword. |

**On prices:** `main` removed every price figure on purpose ("uforpliktende tilbud"). That's a legitimate choice. The trade-off: "nettside pris" / "hva koster en nettside" is one of the few high-intent searches a small studio can win, and competitors (Webtoget, Godtlikt, Nettmakeriet) publish "fra"-prices. Consider adding "fra"-prices or typical ranges per project type (e.g. "Bedriftsside: typisk 15–35 000 kr") on the services pages and the price blog post, which already discusses market prices.

### 3.4 Performance (measured)

Lighthouse, mobile (best of 2 runs) / desktop:

| Page | Mobile | Desktop | LCP (mobile) | Speed Index (mobile) |
|---|---|---|---|---|
| / | **82** | 98 | **4.67 s** | **3.08–3.63 s** |
| /tjenester/nettside | 85 | 99 | 4.25 s | 1.47 s |
| /nettside/legekontor | 86 | 99 | 4.22 s | 1.44 s |
| /webutvikler/baerum | 88 | 100 | 3.93 s | 1.46 s |
| /referanser | 88 | 99 | 3.92 s | 1.36 s |
| /blogg/hva-koster-en-nettside | 87 | 99 | 4.05 s | 1.37 s |
| /om-oss | 92 | 100 | 3.31 s | 1.39 s |
| /kontakt | 94 | 100 | 3.03 s | 1.36 s |

TBT was 33–99 ms and CLS 0 everywhere; the server responds in about 5 ms. The JavaScript isn't heavy. **The delay is self-inflicted by animation.**

| # | Cause | Evidence | Fix | Expected gain |
|---|---|---|---|---|
| 🟠 23 | **Every page's content is hidden until JS hydrates.** `template.tsx` wraps all pages in `motion.div initial={{opacity:0}}`. With JS disabled, only the navbar shows. | Server HTML contains `opacity:0;transform:translateY(8px)`; Lighthouse "render delay" is about 90 % of LCP | Delete the page-level fade, or make it a CSS animation that starts visible | Large: likely brings most pages from ~4 s to ~2 s LCP (estimate) |
| 🟠 24 | **The homepage hero text fades in after a 0.85 s delay plus a 0.9 s duration.** It is the LCP element. | `hero-lommelykt.tsx` (`delay: 0.85`) | Render the H1 and subheadline visible immediately; animate only decoration | ~1.5 s off homepage LCP (estimate) |
| 🟠 25 | **A ~2 s preloader curtain** ("0→100" counter) on the first visit per session. The code comment says it should "feel like real loading", but it doesn't measure anything. | `preloader.tsx`; filmstrip shows the curtain from 0.75 s to 1.9 s | Remove it. A first-time visitor from Google sees a loading counter instead of your offer. | Speed Index ~3.3 s → ~1.4 s (measured on the other pages) |
| 🟡 26 | Navbar logo served at 2048 px (55 KB) for a 158×64 slot; it is the LCP element on /kontakt and /om-oss | `navbar.tsx:95-102` | Add `sizes="160px"`, or use an SVG | ~50 KB, 0.2–0.35 s |
| 🟡 27 | Every page prefetches the homepage bundle (~70 KB), which includes **the full text of all blog posts**, because `ArticlesStrip` imports `BLOG_POSTS` client-side | `articles-strip.tsx:6` | Pass the 3 post summaries as props from a server component | ~40 KB per page |
| 🟡 28 | Low-contrast text: homepage scroll-fill words (1.3:1), Sekundet timestamps (2.1–2.6:1), /referanser project numbers (1.8:1), small mono labels (~4.4:1) | Lighthouse a11y 96–97 | Raise contrast for real text; mark decorative text `aria-hidden` | — |

### 3.5 SEO and content

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 🟠 29 | **The blog has been silent since 30 March**; 15 posts with no author; zero in-body links to /referanser, industry or area pages; no post mentions your own projects | `datePublished` values | Restart with one post a month (section 5.3) and add your byline. |
| 🟠 30 | **One post is missing æøå entirely** ("darlig", "besokende", "MARKEDSFORING") | /blogg/nettside-som-genererer-leads; source file has 0 æ/ø/å characters | Fix the encoding/text. It looks careless to Norwegian readers. |
| 🟠 31 | Outdated facts in posts: | `hvordan-velge-domenenavn.ts:31,68`, `google-bedriftsprofil-guide.ts:56`, `webdesigntrender-2026.ts:64` | Correct them. |
| | • "bare registrerte virksomheter kan få .no-domener" — private persons can register .no | | |
| | • "Google Domains" — shut down in 2023 | | |
| | • "Aktiver meldingsfunksjonen" in Google Business Profile — chat was discontinued in 2024 | | |
| | • WCAG presented as coming via the EU's accessibility act (EAA) — Norway already requires universell utforming | | |
| 🟡 32 | Only the first FAQ answer per page is in the server HTML; the rest live in JSON-LD and a client accordion | `faq-content.tsx` | Render all answers in HTML (use `<details>` or keep them in the DOM, just collapsed). |
| 🟡 33 | Two `<h1>` on the homepage (the spotlight effect duplicates the hero; one is `aria-hidden`) | `hero-lommelykt.tsx:56` | Make the duplicate layer a `<div>`/`<p>`. |
| 🟡 34 | `sameAs` contains only a `share.google/…` redirect link | `json-ld.tsx:49` | Use the stable Google Maps URL, plus LinkedIn and Proff. |
| 🟡 35 | No `og:image` on service, industry and area pages (homepage, blog and others have one) | Server HTML | Add a default OG image to those page templates. |

### 3.6 Privacy and cookies

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 🟠 36 | The privacy policy names **"berettiget interesse"** as the legal basis for analytics, but the site (correctly) uses consent, which ekomloven § 3-15 requires since 1 Jan 2025 | `personvern/page.tsx:91` | Change it to consent (art. 6(1)(a) + ekomloven § 3-15). |
| 🟠 37 | No way to withdraw consent; the policy points to browser settings | `personvern/page.tsx:104`, `cookie-consent.tsx` | Add a "Cookie-innstillinger" link in the footer that reopens the banner. |
| 🟡 38 | Processors aren't named (Google Analytics, Resend, the hosting provider) | `personvern/page.tsx:125` | List them, with transfer basis. |

---

## 4. Off-site presence: the biggest gap

This part comes from research and doesn't depend on the code. These are the things that put a small studio in front of buyers on Google Maps, AI assistants and social media.

1. **Google Business Profile.** `sameAs` links to a Google share link, so a profile seems to exist.
   - Make sure it's complete:
     - service-area business (Oslo + the Akershus municipalities you serve)
     - all services, including booking/portals
     - project photos and a photo of you
     - a weekly post
   - **Ask every past client for a review this week**: Brobekk, Center Rahma, Iqra, Ringebu, Vocura, plus referral clients. Aim for 10–15 real reviews in 90 days.
   - Norwegian law: asking for reviews is fine; rewarding *positive* ones is banned (blacklisted since 1 Oct 2023).
   - Once the reviews exist, show the real rating and count on the site in place of the "5/5".
2. **Bing Places + Bing Webmaster Tools.** ChatGPT search leans on Bing. Also allow `OAI-SearchBot` (already allowed via `User-agent: *`).
3. **Directories with identical name/phone/area:**
   - Gule Sider (free via BankID)
   - 1881 (tag "web-design/oslo")
   - Proff
   - brreg activity text
   - free Clutch and DesignRush profiles
4. **Google Search Console + Bing Webmaster Tools.** Verify the site and submit the sitemap. This is how you'll see which of the 52 pages actually get impressions.
5. **Client footer links** ("Nettside av IDweb") on every client site. They're backlinks and referral sources at the same time.

**AI search, in short:**
- Google says AI Overviews need no special markup.
- ChatGPT search needs OAI-SearchBot access and uses Bing plus Google Maps/review data for local queries.
- `llms.txt` shows no measurable effect (Google doesn't use it; a ~300k-domain study found no correlation).
- Your site is already technically ready. The missing pieces are reviews, listings and mentions.
- Do a monthly "assistant test": ask ChatGPT, Perplexity and Google "webutvikler i Oslo for små bedrifter" and "hvem kan lage medlemsportal for moské i Oslo", and note who gets named. Results vary between runs, so watch the trend.

---

## 5. Marketing plan

### 5.1 Positioning (recommended)

> **"Webutvikler i Oslo – nettsider, bookingløsninger og portaler. Du snakker direkte med utvikleren."**

Lead with the two niches where you already have proof, and where generic agencies are weak:

| Niche | Proof you have | What to sell |
|---|---|---|
| **Health clinics** (legekontor, tannlege, fysio) | Brobekk, Ringebu (+ existing industry pages) | Fast, accessible info site; correct Helsenorge/booking links (the new GP regulation, fastlegeforskrift, requires timebestilling, e-kontakt and resept via Helsenorge during 2026); multilingual patient info; Google profile setup. Don't build booking that competes with Helsenorge, Opus Dental or Physica. |
| **Trossamfunn and foreninger** | Center Rahma (donations, API), Iqra | **Member portal:** sign-up, BankID/Vipps, member list export for the yearly grant reporting, Vipps donations and fees, events, prayer times, multiple languages. Package it as a repeatable product. |
| Volume: salons, restaurants, small shops | — | Site + embedded Timma/Fresha/ResDiary + Google profile setup |

### 5.2 Social media

Daily use in Norway (SSB Mediebarometer 2025): Facebook 63 %, Instagram 46 %, YouTube 34 %, TikTok 25 %, LinkedIn 8 % (but concentrated among decision-makers).

| Platform | Audience | Cadence |
|---|---|---|
| **LinkedIn** (personal profile, "jeg") | Clinic managers, AS founders, portal/integration buyers | 2 posts/week + 10 min of commenting daily |
| **Instagram + Facebook page** | Salons, restaurants, associations, communities | 1 Reel or carousel per week (re-cut the same asset) |
| **Google Business Profile** | Local searchers | 1 post per week |
| Facebook groups (local business and community groups) | Small business owners | Answer questions; don't spam |

What to post:
- before/after case studies with numbers
- the "Sekundet" booking flow as a 30-second screen recording (it already exists, so reuse it)
- "slik bygger jeg …" founder posts
- rule-change explainers: fastlegeforskrift 2026, cookie rules since 2025, universell utforming
- only critique other businesses' sites **with their permission**

First 4 weeks:

| Week | LinkedIn #1 | LinkedIn #2 | IG/FB | Google profile |
|---|---|---|---|---|
| 1 | "Jeg er Daod – utvikleren bak IDweb" (photo) | Case: Brobekk Legekontor | Reel: Sekundet booking flow | New-project post |
| 2 | "Fastlegeforskriften 2026: 4 ting legekontorets nettside må ha" | Case: Center Rahma – donations + API | Carousel of the 4 points | Same |
| 3 | "Hva skjer i sekundet etter at kunden trykker Bestill?" | Case: Vocura – backend + login | Reel: speed test | Offer: free website check |
| 4 | "Hvorfor jeg ikke bruker WordPress" | Client quote + result | Carousel | Link to the booking/portal page |

### 5.3 Content (one post a month)

1. "Ny fastlegeforskrift 2026 – hva må legekontorets nettside ha?" → links to /nettside/legekontor
2. "Medlemsregister og Vipps for trossamfunn – slik slipper dere Excel" → the new portal page
3. "Egen booking eller Timma/Fresha? Slik velger du" → the booking page
4. "Cookie-reglene fra 2025 – trenger nettsiden din nytt samtykkebanner?"
5. "Universell utforming: hva gjelder for private bedrifter?"
6. "Flytte fra Wix eller Gule Sider uten å miste Google-plasseringen"

Also update "hva-koster-en-nettside" with *your* typical ranges.

### 5.4 Outreach (referrals made systematic)

| Channel | Action | Legal note |
|---|---|---|
| Past clients | After every launch, ask for a review, a footer link, and "kjenner du noen som trenger dette?". Offer a thank-you for referrals that become paid projects. | A referral bonus is fine; a review bonus is not. |
| Reactivation | Contact past clients without a pitch ("hvordan fungerer siden?"), then offer a Google profile setup, a speed check, or adding booking | — |
| Community introductions | Ask Center Rahma and Iqra to introduce you to other mosques, centres and associations | — |
| Email to clinics | Short mini-audit of *their* site, sent to `post@` addresses of **AS** companies | Markedsføringsloven § 15: consent is required for personal addresses and ENK owners. Include your org.nr and an opt-out. |
| Walk-ins | A printed one-page check (speed, mobile, Google profile, cookies) for salons and restaurants | — |
| Events | Oslo Business Region startup events (monthly); visit a BNI chapter as a guest; local næringsforening; Oslo Handelsstands Forening | — |
| Paid (later) | Mittanbud/Fixa or Google Ads at 3–5k kr/month for 60 days. Only after tracking and reviews are in place. | — |

---

## 6. Using your Claude skills

| When | Skill | Purpose |
|---|---|---|
| Once, first | `smb-onboard` | Sets Norway, NOK and your brand for all the other skills |
| Once | `seo-ai-visibility` | Assistant test baseline; listing checklist; schema copy. Re-run every 90 days. |
| Once | `/competitive-brief` ×3 (e.g. Mementor, Webaas, Reboot) | Positioning gaps |
| Once, then quarterly | `reactivate` | Past-client win-back (the first message doesn't pitch) |
| Weekly | `social-content-engine` | Rolling 30-day post calendar (solo default: 2 posts/week) |
| Weekly | `outreach-composer` (+ `lead-finder` monthly) | Compliant clinic/association outreach in your own voice |
| Weekly | `crm-autopilot` | Spreadsheet CRM; flags deals quiet for 14+ days |
| Per lead | `speed-to-lead`, `proposal-builder` | Fast replies; priced proposals |
| Per page | `/draft-content` | Case studies, the booking/portal page, blog posts |
| Before publishing | `/brand-review` | Flags unbacked claims, like the "100 %" above |
| Monthly (from month 2) | `growth-pulse`, `review-reputation` | Is it working; reply to reviews |

The skills never post or send without your approval. They contain no Norwegian e-marketing law, so follow 5.4.

---

## 7. Re-running this audit (including against production)

`tools/render-audit.mjs` crawls every sitemap URL and saves, per page: the server HTML, an analysis of the rendered DOM, and desktop and mobile screenshots (fold + full page). It also checks every internal link.

```bash
npm ci && (cd tools && npm ci)
npm run build && npx next start -p 3100 &
node tools/render-audit.mjs http://localhost:3100 ./audit-out
# Against production (needs network access to the domain):
node tools/render-audit.mjs https://www.idweb.no ./audit-prod
# Optional: CHROME_PATH=/path/to/chrome if Playwright's browser isn't installed
```

**For me to crawl production from this cloud environment:** open the environment menu in the session title bar → **Edit** → **Network access** and add `idweb.no` and `www.idweb.no` to Allowed domains (keep "Allow package managers" ticked). Steps: https://code.claude.com/docs/en/cloud-environments#network-access. Then I can diff production against `main` and run Lighthouse on the real host.

---

## 8. 30-day action list

| Week | Site (dev) | Off-site / marketing |
|---|---|---|
| 1 | #1 spam filter, #2 Resend init + live test, #6–#10 remove or substantiate claims, #36–#37 privacy fixes | Complete the Google profile; ask all past clients for reviews; Search Console + Bing; Gule Sider/1881/Proff |
| 2 | #23–#25 remove the page fade, hero delay and preloader; re-run Lighthouse | `smb-onboard`, `reactivate`; first 2 LinkedIn posts (intro + Brobekk) |
| 3 | #15–#16 booking/portal page + Sekundet CTA; #18 /om-oss with name and photo | Sekundet Reel; Center Rahma/Iqra introductions |
| 4 | #17, #19 link real clients from industry pages and /referanser; #30–#31 blog fixes; new "trossamfunn/forening" industry page | First monthly blog post; clinic outreach batch #1; assistant-test baseline |

**KPIs (monthly):**
- form and calendar enquiries
- Google profile calls, clicks and number of reviews
- Search Console impressions/clicks for the industry and area pages
- outreach sent → meetings → proposals → signed

Expect search and AI results 1–3 months after the fixes. Reviews, reactivation and outreach can produce conversations within weeks.

---

## 9. Questions for you

1. Does production deploy from `main`? Is `www.idweb.no` the canonical domain?
2. Where is the site hosted, and in which region? This decides #8.
3. Do you have a Google Business Profile with reviews? The site says "5/5" with no count.
4. What are the real domains for Vocura and Iqra, and can Brobekk, Center Rahma and Ringebu be linked?
5. Do you want "fra"-prices back on the site (see 3.3)?

---

## Sources

- SSB Norsk mediebarometer 2025 – https://www.ssb.no/kultur-og-fritid/tids-og-mediebruk/statistikk/norsk-mediebarometer/artikler/dette-er-de-mest-populaere-sosiale-mediene
- Google, AI features and your website – https://developers.google.com/search/docs/appearance/ai-features
- OpenAI crawlers – https://developers.openai.com/docs/gptbot
- BrightLocal local AI visibility study – https://www.brightlocal.com/research/local-ai-visibility-study/
- BrightLocal consumer review survey – https://www.brightlocal.com/research/local-consumer-review-survey/
- llms.txt experiment – https://otterly.ai/blog/the-llms-txt-experiment/
- Forbrukertilsynet, user reviews in marketing – https://www.forbrukertilsynet.no/lov-og-rett/veiledninger-og-retningslinjer/brukeromtaler-i-markedsforing
- Forbrukertilsynet, email/SMS marketing – https://www.forbrukertilsynet.no/lov-og-rett/veiledninger-og-retningslinjer/forbrukertilsynets-veiledning-markedsforing-via-e-post-sms-o-l
- Seland Rødl, email marketing to businesses – https://www.seland-roedl.no/nyheter/markedsforing-pr-epost-og-sms
- Ekomlov cookie rules from 1 Jan 2025 – https://www.regjeringen.no/no/aktuelt/endringer-i-lover-og-forskrifter-fra-1.-januar-2025-fra-digitaliserings-og-forvaltningsdepartementet/id3079637/
- Helsedirektoratet, new GP regulation – https://www.helsedirektoratet.no/rapporter/allmennlegetjenesten-arsrapport-2025-inklusive-status-mai-2026/organisering-og-oppgavedeling-i-fremtidens-allmennlegetjenester/ny-fastlegeforskrift
- Statsforvalteren, trossamfunn – https://www.statsforvalteren.no/portal/folk-og-samfunn/tros--og-livssynssamfunn/brukerveiledning-for-tros--og-livssynssamfunn/
- Google Business Profile service-area rules – https://support.google.com/business/answer/9157481
- Gule Sider listing update – https://www.gulesider.no/hjelp/sok-firma
- Mittanbud pricing – https://mittanbud.no/proff/aktuelt/hva-koster-mittanbud
- Oslo Business Region events – https://oslobusinessregion.no/articles/our-startup-events
- Market prices (Oslo) – https://websdesign.no/blogg/innlegg/nettside-pris-oslo-2025/ · https://smartbyra.no/nettside-for-bedriften/hva-koster-nettside-liten-bedrift
- Competitors – https://webtoget.no/ · https://www.godtlikt.no/pris-nettside · https://nettmakeriet.no/ · https://mementor.no/tjenester/webdesign/ · https://webaas.no/tjenester/webdesign-oslo/ · https://reboot.no/
