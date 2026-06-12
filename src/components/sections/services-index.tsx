"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "motion/react";
import { SERVICES_OVERVIEW } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, EASE_CSS, INK, PAPER, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Services — an XL index. Three entries set in poster type; clicking
 * one unfolds it and drags a yellow marker across the title.
 */

const HREFS: Record<string, string> = {
  nettside: "/tjenester/nettside",
  seo: "/tjenester/seo",
  vedlikehold: "/tjenester/vedlikehold",
};

export function ServicesIndex() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section style={{ backgroundColor: PAPER, color: INK }}>
      <div className="px-[3vw] py-24 sm:py-32">
        <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
          <span className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
              className="block text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[1.02] tracking-[-0.045em]"
            >
              Tjenester som
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE, delay: 0.12 } } }}
              className="block text-[clamp(2.6rem,8vw,7rem)] font-bold leading-[1.02] tracking-[-0.045em]"
            >
              <Marker delay={0.8}>driver vekst</Marker>
            </motion.span>
          </span>
        </motion.h2>

        <div className="mt-16 border-t" style={{ borderColor: "rgba(20,20,16,0.18)" }}>
          {SERVICES_OVERVIEW.map((service, i) => {
            const isOpen = open === i;
            return (
              <div key={service.id} className="border-b" style={{ borderColor: "rgba(20,20,16,0.18)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-5 py-8 text-left sm:gap-x-8 sm:py-10"
                >
                  <span className="font-mono text-sm tabular-nums" style={{ color: "rgba(20,20,16,0.45)" }}>
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[clamp(1.6rem,4.6vw,3.4rem)] font-bold leading-[1] tracking-[-0.035em]">
                    <span
                      className="bg-no-repeat [background-position:0_78%] [background-size:0%_0.28em] transition-[background-size] duration-700"
                      style={{
                        backgroundImage: `linear-gradient(${YELLOW}, ${YELLOW})`,
                        backgroundSize: isOpen ? "100% 0.28em" : "0% 0.28em",
                        transitionTimingFunction: EASE_CSS,
                      }}
                    >
                      {service.title}
                    </span>
                  </h3>
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 sm:h-13 sm:w-13"
                    style={{
                      borderColor: INK,
                      backgroundColor: isOpen ? INK : "transparent",
                      transition: `background-color 0.35s ease`,
                    }}
                  >
                    <Plus
                      aria-hidden
                      className="h-5 w-5"
                      strokeWidth={2.5}
                      style={{
                        color: isOpen ? YELLOW : INK,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: `transform 0.45s ${EASE_CSS}, color 0.3s ease`,
                      }}
                    />
                  </span>
                </button>
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: `grid-template-rows 0.55s ${EASE_CSS}`,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap items-end justify-between gap-6 pb-10 pl-10 pr-2 sm:pl-16">
                      <p className="max-w-[52ch] text-base leading-relaxed sm:text-lg" style={{ color: "rgba(20,20,16,0.7)" }}>
                        {service.description}
                      </p>
                      <Link
                        href={HREFS[service.id] ?? "/tjenester"}
                        className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-transform duration-200 hover:scale-105 active:scale-95"
                        style={{ backgroundColor: INK, color: PAPER }}
                      >
                        Les mer
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: YELLOW }} />
                      </Link>
                    </div>
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
