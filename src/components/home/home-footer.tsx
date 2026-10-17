import Link from "next/link";
import { schibsted } from "@/lib/home/fonts";

export function HomeFooter() {
  return (
    <div className={`ka ${schibsted.variable}`}>
      <footer className="foot">
        <div className="wrap">
          <div className="g-foot">
            <div>
              <span className="brand">
                {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark, already optimised */}
                <img src="/images/idweb-mark-160.webp" alt="" width={43} height={34} />
                <b>IDweb</b>
              </span>
              <p>Nettsider, kundeportaler og systemer for norske bedrifter.</p>
            </div>
            <div>
              <b>Tjenester</b>
              <Link href="/tjenester/nettside">Nettside</Link>
              <Link href="/tjenester/timebestilling">Timebestilling</Link>
              <Link href="/tjenester/nettbutikk">Nettbutikk</Link>
              <Link href="/tjenester/ai-chatbot">AI-chatbot</Link>
              <Link href="/tjenester/seo">SEO og AI-synlighet</Link>
              <Link href="/tjenester/vedlikehold">Drift</Link>
              <Link href="/tjenester/kundeportal">Kundeportal</Link>
              <Link href="/webbyra-oslo">Webbyrå i Oslo</Link>
            </div>
            <div>
              <b>IDweb</b>
              <Link href="/om-oss">Om oss</Link>
              <Link href="/referanser">Kundecaser</Link>
              <Link href="/blogg">Artikler</Link>
              <Link href="/faq">Spørsmål og svar</Link>
            </div>
            <div>
              <b>Kontakt</b>
              <a href="mailto:hei@idweb.no">hei@idweb.no</a>
              <a href="tel:+4798406164">+47 984 06 164</a>
              <span>Oslo</span>
            </div>
          </div>
          <div className="legal">
            <span>© {new Date().getFullYear()} IDweb</span>
            <span>
              <Link href="/personvern">Personvern</Link>
              <Link href="/vilkar">Vilkår</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
