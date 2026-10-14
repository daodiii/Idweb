import Link from "next/link";
import { schibsted } from "@/lib/home/fonts";

export function HomeHeader() {
  return (
    <div className={`ka ${schibsted.variable}`}>
      <a href="#main-content" className="skip">
        Hopp til innholdet
      </a>
      <header className="top">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="IDweb, til forsiden">
            {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark, already optimised */}
            <img src="/images/idweb-mark-160.webp" alt="" width={53} height={42} />
            IDweb
          </Link>
          <nav className="navlinks" aria-label="Hovedmeny">
            <Link href="/#tjenester">Tjenester</Link>
            <Link href="/#prosess">Slik jobber vi</Link>
            <Link href="/referanser">Referanser</Link>
            <Link href="/om-oss">Om oss</Link>
          </nav>
          <Link href="/#kontakt" className="btn dark">
            Book en gratis prat
          </Link>
        </div>
      </header>
    </div>
  );
}
