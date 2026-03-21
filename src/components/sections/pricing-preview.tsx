"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { PACKAGES } from "@/lib/content/pricing";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { AuroraBackground } from "@/components/ui/aurora-background";

const SEGMENT_LABELS = ["Enkel", "Standard", "Premium"] as const;

export function PricingPreview() {
  const [activeTier, setActiveTier] = useState(1); // default to Standard

  return (
    <AuroraBackground variant="bottom-left" className="px-6 py-14 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl lg:text-6xl">
            Ærlige priser, ingen overraskelser
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-light text-[var(--color-dark-muted)]">
            Alle prosjekter skreddersys — her er utgangspunktene.
          </p>
        </motion.div>

        {/* ── Mobile: segmented toggle + single card ── */}
        <div className="mt-10 md:hidden">
          <div className="mb-6 flex justify-center">
            <SegmentedControl
              segments={[...SEGMENT_LABELS]}
              defaultIndex={1}
              onChange={setActiveTier}
              variant="dark"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={PACKAGES[activeTier].id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl p-7 ${
                PACKAGES[activeTier].highlight
                  ? "bg-[var(--color-dark-bg-alt)] shadow-xl shadow-[var(--color-accent)]/10 ring-1 ring-[var(--color-accent)]/20"
                  : "border border-white/5 bg-[var(--color-dark-bg-alt)] shadow-lg shadow-black/20"
              }`}
            >
              {PACKAGES[activeTier].highlight && (
                <span className="mb-3 inline-block rounded-full bg-[var(--color-accent)] px-3 py-0.5 text-xs font-bold text-[var(--color-dark-bg)]">
                  Mest populær
                </span>
              )}
              <h3 className="text-lg font-bold text-[var(--color-dark-text)]">
                {PACKAGES[activeTier].name}
              </h3>
              <p className="mt-2 text-2xl font-black text-[var(--color-dark-text)]">
                {PACKAGES[activeTier].price}
              </p>
              <p className="mt-1 text-xs text-[var(--color-dark-muted)]">
                + {PACKAGES[activeTier].monthly} vedlikehold
              </p>
              <ul className="mt-5 space-y-2">
                {PACKAGES[activeTier].features.slice(0, 3).map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2 text-xs text-[var(--color-dark-muted)]"
                  >
                    <span className="mt-0.5 text-[var(--color-accent)]">
                      &#10003;
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Desktop: original 3-column grid ── */}
        <motion.div
          className="mt-16 hidden gap-8 md:grid md:grid-cols-3 md:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`rounded-2xl p-7 transition-shadow duration-300 ${
                pkg.highlight
                  ? "bg-[var(--color-dark-bg-alt)] shadow-xl shadow-[var(--color-accent)]/10 ring-1 ring-[var(--color-accent)]/20"
                  : "border border-white/5 bg-[var(--color-dark-bg-alt)] shadow-lg shadow-black/20"
              }`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {pkg.highlight && (
                <span className="mb-3 inline-block rounded-full bg-[var(--color-accent)] px-3 py-0.5 text-xs font-bold text-[var(--color-dark-bg)]">
                  Mest populær
                </span>
              )}
              <h3 className="text-lg font-bold text-[var(--color-dark-text)]">
                {pkg.name}
              </h3>
              <p className="mt-2 text-2xl font-black text-[var(--color-dark-text)]">
                {pkg.price}
              </p>
              <p className="mt-1 text-xs text-[var(--color-dark-muted)]">
                + {pkg.monthly} vedlikehold
              </p>
              <ul className="mt-5 space-y-2">
                {pkg.features.slice(0, 3).map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2 text-xs text-[var(--color-dark-muted)]"
                  >
                    <span className="mt-0.5 text-[var(--color-accent)]">
                      &#10003;
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/priser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline"
          >
            Se alle detaljer <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AuroraBackground>
  );
}
