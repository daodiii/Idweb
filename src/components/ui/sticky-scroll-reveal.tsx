"use client";

import React, { useId, useRef, useCallback, useEffect } from "react";
import { useMotionValueEvent, useScroll, motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Starfield } from "@/components/ui/starfield";

export function StickyScroll({
  content,
  contentClassName,
  titleClassName,
  descriptionClassName,
  header,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  header?: React.ReactNode;
}) {
  const [activeCard, setActiveCard] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const filterId = useId();
  const isSnapping = useRef(false);
  const snapCooldown = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const segmentSize = 1 / cardLength;
    const index = Math.min(
      Math.floor(latest / segmentSize),
      cardLength - 1,
    );
    setActiveCard(index);
  });

  /**
   * Scroll-snap behavior: intercept wheel events while the sticky section
   * is in view and jump exactly one step per scroll gesture.
   */
  const scrollToStep = useCallback(
    (stepIndex: number) => {
      const container = containerRef.current;
      if (!container) return;

      // Each step occupies an equal share of the container's scrollable height.
      // The scrollable range is containerHeight - viewportHeight.
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableRange = containerHeight - viewportHeight;
      const segmentSize = scrollableRange / cardLength;

      // Scroll to the start of the target step segment
      const targetScroll = containerTop + segmentSize * stepIndex;

      isSnapping.current = true;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });

      // Release the snap lock after the smooth scroll finishes
      if (snapCooldown.current) clearTimeout(snapCooldown.current);
      snapCooldown.current = setTimeout(() => {
        isSnapping.current = false;
      }, 600);
    },
    [cardLength],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only snap when the sticky section is actively pinned (container in view)
      const rect = container.getBoundingClientRect();
      const isInView = rect.top <= 0 && rect.bottom >= window.innerHeight;
      if (!isInView) return;

      // Don't handle if we're already mid-snap
      if (isSnapping.current) {
        e.preventDefault();
        return;
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextStep = activeCard + direction;

      // If scrolling would go beyond the section bounds, let the page scroll naturally
      if (nextStep < 0 || nextStep >= cardLength) return;

      e.preventDefault();
      scrollToStep(nextStep);
    };

    // Must use non-passive to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeCard, cardLength, scrollToStep]);

  const linearGradients = [
    "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))",
    "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))",
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))",
  ];

  return (
    // Outer container: tall enough to create scroll space (100vh per step)
    // No overflow-hidden here so sticky works
    <div ref={containerRef} style={{ height: `${cardLength * 200}vh` }} className="relative">
      {/* Pinned viewport — stays fixed while scrolling through the tall container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Aurora background layers — inside sticky so they stay visible */}
        <div className="absolute inset-0 bg-[var(--color-dark-bg)]" />
        <div
          className="aurora-glow-layer pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background: [
              "radial-gradient(ellipse 70% 50% at 20% 75%, rgba(var(--color-aurora-teal), 0.20) 0%, transparent 70%)",
              "radial-gradient(ellipse 70% 50% at 70% 30%, rgba(var(--color-aurora-gold), 0.15) 0%, transparent 70%)",
            ].join(", "),
          }}
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
          style={{ opacity: "var(--aurora-noise-opacity)" }}
        >
          <filter id={filterId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves={3} />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
        <Starfield />

        {/* Content */}
        <div className="relative z-[1] flex h-full flex-col justify-center px-6">
          <div className="mx-auto w-full max-w-6xl">
            {header}

            <div className="flex w-full items-center gap-10">
              {/* Left: text content — transitions in place */}
              <div className="flex w-full flex-col justify-center lg:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3
                      className={cn(
                        "text-2xl font-bold text-pretty sm:text-3xl",
                        titleClassName ?? "text-[var(--color-text)]",
                      )}
                    >
                      {content[activeCard].title}
                    </h3>
                    <p
                      className={cn(
                        "mt-6 max-w-md text-lg leading-relaxed",
                        descriptionClassName ?? "text-[var(--color-text-muted)]",
                      )}
                    >
                      {content[activeCard].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Step indicators */}
                <div className="mt-8 flex gap-2">
                  {content.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-400",
                        activeCard === index
                          ? "w-10 bg-[var(--color-accent)]"
                          : "w-4 bg-[var(--color-dark-muted)]/30",
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Right: image panel — transitions in place */}
              <div className="hidden lg:block lg:w-1/2">
                <div
                  className={cn(
                    "h-[28rem] w-full overflow-hidden rounded-xl",
                    contentClassName,
                  )}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCard}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
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
          </div>
        </div>
      </div>
    </div>
  );
}
