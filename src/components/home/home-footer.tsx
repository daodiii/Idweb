import Link from "next/link";
import { schibsted } from "@/lib/home/fonts";
import { IdwebMark } from "@/components/home/idweb-mark";
import { CookieSettingsButton } from "@/components/ui/cookie-settings-button";

export function HomeFooter() {
  return (
    <div className={`ka ${schibsted.variable}`}>
      <footer className="foot">
        <div className="wrap">
          <div className="g-foot">
            <div>
              <span className="brand">
                <IdwebMark id="ft" tone="light" className="logo-mark" />
                <span className="logo-word">
                  <b>ID</b>web
                </span>
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
              <CookieSettingsButton className="cookie-btn" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
