"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/types";
import { CountUpStat } from "@/components/ui/count-up-stat";

interface ServiceCustomSectionProps {
  service: Service;
}

const EASE = [0.23, 1, 0.32, 1] as const;

export function ServiceCustomSection({ service }: ServiceCustomSectionProps) {
  switch (service.id) {
    case "nettside":
      return <NettsideShowcase />;
    case "vedlikehold":
      return <VedlikeholdStats service={service} />;
    case "design":
      return <DesignSpecimen />;
    default:
      return null;
  }
}

/* ────────────────────────────────────────────────
   Shared shell — dark ambient bg + editorial header
   ──────────────────────────────────────────────── */

interface ShellProps {
  eyebrow: string;
  headOpener: string;
  headEmphasis: string;
  headCloser: string;
  body: string;
  /** css gradient position e.g. "82% 22%" — vary per section for rhythm. */
  spotlight: string;
  children: React.ReactNode;
}

function Shell({
  eyebrow,
  headOpener,
  headEmphasis,
  headCloser,
  body,
  spotlight,
  children,
}: ShellProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 45% at ${spotlight}, rgba(244,206,20,0.13), transparent 62%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            {eyebrow}
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              {headOpener}
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                {headEmphasis}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              {headCloser}
            </span>
          </h2>

          <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
            {body}
          </p>
        </motion.div>

        {children}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────
   1. Nettside — device/responsive editorial list
   ──────────────────────────────────────────────── */

const RESPONSIVE_ROWS = [
  {
    code: "DSK",
    label: "Desktop",
    width: "1440px+",
    description:
      "Full layout med rikt visuelt hierarki — der besøkende dykker dypt inn i innholdet.",
  },
  {
    code: "TAB",
    label: "Nettbrett",
    width: "768–1280px",
    description:
      "Justert kolonnestruktur som balanserer bilde og tekst på lesebrett og iPad.",
  },
  {
    code: "MOB",
    label: "Mobil",
    width: "360–767px",
    description:
      "Mobil-først navigasjon, store trykkflater og kontaktknapper innen rekkevidde.",
  },
];

function NettsideShowcase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Shell
      eyebrow="Responsivt design"
      headOpener="Én nettside,"
      headEmphasis="alle enheter"
      headCloser="— samme følelse overalt."
      body="Vi bygger nettsiden lag for lag, fra mobil og oppover. Resultatet er en opplevelse som føles riktig enten kunden sitter på toget eller foran en stor skjerm."
      spotlight="82% 22%"
    >
      <div className="mt-16 lg:mt-24">
        <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            Bruddpunkter
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            03 / Skjermstørrelser
          </span>
        </div>

        <ul>
          {RESPONSIVE_ROWS.map((row, i) => (
            <motion.li
              key={row.code}
              className="flex items-start gap-6 border-t border-white/[0.06] py-6 first:border-t-0 sm:gap-10"
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : i * 0.06,
                ease: EASE,
              }}
            >
              <div className="w-20 shrink-0 sm:w-28">
                <span
                  className="font-serif font-black leading-none tracking-tight text-[#F4CE14]"
                  style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)" }}
                >
                  {row.code}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold tracking-[-0.005em] text-white sm:text-xl">
                    {row.label}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {row.width}
                  </span>
                </div>
                <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-white/65 sm:text-base">
                  {row.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

/* ────────────────────────────────────────────────
   2. Vedlikehold — editorial stat strip
   ──────────────────────────────────────────────── */

function VedlikeholdStats({ service }: { service: Service }) {
  const prefersReducedMotion = useReducedMotion();

  if (!service.trustStats?.length) return null;

  return (
    <Shell
      eyebrow="Tall som teller"
      headOpener="Drift som"
      headEmphasis="gir trygghet"
      headCloser="— uten å mase om det."
      body="Vi holder nettsiden trygg, oppdatert og rask hver eneste dag. Du merker det bare når noe ville gått galt — og det gjorde det ikke."
      spotlight="18% 28%"
    >
      <div className="mt-16 lg:mt-24">
        <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-4">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            Nøkkeltall
          </p>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            {String(service.trustStats.length).padStart(2, "0")} / Indikatorer
          </span>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3">
          {service.trustStats.map((stat, i) => (
            <motion.li
              key={stat.label}
              className={`border-t border-white/[0.06] py-8 sm:border-l sm:py-10 sm:first:border-l-0 ${
                i === 0 ? "sm:pl-0" : "sm:pl-8"
              } ${i < service.trustStats.length - 1 ? "sm:pr-8" : ""}`}
              initial={
                prefersReducedMotion ? false : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : i * 0.07,
                ease: EASE,
              }}
            >
              <p
                className="text-[#F4CE14]"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
              >
                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

/* ────────────────────────────────────────────────
   3. Design — palette + typography editorial grid
   ──────────────────────────────────────────────── */

const SWATCHES = [
  { hex: "#F4CE14", name: "Gull", role: "Aksent" },
  { hex: "#0a0a0a", name: "Sort", role: "Bakgrunn" },
  { hex: "#fafaf9", name: "Hvit", role: "Tekst" },
  { hex: "#1a1a1a", name: "Tekst", role: "Brødtekst" },
  { hex: "#f0f0ef", name: "Sand", role: "Flate" },
];

const TYPE_SAMPLES = [
  {
    family: "Cabinet Grotesk",
    role: "Overskrift",
    sample: "En komplett identitet.",
    className: "font-serif text-3xl font-black tracking-[-0.02em] text-white sm:text-4xl",
  },
  {
    family: "Outfit",
    role: "Brødtekst",
    sample: "Lett å lese, rolig å se på, fungerer i alle størrelser.",
    className: "text-lg leading-relaxed text-white/75 sm:text-xl",
  },
  {
    family: "JetBrains Mono",
    role: "Detalj",
    sample: "/* uppercase tracking 0.22em */",
    className: "font-mono text-sm uppercase tracking-[0.18em] text-white/60",
  },
];

function DesignSpecimen() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Shell
      eyebrow="Visuell identitet"
      headOpener="Farger, typografi"
      headEmphasis="og en stemme"
      headCloser="som henger sammen."
      body="Identiteten din skal bære nettsiden, visittkortet og signaturen — uten å falle fra hverandre. Vi setter rammene som gjør at alt ser ut som det samme stedet."
      spotlight="92% 78%"
    >
      <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              Palett
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              {String(SWATCHES.length).padStart(2, "0")} / Toner
            </span>
          </div>

          <ul>
            {SWATCHES.map((s, i) => (
              <motion.li
                key={s.hex}
                className="flex items-center gap-5 border-t border-white/[0.06] py-4 first:border-t-0"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 12 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : i * 0.05,
                  ease: EASE,
                }}
              >
                <div
                  aria-hidden
                  className="h-12 w-12 shrink-0 rounded-xl border border-white/10"
                  style={{ backgroundColor: s.hex }}
                />
                <div className="flex-1">
                  <p className="font-bold text-white">{s.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {s.role}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                  {s.hex}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-16 lg:col-span-7 lg:mt-0">
          <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-4">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              Typografi
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              03 / Stemmer
            </span>
          </div>

          <ul>
            {TYPE_SAMPLES.map((t, i) => (
              <motion.li
                key={t.family}
                className="border-t border-white/[0.06] py-8 first:border-t-0"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 12 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  delay: prefersReducedMotion ? 0 : i * 0.06,
                  ease: EASE,
                }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4CE14]">
                    {t.family}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                    {t.role}
                  </span>
                </div>
                <p className={`mt-4 ${t.className}`}>{t.sample}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </Shell>
  );
}
