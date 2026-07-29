"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { CountUpStat } from "@/components/ui/count-up-stat";

interface ServiceHeroProps {
  service: Service;
}

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

/**
 * Split the service title into a thin lead-in and a heavy load-bearing tail.
 * - "Skreddersydd nettside"   -> { lead: "Skreddersydd", tail: "nettside" }
 * - "SEO-optimalisering"      -> { lead: "",             tail: "SEO-optimalisering" }
 * - "Drift og vedlikehold"    -> { lead: "Drift og",     tail: "vedlikehold" }
 * The tail gets the yellow underline accent.
 */
function splitHeadline(title: string): { lead: string; tail: string } {
  const lastSpace = title.lastIndexOf(" ");
  if (lastSpace === -1) return { lead: "", tail: title };
  return {
    lead: title.slice(0, lastSpace),
    tail: title.slice(lastSpace + 1),
  };
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const { lead, tail } = splitHeadline(service.title);

  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-24 sm:py-32 lg:py-36">
      {/* Warm yellow spotlight — top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 82% 22%, rgba(244,206,20,0.16), transparent 62%)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      {/* Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        {/* Left: editorial headline + body + CTAs */}
        <div className="col-span-1 flex flex-col lg:col-span-7">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Tjenester &middot; {service.categoryTag.toUpperCase()}
          </p>

          <h1 className="mt-7 font-serif text-white">
            {lead && (
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                {lead}
              </span>
            )}
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                {tail}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
            </span>
          </h1>

          <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
            {service.shortDescription}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Få et uforpliktende tilbud
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              />
            </Link>
            <Link
              href="/priser"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Se hva som inngår
            </Link>
          </div>
        </div>

        {/* Right: trust stat column (hidden on mobile to keep hero asymmetric, not centered) */}
        {service.trustStats.length > 0 && (
          <div className="relative col-span-1 hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
            <div className="relative w-full max-w-[420px]">
              <span
                aria-hidden
                className="absolute -right-4 -top-10 select-none font-serif text-[10rem] font-black leading-none tracking-tighter text-white/[0.025]"
              >
                id
              </span>

              <ul className="relative space-y-4">
                {service.trustStats.map((stat) => (
                  <li
                    key={stat.label}
                    className="rounded-2xl border border-white/[0.08] bg-[rgba(20,20,22,0.88)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-22px_rgba(0,0,0,0.7)]"
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl font-black leading-none tracking-tight tabular-nums text-white">
                        <CountUpStat
                          value={stat.value}
                          suffix=""
                          decimals={stat.decimals}
                        />
                      </span>
                      {stat.suffix ? (
                        <span className="font-serif text-2xl font-bold leading-none text-[#F4CE14]">
                          {stat.suffix}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                      {stat.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
