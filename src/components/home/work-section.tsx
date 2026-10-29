import Image from "next/image";
import Link from "next/link";
import { Marker } from "@/components/home/marker";

/** A phone-shaped frame around a mobile screenshot. */
function Phone({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`wk-phone ${className}`}>
      <Image src={src} alt={alt} fill quality={90} loading="eager" sizes="(max-width: 900px) 26vw, 12vw" />
    </div>
  );
}

/**
 * Selected work, right after the client logos, laid out like the reference: a stack of calm grey cards on the left,
 * each staging one client's site with the phone in front, and the text on the right, holding its place while the cards
 * scroll past. Only IDweb's own designs are shown, and no card links to a client domain that still serves an older site.
 */
export function WorkSection() {
  return (
    <section className="wk" id="arbeid" aria-labelledby="wk-h">
      <div className="wrap wk-grid">
        <div className="wk-text">
          <h2 id="wk-h">
            Vi hjelper bedrifter, små og store, med å <Marker>lykkes</Marker> på nett.
          </h2>
          <p>
            Nettsider og systemer laget for hver enkelt bedrift, som er like gode på mobilen som på PC. Her er noen av
            dem.
          </p>
          <Link className="wk-link" href="/referanser">
            Se kundecasene
          </Link>
        </div>

        <ul className="wk-stack">
          <li>
            <figure>
              <div className="wk-card wk-trio">
                <Phone src="/images/arbeid/iqra-mobil-1-v2.webp" alt="Iqra Senter på mobil: «Dette tilbyr vi», med helgeskolen åpnet" className="wk-trio-1" />
                <Phone src="/images/arbeid/iqra-mobil-2-v2.webp" alt="Iqra Senter på mobil: «Hvilken dør er din?», med valgene for skoleplass, medlemskap og spørsmål" className="wk-trio-2" />
                <Phone src="/images/arbeid/iqra-mobil-3-v2.webp" alt="Iqra Senter på mobil: «Vi feirer sammen», med sommerskolen 2026" className="wk-trio-3" />
              </div>
              <figcaption>Iqra Senter · Lærings- og aktivitetssenter i Oslo</figcaption>
            </figure>
          </li>
          <li>
            <figure>
              <div className="wk-card wk-kong">
                <Image className="wk-bg" loading="eager" src="/images/arbeid/kongsvinger-festning.webp" alt="Kongsvinger festning og byen under, tegnet for nettsiden til Kongsvinger Tannhelse" fill sizes="(max-width: 900px) 92vw, 50vw" />
                <div className="wk-desk">
                  <Image src="/images/arbeid/kongsvinger-bok-hd.webp" alt="Behandlingsboken til Kongsvinger Tannhelse på PC, med Tannsjekk åpnet" fill quality={90} loading="eager" sizes="(max-width: 900px) 70vw, 38vw" />
                </div>
                <Phone src="/images/arbeid/kongsvinger-mobil-v2.webp" alt="Forsiden til Kongsvinger Tannhelse på mobil" className="wk-kong-p" />
              </div>
              <figcaption>Kongsvinger Tannhelse · Tannlege i Kongsvinger</figcaption>
            </figure>
          </li>
          <li>
            <figure>
              <div className="wk-card wk-mk">
                <div className="wk-desk">
                  {/* cropped close around the headline so the outlined «som prioriterer» stays legible at card size */}
                  <Image src="/images/arbeid/mk-auto-desktop-hd.webp" alt="MK Auto sin forside på PC: «Bruktbilforhandleren som prioriterer kunden»" fill quality={90} loading="eager" sizes="(max-width: 900px) 70vw, 38vw" />
                </div>
                <Phone src="/images/arbeid/mk-auto-mobil-hd-v2.webp" alt="Samme forside på mobil" className="wk-mk-p" />
              </div>
              <figcaption>MK Auto · Bruktbilforhandler i Oslo</figcaption>
            </figure>
          </li>
          <li>
            <figure>
              <div className="wk-card wk-ringebu">
                <div className="wk-desk">
                  <Image src="/images/arbeid/ringebu-desktop-hd.webp" alt="Forsiden til Ringebu Tannlegesenter på PC: «Hos oss er du i trygge hender», med bilder fra klinikken" fill quality={90} loading="eager" sizes="(max-width: 900px) 70vw, 38vw" />
                </div>
                <Phone src="/images/arbeid/ringebu-mobil-v2.webp" alt="Forsiden til Ringebu Tannlegesenter på mobil: «Har du noen av disse plagene?» med symptomene som mapper" className="wk-ringebu-p" />
              </div>
              <figcaption>Ringebu Tannlegesenter · Tannlegesenter i Ringebu</figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </section>
  );
}
