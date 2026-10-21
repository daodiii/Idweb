import { quoteSentence, type Testimonial } from "@/lib/home/testimonials";

/**
 * Om oss, «Med kundenes ord»: the clients describe IDweb, and the page explains what each of their words means
 * for a new customer. Every quoted sentence goes through quoteSentence, so it is always the client's own wording.
 */

export const ABOUT_HERO = {
  kicker: "Iqra Senter om å jobbe med oss",
  headline: quoteSentence("iqra", "IDweb tok det derfra."),
  lede:
    "Vi er IDweb, et webbyrå i Oslo. Vi kunne skrevet mye om oss selv, men kundene våre vet best hvordan vi er å jobbe med. Så vi lar dem fortelle.",
} as const;

export type AboutChapter = {
  client: Testimonial["id"];
  name: string;
  theme: string;
  quote: string;
  title: string;
  text: string;
};

export const ABOUT_CHAPTERS: AboutChapter[] = [
  {
    client: "centerrahma",
    name: "Center Rahma",
    theme: "Initiativ",
    quote: quoteSentence("centerrahma", "De var proaktive og løsningsorienterte gjennom hele prosessen."),
    title: "Vi kommer med forslagene.",
    text: "Du skal ikke måtte dra prosjektet selv. Vi foreslår løsninger, sier fra når noe kan gjøres bedre, og svarer raskt når du lurer på noe.",
  },
  {
    client: "iqra",
    name: "Iqra Senter",
    theme: "Trygghet",
    quote: quoteSentence("iqra", "Vi visste ikke helt hva vi trengte – bare at nettsiden vår trengte en forbedring."),
    title: "Du trenger ikke ha alle svarene.",
    text: "De fleste vet bare at nettsiden ikke fungerer. Det holder. Vi stiller spørsmålene, kommer med ideer og drar prosessen fremover.",
  },
  {
    client: "ringebu",
    name: "Ringebu Tannlegesenter",
    theme: "Eget uttrykk",
    quote: quoteSentence("ringebu", "En autentisk nettside som representerer byen og yrket vårt."),
    title: "Ingen maler.",
    text: "Hver side starter på et blankt ark og skal ligne bedriften, ikke oss. Kongsvinger Tannhelse fikk byen sin tegnet inn i forsiden, slik den ser ut fra festningen.",
  },
  {
    client: "brobekk",
    name: "Brobekk Legekontor",
    theme: "Oversikt",
    quote: quoteSentence(
      "brobekk",
      "De gjorde hele prosessen enkel og oversiktlig, kom med gode forslag underveis og tok ansvar for både design og funksjonalitet.",
    ),
    title: "Alt er avtalt før vi starter.",
    text: "Du ser hva som er med, hva som er valgt bort og hva det koster, før vi skriver en linje kode. Og vi blir med videre etter lansering.",
  },
];

/** Steps in the Iqra chapter: how a project gets going when the client does not yet know what they need. */
export const ABOUT_START_STEPS = [
  { title: "Du forteller", text: "om bedriften" },
  { title: "Vi foreslår", text: "løsningen" },
  { title: "Du godkjenner", text: "før vi bygger" },
] as const;

/** The agreement card in the Brobekk chapter; the same terms the homepage promises. */
export const ABOUT_TERMS = [
  { label: "Pris", value: "Fast, avtalt før vi starter" },
  { label: "Bindingstid", value: "Ingen" },
  { label: "Etter lansering", value: "Hjelp når du trenger det" },
] as const;

export const ABOUT_WHO = {
  kicker: "Kundene skriver «de». Her er hvem «de» er.",
  heading: "Et webbyrå i Oslo, startet for å gjøre det enklere.",
  paragraphs: [
    "Vi startet IDweb fordi for mange bedrifter betalte for nettsider som aldri ga noe tilbake: pene sider ingen fant, og dyre løsninger ingen forsto.",
    "I dag lager vi nettsider, timebestilling, nettbutikker, kundeportaler og AI-chatboter for norske bedrifter. Og du snakker med den som bygger.",
  ],
} as const;

export const ABOUT_CTA = {
  headline: "Bli den neste som anbefaler oss.",
  description: "Book en gratis prat. Du trenger ikke vite hva du trenger, det finner vi ut sammen.",
  buttonText: "Book en gratis prat",
} as const;
