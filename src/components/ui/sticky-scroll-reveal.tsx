"use client";

import React, { useRef } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export function StickyScroll({
  content,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  const [activeCard, setActiveCard] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const linearGradients = [
    "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))",
    "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))",
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))",
  ];

  return (
    <div ref={containerRef} className="relative flex gap-10">
      {/* Left: step list — each step gets tall spacing so page scroll advances them */}
      <div className="w-full lg:w-1/2">
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className={cn(
              "flex min-h-[50vh] flex-col justify-center",
              index === content.length - 1 && "min-h-[40vh]",
            )}
          >
            <motion.h2
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "text-2xl font-bold text-pretty sm:text-3xl motion-reduce:[transition:none]",
                titleClassName ?? "text-[var(--color-text)]",
              )}
            >
              {item.title}
            </motion.h2>
            <motion.p
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "mt-6 max-w-md text-lg leading-relaxed motion-reduce:[transition:none]",
                descriptionClassName ?? "text-[var(--color-text-muted)]",
              )}
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Right: sticky image panel — stays in view while scrolling through steps */}
      <div className="hidden lg:block lg:w-1/2">
        <div
          className={cn(
            "sticky top-[calc(50vh-14rem)] h-[28rem] w-full overflow-hidden rounded-xl",
            contentClassName,
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="h-full w-full"
              style={{
                background: content[activeCard].content
                  ? undefined
                  : linearGradients[activeCard % linearGradients.length],
              }}
            >
              {content[activeCard].content ?? null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
