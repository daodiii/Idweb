"use client";

import { accentInk, type MockupKind } from "@/lib/content/landing-identity";

/**
 * IndustryMockup — the "proof is the product" hero asset.
 *
 * Each landing page leads with a bespoke, industry-specific UI rendered inside
 * a browser frame: the actual kind of site we'd build for that trade. One
 * parametrised component, swapped per industry via `kind` + `accent`, so 21
 * pages get 21 distinct hero assets without 21 bespoke files. Strictly
 * icon-free — identity is carried by type, shape and the scarce accent.
 */

interface IndustryMockupProps {
  kind: MockupKind;
  accent: string;
  business: string;
  /** Override the browser URL (geo pages pass a place-based domain). */
  url?: string;
  className?: string;
}

function domainFrom(business: string): string {
  return (
    business
      .toLowerCase()
      .replace(/&/g, "og")
      .replace(/[æ]/g, "ae")
      .replace(/[ø]/g, "o")
      .replace(/[å]/g, "a")
      .replace(/[^a-z0-9]/g, "") + ".no"
  );
}

export function IndustryMockup({ kind, accent, business, url, className }: IndustryMockupProps) {
  const ink = accentInk(accent);
  const soft = `color-mix(in srgb, ${accent} 15%, transparent)`;
  const line = `color-mix(in srgb, ${accent} 42%, transparent)`;
  const domain = url ?? domainFrom(business);

  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-[420px] overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#141416] shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_40px_80px_-40px_rgba(0,0,0,0.9)] ${className ?? ""}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#19191c] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-md bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] text-white/45">
          {domain}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <MockupBody kind={kind} accent={accent} ink={ink} soft={soft} line={line} business={business} domain={domain} />
      </div>
    </div>
  );
}

interface BodyProps {
  kind: MockupKind;
  accent: string;
  ink: string;
  soft: string;
  line: string;
  business: string;
  domain: string;
}

function MockupBody({ kind, accent, ink, soft, line, business, domain }: BodyProps) {
  switch (kind) {
    case "booking":
      return <Booking accent={accent} ink={ink} line={line} business={business} />;
    case "call":
      return <Call accent={accent} ink={ink} soft={soft} business={business} />;
    case "quote":
      return <Quote accent={accent} ink={ink} line={line} business={business} />;
    case "valuation":
      return <Valuation accent={accent} ink={ink} soft={soft} business={business} />;
    case "menu":
      return <Menu accent={accent} ink={ink} business={business} />;
    case "gallery":
      return <Gallery accent={accent} soft={soft} business={business} />;
    case "membership":
      return <Membership accent={accent} ink={ink} business={business} />;
    case "directory":
      return <Directory accent={accent} ink={ink} line={line} business={business} />;
    case "dev":
      return <Dev accent={accent} ink={ink} soft={soft} domain={domain} />;
  }
}

/* ── Shared atoms ───────────────────────────────────────────────── */

function Header({ business, tag, accent }: { business: string; tag: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-6 w-6 place-items-center rounded-md text-[11px] font-bold" style={{ background: accent, color: accentInk(accent) }}>
        {business.charAt(0)}
      </span>
      <span className="text-[13px] font-medium text-white">{business}</span>
      <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider" style={{ color: accent }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        {tag}
      </span>
    </div>
  );
}

function AccentBar({ accent, ink, children }: { accent: string; ink: string; children: React.ReactNode }) {
  return (
    <div className="mt-4 grid place-items-center rounded-lg py-2.5 text-[12px] font-semibold" style={{ background: accent, color: ink }}>
      {children}
    </div>
  );
}

function Slot({ active, accent, ink, line, children }: { active?: boolean; accent: string; ink: string; line: string; children: React.ReactNode }) {
  return (
    <span
      className="grid place-items-center rounded-md py-2 text-center font-mono text-[11px]"
      style={
        active
          ? { background: accent, color: ink, fontWeight: 600 }
          : { border: `1px solid ${line}`, color: "rgba(255,255,255,0.6)" }
      }
    >
      {children}
    </span>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">{label}</div>
      <div className="mt-1 rounded-md border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-[12px] text-white/50">{value}</div>
    </div>
  );
}

/* ── Variants ───────────────────────────────────────────────────── */

function Booking({ accent, ink, line, business }: { accent: string; ink: string; line: string; business: string }) {
  return (
    <div>
      <Header business={business} tag="Åpen nå" accent={accent} />
      <div className="mt-4 text-[13px] font-medium text-white">Bestill time</div>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5">
        {["Man", "Tir", "Ons", "Tor"].map((d, i) => (
          <Slot key={d} active={i === 1} accent={accent} ink={ink} line={line}>{d}</Slot>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        {["09:00", "10:30", "13:00"].map((t, i) => (
          <Slot key={t} active={i === 1} accent={accent} ink={ink} line={line}>{t}</Slot>
        ))}
      </div>
      <AccentBar accent={accent} ink={ink}>Bekreft time</AccentBar>
    </div>
  );
}

function Call({ accent, ink, soft, business }: { accent: string; ink: string; soft: string; business: string }) {
  return (
    <div>
      <Header business={business} tag="Vakt 24/7" accent={accent} />
      <div className="mt-4 flex items-center gap-3 rounded-lg border border-white/[0.08] px-3.5 py-3" style={{ background: soft }}>
        <span className="h-7 w-1 rounded-full" style={{ background: accent }} />
        <span className="font-mono text-[17px] font-medium tracking-tight text-white">+47 22 14 90 21</span>
      </div>
      <AccentBar accent={accent} ink={ink}>Ring nå</AccentBar>
      <div className="mt-3 flex gap-1.5">
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Svarer raskt</span>
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Rykker ut i dag</span>
      </div>
    </div>
  );
}

function Quote({ accent, ink, line, business }: { accent: string; ink: string; line: string; business: string }) {
  return (
    <div>
      <Header business={business} tag="Få pris" accent={accent} />
      <div className="mt-4 grid gap-2.5">
        <Field label="Navn" value="Kari Nordmann" />
        <Field label="Hva gjelder det?" value="Fast renhold, kontor 240 m²" />
      </div>
      <AccentBar accent={accent} ink={ink}>Be om tilbud</AccentBar>
      <div className="mt-2 text-center font-mono text-[10px] text-white/40" style={{ borderColor: line }}>Svar samme dag</div>
    </div>
  );
}

function Valuation({ accent, ink, soft, business }: { accent: string; ink: string; soft: string; business: string }) {
  return (
    <div>
      <Header business={business} tag="Megler" accent={accent} />
      <div className="mt-4 text-[13px] font-medium text-white">Hva er boligen verdt?</div>
      <div className="mt-2.5">
        <Field label="Adresse" value="Thorvald Meyers gate 24, Oslo" />
      </div>
      <AccentBar accent={accent} ink={ink}>Få gratis verdivurdering</AccentBar>
      <div className="mt-3 flex items-center justify-between rounded-lg px-3 py-2.5" style={{ background: soft }}>
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/55">Estimat</span>
        <span className="font-mono text-[13px] font-medium" style={{ color: accent }}>4,2–4,7 mill</span>
      </div>
    </div>
  );
}

function Menu({ accent, ink, business }: { accent: string; ink: string; business: string }) {
  const dishes: [string, string][] = [
    ["Burrata, tomat & basilikum", "165"],
    ["Hjemmelaget pasta", "245"],
    ["Sjokoladefondant", "135"],
  ];
  return (
    <div>
      <Header business={business} tag="Meny" accent={accent} />
      <div className="mt-3.5 divide-y divide-white/[0.06]">
        {dishes.map(([name, price]) => (
          <div key={name} className="flex items-baseline justify-between py-2.5">
            <span className="text-[12.5px] text-white/80">{name}</span>
            <span className="font-mono text-[12px]" style={{ color: accent }}>{price}</span>
          </div>
        ))}
      </div>
      <AccentBar accent={accent} ink={ink}>Bestill bord</AccentBar>
    </div>
  );
}

function Gallery({ accent, soft, business }: { accent: string; soft: string; business: string }) {
  return (
    <div>
      <Header business={business} tag="Prosjekter" accent={accent} />
      <div className="mt-3.5 grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative h-[58px] overflow-hidden rounded-md"
            style={{ background: i === 0 ? soft : "rgba(255,255,255,0.05)" }}
          >
            {i === 0 && (
              <span className="absolute left-1.5 top-1.5 rounded-sm px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider" style={{ background: accent, color: accentInk(accent) }}>
                Før / Etter
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3.5 inline-flex items-center gap-1.5 font-mono text-[11px] font-medium" style={{ color: accent }}>
        Se alle prosjekter
        <span aria-hidden>→</span>
      </div>
    </div>
  );
}

function Membership({ accent, ink, business }: { accent: string; ink: string; business: string }) {
  return (
    <div>
      <Header business={business} tag="Medlem" accent={accent} />
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="font-mono text-[24px] font-medium tracking-tight text-white">399</span>
        <span className="font-mono text-[11px] text-white/45">kr / mnd</span>
      </div>
      <ul className="mt-3 space-y-2">
        {["Fri trening, døgnet rundt", "Alle gruppetimer inkludert", "Ingen bindingstid"].map((t) => (
          <li key={t} className="flex items-center gap-2.5 text-[12px] text-white/70">
            <span className="h-px w-3.5 flex-shrink-0" style={{ background: accent }} />
            {t}
          </li>
        ))}
      </ul>
      <AccentBar accent={accent} ink={ink}>Bli medlem</AccentBar>
    </div>
  );
}

function Directory({ accent, ink, line, business }: { accent: string; ink: string; line: string; business: string }) {
  const areas = ["Arverett & skifte", "Familie & barnefordeling", "Eiendom & kontrakt"];
  return (
    <div>
      <Header business={business} tag="Advokat" accent={accent} />
      <div className="mt-4 space-y-1.5">
        {areas.map((a) => (
          <div key={a} className="flex items-center justify-between rounded-md px-3 py-2.5" style={{ border: `1px solid ${line}` }}>
            <span className="text-[12.5px] text-white/80">{a}</span>
            <span aria-hidden style={{ color: accent }}>→</span>
          </div>
        ))}
      </div>
      <AccentBar accent={accent} ink={ink}>Ta kontakt — diskret</AccentBar>
    </div>
  );
}

function Dev({ accent, ink, soft, domain }: { accent: string; ink: string; soft: string; domain: string }) {
  return (
    <div>
      {/* A built site, previewed inside the preview. */}
      <div className="rounded-lg border border-white/[0.07] bg-[#0d0d0f] p-3.5">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded" style={{ background: accent }} />
          <span className="flex gap-1.5">
            <span className="h-1 w-5 rounded-full bg-white/15" />
            <span className="h-1 w-5 rounded-full bg-white/15" />
            <span className="h-1 w-5 rounded-full bg-white/15" />
          </span>
          <span className="ml-auto rounded px-2 py-1 text-[9px] font-semibold" style={{ background: accent, color: ink }}>Få tilbud</span>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-2.5 w-4/5 rounded-full bg-white/[0.14]" />
          <div className="h-2.5 w-3/5 rounded-full" style={{ background: soft }} />
        </div>
        <div className="mt-2.5 h-1.5 w-11/12 rounded-full bg-white/[0.06]" />
        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-7 rounded-md bg-white/[0.04]" />
          ))}
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Next.js</span>
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Lynrask</span>
        <span className="flex-1 rounded-md border border-white/[0.1] py-1.5 text-center font-mono text-[10px] text-white/55">Mobilklar</span>
      </div>
    </div>
  );
}
