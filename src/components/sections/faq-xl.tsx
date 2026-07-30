"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { motion } from "motion/react";
import { FAQ_TEASER_ITEMS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, EASE_CSS, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * FAQ — oversized questions on the void; the open one gets the yellow rule.
 *
 * Dark by design: this is the page's one contrast break between the drawn
 * process and the articles strip, both of which sit on paper. On the void the
 * marker becomes a thin underline rather than a highlighter, so the cream
 * question text never has to read against yellow.
 */

const HAIRLINE = "rgba(243,240,231,0.18)";

export function FaqXl() {
  const [open, setOpen] = useState<number>(-1);

  return (
    <section style={{ backgroundColor: VOID, color: PAPER }}>
      <div className="px-[3vw] py-24 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
            <span className="block overflow-hidden">
              <motion.span
                variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
                className="block text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[1.02] tracking-[-0.045em]"
              >
                Vanlige{" "}
                <Marker delay={0.7} thickness={0.12}>
                  spørsmål
                </Marker>
              </motion.span>
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          >
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 border-b-2 pb-0.5 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-60"
              style={{ borderColor: YELLOW }}
            >
              Se alle spørsmål
              <ArrowRight className="h-4 w-4" style={{ color: YELLOW }} />
            </Link>
          </motion.div>
        </div>

        <div className="mt-14 border-t" style={{ borderColor: HAIRLINE }}>
          {FAQ_TEASER_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question} className="border-b" style={{ borderColor: HAIRLINE }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-5 py-7 text-left sm:gap-x-8 sm:py-8"
                >
                  <span
                    className="font-mono text-sm tabular-nums transition-colors duration-500"
                    style={{
                      color: isOpen ? YELLOW : "rgba(243,240,231,0.58)",
                      transitionTimingFunction: EASE_CSS,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[clamp(1.2rem,2.6vw,2rem)] font-bold leading-snug tracking-[-0.02em]">
                    <span
                      className="bg-no-repeat [background-position:0_100%] transition-[background-size] duration-600"
                      style={{
                        backgroundImage: `linear-gradient(${YELLOW}, ${YELLOW})`,
                        backgroundSize: isOpen ? "100% 0.1em" : "0% 0.1em",
                        transitionTimingFunction: EASE_CSS,
                      }}
                    >
                      {item.question}
                    </span>
                  </h3>
                  <Plus
                    aria-hidden
                    className="h-6 w-6 shrink-0 transition-colors duration-500"
                    strokeWidth={2.5}
                    style={{
                      color: isOpen ? YELLOW : PAPER,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: `transform 0.45s ${EASE_CSS}, color 0.45s ${EASE_CSS}`,
                    }}
                  />
                </button>
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: `grid-template-rows 0.5s ${EASE_CSS}`,
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] pb-8 pl-10 pr-8 text-base leading-relaxed sm:pl-14 sm:text-lg" style={{ color: "rgba(243,240,231,0.68)" }}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
