"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MousePointer2 } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PORTFOLIO_STATS } from "@/lib/content/homepage";
import { Marker } from "@/components/ui/marker";
import { EASE, INK, PAPER, VOID, YELLOW, VIEWPORT_ONCE } from "@/lib/motion";

/**
 * Portfolio 05 — «Tunnelen». The sites are arranged down a 3D corridor.
 * Scrolling flies the camera forward; each site rushes out of the fog,
 * fills the view, then sweeps past. Falls back to a stacked grid for
 * reduced motion / small screens.
 */

const N = PORTFOLIO_SITES.length;
const GAP = 900; // z-distance between sites
const DEPTH = N * GAP + 700;
const X_OFFSETS = ["-14%", "13%", "-9%", "11%", "0%"];

function TunnelCard({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const site = PORTFOLIO_SITES[index];
  const stat = PORTFOLIO_STATS[site.id];

  // Card's z relative to the camera as we scroll forward.
  const z = useTransform(progress, (p) => p * DEPTH - index * GAP);
  const opacity = useTransform(z, (zz) => {
    if (zz > 480) return 0; // passed the camera
    if (zz > -260) return 1; // in the sweet spot
    if (zz < -1500) return 0; // lost in the fog
    return 1 + (zz + 260) / 1240;
  });
  const blur = useTransform(z, (zz) => {
    const far = zz < -700 ? Math.min(8, (-700 - zz) / 110) : 0;
    return `blur(${far}px)`;
  });
  const transform = useMotionTemplate`translate(-50%, -50%) translateX(${X_OFFSETS[index]}) translateZ(${z}px)`;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[80vw] max-w-[860px]"
      style={{ transform, opacity, filter: blur, transformStyle: "preserve-3d" }}
    >
      <Link
        href={`https://${site.domain}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border shadow-2xl"
        style={{ borderColor: "rgba(243,240,231,0.2)" }}
      >
        <Image
          src={site.images.desktop}
          alt={`${site.name} — skjermbilde`}
          fill
          sizes="80vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,13,11,0.7) 0%, transparent 50%)" }}
        />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: YELLOW }}>
              {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </p>
            <p className="mt-1 truncate text-xl font-bold tracking-[-0.02em] sm:text-3xl" style={{ color: PAPER }}>
              {site.name}
            </p>
            <p className="truncate font-mono text-xs" style={{ color: "rgba(243,240,231,0.6)" }}>
              {site.domain}
            </p>
          </div>
          {stat && (
            <span
              className="shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-bold"
              style={{ backgroundColor: YELLOW, color: INK }}
            >
              PS {stat.pagespeed}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function FolioTunnel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  if (reduced) {
    return (
      <section style={{ backgroundColor: VOID, color: PAPER }} className="px-[4vw] py-24">
        <h2 className="text-[clamp(2.4rem,6.5vw,5.6rem)] font-bold tracking-[-0.045em]">
          Utvalgte prosjekter
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PORTFOLIO_SITES.map((site) => (
            <Link key={site.id} href={`https://${site.domain}`} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(243,240,231,0.2)" }}>
              <Image src={site.images.desktop} alt={site.name} fill sizes="50vw" className="object-cover object-top" />
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: VOID, color: PAPER }}>
      <div ref={targetRef} className="relative h-[520vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Fog at the vanishing point */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(244,206,20,0.08) 0%, transparent 35%), radial-gradient(circle at 50% 50%, rgba(13,13,11,0) 30%, rgba(13,13,11,0.85) 75%)",
            }}
          />

          {/* The corridor */}
          <div
            className="absolute inset-0 z-10"
            style={{ perspective: "1100px", transformStyle: "preserve-3d" }}
          >
            {PORTFOLIO_SITES.map((_, i) => (
              <TunnelCard key={PORTFOLIO_SITES[i].id} index={i} progress={scrollYProgress} />
            ))}
          </div>

          {/* Title + hint overlay */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-[4vw] pt-24 sm:pt-28">
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
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-[4vw] pb-10">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "rgba(243,240,231,0.5)" }}>
              <MousePointer2 className="h-4 w-4" aria-hidden /> Scroll for å fly gjennom
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
