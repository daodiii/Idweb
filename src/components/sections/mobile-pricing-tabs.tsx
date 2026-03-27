"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Link from "next/link";
import { PACKAGES } from "@/lib/content/pricing";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

const SEGMENT_LABELS = ["Enkel", "Standard", "Premium"] as const;

export function MobilePricingTabs() {
  const prefersReducedMotion = useReducedMotion();
  const [activeTier, setActiveTier] = useState(1);

  const pkg = PACKAGES[activeTier];

  return (
    <div className="md:hidden">
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
          key={pkg.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
          className={`flex flex-col overflow-hidden rounded-3xl ${
            pkg.highlight
              ? "border-2 border-[var(--color-accent)] bg-[var(--color-dark-bg-alt)] shadow-2xl shadow-[var(--color-accent)]/20"
              : "border border-white/[0.06] bg-[var(--color-dark-glass)] backdrop-blur-sm"
          }`}
        >
          {pkg.highlight && (
            <div className="bg-[var(--color-accent)] py-2.5 text-center text-xs font-bold uppercase tracking-[3px] text-[var(--color-dark-bg)]">
              Mest populær
            </div>
          )}
          <div className="p-7">
            <h2 className="text-2xl font-bold tracking-[-0.01em] text-[var(--color-dark-text)]">
              {pkg.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
              {pkg.subtitle}
            </p>
            <div className="mt-5">
              <span
                className={`font-black tracking-[-0.02em] tabular-nums ${
                  pkg.highlight
                    ? "text-4xl text-[var(--color-accent)]"
                    : "text-3xl text-[var(--color-dark-text)]"
                }`}
              >
                {pkg.price}
              </span>
              <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                + {pkg.monthly} {pkg.monthlyNote}
              </p>
            </div>
            <p className="mt-4 text-sm font-light text-[var(--color-dark-muted)]">
              {pkg.description}
            </p>
            <ul className="mt-5 space-y-2.5">
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
              className={`${RAINBOW_BUTTON_CLASSES} mt-7 block text-center font-semibold px-6 py-3`}
            >
              Få tilbud
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
