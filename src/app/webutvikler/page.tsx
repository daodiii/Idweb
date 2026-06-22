import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { LOCATIONS } from "@/lib/content/locations";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

// Oslo has a dedicated page under /tjenester — surface it here too so the
// local cluster is fully interlinked.
const OSLO = {
  href: "/tjenester/webutvikler-oslo",
  categoryTag: "Oslo",
  title: "Webutvikler i Oslo",
  shortDescription:
    "Lokal webutvikler i Oslo som lager raske, skreddersydde nettsider for bedrifter i hovedstaden.",
};

export const metadata: Metadata = {
  title: "Webutvikler i Oslo-området — lokal nettsideutvikling",
  description:
    "Lokal webutvikler for bedrifter i Oslo, Bærum, Asker, Lillestrøm, Lørenskog, Drammen og Ski. Raske, skreddersydde nettsider i Next.js. Faste priser, ingen bindingstid.",
  alternates: {
    canonical: "/webutvikler",
  },
  openGraph: {
    title: "Webutvikler i Oslo-området — lokal nettsideutvikling",
    description:
      "Lokal webutvikler for bedrifter i Oslo og omegn. Raske, skreddersydde nettsider i Next.js.",
    type: "website",
    locale: "nb_NO",
    siteName: "IDweb",
    url: "https://www.idweb.no/webutvikler",
  },
};

export default function LocationsHubPage() {
  return (
    <div className="bg-[var(--color-dark-bg)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Webutvikler i Oslo-området", href: "/webutvikler" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 82% 18%, rgba(244,206,20,0.16), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Webutvikler · Oslo-området
          </p>

          <h1 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Lokal webutvikler
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              der du{" "}
              <span className="relative inline-block">
                holder til
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h1>

          <p className="mt-9 max-w-[60ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Vi er Oslo-baserte og lager raske, skreddersydde nettsider i moderne
            Next.js — ikke tung WordPress. Alt skjer heldigitalt, så vi hjelper
            bedrifter i hele Norge like enkelt som i Oslo-området. Velg stedet
            ditt for en lokal gjennomgang.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Få et uforpliktende tilbud
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              />
            </Link>
            <Link
              href="/tjenester/nettside"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Slik jobber vi
            </Link>
          </div>
        </div>
      </section>

      {/* Locations grid */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pb-24 sm:pb-32">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {[OSLO, ...LOCATIONS.map((l) => ({
              href: `/webutvikler/${l.id}`,
              categoryTag: l.categoryTag,
              title: l.title,
              shortDescription: l.shortDescription,
            }))].map((place) => (
              <Link
                key={place.href}
                href={place.href}
                className="group relative flex flex-col bg-[var(--color-dark-bg)] p-7 transition-colors duration-200 hover:bg-white/[0.03] sm:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
                  {place.categoryTag}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-[1.7rem]">
                  {place.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                  {place.shortDescription}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70 transition-colors duration-150 group-hover:text-[#F4CE14]">
                  Se mer
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            ))}

            {/* Catch-all */}
            <div className="flex flex-col justify-center bg-[var(--color-dark-bg)] p-7 sm:p-8">
              <h2 className="font-serif text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-[1.7rem]">
                Et annet sted?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Vi jobber med bedrifter i hele Norge. Si fra hvor du holder til,
                så ordner vi resten — heldigitalt, fra start til lansering.
              </p>
              <Link
                href="/kontakt"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#F4CE14] transition-transform duration-150 hover:translate-x-0.5"
              >
                Ta kontakt
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
