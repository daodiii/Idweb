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
 * Hero — a typographic monument. Three poster lines fill the viewport
 * width, rising character by character. Below: the brief and CTAs.
 * At the base: a marquee that accelerates and reverses with scroll
 * velocity. A circular badge rotates forever in the corner.
 */

const ENTRY_DELAY = 0.25;

function PosterLine({
  text,
  lineIndex,
  className = "",
  style,
}: {
  text: string;
  lineIndex: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  const chars = text.split("");
  return (
    <span className="block overflow-hidden" aria-hidden>
      <span className={`flex ${className}`} style={style}>
        {chars.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block will-change-transform"
            initial={reduced ? { opacity: 0 } : { y: "112%" }}
            animate={reduced ? { opacity: 1 } : { y: "0%" }}
            transition={{
              duration: 0.85,
              ease: EASE,
              delay: ENTRY_DELAY + lineIndex * 0.14 + i * 0.024,
            }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
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
    // Seamless wrap across one quarter (content rendered 4x)
    if (next <= -25) next += 25;
    if (next > 0) next -= 25;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  const row = items.join(" ✳ ") + " ✳ ";

  return (
    <div className="overflow-hidden border-y py-3.5 sm:py-4" style={{ borderColor: "rgba(20,20,16,0.16)" }} aria-hidden>
      <motion.div className="flex w-max whitespace-nowrap will-change-transform" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span
            key={copy}
            className="pr-2 font-serif text-xl font-black uppercase tracking-tight sm:text-2xl"
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
        {/* The monument */}
        <h1 className="px-[3vw]">
          <span className="sr-only">{HERO.headline}</span>
          <PosterLine
            text="WEBUTVIKLING"
            lineIndex={0}
            className="justify-between font-serif text-[13.4vw] font-black leading-[0.88] tracking-[-0.02em]"
          />
          <PosterLine
            text="OG NETTSIDER"
            lineIndex={1}
            className="justify-between font-serif text-[13.4vw] font-black leading-[0.88] tracking-[-0.02em]"
            style={{ color: "transparent", WebkitTextStroke: `max(1.5px, 0.16vw) ${INK}` }}
          />
          <PosterLine
            text="I OSLO ©2026"
            lineIndex={2}
            className="justify-between font-serif text-[13.4vw] font-black leading-[0.88] tracking-[-0.02em]"
            style={{
              color: YELLOW,
              WebkitTextStroke: `max(1px, 0.1vw) ${INK}`,
            }}
          />
        </h1>

        {/* Brief + CTAs */}
        <div className="mt-12 grid grid-cols-1 items-end gap-10 px-[3vw] sm:mt-16 lg:grid-cols-[1fr_auto_auto] lg:gap-16">
          <motion.p
            className="max-w-[46ch] text-base leading-relaxed sm:text-lg"
            style={{ color: "rgba(20,20,16,0.72)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
          >
            {HERO.subheadline}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
          >
            <Magnetic>
              <Link
                href="/referanser"
                className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-bold transition-colors duration-200 active:scale-[0.97]"
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
                className="inline-flex items-center gap-2 border-b-2 pb-1 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-60"
                style={{ borderColor: INK, color: INK }}
              >
                {HERO.secondaryCta}
              </Link>
            </Magnetic>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.3 }}
          >
            <OrbitBadge />
          </motion.div>
        </div>
      </div>

      {/* Velocity marquee at the base */}
      <motion.div
        className="mt-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <VelocityMarquee
          items={["Webutvikling", "Nettsider", "SEO", "Design", "Vedlikehold", "Oslo"]}
        />
      </motion.div>
    </section>
  );
}
