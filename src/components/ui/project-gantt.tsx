"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";

const EASE = [0.23, 1, 0.32, 1] as const;
const TOTAL_DAYS = 14;

type Milestone = { day: number; label: string };

type Phase = {
  index: number;
  title: string;
  description: string;
  startDay: number;
  endDay: number;
  milestones: Milestone[];
};

const PHASES: Phase[] = [
  {
    index: 1,
    title: "Kartlegging",
    description: "Vi blir kjent med deg og kartlegger målgruppen din.",
    startDay: 1,
    endDay: 3,
    milestones: [
      { day: 1, label: "Kickoff" },
      { day: 3, label: "Behovsanalyse" },
    ],
  },
  {
    index: 2,
    title: "Design & utvikling",
    description: "Vi designer skreddersydd og bygger med Next.js fra bunnen av.",
    startDay: 3,
    endDay: 11,
    milestones: [
      { day: 5, label: "Designforslag" },
      { day: 8, label: "Revisjon klar" },
      { day: 11, label: "Utvikling klar" },
    ],
  },
  {
    index: 3,
    title: "Lansering",
    description: "Vi lanserer, måler hastighet og følger opp.",
    startDay: 11,
    endDay: 14,
    milestones: [
      { day: 12, label: "QA fullført" },
      { day: 14, label: "Live!" },
    ],
  },
];

const AXIS_TICKS = [1, 3, 5, 7, 9, 11, 14];

// Map a day (1..14) to a percentage along the timeline (0..100)
function dayToPercent(day: number): number {
  return ((day - 1) / (TOTAL_DAYS - 1)) * 100;
}

// ─── Component ──────────────────────────────────────────────────────────────
export function ProjectGantt() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  // Tracker translates from 0% to 100% across the timeline width.
  // Clamp so the tracker stays at edges before/after the section.
  const trackerProgressRaw = useTransform(
    scrollYProgress,
    [0.18, 0.82],
    [0, 1],
  );
  const trackerProgress = useTransform(trackerProgressRaw, (v) =>
    Math.max(0, Math.min(1, v)),
  );
  const trackerPercent = useTransform(trackerProgress, (v) => `${v * 100}%`);
  const trackerTransform = useMotionTemplate`translateX(${trackerPercent})`;
  const trackerOpacity = useTransform(trackerProgress, (v) =>
    v < 0.005 ? 0 : v > 0.995 ? 0 : 1,
  );

  return (
    <div
      ref={wrapperRef}
      className="relative mt-16 lg:mt-24"
      role="figure"
      aria-label="Prosjektløp på 14 dager med tre faser: Kartlegging, Design og utvikling, Lansering"
    >
      {/* ── Desktop: horizontal Gantt ── */}
      <div className="hidden md:block">
        {/* Top badge */}
        <div className="mb-8 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
            Prosjektløp
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/35">
            · 14 dager
          </span>
        </div>

        {/* Gantt grid */}
        <div className="relative">
          {/* Time axis */}
          <div className="relative ml-[140px] pb-2">
            <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
              <span>Uke 1</span>
              <span>Uke 2</span>
            </div>
            <div className="relative mt-2 h-px bg-white/[0.08]">
              {AXIS_TICKS.map((d) => (
                <span
                  key={d}
                  className="absolute top-0 -translate-x-1/2"
                  style={{ left: `${dayToPercent(d)}%` }}
                >
                  <span aria-hidden className="block h-1.5 w-px bg-white/15" />
                  <span className="absolute left-1/2 top-2 -translate-x-1/2 font-mono text-[10px] text-white/35">
                    D{d}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* Phase rows */}
          <div className="mt-10 space-y-12">
            {PHASES.map((phase, phaseIdx) => (
              <PhaseRow
                key={phase.index}
                phase={phase}
                phaseIdx={phaseIdx}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>

          {/* Vertical "Du er her" tracker — covers timeline area (right of labels) */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[140px] right-0 top-0 bottom-0"
            style={{ opacity: trackerOpacity }}
          >
            <motion.div
              className="absolute top-0 bottom-0 w-px"
              style={{ transform: trackerTransform }}
            >
              <div className="relative h-full w-px bg-gradient-to-b from-[#F4CE14]/0 via-[#F4CE14]/55 to-[#F4CE14]/0">
                {/* Anchor dot at the top */}
                <span
                  className="absolute -left-[3px] -top-[3px] block h-[7px] w-[7px] rounded-full bg-[#F4CE14] shadow-[0_0_0_3px_rgba(244,206,20,0.18)]"
                />
                {/* "Du er her" label */}
                <span className="absolute left-2 top-1 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.18em] text-[#F4CE14]/85">
                  Du er her
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile: vertical timeline ── */}
      <div className="md:hidden">
        <div className="mb-6 flex items-center gap-3">
          <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
            Prosjektløp · 14 dager
          </span>
        </div>

        <div className="relative pl-10">
          {/* Vertical track */}
          <div
            aria-hidden
            className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#F4CE14]/40 via-[#F4CE14]/15 to-[#F4CE14]/0"
          />
          <div className="space-y-10">
            {PHASES.map((phase) => (
              <MobilePhaseCard key={phase.index} phase={phase} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Desktop phase row ──────────────────────────────────────────────────────
function PhaseRow({
  phase,
  phaseIdx,
  prefersReducedMotion,
}: {
  phase: Phase;
  phaseIdx: number;
  prefersReducedMotion: boolean;
}) {
  const left = dayToPercent(phase.startDay);
  const right = dayToPercent(phase.endDay);
  const width = right - left;

  const barDelay = phaseIdx * 0.25;
  const barDuration = 0.7;

  return (
    <motion.div
      className="grid grid-cols-[140px_1fr] items-start gap-4"
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: barDelay, ease: EASE }}
    >
      {/* Label column */}
      <div>
        <div
          aria-hidden
          className="select-none font-serif text-3xl font-black leading-none tracking-tight text-[#F4CE14]/30"
        >
          {String(phase.index).padStart(2, "0")}
        </div>
        <h3 className="mt-2 font-serif text-lg font-black leading-tight tracking-tight text-white sm:text-xl">
          {phase.title}
        </h3>
      </div>

      {/* Bar + milestones + description */}
      <div className="relative pt-4">
        {/* Bar container (relative to align with axis) */}
        <div className="relative h-7">
          {/* Bar */}
          <motion.div
            className="absolute top-1/2 h-[18px] -translate-y-1/2 overflow-hidden rounded-full"
            style={{
              left: `${left}%`,
              width: `${width}%`,
              background:
                "linear-gradient(90deg, #F4CE14 0%, #FFE15D 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 18px -10px rgba(244,206,20,0.55)",
              transformOrigin: "left center",
            }}
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : barDuration,
              delay: prefersReducedMotion ? 0 : barDelay,
              ease: EASE,
            }}
          />

          {/* Milestone dots — positioned absolutely on the row */}
          {phase.milestones.map((m) => {
            const dotPosition = dayToPercent(m.day);
            // Dot pop-in fires after the bar reaches that day.
            const phaseWidth = phase.endDay - phase.startDay;
            const dotFraction =
              phaseWidth === 0
                ? 1
                : (m.day - phase.startDay) / phaseWidth;
            const dotDelay = barDelay + dotFraction * barDuration;

            return (
              <motion.div
                key={`${phase.index}-${m.day}-${m.label}`}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${dotPosition}%` }}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, scale: 0.5 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.32,
                  delay: prefersReducedMotion ? 0 : dotDelay,
                  ease: EASE,
                }}
              >
                <span
                  aria-hidden
                  className="relative block h-3 w-3 rounded-full bg-[#0a0a0a] ring-2 ring-[#F4CE14]"
                >
                  <span className="absolute inset-[3px] block rounded-full bg-[#F4CE14]" />
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Milestone labels — sit below the bar, aligned with dots */}
        <div className="relative mt-3 h-4">
          {phase.milestones.map((m) => {
            const phaseWidth = phase.endDay - phase.startDay;
            const dotFraction =
              phaseWidth === 0
                ? 1
                : (m.day - phase.startDay) / phaseWidth;
            const labelDelay =
              barDelay + dotFraction * barDuration + 0.08;
            return (
              <motion.span
                key={`${phase.index}-label-${m.day}-${m.label}`}
                className="absolute top-0 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-white/55"
                style={{ left: `${dayToPercent(m.day)}%` }}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.28,
                  delay: prefersReducedMotion ? 0 : labelDelay,
                  ease: EASE,
                }}
              >
                {m.label}
              </motion.span>
            );
          })}
        </div>

        {/* Description */}
        <motion.p
          className="mt-7 max-w-[60ch] text-sm leading-relaxed text-white/55"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.5,
            delay: barDelay + barDuration,
            ease: EASE,
          }}
        >
          {phase.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── Mobile phase card ──────────────────────────────────────────────────────
function MobilePhaseCard({ phase }: { phase: Phase }) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* Phase node — sits on the vertical track */}
      <span
        aria-hidden
        className="absolute -left-[34px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0a] ring-2 ring-[#F4CE14]"
      >
        <span className="font-mono text-[10px] font-bold text-[#F4CE14]">
          {String(phase.index).padStart(2, "0")}
        </span>
      </span>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl font-black leading-tight tracking-tight text-white">
            {phase.title}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
            D{phase.startDay} – D{phase.endDay}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {phase.description}
        </p>
        <ul className="mt-4 space-y-1.5">
          {phase.milestones.map((m) => (
            <li
              key={m.day}
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/65"
            >
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full bg-[#F4CE14]"
              />
              <span className="text-[#F4CE14]/70">D{m.day}</span>
              <span className="text-white/60">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
