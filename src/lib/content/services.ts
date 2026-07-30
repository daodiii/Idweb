import type { Service } from "@/types";

export const SERVICES_PAGE = {
  headline: "Tjenester som gir bedriften din vekst",
  subheadline:
    "Vi tilbyr alt du trenger for å lykkes digitalt — fra skreddersydde nettsider og SEO til løpende vedlikehold.",
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
    id: "seo",
    title: "SEO-optimalisering",
    shortDescription:
      "Bli funnet av kundene dine når de søker på Google etter tjenestene du tilbyr.",
    longDescription:
      "Det hjelper lite med en flott nettside hvis ingen finner den. Søkemotoroptimalisering sørger for at bedriften din dukker opp når potensielle kunder søker etter det du tilbyr. Vi jobber med både teknisk SEO, innholdsoptimalisering og lokal SEO for å gi deg varige resultater.",
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
      { question: "Garanterer du førsteplass på Google?", answer: "Ingen kan garantere en spesifikk plassering — Google endrer algoritmene kontinuerlig. Vi garanterer solid, etisk arbeid som gir varige resultater." },
      { question: "Hva koster SEO-optimalisering?", answer: "Prisen avhenger av konkurransen i din bransje og omfanget av arbeidet. Vi setter opp en månedlig pakke som passer, og du får fastpris før vi starter." },
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
      "Sov godt om natten. Vi holder nettsiden din trygg, oppdatert og rask — hver eneste dag.",
    longDescription:
      "En nettside er ikke et engangsprosjekt — den trenger løpende vedlikehold for å fungere optimalt. Vi tilbyr driftsavtaler som dekker alt fra sikkerhetsoppdateringer og backup til ytelsesovervåking og innholdsendringer.",
    categoryTag: "Vedlikehold",
    features: [
      "Sikkerhetsovervåking og brannmur",
      "Programvareoppdateringer og kompatibilitetstesting",
      "Høy oppetid via pålitelig hosting",
      "Mindre innholdsendringer inkludert",
      "Prioritert support med rask responstid",
    ],
    detailedFeatures: [
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
      { step: 1, title: "Oppstart", description: "Vi tar over drift og gjør en helsesjekk" },
      { step: 2, title: "Overvåking", description: "Automatisert oppetids- og sikkerhetsovervåking" },
      { step: 3, title: "Vedlikehold", description: "Daglige backups, oppdateringer og feilretting" },
      { step: 4, title: "Rapportering", description: "Månedlig statusrapport til deg" },
    ],
    faq: [
      { question: "Hva dekker en driftsavtale?", answer: "Daglige sikkerhetskopier, automatisert sikkerhetsovervåking, programvareoppdateringer og prioritert support. Mindre innholdsendringer er også inkludert." },
      { question: "Hva koster vedlikehold?", answer: "Prisen avhenger av nettsidens størrelse og kompleksitet. Ta kontakt for et uforpliktende tilbud." },
      { question: "Kan jeg si opp avtalen?", answer: "Ja, avtalen kan sies opp med én måneds varsel. Ingen bindingstid." },
    ],
    trustStats: [],
  },
  {
    id: "webutvikler-oslo",
    title: "Webutvikler i Oslo",
    shortDescription:
      "Lokal webutvikler i Oslo som lager raske, skreddersydde nettsider for bedrifter i hovedstaden.",
    longDescription:
      "Trenger bedriften din en webutvikler i Oslo? IDweb er et Oslo-basert webbyrå som bygger nettsider og webapplikasjoner fra bunnen av — ingen ferdigmaler, ingen WordPress-tunge plugins, ingen mellomledd. Du snakker direkte med utvikleren som skriver koden, og du får en moderne nettside som laster på under to sekunder. Hele prosessen er heldigital, så vi jobber like enkelt med bedrifter i hele Norge som i Oslo — effektivt og uten reisetid. Og vi kjenner det norske markedet, fra Vipps-integrasjon til Brønnøysund-koblinger.",
    categoryTag: "Lokal webutvikling",
    features: [
      "Heldigital prosess — oppstart og oppfølging på video",
      "Skreddersydd kode med Next.js — ikke WordPress-maler",
      "Lokal SEO-optimalisering for Oslo-bedrifter",
      "Norsk hosting med fastpris og rask support",
      "Vipps og norske betalingsløsninger inkludert ved behov",
      "Direkte kontakt med utvikleren — ingen prosjektledere mellom",
    ],
    detailedFeatures: [
      { iconName: "map-pin", title: "Oslo-basert", description: "Heldigital prosess — oppstart, presentasjon og oppfølging på video" },
      { iconName: "zap", title: "Lynrask Next.js", description: "Moderne rammeverk i stedet for tung WordPress + plugins" },
      { iconName: "search", title: "Lokal SEO", description: "Optimalisert for «webutvikler oslo» og bransjesøk i Oslo" },
      { iconName: "shield", title: "Norsk hosting", description: "Servere i Norge, GDPR-trygg og rask for norske brukere" },
      { iconName: "message-square", title: "Direkte kommunikasjon", description: "Du snakker med utvikleren — ingen mellomledd" },
    ],
    painPoints: [
      { title: "Byråer i Oslo som outsourcer", description: "Mange Oslo-byråer setter ut kodingen til utlandet — du betaler dyrt for en mellommann" },
      { title: "WordPress + plugins som bremser", description: "Tunge ferdigløsninger gir 3–5 sekunders lastetid og dårlig PageSpeed-score" },
      { title: "Mal-baserte nettsider", description: "Konkurrentene dine bruker samme mal — du blir usynlig i et hav av like sider" },
    ],
    processSteps: [
      { step: 1, title: "Digital oppstart", description: "Uforpliktende videomøte — vi blir kjent med bedriften og målene dine" },
      { step: 2, title: "Design og prototype", description: "Visuell prototype basert på din bedrift og dine mål" },
      { step: 3, title: "Utvikling", description: "Skreddersydd kode i Next.js, testet og optimalisert" },
      { step: 4, title: "Lansering", description: "Go live, Google Search Console satt opp og overlevering." },
    ],
    faq: [
      { question: "Hvordan foregår samarbeidet?", answer: "Heldigitalt. Oppstart, presentasjon og oppfølging skjer på video, e-post og telefon — effektivt og uten reisetid. Du snakker direkte med utvikleren hele veien." },
      { question: "Hva koster det å lage en nettside i Oslo?", answer: "Det kommer an på omfanget. En enkel bedriftsnettside ligger et helt annet sted enn et prosjekt med nettbutikk eller bookingfunksjoner. Du får alltid fastpris før vi starter — ingen overraskelser." },
      { question: "Hvorfor velge en lokal webutvikler fremfor et stort byrå?", answer: "Hos store byråer betaler du for en kjede av prosjektledere, designere og utviklere. Hos oss snakker du direkte med utvikleren som skriver koden. Det gir raskere prosess, lavere pris og bedre resultat." },
      { question: "Bygger dere i WordPress?", answer: "Nei — vi bygger med Next.js (samme teknologi som brukes av Spotify, Notion og TikTok). Det gir lynraske sider, bedre SEO og full kontroll. WordPress passer bedre for kunder som vil oppdatere alt selv via et tradisjonelt CMS." },
    ],
    trustStats: [
      { value: 6, suffix: "+", label: "Oslo-prosjekter levert" },
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 24, suffix: "t", label: "responstid på e-post" },
    ],
  },
  {
    id: "nettbutikk",
    title: "Nettbutikk-utvikling",
    shortDescription:
      "Skreddersydde nettbutikker som faktisk selger. Lynraske, mobilvennlige løsninger med Vipps og Stripe.",
    longDescription:
      "En nettbutikk er ikke bare en produktkatalog — det er en konverteringsmaskin. Vi bygger skreddersydde nettbutikker med Next.js, Stripe og Vipps som laster på under to sekunder, fungerer perfekt på mobil og er bygget for SEO fra dag én. Enten du selger ti produkter eller tusen, får du en løsning som er rask, sikker og enkel å administrere — uten månedlige Shopify-avgifter som spiser av marginen din.",
    categoryTag: "Nettbutikk",
    features: [
      "Lynrask Next.js-arkitektur — under 2 sekunders lastetid",
      "Vipps og Stripe integrert — norske og internasjonale kort",
      "Mobiloptimalisert handlekurv og kasse",
      "Lagerstyring og automatiske ordrebekreftelser",
      "SEO-optimaliserte produktsider og kategorisider",
      "Ingen månedlige Shopify-avgifter — du eier alt",
    ],
    detailedFeatures: [
      { iconName: "shopping-cart", title: "Vipps og Stripe", description: "Vipps Hurtigkasse + Stripe for kort, Apple Pay og Google Pay" },
      { iconName: "zap", title: "Under 2 sek lastetid", description: "Next.js + bildeoptimalisering gjør butikken lynrask" },
      { iconName: "smartphone", title: "Mobil-først kasse", description: "70 % av netthandel skjer på mobil — vi designer for det først" },
      { iconName: "search", title: "SEO på produktsider", description: "Strukturert data, rich snippets og rask indeksering i Google" },
      { iconName: "package", title: "Lager og ordrer", description: "Lagerstyring, ordrebekreftelser og frakthåndtering inkludert" },
    ],
    painPoints: [
      { title: "Shopify-avgifter spiser margin", description: "Månedlige plattformavgifter + transaksjonsgebyrer reduserer fortjenesten din betydelig" },
      { title: "Treg WooCommerce-butikk", description: "WooCommerce + plugins gir 4–6 sekunders lastetid og høy fluktrate i kassen" },
      { title: "Generisk mal-design", description: "Konkurrentene bruker samme Shopify-tema — kunden ser ingen forskjell og velger på pris" },
    ],
    processSteps: [
      { step: 1, title: "Strategi", description: "Produktsortiment, målgruppe og konverteringsplan" },
      { step: 2, title: "Design", description: "Skreddersydd nettbutikkdesign med fokus på kjøpsopplevelse" },
      { step: 3, title: "Utvikling", description: "Next.js + Vipps + Stripe + lager- og ordrelogikk" },
      { step: 4, title: "Lansering", description: "Testbestillinger kjøres, så går butikken live." },
    ],
    faq: [
      { question: "Hva koster en skreddersydd nettbutikk?", answer: "Det kommer an på hvor mange produkter du har og hva butikken skal kunne. En enkel butikk er raskt oppe, mens tilpasset funksjonalitet tar mer tid. Du får et uforpliktende tilbud med fastpris før vi starter." },
      { question: "Bør jeg velge Shopify eller en skreddersydd løsning?", answer: "Shopify er raskt å komme i gang med, men du betaler kr 350–2 800 per måned + 1,75–2 % i transaksjonsgebyr — i tillegg til Vipps-gebyrer. Med en skreddersydd løsning eier du alt og betaler bare en liten månedlig hostingkostnad. For butikker som passerer kr 500 000 i årlig omsetning lønner skreddersydd seg raskt." },
      { question: "Støtter dere Vipps?", answer: "Ja. Vi integrerer Vipps Hurtigkasse + Vipps Faste Betalinger som standard. I tillegg har vi Stripe for kort, Apple Pay og Google Pay." },
      { question: "Hvordan oppdaterer jeg produkter etter lansering?", answer: "Du får et enkelt admin-panel der du kan legge til produkter, justere priser og se ordrer. For mer avanserte endringer i design eller funksjonalitet hjelper vi som del av driftsavtalen." },
    ],
    trustStats: [
      { value: 2, suffix: "s", label: "lastetid i kassen" },
      { value: 0, suffix: " kr", label: "i Shopify-avgifter" },
      { value: 24, suffix: "t", label: "responstid på e-post" },
    ],
  },
];

export const SERVICES_CTA = {
  headline: "Usikker på hva du trenger?",
  description:
    "Bestill en gratis og uforpliktende samtale, så hjelper vi deg med å finne den riktige løsningen for bedriften din.",
  buttonText: "Book en gratis samtale",
} as const;
