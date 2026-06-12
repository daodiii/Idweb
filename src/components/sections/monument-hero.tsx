"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { HERO } from "@/lib/content/homepage";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE, INK, PAPER, YELLOW } from "@/lib/motion";

/**
 * Hero — solid Geist, no hollow type. Three masked lines land with a
 * blur focus pull; "nettsider" gets the yellow marker once the line
 * settles. A velocity-reactive marquee runs along the base and a
 * circular badge rotates in the corner.
 */

const ENTRY_DELAY = 0.2;

function HeroLine({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={
          reduced ? { opacity: 0 } : { y: "110%", filter: "blur(8px)" }
        }
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.0, ease: EASE, delay: ENTRY_DELAY + index * 0.13 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Yellow marker that sweeps in behind "nettsider" after its line lands. */
function HeroMarker({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <span className="relative inline-block px-[0.06em]">
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-[0.02em] origin-left"
        style={{ backgroundColor: YELLOW, height: "0.42em", zIndex: 0 }}
        initial={{ scaleX: reduced ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: ENTRY_DELAY + 0.85 }}
      />
      <span className="relative" style={{ zIndex: 1 }}>
        {children}
      </span>
    </span>
  );
}

/** Marquee whose speed and direction follow scroll velocity. */
function VelocityMarquee({ items }: { items: string[] }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 380 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false });
  const directionRef = useRef(1);
  const reduced = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const vf = velocityFactor.get();
    if (vf < -0.1) directionRef.current = -1;
    else if (vf > 0.1) directionRef.current = 1;
    let moveBy = directionRef.current * 2.6 * (delta / 1000);
    moveBy += moveBy * Math.abs(vf);
    let next = baseX.get() - moveBy;
    if (next <= -25) next += 25;
    if (next > 0) next -= 25;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const row = items.join("  ✳  ") + "  ✳  ";

  return (
    <div
      className="overflow-hidden border-y py-3.5 sm:py-4"
      style={{ borderColor: "rgba(20,20,16,0.16)" }}
      aria-hidden
    >
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span
            key={copy}
            className="pr-2 text-xl font-semibold uppercase tracking-tight sm:text-2xl"
            style={{ color: INK }}
          >
            {row}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Slowly rotating circular text badge. */
function OrbitBadge() {
  return (
    <div className="relative h-32 w-32 sm:h-40 sm:w-40" aria-hidden>
      <svg viewBox="0 0 100 100" className="monument-spin h-full w-full">
        <defs>
          <path id="badge-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="font-mono" fontSize="8.2" letterSpacing="1.6" fill={INK}>
          <textPath href="#badge-circle">
            5/5 PÅ GOOGLE ✦ 0 KR BINDINGSTID ✦ BASERT I OSLO ✦
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <ArrowDown className="h-6 w-6" style={{ color: INK }} strokeWidth={2.5} />
      </span>
    </div>
  );
}

export function MonumentHero() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col overflow-hidden pt-20 sm:pt-24"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="grid grid-cols-1 items-end gap-10 px-[4vw] lg:grid-cols-[1fr_auto]">
          {/* The headline — solid Geist, tight tracking */}
          <h1>
            <span className="sr-only">{HERO.headline}</span>
            <span aria-hidden>
              <HeroLine
                index={0}
                className="text-[clamp(3rem,9.8vw,8.6rem)] font-bold leading-[0.98] tracking-[-0.05em]"
              >
                Webutvikling
              </HeroLine>
              <HeroLine
                index={1}
                className="text-[clamp(3rem,9.8vw,8.6rem)] font-bold leading-[0.98] tracking-[-0.05em]"
              >
                og <HeroMarker>nettsider</HeroMarker>
              </HeroLine>
              <HeroLine
                index={2}
                className="text-[clamp(3rem,9.8vw,8.6rem)] font-bold leading-[0.98] tracking-[-0.05em]"
              >
                i Oslo<span style={{ color: YELLOW }}>.</span>
              </HeroLine>
            </span>
          </h1>

          <motion.div
            className="hidden pb-3 lg:block"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.2 }}
          >
            <OrbitBadge />
          </motion.div>
        </div>

        {/* Brief + CTAs */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 px-[4vw] sm:mt-14 lg:grid-cols-[minmax(0,52ch)_auto] lg:gap-16">
          <motion.p
            className="text-base leading-relaxed sm:text-lg"
            style={{ color: "rgba(20,20,16,0.7)" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
          >
            {HERO.subheadline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
          >
            <Magnetic>
              <Link
                href="/referanser"
                className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold transition-colors duration-200 active:scale-[0.97]"
                style={{ backgroundColor: INK, color: PAPER }}
              >
                {HERO.primaryCta}
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: YELLOW }}
                />
              </Link>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 border-b-2 pb-1 text-sm font-semibold uppercase tracking-wide transition-opacity hover:opacity-60"
                style={{ borderColor: YELLOW, color: INK }}
              >
                {HERO.secondaryCta}
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Velocity marquee at the base */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <VelocityMarquee
          items={["Webutvikling", "Nettsider", "SEO", "Design", "Vedlikehold", "Oslo"]}
        />
      </motion.div>
    </section>
  );
}
