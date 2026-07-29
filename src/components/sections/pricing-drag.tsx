"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PACKAGES } from "@/lib/content/pricing";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Pricing — paper receipts on the void. Grab the row and throw it.
 * The Standard tier is printed on yellow stock with an ink stamp.
 */

function ReceiptCard({ pkg, index }: { pkg: (typeof PACKAGES)[number]; index: number }) {
  const paper = pkg.highlight ? YELLOW : PAPER;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60, rotate: index % 2 === 0 ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index === 1 ? -1.2 : 0.8 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
      className="relative w-[320px] shrink-0 select-none rounded-lg p-7 sm:w-[380px] sm:p-8"
      style={{
        backgroundColor: paper,
        color: INK,
        boxShadow: "0 24px 60px -24px rgba(0,0,0,0.55)",
      }}
    >
      {pkg.highlight && (
        <span
          className="absolute -top-3 right-6 rotate-[-7deg] border-[3px] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ borderColor: INK, color: INK, backgroundColor: YELLOW }}
        >
          Mest populær
        </span>
      )}

      <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(20,20,16,0.55)" }}>
        Pakke /{String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 text-3xl font-bold uppercase tracking-[-0.02em]">{pkg.name}</h3>
      <p className="mt-1 text-sm" style={{ color: "rgba(20,20,16,0.6)" }}>
        {pkg.subtitle}
      </p>

      <div className="mt-6 border-y-2 border-dashed py-5" style={{ borderColor: "rgba(20,20,16,0.3)" }}>
        <p className="text-[1.75rem] font-bold leading-none tracking-[-0.03em]">
          {pkg.scope}
        </p>
        <p className="mt-2 font-mono text-xs" style={{ color: "rgba(20,20,16,0.6)" }}>
          {pkg.meta}
        </p>
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {pkg.features.map((feature) =>
          feature.endsWith("pluss:") ? (
            <li key={feature} className="pt-1 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "rgba(20,20,16,0.5)" }}>
              {feature}
            </li>
          ) : (
            <li key={feature} className="flex items-baseline gap-2.5 font-mono text-[13px] leading-relaxed">
              <span aria-hidden className="text-[10px]">■</span>
              {feature}
            </li>
          ),
        )}
      </ul>

      <Link
        href="/kontakt"
        draggable={false}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-transform duration-200 hover:scale-[1.03] active:scale-95"
        style={{ backgroundColor: INK, color: pkg.highlight ? YELLOW : PAPER }}
      >
        Få et uforpliktende tilbud
        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.article>
  );
}

export function PricingDrag() {
  const clipRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragLimit, setDragLimit] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      const clip = clipRef.current;
      const track = trackRef.current;
      if (!clip || !track) return;
      setDragLimit(Math.max(0, track.scrollWidth - clip.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (clipRef.current) ro.observe(clipRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="overflow-hidden" style={{ backgroundColor: VOID, color: PAPER }}>
      <div className="py-24 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8 px-[3vw]">
          <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
            <span className="block overflow-hidden">
              <motion.span
                variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
                className="block text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.045em]"
              >
                Prisen settes
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE, delay: 0.12 } } }}
                className="block text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.045em]"
                style={{ color: YELLOW }}
              >
                etter omfang.
              </motion.span>
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="mb-2 flex flex-col gap-3"
          >
            <p className="max-w-[36ch] text-base leading-relaxed" style={{ color: "rgba(243,240,231,0.6)" }}>
              Alle prosjekter skreddersys. Her er utgangspunktene. Du får
              fastpris før vi starter.
            </p>
            {dragLimit > 0 && (
              <p
                aria-hidden
                className="hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] lg:flex"
                style={{ color: YELLOW }}
              >
                Dra i kortene
                <ArrowRight className="monument-nudge h-4 w-4" />
              </p>
            )}
          </motion.div>
        </div>

        <div ref={clipRef} className="mt-16 px-[3vw]" data-cursor>
          <motion.div
            ref={trackRef}
            className="flex w-max items-stretch gap-7 pb-6 pr-[3vw] pt-4"
            drag={reduced ? false : "x"}
            dragConstraints={{ left: -dragLimit, right: 0 }}
            dragElastic={0.08}
            dragTransition={{ power: 0.4, timeConstant: 220 }}
            whileDrag={{ cursor: "grabbing" }}
            style={{ cursor: reduced ? "auto" : "grab", touchAction: "pan-y" }}
          >
            {PACKAGES.map((pkg, i) => (
              <ReceiptCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 px-[3vw]"
        >
          <Link
            href="/priser"
            className="inline-flex items-center gap-2 border-b-2 pb-0.5 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-60"
            style={{ borderColor: YELLOW, color: PAPER }}
          >
            Se alle detaljer
            <ArrowRight className="h-4 w-4" style={{ color: YELLOW }} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
