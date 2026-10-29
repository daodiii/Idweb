import Link from "next/link";
import type { CSSProperties } from "react";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { DashboardAnnotated } from "@/components/tjenester/dashboard-annotated";
import { FAQS, PROMISES, RELATED } from "@/components/tjenester/nettbutikk-content";
import { SERVICE_PAGES } from "@/components/tjenester/pages";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { UiChecklist, UiCheckout, UiOrders, UiProductPage, UiSentMail, UiShipping, UiStock } from "@/components/tjenester/shop-ui";

const PATH = [
  ["Kunden finner varen", "Hver vare har sin egen side, med bilde, pris og hvor mange som er igjen."],
  ["Kunden betaler", "Få steg fra handlekurv til betalt, og fraktprisen vises før betaling."],
  ["Kunden får beskjed", "Når dere har sendt ordren, får kunden en e-post."],
] as const;

/**
 * «Nettbutikk» in the calm system. The hero shows the shop's orders and stock; below it the admin on one screen with four numbered
 * places, the customer's path on the orange stroke, and what we set up. The screens are drawn and neutral: no photos, no made-up
 * shop, and no «what is not included» section on the service pages.
 */
export function NettbutikkPage() {
  const meta = SERVICE_PAGES.nettbutikk;
  return (
    <ServiceShell>
      <ServiceJsonLd name={meta.name} description={meta.description} slug="nettbutikk" />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester" },
          { name: meta.name, href: "/tjenester/nettbutikk" },
        ]}
      />
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap nbp-hero">
          <div>
            <Crumbs current="Nettbutikk" />
            <h1 id="sp-h1">
              Fra hylla til <Marker>nettbutikken</Marker>.
            </h1>
            <p className="sp-lede">
              Vi lager nettbutikken for bedriften deres, skreddersydd på samme måte som nettsidene våre. Når dere har noe nytt å selge, legger dere det inn selv, og det ligger i butikken med en gang.
            </p>
            <ul className="nbp-promises">
              {PROMISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="nbp-field">
            <UiOrders compact />
            <UiStock />
          </div>
        </div>
      </section>

      <section className="nbp-panel" aria-labelledby="nb-panel">
        <div className="wrap">
          <SecHead id="nb-panel" title={<>Dere driver butikken fra <Marker>ett</Marker> sted.</>} lede="Dere trenger ikke kunne noe om kode. Velg et av de fire stedene for å se hva det er til." />
          <DashboardAnnotated />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="nb-kunden">
        <div className="wrap">
          <SecHead id="nb-kunden" title={<>Slik handler <Marker>kunden</Marker>.</>} lede="På mobilen eller PC, uten å måtte lage bruker først." />
          <RevealOnView className="sps-track nbp-path">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {PATH.map(([h, p], i) => (
                <li key={h} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="nbp-card sps-art">
                    {i === 0 && <UiProductPage />}
                    {i === 1 && <UiCheckout />}
                    {i === 2 && <UiSentMail />}
                  </div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="nbp-soft" aria-labelledby="nb-vi">
        <div className="wrap">
          <SecHead id="nb-vi" title={<>Vi setter opp alt <Marker>før</Marker> dere åpner.</>} lede="Dere velger fraktvalgene, vi setter opp betalingen, og vi tester et helt kjøp fra handlekurv til bekreftelse på e-post." />
          <div className="nbp-two">
            <UiShipping />
            <UiChecklist />
          </div>
        </div>
      </section>

      <section className="tbp-fact" aria-label="Utsolgt">
        <div className="wrap">
          <p>
            Utsolgte varer blir <Marker>merket</Marker> med en gang.
          </p>
          <span>Butikken viser hvor mange som er igjen av hver, og merker varen som utsolgt når den siste er solgt.</span>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-label="Det som hører til">
        <div className="wrap nb-rel">
          {RELATED.map(([h, p, href, link]) => (
            <div key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
              <Link className="wk-link" href={href}>
                {link}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="nb-faq">
        <div className="wrap sp-split">
          <SecHead id="nb-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
