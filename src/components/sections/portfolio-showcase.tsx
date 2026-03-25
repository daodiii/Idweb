"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { ProjectCollage } from "@/components/ui/project-collage";
import type { PortfolioSite } from "@/types";

export function PortfolioShowcase() {
  const prefersReducedMotion = useReducedMotion();
  const sites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(
    (s): s is PortfolioSite => s !== null
  );

  const collageSites = sites.filter((s) => s.images.collage?.length);

  return (
    <section className="light-section-warm px-6 py-14 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="mb-16"
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
        </motion.div>

        {collageSites.map((site) => (
          <motion.article
            key={site.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            {/* Mobile: show dark mobile screenshot instead of collage */}
            {(() => {
              const mobileCollageImg = site.images.collage?.find(
                (img) => img.aspectRatio === "mobile"
              );
              if (!mobileCollageImg) return null;
              return (
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[var(--color-border)] sm:hidden">
                  <Image
                    src={mobileCollageImg.src}
                    alt={`${site.name} — mobilvisning`}
                    fill
                    className="object-cover object-top"
                    sizes="100vw"
                  />
                </div>
              );
            })()}
            {/* Desktop: show collage */}
            <div className={site.images.collage?.some((img) => img.aspectRatio === "mobile") ? "hidden sm:block" : ""}>
              <ProjectCollage
                images={site.images.collage!}
                projectName={site.name}
                backgroundImage={site.images.collageBackground}
              />
            </div>
            <div className="mt-4">
              <h3 className="font-heading text-base font-bold text-[var(--color-text)]">
                {site.name}
              </h3>
            </div>
          </motion.article>
        ))}

        {/* CTA button to see all projects */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: 0.15 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/referanser"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[var(--color-accent)] px-8 py-4 text-base font-bold text-[var(--color-text)] shadow-lg shadow-[var(--color-accent)]/25 transition-all duration-300 hover:gap-4 hover:shadow-xl hover:shadow-[var(--color-accent)]/35 sm:px-10 sm:py-5 sm:text-lg"
          >
            <span className="relative z-10">Se alle prosjektene mine</span>
            <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="absolute inset-0 z-0 bg-[var(--color-accent-hover)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
