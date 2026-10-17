import Image from "next/image";
import type { Metadata } from "next";
import { PORTFOLIO_PAGE, PROJECTS, PORTFOLIO_CTA } from "@/lib/content/portfolio";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { PageHead } from "@/components/klar/page-head";
import { CtaCard } from "@/components/klar/cta-card";
import { Tick } from "@/components/klar/tick";
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

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Referanser", href: "/referanser" },
];

export default function ReferanserPage() {
  return (
    <div className="ka">
      <BreadcrumbJsonLd items={CRUMBS} />

      <PageHead crumbs={CRUMBS} title="Prosjekter vi har bygget for norske bedrifter." lede={PORTFOLIO_PAGE.subheadline} />

      {PROJECTS.map((project, index) => {
        const site = getSiteById(project.id as PortfolioSiteId);
        const heroImage = site?.images.heroImage ?? site?.images.full;
        const showcase = site?.images.showcase ?? [];
        const name = site?.name ?? project.client;
        return (
          <section key={project.id} id={project.id} className={`sec${index % 2 ? " alt" : ""}`} aria-labelledby={`p-${project.id}`}>
            <div className="wrap">
              <div className={`proj${index % 2 ? " flip" : ""}`}>
                {heroImage && (
                  <div className="proj-shot">
                    <Image
                      src={heroImage}
                      alt={`Fullside skjermbilde av ${name}`}
                      fill
                      sizes="(max-width: 900px) 100vw, 640px"
                      priority={index === 0}
                    />
                  </div>
                )}
                <div className="proj-text">
                  <h2 id={`p-${project.id}`}>{project.title}</h2>
                  <p className="who">
                    <b>{project.client}</b> · {project.industry}
                  </p>
                  <p>{project.description}</p>
                  <p className="label">Tjenester</p>
                  <ul className="chiplist">
                    {project.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <p className="label">Resultater</p>
                  <ul className="ticks">
                    {project.results.map((r) => (
                      <li key={r}>
                        <Tick />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {showcase.length > 0 && (
                <ul className="thumbs" aria-label={`Flere skjermbilder fra ${name}`}>
                  {showcase.map((src, i) => (
                    <li key={src}>
                      <Image src={src} alt={`${name} — skjermbilde ${i + 1}`} fill sizes="(max-width: 560px) 33vw, (max-width: 900px) 25vw, 190px" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      <CtaCard title={PORTFOLIO_CTA.headline} text={PORTFOLIO_CTA.description} button={PORTFOLIO_CTA.buttonText} />
    </div>
  );
}
