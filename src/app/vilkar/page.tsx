import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { PageHead } from "@/components/klar/page-head";

export const metadata: Metadata = pageMetadata({
  title: "Vilkår og betingelser",
  description: "Vilkårene for nettsider, systemer og drift fra IDweb: tilbud og avtale, betaling, angrerett, eierskap, ansvar og oppsigelse.",
  path: "/vilkar",
});

const SECTIONS: { num: string; heading: string; body: React.ReactNode }[] = [
  {
    num: "01",
    heading: "Generelt",
    body: (
      <p>
        Disse vilkårene gjelder for alle tjenester levert av IDweb v/ Daod
        Ilyas, org.nr: 837 228 972 (heretter «vi», «oss» eller «selskapet»).
        Ved å bestille tjenester fra oss aksepterer du disse vilkårene. Vi
        forbeholder oss retten til å oppdatere vilkårene. Gjeldende versjon er
        alltid tilgjengelig på denne siden.
      </p>
    ),
  },
  {
    num: "02",
    heading: "Tjenester og leveranse",
    body: (
      <p>
        Vi leverer webdesign, webutvikling, SEO, vedlikehold og relaterte
        tjenester som beskrevet i det individuelle tilbudet. Alle tilbud er
        gyldige i 30 dager fra utsendelse med mindre annet er spesifisert.
        Endringer i prosjektomfanget etter godkjent tilbud kan medføre
        tilleggskostnader som avtales skriftlig.
      </p>
    ),
  },
  {
    num: "03",
    heading: "Priser og betaling",
    body: (
      <p>
        Priser er oppgitt uten MVA. IDweb er per i dag ikke MVA-registrert.
        Dersom MVA-registrering gjennomføres i avtaleperioden, vil MVA tilkomme
        i henhold til gjeldende satser. Betalingsmodellen er som følger: 50 %
        ved oppstart og 50 % ved lansering. For driftsavtaler faktureres
        månedlig etter avtale. Betalingsfrist er 14 dager fra fakturadato. Ved
        forsinket betaling påløper forsinkelsesrente i henhold til
        forsinkelsesrenteloven.
      </p>
    ),
  },
  {
    num: "04",
    heading: "Eierskap og rettigheter",
    body: (
      <p>
        Kunden eier alt innhold (tekst, bilder, logoer) som kunden leverer til
        prosjektet. Ved fullstendig betaling overføres eierskapet til den
        skreddersydde koden og designet til kunden. Vi forbeholder oss retten
        til å bruke prosjektet som referanse i vår portefølje med mindre annet
        er avtalt. Tredjepartsverktøy, programvare og lisenser som brukes i
        prosjektet forblir underlagt sine respektive lisensvilkår.
      </p>
    ),
  },
  {
    num: "05",
    heading: "Driftsavtale og vedlikehold",
    body: (
      <p>
        Driftsavtaler har ingen bindingstid og kan sies opp med én måneds
        skriftlig varsel. Driftsavtalen dekker hosting, sikkerhetskopier,
        programvareoppdateringer og support som spesifisert i den individuelle
        avtalen. Vi tilstreber høy oppetid hos en anerkjent
        vertsleverandør, med unntak av planlagt vedlikehold som varsles minst
        48 timer i forveien.
      </p>
    ),
  },
  {
    num: "06",
    heading: "Kundens ansvar",
    body: (
      <p>
        Kunden er ansvarlig for å levere innhold (tekst, bilder, logoer og
        annet materiale) innen avtalte frister. Forsinkelser i innholdsleveranse
        fra kunden kan medføre tilsvarende forsinkelse i leveransen. Kunden er
        ansvarlig for at materiale som leveres til oss ikke krenker tredjeparters
        opphavsrett eller andre rettigheter.
      </p>
    ),
  },
  {
    num: "07",
    heading: "Godkjenning og revisjoner",
    body: (
      <p>
        Prosjekter inkluderer inntil to revideringsrunder etter presentert
        design. Ytterligere revisjoner faktureres etter medgått tid. Kunden har
        10 virkedager til å gi tilbakemelding på presentert arbeid. For
        næringsdrivende anses manglende tilbakemelding innen fristen som
        godkjenning.
      </p>
    ),
  },
  {
    num: "08",
    heading: "Angrerett og kansellering",
    body: (
      <>
        <p>
          <strong>Er du forbruker</strong> og avtalen inngås på nett, e-post,
          telefon eller utenfor vårt faste forretningssted, har du 14 dagers
          angrerett etter angrerettloven, regnet fra dagen avtalen ble inngått.
          Vi starter ikke arbeidet før angrefristen er ute, med mindre du
          uttrykkelig ber om det. Går du fra avtalen etter at vi har startet på
          din forespørsel, betaler du for det som er utført frem til du ga
          beskjed. Er tjenesten levert i sin helhet innen fristen, etter at du
          har bedt om det og bekreftet at angreretten da går tapt, har du ikke
          lenger angrerett. Gi beskjed på{" "}
          <a href="mailto:hei@idweb.no">hei@idweb.no</a>, gjerne med
          Forbrukertilsynets standard angreskjema.
        </p>
        <p>
          <strong>For næringsdrivende</strong> gjelder ikke angrerett. Kansellerer
          du prosjektet etter oppstart, faktureres utført arbeid i henhold til
          prosjektets fremdriftsplan, og innbetalt forskudd for ikke-utført
          arbeid refunderes.
        </p>
      </>
    ),
  },
  {
    num: "09",
    heading: "Ansvarsbegrensning",
    body: (
      <p>
        Vi leverer tjenester av høy kvalitet og i henhold til avtalt
        spesifikasjon. Vårt totale erstatningsansvar er begrenset til det
        beløpet kunden har betalt for den aktuelle tjenesten. Vi er ikke
        ansvarlige for indirekte tap, følgeskader, tapt fortjeneste eller tap
        av data. Vi er ikke ansvarlige for tredjepartstjenester som hosting,
        domeneregistrering eller betalingsformidling utover rimelig oppfølging.
        Begrensningene gjelder ikke overfor forbrukere i den grad loven gir deg
        sterkere rettigheter.
      </p>
    ),
  },
  {
    num: "10",
    heading: "Konfidensialitet",
    body: (
      <p>
        Begge parter forplikter seg til å behandle konfidensiell informasjon
        mottatt fra den andre parten fortrolig. Konfidensialitetsplikten
        gjelder også etter at avtaleforholdet er avsluttet.
      </p>
    ),
  },
  {
    num: "11",
    heading: "Tvister",
    body: (
      <p>
        Eventuelle tvister som oppstår i forbindelse med disse vilkårene skal
        forsøkes løst i minnelighet. Dersom partene ikke kommer til enighet,
        skal tvisten avgjøres ved de alminnelige domstolene i Norge med
        selskapets hjemsted som verneting. Norsk lov kommer til anvendelse. Er
        du forbruker, kan du også klage til Forbrukertilsynet, og du kan alltid
        reise sak ved domstolen der du bor.
      </p>
    ),
  },
  {
    num: "12",
    heading: "Kontakt",
    body: (
      <>
        <p>For spørsmål om vilkårene, ta kontakt med oss:</p>
        <p>
          IDweb v/ Daod Ilyas
          <br />
          Org.nr: 837 228 972
          <br />
          E-post:{" "}
          <a
            href="mailto:hei@idweb.no"
           
          >
            hei@idweb.no
          </a>
          <br />
          Telefon:{" "}
          <a
            href="tel:+4798406164"
           
          >
            +47 984 06 164
          </a>
        </p>
      </>
    ),
  },
];

export default function VilkarPage() {
  return (
    <div className="ka">
      <PageHead
        solo
        crumbs={[
          { name: "Hjem", href: "/" },
          { name: "Vilkår", href: "/vilkar" },
        ]}
        title="Vilkår for våre tjenester."
        lede="Det vi avtaler. Sist oppdatert 20. oktober 2026."
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
