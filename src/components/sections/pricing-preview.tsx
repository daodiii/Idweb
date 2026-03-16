"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { PACKAGES } from "@/lib/content/pricing";

export function PricingPreview() {
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
            \u00C6rlige priser, ingen overraskelser
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]">
            Alle prosjekter skreddersys \u2014 her er utgangspunktene.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PACKAGES.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={`rounded-xl border p-6 ${
                pkg.highlight
                  ? "border-[var(--color-accent)] bg-[var(--color-bg-alt)] shadow-[0_0_20px_rgba(244,206,20,0.06)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg-alt)]"
              }`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              {pkg.highlight && (
                <span className="mb-3 inline-block rounded-full bg-[var(--color-accent)] px-3 py-0.5 text-xs font-bold text-[var(--color-dark-bg)]">
                  Mest popul\u00E6r
                </span>
              )}
              <h3 className="text-lg font-bold text-[var(--color-text)]">
                {pkg.name}
              </h3>
              <p className="mt-2 text-2xl font-black text-[var(--color-text)]">
                {pkg.price}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                + {pkg.monthly} vedlikehold
              </p>
              <ul className="mt-4 space-y-1.5">
                {pkg.features.slice(0, 3).map((feat) => (
                  <li
                    key={feat}
                    className="text-xs text-[var(--color-text-muted)]"
                  >
                    \u2713 {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <Link
            href="/priser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle detaljer <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
