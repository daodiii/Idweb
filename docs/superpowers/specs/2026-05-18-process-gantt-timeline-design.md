# Process Section — "Project Flight Plan" Gantt Design Spec

**Date:** 2026-05-18
**Status:** Approved
**Author:** IDweb / Ilyas

---

## Problem

The current `process-section.tsx` is three alternating left/right image-and-text rows. It works but reads as a generic "how we work" template — three big photos, three paragraphs, indistinguishable from any other Norwegian agency site. The information (3 steps) doesn't justify the visual weight, and the photos themselves are stock-style placeholders.

## Goal

Replace the three image rows with a horizontal **Gantt-style project timeline** — a 14-day plan with three phase bars, milestone dots, and a scroll-driven "Du er her" tracker. The visual says "this person plans projects properly" and gives the visitor a concrete sense of what the delivery looks like.

Non-goals:
- No tooltips / no hover interactions (always-visible labels keep it readable)
- No new dependencies (uses `motion/react`'s `useScroll`, already installed)
- Don't delete the `/images/process/step-*.png` assets — they stay in the repo
- Don't change the existing eyebrow / headline / subhead

## Architecture

### Files

| File | Change |
|------|--------|
| `src/components/ui/project-gantt.tsx` | **NEW** — the Gantt component (~300 lines) |
| `src/components/sections/process-section.tsx` | Delete `STEPS` constant, delete the `<ol>` of image rows, mount `<ProjectGantt />` below the headline block |
| `src/app/globals.css` | ~25 lines: bar-draw, milestone-pop, tracker pulse, reduced-motion overrides |

### Component layout

```
┌─────────────────────────────────────────────────────────────────┐
│  PROSJEKTLØP · 14 DAGER                                          │
│                                                                  │
│  ┌─ Time axis ─────────────────────────────────────────────────┐ │
│  │ UKE 1                              UKE 2                    │ │
│  │ ┃    ┃    ┃    ┃    ┃    ┃    ┃    ┃    ┃    ┃    ┃    ┃   │ │
│  │ D1   D3   D5   D7   D9   D11  D14                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  01  KARTLEGGING                                                 │
│      ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                         │
│      ●     ●                                                     │
│      Kickoff Behovsanalyse                                       │
│      Vi blir kjent med deg og prosjektet ditt.                   │
│                                                                  │
│  02  DESIGN & UTVIKLING                                          │
│      ░░░██████████████████████░░░░░░░░░                          │
│         ●         ●          ●                                   │
│         Designforslag Revisjon  Utvikling klar                  │
│      Vi designer og bygger nettsiden din.                        │
│                                                                  │
│  03  LANSERING                                                   │
│      ░░░░░░░░░░░░░░░░░░░░░░░░░██████████                         │
│                                ●    ●                            │
│                                QA   Live!                        │
│      Vi lanserer og følger opp.                                  │
│                                                                  │
│        ↑ vertical yellow "Du er her" tracker, traces scroll      │
└─────────────────────────────────────────────────────────────────┘
```

### Data model

Inside `project-gantt.tsx`:

```ts
type Milestone = { day: number; label: string };
type Phase = {
  index: number;          // 01, 02, 03
  title: string;
  description: string;
  startDay: number;
  endDay: number;
  milestones: Milestone[];
};

const TOTAL_DAYS = 14;
const PHASES: Phase[] = [
  {
    index: 1,
    title: "Kartlegging",
    description: "Vi blir kjent med deg og kartlegger målgruppen din.",
    startDay: 1,
    endDay: 2,
    milestones: [
      { day: 1, label: "Kickoff" },
      { day: 2, label: "Behovsanalyse" },
    ],
  },
  {
    index: 2,
    title: "Design & utvikling",
    description: "Vi designer skreddersydd og bygger med Next.js.",
    startDay: 2,
    endDay: 11,
    milestones: [
      { day: 4, label: "Designforslag" },
      { day: 7, label: "Revisjon klar" },
      { day: 10, label: "Utvikling klar" },
    ],
  },
  {
    index: 3,
    title: "Lansering",
    description: "Vi lanserer, optimaliserer og følger opp.",
    startDay: 11,
    endDay: 14,
    milestones: [
      { day: 12, label: "QA fullført" },
      { day: 14, label: "Live!" },
    ],
  },
];
```

### Geometry

- Time axis is mapped to a CSS grid of `TOTAL_DAYS = 14` columns
- Each phase bar's left/width is computed from `startDay`/`endDay` as percentages of `TOTAL_DAYS`
- Milestone dot's left is `(day - 1) / TOTAL_DAYS * 100%` (where day 1 = 0% and day 14 = 100% — actually `day / TOTAL_DAYS` works if we treat day-N as the end of that day; use `(day - 0.5) / TOTAL_DAYS` to center the dot in the day's column)

### Animations

1. **Bar draw-in on enter** (via `whileInView` from motion/react):
   - Each phase bar starts at `transform: scaleX(0)` with `transform-origin: left`
   - On viewport intersection, animates to `scaleX(1)` over 700ms
   - Staggered 250ms between phases (phase 2 starts 250ms after phase 1, etc.)
   - Easing: `cubic-bezier(0.23, 1, 0.32, 1)`

2. **Milestone dots pop in**:
   - Each dot starts at `transform: scale(0.5)` + `opacity: 0`
   - Animates to `scale(1)` + `opacity: 1` over 280ms
   - Pop-in fires when the bar drawing reaches the dot's day position — i.e., dot animation delay = phase start delay + `(milestone.day - phase.startDay) / (phase.endDay - phase.startDay) * 700ms`

3. **Vertical "Du er her" tracker**:
   - A 1px-wide yellow vertical line spanning the full timeline height
   - Position driven by scroll progress through the section via `useScroll`:
     ```ts
     const { scrollYProgress } = useScroll({
       target: sectionRef,
       offset: ["start end", "end start"],
     });
     const trackerLeft = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
     ```
   - The `[0.15, 0.85]` clamp means the tracker is at 0% when section is just entering and at 100% when section is just exiting, with the middle 70% of scroll mapping to the full timeline
   - A small "Du er her" label sits above the line, fades in once tracker has moved past 5%
   - Pulses gently via `box-shadow` glow

4. **Phase labels and descriptions**:
   - Fade in on viewport enter (opacity 0 → 1 over 400ms), no transform-heavy effect needed

### Visual style

- **Bars**: Yellow gradient `linear-gradient(90deg, #F4CE14 0%, #FFE15D 100%)`, height 22px, `rounded-full`, subtle inner highlight via `inset 0 1px 0 rgba(255,255,255,0.18)`
- **Phase numbers** ("01", "02", "03"): big serif font-black, `text-[#F4CE14]/30`, sits to the left of each row
- **Phase titles**: font-serif, font-black, white, tracking-tighter
- **Milestone dots**: 8px diameter, solid yellow with 2px dark ring, positioned on the bar
- **Milestone labels**: font-mono, 10px, white/55, positioned below the dot with a 1px connector line
- **Day ticks**: font-mono, 10px, white/30
- **Tracker line**: 1px yellow `bg-[#F4CE14]/50`, with a 6px diameter yellow circle anchor at the top of the line (sits in the time axis row)

### Responsive

- **≥lg (1024px)**: horizontal Gantt, full layout described above
- **md (768–1023px)**: same layout, slightly smaller — phase number column collapses
- **<md (mobile)**: switches to a vertical timeline:
  - Left rail: vertical yellow track with 3 phase nodes
  - Right: each phase as a card showing title, dates, milestones (as bullet list), description
  - No scroll tracker on mobile (the linear layout already shows progression)
- The component renders both versions, hiding/showing via Tailwind responsive classes

### Accessibility

- Wrap with `role="figure"` + `aria-label="Prosjektløp på 14 dager med tre faser: Kartlegging, Design og utvikling, Lansering"`
- Phase titles use semantic `<h3>` so headings hierarchy is correct
- Milestone labels are real text content — screen-readable
- `prefers-reduced-motion: reduce`:
  - Bars render in final state, no scaleX animation
  - Milestone dots render in final state, no pop-in
  - Tracker still updates with scroll (it's not motion sickness territory — it's a position indicator), but without any smooth interpolation glow
- The tracker is `aria-hidden="true"` since it's purely visual

### Performance

- Single `useScroll` hook in the component; no manual `scroll` event listeners (per Vercel guidelines)
- All animations are transform/opacity only; tracker uses `useTransform` to map scroll progress to a `left` value, but the value is applied via `motionValue` so it stays on the compositor
- Wait — `left` is a layout property. Per guidelines, animate transform only. Fix: use `transform: translateX(var(--tracker))` instead of `left`. Apply the motion value to a CSS variable on the container, then transform within.
- Initial paint: bars rendered with `scaleX(0)` in static markup; React state hydration triggers the `whileInView` animation. No SSR/hydration mismatch.

### What's removed from `process-section.tsx`

- The `STEPS` constant
- The `<ol>` and all `<motion.li>` step rows
- The `next/image` import (no images here anymore)
- The `useReducedMotion` hook usage (handled internally by `ProjectGantt` if needed; the headline section keeps motion-driven entry)

### Out of scope

- Hover tooltips on bars (always-visible labels carry the info)
- Editable / interactive timeline (it's a visual representation, not a tool)
- Real client data — these are illustrative milestones for the Starter package
- Custom durations per package (visualization shows Starter's 14-day flow only)
- Holiday / weekend marking on the timeline
