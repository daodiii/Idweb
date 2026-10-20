import Image from "next/image";
import { Tick } from "@/components/klar/tick";

/**
 * «Hvem de er», shown instead of a portrait: a short loop of what working with us looks like. A message comes in,
 * we answer, a site is sketched out block by block, the finished page (Kongsvinger Tannhelse) fades in and is
 * launched. CSS only (a-klar-om-oss.css, .om-b2s); hovering pauses it, and with reduced motion the finished
 * state stands still.
 */
export function BriefToSite() {
  return (
    <figure className="om-b2s" aria-label="Fra melding til ferdig nettside">
      <div className="om-b2s-stage">
        <p className="om-b2s-msg in">
          <span className="who">Ny henvendelse</span>
          Vi trenger en ny nettside, men vet ikke helt hvor vi skal begynne.
        </p>
        <p className="om-b2s-msg out">
          <span className="who">IDweb</span>
          Da tar vi en prat. Vi stiller spørsmålene.
        </p>
        <div className="om-b2s-win" aria-hidden="true">
          <div className="om-b2s-bar">
            <i />
            <i />
            <i />
            <span>kongsvingertannhelse.no</span>
          </div>
          <div className="om-b2s-page">
            <span className="sk sk-nav" />
            <span className="sk sk-hero" />
            <span className="sk sk-a" />
            <span className="sk sk-b" />
            <span className="sk sk-c" />
            <Image
              className="om-b2s-shot"
              src="/images/kunder/kongsvinger-tannhelse/hero-desktop.webp"
              alt=""
              width={2400}
              height={1500}
              sizes="(max-width: 900px) 90vw, 520px"
            />
          </div>
          <span className="om-b2s-live">
            <Tick size={16} /> Lansert
          </span>
        </div>
      </div>
      <figcaption>Fra første melding til lansert side. Nettsiden er laget for Kongsvinger Tannhelse.</figcaption>
    </figure>
  );
}
