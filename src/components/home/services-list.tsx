import Link from "next/link";
import { Arrow } from "@/components/home/arrow";

const SERVICES = [
  { title: "Nettside", text: "Skreddersydd fra bunnen, rask på mobil og enkel å oppdatere selv.", tags: "Design · Innhold · Universell utforming", href: "/tjenester/nettside" },
  { title: "Kundeportaler og systemer", text: "Innlogging, adminpanel og automatikk bygget for akkurat deres arbeidsflyt.", tags: "Innlogging · Adminpanel · Automatikk · Integrasjoner", href: "/#kontakt" },
  { title: "Nettbutikk", text: "Betaling, lager og frakt som henger sammen, uten tunge tillegg.", tags: "Betaling · Lager · Frakt", href: "/tjenester/nettbutikk" },
  { title: "SEO og synlighet i AI", text: "Strukturerte data og innhold som Google, kartene og ChatGPT forstår.", tags: "Google · ChatGPT · Kart · Schema.org", href: "/tjenester/seo" },
  { title: "Drift og vedlikehold", text: "Oppdateringer, backup og småendringer når du sender en melding.", tags: "Hosting · Backup · Support · Ingen bindingstid", href: "/tjenester/vedlikehold" },
];

export function ServicesList() {
  return (
    <section className="services" id="tjenester" aria-labelledby="tjenester-h">
      <div className="wrap g-2">
        <div className="sec-h">
          <h2 id="tjenester-h">Alt bedriften trenger på nett, fra én leverandør</h2>
          <p>Begynn med det dere trenger nå. Resten kan bygges på senere, uten å starte på nytt.</p>
        </div>
        <div className="svc-list">
          {SERVICES.map((s) => (
            <Link key={s.title} href={s.href} className="svc-row">
              <span>
                <b>{s.title}</b>
                <span>{s.text}</span>
                <small>{s.tags}</small>
              </span>
              <Arrow size={22} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
