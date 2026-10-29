import { NIGHT_LINES, type NightKind } from "@/components/tjenester/vedlikehold-content";

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
