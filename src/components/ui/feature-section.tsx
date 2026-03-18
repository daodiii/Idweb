"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Feature {
  step: string;
  title?: string;
  content: string;
  image: string;
  href?: string;
}

interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  title?: string;
  autoPlayInterval?: number;
}

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100));
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, features.length, autoPlayInterval]);

  return (
    <div className={cn("p-8 md:p-12", className)}>
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-12 text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>

        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-10">
          {/* Steps list */}
          <div className="order-2 space-y-8 md:order-1">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-6 md:gap-8 cursor-pointer"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  setCurrentFeature(index);
                  setProgress(0);
                }}
              >
                <motion.div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 md:h-10 md:w-10",
                    index === currentFeature
                      ? "scale-110 border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-text)]"
                      : "border-[var(--color-border)] bg-muted"
                  )}
                >
                  {index <= currentFeature ? (
                    <span className="text-lg font-bold">&#10003;</span>
                  ) : (
                    <span className="text-lg font-semibold">{index + 1}</span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {feature.href ? (
                      <Link
                        href={feature.href}
                        className="underline decoration-[var(--color-accent)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--color-accent-hover)]"
                      >
                        {feature.title || feature.step}
                      </Link>
                    ) : (
                      feature.title || feature.step
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-lg">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Image panel */}
          <div className="relative order-1 h-[200px] overflow-hidden rounded-lg md:order-2 md:h-[300px] lg:h-[400px]">
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 overflow-hidden rounded-lg"
                      initial={{ y: 100, opacity: 0, rotateX: -20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -100, opacity: 0, rotateX: 20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.step}
                        className="h-full w-full object-cover"
                        width={1200}
                        height={600}
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
