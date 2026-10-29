import "@/styles/tjenester-lab.css";
import { BookingWidget } from "@/components/tjenester/booking-parts";
import { ChatWindow } from "@/components/tjenester/chat-parts";
import { GoogleCard } from "@/components/tjenester/seo-parts";
import { NightLog } from "@/components/tjenester/mnt-parts";
import { EntryRow } from "@/components/tjenester/portal-parts";
import { ENTRIES } from "@/components/tjenester/kundeportal-content";
import { UiOrders } from "@/components/tjenester/shop-ui";
import { OFFER_PAGES } from "@/components/tjenester/nettside-content";
import type { ServicePageSlug } from "@/components/tjenester/pages";

/** A little offer sheet, the nettside page's picture. */
function MiniOffer() {
  return (
    <div className="ov-offer" aria-hidden="true">
      <div className="ov-offer-top">
        <b>Tilbud</b>
        <span className="nl-tag sp-tag">Eksempel</span>
      </div>
      {OFFER_PAGES.slice(0, 4).map(([a]) => (
        <div key={a} className="ov-offer-row">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
          {a}
        </div>
      ))}
      <span className="tb-confirm">Fast pris</span>
    </div>
  );
}

/** The picture of each service, taken from its own page and cropped to a stage so only the top of it shows. */
export function OverviewArt({ slug }: { slug: ServicePageSlug }) {
  return (
    <div className="ov-stage" aria-hidden="true">
      {slug === "nettside" && <MiniOffer />}
      {slug === "timebestilling" && <BookingWidget compact />}
      {slug === "nettbutikk" && <UiOrders compact />}
      {slug === "ai-chatbot" && <ChatWindow messages={[{ from: "me", text: "Når har dere åpent?" }, { from: "bot", text: "Vi har åpent mandag til fredag 08–16." }]} input={false} className="ch-small" />}
      {slug === "seo" && <GoogleCard />}
      {slug === "vedlikehold" && <NightLog kind="update" />}
      {slug === "kundeportal" && <EntryRow e={ENTRIES[0]} />}
    </div>
  );
}
