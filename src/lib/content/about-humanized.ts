// Om oss, told by a person: the copy behind the three mockups (/om-oss/forslag-a, -b and -c).
// Same facts as about.ts (what IDweb believes, who it has built for, how it works), in the plain spoken
// voice of the rest of the redesigned site: «vi» and «du», short sentences, concrete nouns, no filler.
// Nothing new is claimed. When one mockup is chosen, this file replaces about.ts.

export const OM_HERO = {
  crumb: "Om oss",
  headline: "Vi lager nettsider som faktisk gjør jobben.",
  lede: "IDweb er en norsk webutvikler i Oslo. Vi bygger nettsider for bedrifter som vil bli funnet og få henvendelser, ikke bare ha en pen forside.",
  primary: "Ta kontakt",
  secondary: "Se prosjekter",
} as const;

/** The three things the home page's hero already promises, said again where a visitor decides whether to trust us. */
export const OM_PROMISES = [
  { title: "Fastpris før vi starter", text: "Du vet hva det koster før vi skriver én linje kode." },
  { title: "Ingen bindingstid", text: "Du kan si opp når som helst. Vi vil at du blir fordi det funker." },
  { title: "Du snakker med den som bygger", text: "Ingen selger i mellom. Spørsmålene dine går rett til dem som kan svare." },
] as const;

export const OM_STORY = {
  eyebrow: "Historien",
  heading: "Hvorfor vi startet IDweb.",
  paragraphs: [
    "Vi startet IDweb fordi vi så det samme igjen og igjen. Bedrifter som hadde betalt mye for en nettside som ingen fant. Eller for en løsning så teknisk at de aldri forsto hva de hadde kjøpt. Det ville vi gjøre annerledes.",
    "Siden har vi bygget for helseklinikker, kultursentre og tannlegekontorer. Ulike bransjer, samme ønske: en nettside som jobber for dem, ikke mot dem.",
    "I dag gjør vi det samme som første dag. Ærlig arbeid, moderne teknologi og resultater du kan måle.",
  ],
  pullQuote: "Ikke en pen side som ingen finner, men en side som gir deg henvendelser.",
} as const;

export const OM_VALUES = {
  eyebrow: "Det vi tror på",
  heading: "Fire ting vi ikke går på akkord med.",
  intro: "De styrer hvert prosjekt, fra første samtale til lansering og videre.",
  items: [
    {
      title: "Resultater først",
      text: "Før vi tegner noe, spør vi: gir dette flere kunder? Pent design er fint. Design som får folk til å ta kontakt er bedre. Vi måler det i henvendelser, salg og synlighet, ikke i piksler.",
    },
    {
      title: "Ærlig og tydelig",
      text: "Ingen skjulte kostnader og ingen bindingstid. Trenger du ikke det dyreste alternativet, sier vi det.",
    },
    {
      title: "Vi blir værende",
      text: "Vi vil ikke være leverandøren du glemmer etter lansering. Vi tar oss av vedlikehold, rådgivning og videreutvikling, så siden holder tritt med bedriften din.",
    },
    {
      title: "Ingen snarveier",
      text: "Rask lastetid, god mobilvisning, sikkerhet og SEO er ikke tilvalg. De følger med i alt vi leverer, og vi publiserer ikke noe vi ikke selv ville stått inne for.",
    },
  ],
} as const;

export const OM_APPROACH = {
  eyebrow: "Slik jobber vi",
  heading: "Du kjenner bedriften. Vi kjenner nettet.",
  intro: "Ingen ferdigmaler. Hver nettside starter med en prat og ender med noe laget for akkurat din bedrift.",
  steps: [
    {
      title: "Vi starter med en prat",
      text: "Vi vil vite hvem kundene dine er, hvem du konkurrerer mot og hva du vil ha ut av siden. Det er her alt avgjøres.",
    },
    {
      title: "Vi tegner og bygger",
      text: "Så designer og koder vi noe til din bedrift, ikke en mal med ny logo. Du ser fremdriften underveis.",
    },
    {
      title: "Du sier ifra",
      text: "Stemmer noe ikke, justerer vi kursen. Det er tross alt din bedrift og din nettside.",
    },
  ],
} as const;

export const OM_CLIENTS = {
  eyebrow: "Dem vi har bygget for",
  heading: "Klinikker, kultursentre og tannleger.",
  text: "Se hva vi har laget, og hva kundene selv sier om oss.",
  link: "Se alle prosjektene",
} as const;

export const OM_CTA = {
  title: "La oss ta en prat.",
  text: "Ingen salgstale og ingen forpliktelser. Fortell oss hva du trenger, så sier vi ærlig om vi kan hjelpe.",
  button: "Ta kontakt",
} as const;
