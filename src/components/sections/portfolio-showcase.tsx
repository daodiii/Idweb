"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame, LaptopFrame, TabletFrame } from "@/components/ui/device-frame";
import { FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";

export function PortfolioShowcase() {
  const featuredSites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSite = featuredSites[activeIndex];

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % featuredSites.length);
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + featuredSites.length) % featuredSites.length);
  }

  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Prosjekter vi har levert
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]">
            Hver nettside er skreddersydd for kundens behov og bransje.
          </p>
        </motion.div>

        {/* ── Mobile: iPhone carousel ── */}
        <div className="mt-16 md:hidden">
          <div className="relative flex flex-col items-center">
            {/* iPhone frame — large and centered */}
            <AnimatePresence mode="wait">
              {activeSite && (
                <motion.div
                  key={activeSite.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-[280px]"
                >
                  <PhoneFrame
                    imageSrc={activeSite.images.mobile}
                    imageAlt={`${activeSite.name} — mobil`}
                    className="w-full"
                    flat
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project info */}
            <AnimatePresence mode="wait">
              {activeSite && (
                <motion.div
                  key={`info-${activeSite.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 text-center"
                >
                  <h3 className="text-xl font-bold text-[var(--color-text)]">
                    {activeSite.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    {activeSite.domain}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-6 flex items-center gap-6">
              <button
                onClick={goPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                aria-label="Forrige prosjekt"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {featuredSites.map((site, i) => (
                  <button
                    key={site!.id}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-[var(--color-accent)]"
                        : "w-2 bg-[var(--color-border)]"
                    }`}
                    aria-label={`Vis ${site!.name}`}
                  />
                ))}
              </div>

              <button
                onClick={goNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                aria-label="Neste prosjekt"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Desktop: laptop + phone grid ── */}
        <div className="mt-16 hidden gap-12 md:grid md:grid-cols-2 lg:grid-cols-3">
          {featuredSites.map((site, index) => {
            if (!site) return null;
            return (
              <motion.div
                key={site.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4 flex items-end gap-3">
                  <LaptopFrame
                    imageSrc={site.images.desktop}
                    imageAlt={`${site.name} — desktop`}
                    className="w-[200px] flex-shrink-0"
                  />
                  <PhoneFrame
                    imageSrc={site.images.mobile}
                    imageAlt={`${site.name} — mobil`}
                    className="w-[60px] flex-shrink-0"
                  />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">
                  {site.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {site.domain}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
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
