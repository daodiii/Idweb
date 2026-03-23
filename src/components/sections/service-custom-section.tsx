"use client";

import type { Service } from "@/types";
import { Section } from "@/components/ui/section";
import { CountUpStat } from "@/components/ui/count-up-stat";

interface ServiceCustomSectionProps {
  service: Service;
}

export function ServiceCustomSection({ service }: ServiceCustomSectionProps) {
  return (
    <Section>
      {(() => {
        switch (service.id) {
          case "nettside":
            return <NettsideShowcase />;
          case "seo":
            return null;
          case "vedlikehold":
            return null;
          case "design":
            return <DesignSpecimen />;
          default:
            return null;
        }
      })()}
    </Section>
  );
}

/* ────────────────────────────────────────────────
   1. Nettside — CSS device frame mockups
   ──────────────────────────────────────────────── */

function NettsideShowcase() {
  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        Tilpasset alle enheter
      </h3>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-end">
        {/* Laptop */}
        <div className="w-full max-w-xs">
          <div className="rounded-t-lg border-4 border-b-0 border-slate-700 bg-gradient-to-br from-[var(--color-dark-bg)] to-[var(--color-dark-bg-alt)] p-4">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-[var(--color-accent)]/40" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="h-2 w-3/4 rounded bg-white/10" />
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="h-12 rounded bg-white/5" />
                <div className="h-12 rounded bg-[var(--color-accent)]/10" />
                <div className="h-12 rounded bg-white/5" />
              </div>
            </div>
          </div>
          <div className="h-3 rounded-b-lg bg-slate-600" />
          <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">Desktop</p>
        </div>

        {/* Tablet */}
        <div className="w-28">
          <div className="rounded-lg border-4 border-slate-700 bg-gradient-to-br from-[var(--color-dark-bg)] to-[var(--color-dark-bg-alt)] p-3">
            <div className="space-y-1.5">
              <div className="h-2 w-10 rounded bg-[var(--color-accent)]/40" />
              <div className="h-1.5 w-full rounded bg-white/10" />
              <div className="h-1.5 w-2/3 rounded bg-white/10" />
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                <div className="h-8 rounded bg-white/5" />
                <div className="h-8 rounded bg-[var(--color-accent)]/10" />
              </div>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">Nettbrett</p>
        </div>

        {/* Phone */}
        <div className="w-16">
          <div className="rounded-xl border-4 border-slate-700 bg-gradient-to-br from-[var(--color-dark-bg)] to-[var(--color-dark-bg-alt)] p-2">
            <div className="space-y-1">
              <div className="h-1.5 w-6 rounded bg-[var(--color-accent)]/40" />
              <div className="h-1 w-full rounded bg-white/10" />
              <div className="h-1 w-2/3 rounded bg-white/10" />
              <div className="mt-1.5 h-6 rounded bg-white/5" />
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">Mobil</p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   2. SEO — Ranking bar chart
   ──────────────────────────────────────────────── */

function SeoRanking() {
  const months = [
    { label: "Mnd 1", height: 20, color: "bg-slate-400" },
    { label: "Mnd 2", height: 35, color: "bg-slate-400" },
    { label: "Mnd 3", height: 50, color: "bg-[var(--color-accent)]" },
    { label: "Mnd 4", height: 65, color: "bg-[var(--color-accent)]" },
    { label: "Mnd 5", height: 80, color: "bg-[var(--color-accent)]" },
    { label: "Mnd 6", height: 95, color: "bg-[var(--color-accent)]" },
  ];

  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        Resultater som vokser over tid
      </h3>

      <div className="mx-auto max-w-md rounded-2xl border border-[var(--color-border)] bg-white p-6">
        <p className="mb-4 text-sm font-semibold text-[var(--color-text-muted)]">Organisk trafikk</p>
        <div className="flex items-end justify-between gap-3" style={{ height: 160 }}>
          {months.map((m) => (
            <div key={m.label} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md ${m.color} transition-[height] duration-700`}
                style={{ height: `${m.height}%` }}
              />
              <span className="text-[10px] text-[var(--color-text-muted)]">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-md justify-center gap-8">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-[var(--color-accent)]">+150%</p>
          <p className="text-xs text-[var(--color-text-muted)]">mer trafikk</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-extrabold text-[var(--color-accent)]">Side 1</p>
          <p className="text-xs text-[var(--color-text-muted)]">på Google</p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   3. Vedlikehold — Count-up stat counters
   ──────────────────────────────────────────────── */

function VedlikeholdStats({ service }: { service: Service }) {
  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        Tall som gir trygghet
      </h3>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {service.trustStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[var(--color-border)] bg-white p-6 text-center"
          >
            <p className="text-4xl font-extrabold text-[var(--color-accent)]">
              <CountUpStat
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   4. Design — Color swatches + typography specimen
   ──────────────────────────────────────────────── */

function DesignSpecimen() {
  const swatches = [
    { color: "#F4CE14", name: "Gull" },
    { color: "#0a0a0a", name: "Sort" },
    { color: "#fafaf9", name: "Hvit" },
    { color: "#1a1a1a", name: "Tekst" },
    { color: "#f0f0ef", name: "Bakgrunn" },
  ];

  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        En komplett visuell identitet
      </h3>

      {/* Color swatches */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
        {swatches.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2">
            <div
              className="h-14 w-14 rounded-full border border-[var(--color-border)] shadow-sm"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-xs text-[var(--color-text-muted)]">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Typography specimen */}
      <div className="mx-auto max-w-md rounded-xl border border-[var(--color-border)] bg-white p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Typografi</p>
        <p className="font-[var(--font-heading)] text-3xl font-bold text-[var(--color-text)]">
          Crimson Pro
        </p>
        <p className="mt-1 text-lg text-[var(--color-text-muted)]">
          Outfit — brødtekst som er lett å lese
        </p>
        <p className="mt-1 font-mono text-sm text-[var(--color-text-muted)]">
          JetBrains Mono — for kode
        </p>
      </div>

      {/* Logo variant boxes */}
      <div className="mx-auto mt-6 grid max-w-md grid-cols-3 gap-3">
        <div className="flex h-20 items-center justify-center rounded-lg bg-[var(--color-dark-bg)]">
          <span className="text-xs font-bold text-[var(--color-accent)]">Logo lys</span>
        </div>
        <div className="flex h-20 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white">
          <span className="text-xs font-bold text-[var(--color-dark-bg)]">Logo mørk</span>
        </div>
        <div className="flex h-20 items-center justify-center rounded-lg bg-[var(--color-accent)]">
          <span className="text-xs font-bold text-[var(--color-dark-bg)]">Logo ikon</span>
        </div>
      </div>
    </div>
  );
}
