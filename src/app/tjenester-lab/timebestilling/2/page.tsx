import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { BookingWidget, ClosePanel, MailCard, PortalCard } from "@/components/tjenester-lab/booking-parts";
import { FAQS, MAILS } from "@/components/tjenester-lab/timebestilling-content";

export const metadata: Metadata = { title: "Timebestilling, mockup 2: Forløpet", robots: { index: false, follow: false } };

const STORY = [
  ["Kunden bestiller", "Velger behandling, dag og klokkeslett på nettsiden deres."],
  ["Kunden får bekreftelse", "Med kalenderinvitasjon, og bedriftens navn som avsender."],
  ["Dere får beskjed", "Navn, telefon og e-post, innen fem minutter."],
  ["Timen ligger klar", "I portalen, hvor dere kan avbestille eller stenge tid."],
] as const;

/** Mockup 2 «Forløpet»: one booking told as a path across the top (the nettside steps' orange stroke), then the e-mails on a timeline. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <Crumbs current="Timebestilling" />
          <div className="tbm2-head">
            <h1 id="sp-h1">
              Kundene bestiller time <Marker>selv</Marker>.
            </h1>
            <div>
              <p className="sp-lede">Vi legger timebestillingen inn på nettsiden deres. Kunden velger behandling, dag og klokkeslett og får bekreftelse med kalenderinvitasjon.</p>
              <div className="sp-acts">
                <BookButton />
              </div>
            </div>
          </div>
          <RevealOnView className="sps-track tbm2-story">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {STORY.map(([h, p], i) => (
                <li key={h} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{i + 1}</span>
                  <div className="tbm2-card sps-art">
                    {i === 0 && <BookingWidget compact />}
                    {i === 1 && <MailCard mail={MAILS[0]} />}
                    {i === 2 && <MailCard mail={MAILS[1]} />}
                    {i === 3 && <PortalCard />}
                  </div>
                  <h3>{h}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="tb-epost">
        <div className="wrap tbm2-time">
          <SecHead
            id="tb-epost"
            title={
              <>
                E-postene går av <Marker>seg selv</Marker>.
              </>
            }
            lede="Bekreftelse, påminnelse og avbestilling går til kunden, med bedriftens navn som avsender. Dere får beskjed om hver nye time."
          />
          <ol className="tbm2-line">
            {MAILS.map((m) => (
              <li key={m.id}>
                <span className="tbm2-dot" aria-hidden="true" />
                <h3>{m.label}</h3>
                <MailCard mail={m} showWhy />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="tb-kalender">
        <div className="wrap">
          <div className="tbm2-band">
            <SecHead
              id="tb-kalender"
              title={
                <>
                  Dere styrer <Marker>kalenderen</Marker>.
                </>
              }
              lede="I portalen ser dere kommende timer og kan avbestille. Skal dere på kurs eller ha ferie, stenger dere tiden, og den forsvinner fra bestillingen."
            />
            <div className="tbm2-band-pic">
              <PortalCard />
              <ClosePanel />
            </div>
          </div>
        </div>
      </section>

      <section className="tbm2-fact" aria-label="Dobbeltbooking">
        <div className="wrap">
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
