"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";

const SPLINE_SCENE_URL =
  "https://prod.spline.design/g1PWeaAMVUIzEOGV/scene.splinecode";

type SplineSceneProps = {
  onLoaded: (loaded: boolean) => void;
};

export function SplineScene({ onLoaded }: SplineSceneProps) {
  const [loaded, setLoaded] = useState(false);
  const [SplineComponent, setSplineComponent] = useState<React.ComponentType<{
    scene: string;
    onLoad?: (app: unknown) => void;
  }> | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const splineAppRef = useRef<unknown>(null);

  // Preconnect to Spline CDN as soon as we know we're on desktop
  useEffect(() => {
    if (!isDesktop) return;
    const existing = document.querySelector('link[href="https://prod.spline.design"]');
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = "https://prod.spline.design";
      document.head.appendChild(link);
    }
  }, [isDesktop]);

  // Defer Spline import until browser is idle — prevents 562 KiB runtime from
  // blocking main thread during the FCP→TTI window that Lighthouse measures
  useEffect(() => {
    if (!isDesktop) return;

    let cancelled = false;
    const loadSpline = () => {
      import("@splinetool/react-spline").then((mod) => {
        if (!cancelled) {
          setSplineComponent(() => mod.default);
        }
      });
    };

    // Use requestIdleCallback to load after critical work, with setTimeout fallback
    const idle = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback(loadSpline, { timeout: 4000 })
      : null;
    const timer = idle === null ? setTimeout(loadSpline, 3000) : undefined;

    return () => {
      cancelled = true;
      if (idle !== null) cancelIdleCallback(idle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [isDesktop]);

  const handleLoad = useCallback(
    (splineApp: unknown) => {
      splineAppRef.current = splineApp;
      const app = splineApp as { stop: () => void; play: () => void };

      if (prefersReducedMotion) {
        app.stop();
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
    const app = splineAppRef.current as { stop: () => void; play: () => void } | null;
    if (!app) return;

    if (prefersReducedMotion) {
      app.stop();
    } else {
      app.play();
    }
  }, [prefersReducedMotion]);

  if (!isDesktop || !SplineComponent) return null;

  return (
    <motion.div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      aria-hidden="true"
    >
      <SplineComponent scene={SPLINE_SCENE_URL} onLoad={handleLoad} />
      {/* Cover the Spline watermark in the bottom-right corner */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-10 h-12 w-40 bg-[var(--color-dark-bg)]" />
    </motion.div>
  );
}
