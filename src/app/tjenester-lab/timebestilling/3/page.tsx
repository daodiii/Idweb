import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { BookingWidget, ClosePanel, MailCard, PortalCard } from "@/components/tjenester-lab/booking-parts";
import { FAQS, MAILS } from "@/components/tjenester-lab/timebestilling-content";

export const metadata: Metadata = { title: "Timebestilling, mockup 3: Telefonen", robots: { index: false, follow: false } };

const PASTELS = ["#DFECE3", "#DCE9F1", "#F4E1DF"] as const;

const OUTPUTS: { who: string; when: string; text: string; pic: ReactNode }[] = [
  { who: "Til kunden", when: "Med en gang", text: "Bekreftelsen kommer med kalenderinvitasjon, med bedriftens navn som avsender.", pic: <MailCard mail={MAILS[0]} /> },
  { who: "Til dere", when: "Innen fem minutter", text: "Navn, telefon og e-post, og en lenke til portalen.", pic: <MailCard mail={MAILS[1]} /> },
  { who: "I portalen", when: "Ligger klar", text: "Bekreftede timer de neste to ukene. Dere kan avbestille derfra.", pic: <PortalCard /> },
];

/** Mockup 3 «Telefonen»: the homepage hero's Trio composition (portal at the back, phone and e-mail in front), then cards that stack. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap tbm3-hero">
          <div>
            <Crumbs current="Timebestilling" />
            <h1 id="sp-h1">
              Kundene bestiller time <Marker>selv</Marker>.
            </h1>
            <p className="sp-lede">Vi legger timebestillingen inn på nettsiden deres. Kunden velger behandling, dag og klokkeslett og får bekreftelse med kalenderinvitasjon.</p>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="tbm3-vis">
            <div className="tbm3-back">
              <PortalCard />
            </div>
            <div className="tbm3-phone">
              <BookingWidget compact />
            </div>
            <div className="tbm3-mail">
              <MailCard mail={MAILS[0]} />
            </div>
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="tb-skjer">
        <div className="wrap">
          <SecHead
            id="tb-skjer"
            title={
              <>
                Dette skjer når timen er <Marker>bekreftet</Marker>.
              </>
            }
            lede="Kunden og dere får beskjed med en gang, og timen ligger klar i portalen."
          />
          <ol className="tbm3-stack">
            {OUTPUTS.map((o, i) => (
              <li key={o.who} className="tbm3-card" style={{ "--i": i, background: PASTELS[i] } as CSSProperties}>
                <div className="tbm3-card-text">
                  <span className="tbm3-card-when">{o.when}</span>
                  <h3>{o.who}</h3>
                  <p>{o.text}</p>
                </div>
                <div className="tbm3-card-pic">{o.pic}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-sec sp-line tbm3-mails" aria-labelledby="tb-epost">
        <div className="wrap">
          <SecHead
            id="tb-epost"
            title={
              <>
                E-postene går av <Marker>seg selv</Marker>.
              </>
            }
            lede="Fire e-poster, med teksten slik systemet skriver den. Bla sideveis."
          />
        </div>
        <div className="tbm3-track" tabIndex={0} role="group" aria-label="De fire e-postene, bla sideveis">
          {MAILS.map((m) => (
            <figure key={m.id}>
              <MailCard mail={m} showWhy />
              <figcaption>{m.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="tbm3-field" aria-labelledby="tb-kalender">
        <div className="wrap sp-split">
          <SecHead
            id="tb-kalender"
            title={
              <>
                Dere styrer <Marker>kalenderen</Marker>.
              </>
            }
            lede="I portalen ser dere kommende timer og kan avbestille. Skal dere på kurs eller ha ferie, stenger dere tiden, og den forsvinner fra bestillingen."
          />
          <div className="tbm3-field-pic">
            <PortalCard />
            <ClosePanel />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-label="Dobbeltbooking">
        <div className="wrap tbm3-fact">
          <p>
            Tider som er tatt eller stengt, <Marker>vises</Marker> aldri.
          </p>
          <span>Og databasen stopper to timer på samme tid, selv om to kunder trykker samtidig.</span>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="tb-faq">
        <div className="wrap sp-split">
          <SecHead id="tb-faq" title={<>Spørsmål og <Marker>svar</Marker></>} lede="Finner du ikke svaret? Send oss en melding." />
          <FaqList faq={FAQS} />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
