import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { AdminCard, CheckoutCard, Credits, OrderCard, ProductCard, SentMail } from "@/components/tjenester-lab/shop-parts";
import { CREDITS, FAQS, RELATED, SHOPS, WE_DO, YOU_DO } from "@/components/tjenester-lab/nettbutikk-content";

export const metadata: Metadata = { title: "Nettbutikk, mockup 2: Veien til kassen", robots: { index: false, follow: false } };

const STORY = [
  ["Kunden finner varen", "Hver vare har sin egen side, med bilde, pris og hvor mange som er igjen."],
  ["Kunden handler", "Få steg fra handlekurv til betalt, med fraktvalget dere har satt opp."],
  ["Dere får ordren", "Alle ordrene ligger samlet ett sted, og dere får beskjed når en kommer inn."],
  ["Kunden får beskjed", "Dere merker ordren som sendt, og kunden får en e-post."],
] as const;

/** Mockup 2 «Veien til kassen»: one purchase told as a path of four moments, then the shop, the examples and who does what. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <Crumbs current="Nettbutikk" />
          <div className="nbm2-head">
            <h1 id="sp-h1">
              Fra hylla til <Marker>nettbutikken</Marker>.
            </h1>
            <div>
              <p className="sp-lede">Vi lager nettbutikken for bedriften deres, skreddersydd på samme måte som nettsidene våre. Betaling og frakt er på plass før dere åpner.</p>
              <div className="sp-acts">
                <BookButton />
              </div>
            </div>
          </div>
          <RevealOnView className="sps-track nbm2-story">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {STORY.map(([h, p], i) => (
                <li key={h} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="nbm2-card sps-art">
                    {i === 0 && <ProductCard />}
                    {i === 1 && <CheckoutCard />}
                    {i === 2 && <OrderCard />}
                    {i === 3 && <SentMail />}
                  </div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="nb-legg">
        <div className="wrap">
          <div className="tbp-band nbm2-band">
            <SecHead
              id="nb-legg"
              title={
                <>
                  Dere legger inn <Marker>varene</Marker> selv.
                </>
              }
              lede="Velg bilde, gi varen navn og pris, og si hvor mange dere har. Når dere trykker på knappen, ligger den i butikken."
            />
            <div className="tbp-band-pic">
              <AdminCard />
            </div>
          </div>
        </div>
      </section>

      <section className="sp-sec spn-row" aria-labelledby="nb-bygges">
        <div className="wrap">
          <SecHead
            id="nb-bygges"
            title={
              <>
                Butikken bygges rundt <Marker>varene</Marker>.
              </>
            }
            lede="En keramiker, et bakeri og en garnbutikk selger på helt ulike måter. Vi lager hver butikk selv, ut fra det dere selger og hvordan kundene deres handler."
          />
        </div>
        <div className="spn-track" tabIndex={0} role="group" aria-label="Tre eksempelbutikker, bla sideveis">
          {SHOPS.map((s) => (
            <figure key={s.id} className="sp-fig">
              <div className="nbm2-shop" style={{ background: s.bg }}>
                <Image src={s.img} alt={`${s.label}: eksempel på varebilde`} fill sizes="(max-width: 900px) 80vw, 40vw" />
              </div>
              <figcaption>
                {s.label} · {s.line}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="wrap">
          <Credits text={CREDITS} />
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="nb-driver">
        <div className="wrap">
          <SecHead id="nb-driver" title={<>Vi lager butikken, dere <Marker>driver</Marker> den.</>} lede="Dere får en butikk dere kan drive selv, uten å måtte kunne noe om kode." />
          <div className="nbm2-cols">
            <div>
              <h3>Det vi gjør</h3>
              <ul className="sp-list">
                {WE_DO.map(([a, b]) => (
                  <li key={a}>
                    <b>{a}</b>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Det dere gjør</h3>
              <ul className="sp-list">
                {YOU_DO.map(([a, b]) => (
                  <li key={a}>
                    <b>{a}</b>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
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
