# Spec: the whole site in the green IDweb brand

Agreed 18 November 2026.

## Objective

Move every page on idweb.no from navy, cobalt and orange to the green brand built around the Night Signal logo (brand guide: `selgenettside/idweb-brand/brand-guide.src.html`). One typeface everywhere: Plus Jakarta Sans, with Geist Mono for small technical text. The work ships as small PRs, one area at a time.

Done means:

- Every page uses the green palette and Plus Jakarta Sans.
- `grep -rniE "2447D6|1D3BBA|F2892B|F9A04F|B4560A" src` finds nothing. The same grep also covers `.tsx`/`.ts`, because components, OG images and the services scenes hard-code these colours too.
- Schibsted Grotesk and Mona Sans no longer load anywhere.
- Each part is its own reviewed PR with before/after screenshots at 1440 and 390 px.

## The palette

| Name | Hex | Role | Contrast |
|---|---|---|---|
| Forest | `#04442C` | Headings, dark grounds (footer), button hover | 10.8:1 on Paper |
| Pine | `#04754E` | Buttons, links, focus rings, small accent text | 5.5:1 on Paper, white on Pine 5.7:1 |
| Signal | `#028F5E` | Icons and large text only | 3.95:1 on Paper, so never body text |
| Lime | `#62B622` | Dots, marks and fills, sparingly | 2.4:1 on Paper, so never text on light; 4.4:1 on Forest (large text only) |
| Sun | `#FFC53D` (gradient `#FFE08A` → `#FFC53D` → `#E8960C`) | The showstopper: booking and next-step buttons only (decision 8) | Ink on it 7.1–13.2:1 across the gradient; 1.5:1 on Paper, so never text or thin lines on light |
| Paper | `#FAFAF9` | Page background | |
| Ink | `#131A3A` | Body text | 16.3:1 on Paper |

Roughly as the brand guide divides a page: Paper 60%, Ink 15%, Forest 13%, Pine/Signal 9%, Lime 3%.

## Token map

The tokens live in `src/styles/a-klar.css` (`.ka`, all pages) and are overridden for the homepage in `src/styles/a-klar-calm.css` (`:root:has(.ka.calm) .ka`).

| Old token | Old value | Used for | New value |
|---|---|---|---|
| `--cobalt` | `#2447D6` | Every button, action link, focus ring, field focus | Pine `#04754E` |
| button hover (`#1D3BBA`, and `--orange-btn-hover` in calm) | `#1D3BBA` | Hover on the primary button | Forest `#04442C` |
| `--accent` | `#2447D6` | Accent text and icons | Pine |
| `--accent-soft` | cobalt at 12% | Soft accent fills | Pine at 12%: `rgba(4,117,78,.12)` |
| `--link` | `#1A3FBF` | Text links | Pine |
| `--navy` | `#1E2A6E` | Footer ground, seal, dark CTA in demos, "deal ok" text | Forest |
| `--pass` / `--pass-soft` | navy / navy at 10% | Pass marks in the demos | Forest / `rgba(4,68,44,.1)` |
| `--orange` | `#F2892B` | Marker stroke (`.ka.calm .mk`), struck-through items, warning rule, list dots on tjenester | Lime `#62B622` as decoration. See open question 1 for the marker stroke |
| `--orange-btn` | `#F9A04F` | The «book» button on inner pages (calm already makes it cobalt) | Pine, with white text, same as every button |
| `--orange-btn-hover` | `#F58F35` | Its hover | Forest |
| `--orange-ink` | `#B4560A` | Orange text | Pine where it's emphasis; the warning colour (open question 2) where it means "missing" or "warning" |
| `--orange-tint` | `#FCEBDB` | Quote/CTA band ground, × badges in demos | Pale lime tint `#EEF6E6` (Forest text on it is about 10:1) |
| `--peach` | `#F9DABB` | Warm band ground | Paper (calm already does this) |
| `--tint` | `#EEF2FD` | Blue-tinted surfaces | Pale green tint `#EAF3EE` (Pine text on it 5.1:1) |
| `--signal` | `#FFB36B` | Stroke on the verdict tick and site toast in the demos | Lime. Renamed `--spark` so it doesn't clash with the brand's Signal green |
| `.ka.calm .mk path` stroke | `var(--orange)` at 42% / 90% | The hand-drawn marker behind one word per heading | Open question 1 |
| shadows `rgba(30,42,110,…)` | navy | Card, dropdown and phone shadows | Ink-based `rgba(19,26,58,…)`, the calm homepage's shadow colour |

### Neutrals on inner pages

The inner pages still run the older greys (`--bg:#FFFFFF`, `--ink:#14161B`, `--muted:#4A505B` …). They take the homepage's neutrals, so the whole site has one Paper and one Ink: `--bg` Paper `#FAFAF9`, `--ink` Ink `#131A3A`, `--muted #4B5170`, `--soft #575D7A`, `--faint #62677F`, `--line #E6E7EC`, `--line-strong #D8DAE2`, `--surface #F1F1EF`. The calm block then only keeps what is truly homepage-only.

### Headings

h1–h3 move from Ink to Forest, as the brand guide says. Body text stays Ink.

### Fonts

- `--font` in `a-klar.css` becomes Plus Jakarta Sans (`--font-jakarta`, already on `<body>`).
- `schibsted.variable` comes off `home-header`, `home-footer`, `site-menu`, `cookie-consent`, `layout` and the referanser pages; `Schibsted_Grotesk` leaves `src/lib/home/fonts.ts`.
- Mona Sans (`--font-mona`, display headings on om-oss, referanser/kundecase and the old hero rule) goes too, so one family carries every heading.
- OG images (`src/lib/og.tsx`) render with Satori, which needs woff files: Plus Jakarta Sans 600/800 woff (OFL) replace the Schibsted files in `og-fonts/`.

### What does not change

- Colours that depict other brands: the client-site mockups, client logos and the pastel work cards taken from each client's palette (`#163A5F`, `#2F5C37`, `#0B2328` and the like).
- Success green in the tjenester mock UIs (`#0E6B50` on `#DFECE3`) already reads as green; it becomes Pine on `#EAF3EE` so there's one green family.
- Radii, motion, layout, copy.

## Parts

One or two parts per PR. Each PR: before/after screenshots of every changed page at 1440 and 390 px (headless Playwright), WCAG AA text contrast checked, `npm run build` and `npm run lint` green.

**A. Tokens and font.** The token map above in `a-klar.css` and `a-klar-calm.css`, the inner-page neutrals, Forest headings, `--font` to Jakarta, Schibsted and Mona out of `fonts.ts` and every component that adds them. Buttons, links and focus rings turn green everywhere at once, because they read the tokens.

**B. Header, footer, menu, cookie banner.** `site-menu.css` (`--menu-bg #0B6B57` → Forest, mint → Lime tint), `header-menu.css`, the dropdown CTA green in `a-klar-calm.css` (`#0B6B57`/`#08523F`/`#1A7F68` → Pine/Forest/Signal), the Forest footer with the negative logo, `cookie-consent.tsx` (hard-coded `#2447D6`, `#14161B`, `#D9DCE2`).

**C. Homepage sections.** Remaining literals in `a-klar-calm.css` and the `.dx` demos in `a-klar.css`, the services scenes in `src/lib/home/services/scenes.ts` and `data.ts` (cobalt ticks, navy moon), the marker stroke, the night moment and the dark quote/contact band (open question 3).

**D. Tjenester pages.** `a-klar-tjenester.css`, `tjenester-calm.css` (46 cobalt uses, orange list dots and line, warning pills, `#1A4FC2` links) and `src/components/tjenester/step-art.tsx` (`ORANGE`).

**E. Referanser and kundecase.** `kundecase.css`, `client-tiles.css`, `src/app/referanser/page.tsx` and `[kunde]/page.tsx` (navy circle).

**F. The rest.** `a-klar-pages.css` (blogg, faq, kontakt, personvern, vilkar, webbyra-oslo, error, not-found), `a-klar-om-oss.css`, `src/lib/og.tsx` (OG images: orange/navy gradient, cobalt kicker, orange pill), then the final grep across `src`.

Suggested PRs: A alone, B, C, D, E+F. Each starts after the previous is merged, so every PR is reviewed against the live result of the last.

## Decisions (18 November 2026)

1. **Marker stroke:** the same hand-drawn stroke in Lime `#62B622`.
2. **Warning colour:** amber-brown `#8A5A00` text (5.7:1 on Paper) on pale sand `#F6ECD9`, only for the "warning", "missing", "low" and "not paid" states in the tjenester mock UIs.
3. **Night sections:** the night moment (Bjørvika under the northern lights, `#030817`) stays navy, since it's an illustration. The dark quote/contact band (`.qt`) moves to Forest.

Later decisions, made while the parts were built:

4. **«Slik jobber vi» band** (`#prosess`, homepage): pale green `#EAF3EE` instead of periwinkle (part C, 18 November).
5. **Demo fields on the service pages** (`#E9ECF7`): stay periwinkle (part D, 18 November).
6. **Dark CTA cards** (`.kc-cta` on case pages, `.cta-card` on inner pages): Forest instead of Ink, with a white button and Forest text, `#C9E8AE` on hover (part E, 19 November; `.cta-card` follows in part F).
7. **Faded scene steps** on the case pages: `#676C80` instead of `#B3B8C1`, so they pass AA on the grey ground at 4.6:1 (part E, 19 November).
8. **Sun, the showstopper colour** (19 November): one warm accent away from the green, kept to the buttons that move a visitor toward booking. It is built like the green button (a radial gradient whose light follows the pointer): `#FFE08A` at the light, Sun `#FFC53D` at 34%, `#E8960C` at the edge, with Ink text and an Ink chevron.
   - **Sun:** every `.btn.book` (the header on every page, the homepage hero, the service pages' «Book en gratis prat», om-oss), «Neste» in the price form, the menu dropdown's card, the side menu's button, and the buttons on the Forest CTA cards (`.cta-card`, `.kc-cta`). On Forest the Sun button replaces decision 6's white one.
   - **Stays Pine:** every other button (404, error, personvern, the /kontakt send button, the mid-page `/kontakt` links on om-oss and webbyra-oslo), links, ticks, focus rings.
   - **Never:** Sun text, Sun on large areas, or more than one Sun button in a view where it can be avoided.

## Still open

- The stray folder `selgenettside/idweb-inner-green` (leftover files only): delete or keep.
