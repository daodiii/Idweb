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
| 3 | Colour | Three roles. **Ink:** dark navy, based on `#1E2A6E`, replacing `#14161B`. **Action:** cobalt `#2447D6`, used for every button and actionable link. **Accent:** orange `#F2892B`, only for the signature detail and small highlights, never for buttons. Background is off-white (around `#FAFAF9`), plus one grey surface for cards. Peach, the blue tint and the extra orange shades go. |
| 4 | Font | One family. Plus Jakarta Sans and Schibsted Grotesk are compared side by side in Part 1, and the user picks. Headings at weight 500 with −0.03em letter spacing, line height 1.1 (h1) / 1.2 (h2). Body text at 17px with line height 1.7. The other families stop loading on the homepage, except a wordmark font if the logo needs one. |
| 5 | Signature detail | A loose, hand-drawn orange marker stroke behind **one** key word per section heading. It draws in once when it scrolls into view. |
| 6 | Motion | Keep the current animations. Every transition uses the existing `cubic-bezier(.23,1,.32,1)`: about 0.45s for UI and hovers, about 1–1.2s for reveals. The header hides when scrolling down and comes back when scrolling up, slightly see-through with a blur. Content is readable before any animation runs. |
| 7 | Big scroll moment | Exactly one: the work section's lead image grows from inset to full width as you scroll. Nowhere else. |
| 8 | Imagery | Client work is the imagery: crops of real client sites, staged in identical soft grey cards with one radius, with varied arrangements inside (desktop + phone, a group of phones, a close-up). A free-licence stock photo (Unsplash/Pexels) only if it's clearly better than any client crop, credited in code and approved by the user one by one. |
| 9 | Radii | Three: pill (999px) for buttons and inputs, about 20px for images and large cards, about 14px for small cards. |
| 10 | Backgrounds | One page background for every section. The peach section backgrounds go. The dark navy footer stays as the closing bookend. |
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

### Part 4: The two demos

- "Slik jobber vi" and "Når kunden trykker, ordner systemet resten" keep exactly their current behaviour.
- Restyle to the new tokens, remove the peach background, thin out small details so less is on screen at once.
- No new features.

### Part 5: Testimonials, quote request and footer

- Testimonials: keep the big quote. Add the person's name and role only where the client agrees. Logos below the quote become single-colour.
- Quote request: restyle only (cobalt button, new corners and type, no peach). Steps and logic unchanged.
- Footer: dark navy stays. Add the Google rating only with real numbers from IDweb's Google Business profile, and only if the review count is meaningful.

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
