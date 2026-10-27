import Image from "next/image";
import Link from "next/link";
import { Marker } from "@/components/home/marker";

/**
 * Hero: just the promise and one button. On wide screens the headline sits left and the visual right, so both are on
 * the first screen; below 1080 px they stack. The visual is a still: one landscape from a client site, cropped into
 * desktop, tablet and phone frames. The frames are decorative; the message is in the heading.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-head">
          <h1 id="hero-h">
            Vi lager nettsiden dere kan være <Marker>stolte</Marker> over.
          </h1>
          <div className="actions">
            <Link className="btn book" href="/#kontakt">
              Book en gratis prat
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>

        <figure className="hero-vis hs">
          <div className="hs-frames" aria-hidden="true">
            <div className="hs-f hs-d">
              <Image src="/images/hero/kongsvinger-landskap-desktop.webp" alt="" fill sizes="(max-width: 600px) 88vw, (max-width: 1079px) 90vw, 760px" priority />
              <i className="hs-m" />
            </div>
            <div className="hs-f hs-t">
              <Image src="/images/hero/kongsvinger-landskap-tablet.webp" alt="" fill sizes="(max-width: 600px) 36vw, 310px" />
              <i className="hs-m" />
            </div>
            <div className="hs-f hs-p">
              <Image src="/images/hero/kongsvinger-landskap-phone.webp" alt="" fill sizes="(max-width: 600px) 20vw, 150px" />
              <i className="hs-m" />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
