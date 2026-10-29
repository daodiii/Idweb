import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { BookingWidget, ClosePanel, MailCard, PortalCard } from "@/components/tjenester-lab/booking-parts";
import { InboxDemo } from "@/components/tjenester-lab/inbox-demo";
import { PhonesDemo } from "@/components/tjenester-lab/phones-demo";
import { FAQS, MAILS } from "@/components/tjenester-lab/timebestilling-content";

/**
 * The timebestilling page as chosen so far: the hero and «Dette skjer når timen er bekreftet» from mockup 1, «Dere styrer
 * kalenderen» and the «vises aldri» statement from mockup 2. The e-mail section is the open question, shown in two new versions.
 */
export function TimebestillingMix({ emails }: { emails: "inbox" | "phones" }) {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap tbm1-hero">
          <div>
            <Crumbs current="Timebestilling" />
            <h1 id="sp-h1">
              Kundene bestiller time <Marker>selv</Marker>.
            </h1>
            <p className="sp-lede">
              Vi legger timebestillingen inn på nettsiden deres. Kunden velger behandling, dag og klokkeslett og får bekreftelse med kalenderinvitasjon.
            </p>
            <div className="sp-acts">
              <BookButton />
            </div>
          </div>
          <div className="tbm1-field">
            <BookingWidget />
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
            lede="Kunden og dere får beskjed med en gang, og timen ligger klar i portalen. Eksemplet er et tenkt fysioterapi-senter."
          />
          <div className="tbm1-three">
            <figure>
              <MailCard mail={MAILS[0]} />
              <figcaption>Til kunden</figcaption>
            </figure>
            <figure>
              <MailCard mail={MAILS[1]} />
              <figcaption>Til dere</figcaption>
            </figure>
            <figure>
              <PortalCard />
              <figcaption>I portalen</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="tb-epost">
        <div className="wrap">
          <SecHead
            id="tb-epost"
            title={
              <>
                E-postene går av <Marker>seg selv</Marker>.
              </>
            }
            lede="Bekreftelse, påminnelse og avbestilling går til kunden, med bedriftens navn som avsender. Dere får beskjed om hver nye time."
          />
          <div className="tbx-body">{emails === "inbox" ? <InboxDemo /> : <PhonesDemo />}</div>
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
