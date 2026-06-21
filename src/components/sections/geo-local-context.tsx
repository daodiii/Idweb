import type { LocalInfo } from "@/lib/content/locations-local";

interface GeoLocalContextProps {
  place: string;
  local: LocalInfo;
  accent: string;
}

/**
 * The anti-doorway core: genuinely location-specific content (unique intro +
 * verifiable facts + the districts we cover). Server Component, no entrance
 * animation — content is present immediately and reads as a local dossier, not
 * a templated section.
 */
export function GeoLocalContext({ place, local, accent }: GeoLocalContextProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 55% 45% at 10% 15%, color-mix(in srgb, ${accent} 9%, transparent), transparent 60%)` }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Left — unique local context */}
        <div className="lg:col-span-7">
          <h2 className="font-[family-name:var(--font-heading)] text-white">
            <span className="block text-[clamp(1.9rem,4vw,3.2rem)] font-extralight leading-[1.08] tracking-[-0.01em] text-white/85">
              Vi kjenner markedet i
            </span>
            <span className="block text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95] tracking-[-0.035em]">
              <span className="relative inline-block">
                {place}
                <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: accent }} />
              </span>
              .
            </span>
          </h2>

          <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-white/70 sm:text-lg">
            {local.intro}
          </p>

          <div className="mt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">Vi dekker blant annet</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {local.areas.map((area) => (
                <li key={area} className="rounded-full border border-white/[0.1] px-3.5 py-1.5 text-[13px] text-white/70">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — verifiable facts, spec-sheet style */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/[0.08] bg-[rgba(20,20,22,0.72)] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: accent }}>
              {place} i tall
            </p>
            <dl className="mt-6 divide-y divide-white/[0.07]">
              {local.facts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">{fact.label}</dt>
                  <dd className="text-right font-[family-name:var(--font-heading)] text-base font-bold tracking-tight tabular-nums text-white sm:text-lg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-white/[0.07] pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/35">
              Oslo-basert · digital leveranse i hele {local.region}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
