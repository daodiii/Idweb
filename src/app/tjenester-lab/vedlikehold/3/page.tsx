import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { NightLog, Thread } from "@/components/tjenester-lab/mnt-parts";
import { FAQS, HONEST, INCLUDED, KIND_LABEL, PROMISES, REPORT, type NightKind } from "@/components/tjenester-lab/vedlikehold-content";

export const metadata: Metadata = { title: "Drift, mockup 3: Natten", robots: { index: false, follow: false } };

const NIGHTS: { kind: NightKind; text: string }[] = [
  { kind: "backup", text: "Hver natt tas en sikkerhetskopi av siden." },
  { kind: "update", text: "Oppdateringer bygges på en testkopi først, og går ut når de er sjekket." },
  { kind: "fix", text: "Sjekkene finner feil, og vi retter det vi har bygd." },
  { kind: "cert", text: "Sertifikatet fornyes av seg selv, uten at dere trenger å huske det." },
];

/** Mockup 3 «Natten»: kl. 03 as the hero picture, the four things that happen at night along the orange stroke, the month in four big numbers. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap vbm3-hero">
          <div>
            <Crumbs current="Drift og vedlikehold" />
            <h1 id="sp-h1">
              Vi <Marker>passer</Marker> på nettsiden etter lansering.
            </h1>
            <p className="sp-lede">Sikkerhetskopier, oppdateringer og sjekker går av seg selv hver natt. Trenger dere en endring, sender dere bare en melding.</p>
            <ul className="vbm-promises">
              {PROMISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="vbm-price">
              <b>Fra 790 kr i måneden</b> eks. mva · ingen bindingstid
            </p>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="vbm3-field">
            <span className="vbm3-clock">03.00</span>
            <NightLog kind="update" />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="vh-natt">
        <div className="wrap">
          <SecHead id="vh-natt" title={<>Mens dere <Marker>sover</Marker>.</>} lede="Dette er det som skjer på siden om natten, uten at dere trenger å gjøre noe." />
          <RevealOnView className="sps-track vbm3-path">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {NIGHTS.map((n, i) => (
                <li key={n.kind} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="vbm3-card sps-art">
                    <NightLog kind={n.kind} title={KIND_LABEL[n.kind]} />
                  </div>
                  <h3>{KIND_LABEL[n.kind]}</h3>
                  <p>{n.text}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="vbm3-month" aria-labelledby="vh-maned">
        <div className="wrap">
          <SecHead id="vh-maned" title={<>Og så får dere en <Marker>rapport</Marker>.</>} lede="Ved månedsslutt får dere en rapport om hva som skjedde. Tallene er fra en tenkt måned." />
          <div className="vbm3-stats">
            {REPORT.map(([n, l]) => (
              <div key={l}>
                <b>{n}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <p className="vbm3-ok">Alt i orden ved månedsslutt</p>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="vh-pris">
        <div className="wrap sp-split">
          <div>
            <SecHead id="vh-pris" title={<>Dette er med for <Marker>790</Marker> kr i måneden.</>} lede="790 kr er prisen for en vanlig bedriftsside, eks. mva. Har siden nettbutikk, timebestilling eller kundeportal, er det mer å passe på. Da får dere en fast månedspris før dere bestemmer dere." />
            <ul className="sp-list">
              {INCLUDED.map(([h, p]) => (
                <li key={h}>
                  <b>{h}</b>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="vbm3-thread">
            <Thread
              messages={[
                { from: "me", text: "Kan dere legge til en ny ansatt på Om oss?" },
                { from: "bot", text: "Gjort. Den nye ansatte står på siden." },
              ]}
            />
            <p>Små endringer i tekst, bilder og åpningstider er med i prisen. Større ting, som en ny side eller en ny funksjon, får dere pris på før vi starter.</p>
          </div>
        </div>
      </section>

      <section className="tbp-fact" aria-label="Ærlig om feil">
        <div className="wrap">
          <p>
            Ingen kan love at en side aldri får <Marker>feil</Marker>.
          </p>
          <span>{HONEST}</span>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="vh-faq">
        <div className="wrap sp-split">
          <SecHead id="vh-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
