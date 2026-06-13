"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Shuffle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, INK, PAPER, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Portfolio 02 — «Dekket». The five sites lie scattered across the
 * desk as physical cards: grab them, throw them, stack them. «Rydd
 * opp» snaps everything into a tidy grid with spring physics.
 */

interface Pose {
  x: string;
  y: string;
  rotate: number;
}

/** Scattered desk poses (percent offsets within the stage). */
const MESSY: Pose[] = [
  { x: "2%", y: "6%", rotate: -7 },
  { x: "30%", y: "34%", rotate: 4 },
  { x: "56%", y: "4%", rotate: -3 },
  { x: "12%", y: "48%", rotate: 6 },
  { x: "62%", y: "42%", rotate: -5 },
];

/** Tidy grid poses. */
const TIDY: Pose[] = [
  { x: "1%", y: "8%", rotate: 0 },
  { x: "34%", y: "8%", rotate: 0 },
  { x: "67%", y: "8%", rotate: 0 },
  { x: "17%", y: "54%", rotate: 0 },
  { x: "50%", y: "54%", rotate: 0 },
];

function DeskCard({
  index,
  tidy,
  zIndex,
  onGrab,
}: {
  index: number;
  tidy: boolean;
  zIndex: number;
  onGrab: () => void;
}) {
  const site = PORTFOLIO_SITES[index];
  const stat = PORTFOLIO_STATS[site.id];
  const pose = tidy ? TIDY[index] : MESSY[index];
  const reduced = useReducedMotion();

  return (
    <motion.article
      className="absolute w-[46%] max-w-[400px] cursor-grab select-none active:cursor-grabbing sm:w-[31%]"
      style={{ zIndex, touchAction: "none" }}
      initial={false}
      animate={{ left: pose.x, top: pose.y, rotate: pose.rotate }}
      transition={{ type: "spring", stiffness: 170, damping: 22, mass: 0.8 }}
      drag={!reduced}
      dragMomentum={false}
      whileDrag={{ scale: 1.06, rotate: 0 }}
      whileHover={{ scale: 1.025 }}
      onPointerDown={onGrab}
    >
      <div
        className="overflow-hidden rounded-xl border-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.45)]"
        style={{ borderColor: INK, backgroundColor: "#fff" }}
      >
        <div
          className="flex items-center justify-between gap-2 border-b-2 px-4 py-2.5"
          style={{ borderColor: INK, backgroundColor: PAPER }}
        >
          <p className="truncate text-sm font-bold tracking-[-0.01em]" style={{ color: INK }}>
            {site.name}
          </p>
          {stat && (
            <span
              className="shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold"
              style={{ backgroundColor: YELLOW, color: INK }}
            >
              {stat.pagespeed}
            </span>
          )}
        </div>
        <div className="relative aspect-[4/3]">
          <Image
            src={site.images.desktop}
            alt={`${site.name} — skjermbilde av nettsiden`}
            fill
            sizes="(max-width: 640px) 46vw, 31vw"
            className="pointer-events-none object-cover object-top"
            draggable={false}
          />
        </div>
        <div
          className="flex items-center justify-between border-t-2 px-4 py-2.5"
          style={{ borderColor: INK, backgroundColor: PAPER }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(20,20,16,0.55)" }}>
            {site.domain}
          </span>
          <a
            href={`https://${site.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Besøk ${site.name}`}
            onPointerDown={(e) => e.stopPropagation()}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-transform hover:scale-110"
            style={{ backgroundColor: INK, color: YELLOW }}
          >
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function FolioDesk() {
  const [tidy, setTidy] = useState(false);
  const [zOrder, setZOrder] = useState<number[]>([1, 2, 3, 4, 5]);
  const zCounter = useRef(5);

  const bringToFront = (i: number) => {
    zCounter.current += 1;
    setZOrder((prev) => {
      const next = [...prev];
      next[i] = zCounter.current;
      return next;
    });
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <div className="px-[4vw] pt-24 sm:pt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
            <span className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "112%" },
                  visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
                }}
                className="block text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold leading-[1.02] tracking-[-0.045em]"
              >
                Utvalgte <Marker delay={0.7}>prosjekter</Marker>
              </motion.span>
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mb-1 flex items-center gap-4"
          >
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.25em] sm:block" style={{ color: "rgba(20,20,16,0.5)" }}>
              Dra i kortene
            </p>
            <button
              type="button"
              onClick={() => setTidy((v) => !v)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-colors duration-200 active:scale-95"
              style={
                tidy
                  ? { borderColor: INK, backgroundColor: "transparent", color: INK }
                  : { borderColor: INK, backgroundColor: INK, color: YELLOW }
              }
            >
              {tidy ? (
                <>
                  <Shuffle className="h-4 w-4" aria-hidden /> Rot det til
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden /> Rydd opp
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* The desk */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative mx-[3vw] mb-16 mt-10 h-[78vh] min-h-[540px] rounded-[1.4rem] border-2 border-dashed"
        style={{ borderColor: "rgba(20,20,16,0.25)" }}
      >
        {PORTFOLIO_SITES.map((site, i) => (
          <DeskCard
            key={site.id}
            index={i}
            tidy={tidy}
            zIndex={zOrder[i]}
            onGrab={() => bringToFront(i)}
          />
        ))}
        <span
          aria-hidden
          className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{ color: "rgba(20,20,16,0.35)" }}
        >
          ({String(PORTFOLIO_SITES.length).padStart(2, "0")}) Ekte leverte nettsider
        </span>
      </motion.div>

      <div className="px-[4vw] pb-20">
        <Link
          href="/referanser"
          className="inline-flex items-center gap-2 border-b-2 pb-0.5 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-60"
          style={{ borderColor: YELLOW, color: INK }}
        >
          Tidligere prosjekter
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
