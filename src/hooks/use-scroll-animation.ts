"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Drives a gentle scroll animation on an absolutely-positioned image
 * inside a fixed-height container.
 *
 * Cycle: hold top → scroll down → hold bottom → scroll back up
 * Timing (12s default): 0-25% hold, 25-60% down, 60-80% hold, 80-100% up
 *
 * Pauses automatically when the container is off-screen.
 * Respects prefers-reduced-motion — stays static at top.
 */
export function useScrollAnimation(
  imageRef: RefObject<HTMLImageElement | null>,
  containerRef: RefObject<HTMLDivElement | null>,
  options?: { cycleDuration?: number; paused?: boolean }
) {
  const rafId = useRef<number>(0);
  const startTime = useRef<number>(0);
  const isVisible = useRef(true);
  const cycleDuration = options?.cycleDuration ?? 12000;
  const paused = options?.paused ?? false;

  useEffect(() => {
    const image = imageRef.current;
    const container = containerRef.current;
    if (!image || !container) return;

    // Respect reduced-motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      image.style.top = "0px";
      return;
    }

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    function easeInOutQuad(t: number): number {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    function tick(now: number) {
      if (!image || !container) return;

      if (!startTime.current) startTime.current = now;

      if (isVisible.current && !paused) {
        const containerH = container.offsetHeight;
        const scale = container.offsetWidth / (image.naturalWidth || 1);
        const imgH = (image.naturalHeight || 1) * scale;
        const scrollDist = Math.max(0, imgH - containerH);

        const elapsed = (now - startTime.current) % cycleDuration;
        const progress = elapsed / cycleDuration;

        let top = 0;

        if (progress < 0.25) {
          // Hold at top
          top = 0;
        } else if (progress < 0.6) {
          // Scroll down
          const p = (progress - 0.25) / 0.35;
          top = -scrollDist * easeInOutQuad(p);
        } else if (progress < 0.8) {
          // Hold at bottom
          top = -scrollDist;
        } else {
          // Scroll back up
          const p = (progress - 0.8) / 0.2;
          top = -scrollDist * (1 - easeInOutQuad(p));
        }

        image.style.top = `${top}px`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [imageRef, containerRef, cycleDuration, paused]);

  /** Reset scroll position to top (call on set change) */
  return {
    reset: () => {
      startTime.current = 0;
      if (imageRef.current) {
        imageRef.current.style.top = "0px";
      }
    },
  };
}
