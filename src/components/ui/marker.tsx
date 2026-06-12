"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";
import { EASE_CSS, YELLOW } from "@/lib/motion";

/**
 * Marker — a yellow highlighter stroke that sweeps in under/behind the
 * text when it scrolls into view. The brand device that replaces
 * outline type for emphasis.
 */
export function Marker({
  children,
  delay = 0,
  thickness = 0.34,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  /** Stroke height in em, relative to the text. */
  thickness?: number;
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const active = immediate || inView;

  return (
    <span
      ref={ref}
      className="bg-no-repeat px-[0.08em]"
      style={{
        backgroundImage: `linear-gradient(${YELLOW}, ${YELLOW})`,
        backgroundSize: active ? `100% ${thickness}em` : `0% ${thickness}em`,
        backgroundPosition: "0 88%",
        transition: `background-size 0.9s ${EASE_CSS} ${delay}s`,
      }}
    >
      {children}
    </span>
  );
}
