"use client";

import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "1. Vi blir kjent med deg",
    description:
      "Alt starter med en uforpliktende samtale. Vi lytter til dine behov, kartlegger målgruppen din og forstår hva du ønsker å oppnå. Sammen legger vi grunnlaget for en nettside som virkelig representerer bedriften din.",
    content: (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1120&q=80&fit=crop"
          width={560}
          height={560}
          className="h-full w-full object-cover"
          alt="Planlegging og kartlegging"
        />
      </div>
    ),
  },
  {
    title: "2. Vi designer og utvikler",
    description:
      "Basert på det vi har lært, skaper vi et skreddersydd design og bygger nettsiden med fokus på hastighet, SEO og brukervennlighet. Du er involvert i hele prosessen og godkjenner hvert steg underveis.",
    content: (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1120&q=80&fit=crop"
          width={560}
          height={560}
          className="h-full w-full object-cover"
          alt="Design og utvikling"
        />
      </div>
    ),
  },
  {
    title: "3. Vi lanserer og følger opp",
    description:
      "Når du er fornøyd, lanserer vi nettsiden din. Men vi stopper ikke der — vi tilbyr løpende vedlikehold, oppdateringer og support slik at siden alltid presterer optimalt og holder seg oppdatert.",
    content: (
      <div className="flex h-full w-full items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1120&q=80&fit=crop"
          width={560}
          height={560}
          className="h-full w-full object-cover"
          alt="Lansering og oppfølging"
        />
      </div>
    ),
  },
];

export function ProcessSection() {
  return (
    <StickyScroll
      content={content}
      contentClassName="rounded-xl"
      titleClassName="text-[var(--color-dark-text)]"
      descriptionClassName="text-[var(--color-dark-muted)]"
      header={
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
      }
    />
  );
}
