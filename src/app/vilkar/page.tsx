import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vilkår og betingelser | IDweb",
  description:
    "Les våre vilkår og betingelser for bruk av nettsiden og tjenestene til IDweb.",
};

export default function VilkarPage() {
  return (
    <div>
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Vilkår og betingelser
          </h1>
          <p className="mt-4 text-[var(--color-text-muted)]">
            Sist oppdatert: 1. januar 2026
          </p>

          <div className="mt-12 space-y-10 text-[var(--color-text-muted)] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                1. Generelt
              </h2>
              <p className="mt-3">
                Disse vilkårene gjelder for alle tjenester levert av
                IDweb (heretter «vi», «oss» eller «selskapet»). Ved å
                bestille tjenester fra oss aksepterer du disse vilkårene. Vi
                forbeholder oss retten til å oppdatere vilkårene. Gjeldende
                versjon er alltid tilgjengelig på denne siden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                2. Tjenester og leveranse
              </h2>
              <p className="mt-3">
                Vi leverer webdesign, webutvikling, SEO, digital markedsføring,
                grafisk design og relaterte tjenester som beskrevet i det
                individuelle tilbudet. Alle tilbud er gyldige i 30 dager fra
                utsendelse med mindre annet er spesifisert. Endringer i
                prosjektomfanget etter godkjent tilbud kan medføre
                tilleggskostnader som avtales skriftlig.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                3. Priser og betaling
              </h2>
              <p className="mt-3">
                Alle priser oppgis ekskludert merverdiavgift (25 %) med mindre
                annet er spesifisert. Betalingsmodellen er som følger: 30 % ved
                oppstart, 40 % ved godkjent design, og 30 % ved lansering. For
                driftsavtaler faktureres månedlig eller årlig etter avtale.
                Betalingsfrist er 14 dager fra fakturadato. Ved forsinket
                betaling påløper forsinkelsesrente i henhold til
                forsinkelsesrenteloven.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                4. Eierskap og rettigheter
              </h2>
              <p className="mt-3">
                Kunden eier alt innhold (tekst, bilder, logoer) som kunden
                leverer til prosjektet. Ved fullstendig betaling overføres
                eierskapet til den skreddersydde koden og designet til kunden.
                Vi forbeholder oss retten til å bruke prosjektet som referanse i
                vår portefølje med mindre annet er avtalt. Tredjepartsverktøy,
                programvare og lisenser som brukes i prosjektet forblir
                underlagt sine respektive lisensvilkår.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                5. Driftsavtale og vedlikehold
              </h2>
              <p className="mt-3">
                Driftsavtaler har ingen bindingstid og kan sies opp med én
                måneds skriftlig varsel. Driftsavtalen dekker hosting,
                sikkerhetskopier, programvareoppdateringer og support som
                spesifisert i den individuelle avtalen. Vi garanterer 99,9 %
                oppetid for hosting, med unntak av planlagt vedlikehold som
                varsles minst 48 timer i forveien.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                6. Kundens ansvar
              </h2>
              <p className="mt-3">
                Kunden er ansvarlig for å levere innhold (tekst, bilder, logoer
                og annet materiale) innen avtalte frister. Forsinkelser i
                innholdsleveranse fra kunden kan medføre tilsvarende forsinkelse
                i leveransen. Kunden er ansvarlig for at materiale som leveres
                til oss ikke krenker tredjeparters opphavsrett eller andre
                rettigheter.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                7. Godkjenning og revisjoner
              </h2>
              <p className="mt-3">
                Prosjekter inkluderer inntil to revideringsrunder etter
                presentert design. Ytterligere revisjoner faktureres etter
                medgått tid. Kunden har 10 virkedager til å gi tilbakemelding på
                presentert arbeid. Manglende tilbakemelding innen fristen anses
                som godkjenning.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                8. Angrerett og kansellering
              </h2>
              <p className="mt-3">
                For skreddersydde tjenester gjelder ikke lovbestemt angrerett i
                henhold til angrerettloven, da tjenestene er tilpasset kundens
                spesifikke behov. Ved kansellering av prosjektet etter oppstart
                faktureres utført arbeid i henhold til prosjektets
                fremdriftsplan. Innbetalt forskudd for ikke-utført arbeid
                refunderes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                9. Ansvarsbegrensning
              </h2>
              <p className="mt-3">
                Vi leverer tjenester av høy kvalitet og i henhold til avtalt
                spesifikasjon. Vårt totale erstatningsansvar er begrenset til
                det beløpet kunden har betalt for den aktuelle tjenesten. Vi er
                ikke ansvarlige for indirekte tap, følgeskader, tapt fortjeneste
                eller tap av data. Vi er ikke ansvarlige for tredjepartstjenester
                som hosting, domeneregistrering eller betalingsformidling utover
                rimelig oppfølging.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                10. Konfidensialitet
              </h2>
              <p className="mt-3">
                Begge parter forplikter seg til å behandle konfidensiell
                informasjon mottatt fra den andre parten fortrolig.
                Konfidensialitetsplikten gjelder også etter at avtaleforholdet
                er avsluttet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                11. Tvister
              </h2>
              <p className="mt-3">
                Eventuelle tvister som oppstår i forbindelse med disse vilkårene
                skal forsøkes løst i minnelighet. Dersom partene ikke kommer til
                enighet, skal tvisten avgjøres ved de alminnelige domstolene i
                Norge med selskapets hjemsted som verneting. Norsk lov kommer
                til anvendelse.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[var(--color-text)]">
                12. Kontakt
              </h2>
              <p className="mt-3">
                For spørsmål om vilkårene, ta kontakt med oss:
              </p>
              <p className="mt-2">
                IDweb
                <br />
                E-post: hei@idweb.no
                <br />
                Telefon: +47 123 45 678
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
