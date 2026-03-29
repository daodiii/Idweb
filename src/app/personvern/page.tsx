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

export default function PersonvernPage() {
  return (
    <div>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Personvernerklæring
          </h1>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Sist oppdatert: 1. januar 2026
          </p>

          <div className="mt-12 space-y-10 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                1. Hvem er behandlingsansvarlig?
              </h2>
              <p className="mt-3">
                IDweb v/ Daod Ilyas (org.nr: 837 228 972) er behandlingsansvarlig for
                personopplysninger som samles inn via denne nettsiden. Kontakt
                oss på hei@idweb.no dersom du har spørsmål om vår
                behandling av personopplysninger.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                2. Hvilke opplysninger samler vi inn?
              </h2>
              <p className="mt-3">
                Vi samler inn følgende opplysninger når du bruker nettsiden vår
                eller tar kontakt med oss:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>
                  Kontaktinformasjon: Navn, e-postadresse, telefonnummer og
                  bedriftsnavn som du oppgir via kontaktskjema eller e-post.
                </li>
                <li>
                  Teknisk informasjon: IP-adresse, nettlesertype,
                  operativsystem, besøkte sider og tidspunkt for besøk.
                </li>
                <li>
                  Informasjonskapsler (cookies): Vi bruker informasjonskapsler
                  for analyse og forbedring av brukeropplevelsen. Se punkt 5 for
                  detaljer.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                3. Formål med behandlingen
              </h2>
              <p className="mt-3">
                Vi behandler personopplysningene dine for følgende formål:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>Svare på henvendelser og gi tilbud på våre tjenester.</li>
                <li>
                  Levere tjenester du har bestilt, inkludert webdesign,
                  utvikling og vedlikehold.
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
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                4. Rettslig grunnlag
              </h2>
              <p className="mt-3">
                Behandlingen av personopplysninger skjer på grunnlag av:
                samtykke (GDPR artikkel 6 nr. 1 bokstav a) for
                markedsføringskommunikasjon, avtale (GDPR artikkel 6 nr. 1
                bokstav b) for å levere tjenester du har bestilt, og berettiget
                interesse (GDPR artikkel 6 nr. 1 bokstav f) for analyse og
                forbedring av nettsiden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                5. Informasjonskapsler (cookies)
              </h2>
              <p className="mt-3">
                Vi bruker informasjonskapsler for å analysere trafikk og
                forbedre brukeropplevelsen. Du kan når som helst endre
                innstillingene for informasjonskapsler i nettleseren din. Vi
                bruker følgende typer:
              </p>
              <ul className="mt-3 space-y-2 list-disc pl-6">
                <li>
                  Nødvendige informasjonskapsler: Sikrer at nettsiden fungerer
                  korrekt.
                </li>
                <li>
                  Analytiske informasjonskapsler: Hjelper oss med å forstå
                  hvordan besøkende bruker nettsiden (f.eks. Google Analytics).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                6. Deling av opplysninger
              </h2>
              <p className="mt-3">
                Vi selger aldri personopplysningene dine til tredjeparter. Vi
                kan dele opplysninger med pålitelige underleverandører som
                hjelper oss med å levere tjenestene våre (f.eks.
                hostingleverandører og e-posttjenester), men kun i den grad det
                er nødvendig og i henhold til databehandleravtaler.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                7. Lagring og sletting
              </h2>
              <p className="mt-3">
                Vi lagrer personopplysninger kun så lenge det er nødvendig for
                formålet de ble samlet inn for. Kontaktopplysninger fra
                henvendelser slettes etter 12 måneder dersom det ikke etableres
                et kundeforhold. Kundedata lagres i henhold til
                bokføringsloven.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                8. Dine rettigheter
              </h2>
              <p className="mt-3">
                Du har rett til innsyn i opplysningene vi har om deg, retting av
                feilaktige opplysninger, sletting av opplysninger,
                dataportabilitet, og å trekke tilbake samtykke. For å utøve
                rettighetene dine, kontakt oss på hei@idweb.no. Vi
                svarer innen 30 dager.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                9. Klage
              </h2>
              <p className="mt-3">
                Dersom du mener at vi behandler personopplysningene dine i strid
                med personvernlovgivningen, kan du klage til Datatilsynet
                (datatilsynet.no).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                10. Kontakt
              </h2>
              <p className="mt-3">
                For spørsmål om personvern, ta kontakt med oss:
              </p>
              <p className="mt-2">
                IDweb v/ Daod Ilyas
                <br />
                Org.nr: 837 228 972
                <br />
                E-post: hei@idweb.no
                <br />
                Telefon: +47 984 06 164
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
