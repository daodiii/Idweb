"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { PRICING_FAQ } from "@/lib/content/pricing";

const EASE = [0.23, 1, 0.32, 1] as const;
const EASE_STR = "cubic-bezier(0.23,1,0.32,1)";

export function PricingFaqAccordion() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-14">
      {PRICING_FAQ.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={faq.question}
            className="border-t border-white/[0.08] last:border-b"
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
              className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-150 hover:text-white active:scale-[0.998]"
              style={{ transitionTimingFunction: EASE_STR }}
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg font-bold tracking-[-0.01em] text-white sm:text-xl">
                {faq.question}
              </span>
              <span
                aria-hidden
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color] duration-200 ${
                  isOpen
                    ? "rotate-45 border-[#F4CE14] bg-[#F4CE14]"
                    : "border-white/15 bg-white/[0.03] group-hover:border-white/30"
                }`}
                style={{ transitionTimingFunction: EASE_STR }}
              >
                <Plus
                  className={`h-4 w-4 ${isOpen ? "text-[#0a0a0a]" : "text-white/80"}`}
                  strokeWidth={2}
                />
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
                  <p className="max-w-[60ch] pb-6 pr-12 text-base leading-relaxed text-white/65">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
