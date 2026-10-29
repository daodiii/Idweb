import Image from "next/image";
import type { CSSProperties } from "react";
import { Marker } from "@/components/home/marker";
import { SecHead } from "@/components/tjenester-lab/lab-parts";
import { RevealOnView } from "@/components/tjenester-lab/reveal-on-view";
import { StepArt } from "@/components/tjenester-lab/step-art";
import { OFFER_PAGES, STEPS } from "@/components/tjenester-lab/nettside-content";

const PASTELS = ["#F4E1DF", "#DFECE3", "#DCE9F1", "#DCECE9"] as const;

const HEAD = (
  <SecHead
    id="nl-prosess"
    title={
      <>
        Dere vet hele tiden hva som <Marker>skjer</Marker>.
      </>
    }
    lede="Vi starter ikke før dere har sagt ja til tilbudet."
  />
);

/** A · the first mockup's steps: a sticky heading beside a numbered list. */
export function StepsA() {
  return (
    <section className="nl-sec nl-line" aria-labelledby="nl-prosess">
      <div className="wrap nl2-steps">
        {HEAD}
        <ol>
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="nl2-num">{i + 1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * B · «Stien»: one orange stroke draws itself across the page and the four steps hang from it, each with its own drawing.
 * The stroke is the site's marker. Under 900px the steps stack and the stroke is left out.
 */
export function StepsB() {
  return (
    <section className="nl-sec nl-line stb" aria-labelledby="nl-prosess">
      <div className="wrap">
        {HEAD}
        <RevealOnView className="stb-track">
          <svg className="stb-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
          </svg>
          <ol className="stb-list">
            {STEPS.map((s, i) => (
              <li key={s.title} style={{ "--i": i } as CSSProperties}>
                <span className="stb-node">{i + 1}</span>
                <div className="stb-art" style={{ background: PASTELS[i] }}>
                  <StepArt n={i} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </RevealOnView>
      </div>
    </section>
  );
}

function PanelOffer() {
  return (
    <div className="stc-offer" aria-hidden="true">
      <div className="stc-offer-top">
        <b>Tilbud til Fjellbakst</b>
        <span className="nl-tag">Eksempel</span>
      </div>
      <ul>
        {OFFER_PAGES.slice(0, 4).map(([a]) => (
          <li key={a}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
            </svg>
            {a}
          </li>
        ))}
      </ul>
      <div className="stc-offer-price">
        <span>Pris</span>
        <b>Fast</b>
      </div>
    </div>
  );
}

/**
 * C · «Bunken»: four large cards that stack as you scroll, each new one sliding over the last. Pastel from the clients,
 * the drawing or real client work on the right. Plain CSS (position: sticky), so it needs no script; under 700px they just stack.
 */
export function StepsC() {
  return (
    <section className="nl-sec nl-line stc" aria-labelledby="nl-prosess">
      <div className="wrap">
        {HEAD}
        <ol className="stc-stack">
          {STEPS.map((s, i) => (
            <li key={s.title} className="stc-card" style={{ "--i": i, background: PASTELS[i] } as CSSProperties}>
              <div className="stc-text">
                <span className="stc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <div className="stc-panel">
                {i === 0 && <StepArt n={0} />}
                {i === 1 && <PanelOffer />}
                {i === 2 && (
                  <>
                    <Image src="/images/arbeid/kongsvinger-bok-hd.webp" alt="" fill quality={90} sizes="(max-width: 900px) 90vw, 40vw" />
                  </>
                )}
                {i === 3 && (
                  <>
                    <Image src="/images/arbeid/mk-auto-desktop-hd.webp" alt="" fill quality={90} sizes="(max-width: 900px) 90vw, 40vw" />
                    <div className="wk-phone stc-phone">
                      <Image src="/images/arbeid/mk-auto-mobil-hd-v2.webp" alt="" fill quality={90} sizes="(max-width: 900px) 26vw, 12vw" />
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
