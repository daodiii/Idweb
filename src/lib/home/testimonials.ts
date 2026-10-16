/**
 * Client testimonials for the homepage, in the clients' own words as they sent them (2026-10-16). Never edit, shorten
 * or polish a quote; each array item is one of the client's paragraphs. Quotes are attributed to the organisation only.
 */

export type Testimonial = {
  id: "centerrahma" | "iqra" | "brobekk" | "ringebu";
  client: string;
  quote: string[];
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "centerrahma",
    client: "Center Rahma",
    quote: [
      "Vi er svært fornøyde med tjenesten levert av IDweb. De var proaktive og løsningsorienterte gjennom hele prosessen. Vi trengte kun å gi en enkel overordnet beskrivelse av våre behov, og de tok ansvar for resten, både når det gjaldt design og funksjonalitet. Responsen var rask, og de kom selv med gode forslag og ideer til forbedringer av nettsiden. Resultatet overgikk våre forventninger, og vi kan derfor varmt anbefale IDweb.",
    ],
  },
  {
    id: "iqra",
    client: "Iqra Senter",
    quote: [
      "Vi visste ikke helt hva vi trengte – bare at nettsiden vår trengte en forbedring. IDweb tok det derfra. De stilte de riktige spørsmålene, kom med egne ideer og dro prosessen fremover uten at vi trengte å ha alle svarene selv.",
      "Vi er kjempefornøyde med resultatet.",
      "Anbefales på det sterkeste.",
    ],
  },
  {
    id: "brobekk",
    client: "Brobekk Legekontor",
    quote: [
      "Jeg er svært fornøyd med samarbeidet med IDweb. De gjorde hele prosessen enkel og oversiktlig, kom med gode forslag underveis og tok ansvar for både design og funksjonalitet. Responsen var rask, og jeg følte meg godt ivaretatt fra start til slutt.",
      "Nettsiden ble enda bedre enn jeg hadde sett for meg, og jeg kan uten tvil anbefale IDweb til andre som ønsker en profesjonell og pålitelig leverandør.",
    ],
  },
  {
    id: "ringebu",
    client: "Ringebu Tannlegesenter",
    quote: [
      "IDweb ga oss en side langt over det vi kunne ha forventet. En autentisk nettside som representerer byen og yrket vårt. Med herlige animasjoner og tegninger tilpasset tannleger, fikk vi en nettside vi tror ingen andre har sett maken til.",
    ],
  },
];
