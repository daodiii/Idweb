import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import {
  PORTFOLIO_PAGE,
  PROJECTS,
  PORTFOLIO_CTA,
} from "@/lib/content/portfolio";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import type { PortfolioSiteId } from "@/types";

export const metadata: Metadata = {
  title: "Referanser — Se nettsidene vi har levert",
  description:
    "Se utvalgte prosjekter vi har levert til norske bedrifter. Skreddersydde nettsider, nettbutikker og digitale løsninger med målbare resultater.",
  keywords: [
    "webdesign referanser",
    "nettside portefølje",
    "webdesign eksempler",
    "nettside prosjekter oslo",
  ],
  alternates: {
    canonical: "/referanser",
  },
};

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

// Vary the spotlight corner per project section so the rhythm isn't mechanical.
const SPOTLIGHT_POSITIONS = [
  "82% 22%",
  "12% 18%",
  "92% 78%",
  "8% 88%",
  "50% 10%",
];

export default function ReferanserPage() {
  return (
    <div className="bg-[var(--color-dark-bg)] text-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Referanser", href: "/referanser" },
        ]}
      />

      {/* Hero — asymmetric editorial */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 82% 22%, rgba(244,206,20,0.16), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 flex flex-col lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Portefølje · IDweb
            </p>

            <h1 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Prosjekter vi
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  har bygget
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                for norske bedrifter.
              </span>
            </h1>

            <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
              {PORTFOLIO_PAGE.subheadline}
            </p>
          </div>

          <div className="relative col-span-1 hidden lg:col-span-4 lg:flex lg:items-end lg:justify-end">
            <span
              aria-hidden
              className="select-none font-serif text-[clamp(8rem,14vw,13rem)] font-black leading-none tracking-tighter text-white/[0.04]"
            >
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </section>

      {/* Projects — zig-zag editorial loop */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pb-24 sm:pb-32 lg:pb-40">
        <div className="relative mx-auto max-w-6xl">
          <ol className="space-y-24 lg:space-y-32">
            {PROJECTS.map((project, index) => {
              const site = getSiteById(project.id as PortfolioSiteId);
              const showcaseImages = site?.images.showcase ?? [];
              const heroImage = site?.images.heroImage ?? site?.images.full;
              const reversed = index % 2 === 1;
              const spotlight =
                SPOTLIGHT_POSITIONS[index % SPOTLIGHT_POSITIONS.length];

              return (
                <li key={project.id} className="relative">
                  {/* Per-project spotlight to vary rhythm */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                      background: `radial-gradient(ellipse 55% 45% at ${spotlight}, rgba(244,206,20,0.09), transparent 62%)`,
                    }}
                  />

                  <div
                    className={`flex flex-col gap-10 lg:items-center lg:gap-16 ${
                      reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                    }`}
                  >
                    {/* Text column */}
                    <div className="flex-1">
                      <div className="flex items-baseline gap-5">
                        <span
                          className="select-none font-serif font-black leading-none tracking-tighter text-[#F4CE14]/25"
                          style={{ fontSize: "clamp(3.5rem, 7vw, 6rem)" }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          aria-hidden
                          className="inline-block h-px w-12 bg-[#F4CE14]/40"
                        />
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
                          {project.industry}
                        </span>
                      </div>

                      <h2
                        className="mt-6 font-serif font-black leading-[1.02] tracking-[-0.025em] text-white"
                        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                      >
                        {project.title}
                      </h2>

                      <p className="mt-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
                        {project.client}
                      </p>

                      <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-white/65 sm:text-lg">
                        {project.description}
                      </p>

                      {/* Tjenester — mono pills with thin borders */}
                      <div className="mt-8 border-t border-white/[0.06] pt-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                          Tjenester
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.services.map((service) => (
                            <span
                              key={service}
                              className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/75"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Resultater — border-t list with yellow dot bullets */}
                      <div className="mt-6 border-t border-white/[0.06] pt-6">
                        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                          Resultater
                        </p>
                        <ul className="mt-2">
                          {project.results.map((result) => (
                            <li
                              key={result}
                              className="flex items-start gap-3 border-t border-white/[0.06] py-3 first:border-t-0 first:pt-3"
                            >
                              <span
                                aria-hidden
                                className="mt-[0.55rem] inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F4CE14]"
                              />
                              <span className="text-sm leading-relaxed text-white/75 sm:text-base">
                                {result}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Visual column */}
                    <div className="flex-1">
                      {heroImage && (
                        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)]">
                          <Image
                            src={heroImage}
                            alt={`Fullside skjermbilde av ${site?.name ?? project.client}`}
                            width={1440}
                            height={900}
                            className="h-auto w-full object-cover"
                            sizes="(max-width: 1024px) 100vw, 576px"
                            priority={index === 0}
                          />
                          <div
                            aria-hidden
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(10,10,10,0.0) 0%, rgba(10,10,10,0.15) 100%)",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Showcase strip — horizontal scroll on mobile, asymmetric grid on desktop */}
                  {showcaseImages.length > 0 && (
                    <div className="mt-10 lg:mt-14">
                      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                        Skjermbilder
                      </p>
                      <div
                        className={`flex gap-3 overflow-x-auto pb-2 sm:gap-4 sm:grid sm:overflow-visible sm:pb-0 ${
                          showcaseImages.length === 4
                            ? "sm:grid-cols-4"
                            : "sm:grid-cols-3"
                        }`}
                      >
                        {showcaseImages.map((src, i) => (
                          <div
                            key={src}
                            className="min-w-[60%] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.06] sm:min-w-0"
                          >
                            <Image
                              src={src}
                              alt={`${site?.name ?? project.client} — skjermbilde ${i + 1}`}
                              width={960}
                              height={600}
                              className="h-auto w-full object-cover"
                              sizes={
                                showcaseImages.length === 4
                                  ? "(max-width: 640px) 60vw, 25vw"
                                  : "(max-width: 640px) 60vw, 33vw"
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Final CTA — editorial dark block with solid yellow primary */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-24 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 10%, rgba(244,206,20,0.14), transparent 62%)",
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

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Neste prosjekt
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
          </p>

          <h2 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.25rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Vil du ha en
            </span>
            <span className="block text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95] tracking-[-0.035em]">
              <span className="relative inline-block">
                nettside
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.25rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              du er fornøyd med?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
            {PORTFOLIO_CTA.description}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              {PORTFOLIO_CTA.buttonText}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              />
            </Link>
            <Link
              href="/priser"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Se hva som inngår
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
