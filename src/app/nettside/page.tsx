import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/content/industries";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

export const metadata: Metadata = {
  title: "Nettsider for alle bransjer — skreddersydd for din bedrift",
  description:
    "IDweb lager skreddersydde nettsider for alle bransjer — fra tannleger og elektrikere til advokater og restauranter. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  alternates: {
    canonical: "/nettside",
  },
  openGraph: {
    title: "Nettsider for alle bransjer — skreddersydd for din bedrift",
    description:
      "Skreddersydde nettsider tilpasset din bransje. Faste priser, ingen bindingstid.",
    type: "website",
    locale: "nb_NO",
    siteName: "IDweb",
    url: "https://www.idweb.no/nettside",
  },
};

export default function IndustriesHubPage() {
  return (
    <div className="bg-[var(--color-dark-bg)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Nettsider for bransjer", href: "/nettside" },
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
            Nettsider · Alle bransjer
          </p>

          <h1 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Skreddersydd nettside
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              for{" "}
              <span className="relative inline-block">
                din bransje
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h1>

          <p className="mt-9 max-w-[60ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Vi lager nettsider for bedrifter i alle bransjer. Hver side bygges fra
            bunnen av og tilpasses akkurat det din bransje trenger for å skaffe
            flere kunder — enten det er online booking, tilbudsskjema eller lokal
            synlighet i Google.
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

      {/* Industry grid */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pb-24 sm:pb-32">
        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((industry) => (
              <Link
                key={industry.id}
                href={`/nettside/${industry.id}`}
                className="group relative flex flex-col bg-[var(--color-dark-bg)] p-7 transition-colors duration-200 hover:bg-white/[0.03] sm:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
                  {industry.categoryTag}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-[1.7rem]">
                  {industry.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                  {industry.shortDescription}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70 transition-colors duration-150 group-hover:text-[#F4CE14]">
                  Se løsningen
                  <ArrowUpRight
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            ))}

            {/* "Don't see your industry" — reinforces we serve everyone */}
            <div className="flex flex-col justify-center bg-[var(--color-dark-bg)] p-7 sm:p-8">
              <h2 className="font-serif text-2xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-[1.7rem]">
                Ser du ikke din bransje?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Vi lager nettsider for alle typer bedrifter. Si fra hva du driver
                med, så foreslår vi en løsning som passer akkurat deg.
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
