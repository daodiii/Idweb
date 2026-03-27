"use client";

import { MessageCircle, Zap, TrendingUp } from "lucide-react";
import { CountUpStat } from "@/components/ui/count-up-stat";

const COMPARISON = {
  competitor: {
    label: "Typisk byrå",
    items: [
      "WordPress med tunge plugins",
      "Lastetid 3–5 sekunder",
      "Snakker med en selger",
      "Ferdigmaler tilpasset «litt»",
    ],
  },
  us: {
    label: "IDweb",
    items: [
      "Next.js — bygget fra bunnen av",
      "Lastetid under 1 sekund",
      "Direkte linje til utvikleren",
      "100 % skreddersydd design",
    ],
  },
} as const;

export function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-[#111827]">
      {/* Subtle noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      <div className="relative z-[1] mx-auto max-w-5xl px-6 py-20">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-accent)]">
            Hvorfor velge oss
          </p>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
            Alt du trenger — én kontaktperson
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base font-light text-[var(--color-dark-muted)]">
            Ingen byråkrati, ingen mellomledd. Du får en dedikert utvikler som
            kjenner prosjektet ditt fra A til Å.
          </p>
        </div>

        {/* Bento Grid — 5-column for 60/40 split */}
        <div className="grid gap-2 sm:grid-cols-5">
          {/* Card 1: Direkte kontakt — wide (3/5), warm amber */}
          <div className="group rounded-xl border border-orange-400/10 bg-orange-400/[0.03] p-4 transition-[border-color] duration-300 hover:border-orange-400/20 sm:col-span-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-400/10">
                <MessageCircle className="h-4 w-4 text-orange-400" />
              </div>
              <span className="text-2xl font-black tracking-[-0.03em] text-orange-400">0</span>
              <span className="text-[11px] font-extralight uppercase tracking-[3px] text-orange-400/70">mellomledd</span>
            </div>
            <h3 className="mt-3 text-lg font-bold tracking-[-0.01em] text-[var(--color-dark-text)]">
              Direkte kontakt
            </h3>
            <p className="mt-1 text-base font-light leading-relaxed text-[var(--color-dark-muted)]">
              Du snakker alltid direkte med utvikleren som bygger nettsiden din.
              Ingen salgsavdeling, ingen ventetid — bare konkrete svar og rask
              fremdrift.
            </p>
          </div>

          {/* Card 2: Moderne teknologi — narrow (2/5), accent yellow */}
          <div className="group rounded-xl border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/[0.04] p-4 transition-[border-color] duration-300 hover:border-[var(--color-accent)]/25 sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
                <Zap className="h-4 w-4 text-[var(--color-accent)]" />
              </div>
              <span className="text-2xl font-black tracking-[-0.03em] text-[var(--color-accent)]">&lt;1s</span>
              <span className="text-[11px] font-extralight uppercase tracking-[3px] text-[var(--color-accent)]/70">lastetid</span>
            </div>
            <h3 className="mt-3 text-lg font-bold tracking-[-0.01em] text-[var(--color-dark-text)]">
              Moderne teknologi
            </h3>
            <p className="mt-1 text-base font-light leading-relaxed text-[var(--color-dark-muted)]">
              Vi bygger med Next.js og React — ikke WordPress-maler. Resultatet
              er raskere nettsider, bedre sikkerhet og høyere rangering på
              Google.
            </p>
          </div>

          {/* Card 3: Målbare resultater — narrow (2/5), cool sky/teal */}
          <div className="group rounded-xl border border-sky-400/10 bg-sky-400/[0.03] p-4 transition-[border-color] duration-300 hover:border-sky-400/20 sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-400/10">
                <TrendingUp className="h-4 w-4 text-sky-400" />
              </div>
              <span className="text-2xl font-black tracking-[-0.03em] text-sky-400">
                +<CountUpStat value={127} suffix="%" />
              </span>
              <span className="text-[11px] font-extralight uppercase tracking-[3px] text-sky-400/70">henvendelser</span>
            </div>
            <h3 className="mt-3 text-lg font-bold tracking-[-0.01em] text-[var(--color-dark-text)]">
              Målbare resultater
            </h3>
            <p className="mt-1 text-base font-light leading-relaxed text-[var(--color-dark-muted)]">
              Hver nettside bygges for konvertering. Vi setter opp sporing,
              måler resultater og optimaliserer løpende for flere henvendelser.
            </p>
          </div>

          {/* Card 4: Comparison — wide (3/5), neutral */}
          <div className="rounded-xl border border-[var(--color-dark-border)] bg-[var(--color-dark-glass)] p-4 sm:col-span-3">
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Competitor side */}
              <div className="sm:border-r sm:border-[var(--color-dark-border)] sm:pr-4">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[3px] text-red-400">
                  {COMPARISON.competitor.label}
                </p>
                <ul className="space-y-2">
                  {COMPARISON.competitor.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-base font-light text-[var(--color-dark-muted)]"
                    >
                      <span
                        className="mt-0.5 text-red-400/60"
                        aria-hidden="true"
                      >
                        ✕
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Us side */}
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-accent)]">
                  {COMPARISON.us.label}
                </p>
                <ul className="space-y-2">
                  {COMPARISON.us.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-base font-light text-slate-200"
                    >
                      <span
                        className="mt-0.5 text-[var(--color-accent)]"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
