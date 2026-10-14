import { getImageProps } from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/home/arrow";
import { PROJECTS } from "@/lib/content/portfolio";

/**
 * Captions say what each site does for the client, from the facts in lib/content/portfolio.ts.
 * Screenshots are the first screen of each live site (ref-<id>-desktop / -phone, captured 2026-10-15).
 */
const REFS = [
  { id: "centerrahma", note: "Bønnetider i sanntid og donasjoner rett på siden", big: true },
  { id: "vocura", note: "Egen innlogging og personlig side for hver bruker" },
  { id: "brobekk", note: "Åpningstider, telefontid og timebestilling på første skjerm" },
  { id: "ringebu", note: "Artikler som svarer på pasientenes spørsmål om tannhelse" },
  { id: "iqra", note: "Kurs, aktiviteter og medlemskap for hele familien" },
] as const;

/** Desktop screenshot from 561 px up, the site's own phone view below that. */
function Shot({ id, alt, big }: { id: string; alt: string; big: boolean }) {
  const desktop = getImageProps({
    src: `/images/portfolio/ref-${id}-desktop.webp`,
    alt,
    width: 2880,
    height: 1800,
    sizes: big ? "(max-width: 1200px) 100vw, 1136px" : "(max-width: 900px) 50vw, 280px",
  }).props;
  const phone = getImageProps({
    src: `/images/portfolio/ref-${id}-phone.webp`,
    alt,
    width: 780,
    height: 1688,
    sizes: "75vw",
  }).props;
  return (
    <picture>
      <source media="(min-width: 561px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes through the spread props */}
      <img {...phone} loading="lazy" />
    </picture>
  );
}

export function References() {
  return (
    <section className="refs" id="referanser" aria-labelledby="refs-h">
      <div className="wrap">
        <div className="refs-h">
          <div className="sec-h">
            <h2 id="refs-h">Noe av det vi har laget</h2>
          </div>
          <Link href="/referanser">
            Alle referanser <Arrow />
          </Link>
        </div>
        <div className="g-refs">
          {REFS.map((r) => {
            const p = PROJECTS.find((x) => x.id === r.id)!;
            const big = "big" in r && r.big;
            return (
              // A full page load, not next/link: client-side navigation scrolls to the hash before /referanser has laid
              // out its images and lands ~460 px short (measured 2026-10-15); a normal load lands on the project.
              <a key={r.id} href={`/referanser#${r.id}`} className={`ref${big ? " big" : ""}`}>
                <span className="shot">
                  <Shot id={r.id} alt={`${p.client}, forsiden`} big={big} />
                </span>
                <span className="cap">
                  <b>{p.client}</b>
                  <span>{r.note}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
