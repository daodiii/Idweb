"use client";

import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "motion/react";
import { PROCESS_STEPS } from "@/lib/content/homepage";
import { EASE, INK, PAPER, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Process — a timeline that draws itself. A yellow line fills the rail
 * as you scroll; each step pops its node and slides its copy in.
 */

export function ProcessPath() {
  const railRef = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.55"],
  });

  return (
    <section style={{ backgroundColor: PAPER, color: INK }}>
      <div className="px-[3vw] py-24 sm:py-32">
        <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE} className="font-serif uppercase">
          <span className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
              className="block text-[9.5vw] font-black leading-[0.9] tracking-[-0.02em]"
            >
              Fra idé til
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE, delay: 0.12 } } }}
              className="block text-[9.5vw] font-black leading-[0.9] tracking-[-0.02em]"
            >
              lansering{" "}
              <span style={{ color: "transparent", WebkitTextStroke: `max(1.5px, 0.14vw) ${INK}` }}>
                på 1-2-3
              </span>
            </motion.span>
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-6 max-w-[46ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "rgba(20,20,16,0.65)" }}
        >
          Vår velprøvde prosess sørger for at du får en nettside du er stolt av, uten stress.
        </motion.p>

        <ol ref={railRef} className="relative mx-auto mt-20 max-w-4xl">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute bottom-12 left-[1.35rem] top-2 w-[3px] sm:left-[1.85rem]"
            style={{ backgroundColor: "rgba(20,20,16,0.12)" }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                backgroundColor: YELLOW,
                height: "100%",
                scaleY: reduced ? 1 : scrollYProgress,
              }}
            />
          </div>

          {PROCESS_STEPS.map((step, i) => (
            <li key={step.step} className="relative pb-16 pl-16 last:pb-0 sm:pl-24">
              {/* Node */}
              <motion.span
                aria-hidden
                initial={reduced ? {} : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-30% 0px" }}
                transition={{ duration: 0.55, ease: EASE }}
                className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border-[3px] font-mono text-sm font-bold sm:h-15 sm:w-15 sm:text-base"
                style={{ borderColor: INK, backgroundColor: YELLOW, color: INK }}
              >
                {String(step.step).padStart(2, "0")}
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: reduced ? 0 : 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-25% 0px" }}
                transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
              >
                <h3 className="font-serif text-2xl font-black uppercase tracking-tight sm:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[52ch] text-base leading-relaxed sm:text-lg" style={{ color: "rgba(20,20,16,0.65)" }}>
                  {step.description}
                </p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
