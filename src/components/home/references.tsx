import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/home/arrow";
import { PROJECTS } from "@/lib/content/portfolio";

const REFS = [
  { id: "iqra", img: "iqra-desktop.webp", note: "Aktiviteter, kurs og arrangementer", big: true },
  { id: "vocura", img: "vocura-desktop.webp", note: "Innlogging til egen side" },
  { id: "centerrahma", img: "centerrahma-desktop.webp", note: "Bønnetider i sanntid og donasjoner" },
  { id: "ringebu", img: "ringebu-desktop.webp", note: "Artikler om tannhelse" },
  { id: "brobekk", img: "brobekk-desktop.webp", note: "Laget for lokale søk" },
] as const;

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
              <Link key={r.id} href="/referanser" className={`ref${big ? " big" : ""}`}>
                <span className="shot">
                  <Image
                    src={`/images/portfolio/${r.img}`}
                    alt={`${p.client}, forsiden`}
                    fill
                    sizes={big ? "(max-width: 1200px) 100vw, 1136px" : "(max-width: 560px) 100vw, (max-width: 900px) 50vw, 280px"}
                  />
                </span>
                <span className="cap">
                  <b>{p.client}</b>
                  <span>{r.note}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
