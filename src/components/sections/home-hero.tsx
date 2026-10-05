"use client";

import { useRef } from "react";
import type { PointerEvent, ReactNode } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";

const LEAD_WORDS = ["Gode", "nettsider", "for", "bedrifter", "som", "vil", "bli"];
const WORD_START = 0.25;
const WORD_STAGGER = 0.065;
/** When the last word ("valgt.") has landed and its highlight starts drawing. */
const HIGHLIGHT_AT = WORD_START + LEAD_WORDS.length * WORD_STAGGER + 0.55;

/** One headline word rising out of its own mask. */
function Word({ children, delay, reduce }: { children: ReactNode; delay: number; reduce: boolean }) {
  return (
    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: "105%", rotate: 4 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Primary CTA that leans toward the cursor. */
function MagneticLink({ href, children, reduce }: { href: string; children: ReactNode; reduce: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

  function onPointerMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.38);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.span style={{ x, y }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        className="group inline-flex min-h-14 items-center gap-2.5 rounded-full bg-[var(--color-nordic-accent)] px-7 text-[17px] font-semibold text-white shadow-[0_14px_30px_-12px_rgba(30,90,76,0.6)] transition-colors duration-200 hover:bg-[var(--color-nordic-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-nordic-accent)]"
      >
        {children}
        <span className="relative inline-flex h-5 w-5 overflow-hidden" aria-hidden="true">
          <ArrowUpRight className="absolute h-5 w-5 transition-transform duration-300 group-hover:-translate-y-5 group-hover:translate-x-5" />
          <ArrowUpRight className="absolute h-5 w-5 -translate-x-5 translate-y-5 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      </Link>
    </motion.span>
  );
}

/**
 * Homepage hero — «Nordisk ro». The headline rises word by word, then a
 * hand-drawn highlight sweeps under «valgt»; copy and actions follow.
 * Everything renders in its final state for reduced-motion users.
 */
export function HomeHero() {
  const reduce = useReducedMotion() ?? false;

  const fadeUp = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 18, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.9, ease: EASE, delay },
        };

  return (
    <section className="bg-[var(--color-nordic-bg)] px-6 pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center font-[family-name:var(--font-display)] text-[var(--color-nordic-ink)]">
        <motion.p
          {...fadeUp(0.05)}
          className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-nordic-sage)] px-4 py-2 text-sm font-medium"
        >
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-nordic-accent)] opacity-40 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-nordic-accent)]" />
          </span>
          Webutvikling for norske bedrifter
        </motion.p>

        <h1 className="mt-8 max-w-[15ch] text-[clamp(2.75rem,7vw,5.75rem)] font-bold leading-[1.02] tracking-[-0.045em] sm:max-w-[17ch]">
          {LEAD_WORDS.map((word, i) => (
            <span key={word + i}>
              <Word delay={WORD_START + i * WORD_STAGGER} reduce={reduce}>
                {word}
              </Word>{" "}
            </span>
          ))}
          <Word delay={WORD_START + LEAD_WORDS.length * WORD_STAGGER} reduce={reduce}>
            <span className="relative inline-block">
              <svg
                aria-hidden="true"
                viewBox="0 0 220 40"
                preserveAspectRatio="none"
                className="absolute bottom-[0.02em] left-0 h-[0.42em] w-full"
              >
                <motion.path
                  d="M4 26 C 48 12, 120 10, 216 18"
                  fill="none"
                  stroke="var(--color-nordic-mint)"
                  strokeWidth="22"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1], delay: HIGHLIGHT_AT }}
                />
              </svg>
              <span className="relative">valgt.</span>
            </span>
          </Word>
        </h1>

        <motion.p
          {...fadeUp(0.85)}
          className="mt-8 max-w-[38rem] font-[family-name:var(--font-body)] text-lg leading-relaxed text-[var(--color-nordic-muted)] sm:text-xl"
        >
          Vi designer, bygger og drifter nettsider som gjør det enkelt for kundene dine å finne deg,
          stole på deg og ta kontakt.
        </motion.p>

        <motion.div {...fadeUp(1)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <MagneticLink href="/kontakt" reduce={reduce}>
            Få et uforpliktende tilbud
          </MagneticLink>
          <Link
            href="#arbeid"
            className="inline-flex min-h-14 items-center rounded-full bg-[var(--color-nordic-sage)] px-7 text-[17px] font-semibold transition-colors duration-200 hover:bg-[#dde9e4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-nordic-accent)]"
          >
            Se arbeidet vårt
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
