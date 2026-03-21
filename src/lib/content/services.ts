import type { Service } from "@/types";

export const SERVICES_PAGE = {
  headline: "Tjenester som gir bedriften din vekst",
  subheadline:
    "Jeg tilbyr alt du trenger for å lykkes digitalt — fra skreddersydde nettsider og SEO til løpende vedlikehold.",
} as const;

export const SERVICES: Service[] = [
  {
    id: "nettside",
    title: "Skreddersydd nettside",
    shortDescription:
      "En profesjonell nettside designet for å tiltrekke kunder og bygge tillit til merkevaren din.",
    longDescription:
      "Hver bedrift er unik, og nettsiden din bør gjenspeile det. Jeg designer og utvikler skreddersydde nettsider fra bunnen av — ingen ferdigmaler, ingen kompromisser. Hver side bygges med fokus på hastighet, søkemotoroptimalisering og brukervennlighet. Resultatet er en nettside som ikke bare ser bra ut, men som faktisk konverterer besøkende til kunder.",
    categoryTag: "Nettsider",
    features: [
      "Responsivt design som fungerer på mobil, nettbrett og desktop",
      "Optimalisert for hastighet — lastetider under 2 sekunder",
      "SEO-vennlig struktur fra dag én",
      "Innebygd kontaktskjema og handlingsknapper",
      "Enkel administrasjon — du kan oppdatere innhold selv",
      "SSL-sertifikat og sikkerhetstiltak inkludert",
    ],
    detailedFeatures: [
      { iconName: "smartphone", title: "Responsivt design", description: "Fungerer perfekt på mobil, nettbrett og desktop" },
      { iconName: "zap", title: "Lynrask hastighet", description: "Optimalisert for lastetider under 2 sekunder" },
      { iconName: "search", title: "SEO-vennlig", description: "Søkemotoroptimalisert struktur fra dag én" },
      { iconName: "mail", title: "Kontaktskjema", description: "Innebygde handlingsknapper som konverterer" },
      { iconName: "settings", title: "Enkel administrasjon", description: "Oppdater innhold selv uten teknisk kunnskap" },
      { iconName: "lock", title: "SSL og sikkerhet", description: "Sertifikat og sikkerhetstiltak inkludert" },
    ],
    painPoints: [
      { title: "Lav konverteringsrate", description: "Besøkende forlater nettsiden uten å ta kontakt fordi designet ikke skaper tillit" },
      { title: "Treg nettside", description: "Ferdigmaler er tunge, laster sakte og frustrerer brukerne" },
      { title: "Dårlig på mobil", description: "Over 70 % av trafikken er mobil — fungerer nettsiden din der?" },
    ],
    processSteps: [
      { step: 1, title: "Analyse", description: "Jeg kartlegger mål, målgruppe og konkurrenter" },
      { step: 2, title: "Design", description: "Visuell prototype du kan gi tilbakemelding på" },
      { step: 3, title: "Utvikling", description: "Jeg bygger, tester og optimaliserer" },
      { step: 4, title: "Lansering", description: "Go live med opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Hvor lang tid tar det å lage en nettside?", answer: "En typisk bedriftsnettside tar 3–5 uker fra oppstart til lansering, avhengig av omfang og tilbakemeldingstid." },
      { question: "Hva koster en skreddersydd nettside?", answer: "Prisen avhenger av omfang og funksjonalitet. En enkel bedriftsnettside starter fra kr 15 000. Jeg gir alltid et uforpliktende tilbud først." },
      { question: "Kan jeg oppdatere innholdet selv?", answer: "Ja, jeg bygger nettsiden slik at du enkelt kan endre tekst, bilder og sider selv — uten teknisk kunnskap." },
      { question: "Hva med hosting og domene?", answer: "Jeg hjelper deg med å sette opp hosting og koble til domenet ditt. Alt er inkludert i leveransen." },
    ],
    trustStats: [
      { value: 6, suffix: "+", label: "prosjekter levert" },
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
    ],
  },
  {
    id: "seo",
    title: "SEO-optimalisering",
    shortDescription:
      "Bli funnet av kundene dine når de søker på Google etter tjenestene du tilbyr.",
    longDescription:
      "Det hjelper lite med en flott nettside hvis ingen finner den. Søkemotoroptimalisering sørger for at bedriften din dukker opp når potensielle kunder søker etter det du tilbyr. Jeg jobber med både teknisk SEO, innholdsoptimalisering og lokal SEO for å gi deg varige resultater.",
    categoryTag: "SEO",
    features: [
      "Søkeordanalyse og konkurranseanalyse",
      "Teknisk SEO — hastighetsoptimalisering, strukturerte data, XML-sitemap",
      "Innholdsoptimalisering med relevante søkeord",
      "Lokal SEO — Google Business Profile-optimalisering",
      "Månedlig rapportering med synlige resultater",
    ],
    detailedFeatures: [
      { iconName: "key", title: "Søkeordanalyse", description: "Finn de riktige søkeordene for din bransje" },
      { iconName: "cog", title: "Teknisk SEO", description: "Hastighet, strukturerte data og XML-sitemap" },
      { iconName: "file-text", title: "Innholdsoptimalisering", description: "Relevante søkeord i tekst og metadata" },
      { iconName: "map-pin", title: "Lokal SEO", description: "Google Business Profile-optimalisering" },
      { iconName: "trending-up", title: "Månedlig rapportering", description: "Synlige resultater med detaljerte rapporter" },
    ],
    painPoints: [
      { title: "Usynlig på Google", description: "Potensielle kunder finner konkurrentene dine — men ikke deg" },
      { title: "Bortkastet annonsepenger", description: "Du betaler for annonser fordi organisk trafikk er for lav" },
      { title: "Ingen strategi", description: "Innhold publiseres uten søkeordanalyse eller plan" },
    ],
    processSteps: [
      { step: 1, title: "Analyse", description: "Søkeord, konkurrenter og teknisk status" },
      { step: 2, title: "Optimalisering", description: "Innhold, struktur og tekniske faktorer" },
      { step: 3, title: "Implementering", description: "Teknisk SEO, metadata og innholdsoppdateringer" },
      { step: 4, title: "Rapportering", description: "Månedlig rapport med målbar fremgang" },
    ],
    faq: [
      { question: "Hvor lang tid tar det å se resultater?", answer: "SEO er en langsiktig investering. De fleste ser merkbar forbedring etter 3–6 måneder, men noen endringer gir effekt allerede etter uker." },
      { question: "Garanterer du førsteplass på Google?", answer: "Ingen kan garantere en spesifikk plassering — Google endrer algoritmene kontinuerlig. Jeg garanterer solid, etisk arbeid som gir varige resultater." },
      { question: "Hva koster SEO-optimalisering?", answer: "Jeg tilbyr månedlige pakker fra kr 5 000. Prisen avhenger av konkurranse i din bransje og omfanget av arbeidet." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score snitt" },
      { value: 6, suffix: "+", label: "prosjekter SEO-optimalisert" },
      { value: 3, suffix: "-6 mnd", label: "tid til synlige resultater" },
    ],
  },
  {
    id: "vedlikehold",
    title: "Drift og vedlikehold",
    shortDescription:
      "Sov godt om natten. Jeg holder nettsiden din trygg, oppdatert og rask — hver eneste dag.",
    longDescription:
      "En nettside er ikke et engangsprosjekt — den trenger løpende vedlikehold for å fungere optimalt. Jeg tilbyr driftsavtaler som dekker alt fra sikkerhetsoppdateringer og backup til ytelsesovervåking og innholdsendringer.",
    categoryTag: "Vedlikehold",
    features: [
      "Daglige sikkerhetskopier med enkel gjenoppretting",
      "Sikkerhetsovervåking og brannmur",
      "Programvareoppdateringer og kompatibilitetstesting",
      "Høy oppetid via pålitelig hosting",
      "Mindre innholdsendringer inkludert",
      "Prioritert support med rask responstid",
    ],
    detailedFeatures: [
      { iconName: "hard-drive", title: "Daglige sikkerhetskopier", description: "Automatisk backup med enkel gjenoppretting" },
      { iconName: "shield", title: "Sikkerhetsovervåking", description: "Automatisert brannmur og trusselovervåking" },
      { iconName: "refresh-cw", title: "Programvareoppdateringer", description: "Kompatibilitetstesting og oppdateringer" },
      { iconName: "circle-check", title: "Pålitelig hosting", description: "Høy tilgjengelighet via pålitelige norske servere" },
      { iconName: "file-text", title: "Innholdsendringer", description: "Mindre endringer inkludert i avtalen" },
      { iconName: "headphones", title: "Prioritert support", description: "Rask responstid når du trenger hjelp" },
    ],
    painPoints: [
      { title: "Hacket nettside", description: "Uten oppdateringer er nettsiden sårbar for angrep og nedetid" },
      { title: "Treg ytelse over tid", description: "Nettsider blir tregere uten løpende optimalisering og opprydding" },
      { title: "Ingen backup", description: "Hvis noe går galt, risikerer du å miste alt innhold og data" },
    ],
    processSteps: [
      { step: 1, title: "Oppstart", description: "Jeg tar over drift og gjør en helsesjekk" },
      { step: 2, title: "Overvåking", description: "Automatisert oppetids- og sikkerhetsovervåking" },
      { step: 3, title: "Vedlikehold", description: "Daglige backups, oppdateringer og feilretting" },
      { step: 4, title: "Rapportering", description: "Månedlig statusrapport til deg" },
    ],
    faq: [
      { question: "Hva dekker en driftsavtale?", answer: "Daglige sikkerhetskopier, automatisert sikkerhetsovervåking, programvareoppdateringer og prioritert support. Mindre innholdsendringer er også inkludert." },
      { question: "Hva koster vedlikehold?", answer: "Driftsavtaler starter fra kr 790 per måned, avhengig av nettsidens størrelse og kompleksitet." },
      { question: "Kan jeg si opp avtalen?", answer: "Ja, avtalen kan sies opp med én måneds varsel. Ingen bindingstid." },
    ],
    trustStats: [
      { value: 365, suffix: "", label: "daglige sikkerhetskopier" },
      { value: 2, suffix: "t", label: "maks responstid" },
      { value: 0, suffix: "", label: "bindingstid" },
    ],
  },
];

export const SERVICES_CTA = {
  headline: "Usikker på hva du trenger?",
  description:
    "Bestill en gratis og uforpliktende samtale, så hjelper jeg deg med å finne den riktige løsningen for bedriften din.",
  buttonText: "Book en gratis samtale",
} as const;
