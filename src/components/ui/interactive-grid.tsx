"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useMotionTemplate,
  motion,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";

const GRID_SIZE = 40;

function GridPattern({
  offsetX,
  offsetY,
  patternId,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>;
  offsetY: ReturnType<typeof useMotionValue<number>>;
  patternId: string;
}) {
  return (
    <svg className="h-full w-full">
      <defs>
        <motion.pattern
          id={patternId}
          width={GRID_SIZE}
          height={GRID_SIZE}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

export function InteractiveGrid({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();

  // Attach mousemove to the parent section so it works even when
  // content layers sit on top of the grid (higher z-index)
  useEffect(() => {
    const section = containerRef.current?.closest("section");
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = section.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    if (prefersReducedMotion) return;
    gridOffsetX.set((gridOffsetX.get() + 0.3) % GRID_SIZE);
    gridOffsetY.set((gridOffsetY.get() + 0.3) % GRID_SIZE);
  });

  const maskImage = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >
      {/* Base grid — always visible, faint */}
      <div className="absolute inset-0 text-white opacity-[0.06]">
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          patternId={`${id}-base`}
        />
      </div>

      {/* Reveal grid — accent color, masked to cursor */}
      <motion.div
        className="absolute inset-0 text-[var(--color-accent)] opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          patternId={`${id}-reveal`}
        />
      </motion.div>
    </div>
  );
}
