"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Application as SplineApplication } from "@splinetool/runtime";

// Start downloading the Spline runtime immediately at module evaluation time,
// not when the component first mounts after media-query detection.
const splineModulePromise = import("@splinetool/react-spline");
const Spline = dynamic(() => splineModulePromise, {
  ssr: false,
});

const SPLINE_SCENE_URL =
  "https://prod.spline.design/g1PWeaAMVUIzEOGV/scene.splinecode";

type SplineSceneProps = {
  onLoaded: (loaded: boolean) => void;
};

export function SplineScene({ onLoaded }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<SplineApplication | null>(null);

  const handleLoad = useCallback(
    (splineApp: SplineApplication) => {
      splineAppRef.current = splineApp;

      if (prefersReducedMotion) {
        splineApp.stop();
      }

      setLoaded(true);
      onLoaded(true);
    },
    [onLoaded, prefersReducedMotion],
  );

  // WebGL context loss recovery
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleContextLost = () => {
      setLoaded(false);
      onLoaded(false);
    };

    // The Spline runtime creates a <canvas> inside our container.
    // We use a MutationObserver to find it and attach the listener.
    const observer = new MutationObserver(() => {
      const canvas = container.querySelector("canvas");
      if (canvas) {
        canvas.addEventListener("webglcontextlost", handleContextLost);
        observer.disconnect();
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      const canvas = container.querySelector("canvas");
      canvas?.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, [onLoaded]);

  // Pause/resume based on reduced motion preference changes
  useEffect(() => {
    const app = splineAppRef.current;
    if (!app) return;

    if (prefersReducedMotion) {
      app.stop();
    } else {
      app.play();
    }
  }, [prefersReducedMotion]);

  if (!isDesktop) return null;

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      aria-hidden="true"
    >
      <Spline scene={SPLINE_SCENE_URL} onLoad={handleLoad} />
      {/* Cover the Spline watermark in the bottom-right corner */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-12 w-40 bg-[var(--color-dark-bg)]" />
    </motion.div>
  );
}
