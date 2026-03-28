"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
  delay?: number;
  /** Animation variant */
  variant?: "fade-up" | "fade-in" | "fade-up-stagger";
}

/**
 * Lightweight scroll-triggered animation wrapper.
 * Replaces motion.div whileInView with IntersectionObserver + CSS.
 * ~0.5 KB vs ~50+ KB for motion library.
 */
export function AnimateIn({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  variant = "fade-up",
}: AnimateInProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("animate-in-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-in-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "-80px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={`animate-in-base animate-in-${variant} ${className}`}
      style={delay ? { transitionDelay: `${delay}s`, animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Component>
  );
}
