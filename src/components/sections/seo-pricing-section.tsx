"use client";

import { useState } from "react";
import Link from "next/link";
import { SEO_PACKAGES } from "@/lib/content/pricing";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export function SeoPricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-accent)]">
            SEO-pakker
          </p>
          <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
            Bli funnet på Google
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-light text-[var(--color-dark-muted)] sm:text-lg">
            Løpende SEO som gir resultater. Velg månedlig fleksibilitet eller
            spar opptil 30&nbsp;% med årlig betaling.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              !isAnnual
                ? "text-[var(--color-dark-text)]"
                : "text-[var(--color-dark-muted)]"
            }`}
          >
            Månedlig
          </span>

          <button
            type="button"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual((v) => !v)}
            className="relative inline-flex h-7 w-14 cursor-pointer items-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark-bg)]"
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-[var(--color-accent)] shadow-lg shadow-[var(--color-accent)]/30 transition-transform duration-300 ${
                isAnnual ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>

          <span
            className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
              isAnnual
                ? "text-[var(--color-dark-text)]"
                : "text-[var(--color-dark-muted)]"
            }`}
          >
            Årlig
            <span className="rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--color-accent)]">
              Spar opptil 30&nbsp;%
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-3 lg:gap-10">
          {SEO_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col overflow-hidden rounded-3xl transition-all duration-300 ${
                pkg.highlight
                  ? "border-2 border-[var(--color-accent)] bg-[var(--color-dark-bg-alt)] shadow-2xl shadow-[var(--color-accent)]/20 lg:-my-6"
                  : "border border-white/[0.06] bg-[var(--color-dark-glass)] backdrop-blur-sm hover:border-white/[0.12]"
              }`}
            >
              {pkg.highlight && (
                <div className="bg-[var(--color-accent)] py-2.5 text-center text-xs font-bold uppercase tracking-[3px] text-[var(--color-dark-bg)]">
                  Mest populær
                </div>
              )}

              <div className={pkg.highlight ? "flex flex-col p-8 lg:py-10" : "flex flex-col p-8"}>
                <h3 className="text-2xl font-bold tracking-[-0.01em] text-[var(--color-dark-text)]">
                  {pkg.name}
                </h3>

                <div className="mt-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-black tracking-[-0.02em] tabular-nums transition-all duration-300 ${
                        pkg.highlight
                          ? "text-5xl text-[var(--color-accent)]"
                          : "text-3xl text-[var(--color-dark-text)]"
                      }`}
                    >
                      {isAnnual ? pkg.annualPrice : pkg.monthlyPrice}
                    </span>
                    <span className="text-sm text-[var(--color-dark-muted)]">
                      /mnd
                    </span>
                  </div>

                  {isAnnual ? (
                    <p className="mt-1 text-sm text-[var(--color-accent)]/80">
                      Faktureres årlig &mdash; spar {pkg.annualSavings}&nbsp;%
                    </p>
                  ) : (
                    <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                      Faktureres månedlig
                    </p>
                  )}
                </div>

                <p className="mt-4 text-sm font-light text-[var(--color-dark-muted)]">
                  {pkg.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-[var(--color-dark-text)]"
                    >
                      <span className="mt-0.5 text-[var(--color-accent)]">
                        &#10003;
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/kontakt"
                  className={`${RAINBOW_BUTTON_CLASSES} mt-8 block text-center font-semibold ${
                    pkg.highlight ? "px-6 py-4 text-base" : "px-6 py-3"
                  }`}
                >
                  Kom i gang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
