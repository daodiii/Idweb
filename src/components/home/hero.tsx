import Image from "next/image";
import Link from "next/link";
import { Marker } from "@/components/home/marker";
import { HeroParallax } from "@/components/home/hero-parallax";

/**
 * Hero: just the promise and one button. On wide screens the headline sits left and the visual right, so both are on
 * the first screen; below 1080 px they stack. The visual is one landscape from a client site on three screens: a PC at
 * the back, a tablet and a phone in front of it on one bottom line. They arrive one after another at their own tempo,
 * then float and follow the pointer by depth (a-klar-calm.css, «hero picture»; HeroParallax). The screens are
 * decorative; the message is in the heading.
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

        <figure className="hero-vis ht">
          <div className="ht-stage" aria-hidden="true">
            <div className="ht-in ht-pc">
              <div className="ht-f">
                <Image src="/images/hero/kongsvinger-landskap-desktop.webp" alt="" fill sizes="(max-width: 1079px) 74vw, 480px" priority />
                <i className="ht-m" />
              </div>
            </div>
            <div className="ht-in ht-tab">
              <div className="ht-f">
                <Image src="/images/hero/kongsvinger-landskap-tablet.webp" alt="" fill sizes="(max-width: 1079px) 30vw, 200px" />
                <i className="ht-m" />
              </div>
            </div>
            <div className="ht-in ht-mob">
              <div className="ht-f">
                <Image src="/images/hero/kongsvinger-landskap-phone.webp" alt="" fill sizes="(max-width: 1079px) 22vw, 140px" />
                <i className="ht-m" />
              </div>
            </div>
          </div>
          <HeroParallax />
        </figure>
      </div>
    </section>
  );
}
