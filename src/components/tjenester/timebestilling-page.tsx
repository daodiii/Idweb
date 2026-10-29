import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { FaqList } from "@/components/klar/faq-list";
import { BreadcrumbJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { SERVICE_PAGES } from "@/components/tjenester/pages";
import { BookButton, Crumbs, SecHead, ServiceShell } from "@/components/tjenester/service-parts";
import { BookingWidget, ClosePanel, MailCard, PortalCard } from "@/components/tjenester/booking-parts";
import { InboxDemo } from "@/components/tjenester/inbox-demo";
import { FAQS, MAILS } from "@/components/tjenester/timebestilling-content";

/**
 * «Timebestilling» in the calm system. The booking is the hero picture, the confirmations sit on pastel fields, the e-mails
 * are an inbox you click through, and there is no «what it does not do» section on the service pages.
 */
export function TimebestillingPage() {
  const meta = SERVICE_PAGES.timebestilling;
  return (
    <ServiceShell>
      <ServiceJsonLd name={meta.name} description={meta.description} slug="timebestilling" />
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester" },
          { name: meta.name, href: "/tjenester/timebestilling" },
        ]}
      />
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap tbp-hero">
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
          <div className="tbp-field">
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
          <div className="tbp-three">
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
          <div className="tbx-body">
            <InboxDemo />
          </div>
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="tb-kalender">
        <div className="wrap">
          <div className="tbp-band">
            <SecHead
              id="tb-kalender"
              title={
                <>
                  Dere styrer <Marker>kalenderen</Marker>.
                </>
              }
              lede="I portalen ser dere kommende timer og kan avbestille. Skal dere på kurs eller ha ferie, stenger dere tiden, og den forsvinner fra bestillingen."
            />
            <div className="tbp-band-pic">
              <PortalCard />
              <ClosePanel />
            </div>
          </div>
        </div>
      </section>

      <section className="tbp-fact" aria-label="Dobbeltbooking">
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
