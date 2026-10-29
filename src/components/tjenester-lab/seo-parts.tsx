import "@/styles/tjenester-lab.css";
import { KINDS, type Kind, type Region } from "@/components/tjenester-lab/seo-content";

/** A search result for the business, drawn. Google decides how the real one looks; this shows what it can know. */
export function GoogleCard({ kind = "tannlege", open = true, lit }: { kind?: Kind; open?: boolean; lit?: Region }) {
  const k = KINDS[kind];
  const on = (r: Region) => (lit === r ? " lit" : "");
  return (
    <div className="sg-card" aria-hidden="true">
      <div className="sg-bar">
        <i />
        <span>bedriften-din.no</span>
      </div>
      <b className="sg-title">Bedriften din | {k.label} i Oslo</b>
      <p className="sg-desc">Kort om hva dere gjør og hvor dere er, slik det står på nettsiden.</p>
      <div className="sg-panel">
        <b>Bedriften din</b>
        <span className={`sg-line${on("type")}`}>{k.label}</span>
        <span className={`sg-line${on("adresse")}`}>
          <small>Adresse:</small> Gateveien 1, Oslo
        </span>
        <span className={`sg-line${on("apent")}`}>
          <small>Åpningstider:</small> <em className={open ? "ok" : "no"}>{open ? "Åpent" : "Stengt"}</em> · {open ? "stenger 16.00" : "åpner 08.00"}
        </span>
        <div className="sg-btns">
          <span>Nettsted</span>
          <span>Veibeskrivelse</span>
        </div>
      </div>
    </div>
  );
}

/** The code we write, one line per block, with the lines that matter marked so they can be lit. */
export function CodeCard({ kind = "tannlege", lit }: { kind?: Kind; lit?: Region }) {
  const k = KINDS[kind];
  const L = (r: Region | null, indent: 0 | 1 | 2, children: React.ReactNode) => (
    <span className={`cc-l i${indent}${r && lit === r ? " lit" : ""}`}>{children}</span>
  );
  return (
    <pre className="cc" aria-label="Eksempel på koden vi skriver">
      <code>
        {L(null, 0, <span className="cc-c">{"// Strukturerte data i <head>"}</span>)}
        {L(null, 0, "{")}
        {L("type", 1, <>
          <span className="cc-k">&quot;@type&quot;</span>: <span className="cc-s">&quot;{k.schema}&quot;</span>,
        </>)}
        {L(null, 1, <>
          <span className="cc-k">name</span>: <span className="cc-s">&quot;Bedriften din&quot;</span>,
        </>)}
        {L("adresse", 1, <>
          <span className="cc-k">address</span>: {"{ "}
          <span className="cc-k">streetAddress</span>: <span className="cc-s">&quot;Gateveien 1&quot;</span>, <span className="cc-k">addressLocality</span>: <span className="cc-s">&quot;Oslo&quot;</span>
          {" },"}
        </>)}
        {L("apent", 1, <>
          <span className="cc-k">openingHoursSpecification</span>: [
        </>)}
        {L("apent", 2, <>
          {"{ "}
          <span className="cc-k">dayOfWeek</span>: [<span className="cc-s">&quot;Monday&quot;</span>, …, <span className="cc-s">&quot;Friday&quot;</span>],
        </>)}
        {L("apent", 2, <>
          <span className="cc-k">opens</span>: <span className="cc-s">&quot;08:00&quot;</span>, <span className="cc-k">closes</span>: <span className="cc-s">&quot;16:00&quot;</span> {"}"}
        </>)}
        {L("apent", 1, "],")}
        {L(null, 0, "}")}
      </code>
    </pre>
  );
}

/** The e-mail the customer gets after a job is marked done. [fornavn] is the template, not a person. */
export function ReviewMail() {
  return (
    <div className="tb-mail rv-mail" aria-hidden="true">
      <div className="tb-mail-top">
        <span>Fra bedriften din</span>
        <span className="tb-when">Kl. 09.00</span>
      </div>
      <b className="tb-subject">Hvordan gikk det hos Bedriften din?</b>
      <p>Hei [fornavn],</p>
      <p>Takk for at du valgte oss. Har du et minutt til å legge igjen en omtale? Det hjelper andre som vurderer det samme.</p>
      <span className="tb-confirm">Gi en omtale</span>
      <p className="tb-why">Du får denne e-posten fordi du har vært kunde. Vil du ikke ha flere? Meld deg av.</p>
    </div>
  );
}

/** Google's own page for writing a review, which the customer lands on. */
export function ReviewPage({ filled = false }: { filled?: boolean }) {
  return (
    <div className={`rv-page${filled ? " filled" : ""}`} aria-hidden="true">
      <b>Del opplevelsen din</b>
      <span className="rv-stars">
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
            <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8 6.8 19.6l1-5.8L3.5 9.7l5.9-.8z" />
          </svg>
        ))}
      </span>
      {filled && (
        <>
          <i className="rv-line" style={{ width: "88%" }} />
          <i className="rv-line" style={{ width: "64%" }} />
        </>
      )}
      <span className="rv-text">{filled ? "Omtalen kunden skrev ligger nå på Google." : "Kunden skriver omtalen selv."}</span>
    </div>
  );
}

/** A job in the portal, marked done. */
export function JobRow({ done = true }: { done?: boolean }) {
  return (
    <div className="rv-job" aria-hidden="true">
      <div className="tb-portal-top">
        <b>Jobber</b>
        <span>Kundeportalen</span>
      </div>
      <div className="rv-job-row">
        <span>
          <b>Jobb for kunde</b>
          <small>{done ? "Merket ferdig" : "Pågår"}</small>
        </span>
        <span className={`rv-status${done ? " done" : ""}`}>{done ? "Ferdig" : "Pågår"}</span>
      </div>
    </div>
  );
}
