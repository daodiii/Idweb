import type { Service } from "@/types";

export const SERVICES_PAGE = {
  headline: "Tjenester som gir bedriften din vekst",
  subheadline:
    "Vi bygger skreddersydde nettsider, gir dem verktøy som skaffer deg kunder — og holder dem trygge, raske og synlige etter lansering.",
} as const;

export const SERVICES: Service[] = [
  {
    id: "nettside",
    title: "Skreddersydd nettside",
    shortDescription:
      "En profesjonell nettside designet for å tiltrekke kunder og bygge tillit til merkevaren din.",
    longDescription:
      "Hver bedrift er unik, og nettsiden din bør gjenspeile det. Vi designer og utvikler skreddersydde nettsider fra bunnen av — ingen ferdigmaler, ingen kompromisser. Hver side bygges med fokus på hastighet, søkemotoroptimalisering og brukervennlighet. Resultatet er en nettside som ikke bare ser bra ut, men som faktisk konverterer besøkende til kunder.",
    categoryTag: "Nettsider",
    features: [
      "Responsivt design som fungerer på mobil, nettbrett og desktop",
      "Optimalisert for hastighet — lastetider under 2 sekunder",
      "SEO-vennlig struktur fra dag én",
      "Innebygd kontaktskjema og handlingsknapper",
      "Moderne teknologi med rask og pålitelig ytelse",
      "SSL-sertifikat og sikkerhetstiltak inkludert",
    ],
    detailedFeatures: [
      { iconName: "smartphone", title: "Responsivt design", description: "Fungerer perfekt på mobil, nettbrett og desktop" },
      { iconName: "zap", title: "Lynrask hastighet", description: "Optimalisert for lastetider under 2 sekunder" },
      { iconName: "search", title: "SEO-vennlig", description: "Søkemotoroptimalisert struktur fra dag én" },
      { iconName: "mail", title: "Kontaktskjema", description: "Innebygde handlingsknapper som konverterer" },
      { iconName: "lock", title: "SSL og sikkerhet", description: "Sertifikat og sikkerhetstiltak inkludert" },
    ],
    painPoints: [
      { title: "Lav konverteringsrate", description: "Besøkende forlater nettsiden uten å ta kontakt fordi designet ikke skaper tillit" },
      { title: "Treg nettside", description: "Ferdigmaler er tunge, laster sakte og frustrerer brukerne" },
      { title: "Dårlig på mobil", description: "Over 70 % av trafikken er mobil — fungerer nettsiden din der?" },
    ],
    processSteps: [
      { step: 1, title: "Analyse", description: "Vi kartlegger mål, målgruppe og konkurrenter" },
      { step: 2, title: "Design", description: "Visuell prototype du kan gi tilbakemelding på" },
      { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer" },
      { step: 4, title: "Lansering", description: "Vi setter siden live og overleverer. Du eier alt." },
    ],
    faq: [
      { question: "Hvor lang tid tar det å lage en nettside?", answer: "En enkel bedriftsnettside tar som regel rundt 2 uker. Større sider med flere undersider og funksjoner tar 4–6 uker." },
      { question: "Hva koster en skreddersydd nettside?", answer: "Prisen avhenger av omfang og funksjonalitet. Du får alltid et uforpliktende tilbud først, med fastpris før vi starter." },
      { question: "Kan jeg oppdatere innholdet selv?", answer: "Du kan gjøre endringer selv, men det krever teknisk kompetanse — blant annet kjennskap til GitHub og kodebasert publisering. Per i dag har vi ingen enklere løsning for selvbetjent redigering." },
      { question: "Hva med hosting og domene?", answer: "Vi hjelper deg med å sette opp hosting og koble til domenet ditt. Alt er inkludert i leveransen." },
    ],
    trustStats: [
      { value: 6, suffix: "+", label: "prosjekter levert" },
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
    ],
  },
  {
    id: "drift-og-seo",
    title: "Drift og SEO",
    shortDescription:
      "Etter lansering holder vi nettsiden din trygg, rask og synlig på Google — så den fortsetter å skaffe deg kunder.",
    longDescription:
      "En nettside er ikke ferdig den dagen den går live. Den må holdes sikker og oppdatert, og den må bli funnet. Med en driftsavtale tar vi oss av begge deler: hosting, sikkerhet, backup og mindre endringer, pluss løpende arbeid med teknisk SEO, innhold og Google-profilen din. Én avtale, én kontaktperson og fast pris per måned.",
    categoryTag: "Drift og SEO",
    features: [
      "Hosting, SSL og daglige sikkerhetskopier",
      "Sikkerhets- og programvareoppdateringer",
      "Teknisk SEO — hastighet, strukturerte data og sitemap",
      "Søkeordanalyse og innholdsoptimalisering",
      "Lokal SEO og Google Bedriftsprofil",
      "Mindre innholdsendringer og rask support",
    ],
    detailedFeatures: [
      { iconName: "shield", title: "Sikker drift", description: "Hosting, SSL og overvåking — vi oppdager problemer før du gjør det" },
      { iconName: "refresh-cw", title: "Oppdateringer og backup", description: "Daglige sikkerhetskopier og jevnlige oppdateringer" },
      { iconName: "zap", title: "Teknisk SEO", description: "Hastighet, strukturerte data og sitemap som Google forstår" },
      { iconName: "map-pin", title: "Synlig på Google", description: "Søkeord, innhold og en komplett Google Bedriftsprofil" },
      { iconName: "trending-up", title: "Månedlig rapport", description: "Hva som er gjort, og hvordan siden presterer" },
    ],
    painPoints: [
      { title: "Usynlig på Google", description: "Kundene søker etter det du tilbyr, men finner konkurrentene dine" },
      { title: "Sårbar uten oppdateringer", description: "En nettside som ikke vedlikeholdes blir et lett mål for angrep og nedetid" },
      { title: "Tregere for hver måned", description: "Uten løpende optimalisering mister siden både fart og plasseringer" },
    ],
    processSteps: [
      { step: 1, title: "Helsesjekk", description: "Vi går gjennom sikkerhet, hastighet og synlighet på Google" },
      { step: 2, title: "Plan", description: "Prioriteringer og fast månedspris, avtalt før vi starter" },
      { step: 3, title: "Løpende arbeid", description: "Overvåking, oppdateringer, backup og SEO-forbedringer hver måned" },
      { step: 4, title: "Rapport", description: "Månedlig oversikt over hva som er gjort og hva det har gitt" },
    ],
    faq: [
      { question: "Hva dekker avtalen?", answer: "Hosting, daglige sikkerhetskopier, sikkerhetsovervåking, oppdateringer og mindre innholdsendringer — pluss løpende SEO-arbeid: teknisk optimalisering, søkeord, innhold og Google Bedriftsprofil." },
      { question: "Hvor lang tid tar det før SEO gir resultater?", answer: "SEO er en langsiktig investering. De fleste ser merkbar forbedring etter 3–6 måneder, men tekniske forbedringer kan gi effekt allerede etter noen uker." },
      { question: "Garanterer dere førsteplass på Google?", answer: "Nei. Ingen kan garantere en bestemt plassering — Google endrer algoritmene hele tiden. Vi garanterer solid, etisk arbeid som gir varige resultater." },
      { question: "Hva koster det?", answer: "Det avhenger av nettsidens størrelse og hvor mye SEO-arbeid som trengs. Du får en fast månedspris før vi starter." },
      { question: "Kan jeg si opp avtalen?", answer: "Ja, med én måneds varsel. Ingen bindingstid." },
    ],
    trustStats: [],
  },
  {
    id: "portal",
    title: "IDweb-portalen",
    shortDescription:
      "Én innlogging der henvendelser, bookinger og omtaler fra nettsiden samles — med en AI-chat som svarer kundene dine hele døgnet.",
    longDescription:
      "IDweb-portalen er verktøyene som gjør nettsiden til en kundekanal. En AI-chat svarer besøkende på norsk når som helst, og sender deg dem som vil noe. Kundene kan bestille time selv, uten å ringe. Og når jobben er gjort, spør portalen om en omtale mens opplevelsen fortsatt er fersk. Alt havner i én innboks, og du velger selv hvilke moduler du trenger.",
    categoryTag: "Portal",
    features: [
      "AI-chat som svarer besøkende døgnet rundt",
      "Booking direkte på nettsiden — uten telefon",
      "Automatisk forespørsel om omtale når jobben er ferdig",
      "Alle henvendelser og bookinger samlet i én innboks",
      "Velg bare modulene du trenger",
      "Dine data holdes strengt adskilt fra alle andre",
    ],
    detailedFeatures: [
      { iconName: "message-square", title: "AI-chat", description: "Svarer besøkende på norsk hele døgnet, ut fra det vi har lagt inn om bedriften din" },
      { iconName: "calendar", title: "Booking", description: "Kundene velger tjeneste og tid selv, og får bekreftelse på e-post" },
      { iconName: "star", title: "Omtaler", description: "Ber om en omtale når jobben er gjort, mens den fortsatt er fersk" },
      { iconName: "mail", title: "Én innboks", description: "Henvendelser fra chat og booking på ett sted" },
      { iconName: "lock", title: "Dine data, adskilt", description: "Ingen andre kunder kan se eller endre det som er ditt" },
    ],
    painPoints: [
      { title: "Ingen svarer etter stengetid", description: "Besøkende har spørsmål klokken ti om kvelden — neste morgen har de gått til en konkurrent" },
      { title: "Telefonen ringer for å bestille time", description: "Hver booking på telefon tar tid fra jobben du egentlig skal gjøre" },
      { title: "Fornøyde kunder skriver ikke omtaler", description: "De var fornøyde, men ingen spurte dem mens opplevelsen var fersk" },
    ],
    processSteps: [
      { step: 1, title: "Velg moduler", description: "Vi finner ut hvilke moduler bedriften din faktisk har nytte av" },
      { step: 2, title: "Oppsett", description: "Vi legger inn tjenester, åpningstider og det chatten skal vite om bedriften" },
      { step: 3, title: "På nettsiden", description: "Chat og booking kobles til nettsiden din" },
      { step: 4, title: "I gang", description: "Du logger inn og ser henvendelser og bookinger samlet på ett sted" },
    ],
    faq: [
      { question: "Må jeg ta alle modulene?", answer: "Nei. Du velger modulene du har nytte av, og portalen viser bare dem." },
      { question: "Hva vet AI-chatten om bedriften min?", answer: "Den svarer ut fra informasjonen vi legger inn om bedriften din — tjenester, åpningstider og vanlige spørsmål. Kan den ikke svare, sender den samtalen videre til deg." },
      { question: "Kan chatten booke timer?", answer: "Ja. Chatten kan sjekke ledige tider og booke direkte, slik at kunden slipper å ringe." },
      { question: "Synkroniseres bookingen med Google Kalender?", answer: "Ikke foreløpig. Tider du er opptatt blokkerer du direkte i portalen, og kunden får en kalenderfil i bekreftelsen." },
      { question: "Hvordan spør portalen om omtaler?", answer: "Når du markerer en jobb som ferdig, sender portalen kunden en e-post og ber om en omtale. Kunden kan enkelt melde seg av." },
      { question: "Er dataene mine trygge?", answer: "Hver bedrift har sine egne data, strengt adskilt fra alle andre i portalen. Skillet ligger i selve databasen og testes automatisk." },
    ],
    trustStats: [],
  },
];

export const SERVICES_CTA = {
  headline: "Usikker på hva du trenger?",
  description:
    "Bestill en gratis og uforpliktende samtale, så hjelper vi deg med å finne den riktige løsningen for bedriften din.",
  buttonText: "Book en gratis samtale",
} as const;
