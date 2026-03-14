"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

function BentoGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

function BentoCard({
  name,
  className,
  background,
  description,
  href,
  cta,
  index = 0,
}: {
  name: string;
  className: string;
  background: ReactNode;
  description: string;
  href: string;
  cta: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        "bg-[var(--color-bg)] border border-[var(--color-border)]",
        "transform-gpu transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Dot grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--color-accent) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Gradient accent border at top */}
      <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-[var(--color-accent)] to-[#E8C4B8] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Background slot */}
      <div>{background}</div>

      {/* Content */}
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <h3 className="text-xl font-semibold text-[var(--color-text)]">
          {name}
        </h3>
        <p className="max-w-lg text-[var(--color-text-muted)]">{description}</p>
      </div>

      {/* Hover CTA */}
      <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <Link
          href={href}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-bg-alt)]"
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-[var(--color-accent)]/[.02]" />
    </motion.div>
  );
}

export { BentoCard, BentoGrid };
