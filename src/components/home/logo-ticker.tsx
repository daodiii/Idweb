import Image from "next/image";
import { RingebuMark } from "@/components/home/ringebu-mark";
import "@/styles/client-tiles.css";

/**
 * Under the hero: the logos of the clients IDweb has built sites for, on tiles in each client's own colours, sliding
 * past on their own. Not interactive. The row is rendered twice so the loop is seamless; the copy is hidden from
 * screen readers. With reduced motion the row stands still and wraps. The tiles alone also stand in a grid on /om-oss.
 */
export function ClientTiles({ copy = false }: { copy?: boolean }) {
  const alt = (name: string) => (copy ? "" : name);
  return (
    <ul className="tk-set" aria-hidden={copy || undefined}>
      {/* tk-name shows only on the homepage (client-tiles.css), so every client there reads as mark and name */}
      <li className="tk-t tk-rahma">
        <Image src="/images/clients/rahma-logo-white.png" alt={alt("Center Rahma")} width={412} height={433} sizes="80px" />
        <span className="tk-name" aria-hidden="true">
          Center
          <br />
          Rahma
        </span>
      </li>
      <li className="tk-t tk-mk">
        <Image src="/images/clients/mk-auto-logo.png" alt={alt("MK Auto")} width={299} height={300} sizes="80px" />
        <span className="tk-name" aria-hidden="true">
          MK Auto
        </span>
      </li>
      <li className="tk-t tk-iqra">
        <Image src="/images/clients/iqra-logo.png" alt={alt("Iqra Senter")} width={1007} height={271} sizes="160px" />
      </li>
      <li className="tk-t tk-brobekk">
        <Image src="/images/clients/brobekk-mark.png" alt="" width={480} height={400} sizes="68px" />
        <span>
          Brobekk
          <br />
          Legekontor
        </span>
      </li>
      <li className="tk-t tk-ringebu">
        <RingebuMark className="tk-tooth" />
        <span>
          Ringebu
          <br />
          Tannlegesenter
        </span>
      </li>
      <li className="tk-t tk-vocura">
        {/* Vocura's own mark: the pulse line from their site, beside the wordmark */}
        <svg className="tk-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        </svg>
        <span>Vocura</span>
      </li>
    </ul>
  );
}

export function LogoTicker() {
  return (
    <section className="tk" aria-label="Kunder vi har laget nettsider for">
      <div className="tk-vp">
        <div className="tk-track">
          <ClientTiles />
          <ClientTiles copy />
        </div>
      </div>
    </section>
  );
}
