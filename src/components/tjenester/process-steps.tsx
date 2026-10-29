import type { CSSProperties } from "react";
import { Marker } from "@/components/home/marker";
import { SecHead } from "@/components/tjenester/service-parts";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { StepArt } from "@/components/tjenester/step-art";
import { STEPS } from "@/components/tjenester/nettside-content";

const PASTELS = ["#F4E1DF", "#DFECE3", "#DCE9F1", "#DCECE9"] as const;

const HEAD = (
  <SecHead
    id="sp-prosess"
    title={
      <>
        Dere vet hele tiden hva som <Marker>skjer</Marker>.
      </>
    }
    lede="Vi starter ikke før dere har sagt ja til tilbudet."
  />
);

/**
 * «Stien»: one orange stroke draws itself across the page and the four steps hang from it, each with its own drawing.
 * The stroke is the site's marker. Under 1100px the steps go two across, under 600px one, and the stroke is left out.
 */
export function ProcessSteps() {
  return (
    <section className="sp-sec sp-line stb" aria-labelledby="sp-prosess">
      <div className="wrap">
        {HEAD}
        <RevealOnView className="sps-track">
          <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
            <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
          </svg>
          <ol className="sps-list">
            {STEPS.map((s, i) => (
              <li key={s.title} style={{ "--i": i } as CSSProperties}>
                <span className="sps-node">{i + 1}</span>
                <div className="sps-art" style={{ background: PASTELS[i] }}>
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

