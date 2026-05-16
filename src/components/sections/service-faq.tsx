"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import type { FAQ } from "@/types";

const EASE = [0.23, 1, 0.32, 1] as const;
const EASE_STR = "cubic-bezier(0.23,1,0.32,1)";

interface ServiceFaqProps {
  faq: FAQ[];
}

export function ServiceFaq({ faq }: ServiceFaqProps) {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="light-section-warm-alt px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-12 max-w-2xl lg:mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            FAQ
          </p>
          <h2 className="mt-7 font-serif text-[var(--color-text)]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              Det du
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                lurer
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              på, kort forklart.
            </span>
          </h2>
        </motion.div>

        <div>
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                className="border-t border-[var(--color-border)] last:border-b"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                  ease: EASE,
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-150 hover:text-[var(--color-accent-hover)] active:scale-[0.998]"
                  style={{ transitionTimingFunction: EASE_STR }}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg font-bold tracking-[-0.01em] text-[var(--color-text)] sm:text-xl">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border bg-white transition-[transform,border-color,background-color] duration-200 ${
                      isOpen
                        ? "rotate-45 border-[#F4CE14] bg-[#F4CE14]"
                        : "border-[var(--color-border)] group-hover:border-[var(--color-text)]/30"
                    }`}
                    style={{ transitionTimingFunction: EASE_STR }}
                  >
                    <Plus className="h-4 w-4 text-[var(--color-text)]" strokeWidth={2} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.3,
                        ease: EASE,
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-6 pr-12 text-base leading-relaxed text-[var(--color-text-muted)]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
