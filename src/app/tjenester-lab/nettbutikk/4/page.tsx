import Link from "next/link";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { UiChecklist, UiCheckout, UiNewProduct, UiOrderDetail, UiOrders, UiPhone, UiProductPage, UiSentMail, UiShipping, UiStock } from "@/components/tjenester-lab/shop-ui";
import { FAQS, PROMISES, RELATED } from "@/components/tjenester-lab/nettbutikk-content";

export const metadata: Metadata = { title: "Nettbutikk, mockup 4: Dagen i butikken", robots: { index: false, follow: false } };

const ROWS: { n: string; t: ReactNode; p: string; pic: ReactNode; bg: string }[] = [
  { n: "01", t: <>Dere legger inn <Marker>varene</Marker> selv.</>, p: "Bilde, navn, pris og hvor mange dere har. Når dere trykker på knappen, ligger varen i butikken med en gang.", pic: <UiNewProduct />, bg: "#DFECE3" },
  { n: "02", t: <>Dere styrer <Marker>lageret</Marker>.</>, p: "Endre pris og antall når dere vil. Butikken viser hvor mange som er igjen av hver, og merker varen som utsolgt når den siste er solgt.", pic: <UiStock />, bg: "#DCE9F1" },
  { n: "03", t: <>Ordrene ligger <Marker>samlet</Marker> ett sted.</>, p: "Dere får beskjed om hver nye ordre. Alle ordrene ligger samlet, med hva kunden har kjøpt og hvilket fraktvalg de tok.", pic: <UiOrders />, bg: "#F4E1DF" },
  {
    n: "04",
    t: <>Dere pakker og <Marker>sender</Marker>.</>,
    p: "Merk ordren som sendt, så får kunden beskjed på e-post.",
    pic: (
      <div className="nbm4-pair">
        <UiOrderDetail />
        <UiSentMail />
      </div>
    ),
    bg: "#DCECE9",
  },
];

/** Mockup 4 «Dagen i butikken»: what the owner does, step by step, each with the screen it happens on. No pictures of any shop. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap nbm4-hero">
          <div>
            <Crumbs current="Nettbutikk" />
            <h1 id="sp-h1">
              Fra hylla til <Marker>nettbutikken</Marker>.
            </h1>
            <p className="sp-lede">
              Vi lager nettbutikken for bedriften deres, skreddersydd på samme måte som nettsidene våre. Når dere har noe nytt å selge, legger dere det inn selv, og det ligger i butikken med en gang.
            </p>
            <ul className="nbm1-promises">
              {PROMISES.map((p) => (
                <li key={p}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="nbm4-field">
            <UiOrders compact />
            <UiStock />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="nb-dag">
        <div className="wrap">
          <SecHead id="nb-dag" title={<>Slik driver dere <Marker>butikken</Marker>.</>} lede="Dere trenger ikke kunne noe om kode. Dette er hva dere gjør, og hva dere ser mens dere gjør det." />
          <ol className="nbm4-rows">
            {ROWS.map((r, i) => (
              <li key={r.n} className={i % 2 ? "flip" : undefined}>
                <div className="nbm4-text">
                  <span className="nbm4-num">{r.n}</span>
                  <h3>{r.t}</h3>
                  <p>{r.p}</p>
                </div>
                <div className="nbm4-pic" style={{ background: r.bg }}>
                  {r.pic}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="nb-kunden">
        <div className="wrap sp-split">
          <SecHead id="nb-kunden" title={<>Kunden handler på <Marker>mobilen</Marker>.</>} lede="Hver vare har sin egen side. Kassen har få steg fra handlekurv til betalt, og kunden ser fraktprisen før betaling." />
          <div className="nbm4-phones">
            <UiPhone>
              <UiProductPage />
            </UiPhone>
            <UiPhone>
              <UiCheckout />
            </UiPhone>
          </div>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="nb-vi">
        <div className="wrap">
          <SecHead id="nb-vi" title={<>Vi setter opp alt <Marker>før</Marker> dere åpner.</>} lede="Dere velger fraktvalgene, vi setter opp betalingen, og vi tester et helt kjøp fra handlekurv til bekreftelse på e-post." />
          <div className="nbm4-vi">
            <div>
              <UiShipping />
              <p>Dere velger hvilke fraktvalg kundene får, for eksempel sending i posten, henting hos dere eller fri frakt over et beløp.</p>
            </div>
            <div>
              <UiChecklist />
              <p>Vi lager butikken skreddersydd, setter opp betaling og frakt, og tester før lansering.</p>
            </div>
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
