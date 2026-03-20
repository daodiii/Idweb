"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export function MenuItem({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative"
    >
      <button
        type="button"
        onClick={() => setActive(active === item ? "" : item)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setActive("");
        }}
        aria-expanded={active === item}
        className="cursor-pointer text-sm font-medium text-[var(--color-dark-muted)] transition-colors hover:text-[var(--color-dark-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        {item}
      </button>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          className="motion-reduce:!transition-none"
        >
          {active === item && (
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-6">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-2xl border border-[var(--color-dark-border)] bg-[var(--color-dark-bg)]/95 shadow-xl backdrop-blur-md"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export function Menu({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative flex justify-center space-x-4 rounded-full border border-transparent bg-white px-8 py-6 shadow-input dark:border-white/[0.2] dark:bg-black",
        className
      )}
    >
      {children}
    </nav>
  );
}

export function ProductItem({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="mb-1 text-xl font-bold text-[var(--color-dark-text)]">
          {title}
        </h4>
        <p className="max-w-[10rem] text-sm text-[var(--color-dark-muted)] line-clamp-3">
          {description}
        </p>
      </div>
    </Link>
  );
}

export function HoveredLink({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...rest}
      className="text-[var(--color-dark-muted)] transition-colors hover:text-[var(--color-dark-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
    >
      {children}
    </Link>
  );
}
