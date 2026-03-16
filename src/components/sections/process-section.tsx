"use client";

import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { MessageCircle, Code2, Rocket } from "lucide-react";

const content = [
  {
    title: "1. Jeg blir kjent med deg",
    description:
      "Alt starter med en uforpliktende samtale. Jeg lytter til dine behov, kartlegger målgruppen din og forstår hva du ønsker å oppnå. Sammen legger jeg grunnlaget for en nettside som virkelig representerer bedriften din.",
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
    title: "2. Jeg designer og utvikler",
    description:
      "Basert på det jeg har lært, skaper jeg et skreddersydd design og bygger nettsiden med fokus på hastighet, SEO og brukervennlighet. Du er involvert i hele prosessen og godkjenner hvert steg underveis.",
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
    title: "3. Jeg lanserer og følger opp",
    description:
      "Når du er fornøyd, lanserer jeg nettsiden din. Men jeg stopper ikke der — jeg tilbyr løpende vedlikehold, oppdateringer og support slik at siden alltid presterer optimalt og holder seg oppdatert.",
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
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-dark-bg)] to-[#162032] px-6 py-24">
      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-[1] mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
          Slik jobber jeg
        </p>
        <h2 className="mb-4 text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
          Fra idé til lansering på 1-2-3
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-[var(--color-dark-muted)]">
          Min velprøvde prosess sørger for at du får en nettside du er stolt av
          — uten stress.
        </p>
        <StickyScroll content={content} contentClassName="rounded-xl" />
      </div>
    </section>
  );
}
