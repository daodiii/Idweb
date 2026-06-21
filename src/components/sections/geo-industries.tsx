import Link from "next/link";
import { getIndustry } from "@/lib/content/industries";

interface GeoIndustriesProps {
  place: string;
  industries: string[];
  businessNote: string;
  accent: string;
}

/**
 * "Bransjer vi hjelper i [sted]" — a tailored cross-link grid into the
 * /nettside/[bransje] pages. Turns each geo page into a local hub: the industry
 * mix is chosen per town (Bærum = professional services, Lillestrøm = håndverk,
 * Drammen = bygg/bil), which differentiates the page AND builds the internal
 * link graph that helps the industry pages rank. Icon-free.
 */
export function GeoIndustries({ place, industries, businessNote, accent }: GeoIndustriesProps) {
  const items = industries.map(getIndustry).filter((i): i is NonNullable<typeof i> => Boolean(i));

  if (items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 55% 45% at 90% 80%, color-mix(in srgb, ${accent} 9%, transparent), transparent 60%)` }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-heading)] text-white">
            <span className="block text-[clamp(1.9rem,4vw,3.2rem)] font-extralight leading-[1.08] tracking-[-0.01em] text-white/85">
              Bransjer vi hjelper i
            </span>
            <span className="block text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95] tracking-[-0.035em]">
              <span className="relative inline-block">
                {place}
                <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: accent }} />
              </span>
              .
            </span>
          </h2>
          <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-white/65 sm:text-lg">{businessNote}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((industry) => (
            <Link
              key={industry.id}
              href={`/nettside/${industry.id}`}
              className="group relative flex flex-col bg-[var(--color-dark-bg)] p-7 transition-colors duration-200 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/30 sm:p-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: accent }}>
                {industry.categoryTag}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-black leading-[1.1] tracking-[-0.02em] text-white sm:text-2xl">
                {industry.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{industry.shortDescription}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70 transition-colors duration-150 group-hover:text-white">
                Se løsningen
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
