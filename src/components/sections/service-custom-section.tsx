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
          case "nettbutikk":
            return <NettbutikkPayments />;
          case "seo":
            return <SeoRanking />;
          case "markedsforing":
            return <MarkedsforingPlatforms />;
          case "vedlikehold":
            return <VedlikeholdStats service={service} />;
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
   2. Nettbutikk — Payment provider logos
   ──────────────────────────────────────────────── */

function NettbutikkPayments() {
  const providers = [
    { name: "Vipps", color: "#FF5B24" },
    { name: "Klarna", color: "#FFB3C7" },
    { name: "Visa", color: "#1A1F71" },
    { name: "Mastercard", color: "#EB001B" },
    { name: "Apple Pay", color: "#000000" },
    { name: "Google Pay", color: "#4285F4" },
  ];

  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        Sømløs betaling med kjente løsninger
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {providers.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-center gap-3 rounded-xl border border-[var(--color-border)] bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div
              className="h-8 w-8 rounded-lg"
              style={{ backgroundColor: p.color }}
              aria-hidden="true"
            />
            <span className="font-semibold text-[var(--color-text)]">{p.name}</span>
          </div>
        ))}
      </div>

      {/* Mini checkout mockup */}
      <div className="mx-auto mt-8 max-w-sm rounded-xl border border-[var(--color-border)] bg-white p-5">
        <div className="mb-3 h-2 w-24 rounded bg-[var(--color-text-muted)]/20" />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Produkt</span>
            <span className="font-medium text-[var(--color-text)]">kr 499</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">Frakt</span>
            <span className="font-medium text-[var(--color-text)]">kr 49</span>
          </div>
          <div className="border-t border-[var(--color-border)] pt-2">
            <div className="flex justify-between text-sm font-bold">
              <span>Totalt</span>
              <span>kr 548</span>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-[var(--color-accent)] py-2.5 text-center text-sm font-semibold text-[var(--color-dark-bg)]">
          Betal med Vipps
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   3. SEO — Ranking bar chart
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
                className={`w-full rounded-t-md ${m.color} transition-all duration-700`}
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
   4. Markedsføring — Platform cards with ROI
   ──────────────────────────────────────────────── */

function MarkedsforingPlatforms() {
  const platforms = [
    { name: "Google Ads", color: "#4285F4", roi: "320%", desc: "Søkeannonser og remarketing" },
    { name: "Meta / Facebook", color: "#0668E1", roi: "280%", desc: "Målrettet annonsering" },
    { name: "Instagram", color: "#E4405F", roi: "250%", desc: "Visuell merkevarebygging" },
  ];

  return (
    <div>
      <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
        Vi annonserer der kundene dine er
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {platforms.map((p) => (
          <div
            key={p.name}
            className="rounded-xl border border-[var(--color-border)] bg-white p-6 text-center transition-shadow hover:shadow-md"
          >
            <div
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white text-lg font-bold"
              style={{ backgroundColor: p.color }}
              aria-hidden="true"
            >
              {p.name.charAt(0)}
            </div>
            <h4 className="font-semibold text-[var(--color-text)]">{p.name}</h4>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{p.desc}</p>
            <p className="mt-3 text-2xl font-extrabold text-[var(--color-accent)]">{p.roi}</p>
            <p className="text-xs text-[var(--color-text-muted)]">gj.snittlig ROI</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   5. Vedlikehold — Count-up stat counters
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
   6. Design — Color swatches + typography specimen
   ──────────────────────────────────────────────── */

function DesignSpecimen() {
  const swatches = [
    { color: "#F4CE14", name: "Gull" },
    { color: "#0F172A", name: "Mørkeblå" },
    { color: "#F5F7F8", name: "Lys grå" },
    { color: "#45474B", name: "Tekst" },
    { color: "#E8EBEC", name: "Bakgrunn" },
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
