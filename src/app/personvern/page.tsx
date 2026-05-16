import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: SEO.privacy.title,
  description: SEO.privacy.description,
  alternates: {
    canonical: "/personvern",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const LINK = "underline decoration-[#F4CE14] decoration-2 underline-offset-4 transition-colors hover:decoration-[#FFE15D]";

const SECTIONS: { num: string; heading: string; body: React.ReactNode }[] = [
  {
    num: "01",
    heading: "Hvem er behandlingsansvarlig?",
    body: (
      <p>
        IDweb v/ Daod Ilyas (org.nr: 837 228 972) er behandlingsansvarlig for
        personopplysninger som samles inn via denne nettsiden. Kontakt oss på{" "}
        <a href="mailto:hei@idweb.no" className={LINK}>
          hei@idweb.no
        </a>{" "}
        dersom du har spørsmål om vår behandling av personopplysninger.
      </p>
    ),
  },
  {
    num: "02",
    heading: "Hvilke opplysninger samler vi inn?",
    body: (
      <>
        <p>
          Vi samler inn følgende opplysninger når du bruker nettsiden vår eller
          tar kontakt med oss:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-[#F4CE14]/80">
          <li>
            Kontaktinformasjon: Navn, e-postadresse, telefonnummer og
            bedriftsnavn som du oppgir via kontaktskjema eller e-post.
          </li>
          <li>
            Teknisk informasjon: IP-adresse, nettlesertype, operativsystem,
            besøkte sider og tidspunkt for besøk.
          </li>
          <li>
            Informasjonskapsler (cookies): Vi bruker informasjonskapsler for
            analyse og forbedring av brukeropplevelsen. Se punkt 5 for detaljer.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "03",
    heading: "Formål med behandlingen",
    body: (
      <>
        <p>Vi behandler personopplysningene dine for følgende formål:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-[#F4CE14]/80">
          <li>Svare på henvendelser og gi tilbud på våre tjenester.</li>
          <li>
            Levere tjenester du har bestilt, inkludert webdesign, utvikling og
            vedlikehold.
          </li>
          <li>
            Forbedre nettsiden vår gjennom analyse av besøksmønstre og
            brukeradferd.
          </li>
          <li>
            Sende relevant informasjon om tjenestene våre, dersom du har
            samtykket til dette.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "04",
    heading: "Rettslig grunnlag",
    body: (
      <p>
        Behandlingen av personopplysninger skjer på grunnlag av: samtykke (GDPR
        artikkel 6 nr. 1 bokstav a) for markedsføringskommunikasjon, avtale
        (GDPR artikkel 6 nr. 1 bokstav b) for å levere tjenester du har
        bestilt, og berettiget interesse (GDPR artikkel 6 nr. 1 bokstav f) for
        analyse og forbedring av nettsiden.
      </p>
    ),
  },
  {
    num: "05",
    heading: "Informasjonskapsler (cookies)",
    body: (
      <>
        <p>
          Vi bruker informasjonskapsler for å analysere trafikk og forbedre
          brukeropplevelsen. Du kan når som helst endre innstillingene for
          informasjonskapsler i nettleseren din. Vi bruker følgende typer:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-[#F4CE14]/80">
          <li>
            Nødvendige informasjonskapsler: Sikrer at nettsiden fungerer
            korrekt.
          </li>
          <li>
            Analytiske informasjonskapsler: Hjelper oss med å forstå hvordan
            besøkende bruker nettsiden (f.eks. Google Analytics).
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "06",
    heading: "Deling av opplysninger",
    body: (
      <p>
        Vi selger aldri personopplysningene dine til tredjeparter. Vi kan dele
        opplysninger med pålitelige underleverandører som hjelper oss med å
        levere tjenestene våre (f.eks. hostingleverandører og e-posttjenester),
        men kun i den grad det er nødvendig og i henhold til
        databehandleravtaler.
      </p>
    ),
  },
  {
    num: "07",
    heading: "Lagring og sletting",
    body: (
      <p>
        Vi lagrer personopplysninger kun så lenge det er nødvendig for formålet
        de ble samlet inn for. Kontaktopplysninger fra henvendelser slettes
        etter 12 måneder dersom det ikke etableres et kundeforhold. Kundedata
        lagres i henhold til bokføringsloven.
      </p>
    ),
  },
  {
    num: "08",
    heading: "Dine rettigheter",
    body: (
      <p>
        Du har rett til innsyn i opplysningene vi har om deg, retting av
        feilaktige opplysninger, sletting av opplysninger, dataportabilitet, og
        å trekke tilbake samtykke. For å utøve rettighetene dine, kontakt oss
        på{" "}
        <a href="mailto:hei@idweb.no" className={LINK}>
          hei@idweb.no
        </a>
        . Vi svarer innen 30 dager.
      </p>
    ),
  },
  {
    num: "09",
    heading: "Klage",
    body: (
      <p>
        Dersom du mener at vi behandler personopplysningene dine i strid med
        personvernlovgivningen, kan du klage til Datatilsynet (
        <a
          href="https://www.datatilsynet.no"
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          datatilsynet.no
        </a>
        ).
      </p>
    ),
  },
  {
    num: "10",
    heading: "Kontakt",
    body: (
      <>
        <p>For spørsmål om personvern, ta kontakt med oss:</p>
        <p className="mt-3">
          IDweb v/ Daod Ilyas
          <br />
          Org.nr: 837 228 972
          <br />
          E-post:{" "}
          <a href="mailto:hei@idweb.no" className={LINK}>
            hei@idweb.no
          </a>
          <br />
          Telefon:{" "}
          <a href="tel:+4798406164" className={LINK}>
            +47 984 06 164
          </a>
        </p>
      </>
    ),
  },
];

export default function PersonvernPage() {
  return (
    <div className="bg-[var(--color-dark-bg)]">
      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 12% 18%, rgba(244,206,20,0.13), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            Personvern
          </p>

          <h1 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Slik tar vi vare på
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              ditt{" "}
              <span className="relative inline-block">
                personvern
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Klart og ryddig.
            </span>
          </h1>

          <p className="mt-7 font-mono text-xs uppercase tracking-[0.22em] text-white/45">
            Sist oppdatert · 1. januar 2026
          </p>
        </div>
      </section>

      {/* Legal body */}
      <section className="relative bg-[var(--color-dark-bg)] px-6 pb-24">
        <div className="mx-auto max-w-[72ch]">
          {SECTIONS.map((s) => (
            <section
              key={s.num}
              className="mt-10 border-t border-white/[0.06] pt-10 pb-2 first:mt-0"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]/80"
                >
                  {s.num}
                </span>
                <h2 className="font-serif text-2xl font-black tracking-tight text-[var(--color-dark-text)] sm:text-3xl">
                  {s.heading}
                </h2>
              </div>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-white/75">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
