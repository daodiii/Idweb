import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SEO } from "@/lib/content/seo";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
  alternates: {
    canonical: "/tjenester",
  },
};

const SERVICES = [
  {
    slug: "webutvikler-oslo",
    title: "Webutvikler i Oslo",
    description:
      "Lokal webutvikler i Oslo som lager raske, skreddersydde nettsider for bedrifter i hovedstaden.",
    features: ["Heldigital prosess", "Skreddersydd Next.js", "Lokal SEO", "Direkte med utvikleren"],
  },
  {
    slug: "nettside",
    title: "Skreddersydd nettside",
    description:
      "Profesjonell, mobiloptimalisert nettside designet for å tiltrekke kunder og styrke merkevaren din.",
    features: ["Responsivt design", "SEO-optimalisert", "Rask lastetid", "SSL-sertifikat"],
  },
  {
    slug: "nettbutikk",
    title: "Nettbutikk-utvikling",
    description:
      "Skreddersydde nettbutikker med Vipps og Stripe — lynraske, mobilvennlige og bygget for konvertering.",
    features: ["Vipps + Stripe", "Under 2 sek lastetid", "Mobil-først kasse", "SEO på produktsider"],
  },
  {
    slug: "seo",
    title: "SEO-optimalisering",
    description:
      "Bli synlig i Google og tiltrekk flere kunder med profesjonell søkemotoroptimalisering.",
    features: ["Teknisk SEO", "Innholdsoptimalisering", "Lokal SEO", "Månedlig rapportering"],
  },
  {
    slug: "vedlikehold",
    title: "Drift og vedlikehold",
    description:
      "Hold nettsiden din trygg, rask og oppdatert med pålitelig norsk hosting og support.",
    features: ["Sikkerhetskopier", "Oppdateringer", "Norsk hosting", "Prioritert support"],
  },
];

export default function TjenesterPage() {
  return (
    <div className="bg-[var(--color-dark-bg)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester" },
        ]}
      />

      {/* Hero — asymmetric editorial */}
      <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[var(--color-dark-bg)]">
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

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 py-28 lg:grid-cols-12 lg:gap-8 lg:py-0">
          <div className="col-span-1 flex flex-col lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Tjenester · Oslo
            </p>

            <h1 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Alt du trenger
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                for å{" "}
                <span className="relative inline-block">
                  lykkes
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                på nett.
              </span>
            </h1>

            <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Fra design og utvikling til SEO og vedlikehold, vi tar oss av hele
              prosessen slik at du kan fokusere på det du gjør best.
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
            </div>
          </div>

          <div className="relative col-span-1 hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
            <span
              aria-hidden
              className="select-none font-serif text-[14rem] font-black leading-none tracking-tighter text-white/[0.03]"
            >
              05
            </span>
          </div>
        </div>
      </section>

      {/* Services — 2-column zig-zag */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 12% 50%, rgba(244,206,20,0.11), transparent 62%)",
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
              Hva vi leverer
            </p>

            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Fem tjenester,
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                ett{" "}
                <span className="relative inline-block">
                  team
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
                .
              </span>
            </h2>

            <p className="mt-8 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Du snakker direkte med utvikleren. Ingen mellomledd, ingen
              hvitkalking, ingen overraskelser i sluttregningen.
            </p>
          </div>

          <div className="mt-20 flex flex-col gap-24 lg:mt-28 lg:gap-32">
            {SERVICES.map((service, i) => {
              const number = String(i + 1).padStart(2, "0");
              const isReversed = i % 2 === 1;
              return (
                <article
                  key={service.slug}
                  className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-16"
                >
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
                      <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
                      {number} / {service.title.split(" ")[0]}
                    </p>

                    <h3 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3.25rem)] font-black leading-[0.98] tracking-[-0.025em] text-white">
                      {service.title}
                    </h3>

                    <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/65 sm:text-lg">
                      {service.description}
                    </p>

                    <Link
                      href={`/tjenester/${service.slug}`}
                      className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white/70 transition-colors duration-150 hover:text-[#F4CE14]"
                      style={{ transitionTimingFunction: ENTRY_EASE }}
                    >
                      Les mer om {service.title.toLowerCase()}
                      <ArrowUpRight
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ transitionTimingFunction: ENTRY_EASE }}
                      />
                    </Link>
                  </div>

                  <div
                    className={`lg:col-span-7 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-10 right-0 select-none font-serif text-[8rem] font-black leading-none tracking-tighter text-white/[0.025] sm:text-[10rem]"
                      >
                        {number}
                      </span>
                      <ul className="relative">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-4 border-t border-white/[0.06] py-5"
                          >
                            <span
                              aria-hidden
                              className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F4CE14]"
                            />
                            <span className="text-base text-white/80 sm:text-lg">
                              {feature}
                            </span>
                          </li>
                        ))}
                        <li className="border-t border-white/[0.06]" aria-hidden />
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 8% 88%, rgba(244,206,20,0.14), transparent 62%)",
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

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Usikker på hva du trenger?
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Vi finner ut av det
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                sammen
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>

          <p className="mx-auto mt-7 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
            Fortell oss kort hva du driver med, så foreslår vi en plan som
            passer budsjettet og målene dine.
          </p>

          <div className="mt-10 flex justify-center">
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
          </div>
        </div>
      </section>
    </div>
  );
}
