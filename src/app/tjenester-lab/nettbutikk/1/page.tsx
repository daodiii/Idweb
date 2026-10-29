import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { AdminCard, Credits, ShopFront } from "@/components/tjenester-lab/shop-parts";
import { CREDITS, FAQS, PRODUCTS, PROMISES, RELATED, SHOPS, WE_DO, YOU_DO } from "@/components/tjenester-lab/nettbutikk-content";

export const metadata: Metadata = { title: "Nettbutikk, mockup 1: Hyllen", robots: { index: false, follow: false } };

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
);

/** Mockup 1 «Hyllen»: the shop is the hero picture on a pastel field, as the booking is on timebestilling. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap nbm1-hero">
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
                  <Check />
                  {p}
                </li>
              ))}
            </ul>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="nbm1-field">
            <ShopFront />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="nb-legg">
        <div className="wrap">
          <SecHead
            id="nb-legg"
            title={
              <>
                Dere legger inn <Marker>varene</Marker> selv.
              </>
            }
            lede="Velg bilde, gi varen navn og pris, og si hvor mange dere har. Når dere trykker på knappen, ligger den i butikken."
          />
          <div className="nbm1-pair">
            <AdminCard />
            <ShopFront items={[{ ...PRODUCTS[0], stock: 3 }, PRODUCTS[1], PRODUCTS[2]]} fresh />
          </div>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="nb-bygges">
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
          <div className="nbm1-shops">
            {SHOPS.map((s) => (
              <figure key={s.id} style={{ background: s.bg }}>
                <div className="nbm1-shop-img">
                  <Image src={s.img} alt={`${s.label}: eksempel på varebilde`} fill sizes="(max-width: 900px) 90vw, 30vw" />
                </div>
                <figcaption>
                  <b>{s.label}</b>
                  {s.line}
                </figcaption>
              </figure>
            ))}
          </div>
          <Credits text={CREDITS} />
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="nb-driver">
        <div className="wrap">
          <SecHead id="nb-driver" title={<>Vi lager butikken, dere <Marker>driver</Marker> den.</>} lede="Dere får en butikk dere kan drive selv, uten å måtte kunne noe om kode." />
          <div className="nbm1-two">
            <div style={{ background: "#DFECE3" }}>
              <h3>Det vi gjør</h3>
              <ul>
                {WE_DO.map(([a, b]) => (
                  <li key={a}>
                    <Check />
                    <span>
                      <b>{a}</b>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#DCE9F1" }}>
              <h3>Det dere gjør</h3>
              <ul>
                {YOU_DO.map(([a, b]) => (
                  <li key={a}>
                    <Check />
                    <span>
                      <b>{a}</b>
                      {b}
                    </span>
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
