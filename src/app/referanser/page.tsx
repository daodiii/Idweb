import Link from "next/link";
import type { Metadata } from "next";
import {
  PORTFOLIO_PAGE,
  PROJECTS,
  PORTFOLIO_CTA,
} from "@/lib/content/portfolio";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import Image from "next/image";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { AuroraBackground } from "@/components/ui/aurora-background";
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

export default function ReferanserPage() {
  return (
    <div className="text-[var(--color-dark-text)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Referanser", href: "/referanser" },
        ]}
      />
      {/* Hero */}
      <AuroraBackground variant="top-center" intensity={0.12} className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {PORTFOLIO_PAGE.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-dark-muted)]">
            {PORTFOLIO_PAGE.subheadline}
          </p>
        </div>
      </AuroraBackground>

      {/* Projects */}
      {PROJECTS.map((project, index) => {
        const variants: Array<"top-left" | "top-right" | "bottom-left" | "bottom-right"> = [
          "top-right", "bottom-left", "top-left", "bottom-right",
        ];
        const site = getSiteById(project.id as PortfolioSiteId);
        const showcaseImages = site?.images.showcase ?? [];
        const heroImage = site?.images.heroImage ?? site?.images.full;

        return (
          <AuroraBackground
            key={project.id}
            variant={variants[index % variants.length]}
            intensity={0.16}
            showStarfield={index === 0}
            className={`px-4 sm:px-6 ${index === 0 ? "pt-6 pb-6 sm:pt-8 sm:pb-10" : index === PROJECTS.length - 1 ? "pt-6 pb-16 sm:pt-10 sm:pb-24" : "py-6 sm:py-10"}`}
          >
            <div className="mx-auto max-w-6xl">
              {/* Project header — industry tag + title */}
              <div className="mb-4 sm:mb-8">
                <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-accent)]">
                  {project.industry}
                </p>
                <h2 className="mt-1 text-2xl font-bold sm:mt-2 sm:text-4xl">{project.title}</h2>
                <p className="mt-0.5 text-base text-[var(--color-dark-muted)] sm:mt-1 sm:text-lg">
                  {project.client}
                </p>
              </div>

              {/* Large hero screenshot — full width */}
              {heroImage && (
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
                  <Image
                    src={heroImage}
                    alt={`Fullside skjermbilde av ${site?.name ?? project.client}`}
                    width={1440}
                    height={900}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 1152px"
                    priority={index === 0}
                  />
                </div>
              )}

              {/* Supporting screenshots — horizontal scroll on mobile, adaptive grid on desktop */}
              {showcaseImages.length > 0 && (
                <div className={`mt-4 flex gap-2 overflow-x-auto pb-2 sm:mt-6 sm:gap-4 sm:grid sm:overflow-visible sm:pb-0 ${
                  showcaseImages.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
                }`}>
                  {showcaseImages.map((src, i) => (
                    <div
                      key={src}
                      className="min-w-[38%] flex-shrink-0 overflow-hidden rounded-lg border border-white/10 shadow-lg shadow-black/25 sm:min-w-0 sm:rounded-xl"
                    >
                      <Image
                        src={src}
                        alt={`${site?.name ?? project.client} — skjermbilde ${i + 1}`}
                        width={960}
                        height={600}
                        className="h-auto w-full object-cover"
                        sizes={showcaseImages.length === 4 ? "(max-width: 640px) 38vw, 25vw" : "(max-width: 640px) 38vw, 33vw"}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Project details — description + wide Tjenester/Resultater box */}
              <div className="mt-4 sm:mt-6">
                <p className="text-base leading-relaxed text-[var(--color-dark-muted)] sm:text-lg">
                  {project.description}
                </p>

                {/* Wide glass box — Tjenester left, Resultater right */}
                <div className="mt-4 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/25 backdrop-blur-md sm:mt-5 sm:gap-6 sm:rounded-2xl sm:p-6">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dark-text)] sm:text-sm">
                      Tjenester
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-xs text-[var(--color-dark-muted)] backdrop-blur-sm sm:px-3 sm:py-1 sm:text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-dark-text)] sm:text-sm">
                      Resultater
                    </h3>
                    <ul className="mt-2 space-y-1.5 sm:mt-3 sm:space-y-2">
                      {project.results.map((result) => (
                        <li
                          key={result}
                          className="flex items-start gap-1.5 text-xs text-[var(--color-dark-muted)] sm:gap-2 sm:text-sm"
                        >
                          <span className="mt-0.5 text-[var(--color-accent)]">&#10003;</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Divider between projects */}
              {index < PROJECTS.length - 1 && (
                <div className="mt-6 border-t border-white/[0.06] sm:mt-10" />
              )}
            </div>
          </AuroraBackground>
        );
      })}

      {/* CTA */}
      <AuroraBackground variant="bottom-center" intensity={0.12} className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">{PORTFOLIO_CTA.headline}</h2>
          <p className="mt-4 text-lg text-[var(--color-dark-muted)]">
            {PORTFOLIO_CTA.description}
          </p>
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 text-lg font-semibold text-black`}
          >
            {PORTFOLIO_CTA.buttonText}
          </Link>
        </div>
      </AuroraBackground>
    </div>
  );
}
