/**
 * Genuinely-local substance for the geo landing pages.
 *
 * The geo pages used to be one template with the place name swapped — the
 * classic doorway-page pattern. This layer gives each page real, verifiable,
 * location-specific content that can't be templated: public facts (population,
 * travel-from-Oslo, the local economy), the districts we cover, and a tailored
 * set of industries that matches the town's actual business mix (which also
 * cross-links into the /nettside/[bransje] pages).
 *
 * Facts are public and verifiable (SSB / Wikipedia, 2024–2025). IDweb is
 * Oslo-based, serves the area DIGITALLY — framing stays honest (no physical meetings),
 * with no implied local office or invented local clients.
 */

export interface LocalFact {
  label: string;
  value: string;
}

export interface LocalInfo {
  /** Region descriptor used in copy ("Romerike", "Follo", "Buskerud"). */
  region: string;
  /** Unique local context — the area, its districts and its economy. */
  intro: string;
  /** Spec-sheet facts. Verifiable, unique per town. */
  facts: LocalFact[];
  /** Districts/areas we cover — rendered as a coverage list. */
  areas: string[];
  /** One line on the local business character (heads the industry grid). */
  businessNote: string;
  /** Industry slugs (from INDUSTRIES) that match the local economy — cross-links. */
  industries: string[];
}

export const LOCATION_LOCAL: Record<string, LocalInfo> = {
  baerum: {
    region: "Akershus",
    intro:
      "Bærum er Norges femte største kommune og et av landets mest næringstette områder. Tyngdepunktet ligger vest for Oslo: Fornebu og Lysaker huser teknologi- og hovedkontormiljøer som Telenor og Aker, mens Sandvika er regionsenteret for handel og tjenesteyting. Her er kundene vant til gjennomarbeidede merkevarer — en treg, malbasert nettside skiller seg negativt ut.",
    facts: [
      { label: "Innbyggere", value: "~130 000" },
      { label: "Fra Oslo", value: "~12 min fra Sandvika" },
      { label: "Sentrum", value: "Sandvika" },
      { label: "Næringsliv", value: "Tech, finans, tjenester" },
    ],
    areas: ["Sandvika", "Fornebu", "Lysaker", "Bekkestua", "Stabekk", "Høvik", "Rud", "Kolsås"],
    businessNote:
      "Bærum er tungt på profesjonelle tjenester og rådgivning. Dette er bransjene vi oftest bygger nettsider for her:",
    industries: ["advokat", "regnskapsforer", "tannlege", "eiendomsmegler", "optiker", "fysioterapeut"],
  },
  asker: {
    region: "Akershus",
    intro:
      "Asker passerte 100 000 innbyggere i 2024 og er nå landets åttende største kommune, etter sammenslåingen med Røyken og Hurum. Næringslivet spenner bredt — fra tjenesteyting og handel i Asker sentrum, via industriarven på Slemmestad, til et stort innslag av småbedrifter og håndverkere langs kysten mot Hurumlandet. Spredt geografi gjør lokal synlighet i Google ekstra viktig.",
    facts: [
      { label: "Innbyggere", value: "~100 000" },
      { label: "Fra Oslo", value: "~22 min med tog" },
      { label: "Sentrum", value: "Asker sentrum" },
      { label: "Næringsliv", value: "Handel, industri, tjenester" },
    ],
    areas: ["Asker sentrum", "Heggedal", "Holmen", "Vollen", "Slemmestad", "Røyken", "Sætre", "Tofte"],
    businessNote:
      "Med et bredt og spredt næringsliv er det de lokale tjeneste- og håndverksbedriftene som vinner mest på å bli funnet. Mest aktuelt i Asker:",
    industries: ["tannlege", "frisor", "eiendomsmegler", "byggefirma", "regnskapsforer", "renhold"],
  },
  lillestrom: {
    region: "Romerike",
    intro:
      "Lillestrøm er knutepunktet på Romerike og Akershus' tredje største kommune. Byen kombinerer et tett handels- og håndverksmiljø med logistikk mot Gardermoen, Norges Varemesse og forsknings- og teknologimiljøet på Kjeller. Det er en by full av aktive små- og mellomstore bedrifter — og hard konkurranse om de lokale søkene.",
    facts: [
      { label: "Innbyggere", value: "95 762" },
      { label: "Fra Oslo", value: "~10 min med tog" },
      { label: "Sentrum", value: "Lillestrøm by" },
      { label: "Næringsliv", value: "Håndverk, handel, logistikk" },
    ],
    areas: ["Lillestrøm", "Strømmen", "Skedsmokorset", "Kjeller", "Sørumsand", "Frogner", "Lørenskog grense"],
    businessNote:
      "Romerike har en stor base av håndverkere og servicebedrifter. Dette er bransjene vi oftest hjelper i Lillestrøm-området:",
    industries: ["elektriker", "rorlegger", "byggefirma", "bilverksted", "renhold", "treningssenter"],
  },
  lorenskog: {
    region: "Romerike",
    intro:
      "Lørenskog ligger tett inntil Oslo, midt mellom hovedstaden og Lillestrøm, og er en av regionens raskest voksende kommuner. Handelen er sterk rundt Metro og Triaden, og kommunen har trukket til seg alt fra service og logistikk til opplevelser som SNØ. Nærheten til Oslo betyr at både lokale kunder og hovedstadskunder er innen rekkevidde.",
    facts: [
      { label: "Innbyggere", value: "~50 000" },
      { label: "Fra Oslo", value: "~15 min" },
      { label: "Sentrum", value: "Lørenskog (Kjenn)" },
      { label: "Næringsliv", value: "Handel, service, logistikk" },
    ],
    areas: ["Lørenskog sentrum", "Metro", "Skårer", "Visperud", "Fjellhamar", "Rasta", "Løkenåsen"],
    businessNote:
      "Et handels- og servicetungt nærområde gjør forbrukerrettede bedrifter ekstra avhengige av synlighet. Mest aktuelt i Lørenskog:",
    industries: ["frisor", "tannlege", "treningssenter", "bilverksted", "restaurant", "renhold"],
  },
  drammen: {
    region: "Buskerud",
    intro:
      "Drammen er Buskeruds desidert største kommune og landets sjuende største, midtpunktet i en av Norges raskest voksende byregioner. Elvebyen var tradisjonelt en industriby; i dag er varehandel den største næringen, med stor engros- og bilimport over Drammen havn. Industri og bygg er fortsatt sterkt rundt Holmen, Brakerøya og Kobbervikdalen — et marked der seriøsitet på nett teller.",
    facts: [
      { label: "Innbyggere", value: "105 042" },
      { label: "Fra Oslo", value: "~35 min med tog" },
      { label: "Sentrum", value: "Bragernes & Strømsø" },
      { label: "Næringsliv", value: "Varehandel, industri, bygg" },
    ],
    areas: ["Bragernes", "Strømsø", "Gulskogen", "Åssiden", "Konnerud", "Mjøndalen", "Krokstadelva", "Svelvik"],
    businessNote:
      "Et marked tungt på handel, bygg og bil belønner bedrifter som ser solide ut på nett. Bransjene vi oftest bygger for i Drammen:",
    industries: ["byggefirma", "bilverksted", "elektriker", "eiendomsmegler", "rorlegger", "restaurant"],
  },
  ski: {
    region: "Follo",
    intro:
      "Ski er administrasjonssenteret i Nordre Follo, kommunen som ble til da Ski og Oppegård slo seg sammen. Med Follobanen tar toget fra Ski til Oslo S i overkant av ti minutter, noe som har gjort området til et voksende bo- og handelssenter — fra Ski Storsenter til Kolbotn. Et lokalmarked i vekst betyr stadig flere bedrifter som kjemper om de samme kundene.",
    facts: [
      { label: "Innbyggere", value: "~62 000" },
      { label: "Fra Oslo", value: "~11 min (Follobanen)" },
      { label: "Sentrum", value: "Ski" },
      { label: "Næringsliv", value: "Handel, service, håndverk" },
    ],
    areas: ["Ski", "Kolbotn", "Langhus", "Oppegård", "Siggerud", "Greverud", "Myrvoll"],
    businessNote:
      "Et raskt voksende handels- og servicemarked gir lokale bedrifter mye å hente på god synlighet. Mest aktuelt i Ski og Nordre Follo:",
    industries: ["tannlege", "frisor", "fysioterapeut", "treningssenter", "eiendomsmegler", "optiker"],
  },
};

export function getLocalInfo(slug: string): LocalInfo | undefined {
  return LOCATION_LOCAL[slug];
}
