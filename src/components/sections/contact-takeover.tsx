"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { motion } from "motion/react";
import { FINAL_CTA } from "@/lib/content/homepage";
import { ContactForm } from "@/components/ui/contact-form";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Contact — the black takeover finale. Giant yellow words stagger in,
 * the form sits on the void.
 */

const HEADLINE_WORDS = FINAL_CTA.headline.split(" "); // "Klar for en nettside som faktisk leverer?"

export function ContactTakeover() {
  const phoneDigits = FINAL_CTA.secondaryText.replace(/\D/g, "");

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: VOID, color: PAPER }}>
      <div className="relative grid grid-cols-1 gap-16 px-[4vw] py-24 sm:py-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            transition={{ staggerChildren: 0.07 }}
            className="max-w-[16ch] text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.045em]"
          >
            {HEADLINE_WORDS.map((word, i) => (
              <span key={`${word}-${i}`} className="mr-[0.24em] inline-block overflow-hidden align-bottom">
                <motion.span
                  variants={{
                    hidden: { y: "112%" },
                    visible: { y: "0%", transition: { duration: 0.8, ease: EASE } },
                  }}
                  className="inline-block"
                  style={{ color: word === "faktisk" ? YELLOW : PAPER }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.85, ease: EASE, delay: 0.4 }}
          >
            <p className="mt-8 max-w-[44ch] text-base leading-relaxed sm:text-lg" style={{ color: "rgba(243,240,231,0.65)" }}>
              {FINAL_CTA.description}
            </p>
            <Link
              href={`tel:${phoneDigits}`}
              className="group mt-9 inline-flex items-center gap-3 rounded-full border-2 px-6 py-3.5 text-sm font-bold transition-colors duration-200 active:scale-[0.97]"
              style={{ borderColor: YELLOW, color: YELLOW }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = YELLOW;
                e.currentTarget.style.color = INK;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = YELLOW;
              }}
            >
              <Phone aria-hidden className="h-4 w-4" />
              {FINAL_CTA.secondaryText}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="self-center rounded-2xl border p-6 sm:p-8"
          style={{ borderColor: "rgba(243,240,231,0.14)", backgroundColor: "rgba(243,240,231,0.04)" }}
        >
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: YELLOW }}>
            Svar innen 24 timer
          </p>
          <ContactForm variant="dark" />
        </motion.div>
      </div>
    </section>
  );
}
