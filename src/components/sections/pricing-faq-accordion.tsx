"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PRICING_FAQ } from "@/lib/content/pricing";

export function PricingFaqAccordion() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12 space-y-3">
      {PRICING_FAQ.map((faq, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] backdrop-blur-sm overflow-hidden"
        >
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="flex w-full items-center justify-between px-6 py-5 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="font-bold tracking-[-0.01em] text-[var(--color-dark-text)] pr-4">
              {faq.question}
            </span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-[var(--color-dark-muted)] transition-transform duration-300 ${
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
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 font-light text-[var(--color-dark-muted)]">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
