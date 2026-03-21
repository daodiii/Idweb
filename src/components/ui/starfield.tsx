"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "motion/react";

const STAR_COUNT = 35;
const STAR_MAX_SIZE = 2;
const DRIFT_SPEED = 0.15;
const MOUSE_INFLUENCE = 0.02;
const TWINKLE_SPEED = 0.008;

type Star = {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  twinkleOffset: number;
  driftX: number;
  driftY: number;
};

function createStars(width: number, height: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * STAR_MAX_SIZE + 0.5,
    baseOpacity: Math.random() * 0.5 + 0.2,
    opacity: 0,
    twinkleOffset: Math.random() * Math.PI * 2,
    driftX: (Math.random() - 0.5) * DRIFT_SPEED,
    driftY: (Math.random() - 0.5) * DRIFT_SPEED * 0.6,
  }));
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const frameRef = useRef<number>(0);
  const prefersReducedMotion = useReducedMotion();

  const animate = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (const star of starsRef.current) {
        // Twinkle
        star.opacity =
          star.baseOpacity +
          Math.sin(time * TWINKLE_SPEED + star.twinkleOffset) * 0.2;

        if (!prefersReducedMotion) {
          // Drift
          star.x += star.driftX;
          star.y += star.driftY;

          // Mouse parallax (subtle)
          if (mouse.active) {
            const dx = (mouse.x - width / 2) * MOUSE_INFLUENCE * star.size;
            const dy = (mouse.y - height / 2) * MOUSE_INFLUENCE * star.size;
            star.x += dx * 0.01;
            star.y += dy * 0.01;
          }

          // Wrap around edges
          if (star.x < -10) star.x = width + 10;
          if (star.x > width + 10) star.x = -10;
          if (star.y < -10) star.y = height + 10;
          if (star.y > height + 10) star.y = -10;
        }

        // Draw
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(203, 213, 225, ${Math.max(0, star.opacity)})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      starsRef.current = createStars(rect.width, rect.height);
    };

    resize();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Pause animation when canvas is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(frameRef.current);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
