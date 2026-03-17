"use client";

import Link from "next/link";
import type { Service } from "@/types";
import { CountUpStat } from "@/components/ui/count-up-stat";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-center sm:py-32"
      style={{ background: "linear-gradient(180deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
    >
      {/* Radial gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(244, 206, 20, 0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Category tag */}
        <span className="inline-block rounded-full border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          {service.categoryTag}
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-pretty text-[var(--color-dark-text)] sm:text-5xl lg:text-6xl">
          {service.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
          {service.shortDescription}
        </p>

        <Link
          href="/kontakt"
          className="mt-10 inline-block cursor-pointer rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-lg font-semibold text-[var(--color-dark-bg)] transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          Få et uforpliktende tilbud
        </Link>

        {/* Trust stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-8">
          {service.trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold tabular-nums text-[var(--color-accent)] sm:text-3xl">
                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
