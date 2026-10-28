# Spec: a calmer IDweb homepage

Agreed 27 October 2026 through a grilling session. Reference study: `selgenettside/docs/responsivmedia-design-report.md` (why responsivmedia.no looks calm and beautiful).

## Objective

Give idweb.no's homepage the calm, quiet look of responsivmedia.no without copying it. Keep IDweb's sections and animations, and refine them section by section under a much stricter design system. The homepage proves the look; the other pages follow in a later project.

What we take from the reference: few design decisions, repeated everywhere. One font, three colour roles, three corner radii, one easing family, one signature detail. Colour and variety come from the client work, not from the frame around it. Less on screen at once.

## Decisions

| # | Topic | Decision |
|---|---|---|
| 1 | Scope | Homepage only (`src/app/page.tsx`, `.ka` scope). Other pages later, once the look is approved. |
| 2 | Approach | Refine the existing sections. No rebuild. Keep the animations. |
| 3 | Colour | Three roles. **Ink:** dark navy, based on `#1E2A6E`, replacing `#14161B`. **Action:** cobalt `#2447D6`, used for every button and actionable link. **Accent:** orange `#F2892B`, only for the signature detail and small highlights, never for buttons. Background is off-white (around `#FAFAF9`), plus one grey surface for cards. Peach, the blue tint and the extra orange shades go. **Revised after Part 5 («Ny»):** soft pastels taken from each client's own palette colour the work cards and the testimonial card, and «Slik jobber vi» sits on one soft periwinkle field. |
| 4 | Font | One family. Plus Jakarta Sans and Schibsted Grotesk are compared side by side in Part 1, and the user picks. Headings at weight 500 with −0.03em letter spacing, line height 1.1 (h1) / 1.2 (h2). Body text at 17px with line height 1.7. The other families stop loading on the homepage, except a wordmark font if the logo needs one. |
| 5 | Signature detail | A loose, hand-drawn orange marker stroke behind **one** key word per section heading. It draws in once when it scrolls into view. |
| 6 | Motion | Keep the current animations. Every transition uses the existing `cubic-bezier(.23,1,.32,1)`: about 0.45s for UI and hovers, about 1–1.2s for reveals. The header hides when scrolling down and comes back when scrolling up, slightly see-through with a blur. Content is readable before any animation runs. |
| 7 | Big moment | Exactly one. First planned as the work section's lead image growing to full width (dropped in Part 3). **Revised after Part 5 («Ny»):** a full-width illustration after the services, Bjørvika from Ekeberg under the northern lights, with gentle motion (the aurora drifts, a ferry glides). |
| 8 | Imagery | Client work is the imagery, plus the one illustration we drew ourselves (decision 7): crops of real client sites, staged in identical soft grey cards with one radius, with varied arrangements inside (desktop + phone, a group of phones, a close-up). A free-licence stock photo (Unsplash/Pexels) only if it's clearly better than any client crop, credited in code and approved by the user one by one. |
| 9 | Radii | Three: pill (999px) for buttons and inputs, about 20px for images and large cards, about 14px for small cards. |
| 10 | Backgrounds | One page background for every section. The peach section backgrounds go. The dark navy footer stays as the closing bookend. **Revised after Part 5 («Ny»):** two exceptions, the night-sky moment and the soft field behind «Slik jobber vi». |
| 11 | Copy | Claude drafts new wording per section as it's reached, and the user edits it. Every text change is listed in the PR. |
| 12 | Logo | Out of scope. Judged again after Part 2. |
| 13 | Workflow | One worktree (`idweb-calm`, branch `feat/calm-homepage` and successors). One PR per part. The user reviews and merges before the next part starts. |

## Parts

Each part is one PR with before/after screenshots at 1440, 768 and 390px, a list of copy changes, and the Vercel preview link. Where there are variants, the preview shows both and the user picks before merging.

### Part 1: Foundations

- Homepage tokens in `src/styles/a-klar.css`: the colour roles, off-white background, surface, radii, durations and easing.
- The font test: a variant switch on the preview (e.g. `?font=jakarta` / `?font=schibsted`) so both can be compared on the real homepage. The losing font is removed before merge.
- Heading setting (weight 500, −0.03em, line heights) and 17px body text.
- Buttons switch from orange to cobalt.
- Stop loading unused font families on the homepage.
- Commit `.claude/launch.json` (production `start` entry and `dev` entry).

**Done when:** page-level furniture (header, section backgrounds, headings, intro text, buttons, cards, form fields) uses the new tokens, every button is cobalt, and Mona Sans no longer loads on the homepage. The mock interfaces inside the hero, services canvas and demos keep their own colours, radii and client faces until Parts 2–4 restyle them.

**Implementation note:** `a-klar.css` and its `.ka` scope are shared by about 14 pages, so the homepage opts in with `.ka.calm` and the overrides live in `src/styles/a-klar-calm.css`. The shared header and footer follow through `:root:has(.ka.calm)`.

### Part 2: Header and hero

- Header that hides on scroll down and returns on scroll up, see-through with blur.
- Two hero variants to compare:
  - **(a)** The current animation, calmed down (less skeleton UI), ending on a real finished client site.
  - **(b)** A still: one beautiful image in desktop, tablet and phone frames, with no UI clutter.
- Phone hero keeps a big headline and a visible primary button (today's phone hero is the baseline; don't make it worse).
- Signature marker stroke introduced on the hero headline.

**Done when:** the user has picked a hero variant and the other is removed.

**Outcome (27 October 2026):** variant B, the still, was chosen; the animation, its engine and styles are removed. Two changes came out of the review: the hero sits side by side from 1080 px (text left, picture right, both on the first screen), and the homepage side margins became 7% of the screen width (content capped at 1320 px), as on the reference. New headline from the user: «Vi lager nettsiden dere kan være stolte over.», marker on «stolte» (the user chose «dere» to match the lede).

### Part 3: Logo strip, work section and services canvas

- Logo strip: single-colour logos on the page background, no coloured tiles, still sliding.
- **New work section** after the logo strip:
  - **Kongsvinger Tannhelse** as the lead composition (the drawn town seen from the fortress). It grows from inset to full width as you scroll.
  - A row of three smaller staged projects: **Ringebu Tannlegesenter**, **Iqra** and **MK Auto**, each linking to its case page.
  - Source images: `public/images/kunder/<slug>/` where available; new crops captured where needed.
- Services canvas: one large, clean staged image per service instead of six small interfaces at once. The tabs and the side card stay.

**Done when:** each service tab shows one image, the expanding effect works on scroll and is static under reduced motion.

**Changes agreed while building (27 October 2026):** split into Part 3a (logo strip and work section) and Part 3b (services canvas). Because the hero already shows Kongsvinger's landscape, **MK Auto** became the lead and Kongsvinger moved into the row (its illustrated treatment cards). Ringebu's live domain still shows the old site, so its card shows the new design without a link. Iqra's site is built around photos of children, so its card uses crops with no faces (headline band and offer section). Kongsvinger and MK Auto link to their case pages, Iqra to its live site.

**Revised after review (27 October 2026):** the user turned down the large MK Auto band and the heading about each business getting its own site. The section now follows the reference: a stack of grey cards on the left, each staging one client with the phone in front (MK Auto desktop and phone, three Iqra phones, Kongsvinger phone over its treatment cards, Ringebu desktop), and the text on the right, sticky while the cards scroll. Heading: «Vi hjelper bedrifter, små og store, med å lykkes på nett.» The scroll-driven expanding band (decision 7) is dropped. kongsvingertannhelse.no also still serves the clinic's older site, so no card or caption links to a client domain; one link leads to /referanser.

**Part 3b outcome (27 October 2026):** the «Lerretet» board (five examples on one canvas, a flying camera, «Se alt») is replaced by one example at a time. A row of pill tabs sits under the heading; below it, the chosen service is described on the left and its drawn example (fictional client, labelled «Eksempelkunde») sits alone in a grey card on the right, the mirror of the work section above so two layouts in a row never repeat. Each example builds once the first time its tab is chosen and stays finished after that; reduced motion shows every example finished. Below 900 px the example comes first, then the text, and the tab row scrolls inside itself on phones. The marker moved from «én» to «leverandør» (a two-letter marker read as a smudge). The scenes' easings (`--eo`, `--eio`) were never defined, so the pointer jumped instead of gliding; they are now set on the scene canvas. After review the user asked for the examples to stay animated but calmer: steps start 1.28× later and motions run 1.08× longer than the original timelines, so one step settles before the next (each example plays in about 6.5–10 s; a first try at 8–12 s was 25% too slow); the bounce and blur entrances are gone. The first example builds when it scrolls into view (its finished frame shows until then). Every tab click plays its example from the start, including the tab already showing: with «build once», Nettside had usually played before anyone looked and then read as a static template. Screenshots: `calm-homepage-shots/part-3b/`.

### Part 4: The two demos

- "Slik jobber vi" and "Når kunden trykker, ordner systemet resten" keep exactly their current behaviour.
- Restyle to the new tokens, remove the peach background, thin out small details so less is on screen at once.
- No new features.

**Outcome (27 October 2026):** same scenes, tabs and timelines; a calmer frame. The dot grids and the stage border are gone, so the stages are the same grey cards as the work and services sections. «Slik jobber vi» now has the picture on the left and the steps on the right, the mirror of the services section above it. Markers on «jobber» and «resten». The bounce on pops and the blur on rises and label swaps are gone, and everything plays 1.25× slower than authored, the services' calm pace (Prosess panels about 3.7–5.5 s, Systemer about 7–9.6 s). Inactive steps and tabs use the readable grey instead of a faint one (that faint grey failed AA). «Valgt bort» is grey instead of peach. The systems summary follows the steps instead of sinking to the bottom. Fixed a live bug: `a-klar-pages.css` pads every `.ka .cta` as a page section, and the phone button in the systems demo has the same class name, so it rendered as a 224 px navy block with no label. Before/after screenshots: `calm-homepage-shots/part-4/`.

### Part 5: Testimonials, quote request and footer

- Testimonials: keep the big quote. Add the person's name and role only where the client agrees. Logos below the quote become single-colour.
- Quote request: restyle only (cobalt button, new corners and type, no peach). Steps and logic unchanged.
- Footer: dark navy stays. Add the Google rating only with real numbers from IDweb's Google Business profile, and only if the review count is meaningful.

**Outcome (27 October 2026):** testimonials stay credited to the organisation only (the user's choice for now; no person names or roles are on file). The quote sits alone on a plain grey card: the per-client tint, the inset shadow and the logo watermark are gone, and the quote is large again (20–28 px). It had shrunk to 16 px since Part 1, because the base `font:` shorthand names `--font-mona`, which no longer loads, so the browser dropped the whole declaration. The four logos below wait in one tone like the logo strip, with no coloured tiles; after review the user asked for the chosen logo to take its own colours (Rahma green, Iqra yellow and black, Brobekk blue and orange, Ringebu teal), and the guillemets and a short bar under the logo pick up the client's colour. Markers added on «kundene» and «pristilbud», and every marker on the page now draws when its heading scrolls into view (`marker-reveal.tsx`) instead of all at once on load. The quote form and footer already met the calm system after Part 1 (measured AA, no peach) and are unchanged. Google: IDweb's listing shows 5.0 from 4 reviews (27 October 2026), the same four clients quoted on the page, so no rating was added; worth adding once there are more reviews. Screenshots: `calm-homepage-shots/part-5/`.

### Spacing pass (after Part 5)

**Outcome (27 October 2026):** every homepage section was padded 112 px top and bottom, so two sections met with 224 px of space between them; the reference pads its sections about 6% of the width (86 px at 1440). One padding now serves every section: `--sec-pad: clamp(64px, 6vw, 88px)`, plus slightly tighter testimonial spacing. Section heights at 1440, before → after: services 1,008 → 957, «Slik jobber vi» 857 → 806, «Når kunden trykker» 1,170 → 1,119, testimonials 961 → 886, quote request 944 → 893 (the work stack, 2,415 → 2,364, is long on purpose, like the reference's own stack). Median 961 → 893 px against the reference's 855. The page is 332 px shorter at 1440. Screenshots: `calm-homepage-shots/spacing/`.

### «Ny»: the bolder layer (after Part 5)

**Why:** after Part 5 the user judged the page clean but not elite. A design critique found the same treatment repeated (one grey rounded box after another), no big moment, a polite hero and three mock-interface sections in a row. Three moves were built as a switchable preview (`?look=ny`), compared with the calm page, and chosen.

**Outcome (27 October 2026):**
- **Bigger hero:** the headline runs across the top (about 80 px at 1440, up from 52), the picture is larger and runs off the right edge, and the three promises are ink lines with a cobalt tick instead of small grey text.
- **Colour from the clients:** each work card sits on a pastel from that client's palette (blush for MK Auto, sage for Iqra, sky for Kongsvinger, mint for Ringebu). The testimonial card takes the selected client's tint, and «Slik jobber vi» sits on a soft periwinkle field.
- **One full-width moment** after the services: Bjørvika seen from Ekeberg under the northern lights, our own SVG illustration (`scripts/illustrations/bjorvika/`). The layout and relative heights follow real photos on Wikimedia Commons, used as reference only; the bench, boats and aurora are artistic. The heading «Du snakker med den som bygger.» sits in the sky; the caption reads «Bjørvika sett fra Ekeberg, tegnet av IDweb.». It is built as three image layers (sky, aurora, city; about 131 KB gzipped) so only transforms move. The aurora drifts over 26 s and the ferry glides over 80 s, and reduced motion holds both still.

Two illustration rounds came before it: a Kongsvinger dusk crop, then whole-city drawings of Oslo that were not true to the real view. The user asked for Bjørvika, drawn from what is really there.

**Review round (27 October 2026):**
- **A quieter hero:** only the headline and the button. The lede and the three ticked promises are gone, the headline is a step smaller (about 65 px at 1440, 36 px on phones) and sits beside the picture, so everything is on the first screen. The user's rule: no captions that tell visitors what a picture shows, so the hero caption and the Bjørvika caption are gone too.
- **The quote request ends under the northern lights («Nordlys»),** chosen from six designs over two rounds (an estimate sheet, one question at a time, a live sketch of their site, a letter). The section is a night sky with the moment's aurora drifting at the top, lightening into the footer's navy so the page closes in one sweep. Left: «La oss lage noe dere blir stolte av.», a lede saying it is uforpliktende, and three terms already stated elsewhere on the site (fast pris avtalt før vi starter, ingen bindingstid, svar innen 24 timer). Right: the same wizard on a bright card, with numbered steps, white choice tiles and the extras as a checklist. The side summary is read out to screen readers only; «Så langt» and «Dette sender dere» now show at every width. Steps, logic and e-mail are unchanged.
- **New pictures in two work cards,** captured headless from each client's newest `main` (Ringebu 22 October, Kongsvinger 24 October), because the old Ringebu shot showed a design the clinic no longer uses. Ringebu is now desktop and phone side by side like MK Auto, showing the current front page with the clinic photos and «Hos oss er du i trygge hender». Kongsvinger chose the site's own drawing of the fortress and the town, full bleed, with the front page on the phone in front; the illustrated treatment cards are gone. Still no links to either client domain.
- **A wide menu and new buttons.** After comparing six header designs, «Tjenester» opens a panel as wide as the header, as on responsivmedia.no (the user's favourite): each service a card in a client pastel with one line about it, and a navy card «Usikker på hva dere trenger?» with a booking button. The header runs wider than the content (4% side margins). Other pages keep the plain dropdown. The buttons combine two famous ideas the user picked: a light that follows the pointer (airbnb.com) and a chevron that grows into an arrow on hover (stripe.com). **Revises decision 3:** the action colour is now aurora green `#0B6B57` (white text 6.5:1; the glow's lightest point `#1A7F68` is 4.9:1), replacing cobalt on the homepage, so links, ticks and steps follow it. Berry was tried first; the user chose the green, which echoes the northern lights.
- **Shorter testimonials and a full-width phone button.** Each client is shown by one sentence from their own quote, set large and taken word for word (`HIGHLIGHT` in `src/lib/home/testimonials.ts`, checked by `quoteSentence` at build time); «Les hele» opens the whole quote in place, and choosing another client closes it. The section is 798 px tall at 1440 (was 886) and 828 px on a phone (was 1,000). On phones the hero button runs the full width, and the header button drops its chevron so it never presses against the logo.

**Finishing round (28 October 2026),** the items held back when PR #27 merged:
- **Work section:** the heading and lede sit above, and the four clients stand in a 2 × 2 grid from 601 px up, so nothing stays pinned and the section is about half as long (1,250 px at 1440, was 2,364; 925 px at 768, was 2,499). Phones keep the single column.
- **The two demos no longer follow each other:** the testimonials now sit between «Slik jobber vi» and «Når kunden trykker».
- **Logo strip:** Center Rahma and MK Auto get their names beside the mark, so every client reads as mark and name (Iqra's wordmark already holds its name). The names show only on the homepage; /om-oss keeps its tiles.
- **Leftover cobalt:** the form fields' focus ring takes the green. The example scenes keep their fictional clients' own colours.
- The homepage is 7,818 px at 1440, 1,201 px shorter than when PR #27 merged.

## Rules for every part

- Animations switch off when the visitor's system asks for reduced motion.
- Text and buttons meet WCAG AA contrast.
- Nothing is hidden while waiting for an animation.
- No horizontal scrolling at 390px.
- No invented statistics, quotes or client claims.
- Check behaviour on the production build (`npm run build && npm run start`), not only `next dev`.
- Browser checks run headless.

## Out of scope

- Pages other than the homepage.
- The IDweb logo.
- Changes to the form logic, demo logic, Sanity content or email flows.

## Open items (resolved during the parts)

- Font choice: Part 1.
- Hero variant: decided in Part 2 (the still).
- «du» or «dere»: decided in Part 2 («dere»).
- Which clients agree to name and role on testimonials: before Part 5.
- Google review count: checked in Part 5.
- Any copy the user already wants to change: slotted into the matching part.
