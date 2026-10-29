import "@/styles/tjenester-lab.css";
import { DAYS, SLOTS, BOOKINGS, type Mail } from "@/components/tjenester-lab/timebestilling-content";

/** The booking as the customer sees it on the site. Drawn in markup, nothing is sent. */
export function BookingWidget({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`tb-widget${compact ? " tb-compact" : ""}`} aria-hidden="true">
      <div className="tb-widget-top">
        <i className="tb-dot" />
        <b>Bjølsen Fysioterapi</b>
        <span className="tb-pill-btn">Bestill time</span>
      </div>
      <h4>Når vil du komme?</h4>
      <p className="tb-sub">Første konsultasjon · 60 min</p>
      <div className="tb-days">
        {DAYS.map(([d, n], i) => (
          <span key={d} className={i === 1 ? "on" : undefined}>
            <small>{d}</small>
            {n}
          </span>
        ))}
      </div>
      <div className="tb-slots">
        {SLOTS.map((t) => (
          <span key={t} className={t === "10:30" ? "on" : undefined}>
            {t}
          </span>
        ))}
      </div>
      <span className="tb-confirm">Bestill tirsdag 10:30</span>
    </div>
  );
}

/** An e-mail as the example sends it. */
export function MailCard({ mail, showWhy = false }: { mail: Mail; showWhy?: boolean }) {
  return (
    <div className="tb-mail">
      <div className="tb-mail-top">
        <span>{mail.who === "kunden" ? "Til kunden" : "Til dere"}</span>
        <span className="tb-when">{mail.when}</span>
      </div>
      <b className="tb-subject">{mail.subject}</b>
      {mail.lines.map((l) => (
        <p key={l}>{l}</p>
      ))}
      {mail.attach && <span className="tb-attach">{mail.attach}</span>}
      {showWhy && <p className="tb-why">{mail.why}</p>}
    </div>
  );
}

/** «Kommende timer» in the portal. */
export function PortalCard() {
  return (
    <div className="tb-portal" aria-hidden="true">
      <div className="tb-portal-top">
        <b>Kommende timer</b>
        <span>Neste to uker</span>
      </div>
      <ul>
        {BOOKINGS.map(([name, what, when]) => (
          <li key={name}>
            <span>
              <b>{name}</b>
              {what}
            </span>
            <span className="tb-when-col">{when}</span>
            <span className="tb-cancel">Avbestill</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** «Stengt tid»: closing a day takes it out of the booking. */
export function ClosePanel() {
  return (
    <div className="tb-close" aria-hidden="true">
      <b>Stengt tid</b>
      <dl>
        <div>
          <dt>Fra</dt>
          <dd>Fredag 7.</dd>
        </div>
        <div>
          <dt>Til</dt>
          <dd>Fredag 7.</dd>
        </div>
        <div>
          <dt>Grunn</dt>
          <dd>Kurs</dd>
        </div>
      </dl>
      <span className="tb-confirm">Steng fredag</span>
    </div>
  );
}
