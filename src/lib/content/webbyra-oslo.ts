import type { LocalInfo, Service } from "@/types";

/**
 * /webbyra-oslo — targets "webbyrå oslo", which Google treats as a different
 * search from "webutvikler oslo" (the two top-10s share one result). The
 * webutvikler page keeps its own keyword; this page links to it rather than
 * repeating it.
 *
 * Honesty rules: IDweb is Oslo-based and delivers
 * digitally — no visitable office, no invented Oslo clients, and no IDweb
 * price figures (removed site-wide in 4a99b55). The price guide quotes
 * market ranges only, labelled as such, matching the blog's price article.
 */

export const WEBBYRA_OSLO_SEO = {
  title: "Webbyrå i Oslo — skreddersydde nettsider for bedrifter",
  description:
    "IDweb er et Oslo-basert webbyrå som bygger raske, skreddersydde nettsider og nettbutikker for bedrifter. Fastpris før vi starter, ingen bindingstid, og du eier siden.",
} as const;

export const WEBBYRA_OSLO: Service = {
  id: "webbyra-oslo",
  title: "Webbyrå i Oslo",
  shortDescription:
    "Vi er et lite, Oslo-basert webbyrå som designer og koder nettsider og nettbutikker for bedrifter. Du snakker direkte med den som bygger siden, får fastpris før vi starter, og eier alt når vi er ferdige.",
  longDescription: "",
  categoryTag: "Oslo",
  features: [],
  detailedFeatures: [],
  painPoints: [],
  processSteps: [
    { step: 1, title: "Gratis samtale", description: "Et uforpliktende videomøte. Vi går gjennom bedriften, målene og nettsiden du har i dag, og sier ærlig om vi er riktig byrå for jobben." },
    { step: 2, title: "Tilbud med fastpris", description: "Du får et skriftlig tilbud med omfang, tidsplan og fast pris. Prisen endrer seg ikke underveis med mindre du selv ber om mer." },
    { step: 3, title: "Design og utvikling", description: "Du ser en prototype tidlig og gir tilbakemelding før vi koder. Siden bygges i Next.js og testes på mobil, nettbrett og PC." },
    { step: 4, title: "Lansering og overlevering", description: "Vi kobler til domenet, setter opp Google Search Console og overleverer koden. Vil du ha drift etterpå, er det en egen avtale uten bindingstid." },
  ],
  faq: [
    {
      question: "Hva koster et webbyrå i Oslo?",
      answer:
        "I det norske markedet koster en enkel bedriftsnettside typisk 15 000–40 000 kr, og en større side 40 000–80 000 kr. Hos IDweb får du en fast pris etter en gratis samtale, før noe arbeid starter. Prisen avhenger av antall sider, design og funksjoner som booking eller nettbutikk.",
    },
    {
      question: "Har IDweb kontor i Oslo?",
      answer:
        "Vi er Oslo-baserte, men har ikke et kontor du kan besøke. Oppstart, presentasjoner og oppfølging skjer på video, telefon og e-post. Det sparer reisetid for begge, og vi jobber like gjerne med bedrifter utenfor Oslo.",
    },
    {
      question: "Hva er forskjellen på et webbyrå og en webutvikler?",
      answer:
        "Et webbyrå tar ansvar for hele leveransen: rådgivning, design, utvikling, lansering og ofte drift. En webutvikler skriver koden. Hos IDweb er det de samme personene, så du slipper prosjektledere og mellomledd.",
    },
    {
      question: "Hvor lang tid tar det å lage en nettside?",
      answer:
        "En enkel bedriftsnettside tar som regel rundt to uker fra godkjent tilbud. Større sider med flere undersider og funksjoner tar fire til seks uker.",
    },
    {
      question: "Eier vi nettsiden når den er ferdig?",
      answer:
        "Ja. Du eier koden, designet og innholdet, og det er ingen bindingstid. Vil du bytte leverandør senere, tar du med deg alt.",
    },
    {
      question: "Bygger dere i WordPress?",
      answer:
        "Nei, vi bygger i Next.js. Det gir raske sider og god kontroll på SEO. Vil du redigere alt innhold selv i et tradisjonelt publiseringsverktøy, passer WordPress ofte bedre, og det sier vi fra om i første samtale.",
    },
  ],
  trustStats: [],
};

/** Oslo facts: SSB / Wikipedia, 2024–2025. Districts are Oslo's 15 bydeler. */
export const OSLO_LOCAL: LocalInfo = {
  region: "Oslo",
  intro:
    "Oslo er både kommune og fylke, og landets største arbeidsmarked. Her ligger flest hovedkontorer i Norge, og konkurransen om kundene er hard i nesten alle bransjer, fra advokater og regnskapsførere i sentrum til håndverkere og klinikker i bydelene. Når en kunde sammenligner tre leverandører på mobilen, vinner ofte den nettsiden som laster raskt og svarer tydelig på hva det koster og hvordan man bestiller.",
  facts: [
    { label: "Innbyggere", value: "~720 000" },
    { label: "Bydeler", value: "15" },
    { label: "Status", value: "Kommune og fylke" },
    { label: "Næringsliv", value: "Tjenester, handel, tech" },
  ],
  areas: [
    "Alna",
    "Bjerke",
    "Frogner",
    "Gamle Oslo",
    "Grorud",
    "Grünerløkka",
    "Nordre Aker",
    "Nordstrand",
    "Sagene",
    "St. Hanshaugen",
    "Stovner",
    "Søndre Nordstrand",
    "Ullern",
    "Vestre Aker",
    "Østensjø",
  ],
};

/** Typical Norwegian market ranges, the same figures as the blog's price guide. */
export const PRICE_GUIDE = {
  rows: [
    { label: "Enkel bedriftsnettside", detail: "3–5 sider: forside, tjenester, om oss, kontakt", range: "15 000 – 40 000 kr" },
    { label: "Større bedriftsnettside", detail: "5–15 sider, integrasjoner og mer avansert design", range: "40 000 – 80 000 kr" },
    { label: "Nettbutikk", detail: "Inntil rundt 100 produkter, betaling og frakt", range: "30 000 – 70 000 kr" },
    { label: "Avansert nettbutikk", detail: "Flere hundre produkter, kundeportal, integrasjoner", range: "70 000 – 200 000+ kr" },
  ],
  footnote:
    "Typiske markedspriser i Norge, eks. mva. Dette er ikke IDwebs prisliste. Du får vår faste pris etter en gratis samtale.",
  guideHref: "/blogg/hva-koster-en-nettside",
} as const;

/** Everything the agency does, linked into the rest of the site. */
export const AGENCY_SERVICES = [
  { href: "/tjenester/nettside", tag: "Nettsider", title: "Skreddersydd nettside", description: "Design og kode fra bunnen av, uten ferdigmaler. Rask på mobil og bygget for Google." },
  { href: "/tjenester/nettbutikk", tag: "Nettbutikk", title: "Egen nettbutikk", description: "Egen nettbutikk med trygg betaling, uten månedlige plattformavgifter." },
  { href: "/tjenester/seo", tag: "SEO", title: "Synlighet i Google", description: "Teknisk SEO, innhold og Google-bedriftsprofil, så kundene i Oslo finner deg." },
  { href: "/tjenester/vedlikehold", tag: "Drift", title: "Drift og vedlikehold", description: "Oppdateringer, sikkerhetskopier og endringer. Kan sies opp med én måneds varsel." },
  { href: "/referanser", tag: "Referanser", title: "Nettsider vi har levert", description: "Se nettsidene vi har laget for tannleger, legekontor, trossamfunn og kultursentre." },
  { href: "/tjenester/webutvikler-oslo", tag: "Utvikling", title: "Webutvikler i Oslo", description: "Trenger du bare utvikling? Du snakker direkte med den som skriver koden." },
] as const;
