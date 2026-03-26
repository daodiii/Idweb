"use client";

import { useState } from "react";
import type { FAQ } from "@/types";
import { PaletteBackground } from "@/components/ui/palette-background";

interface ServiceFaqProps {
  faq: FAQ[];
}

export function ServiceFaq({ faq }: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <PaletteBackground palette="orkenblomst" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
          Vanlige spørsmål
        </h2>

        <div className="flex flex-col gap-3">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={`rounded-xl border backdrop-blur-sm transition-colors duration-200 ${
                  isOpen
                    ? "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center justify-between px-5 py-4 text-left"
                >
                  <span
                    className={`font-semibold transition-colors duration-200 ${
                      isOpen ? "text-[var(--color-accent)]" : "text-[var(--color-dark-text)]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className="ml-4 shrink-0 text-xl text-[var(--color-accent)]"
                    aria-hidden="true"
                  >
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--color-dark-muted)]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PaletteBackground>
  );
}
