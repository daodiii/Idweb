"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Portfolio 06 — «Sporet». Vertical scroll pans a giant horizontal
 * filmstrip of cinematic frames. The screenshot inside each frame
 * parallax-drifts against the pan for depth. Native horizontal
 * scroll-snap on touch / reduced motion.
 */

function TrackPanel({
  index,
  trackProgress,
  count,
}: {
  index: number;
  trackProgress: MotionValue<number>;
  count: number;
}) {
  const site = PORTFOLIO_SITES[index];
  const stat = PORTFOLIO_STATS[site.id];
  // Parallax the image opposite the pan as this panel crosses the screen.
  const span = 1 / count;
  const mid = (index + 0.5) * span;
  const imgX = useTransform(trackProgress, [mid - span, mid + span], ["12%", "-12%"]);

  return (
    <article className="relative h-full w-[78vw] shrink-0 sm:w-[58vw] lg:w-[44vw]">
      <Link
        href={`https://${site.domain}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-full overflow-hidden rounded-[1.4rem] border"
        style={{ borderColor: "rgba(243,240,231,0.16)" }}
      >
        <motion.div className="absolute inset-0 scale-[1.18]" style={{ x: imgX }}>
          <Image
            src={site.images.desktop}
            alt={`${site.name} — skjermbilde`}
            fill
            sizes="58vw"
            className="object-cover object-top grayscale-[0.7] transition-[filter] duration-500 group-hover:grayscale-0"
          />
        </motion.div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,13,11,0.82) 0%, transparent 55%)" }}
        />
        <span
          aria-hidden
          className="absolute right-6 top-5 text-[7rem] font-bold leading-none tracking-[-0.04em] opacity-90 sm:text-[9rem]"
          style={{ color: "transparent", WebkitTextStroke: `2px rgba(243,240,231,0.22)` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-2xl font-bold tracking-[-0.02em] sm:text-4xl" style={{ color: PAPER }}>
              {site.name}
            </p>
            <p className="mt-1 truncate font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(243,240,231,0.6)" }}>
              {site.domain}
              {stat ? ` — ${stat.result}` : ""}
            </p>
          </div>
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14"
            style={{ backgroundColor: YELLOW, color: INK }}
          >
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

export function FolioTrack() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [shift, setShift] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
  const x = useTransform(smooth, [0, 1], [0, -shift]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const vp = track.parentElement;
      if (!vp) return;
      setShift(Math.max(0, track.scrollWidth - vp.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const Heading = (
    <div className="flex items-end justify-between gap-6">
      <motion.h2 initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
        <span className="block overflow-hidden">
          <motion.span
            variants={{ hidden: { y: "112%" }, visible: { y: "0%", transition: { duration: 0.9, ease: EASE } } }}
            className="block text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.045em]"
          >
            Utvalgte <Marker delay={0.7}>prosjekter</Marker>
          </motion.span>
        </span>
      </motion.h2>
      <span className="mb-2 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] lg:flex" style={{ color: "rgba(243,240,231,0.5)" }}>
        Scroll <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </div>
  );

  if (reduced) {
    return (
      <section style={{ backgroundColor: VOID, color: PAPER }} className="px-[4vw] py-24">
        {Heading}
        <div className="scrollbar-hide mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
          {PORTFOLIO_SITES.map((_, i) => (
            <div key={PORTFOLIO_SITES[i].id} className="h-[60vh] snap-start">
              <TrackPanel index={i} trackProgress={scrollYProgress} count={PORTFOLIO_SITES.length} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: VOID, color: PAPER }}>
      <div ref={targetRef} className="relative h-[420vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 overflow-hidden py-16">
          <div className="px-[4vw]">{Heading}</div>
          <div className="overflow-hidden">
            <motion.div ref={trackRef} className="flex h-[62vh] w-max gap-7 px-[4vw] will-change-transform" style={{ x }}>
              {PORTFOLIO_SITES.map((_, i) => (
                <TrackPanel key={PORTFOLIO_SITES[i].id} index={i} trackProgress={smooth} count={PORTFOLIO_SITES.length} />
              ))}
              {/* End cap */}
              <div className="flex h-full w-[40vw] shrink-0 items-center lg:w-[24vw]">
                <Link
                  href="/referanser"
                  className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: YELLOW, color: INK }}
                >
                  Alle prosjekter
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
