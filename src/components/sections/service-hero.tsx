"use client";

import Link from "next/link";
import type { Service } from "@/types";
import { CountUpStat } from "@/components/ui/count-up-stat";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { PaletteBackground } from "@/components/ui/palette-background";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <PaletteBackground palette="stille-spenning" intensity={0.8} className="px-6 py-24 text-center sm:py-32">

      <div className="mx-auto max-w-4xl">
        {/* Category tag */}
        <span className="inline-block rounded-full border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          {service.categoryTag}
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-pretty text-[var(--color-dark-text)] sm:text-5xl lg:text-6xl">
          {service.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-dark-muted)] sm:text-xl">
          {service.shortDescription}
        </p>

        <Link
          href="/kontakt"
          className={`${RAINBOW_BUTTON_CLASSES} mt-10 px-8 py-3.5 text-lg font-semibold`}
        >
          Få et uforpliktende tilbud
        </Link>

        {/* Trust stats */}
        {service.trustStats.length > 0 && (
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
                <p className="mt-1 text-xs text-[var(--color-dark-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PaletteBackground>
  );
}
