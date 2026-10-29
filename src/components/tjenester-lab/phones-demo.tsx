import type { CSSProperties } from "react";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { MAILS, type Mail } from "@/components/tjenester-lab/timebestilling-content";

function Note({ mail, from, i }: { mail: Mail; from: string; i: number }) {
  return (
    <li className="ph-note" style={{ "--i": i } as CSSProperties}>
      <span className="ph-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3.5" width="12" height="9" rx="2" />
          <path d="m2.6 5 5.4 4 5.4-4" />
        </svg>
      </span>
      <span className="ph-text">
        <small>
          {from} · e-post
        </small>
        <b>{mail.subject}</b>
        <span>{mail.lines[mail.lines.length - 1]}</span>
      </span>
    </li>
  );
}

/**
 * «Telefonene»: two lock screens on a soft field. Ida's gets the three e-mails a customer can receive, the clinic's gets the
 * one that tells them about a new booking. The banners arrive one by one when the section scrolls into view (static under
 * reduced motion, and visible before script runs). Under the field, each e-mail with when and why.
 */
export function PhonesDemo() {
  const customer = [MAILS[0], MAILS[2], MAILS[3]];
  const clinic = [MAILS[1]];
  return (
    <>
      <RevealOnView className="ph-field">
        <div className="ph ph-a" aria-hidden="true">
          <span className="ph-time">10:32</span>
          <span className="ph-date">Mandag</span>
          <ul className="ph-notes">
            {customer.map((m, i) => (
              <Note key={m.id} mail={m} from="Bjølsen Fysioterapi" i={i} />
            ))}
          </ul>
        </div>
        <div className="ph ph-b" aria-hidden="true">
          <span className="ph-time">10:32</span>
          <span className="ph-date">Mandag</span>
          <ul className="ph-notes">
            {clinic.map((m, i) => (
              <Note key={m.id} mail={m} from="IDweb" i={i + 1} />
            ))}
          </ul>
        </div>
      </RevealOnView>
      <div className="ph-cols">
        <div>
          <h3>Idas telefon</h3>
          <ul>
            {customer.map((m) => (
              <li key={m.id}>
                <b>{m.label}</b>
                <span className="tb-when">{m.when}</span>
                <p>{m.why}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Klinikkens telefon</h3>
          <ul>
            {clinic.map((m) => (
              <li key={m.id}>
                <b>{m.label}</b>
                <span className="tb-when">{m.when}</span>
                <p>{m.why}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
