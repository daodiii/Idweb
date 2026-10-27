import Image from "next/image";
import Link from "next/link";
import { Marker } from "@/components/home/marker";

type Project = {
  name: string;
  what: string;
  /** Where the card leads; none when the site we built is not live at the client's address yet. */
  link?: { href: string; label: string; external?: boolean };
  shot: "kongsvinger" | "ringebu" | "iqra";
};

const PROJECTS: Project[] = [
  {
    name: "Kongsvinger Tannhelse",
    what: "Tannlegene Hafthun og Zia i Kongsvinger",
    link: { href: "/referanser/kongsvinger-tannhelse", label: "Les kundecasen" },
    shot: "kongsvinger",
  },
  { name: "Ringebu Tannlegesenter", what: "Tannlegesenter i Ringebu", shot: "ringebu" },
  {
    name: "Iqra Senter",
    what: "Lærings- og aktivitetssenter for familier i Oslo",
    link: { href: "https://www.iqrasenter.no", label: "Se nettsiden", external: true },
    shot: "iqra",
  },
];

/** The staged screenshots for each card; each project gets its own arrangement inside the same grey card. */
function Shot({ shot }: { shot: Project["shot"] }) {
  if (shot === "kongsvinger")
    return (
      <div className="wk-shot wk-close">
        <Image src="/images/arbeid/kongsvinger-behandlinger.webp" alt="Behandlingene til Kongsvinger Tannhelse, tegnet som en folder" fill sizes="(max-width: 860px) 92vw, 30vw" />
      </div>
    );
  if (shot === "ringebu")
    return (
      <div className="wk-shot wk-framed">
        <div className="wk-frame">
          <Image src="/images/arbeid/ringebu-desktop.webp" alt="Forsiden til Ringebu Tannlegesenter: «Tannpleie med omtanke»" fill sizes="(max-width: 860px) 80vw, 26vw" />
        </div>
      </div>
    );
  return (
    <div className="wk-shot wk-pair">
      <div className="wk-frame wk-pair-d">
        <Image src="/images/arbeid/iqra-desktop.webp" alt="Iqra Senters nettside: «Her vokser vi sammen» og tilbudet deres" fill sizes="(max-width: 860px) 70vw, 22vw" />
      </div>
      <div className="wk-frame wk-pair-p">
        <Image src="/images/arbeid/iqra-mobil.webp" alt="" fill sizes="(max-width: 860px) 24vw, 8vw" />
      </div>
    </div>
  );
}

/**
 * Selected work, right after the client logos: MK Auto as the lead, on a dark band that grows to the full width as it
 * scrolls into view (the page's one big scroll moment), then three smaller projects. Real client sites only.
 */
export function WorkSection() {
  return (
    <section className="wk" id="arbeid" aria-labelledby="wk-h">
      <div className="wrap wk-head">
        <h2 id="wk-h">
          Hver bedrift får sin <Marker>egen</Marker> nettside.
        </h2>
        <p>Et utvalg av sidene vi har laget, fra bilforhandleren i Oslo til tannlegen ved Glomma.</p>
      </div>

      <figure className="wk-lead">
        <div className="wk-lead-in">
          <div className="wk-frame wk-lead-d">
            <Image src="/images/arbeid/mk-auto-desktop.webp" alt="Forsiden til MK Auto: «Bruktbilforhandleren som prioriterer kunden»" fill sizes="(max-width: 860px) 92vw, 70vw" />
          </div>
          <div className="wk-frame wk-lead-p">
            <Image src="/images/arbeid/mk-auto-mobil.webp" alt="" fill sizes="(max-width: 860px) 26vw, 16vw" />
          </div>
        </div>
      </figure>
      <div className="wrap wk-cap">
        <div>
          <h3>MK Auto</h3>
          <p>Bruktbilforhandler i Oslo. Siden skulle kjennes som å gå inn i lokalet: mørkt, røde detaljer og bilene i front.</p>
        </div>
        <Link className="wk-link" href="/referanser/mk-auto">
          Les kundecasen
        </Link>
      </div>

      <ul className="wrap wk-row">
        {PROJECTS.map((p) => (
          <li key={p.name} className="wk-card">
            <Shot shot={p.shot} />
            <h3>{p.name}</h3>
            <p>{p.what}</p>
            {p.link &&
              (p.link.external ? (
                <a className="wk-link" href={p.link.href} target="_blank" rel="noopener">
                  {p.link.label}
                  <span className="sr"> (åpnes i ny fane)</span>
                </a>
              ) : (
                <Link className="wk-link" href={p.link.href}>
                  {p.link.label}
                </Link>
              ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
