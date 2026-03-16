import type { Service } from "@/types";

export const SERVICES_PAGE = {
  headline: "Tjenester som gir bedriften din vekst",
  subheadline:
    "Jeg tilbyr alt du trenger for å lykkes digitalt — fra skreddersydde nettsider til synlighet i søkemotorer og løpende vedlikehold.",
} as const;

export const SERVICES: Service[] = [
  {
    id: "nettside",
    title: "Skreddersydd nettside",
    shortDescription:
      "En profesjonell nettside designet for å tiltrekke kunder og bygge tillit til merkevaren din.",
    longDescription:
      "Hver bedrift er unik, og nettsiden din bør gjenspeile det. Jeg designer og utvikler skreddersydde nettsider fra bunnen av — ingen ferdigmaler, ingen kompromisser. Hver side bygges med fokus på hastighet, søkemotoroptimalisering og brukervennlighet. Resultatet er en nettside som ikke bare ser bra ut, men som faktisk konverterer besøkende til kunder. Jeg bruker moderne teknologi som sikrer at nettsiden laster raskt, fungerer perfekt på alle enheter og er enkel å administrere selv etter lansering.",
    features: [
      "Responsivt design som fungerer på mobil, nettbrett og desktop",
      "Optimalisert for hastighet — lastetider under 2 sekunder",
      "SEO-vennlig struktur fra dag én",
      "Innebygd kontaktskjema og handlingsknapper",
      "Enkel administrasjon — du kan oppdatere innhold selv",
      "SSL-sertifikat og sikkerhetstiltak inkludert",
    ],
    detailedFeatures: [
      { icon: "📱", title: "Responsivt design", description: "Fungerer perfekt på mobil, nettbrett og desktop" },
      { icon: "⚡", title: "Lynrask hastighet", description: "Optimalisert for lastetider under 2 sekunder" },
      { icon: "🔍", title: "SEO-vennlig", description: "Søkemotoroptimalisert struktur fra dag én" },
      { icon: "✉️", title: "Kontaktskjema", description: "Innebygde handlingsknapper som konverterer" },
      { icon: "🛠️", title: "Enkel administrasjon", description: "Oppdater innhold selv uten teknisk kunnskap" },
      { icon: "🔒", title: "SSL og sikkerhet", description: "Sertifikat og sikkerhetstiltak inkludert" },
    ],
    extraSection: {
      type: "checklist",
      headline: "Dette får du levert",
      items: [
        { label: "Skreddersydd design", detail: "Unikt design tilpasset din merkevare" },
        { label: "Mobiloptimalisering", detail: "Responsivt på alle skjermstørrelser" },
        { label: "SEO-grunnlag", detail: "Teknisk oppsett for synlighet i Google" },
        { label: "Kontaktskjema", detail: "Ferdig integrert med e-postvarsling" },
        { label: "Opplæring", detail: "Jeg lærer deg å oppdatere innhold selv" },
        { label: "30 dagers support", detail: "Gratis support etter lansering" },
      ],
    },
  },
  {
    id: "nettbutikk",
    title: "Nettbutikk",
    shortDescription:
      "Start salget på nett med en brukervennlig nettbutikk som kundene dine elsker å handle i.",
    longDescription:
      "Netthandel vokser hvert eneste år i Norge, og en profesjonell nettbutikk er nøkkelen til å ta del i den veksten. Jeg bygger nettbutikker med sømløs brukeropplevelse — fra produktvisning til utsjekk og betaling. Enten du selger fysiske produkter, digitale varer eller tjenester, leverer jeg en løsning som gjør det enkelt for kundene å handle og enkelt for deg å administrere. Integrasjon med Vipps, Klarna og andre betalingsløsninger er selvfølgelig inkludert.",
    features: [
      "Sømløs integrasjon med Vipps, Klarna og kortbetaling",
      "Automatisert lagerstyring og ordrehåndtering",
      "Produktfiltrering, søk og kategorier",
      "Fraktkalkulator med integrasjon mot Posten og Bring",
      "Responsivt design optimalisert for mobilhandel",
      "Statistikk og rapporter over salg og kundeadferd",
    ],
    detailedFeatures: [
      { icon: "💳", title: "Sømløs betaling", description: "Vipps, Klarna og kortbetaling integrert" },
      { icon: "📦", title: "Lagerstyring", description: "Automatisert lagerstyring og ordrehåndtering" },
      { icon: "🔎", title: "Produktsøk", description: "Filtrering, søk og kategorier for enkel navigering" },
      { icon: "🚚", title: "Fraktkalkulator", description: "Integrasjon med Posten og Bring" },
      { icon: "📱", title: "Mobilhandel", description: "Responsivt design optimalisert for mobilkjøp" },
      { icon: "📊", title: "Salgsrapporter", description: "Statistikk over salg og kundeadferd" },
    ],
    extraSection: {
      type: "integrations",
      headline: "Sømløs betaling med kjente løsninger",
      items: [
        { label: "Vipps", detail: "Norges mest brukte betalingsløsning", icon: "📲" },
        { label: "Klarna", detail: "Delbetaling og faktura for økt konvertering", icon: "💳" },
        { label: "Visa / Mastercard", detail: "Internasjonal kortbetaling", icon: "💎" },
        { label: "Apple Pay / Google Pay", detail: "Mobilbetaling med ett trykk", icon: "📱" },
      ],
    },
  },
  {
    id: "seo",
    title: "SEO-optimalisering",
    shortDescription:
      "Bli funnet av kundene dine når de søker på Google etter tjenestene du tilbyr.",
    longDescription:
      "Det hjelper lite med en flott nettside hvis ingen finner den. Søkemotoroptimalisering (SEO) sørger for at bedriften din dukker opp når potensielle kunder søker etter det du tilbyr. Jeg jobber med både teknisk SEO, innholdsoptimalisering og lokal SEO for å gi deg varige resultater. Ingen snarveier, ingen triks — bare solid arbeid som gir langsiktig synlighet. Jeg analyserer konkurrentene dine, finner de riktige søkeordene og bygger en strategi som tar deg til toppen av søkeresultatene.",
    features: [
      "Søkeordanalyse og konkurranseanalyse",
      "Teknisk SEO — hastighetsoptimalisering, strukturerte data, XML-sitemap",
      "Innholdsoptimalisering med relevante søkeord",
      "Lokal SEO — Google Business Profile-optimalisering",
      "Lenkebygging fra relevante norske nettsider",
      "Månedlig rapportering med synlige resultater",
    ],
    detailedFeatures: [
      { icon: "🔑", title: "Søkeordanalyse", description: "Finn de riktige søkeordene for din bransje" },
      { icon: "⚙️", title: "Teknisk SEO", description: "Hastighet, strukturerte data og XML-sitemap" },
      { icon: "📝", title: "Innholdsoptimalisering", description: "Relevante søkeord i tekst og metadata" },
      { icon: "📍", title: "Lokal SEO", description: "Google Business Profile-optimalisering" },
      { icon: "🔗", title: "Lenkebygging", description: "Kvalitetslenker fra relevante norske nettsider" },
      { icon: "📈", title: "Månedlig rapportering", description: "Synlige resultater med detaljerte rapporter" },
    ],
    extraSection: {
      type: "process",
      headline: "Slik jobber jeg med SEO",
      items: [
        { label: "Analyse", detail: "Jeg kartlegger søkeord, konkurrenter og teknisk status", value: "1" },
        { label: "Optimalisering", detail: "Jeg forbedrer innhold, struktur og tekniske faktorer", value: "2" },
        { label: "Resultater", detail: "Månedlig rapportering med målbar fremgang", value: "3" },
      ],
    },
  },
  {
    id: "markedsforing",
    title: "Digital markedsføring",
    shortDescription:
      "Målrettet annonsering på Google og sosiale medier som gir deg flere kunder og målbar avkastning.",
    longDescription:
      "Digital markedsføring handler om å nå de riktige menneskene med den riktige beskjeden til riktig tid. Jeg hjelper deg med å sette opp og optimalisere kampanjer på Google Ads, Facebook, Instagram og andre relevante plattformer. Alt jeg gjør er datadrevet — jeg måler, analyserer og justerer løpende for å gi deg best mulig avkastning på markedsføringsbudsjettet ditt. Enten du vil ha flere henvendelser, mer trafikk til nettbutikken eller økt merkevarebevissthet, lager jeg en strategi tilpasset dine mål.",
    features: [
      "Google Ads — søkeannonser, displayannonser og remarketing",
      "Annonsering på Facebook og Instagram",
      "Målgruppesegmentering og retargeting",
      "A/B-testing av annonser for best mulig resultat",
      "Konverteringssporing og ROI-rapportering",
      "Løpende optimalisering av kampanjer",
    ],
    detailedFeatures: [
      { icon: "🎯", title: "Google Ads", description: "Søkeannonser, display og remarketing" },
      { icon: "📘", title: "Facebook-annonsering", description: "Målrettet annonsering på Facebook" },
      { icon: "📸", title: "Instagram-annonsering", description: "Visuell annonsering til riktig målgruppe" },
      { icon: "🧪", title: "A/B-testing", description: "Test annonser for best mulig resultat" },
      { icon: "📊", title: "Konverteringssporing", description: "ROI-rapportering og måling" },
      { icon: "🔄", title: "Løpende optimalisering", description: "Kampanjer justeres kontinuerlig" },
    ],
    extraSection: {
      type: "platforms",
      headline: "Jeg annonserer der kundene dine er",
      items: [
        { label: "Google Ads", detail: "Søkeannonser, display og remarketing med målbar ROI", icon: "🎯" },
        { label: "Meta / Facebook", detail: "Målgruppesegmentering og retargeting på verdens største plattform", icon: "📘" },
        { label: "Instagram", detail: "Visuell annonsering som bygger merkevare og engasjement", icon: "📸" },
      ],
    },
  },
  {
    id: "vedlikehold",
    title: "Drift og vedlikehold",
    shortDescription:
      "Sov godt om natten. Jeg holder nettsiden din trygg, oppdatert og rask — hver eneste dag.",
    longDescription:
      "En nettside er ikke et engangsprosjekt — den trenger løpende vedlikehold for å fungere optimalt. Jeg tilbyr driftsavtaler som dekker alt fra sikkerhetsoppdateringer og backup til ytelsesovervåking og innholdsendringer. Med en driftsavtale fra meg slipper du å bekymre deg for tekniske problemer. Jeg overvåker nettsiden din døgnet rundt og fikser eventuelle feil før de påvirker kundene dine. Du kan fokusere på det du gjør best — å drive bedriften din.",
    features: [
      "Daglige sikkerhetskopier med enkel gjenoppretting",
      "Sikkerhetsovervåking og brannmur",
      "Programvareoppdateringer og kompatibilitetstesting",
      "Oppetidsgaranti på 99,9 %",
      "Mindre innholdsendringer inkludert",
      "Prioritert support med rask responstid",
    ],
    detailedFeatures: [
      { icon: "💾", title: "Daglige sikkerhetskopier", description: "Automatisk backup med enkel gjenoppretting" },
      { icon: "🛡️", title: "Sikkerhetsovervåking", description: "Brannmur og trusselovervåking døgnet rundt" },
      { icon: "🔄", title: "Programvareoppdateringer", description: "Kompatibilitetstesting og oppdateringer" },
      { icon: "✅", title: "99,9 % oppetid", description: "Garantert tilgjengelighet for besøkende" },
      { icon: "📝", title: "Innholdsendringer", description: "Mindre endringer inkludert i avtalen" },
      { icon: "🚀", title: "Prioritert support", description: "Rask responstid når du trenger hjelp" },
    ],
    extraSection: {
      type: "stats",
      headline: "Tall som gir trygghet",
      items: [
        { label: "Oppetidsgaranti", value: "99.9%", detail: "Nettsiden din er alltid tilgjengelig" },
        { label: "Daglige sikkerhetskopier", value: "365", detail: "Automatisk backup hver eneste dag" },
        { label: "Responstid", value: "<2t", detail: "Jeg svarer innen to timer på hverdager" },
      ],
    },
  },
  {
    id: "design",
    title: "Grafisk design og merkevarebygging",
    shortDescription:
      "En sterk visuell identitet skiller deg fra konkurrentene og bygger tillit hos kundene dine.",
    longDescription:
      "Førsteinntrykket teller, og visuell identitet er ofte det første potensielle kunder ser. Jeg designer logoer, fargepaletter, typografi og grafisk materiell som kommuniserer verdiene og personligheten til bedriften din. En gjennomtenkt visuell identitet skaper gjenkjennelighet og tillit — fra visittkort og brevpapir til nettsiden og sosiale medier. Jeg sørger for at merkevaren din fremstår profesjonell og konsistent på tvers av alle kanaler.",
    features: [
      "Logodesign med flere konseptforslag",
      "Fargepalett og typografigrunnlag",
      "Merkevaremanual med retningslinjer for bruk",
      "Design for visittkort, brevpapir og annet trykkmateriell",
      "Grafisk materiell for sosiale medier",
      "Ikonografi og illustrasjoner tilpasset merkevaren",
    ],
    detailedFeatures: [
      { icon: "🎨", title: "Logodesign", description: "Flere konseptforslag å velge mellom" },
      { icon: "🎨", title: "Fargepalett", description: "Gjennomtenkt fargegrunnlag for merkevaren" },
      { icon: "🔤", title: "Typografi", description: "Skriftvalg som kommuniserer riktig tone" },
      { icon: "📖", title: "Merkevaremanual", description: "Retningslinjer for konsistent bruk" },
      { icon: "🖼️", title: "Trykkmateriell", description: "Visittkort, brevpapir og mer" },
      { icon: "📱", title: "Sosiale medier", description: "Grafisk materiell for alle plattformer" },
    ],
    extraSection: {
      type: "deliverables",
      headline: "En komplett visuell identitet",
      items: [
        { label: "Logo", detail: "Primær, sekundær og ikon-variant", icon: "🎨" },
        { label: "Farger", detail: "Primær, sekundær og aksentfarger", value: "#F4CE14,#45474B,#E8EBEC" },
        { label: "Typografi", detail: "Overskrifter og brødtekst", value: "DM Serif Display,DM Sans" },
        { label: "Merkevaremanual", detail: "PDF med retningslinjer for bruk", icon: "📖" },
      ],
    },
  },
];

export const SERVICES_CTA = {
  headline: "Usikker på hva du trenger?",
  description:
    "Bestill en gratis og uforpliktende samtale, så hjelper jeg deg med å finne den riktige løsningen for bedriften din.",
  buttonText: "Book en gratis samtale",
} as const;
