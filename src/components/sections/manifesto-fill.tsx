"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { HERO } from "@/lib/content/homepage";
import { INK, PAPER, YELLOW } from "@/lib/motion";

/**
 * Manifesto — the brand statement pinned to the viewport while every
 * word inks in, one by one, as you scroll through it.
 */

const WORDS = HERO.subheadline.split(" ");
// Words that get the yellow marker treatment when they ink in.
const HIGHLIGHTS = new Set(["konvertere", "kunder."]);

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.88;
  const end = start + 0.88 / total;
  const opacity = useTransform(progress, [start, end], [0.13, 1]);
  const highlighted = HIGHLIGHTS.has(word);

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block ${highlighted ? "px-[0.18em]" : ""}`}
    >
      {highlighted ? (
        <span style={{ backgroundColor: YELLOW, boxShadow: `0.08em 0.08em 0 ${INK}` }} className="px-[0.15em]">
          {word}
        </span>
      ) : (
        word
      )}
    </motion.span>
  );
}

export function ManifestoFill() {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section style={{ backgroundColor: PAPER, color: INK }}>
      <div ref={targetRef} className="relative h-[230vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <p className="mx-auto w-full max-w-5xl px-[4vw] text-[clamp(1.65rem,4.1vw,3.4rem)] font-bold leading-[1.3] tracking-[-0.035em]">
            {reduced ? (
              HERO.subheadline
            ) : (
              <>
                {WORDS.map((word, i) => (
                  <span key={`${word}-${i}`}>
                    <Word word={word} index={i} total={WORDS.length} progress={scrollYProgress} />{" "}
                  </span>
                ))}
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
