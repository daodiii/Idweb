/* Case pages under /referanser/<slug>. Every picture is a screenshot of the client's own site (17 Oct 2026),
   and every sentence about what was built is traced to the client's repo (automk, kongsvinger-tannhelse). */

export type CaseStep = {
  /** File in /images/kunder/<slug>/, without .webp (1600×1000). */
  img: string;
  title: string;
  text: string;
};

export type ClientCase = {
  slug: string;
  name: string;
  /** The hero sentence, also the page's h1. */
  headline: string;
  lede: string;
  /** Where «Besøk siden» goes, and the host shown in the browser bar. */
  url: string;
  host: string;
  steps: CaseStep[];
  /** What a visitor never sees but the site does for the client. */
  behind: string[];
  metaTitle: string;
  metaDescription: string;
};

export const CASES: ClientCase[] = [
  {
    slug: "mk-auto",
    name: "MK Auto",
    headline: "Et showroom på nett.",
    lede: "MK Auto selger håndplukkede bruktbiler fra et lokale i Oslo. Siden skulle kjennes som å gå inn døra der: mørkt lokale, røde detaljer og bilene i front.",
    url: "https://www.mk-auto.no",
    host: "mk-auto.no",
    steps: [
      { img: "fire-maater", title: "Fire måter å bytte bil på", text: "Kjøp, salg, kommisjon og innbytte har hver sin inngang fra forsiden og hver sin side." },
      { img: "bilside", title: "En egen side for hver bil", text: "Bilder, pris, nøkkeltall og utstyr. Meldingen kunden sender, vet hvilken bil den gjelder. Solgte biler får et tydelig stempel." },
      { img: "alle-biler", title: "Hele lageret på én side", text: "Søk på modell, filtrer på merke og karosseri, og sorter med de nyeste først. De samme bilene ligger på Finn." },
      { img: "bilsok", title: "Fant du ikke bilen?", text: "Kunden forteller hva de ser etter, så leter MK Auto. Merke, modell, karosseri og makspris i ett skjema." },
      { img: "omtaler", title: "Kundenes egne ord", text: "Omtalene på forsiden er skrevet av kunder som har kjøpt bil der." },
      { img: "selg-bilen", title: "Vi kjøper bilen din", text: "En egen side for dem som vil selge, med tre steg og et skjema for bilen." },
      { img: "om-oss", title: "Et sted bilfolk trives", text: "Om oss forteller hvem de er, og inviterer innom for å prate bil." },
    ],
    behind: [
      "Hver bilside forteller Google hvilken bil det er og hva den koster.",
      "Kartet over sidene til Google lages ut fra bilene på lager.",
      "Skjemaene sender rett til e-posten deres.",
      "Statistikk bare når den besøkende har sagt ja.",
    ],
    metaTitle: "MK Auto: et showroom på nett",
    metaDescription: "Slik laget vi nettsiden til MK Auto, bruktbilforhandleren i Oslo: en egen side for hver bil, hele lageret med filter, bilsøk og salg av bilen din.",
  },
  {
    slug: "kongsvinger-tannhelse",
    name: "Kongsvinger Tannhelse",
    headline: "Tannlegen ved Glomma.",
    lede: "Kongsvinger Tannhelse er tannlegene Hafthun og Zia i Fjellgata 4. Den nye siden viser byen fra festningen, om klinikken er åpen akkurat nå, og alle behandlingene forklart på vanlig norsk.",
    url: "https://kongsvinger-tannhelse.vercel.app",
    host: "kongsvingertannhelse.no",
    steps: [
      { img: "festningen", title: "Byen fra festningen", text: "Kongsvinger er tegnet slik den ser ut fra festningen, med Glomma og brua. Nederst på hver side er det kveld over brua." },
      { img: "folderen", title: "Behandlingene som en folder", text: "Forsiden bretter ut de vanligste behandlingene, hver med sin egen tegning." },
      { img: "behandlinger", title: "Alle 25 behandlingene", text: "En oppslagsbok med søk, delt i ordinære, akutte og estetiske behandlinger." },
      { img: "tannimplantat", title: "Tegnet steg for steg", text: "23 behandlinger har sin egen side, med tegninger i egen farge som viser hva som skjer i stolen." },
      { img: "teamet", title: "Folkene først", text: "Tannlegene og tannpleieren med navn og bilde, og det klinikken står for." },
      { img: "rad-og-tips", title: "Råd og tips", text: "Artikler for pasienter, fra vondt i tanna til hva Helfo dekker." },
      { img: "kontakt", title: "Et brev til klinikken", text: "Kontaktskjemaet er skrevet som et brev, med poststempel. Akutt tannpine står først, med telefonnummeret." },
    ],
    behind: [
      "Alt innholdet fra den gamle siden er hentet og skrevet om på vanlig norsk.",
      "Lenker til den gamle siden sender folk videre til riktig ny side.",
      "«Åpent nå» regnes ut fra åpningstidene, også på helligdager.",
      "Delingsbilde, metadata og personvernside er på plass.",
    ],
    metaTitle: "Kongsvinger Tannhelse: tannlegen ved Glomma",
    metaDescription: "Slik laget vi nettsiden til Kongsvinger Tannhelse: byen tegnet fra festningen, åpent nå, og alle 25 behandlingene forklart på vanlig norsk.",
  },
];

export const getCase = (slug: string) => CASES.find((c) => c.slug === slug);

/** The client after this one, for «Neste» at the bottom of the page. */
export const nextCase = (slug: string) => CASES[(CASES.findIndex((c) => c.slug === slug) + 1) % CASES.length];
