import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHead } from "@/components/klar/page-head";
import { SEO } from "@/lib/content/seo";
import { CookieSettingsButton } from "@/components/ui/cookie-settings-button";

export const metadata: Metadata = pageMetadata({ title: SEO.privacy.title, description: SEO.privacy.description, path: "/personvern" });

const SECTIONS: { num: string; heading: string; body: React.ReactNode }[] = [
  {
    num: "01",
    heading: "Hvem er behandlingsansvarlig?",
    body: (
      <p>
        IDweb v/ Daod Ilyas (org.nr: 837 228 972) er behandlingsansvarlig for personopplysninger som samles inn via
        denne nettsiden. Kontakt oss på <a href="mailto:hei@idweb.no">hei@idweb.no</a> dersom du har spørsmål om
        hvordan vi behandler personopplysninger.
      </p>
    ),
  },
  {
    num: "02",
    heading: "Hvilke opplysninger samler vi inn?",
    body: (
      <ul>
        <li>
          <strong>Det du sender oss i skjemaene.</strong> Kontaktskjemaet: navn, e-post, telefon (valgfritt),
          bedrift (valgfritt), hva dere trenger og meldingen. Pristilbudet: det samme, og i tillegg det du velger om
          nettsiden, nettadressen dere har i dag og bransjen.
        </li>
        <li>
          <strong>Det du sender oss på e-post eller telefon.</strong>
        </li>
        <li>
          <strong>Statistikk, bare hvis du sier ja.</strong> Google Analytics registrerer hvilke sider du besøker,
          omtrent hvor du er (land og by), hvilken enhet og nettleser du bruker, og en tilfeldig ID i en
          informasjonskapsel. Google Analytics lagrer ikke IP-adressen din.
        </li>
        <li>
          <strong>Serverlogger.</strong> Når du åpner siden, registrerer vertsleverandøren IP-adresse, tidspunkt og
          hvilken side du ba om, for å holde siden trygg og i drift.
        </li>
      </ul>
    ),
  },
  {
    num: "03",
    heading: "Formål og rettslig grunnlag",
    body: (
      <ul>
        <li>
          <strong>Svare på henvendelser og sende tilbud:</strong> tiltak før en eventuell avtale (GDPR art. 6 nr. 1
          bokstav b) og vår berettigede interesse i å svare den som tar kontakt (bokstav f).
        </li>
        <li>
          <strong>Levere tjenester du har bestilt:</strong> avtale (bokstav b).
        </li>
        <li>
          <strong>Regnskap og fakturaer:</strong> rettslig forpliktelse etter bokføringsloven (bokstav c).
        </li>
        <li>
          <strong>Statistikk om hvordan siden brukes:</strong> ditt samtykke (bokstav a), jf. ekomloven § 3-15. Du
          kan trekke samtykket tilbake når som helst.
        </li>
        <li>
          <strong>Serverlogger for sikkerhet og drift:</strong> berettiget interesse (bokstav f).
        </li>
      </ul>
    ),
  },
  {
    num: "04",
    heading: "Informasjonskapsler (cookies)",
    body: (
      <>
        <p>
          Første gang du besøker siden, velger du selv om du godtar statistikk. Sier du nei, settes ingen
          informasjonskapsler fra Google. Du kan endre valget når som helst med knappen under eller med
          «Informasjonskapsler» nederst på hver side.
        </p>
        <ul>
          <li>
            <strong>idweb-cookie-consent</strong> (nødvendig, lagres i nettleseren din): husker valget ditt, til du
            endrer det eller tømmer nettleseren.
          </li>
          <li>
            <strong>_ga og _ga_P0ZMB9YLTK</strong> (Google Analytics, bare med samtykke): skiller besøkende fra
            hverandre. Varer i opptil 2 år.
          </li>
        </ul>
        <p>
          <CookieSettingsButton className="btn dark">Endre valget om informasjonskapsler</CookieSettingsButton>
        </p>
      </>
    ),
  },
  {
    num: "05",
    heading: "Hvem vi deler opplysninger med",
    body: (
      <>
        <p>
          Vi selger aldri personopplysninger. Disse leverandørene behandler opplysninger på våre vegne, under
          databehandleravtale:
        </p>
        <ul>
          <li>
            <strong>Resend</strong> (Resend Inc., USA): sender meldingene fra skjemaene til e-posten vår.
          </li>
          <li>
            <strong>Google Analytics</strong> (Google Ireland Ltd. og Google LLC, USA): statistikk, bare hvis du har
            sagt ja.
          </li>
          <li>
            <strong>Vertsleverandøren</strong> som driver nettsiden: serverlogger.
          </li>
          <li>
            <strong>E-postleverandøren vår</strong>: oppbevarer e-postene vi sender og mottar.
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "06",
    heading: "Overføring til land utenfor EØS",
    body: (
      <p>
        Resend og Google er amerikanske selskaper, så opplysninger kan bli overført til USA. Overføringen skjer på
        grunnlag av EU–US Data Privacy Framework der leverandøren er sertifisert, og ellers EU-kommisjonens
        standardkontrakter (SCC).
      </p>
    ),
  },
  {
    num: "07",
    heading: "Lagring og sletting",
    body: (
      <ul>
        <li>Henvendelser som ikke fører til et kundeforhold, slettes etter 12 måneder.</li>
        <li>Fakturaer og regnskapsbilag oppbevares i 5 år, slik bokføringsloven krever.</li>
        <li>Statistikk i Google Analytics slettes automatisk etter oppbevaringstiden vi har satt, høyst 14 måneder.</li>
      </ul>
    ),
  },
  {
    num: "08",
    heading: "Dine rettigheter",
    body: (
      <p>
        Du har rett til innsyn i opplysningene vi har om deg, til å få feil rettet, til å få opplysninger slettet, til
        å protestere mot behandling vi gjør på grunnlag av berettiget interesse, til dataportabilitet og til å trekke
        tilbake samtykke. Kontakt oss på <a href="mailto:hei@idweb.no">hei@idweb.no</a>, så svarer vi innen 30
        dager.
      </p>
    ),
  },
  {
    num: "09",
    heading: "Klage",
    body: (
      <p>
        Mener du at vi behandler personopplysningene dine i strid med regelverket, kan du klage til Datatilsynet (
        <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer">
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
        <p>
          IDweb v/ Daod Ilyas
          <br />
          Org.nr: 837 228 972
          <br />
          E-post: <a href="mailto:hei@idweb.no">hei@idweb.no</a>
          <br />
          Telefon: <a href="tel:+4798406164">+47 984 06 164</a>
        </p>
      </>
    ),
  },
];

export default function PersonvernPage() {
  return (
    <div className="ka">
      <PageHead
        solo
        crumbs={[
          { name: "Hjem", href: "/" },
          { name: "Personvern", href: "/personvern" },
        ]}
        title="Slik tar vi vare på ditt personvern."
        lede="Klart og ryddig. Sist oppdatert 20. oktober 2026."
      />
      <div className="wrap">
        <div className="prose terms">
          {SECTIONS.map((s) => (
            <section key={s.num}>
              <h2>
                <span className="n" aria-hidden="true">
                  {s.num}
                </span>
                {s.heading}
              </h2>
              {s.body}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
