"use client";

import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { AuroraBackground } from "@/components/ui/aurora-background";

const STEPS = [
  {
    title: "Vi blir kjent med deg",
    description:
      "Alt starter med en uforpliktende samtale. Vi lytter til dine behov, kartlegger målgruppen din og forstår hva du ønsker å oppnå.",
    image: "/images/process/step-1.png",
    imageAlt: "Planlegging og kartlegging",
  },
  {
    title: "Vi designer og utvikler",
    description:
      "Vi skaper et skreddersydd design og bygger nettsiden med fokus på hastighet, SEO og brukervennlighet.",
    image: "/images/process/step-2.png",
    imageAlt: "Design og utvikling",
  },
  {
    title: "Vi lanserer og følger opp",
    description:
      "Vi lanserer nettsiden din og tilbyr løpende vedlikehold, oppdateringer og support.",
    image: "/images/process/step-3.png",
    imageAlt: "Lansering og oppfølging",
  },
];

const stickyContent = STEPS.map((step, i) => ({
  title: `${i + 1}. ${step.title}`,
  description: step.description,
  content: (
    <div className="flex h-full w-full items-center justify-center overflow-hidden">
      <Image
        src={step.image}
        width={560}
        height={560}
        className="h-full w-full object-cover"
        alt={step.imageAlt}
      />
    </div>
  ),
}));

const stickyHeader = (
  <div className="mb-8 text-center">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
      Slik jobber vi
    </p>
    <h2 className="mb-4 text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
      Fra idé til lansering på 1-2-3
    </h2>
    <p className="mx-auto max-w-2xl text-lg text-[var(--color-dark-muted)]">
      Min velprøvde prosess sørger for at du får en nettside du er stolt av
      — uten stress.
    </p>
  </div>
);

function MobileProcess() {
  return (
    <AuroraBackground variant="center" className="px-6 py-14 md:hidden">
      <div className="relative mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
            Slik jobber vi
          </p>
          <h2 className="text-2xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-3xl">
            Fra idé til lansering på 1-2-3
          </h2>
        </div>

        <div className="space-y-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-[var(--color-dark-bg)]">
                  {i + 1}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-[var(--color-accent)]/20" />
                )}
              </div>
              <div className="pb-2">
                <h3 className="text-base font-bold text-[var(--color-dark-text)]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--color-dark-muted)]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
}

export function ProcessSection() {
  return (
    <>
      {/* Mobile: compact numbered list */}
      <MobileProcess />

      {/* Desktop: sticky scroll experience */}
      <div className="hidden md:block">
        <StickyScroll
          content={stickyContent}
          contentClassName="rounded-xl"
          titleClassName="text-[var(--color-dark-text)]"
          descriptionClassName="text-[var(--color-dark-muted)]"
          header={stickyHeader}
        />
      </div>
    </>
  );
}
