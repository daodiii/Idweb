import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { Credits, OrderCard, ProductCard, ShopFront } from "@/components/tjenester-lab/shop-parts";
import { ShopBuilder } from "@/components/tjenester-lab/shop-builder";
import { CREDITS, FAQS, PROMISES, RELATED, SHOPS, WE_DO, YOU_DO } from "@/components/tjenester-lab/nettbutikk-content";

export const metadata: Metadata = { title: "Nettbutikk, mockup 3: Prøv selv", robots: { index: false, follow: false } };

/** Mockup 3 «Prøv selv»: the homepage hero's Trio composition, then a shop you add an item to yourself, and cards that stack. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap nbm3-hero">
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
          <div className="nbm3-vis">
            <div className="nbm3-back">
              <ShopFront />
            </div>
            <div className="nbm3-phone">
              <ProductCard />
            </div>
            <div className="nbm3-order">
              <OrderCard />
            </div>
          </div>
        </div>
      </section>

      <section className="nbm3-build" aria-labelledby="nb-legg">
        <div className="wrap">
          <SecHead
            id="nb-legg"
            title={
              <>
                Legg inn en <Marker>vare</Marker> selv.
              </>
            }
            lede="Velg bilde, gi varen navn og pris, og trykk på knappen. Se den komme først i butikken. Ingenting blir lagret."
          />
          <ShopBuilder />
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="nb-bygges">
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
          <ol className="nbm3-stack">
            {SHOPS.map((s, i) => (
              <li key={s.id} className="nbm3-card" style={{ "--i": i, background: s.bg } as CSSProperties}>
                <div className="nbm3-card-text">
                  <span className="nbm3-card-tag">{s.label}</span>
                  <h3>{s.label === "Keramikk" ? "Små serier, få av hver" : s.label === "Bakeri" ? "Bestill til den dagen dere henter" : "Mange farger av hver sort"}</h3>
                  <p>{s.line}</p>
                </div>
                <div className="nbm3-card-pic">
                  <Image src={s.img} alt={`${s.label}: eksempel på varebilde`} fill sizes="(max-width: 900px) 90vw, 40vw" />
                </div>
              </li>
            ))}
          </ol>
          <Credits text={CREDITS} />
        </div>
      </section>

      <section className="nbm3-field" aria-labelledby="nb-driver">
        <div className="wrap">
          <SecHead id="nb-driver" title={<>Vi lager butikken, dere <Marker>driver</Marker> den.</>} lede="Dere får en butikk dere kan drive selv, uten å måtte kunne noe om kode." />
          <div className="nbm3-two">
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

      <section className="sp-sec" aria-label="Utsolgt">
        <div className="wrap nbm3-fact">
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
