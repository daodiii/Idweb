import Link from "next/link";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { RoleExplainer } from "@/components/tjenester-lab/role-explainer";
import { FAQS, PROMISES, RELATED } from "@/components/tjenester-lab/nettbutikk-content";

export const metadata: Metadata = { title: "Nettbutikk, mockup 5: Hvem gjør hva", robots: { index: false, follow: false } };

/** Mockup 5 «Hvem gjør hva»: a wide headline, then one explainer you click through: the customer, you, and us, four steps each. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <Crumbs current="Nettbutikk" />
          <div className="nbm5-head">
            <h1 id="sp-h1">
              Fra hylla til <Marker>nettbutikken</Marker>.
            </h1>
            <div>
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
          </div>
        </div>
      </section>

      <section className="nbm5-explain" aria-labelledby="nb-hvem">
        <div className="wrap">
          <SecHead id="nb-hvem" title={<>Slik fungerer butikken for <Marker>dere</Marker>.</>} lede="Velg hvem du vil følge, og trykk deg gjennom stegene. Skjermen til høyre viser hva det handler om." />
          <RoleExplainer />
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
