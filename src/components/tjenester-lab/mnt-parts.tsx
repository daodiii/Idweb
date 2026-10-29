import "@/styles/tjenester-lab.css";
import { INCLUDED, NIGHT_LINES, REPORT, type NightKind } from "@/components/tjenester-lab/vedlikehold-content";

/** The log for one night. */
export function NightLog({ kind = "update", title = "Driftslogg" }: { kind?: NightKind; title?: string }) {
  return (
    <div className="mn-log" aria-hidden="true">
      <div className="tb-portal-top">
        <b>{title}</b>
        <span>Natt, kl. 03</span>
      </div>
      {NIGHT_LINES[kind].map(([t, l]) => (
        <div key={t} className="mn-line">
          <small>{t}</small>
          <span>{l}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
          </svg>
        </div>
      ))}
    </div>
  );
}

/** The month report: four numbers and one line. */
export function MonthReport() {
  return (
    <div className="mn-report" aria-hidden="true">
      <div className="tb-portal-top">
        <b>Månedsrapport</b>
        <span>Sendt ved månedsslutt</span>
      </div>
      <div className="mn-stats">
        {REPORT.map(([n, l]) => (
          <div key={l}>
            <b>{n}</b>
            <span>{l}</span>
          </div>
        ))}
      </div>
      <p className="mn-ok">Alt i orden ved månedsslutt</p>
    </div>
  );
}

/** The price. */
export function PriceCard() {
  return (
    <div className="mn-price">
      <span className="mn-from">fra</span>
      <b>790 kr</b>
      <span className="mn-per">per måned, eks. mva</span>
      <ul>
        {INCLUDED.map(([h]) => (
          <li key={h}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
            {h}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A little message thread with IDweb. */
export function Thread({ messages }: { messages: readonly { from: "bot" | "me"; text: string }[] }) {
  return (
    <div className="ch-win mn-thread" role="log" aria-label="Meldinger med IDweb">
      <div className="ch-head">
        <span className="ch-ava" aria-hidden="true">ID</span>
        <span>
          <b>IDweb</b>
          <small>Meldinger</small>
        </span>
      </div>
      <div className="ch-msgs">
        {messages.map((m, i) => (
          <p key={i} className={`ch-msg ${m.from}`}>
            {m.text}
          </p>
        ))}
      </div>
    </div>
  );
}

/** What the site shows after a small change: a few lines, with the changed one marked. */
export function SitePreview({ kind }: { kind: string }) {
  return (
    <div className="mn-site" aria-hidden="true">
      <div className="mn-site-top">
        <i />
        <i />
        <i />
        <span>bedriften-din.no</span>
      </div>
      <b>Bedriften din</b>
      {kind === "hours" && (
        <div className="mn-rows">
          <span className="mn-old">Man–fre 08–16</span>
          <span className="mn-new">Man–fre 08–17</span>
        </div>
      )}
      {kind === "image" && (
        <div className="mn-img">
          <span className="mn-old">Gammelt bilde</span>
          <span className="mn-new">Nytt bilde</span>
        </div>
      )}
      {kind === "staff" && (
        <div className="mn-rows">
          <span>Ansatt 1</span>
          <span>Ansatt 2</span>
          <span className="mn-new">Ny ansatt</span>
        </div>
      )}
      {kind === "page" && (
        <div className="mn-rows">
          <span>Forside</span>
          <span>Om oss</span>
          <span className="mn-ask">Ny side: pris først</span>
        </div>
      )}
    </div>
  );
}
