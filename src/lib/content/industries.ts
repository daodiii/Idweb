import type { Service } from "@/types";

/**
 * Industry landing pages — programmatic SEO engine.
 *
 * Each entry targets a winnable long-tail commercial cluster
 * ("nettside for [bransje]") instead of the hyper-competitive head
 * term "webutvikler oslo". Content is genuinely differentiated per
 * industry (real pain points, features, FAQ) — NOT thin doorway pages.
 *
 * Shape mirrors `SERVICES` so the existing /tjenester template
 * components (hero, pain points, bento, process, faq, cta) can be
 * reused verbatim. Add a new industry => a new indexable page.
 *
 * Route: /nettside/[bransje]  ·  data id === slug.
 */
export const INDUSTRIES: Service[] = [
  {
    id: "tannlege",
    title: "Nettside for tannleger",
    shortDescription:
      "En moderne, tillitsvekkende nettside med online timebestilling som fyller opp kalenderen med nye pasienter.",
    longDescription:
      "Folk velger tannlege på nett før de ringer. Er nettsiden treg, utdatert eller uten timebestilling, går pasienten videre til klinikken med en bedre førsteinntrykk. Vi lager raske, pasientvennlige nettsider for tannleger — med enkel online booking, tydelig prisinformasjon og et design som bygger trygghet før pasienten har satt seg i stolen.",
    categoryTag: "Tannlege",
    features: [
      "Online timebestilling som er åpen døgnet rundt",
      "Tydelig prisliste som bygger tillit og reduserer telefontid",
      "Presentasjon av behandlere, utstyr og klinikk",
      "Før/etter-galleri for estetiske behandlinger",
      "Lynrask lasting og perfekt på mobil",
      "GDPR-trygg håndtering av pasienthenvendelser",
    ],
    detailedFeatures: [
      { iconName: "calendar", title: "Online booking", description: "Pasienter bestiller time selv, hele døgnet" },
      { iconName: "file-text", title: "Åpen prisliste", description: "Tydelige priser skaper trygghet og færre telefoner" },
      { iconName: "smartphone", title: "Mobil først", description: "De fleste finner tannlegen på mobilen" },
      { iconName: "search", title: "Lokal SEO", description: "Synlig på «tannlege [bydel]» i Google og Maps" },
      { iconName: "lock", title: "GDPR-trygg", description: "Sikker håndtering av sensitive henvendelser" },
    ],
    painPoints: [
      { title: "Tomme luker i kalenderen", description: "Uten online booking mister du pasienter som ikke gidder å ringe i åpningstiden" },
      { title: "Pasienten velger naboklinikken", description: "En utdatert nettside får en moderne klinikk til å virke mindre trygg" },
      { title: "Usynlig i lokalsøk", description: "Konkurrenten dukker opp på «tannlege i nærheten» — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på pasientreisen, konkurrentene og bookingbehovet" },
      { step: 2, title: "Design", description: "Et rolig, tillitsvekkende uttrykk tilpasset klinikken" },
      { step: 3, title: "Utvikling", description: "Vi bygger siden med booking, prisliste og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan dere koble på timebestillingssystemet vi allerede bruker?", answer: "Ja. Vi integrerer de fleste norske bookingsystemene, eller lenker pasienten rett inn i løsningen dere har i dag — sømløst fra nettsiden." },
      { question: "Hjelper en ny nettside oss å bli funnet på Google?", answer: "Ja. Vi bygger inn lokal SEO og strukturerte data slik at klinikken blir synlig på søk som «tannlege [bydel]» og i Google Maps." },
      { question: "Hva koster en nettside for en tannlegeklinikk?", answer: "En profesjonell klinikknettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, basert på omfang og funksjoner." },
      { question: "Er pasienthenvendelser håndtert i tråd med GDPR?", answer: "Ja. Skjemaer og datalagring settes opp i samsvar med GDPR og norsk personvernlovgivning." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 24, suffix: "/7", label: "åpen timebestilling" },
    ],
  },
  {
    id: "elektriker",
    title: "Nettside for elektrikere",
    shortDescription:
      "En nettside som gjør deg synlig lokalt og gjør det enkelt for kunder å be om befaring — også når det haster.",
    longDescription:
      "Når strømmen ryker eller et bad skal renoveres, googler folk «elektriker i nærheten» og ringer den som ser mest seriøs ut. Har du ingen nettside, eller en gammel én, taper du jobben til konkurrenten. Vi lager raske, mobilvennlige nettsider for elektrikere — med tydelige tjenester, sertifiseringer og ett trykk til å ringe eller be om tilbud.",
    categoryTag: "Elektriker",
    features: [
      "Trykk-for-å-ringe-knapp synlig på mobil hele tiden",
      "Enkelt tilbudsskjema med bildeopplasting",
      "Tydelig oversikt over tjenester og områder du dekker",
      "Sertifiseringer og forsikring som bygger tillit",
      "Lokal SEO for «elektriker [sted]»",
      "Lynrask lasting på mobil ute på jobb",
    ],
    detailedFeatures: [
      { iconName: "smartphone", title: "Ring med ett trykk", description: "Kunden når deg uten å lete etter nummeret" },
      { iconName: "mail", title: "Tilbudsskjema", description: "Kunden beskriver jobben og laster opp bilde" },
      { iconName: "map-pin", title: "Lokal SEO", description: "Synlig på «elektriker [sted]» og i Google Maps" },
      { iconName: "shield", title: "Tillit", description: "Sertifiseringer, forsikring og kundeomtaler" },
      { iconName: "zap", title: "Lynrask", description: "Laster på sekunder — også på mobildata" },
    ],
    painPoints: [
      { title: "Kundene finner konkurrenten først", description: "Uten lokal synlighet ringer kunden den elektrikeren som dukker opp øverst" },
      { title: "Tapte hastejobber", description: "Er det vanskelig å finne nummeret ditt på mobil, ringer kunden videre" },
      { title: "Virker mindre seriøs", description: "Bare en Facebook-side gir et mindre profesjonelt inntrykk enn en ekte nettside" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på tjenestene dine, områdene du dekker og konkurrentene" },
      { step: 2, title: "Design", description: "Et ryddig, solid uttrykk som bygger tillit" },
      { step: 3, title: "Utvikling", description: "Vi bygger siden med ring-knapp, skjema og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Jeg har bare en Facebook-side i dag — er det nok?", answer: "Facebook er fint som tillegg, men en egen nettside rangerer i Google, virker mer seriøs og lar deg styre hvordan kundene finner og kontakter deg. De fleste velger bedrifter med egen nettside." },
      { question: "Kan dere få meg synlig på «elektriker [sted]»?", answer: "Ja. Vi bygger inn lokal SEO, strukturerte data og kobler nettsiden mot Google Bedriftsprofil slik at du blir synlig i lokalsøk og Maps." },
      { question: "Hva koster en nettside for et elektrikerfirma?", answer: "En profesjonell håndverkernettside starter fra kr 15 000. Du får et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Kan kundene be om tilbud direkte fra siden?", answer: "Ja. Vi setter opp et enkelt tilbudsskjema der kunden beskriver jobben og kan laste opp bilde, så henvendelsen havner rett i innboksen din." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 70, suffix: "%", label: "av søk skjer på mobil" },
    ],
  },
  {
    id: "rorlegger",
    title: "Nettside for rørleggere",
    shortDescription:
      "En rask, lokal nettside som fanger opp akuttjobber og renoveringer før kunden rekker å ringe noen andre.",
    longDescription:
      "Vannlekkasjer venter ikke. Når noen googler «rørlegger i nærheten» midt på natten, vinner den som er lett å finne og lett å ringe. Vi lager mobilvennlige nettsider for rørleggere — med døgnvakt-info, tydelige tjenester og ett trykk til å ringe — så du fanger både akuttjobbene og de store baderomsprosjektene.",
    categoryTag: "Rørlegger",
    features: [
      "Tydelig døgnvakt- og akuttinfo øverst",
      "Trykk-for-å-ringe synlig på mobil hele tiden",
      "Tilbudsskjema med bildeopplasting for større jobber",
      "Tjenesteoversikt: bad, lekkasje, varmtvann, service",
      "Lokal SEO for «rørlegger [sted]»",
      "Sertifiseringer og våtromsgodkjenning som bygger tillit",
    ],
    detailedFeatures: [
      { iconName: "smartphone", title: "Ring med ett trykk", description: "Akuttkunden når deg umiddelbart" },
      { iconName: "circle-check", title: "Døgnvakt-info", description: "Tydelig om du tar hastejobber utenom arbeidstid" },
      { iconName: "map-pin", title: "Lokal SEO", description: "Synlig på «rørlegger [sted]» og i Google Maps" },
      { iconName: "mail", title: "Tilbudsskjema", description: "Kunden beskriver jobben og laster opp bilde" },
      { iconName: "shield", title: "Tillit", description: "Våtromsgodkjenning, sertifiseringer og omtaler" },
    ],
    painPoints: [
      { title: "Akuttkunder ringer naboen", description: "Er du vanskelig å finne og ringe på mobil, går hastejobben til en annen" },
      { title: "Usynlig i lokalsøk", description: "Konkurrenten dominerer «rørlegger i nærheten» mens du er fraværende" },
      { title: "Mister de store jobbene", description: "Baderomsrenoveringer går til firmaet som virker mest seriøst på nett" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på tjenestene, områdene og akuttbehovet" },
      { step: 2, title: "Design", description: "Et solid, tillitsvekkende uttrykk med tydelig kontakt" },
      { step: 3, title: "Utvikling", description: "Vi bygger siden med ring-knapp, døgnvakt-info og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan nettsiden fremheve at vi har døgnvakt?", answer: "Ja. Vi legger akutt- og døgnvaktinfo godt synlig øverst med en ring-knapp, slik at kunder som trenger hjelp raskt finner og kontakter dere umiddelbart." },
      { question: "Blir vi synlige på «rørlegger [sted]»?", answer: "Ja. Vi bygger inn lokal SEO og strukturerte data og kobler siden mot Google Bedriftsprofil, slik at dere rangerer i lokalsøk og dukker opp i Maps." },
      { question: "Hva koster en nettside for et rørleggerfirma?", answer: "En profesjonell håndverkernettside starter fra kr 15 000. Du får et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Kan kundene be om tilbud på større jobber via siden?", answer: "Ja. Vi setter opp et tilbudsskjema med bildeopplasting, perfekt for baderomsrenoveringer og andre store prosjekter." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 24, suffix: "/7", label: "synlig for akuttjobber" },
    ],
  },
  {
    id: "advokat",
    title: "Nettside for advokater",
    shortDescription:
      "En autoritativ, diskret nettside som bygger troverdighet og gjør det trygt for nye klienter å ta kontakt.",
    longDescription:
      "Klienter velger advokat på tillit. Før de ringer, leser de seg opp — og en utdatert nettside undergraver inntrykket av kompetanse. Vi lager nøkterne, profesjonelle nettsider for advokater og advokatfirmaer — med tydelige fagområder, presentasjon av advokatene og en diskret, trygg måte å ta kontakt på.",
    categoryTag: "Advokat",
    features: [
      "Egne sider per fagområde for synlighet og relevans",
      "Profesjonell presentasjon av advokatene",
      "Diskret og trygg kontakt for sensitive saker",
      "Fagartikler som bygger autoritet og SEO",
      "Nøkternt, tillitsvekkende design",
      "Lynrask og perfekt på mobil",
    ],
    detailedFeatures: [
      { iconName: "file-text", title: "Fagområde-sider", description: "Egne sider for arv, familie, eiendom m.m." },
      { iconName: "message-square", title: "Trygg kontakt", description: "Diskret henvendelse for sensitive saker" },
      { iconName: "search", title: "SEO & autoritet", description: "Fagartikler som rangerer og bygger tillit" },
      { iconName: "shield", title: "Troverdighet", description: "Nøkternt design som signaliserer soliditet" },
      { iconName: "smartphone", title: "Mobil & rask", description: "Upåklagelig på alle skjermer" },
    ],
    painPoints: [
      { title: "Utdatert side svekker tilliten", description: "Et gammelt uttrykk får et solid firma til å virke mindre kompetent" },
      { title: "Usynlig på fagsøk", description: "Uten egne fagområde-sider rangerer du ikke på «advokat [fagfelt]»" },
      { title: "Høy terskel for å ta kontakt", description: "Klienter med sensitive saker trenger en trygg, diskret kontaktvei" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på fagområder, målgruppe og konkurrenter" },
      { step: 2, title: "Design", description: "Et nøkternt, autoritativt uttrykk tilpasset firmaet" },
      { step: 3, title: "Utvikling", description: "Vi bygger fagområde-sider, profiler og trygg kontakt" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan dere lage egne sider for hvert fagområde?", answer: "Ja, og det anbefales. Egne sider for arverett, familierett, eiendom osv. gjør at dere rangerer på relevante søk og fremstår som spesialister på hvert felt." },
      { question: "Hvordan håndteres henvendelser i sensitive saker?", answer: "Vi setter opp en diskret, GDPR-trygg kontaktløsning, og kan tilpasse skjemaer slik at klienter trygt kan beskrive saken sin." },
      { question: "Hva koster en nettside for et advokatfirma?", answer: "En profesjonell advokatnettside starter fra kr 15 000 og øker med antall fagområde-sider og funksjoner. Du får alltid et uforpliktende tilbud først." },
      { question: "Kan dere hjelpe med fagartikler som rangerer i Google?", answer: "Ja. Vi planlegger og kan produsere faginnhold som svarer på det klientene søker etter, noe som både bygger autoritet og gir organisk trafikk over tid." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "GDPR-trygg kontakt" },
    ],
  },
  {
    id: "frisor",
    title: "Nettside for frisører",
    shortDescription:
      "En stilig nettside med online booking som fyller stolene og viser fram arbeidet ditt.",
    longDescription:
      "Frisørbransjen er visuell, og kundene velger salong etter inntrykk og hvor lett det er å bestille time. Vi lager stilrene, mobilvennlige nettsider for frisører — med online timebestilling, prisliste og et galleri som viser fram håndverket ditt, så du fyller kalenderen i stedet for å svare på telefonen.",
    categoryTag: "Frisør",
    features: [
      "Online timebestilling åpen hele døgnet",
      "Galleri som viser fram klipp, farge og stil",
      "Tydelig prisliste per behandling",
      "Kobling mot Instagram for ferskt innhold",
      "Lokal SEO for «frisør [sted]»",
      "Lynrask og perfekt på mobil",
    ],
    detailedFeatures: [
      { iconName: "calendar", title: "Online booking", description: "Kunder bestiller time selv, døgnet rundt" },
      { iconName: "star", title: "Galleri", description: "Vis fram arbeidet som selger timene" },
      { iconName: "file-text", title: "Prisliste", description: "Tydelige priser per behandling" },
      { iconName: "smartphone", title: "Mobil først", description: "De fleste bestiller time på mobilen" },
      { iconName: "search", title: "Lokal SEO", description: "Synlig på «frisør [sted]» i Google og Maps" },
    ],
    painPoints: [
      { title: "Telefonen ringer i utide", description: "Uten online booking går tiden med til å ta imot bestillinger midt i et klipp" },
      { title: "Tomme stoler", description: "Ledige timer fylles ikke når kundene ikke kan bestille selv på kvelden" },
      { title: "Usynlig lokalt", description: "Nye kunder finner salongen i nabolaget — ikke deg" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på stilen, behandlingene og bookingbehovet" },
      { step: 2, title: "Design", description: "Et visuelt uttrykk som matcher salongen" },
      { step: 3, title: "Utvikling", description: "Vi bygger booking, galleri og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan dere koble på bookingsystemet vårt?", answer: "Ja. Vi integrerer de vanligste norske bookingløsningene, eller lenker kunden rett inn i systemet dere bruker — sømløst fra nettsiden." },
      { question: "Kan galleriet hente bilder fra Instagram?", answer: "Ja. Vi kan koble inn Instagram-feeden så nettsiden alltid viser fersk inspirasjon uten ekstra arbeid for dere." },
      { question: "Hva koster en nettside for en frisørsalong?", answer: "En profesjonell salongnettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Blir vi synlige på «frisør [sted]»?", answer: "Ja. Vi bygger inn lokal SEO og kobler siden mot Google Bedriftsprofil, slik at salongen dukker opp i lokalsøk og Maps." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 24, suffix: "/7", label: "åpen timebestilling" },
    ],
  },
  {
    id: "regnskapsforer",
    title: "Nettside for regnskapsførere",
    shortDescription:
      "En tillitsvekkende nettside som gjør et seriøst regnskapsbyrå til et naturlig valg for nye kunder.",
    longDescription:
      "Bedrifter velger regnskapsfører på tillit og kompetanse. En utdatert nettside undergraver inntrykket — mens en ryddig, profesjonell side gjør det enkelt å forstå hva dere tilbyr og ta kontakt. Vi lager nøkterne, tillitsvekkende nettsider for regnskapsførere, med tydelige tjenester, autorisasjon og et lavt-terskel kontaktpunkt.",
    categoryTag: "Regnskap",
    features: [
      "Tydelig oversikt over tjenester og bransjer dere dekker",
      "Autorisasjon og medlemskap som bygger tillit",
      "Enkelt kontakt- og tilbudsskjema",
      "Fagartikler som svarer på det kundene googler",
      "Lokal SEO for «regnskapsfører [sted]»",
      "Lynrask og profesjonell på alle skjermer",
    ],
    detailedFeatures: [
      { iconName: "file-text", title: "Tjenesteoversikt", description: "Tydelig hva dere tilbyr og til hvem" },
      { iconName: "shield", title: "Autorisasjon", description: "Vis frem godkjenninger som bygger tillit" },
      { iconName: "mail", title: "Kontaktskjema", description: "Lav terskel for nye henvendelser" },
      { iconName: "search", title: "SEO & fag", description: "Innhold som rangerer på regnskapssøk" },
      { iconName: "smartphone", title: "Rask & mobil", description: "Profesjonelt uttrykk på alle enheter" },
    ],
    painPoints: [
      { title: "Virker mindre seriøs", description: "En gammel nettside svekker tilliten hos bedrifter som vurderer dere" },
      { title: "Uklart tilbud", description: "Når tjenestene er utydelige, går kunden videre til et byrå de forstår" },
      { title: "Ingen tilsig av kunder", description: "Uten SEO og et tydelig kontaktpunkt kommer det få henvendelser via nett" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på tjenestene, målgruppen og konkurrentene" },
      { step: 2, title: "Design", description: "Et nøkternt, tillitsvekkende uttrykk" },
      { step: 3, title: "Utvikling", description: "Vi bygger tjenestesider, skjema og SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan dere lage egne sider for hver tjeneste?", answer: "Ja. Egne sider for f.eks. årsregnskap, lønn og rådgivning gjør at dere rangerer på flere søk og fremstår tydeligere for kunden." },
      { question: "Hjelper dere med faginnhold?", answer: "Ja. Vi kan planlegge og produsere artikler som svarer på det kundene faktisk googler, noe som bygger autoritet og gir trafikk over tid." },
      { question: "Hva koster en nettside for et regnskapsbyrå?", answer: "En profesjonell byrånettside starter fra kr 15 000 og avhenger av antall sider og funksjoner. Du får alltid et uforpliktende tilbud først." },
      { question: "Blir vi synlige lokalt?", answer: "Ja. Vi bygger inn lokal SEO og strukturerte data slik at dere blir synlige på «regnskapsfører [sted]» og i Google Maps." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "mobilvennlig" },
    ],
  },
  {
    id: "eiendomsmegler",
    title: "Nettside for eiendomsmeglere",
    shortDescription:
      "En lekker nettside som viser fram boligene, fanger verdivurderinger og bygger meglernavnet ditt.",
    longDescription:
      "Selgere velger megler etter inntrykk og resultater. En moderne nettside som viser fram boliger, tidligere salg og en enkel verdivurdering gjør deg til et trygt valg. Vi lager raske, visuelle nettsider for eiendomsmeglere — med boligvisning, verdivurderingsskjema og områdesider som rangerer lokalt.",
    categoryTag: "Eiendom",
    features: [
      "Lekker visning av boliger og solgte objekter",
      "Verdivurderingsskjema som fanger selgere",
      "Profil som bygger tillit og personlig merkevare",
      "Områdesider for lokal synlighet",
      "Lokal SEO for «eiendomsmegler [sted]»",
      "Lynrask og perfekt på mobil",
    ],
    detailedFeatures: [
      { iconName: "star", title: "Boligvisning", description: "Vis fram objekter og solgte boliger lekkert" },
      { iconName: "mail", title: "Verdivurdering", description: "Skjema som fanger selgere før konkurrenten" },
      { iconName: "map-pin", title: "Områdesider", description: "Ranger lokalt på områdene du dekker" },
      { iconName: "trending-up", title: "Personlig merkevare", description: "Bygg navnet ditt som megler" },
      { iconName: "smartphone", title: "Rask & mobil", description: "Upåklagelig på alle skjermer" },
    ],
    painPoints: [
      { title: "Selgere velger en annen megler", description: "Uten en sterk profil på nett taper du oppdrag til mer synlige meglere" },
      { title: "Få verdivurderinger", description: "Uten et tydelig skjema mister du selgere som er i tidlig vurderingsfase" },
      { title: "Usynlig i lokalsøk", description: "Konkurrenten rangerer på «megler [område]» — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på områdene, profilen og konkurrentene" },
      { step: 2, title: "Design", description: "Et lekkert uttrykk som bygger meglernavnet" },
      { step: 3, title: "Utvikling", description: "Vi bygger boligvisning, skjema og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan dere lage egne sider for hvert område jeg dekker?", answer: "Ja, og det anbefales. Egne områdesider gjør at du rangerer på lokale søk som «eiendomsmegler [område]» og fremstår som spesialist der." },
      { question: "Kan selgere be om verdivurdering fra siden?", answer: "Ja. Vi setter opp et tydelig verdivurderingsskjema som fanger selgere tidlig og sender henvendelsen rett til deg." },
      { question: "Hva koster en nettside for en eiendomsmegler?", answer: "En profesjonell meglernettside starter fra kr 15 000 og avhenger av antall områdesider og funksjoner. Du får alltid et uforpliktende tilbud først." },
      { question: "Fungerer siden godt på mobil?", answer: "Ja. Siden bygges mobil-først og lynrask, slik at boliger og skjema ser upåklagelige ut på alle skjermer." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "mobilvennlig" },
    ],
  },
  {
    id: "restaurant",
    title: "Nettside for restauranter",
    shortDescription:
      "En fristende nettside med meny, åpningstider og bordbestilling som fyller lokalet.",
    longDescription:
      "Gjester sjekker meny, åpningstider og bilder før de bestemmer seg. Er informasjonen vanskelig å finne, velger de et annet sted. Vi lager appetittvekkende, mobilvennlige nettsider for restauranter — med oppdatert meny, bordbestilling og kobling mot Google Maps, så det blir enkelt å velge nettopp dere.",
    categoryTag: "Restaurant",
    features: [
      "Fristende meny som er enkel å oppdatere",
      "Bordbestilling rett fra siden",
      "Tydelige åpningstider og veibeskrivelse",
      "Bildegalleri av mat og lokale",
      "Lokal SEO og Google Maps-kobling",
      "Lynrask og perfekt på mobil",
    ],
    detailedFeatures: [
      { iconName: "file-text", title: "Digital meny", description: "Alltid oppdatert, enkel å endre" },
      { iconName: "calendar", title: "Bordbestilling", description: "Gjester reserverer rett fra siden" },
      { iconName: "map-pin", title: "Maps & lokal SEO", description: "Synlig når folk søker mat i nærheten" },
      { iconName: "star", title: "Bildegalleri", description: "Fristende bilder av mat og lokale" },
      { iconName: "smartphone", title: "Mobil først", description: "De fleste sjekker meny på mobilen" },
    ],
    painPoints: [
      { title: "Gjesten velger et annet sted", description: "Vanskelig å finne meny og åpningstider sender gjesten videre" },
      { title: "Utdatert meny på nett", description: "Gamle priser og retter skaper irritasjon og dårlig inntrykk" },
      { title: "Usynlig i lokalsøk", description: "Konkurrenten dukker opp på «restaurant i nærheten» — ikke dere" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på konseptet, menyen og bestillingsbehovet" },
      { step: 2, title: "Design", description: "Et appetittvekkende uttrykk som matcher stedet" },
      { step: 3, title: "Utvikling", description: "Vi bygger meny, bordbestilling og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan vi oppdatere menyen selv?", answer: "Vi setter opp menyen slik at den er enkel å endre. Mindre oppdateringer kan også inngå i en vedlikeholdsavtale om dere ønsker at vi tar det." },
      { question: "Kan gjester bestille bord fra siden?", answer: "Ja. Vi kan integrere bordbestilling eller koble inn reservasjonssystemet dere allerede bruker, sømløst fra nettsiden." },
      { question: "Hva koster en nettside for en restaurant?", answer: "En profesjonell restaurantnettside starter fra kr 15 000 og avhenger av funksjoner som bestilling og galleri. Du får alltid et uforpliktende tilbud først." },
      { question: "Blir vi synlige på Google Maps?", answer: "Ja. Vi kobler siden mot Google Bedriftsprofil og bygger inn lokal SEO, slik at dere dukker opp når folk søker etter mat i nærheten." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 70, suffix: "%", label: "av søk skjer på mobil" },
    ],
  },
  {
    id: "fysioterapeut",
    title: "Nettside for fysioterapeuter",
    shortDescription:
      "En rolig, tillitsvekkende nettside med online timebestilling som fyller timeboken med pasienter.",
    longDescription:
      "Pasienter søker etter hjelp når de har vondt, og velger den klinikken som virker trygg og er lett å bestille time hos. Vi lager rolige, pasientvennlige nettsider for fysioterapeuter — med online timebestilling, tydelig oversikt over behandlinger og lokal SEO, så nye pasienter finner og velger dere.",
    categoryTag: "Fysioterapi",
    features: [
      "Online timebestilling åpen hele døgnet",
      "Tydelig oversikt over behandlinger og priser",
      "Presentasjon av behandlere og klinikk",
      "GDPR-trygg håndtering av henvendelser",
      "Lokal SEO for «fysioterapeut [sted]»",
      "Lynrask og perfekt på mobil",
    ],
    detailedFeatures: [
      { iconName: "calendar", title: "Online booking", description: "Pasienter bestiller time selv, døgnet rundt" },
      { iconName: "file-text", title: "Behandlinger", description: "Tydelig hva dere tilbyr og til hvem" },
      { iconName: "map-pin", title: "Lokal SEO", description: "Synlig på «fysioterapeut [sted]»" },
      { iconName: "lock", title: "GDPR-trygg", description: "Sikker håndtering av pasienthenvendelser" },
      { iconName: "smartphone", title: "Mobil først", description: "De fleste finner klinikken på mobilen" },
    ],
    painPoints: [
      { title: "Tomme luker i timeboken", description: "Uten online booking mister du pasienter som ikke ringer i åpningstiden" },
      { title: "Pasienten velger naboklinikken", description: "En utdatert side får en god klinikk til å virke mindre trygg" },
      { title: "Usynlig i lokalsøk", description: "Konkurrenten dukker opp på «fysioterapeut i nærheten» — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på behandlinger, pasientreisen og bookingbehovet" },
      { step: 2, title: "Design", description: "Et rolig, tillitsvekkende uttrykk" },
      { step: 3, title: "Utvikling", description: "Vi bygger booking, behandlingssider og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan dere koble på timebestillingssystemet vårt?", answer: "Ja. Vi integrerer de vanligste norske bookingløsningene, eller lenker pasienten rett inn i systemet dere bruker — sømløst fra nettsiden." },
      { question: "Blir vi synlige på Google?", answer: "Ja. Vi bygger inn lokal SEO og strukturerte data slik at klinikken blir synlig på «fysioterapeut [sted]» og i Google Maps." },
      { question: "Hva koster en nettside for en fysioterapiklinikk?", answer: "En profesjonell klinikknettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, basert på omfang og funksjoner." },
      { question: "Er pasienthenvendelser GDPR-trygge?", answer: "Ja. Skjemaer og datalagring settes opp i samsvar med GDPR og norsk personvernlovgivning." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 24, suffix: "/7", label: "åpen timebestilling" },
    ],
  },
  {
    id: "byggefirma",
    title: "Nettside for byggefirmaer",
    shortDescription:
      "En solid nettside med prosjektgalleri og tilbudsskjema som lander større oppdrag.",
    longDescription:
      "Kunder med store byggeprosjekter velger firmaet som virker mest seriøst og kan vise til tidligere arbeid. Vi lager solide, tillitsvekkende nettsider for byggefirmaer og entreprenører — med prosjektgalleri, sentral godkjenning og et tilbudsskjema som gjør det enkelt å be om befaring på de store jobbene.",
    categoryTag: "Bygg",
    features: [
      "Prosjektgalleri med før/etter som bygger tillit",
      "Sentral godkjenning og sertifiseringer godt synlig",
      "Tilbudsskjema med bildeopplasting",
      "Tydelig oversikt over tjenester og områder",
      "Lokal SEO for «byggefirma [sted]»",
      "Lynrask og perfekt på mobil ute på byggeplass",
    ],
    detailedFeatures: [
      { iconName: "star", title: "Prosjektgalleri", description: "Vis fram tidligere arbeid med før/etter" },
      { iconName: "shield", title: "Godkjenninger", description: "Sentral godkjenning og sertifiseringer" },
      { iconName: "mail", title: "Tilbudsskjema", description: "Kunden beskriver jobben og laster opp bilde" },
      { iconName: "map-pin", title: "Lokal SEO", description: "Synlig på «byggefirma [sted]»" },
      { iconName: "smartphone", title: "Rask & mobil", description: "Laster raskt — også på byggeplassen" },
    ],
    painPoints: [
      { title: "Mister de store jobbene", description: "Uten å vise tidligere arbeid taper du oppdrag til mer synlige firmaer" },
      { title: "Virker mindre seriøs", description: "En svak nettside skaper tvil hos kunder med store prosjekter" },
      { title: "Usynlig i lokalsøk", description: "Konkurrenten rangerer på «byggefirma [sted]» — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Kartlegging", description: "Vi ser på tjenestene, prosjektene og områdene" },
      { step: 2, title: "Design", description: "Et solid, tillitsvekkende uttrykk" },
      { step: 3, title: "Utvikling", description: "Vi bygger galleri, skjema og lokal SEO" },
      { step: 4, title: "Lansering", description: "Go live, opplæring og 30 dagers support" },
    ],
    faq: [
      { question: "Kan dere vise fram prosjektene våre?", answer: "Ja. Vi bygger et prosjektgalleri med før/etter-bilder som dokumenterer kvaliteten og hjelper dere å lande større oppdrag." },
      { question: "Kan kunder be om befaring fra siden?", answer: "Ja. Vi setter opp et tilbudsskjema med bildeopplasting, perfekt for å motta forespørsler om større byggeprosjekter." },
      { question: "Hva koster en nettside for et byggefirma?", answer: "En profesjonell nettside for bygg og entreprenør starter fra kr 15 000 og avhenger av omfang og funksjoner. Du får alltid et uforpliktende tilbud først." },
      { question: "Blir vi synlige lokalt?", answer: "Ja. Vi bygger inn lokal SEO og kobler siden mot Google Bedriftsprofil, slik at dere rangerer på «byggefirma [sted]» og i Maps." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "mobilvennlig" },
    ],
  },
];

export const INDUSTRY_SEO: Record<string, { title: string; description: string }> = {
  tannlege: {
    title: "Nettside for tannleger — online booking og flere pasienter",
    description:
      "Vi lager raske, pasientvennlige nettsider for tannleger med online timebestilling, prisliste og lokal SEO. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  elektriker: {
    title: "Nettside for elektrikere — bli synlig lokalt og få flere jobber",
    description:
      "Mobilvennlige nettsider for elektrikere med trykk-for-å-ringe, tilbudsskjema og lokal SEO for «elektriker [sted]». Faste priser, ingen bindingstid. Få et tilbud.",
  },
  rorlegger: {
    title: "Nettside for rørleggere — fang akuttjobber og store prosjekter",
    description:
      "Raske nettsider for rørleggere med døgnvakt-info, trykk-for-å-ringe og lokal SEO for «rørlegger [sted]». Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  advokat: {
    title: "Nettside for advokater — bygg troverdighet og få flere klienter",
    description:
      "Autoritative, diskrete nettsider for advokater og advokatfirmaer med fagområde-sider, trygg kontakt og SEO. Faste priser, ingen bindingstid. Få et tilbud.",
  },
  frisor: {
    title: "Nettside for frisører — online booking og fulle stoler",
    description:
      "Stilrene nettsider for frisørsalonger med online timebestilling, galleri og lokal SEO for «frisør [sted]». Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  regnskapsforer: {
    title: "Nettside for regnskapsførere — bygg tillit og få flere kunder",
    description:
      "Tillitsvekkende nettsider for regnskapsbyråer med tydelige tjenester, fagartikler og lokal SEO. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  eiendomsmegler: {
    title: "Nettside for eiendomsmeglere — flere visninger og verdivurderinger",
    description:
      "Lekre nettsider for eiendomsmeglere med boligvisning, verdivurderingsskjema og områdesider med lokal SEO. Faste priser, ingen bindingstid. Få et tilbud.",
  },
  restaurant: {
    title: "Nettside for restauranter — meny, bordbestilling og flere gjester",
    description:
      "Appetittvekkende nettsider for restauranter med digital meny, bordbestilling og Google Maps-kobling. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  fysioterapeut: {
    title: "Nettside for fysioterapeuter — online booking og flere pasienter",
    description:
      "Pasientvennlige nettsider for fysioterapeuter med online timebestilling, behandlingssider og lokal SEO. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  byggefirma: {
    title: "Nettside for byggefirmaer — prosjektgalleri og flere oppdrag",
    description:
      "Solide nettsider for byggefirmaer og entreprenører med prosjektgalleri, tilbudsskjema og lokal SEO. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
};

export function getIndustry(slug: string): Service | undefined {
  return INDUSTRIES.find((i) => i.id === slug);
}

export function getAllIndustrySlugs(): string[] {
  return INDUSTRIES.map((i) => i.id);
}
