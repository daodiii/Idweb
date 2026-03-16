"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ChevronDown, MoveRight } from "lucide-react";
import { FAQ_TEASER_ITEMS } from "@/lib/content/homepage";

export function FaqTeaser() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-[var(--color-dark-text)] sm:text-4xl">
            Vanlige spørsmål
          </h2>
        </motion.div>

        <div className="mt-12 space-y-3">
          {FAQ_TEASER_ITEMS.map((faq, index) => (
            <motion.div
              key={faq.question}
              className="rounded-lg border border-white/5 bg-[var(--color-dark-bg-alt)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex w-full items-center justify-between px-6 py-4 text-left"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm font-semibold text-[var(--color-dark-text)]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-[var(--color-dark-muted)] transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm leading-relaxed text-[var(--color-dark-muted)]">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline"
          >
            Se alle spørsmål <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
