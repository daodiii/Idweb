import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vilkår og betingelser",
  description:
    "Les våre vilkår og betingelser for bruk av nettsiden og tjenestene til IDweb.",
  alternates: {
    canonical: "/vilkar",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
        avtalen. Vi tilstreber høy oppetid for hosting via pålitelige norske
        servere, med unntak av planlagt vedlikehold som varsles minst 48 timer
        i forveien.
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
        10 virkedager til å gi tilbakemelding på presentert arbeid. Manglende
        tilbakemelding innen fristen anses som godkjenning.
      </p>
    ),
  },
  {
    num: "08",
    heading: "Angrerett og kansellering",
    body: (
      <p>
        For skreddersydde tjenester gjelder ikke lovbestemt angrerett i henhold
        til angrerettloven, da tjenestene er tilpasset kundens spesifikke
        behov. Ved kansellering av prosjektet etter oppstart faktureres utført
        arbeid i henhold til prosjektets fremdriftsplan. Innbetalt forskudd for
        ikke-utført arbeid refunderes.
      </p>
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
        selskapets hjemsted som verneting. Norsk lov kommer til anvendelse.
      </p>
    ),
  },
  {
    num: "12",
    heading: "Kontakt",
    body: (
      <>
        <p>For spørsmål om vilkårene, ta kontakt med oss:</p>
        <p className="mt-3">
          IDweb v/ Daod Ilyas
          <br />
          Org.nr: 837 228 972
          <br />
          E-post:{" "}
          <a
            href="mailto:hei@idweb.no"
            className="underline decoration-[#F4CE14] decoration-2 underline-offset-4 transition-colors hover:decoration-[#FFE15D]"
          >
            hei@idweb.no
          </a>
          <br />
          Telefon:{" "}
          <a
            href="tel:+4798406164"
            className="underline decoration-[#F4CE14] decoration-2 underline-offset-4 transition-colors hover:decoration-[#FFE15D]"
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
    <div className="bg-[var(--color-dark-bg)]">
      {/* Editorial hero */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 82% 22%, rgba(244,206,20,0.13), transparent 62%)",
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
            Vilkår
          </p>

          <h1 className="mt-7 font-serif text-white">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Vilkår for
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              våre{" "}
              <span className="relative inline-block">
                tjenester
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
              Det vi avtaler.
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
