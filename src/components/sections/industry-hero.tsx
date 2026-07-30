import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import type { MockupKind } from "@/lib/content/landing-identity";
import { IndustryMockup } from "@/components/sections/industry-mockup";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

/** Thin lead-in + heavy load-bearing tail; the tail carries the accent underline. */
function splitHeadline(title: string): { lead: string; tail: string } {
  const lastSpace = title.lastIndexOf(" ");
  if (lastSpace === -1) return { lead: "", tail: title };
  return { lead: title.slice(0, lastSpace), tail: title.slice(lastSpace + 1) };
}

const PROOF = ["Ingen bindingstid — du eier siden", "Norsk utvikler, rask levering", "Bygget for fart og mobil"];

/** CSS stagger helper — delay via custom property, animation lives in globals (.lh-rise). */
function delay(ms: number): CSSProperties {
  return { "--lh-delay": `${ms}ms` } as CSSProperties;
}

interface IndustryHeroProps {
  service: Service;
  accent: string;
  mockup: MockupKind;
  business: string;
  mockupUrl?: string;
}

/**
 * Server Component — the entrance is CSS-driven (.lh-rise), so the headline is
 * never trapped at opacity 0 by a hydration hiccup, and no motion JS ships for
 * the hero. The one interactive-feeling leaf (the mockup) is its own client
 * component.
 */
export function IndustryHero({ service, accent, mockup, business, mockupUrl }: IndustryHeroProps) {
  const { lead, tail } = splitHeadline(service.title);

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-24 sm:py-28 lg:py-32">
      {/* One atmospheric moment — accent-tinted, de-fogged (kept faint). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: `radial-gradient(ellipse 58% 56% at 82% 24%, color-mix(in srgb, ${accent} 15%, transparent), transparent 60%)` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "36px 36px" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left — headline leads (no eyebrow kicker) */}
        <div className="lg:col-span-7">
          <h1 className="lh-rise font-[family-name:var(--font-heading)] text-white" style={delay(0)}>
            {lead && (
              <span className="block text-[clamp(1.6rem,3.4vw,2.5rem)] font-light leading-[1.08] tracking-[-0.01em] text-white/55">
                {lead}
              </span>
            )}
            <span className="mt-1 block text-[clamp(2.5rem,6.4vw,4.9rem)] font-black leading-[0.95] tracking-[-0.035em]">
              <span className="relative inline-block">
                {tail}
                <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: accent }} />
              </span>
            </span>
          </h1>

          <p className="lh-rise mt-8 max-w-[52ch] text-base leading-relaxed text-white/65 sm:text-lg" style={delay(90)}>
            {service.shortDescription}
          </p>

          <div className="lh-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" style={delay(170)}>
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.5)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4CE14]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Få et uforpliktende tilbud
              <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/tjenester"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Se tjenestene
            </Link>
          </div>

          {/* Honest proof — no fabricated metrics, no icons */}
          <ul className="lh-rise mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/60" style={delay(250)}>
            {PROOF.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — the product itself */}
        <div className="lh-rise flex justify-center lg:col-span-5 lg:justify-end" style={delay(320)}>
          <IndustryMockup kind={mockup} accent={accent} business={business} url={mockupUrl} />
        </div>
      </div>
    </section>
  );
}
