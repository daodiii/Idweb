"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";
import type { PortfolioSite } from "@/types";

export function PortfolioShowcase() {
  const sites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(
    (s): s is PortfolioSite => s !== null && !!s.images.showcase?.length
  );

  return (
    <section className="light-section-warm px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-end justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-4xl">
              Utvalgte prosjekter
            </h2>
          </div>
          <Link
            href="/referanser"
            className="hidden items-center gap-1.5 text-sm font-semibold text-[var(--color-text)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-accent)] sm:inline-flex"
          >
            Se flere prosjekter
          </Link>
        </motion.div>

        {/* Project grid — two columns, tall showcase */}
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-12">
          {sites.map((site, i) => {
            const imgs = site.images.showcase!;
            return (
              <motion.article
                key={site.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                {/* Vertical stack of all showcase images */}
                <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                  {imgs.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      className={`relative overflow-hidden ${imgIdx > 0 ? "border-t border-[var(--color-border)]" : ""}`}
                    >
                      <Image
                        src={src}
                        alt={`${site.name} — seksjon ${imgIdx + 1}`}
                        width={1440}
                        height={900}
                        className={`block w-full ${imgIdx === 0 ? "transition-transform duration-500 group-hover:scale-[1.02]" : ""}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ))}
                </div>

                {/* Project info */}
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="font-heading text-base font-bold text-[var(--color-text)]">
                    {site.name}
                  </h3>
                  <span className="shrink-0 font-heading text-sm font-medium text-[var(--color-text-muted)]">
                    {site.domain}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 text-center sm:hidden">
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle referanser <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
