"use client";

import { motion } from "motion/react";
import { X, Check } from "lucide-react";
import { TECH_COMPARISON } from "@/lib/content/homepage";

export function TechAdvantage() {
  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="mb-4 text-center text-3xl font-bold text-[var(--color-text)] sm:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {TECH_COMPARISON.headline}
        </motion.h2>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* Template card — muted */}
          <motion.div
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-8 opacity-60"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.6, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-xl font-bold text-[var(--color-text)]">
              {TECH_COMPARISON.template.title}
            </h3>
            <div className="space-y-4">
              {TECH_COMPARISON.template.metrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {metric.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {metric.value}
                    </span>
                    <X className="h-4 w-4 text-red-400" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Custom card — highlighted */}
          <motion.div
            className="rounded-xl border-2 border-[var(--color-accent)] bg-[var(--color-bg-alt)] p-8 shadow-[0_0_30px_rgba(244,206,20,0.08)]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6 text-xl font-bold text-[var(--color-text)]">
              {TECH_COMPARISON.custom.title}
            </h3>
            <div className="space-y-4">
              {TECH_COMPARISON.custom.metrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-muted)]">
                    {metric.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--color-accent)]">
                      {metric.value}
                    </span>
                    <Check className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
