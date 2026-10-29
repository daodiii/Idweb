import "@/styles/tjenester-lab.css";
import "@/styles/tjenester-lab-shop.css";

/** A neutral picture slot: a soft tint and a small mountain-and-sun mark. No photos, no made-up shop. */
export function Ph({ tint = "#DFECE3", className = "" }: { tint?: string; className?: string }) {
  return (
    <span className={`ui-ph ${className}`} style={{ background: tint }} aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="33" cy="17" r="4" />
        <path d="M6 38l11-14 8 9 5-6 12 11z" />
      </svg>
    </span>
  );
}

const TINTS = ["#DFECE3", "#DCE9F1", "#F4E1DF"] as const;

/** One product on its own page, as the customer sees it on a phone. */
export function UiProductPage() {
  return (
    <div className="ui-card ui-product" aria-hidden="true">
      <Ph tint={TINTS[1]} className="ui-ph-lg" />
      <span className="ui-badge">3 igjen</span>
      <b>Eksempelvare</b>
      <span className="ui-muted">299 kr</span>
      <span className="tb-confirm">Legg i handlekurv</span>
      <small>Fri frakt over 800 kr</small>
    </div>
  );
}

/** The checkout: the basket, the shipping choices, the pay button. */
export function UiCheckout() {
  return (
    <div className="ui-card" aria-hidden="true">
      <div className="ui-top">
        <b>Kassen</b>
        <span>Steg 2 av 3</span>
      </div>
      <div className="ui-line">
        <Ph tint={TINTS[0]} className="ui-ph-sm" />
        <span>
          <b>Eksempelvare</b>
          <small>1 stk</small>
        </span>
        <b>299 kr</b>
      </div>
      <div className="ui-radio-list">
        <small>Frakt</small>
        {["Sending i posten", "Hent hos oss", "Fri frakt over 800 kr"].map((s, i) => (
          <span key={s} className={i === 0 ? "on" : undefined}>
            <i />
            {s}
          </span>
        ))}
        <em>Fraktprisen vises før betaling.</em>
      </div>
      <span className="tb-confirm">Betal</span>
    </div>
  );
}

/** «Ny vare» in the admin. */
export function UiNewProduct() {
  return (
    <div className="ui-card" aria-hidden="true">
      <div className="ui-top">
        <b>Varer</b>
        <span>Ny vare</span>
      </div>
      <div className="ui-drop">
        <Ph tint={TINTS[2]} className="ui-ph-sm" />
        <span>Legg til bilde</span>
      </div>
      <div className="ui-field">
        <small>Navn</small>
        <span>Eksempelvare</span>
      </div>
      <div className="ui-field-row">
        <div className="ui-field">
          <small>Pris</small>
          <span>299 kr</span>
        </div>
        <div className="ui-field">
          <small>På lager</small>
          <span className="ui-step">
            <i>−</i>5<i>+</i>
          </span>
        </div>
      </div>
      <span className="tb-confirm">Legg ut i butikken</span>
    </div>
  );
}

/** The stock list: counts you can change, one running out, one sold out. */
export function UiStock() {
  const rows = [
    ["Eksempelvare 1", "5 igjen", ""],
    ["Eksempelvare 2", "Bare 1 igjen", "low"],
    ["Eksempelvare 3", "Utsolgt", "out"],
  ] as const;
  return (
    <div className="ui-card" aria-hidden="true">
      <div className="ui-top">
        <b>Lager</b>
        <span>3 varer</span>
      </div>
      {rows.map(([n, s, k], i) => (
        <div key={n} className="ui-line ui-stock">
          <Ph tint={TINTS[i]} className="ui-ph-sm" />
          <span>
            <b>{n}</b>
            <small className={k}>{s}</small>
          </span>
          <span className="ui-step">
            <i>−</i>
            <i>+</i>
          </span>
        </div>
      ))}
    </div>
  );
}

/** The orders, all in one place. */
export function UiOrders({ compact = false }: { compact?: boolean }) {
  const rows = [
    ["#1042", "Betalt", "pay", "Pakk og send"],
    ["#1041", "Betalt", "pay", "Pakk og send"],
    ["#1040", "Sendt", "sent", ""],
  ] as const;
  return (
    <div className="ui-card" aria-hidden="true">
      <div className="ui-top">
        <b>Ordrer</b>
        <span>Nyeste først</span>
      </div>
      {(compact ? rows.slice(0, 2) : rows).map(([id, st, k, act]) => (
        <div key={id} className="ui-line ui-order">
          <b>{id}</b>
          <span className={`ui-status ${k}`}>{st}</span>
          <span className="ui-act">{act}</span>
        </div>
      ))}
    </div>
  );
}

/** One order open: what was bought, which shipping, and the button that tells the customer. */
export function UiOrderDetail() {
  return (
    <div className="ui-card" aria-hidden="true">
      <div className="ui-top">
        <b>Ordre #1042</b>
        <span className="ui-status pay">Betalt</span>
      </div>
      <div className="ui-line">
        <Ph tint={TINTS[0]} className="ui-ph-sm" />
        <span>
          <b>Eksempelvare</b>
          <small>1 stk · sending i posten</small>
        </span>
        <b>299 kr</b>
      </div>
      <span className="tb-confirm">Merk som sendt</span>
    </div>
  );
}

/** The e-mail the customer gets when an order is marked as sent. */
export function UiSentMail() {
  return (
    <div className="ui-card tb-mail" aria-hidden="true">
      <div className="tb-mail-top">
        <span>Til kunden</span>
        <span className="tb-when">Når dere merker den sendt</span>
      </div>
      <b className="tb-subject">Pakken din er sendt</b>
      <p>Hei, ordren din er på vei.</p>
    </div>
  );
}

/** The shipping choices the shop owner sets up. */
export function UiShipping() {
  return (
    <div className="ui-card" aria-hidden="true">
      <div className="ui-top">
        <b>Fraktvalg</b>
        <span>Dere velger</span>
      </div>
      {["Sending i posten", "Henting hos dere", "Fri frakt over et beløp"].map((s) => (
        <div key={s} className="ui-line ui-toggle">
          <b>{s}</b>
          <span className="ui-switch on" />
        </div>
      ))}
    </div>
  );
}

/** What gets done before the shop opens. */
export function UiChecklist() {
  return (
    <div className="ui-card" aria-hidden="true">
      <div className="ui-top">
        <b>Før butikken åpner</b>
        <span>Alt klart</span>
      </div>
      {["Design etter varene og fargene deres", "Betaling satt opp", "Frakt satt opp", "Kassen laget for mobilen", "Testkjøp fra handlekurv til e-post"].map((s) => (
        <div key={s} className="ui-line ui-check">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
          <b>{s}</b>
        </div>
      ))}
    </div>
  );
}

/** A phone around one screen. */
export function UiPhone({ children }: { children: React.ReactNode }) {
  return <div className="ui-phone">{children}</div>;
}
