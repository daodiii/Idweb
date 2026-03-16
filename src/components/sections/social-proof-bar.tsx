"use client";

import { motion } from "motion/react";
import { TRUST_SIGNALS, TRUST_LOCATION } from "@/lib/content/homepage";
import { CountUpStat } from "@/components/ui/count-up-stat";

export function SocialProofBar() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-8">
      <motion.div
        className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        {TRUST_SIGNALS.map((signal, i) => (
          <div key={signal.label} className="flex items-center gap-2">
            {i > 0 && (
              <span className="mr-6 hidden text-[var(--color-border)] sm:inline">
                ·
              </span>
            )}
            <span className="text-lg font-bold text-[var(--color-text)]">
              <CountUpStat
                value={signal.value}
                suffix={signal.suffix}
              />
            </span>
            <span className="text-sm text-[var(--color-text-muted)]">
              {signal.label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="mr-6 hidden text-[var(--color-border)] sm:inline">
            ·
          </span>
          <span className="text-sm text-[var(--color-text-muted)]">
            {TRUST_LOCATION}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
