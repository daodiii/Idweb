import type { BlogPost } from "@/types";

export const phpNettside2026: BlogPost = {
  slug: "php-nettside-2026",
  title: "Nettside i PHP i 2026: fortsatt et smart valg?",
  excerpt:
    "PHP er ikke dødt, og WordPress er ikke feil valg. Men PHP 8.2 mister sikkerhetsstøtten 31. desember 2026, og mange nettsider kjører fortsatt på den.",
  metaDescription:
    "PHP 8.2 mister sikkerhetsstøtte 31. desember 2026. Hva det betyr for WordPress-siden din, når PHP fortsatt er riktig valg, og når det lønner seg å bygge noe annet.",
  publishedDate: "2026-10-22",
  readingTime: "9 min",
  category: "Teknologi",
  sections: [
    {
      heading: "Kort svar",
      paragraphs: [
        "PHP er et fullt levende språk. Versjon 8.5 kom i november 2025, og WordPress, som bygger på PHP, ligger rundt 42 prosent av nettsidene i W3Techs sitt utvalg (tall fra mai 2026). Å velge PHP er ikke en dårlig idé.",
        "Det som kan være en dårlig idé, er å la en gammel PHP-versjon ligge. Og det er verdt å stille et ærlig spørsmål om siden din egentlig trenger alt WordPress kommer med.",
      ],
    },
    {
      heading: "Datoene som betyr noe",
      paragraphs: [
        "Hver PHP-versjon får to år med vanlige feilrettinger og deretter to år der bare sikkerhetshull blir rettet. Etter det får den ingenting. Et kjent sikkerhetshull som ikke blir rettet, står åpent for alle.",
      ],
      widget: "php-versions",
    },
    {
      paragraphs: [
        "Praktisk betyr det dette: ligger du på 8.2, har du til 31. desember 2026. Ligger du på 8.1 eller eldre, får du ingen rettelser i dag. PHP 8.3 eller 8.4 er et trygt valg akkurat nå.",
      ],
      tip: {
        title: "Ikke bare skru opp versjonen",
        text: "Gamle plugins og temaer kan brekke på nyere PHP. Test først i en kopi av siden (en «staging»-versjon), eller be den som drifter siden om å gjøre det. Hos mange verter kan du bytte versjon i kontrollpanelet og bytte tilbake hvis noe går galt.",
        tone: "warn",
      },
    },
    {
      heading: "Hva PHP er bra til",
      paragraphs: [
        "PHP er bygget for nettsider, og det merkes. Nesten alle webhoteller kjører det. Det finnes en enorm mengde ferdige løsninger, og det er lett å få tak i noen som kan det. Hvis du skal drive en blogg, en enkel bedriftsside eller en liten nettbutikk, og du vil redigere innholdet selv uten å kunne kode, er WordPress et reelt og godt valg.",
        "Det samme gjelder om budsjettet er stramt. Et godt oppsatt WordPress-nettsted kan komme seg langt for en brøkdel av prisen på noe skreddersydd.",
      ],
    },
    {
      heading: "Der det knirker",
      paragraphs: ["Problemene sitter som regel i det som er bygget oppå PHP."],
    },
    {
      heading: "Plugins",
      level: 3,
      paragraphs: [
        "Hvert tillegg er mer kode som må holdes oppdatert. Sikkerhetshull i WordPress-sider sporer ofte tilbake til plugins og temaer, ikke til selve kjernen.",
      ],
    },
    {
      heading: "Hastighet",
      level: 3,
      paragraphs: [
        "Et tema som laster mange skript og fonter, kombinert med billig hosting, gir treg side. Det kan løses, men det krever jobb.",
      ],
    },
    {
      heading: "Design",
      level: 3,
      paragraphs: [
        "Et ferdig tema ser ut som alle andre med samme tema. Skal siden din skille seg ut, må mye overstyres.",
      ],
    },
    {
      heading: "Egen logikk",
      level: 3,
      paragraphs: [
        "Innlogging for kunder, booking med egne regler eller en intern oversikt kan bygges i WordPress, men blir fort et lappeteppe av plugins.",
      ],
      tip: {
        title: "Tips: tell pluginene",
        text: "Gå gjennom listen din og fjern alt du ikke bruker. Er det en plugin som gjør noe du kunne løst med ti linjer kode eller en innstilling, så er det ofte billigere å gjøre det.",
      },
    },
    {
      heading: "Alternativene",
      paragraphs: ["Hvis PHP og WordPress ikke passer, er det to hovedspor."],
      listItems: [
        "En skreddersydd nettside bygget med moderne verktøy som Next.js. Du får full kontroll på design og hastighet, og ingen plugin-lapper å holde oppdatert. Du betaler mer i starten, og redigering skjer gjennom et enkelt administrasjonsverktøy eller via den som bygde siden.",
        "Et ferdig byggesystem som Wix eller Squarespace. Raskt å komme i gang, men du leier plassen og får mindre kontroll.",
      ],
    },
    {
      paragraphs: [
        "Riktig valg avhenger av hva siden skal gjøre for deg, hvem som skal oppdatere den, og hva du vil bruke på den. Quizen under er en grov veiviser.",
      ],
    },
    {
      heading: "Hva passer deg best?",
      paragraphs: [],
      widget: "php-quiz",
    },
    {
      heading: "Gjør dette denne uken",
      paragraphs: [],
      checklist: {
        title: "Oppdater PHP uten å brekke siden",
        items: [
          "Finn PHP-versjonen. I WordPress: Verktøy, Nettstedshelse, Info, Server",
          "Sammenlign med datoene over. Er den 8.2 eller eldre, planlegg oppgradering nå",
          "Ta sikkerhetskopi av både filer og database",
          "Test oppdateringen på en kopi av siden, eller be verten om hjelp",
          "Fjern plugins og temaer du ikke bruker",
          "Slå på automatiske sikkerhetsoppdateringer og gi én person ansvar for dem",
        ],
      },
    },
  ],
  faq: [
    {
      question: "Er PHP dødt i 2026?",
      answer:
        "Nei. PHP 8.5 kom i november 2025 og får sikkerhetsoppdateringer til slutten av 2029. Språket driver fortsatt en stor del av nettet.",
    },
    {
      question: "Hvilken PHP-versjon bør jeg bruke?",
      answer:
        "PHP 8.3 eller 8.4 er et trygt valg i dag. 8.2 slutter å få sikkerhetsoppdateringer 31. desember 2026, og eldre versjoner får ingenting.",
    },
    {
      question: "Hvordan ser jeg hvilken versjon siden min bruker?",
      answer:
        "I WordPress-admin: Verktøy, Nettstedshelse, Info, og åpne delen Server. Der står PHP-versjonen. Ellers kan nettverten svare.",
    },
    {
      question: "Er WordPress tregt?",
      answer:
        "Ikke i seg selv. Trege sider skyldes som regel mange plugins, et tungt tema, store bilder og billig hosting. Alt det kan rettes.",
    },
  ],
};
