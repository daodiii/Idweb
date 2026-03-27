"use client";

import { motion, useReducedMotion } from "motion/react";
import { FINAL_CTA } from "@/lib/content/homepage";
import { ContactForm } from "@/components/ui/contact-form";

export function CtaSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] px-6 py-14 sm:py-24">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      >
        <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-bg)] sm:text-4xl lg:text-5xl">
          {FINAL_CTA.headline}
        </h2>
        <p className="mt-4 text-lg font-light text-[var(--color-dark-bg)]/70">
          {FINAL_CTA.description}
        </p>

        <div className="mt-8">
          <ContactForm className="text-[var(--color-dark-bg)]" variant="light" />
        </div>

        <p className="mt-6 text-sm text-[var(--color-dark-bg)]/60">
          {FINAL_CTA.secondaryText}
        </p>
      </motion.div>
    </section>
  );
}
