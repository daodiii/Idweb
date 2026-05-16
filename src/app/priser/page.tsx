import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import {
  PACKAGES,
  MAINTENANCE_PACKAGES,
  ADDON_SERVICES,
  NETTSIDE_DRIFT,
  PRICING_FAQ,
  PRICING_CTA,
} from "@/lib/content/pricing";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { PricingFaqAccordion } from "@/components/sections/pricing-faq-accordion";
import { SeoPricingSection } from "@/components/sections/seo-pricing-section";

const EASE_STR = "cubic-bezier(0.23,1,0.32,1)";

export const metadata: Metadata = {
  title: "Priser — Nettsider, vedlikehold og SEO",
  description:
    "Se våre faste priser for nettsider, vedlikehold, SEO og tilleggstjenester. Ingen bindingstid, ingen skjulte kostnader. Fra kr 15 000. Få et skreddersydd tilbud.",
  keywords: [
    "nettside pris",
    "hva koster nettside",
    "webdesign pris",
    "seo pris",
    "nettside pris oslo",
    "vedlikehold pris",
    "billig nettside norge",
    "nettside kostnad",
    "pris hjemmeside bedrift",
    "webdesign pris norge",
  ],
  alternates: {
    canonical: "/priser",
  },
};

function PackageCard({
  name,
  price,
  monthly,
  description,
  features,
  highlight,
  cta,
}: {
  name: string;
  price: string;
  monthly?: string;
  description: string;
  features: readonly string[];
  highlight: boolean;
  cta: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-3xl border p-8 transition-transform duration-200 ${
        highlight
          ? "border-[#F4CE14]/35 bg-[rgba(244,206,20,0.035)] shadow-[0_30px_60px_-30px_rgba(244,206,20,0.18)] md:-translate-y-3"
          : "border-white/[0.07] bg-white/[0.015]"
      }`}
      style={{ transitionTimingFunction: EASE_STR }}
    >
      {highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F4CE14] px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a]">
          Mest populær
        </span>
      )}

      <p
        className={`font-mono text-xs uppercase tracking-[0.22em] ${
          highlight ? "text-[#F4CE14]" : "text-white/45"
        }`}
      >
        {name}
      </p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] font-black leading-none tracking-tight text-white tabular-nums">
          {price}
        </span>
      </div>

      {monthly ? (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
          + {monthly} vedlikehold
        </p>
      ) : null}

      <p className="mt-5 text-sm leading-relaxed text-white/65">
        {description}
      </p>

      <ul className="mt-8 flex-1 space-y-3 border-t border-white/[0.06] pt-6">
        {features.map((feat) => (
          <li
            key={feat}
            className="flex items-start gap-3 text-sm leading-relaxed text-white/70"
          >
            <span
              aria-hidden
              className={`mt-2 inline-block h-1 w-1 flex-shrink-0 rounded-full ${
                highlight ? "bg-[#F4CE14]" : "bg-white/35"
              }`}
            />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/kontakt"
        className={`group mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-[transform,background-color,border-color,color] duration-150 active:scale-[0.97] ${
          highlight
            ? "bg-[#F4CE14] text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] hover:bg-[#FFE15D]"
            : "border border-white/15 text-white/85 hover:border-white/30 hover:bg-white/[0.04] hover:text-white"
        }`}
        style={{ transitionTimingFunction: EASE_STR }}
      >
        {cta}
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ transitionTimingFunction: EASE_STR }}
        />
      </Link>
    </div>
  );
}

export default function PriserPage() {
  return (
    <div className="bg-[var(--color-dark-bg)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Priser", href: "/priser" },
        ]}
      />
      <FaqJsonLd faqs={PRICING_FAQ} />

      {/* ============================================================
          HERO — asymmetric editorial
         ============================================================ */}
      <section className="relative flex min-h-[80dvh] w-full items-center overflow-hidden bg-[var(--color-dark-bg)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 82% 22%, rgba(244,206,20,0.16), transparent 62%)",
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
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 py-28 lg:grid-cols-12 lg:gap-8 lg:py-32">
          <div className="col-span-1 flex flex-col lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Priser · IDweb
            </p>

            <h1 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Faste priser,
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  ærlig
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>{" "}
                regning.
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Ingen overraskelser.
              </span>
            </h1>

            <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Her er hva ting koster — nettside, vedlikehold, SEO og tillegg.
              Alle priser er veiledende. Trenger du noe utenfor pakkene, lager
              vi et tilbud som passer.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="#pakker"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white active:scale-[0.97]"
                style={{ transitionTimingFunction: EASE_STR }}
              >
                Se pakkene
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ transitionTimingFunction: EASE_STR }}
                />
              </Link>
            </div>
          </div>

          {/* Decorative right column — meta info, hidden on mobile */}
          <div className="relative col-span-1 hidden lg:col-span-4 lg:flex lg:flex-col lg:justify-center lg:gap-6">
            <div className="rounded-2xl border border-white/[0.08] bg-[rgba(20,20,22,0.88)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-22px_rgba(0,0,0,0.7)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                Fra
              </p>
              <p className="mt-2 font-serif text-3xl font-black leading-none tracking-tight text-white">
                15 000 <span className="text-[#F4CE14]">kr</span>
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Ferdig nettside
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-[rgba(20,20,22,0.88)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-22px_rgba(0,0,0,0.7)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                Eller fra
              </p>
              <p className="mt-2 font-serif text-3xl font-black leading-none tracking-tight text-white">
                890 <span className="text-[#F4CE14]">kr/mnd</span>
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Abonnement, alt inkludert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PACKAGES — pricing-preview pattern
         ============================================================ */}
      <section
        id="pakker"
        className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 12% 18%, rgba(244,206,20,0.12), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Bygg ny nettside
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            </p>

            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Tre pakker,
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  ett
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>{" "}
                resultat.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-white/65 sm:text-lg">
              En nettside som ser bra ut, lastes raskt og blir funnet på Google.
              Velg startpunkt — vi skreddersyr resten.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:mt-20">
            {PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.id}
                name={pkg.name}
                price={pkg.price}
                monthly={pkg.monthly}
                description={pkg.description}
                features={pkg.features}
                highlight={pkg.highlight}
                cta="Få tilbud"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          NETTSIDE + DRIFT — editorial split
         ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 92% 32%, rgba(244,206,20,0.14), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
                <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
                Abonnement
              </p>

              <h2 className="mt-7 font-serif text-white">
                <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                  Nettside +
                </span>
                <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                  <span className="relative inline-block">
                    drift
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                    />
                  </span>
                  .
                </span>
              </h2>

              <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
                {NETTSIDE_DRIFT.description}
              </p>

              <div className="mt-10 flex items-baseline gap-3">
                <span className="font-serif text-[clamp(3rem,7vw,5rem)] font-black leading-none tracking-tight text-white tabular-nums">
                  {NETTSIDE_DRIFT.price}
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                Bindingstid {NETTSIDE_DRIFT.minMonths} måneder
              </p>

              <div className="mt-10">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
                  style={{ transitionTimingFunction: EASE_STR }}
                >
                  Start i dag
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ transitionTimingFunction: EASE_STR }}
                  />
                </Link>
              </div>

              <p className="mt-6 max-w-[55ch] font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                {NETTSIDE_DRIFT.note}
              </p>
            </div>

            <div className="lg:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">
                Inkludert i pakken
              </p>
              <ul className="mt-2">
                {NETTSIDE_DRIFT.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-4 border-t border-white/[0.08] py-5"
                  >
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F4CE14]"
                    />
                    <span className="text-sm leading-relaxed text-white/75 sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SEO PACKAGES — client component with billing toggle
         ============================================================ */}
      <SeoPricingSection />

      {/* ============================================================
          MAINTENANCE PACKAGES — pricing-preview pattern
         ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 8% 82%, rgba(244,206,20,0.12), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Vedlikehold
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            </p>

            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Pass på siden,
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  uten
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>{" "}
                styr.
              </span>
            </h2>

            <p className="mx-auto mt-7 max-w-[52ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Har du allerede en nettside? Vi holder den oppdatert, sikker og
              rask — så du kan fokusere på bedriften.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:mt-20">
            {MAINTENANCE_PACKAGES.map((pkg) => (
              <PackageCard
                key={pkg.id}
                name={pkg.name}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                highlight={pkg.highlight}
                cta="Kom i gang"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          ADD-ON SERVICES — editorial list (border-t dividers)
         ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 78% 88%, rgba(244,206,20,0.13), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Tillegg
            </p>

            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Plukk det
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  som
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>{" "}
                trengs.
              </span>
            </h2>

            <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Utvid en pakke med tjenester som gir nettsiden ekstra slagkraft.
            </p>
          </div>

          <div className="mt-14 lg:mt-20">
            <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">
                Tjeneste
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">
                Pris
              </p>
            </div>
            {ADDON_SERVICES.map((service, i) => (
              <div
                key={service.name}
                className="grid grid-cols-1 gap-3 border-t border-white/[0.06] py-6 lg:grid-cols-12 lg:gap-8 lg:py-8"
              >
                <div className="flex items-baseline gap-4 lg:col-span-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="lg:col-span-7">
                  <h3 className="font-serif text-lg font-bold tracking-[-0.005em] text-white sm:text-xl">
                    {service.name}
                  </h3>
                  <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-white/65">
                    {service.description}
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <span className="font-serif text-2xl font-black leading-none tracking-tight text-[#F4CE14] tabular-nums sm:text-3xl">
                    {service.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PRICING FAQ
         ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 18% 22%, rgba(244,206,20,0.12), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              FAQ
            </p>
            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Spørsmål om
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  priser
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
                .
              </span>
            </h2>
          </div>

          <PricingFaqAccordion />
        </div>
      </section>

      {/* ============================================================
          FINAL CTA — yellow editorial block
         ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-accent)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10,10,10,0.55) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 12% 110%, rgba(10,10,10,0.16), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 45% at 92% -10%, rgba(255,255,255,0.22), transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#0a0a0a]/65">
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
            Få et tilbud
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
          </p>

          <h2 className="mt-7 font-serif text-[#0a0a0a]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[#0a0a0a]/75">
              Usikker på hvilken
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              pakke som{" "}
              <span className="relative inline-block">
                passer
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#0a0a0a]"
                />
              </span>
              ?
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[58ch] text-base leading-relaxed text-[#0a0a0a]/75 sm:text-lg">
            {PRICING_CTA.description}
          </p>

          <div className="mt-10 flex justify-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-7 py-4 text-sm font-bold text-[#fafaf9] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-[transform,background-color] duration-150 hover:bg-[#1a1a1a] active:scale-[0.97]"
              style={{ transitionTimingFunction: EASE_STR }}
            >
              {PRICING_CTA.buttonText}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: EASE_STR }}
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
