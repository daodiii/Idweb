# IDweb redesign — handover

Read this first in any new session working on the redesign. Last updated 2026-10-05 (round 4).

## Where the work lives

- **Branch:** `claude/focused-clarke-xb113x` (based on `main`, not merged, no PR). A new
  session is usually given a different branch — fetch this one and build on it:
  `git fetch origin claude/focused-clarke-xb113x && git checkout -B <your-branch> origin/claude/focused-clarke-xb113x`
- **Mockups:** `docs/redesign/mockups/` (copies of the published artifact pages, see below).

## The owner and how they want to work

- Daod Ilyas runs IDweb alone (footer: «IDweb v/ Daod Ilyas · Org.nr 837 228 972»,
  hei@idweb.no, 984 06 164). Felt the old site was sloppy and full of filler; wants a
  site that shows he is a world-class web designer.
- Wants **unique, x-factor animation and motion** — but the old site's gimmicks
  (cursor flashlight, 3D carousel, scroll-dead zones, «demodata» timelines) are exactly
  what made it feel sloppy. Motion must feel crafted, not bolted on.
- **Honest copy only.** No invented stats or claims. Claims that are fine (from the
  owner's own content): «ca. 2 uker» for a simple site, «svar innen 24 timer», fast
  pris, ingen bindingstid, direct contact with the developer who writes the code.
- Norwegian (bokmål) for all user-facing text. «Vi» vs «jeg» voice is **undecided**.
- Logo: current ornate 3D emblem is still in use; switching to a wordmark is **undecided**.
- Always respect `prefers-reduced-motion` and make everything work at phone width.

## Done (committed on the branch)

1. Removed filler pages, with 308 redirects in `next.config.ts`:
   `/webutvikler/*` (6 cities + hub), `/nettside/*` (15 industries + hub),
   `/tjenester/webutvikler-oslo`, the whole blog (`/blogg/*`).
2. Services are now three: **Skreddersydd nettside** (`/tjenester/nettside`),
   **Drift og SEO** (`/tjenester/drift-og-seo`, merged SEO + maintenance),
   **IDweb-portalen** (`/tjenester/portal`). Webshop service dropped.
   `/tjenester/seo` and `/tjenester/vedlikehold` → drift-og-seo; `/tjenester/nettbutikk` → `/tjenester`.
3. IDweb-portalen copy is based on the private repo `daodiii/idweb-portal` (modules:
   AI-chat, Booking, Omtaler + one Innboks). ⚠ That portal has **never run in
   production** and never sent an email — the page must not imply it is live or used by clients.
4. Chosen visual direction: **C «Nordisk ro»** — white ground, pine ink, sage surfaces.
   Tokens in `src/app/globals.css` (`--color-nordic-*`: bg #ffffff, ink #13302a,
   accent #1e5a4c, accent-hover #174a3e, mint #a8e0c8, sage #eaf1ee, mist #f5f8f7,
   muted #4a5f59, line #dce6e2). Display font Schibsted Grotesk (`--font-display`).
5. Homepage top rebuilt (`src/components/sections/home-hero.tsx`,
   `site-showcase.tsx`, `src/lib/content/showcase.ts`): animated hero + rotating
   project showcase. Light navbar on `/` only. Rest of the homepage below it is still
   the old dark «Monument» sections.

## Changed decision — not yet applied in code

**The owner no longer wants projects on the front page.** A few selected projects go
on the Referanser page instead, so only interested visitors see them. So:

- The homepage needs a **completely new hero** that stands on its own (no project
  showcase), with motion that carries through the rest of the page.
- Once a hero is chosen: remove `SiteShowcase` from `src/app/page.tsx`, build the new
  hero, then redesign the remaining homepage sections, then the other pages.

## Mockup rounds so far (don't repeat these ideas)

| Round | Artifact | Concepts | Outcome |
|---|---|---|---|
| 1 | https://claude.ai/artifact/5r37qrx95HkAV7unr28suy | A Verkstedet (light, «jeg»), B Mørk presisjon (dark + yellow), C Nordisk ro | **C chosen** |
| 2 | https://claude.ai/artifact/Nd7P4JKRZzKq5vQJ1AvTxJ | Hero + project showcase: A Byggeplassen (page builds itself, tiles), B Stabelen (3D card deck, brand tint), C Gjennom bokstavene (sites inside «valgt.», zoom through the «l») | Superseded — projects leave the homepage |
| 3 | https://claude.ai/artifact/VvenbWvVNaFfpsUUUNpCbU | No projects: A Avgangstavla (split-flap board + timetable services), B Samarbeid (page builds itself, «Daod» multiplayer cursor that chats), C Høydekurver (live contour map, cursor raises terrain, coordinates readout) | Owner: still looks like generic AI design. Wants 3 more, «super unique», world class |
| 4 | https://claude.ai/artifact/9SqNxmSiqbvVcrDp4iazE6 | No projects, and no template layout: A Marmorert (live paper marbling, cursor combs the ink), B Korrektur (a red pen edits agency filler down to «Jeg lager nettsider.»), C Dagslys (real Oslo sunlight through a window, type casts shadows, scroll = time of day) | Awaiting the owner's pick |

Local copies: `docs/redesign/mockups/round1-direction-c-nordisk-ro.dc.html`,
`round2-hero-showcase.html` (expects images at `img/…`; sources are
`public/images/showcase/` and `public/images/portfolio/`), `round3-hero-no-projects.html`,
`round4-hero-no-projects.html`.
Rounds 2–3 are single self-contained HTML pages with a floating concept switcher —
a good template for the next round. Each concept = hero + the services section under
it, so the owner sees how the motion carries down the page.

## Round 4 notes

The owner's feedback on round 3 was that it still looked AI-made: pill badge with a pulsing dot,
big centred headline, two pill buttons, three equal cards. Round 4 drops that template entirely.
Each concept takes one physical material and lets it drive both the layout and the motion:

- **A Marmorert.** Real marbling maths (Jaffer & Lu): drops push older ink outwards, combs rake it.
  Rendered in a WebGL2 shader that traces each pixel backwards through the operations, so it runs
  in one pass per frame. There's a 2D-canvas fallback. The hero is a marbled sheet with a
  bookbinder's label. Every visit gets a new seeded pattern («Ark nr.»), and the cursor drags
  through the ink. Scrolling combs the ink. The services are three marbled bands (stone, combed,
  wave patterns) that marble themselves when they come into view.
- **B Korrektur.** The hero opens on a paragraph of agency filler. A fountain pen strikes it out
  with handwritten insertions and margin notes («Bare meg.», «Sier alle.»), signs «Til trykk,
  Daod», and the remaining words morph into «Jeg lager nettsider.». The handwriting is EMS Allure
  (single-stroke font, SIL OFL) drawn stroke by stroke. In the services, the pen strikes each
  buzzword sentence as it scrolls into view. **This concept commits to «jeg»**, which is the joke,
  so it only works if the owner goes with «jeg».
- **C Dagslys.** «Nettsider som tåler dagslys.» The sun's position is computed for Oslo right
  now. A window's light patch (with a swaying birch twig) falls on a plaster wall, and the
  mounted type casts real shadows inside it. Scrolling moves the clock towards sunset: shadows
  lengthen and the light warms. After dark it shows tomorrow afternoon's light and says so.
  Hovering a headline word lifts it off the wall, the CTA presses in, and the cursor casts a
  shadow too.

## Open items

- **Screenshots of client sites are poor.** Old full-page captures in
  `public/images/portfolio/` have large blank areas (scroll-reveal content never
  rendered). Brobekk was recaptured properly (`public/images/showcase/`). The owner has
  new and improved sites to add. Options: allow the client domains in the cloud
  environment's network settings and capture live; or approve running the client
  repos locally (the safety classifier blocked it once); or a capture script the owner
  runs locally. Client repos: `Brobekklege/nettside` (static HTML),
  `Centerrahma/rahmanettside`, `daodiii/Ringebu`, `Iqrasenter/IqraSenter`,
  `daodiii/vocura` (Next.js); possibly also `mk-auto/automk`, `daodiii/Dralitaufiq`,
  `daodiii/iqra-foundation`, `daodiii/herbsoslo` — ask before using.
- Shared service-page copy («Hver side settes sammen for hånd», «Fra første samtale til
  lansering») only fits the website service — fix in the redesign.
- Cookie banner still in the old dark/yellow style.
- `npm run lint` has 18 pre-existing errors on `main` (not from this work).
