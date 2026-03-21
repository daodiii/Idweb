"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { PACKAGES } from "@/lib/content/pricing";

export function PricingPreview() {
  return (
    <section className="light-section-warm px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Ærlige priser, ingen overraskelser
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-light text-[var(--color-text-muted)]">
            Alle prosjekter skreddersys — her er utgangspunktene.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10"
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
                  ? "bg-[var(--color-bg-alt)] shadow-xl shadow-[var(--color-accent)]/10 ring-1 ring-[var(--color-accent)]/20"
                  : "border border-[var(--color-border)] bg-white shadow-lg shadow-black/[0.06]"
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
              <h3 className="text-lg font-bold text-[var(--color-text)]">
                {pkg.name}
              </h3>
              <p className="mt-2 text-2xl font-black text-[var(--color-text)]">
                {pkg.price}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                + {pkg.monthly} vedlikehold
              </p>
              <ul className="mt-5 space-y-2">
                {pkg.features.slice(0, 3).map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle detaljer <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
