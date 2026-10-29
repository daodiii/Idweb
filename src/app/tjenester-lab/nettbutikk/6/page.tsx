import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { DashboardAnnotated } from "@/components/tjenester-lab/dashboard-annotated";
import { UiChecklist, UiCheckout, UiOrders, UiPhone, UiProductPage, UiSentMail, UiShipping } from "@/components/tjenester-lab/shop-ui";
import { FAQS, PROMISES, RELATED } from "@/components/tjenester-lab/nettbutikk-content";

export const metadata: Metadata = { title: "Nettbutikk, mockup 6: Kontrollpanelet", robots: { index: false, follow: false } };

const PATH = [
  ["Kunden finner varen", "Hver vare har sin egen side, med bilde, pris og hvor mange som er igjen."],
  ["Kunden betaler", "Få steg fra handlekurv til betalt, og fraktprisen vises før betaling."],
  ["Kunden får beskjed", "Når dere har sendt ordren, får kunden en e-post."],
] as const;

/** Mockup 6 «Kontrollpanelet»: the shop's admin on one screen with four numbered places, then the customer's path and what we set up. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap nbm6-hero">
          <div>
            <Crumbs current="Nettbutikk" />
            <h1 id="sp-h1">
              Fra hylla til <Marker>nettbutikken</Marker>.
            </h1>
            <p className="sp-lede">
              Vi lager nettbutikken for bedriften deres, skreddersydd på samme måte som nettsidene våre. Når dere har noe nytt å selge, legger dere det inn selv, og det ligger i butikken med en gang.
            </p>
            <ul className="nbm3-promises">
              {PROMISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="nbm6-vis">
            <div className="nbm6-orders">
              <UiOrders compact />
            </div>
            <div className="nbm6-phone">
              <UiPhone>
                <UiProductPage />
              </UiPhone>
            </div>
          </div>
        </div>
      </section>

      <section className="nbm6-panel" aria-labelledby="nb-panel">
        <div className="wrap">
          <SecHead id="nb-panel" title={<>Dere driver butikken fra <Marker>ett</Marker> sted.</>} lede="Dere trenger ikke kunne noe om kode. Velg et av de fire stedene for å se hva det er til." />
          <DashboardAnnotated />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="nb-kunden">
        <div className="wrap">
          <SecHead id="nb-kunden" title={<>Slik handler <Marker>kunden</Marker>.</>} lede="På mobilen eller PC, uten å måtte lage bruker først." />
          <RevealOnView className="sps-track nbm6-path">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {PATH.map(([h, p], i) => (
                <li key={h} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="nbm6-card sps-art">
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

      <section className="nbm6-field" aria-labelledby="nb-vi">
        <div className="wrap">
          <SecHead id="nb-vi" title={<>Vi setter opp alt <Marker>før</Marker> dere åpner.</>} lede="Dere velger fraktvalgene, vi setter opp betalingen, og vi tester et helt kjøp fra handlekurv til bekreftelse på e-post." />
          <div className="nbm6-two">
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
