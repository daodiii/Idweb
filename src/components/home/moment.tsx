import Image from "next/image";
import { Marker } from "@/components/home/marker";

/**
 * PREVIEW («ny» look): the page's one full-width moment. Kongsvinger at dusk, from the site we drew for Kongsvinger
 * Tannhelse, with one statement on it. Hidden in the current look (a-klar-look-ny.css), so its image is never fetched.
 */
export function Moment() {
  return (
    <section className="moment" aria-labelledby="moment-h">
      <Image src="/images/hero/kongsvinger-skumring.webp" alt="" fill sizes="100vw" loading="lazy" />
      <div className="wrap moment-in">
        <h2 id="moment-h">
          Du snakker med den som <Marker>bygger</Marker>.
        </h2>
      </div>
      <span className="moment-c">Kongsvinger i skumring, tegnet for Kongsvinger Tannhelse.</span>
    </section>
  );
}
