import type { BlogPost } from "@/types";

export const webpEllerIkkeWebp: BlogPost = {
  slug: "webp-eller-ikke-webp",
  title: "WebP eller ikke? Slik velger du bildeformat for en rask nettside",
  excerpt:
    "Kort svar: ja, bruk WebP. Lengre svar: det finnes tre steder der det ikke er det beste valget, og én feil som gjør nettsiden tregere uansett format.",
  metaDescription:
    "Bør du bruke WebP, AVIF eller JPEG på nettsiden din? Tall du kan stole på, ferdig kode for HTML, WordPress og Next.js, og en sjekkliste.",
  publishedDate: "2026-10-22",
  readingTime: "8 min",
  category: "Teknologi",
  sections: [
    {
      heading: "Kort svar",
      paragraphs: [
        "Bruk WebP til bilder på nettsiden din. Støtten er nær universell, filene blir typisk en fjerdedel til en tredjedel mindre enn JPEG, og de aller fleste verktøy kan lage dem med ett klikk. Har du tid til litt ekstra oppsett, legg AVIF først og WebP som reserve. Logoer og ikoner bør være SVG.",
      ],
    },
    {
      heading: "Hvorfor bilder avgjør hvor rask siden er",
      paragraphs: [
        "På de fleste bedriftsnettsider er bilder det tyngste som lastes ned. Ofte er det også bilder som avgjør Largest Contentful Paint (LCP), målet for hvor fort det største synlige elementet dukker opp. Google regner under 2,5 sekunder som bra. Et heltebilde på 1,8 MB fra en mobilkamera-opplasting fører deg sjelden dit, særlig på dårlig dekning.",
        "Besøkende venter ikke pent. En side som bruker flere sekunder på å vise noe, mister folk før de har lest overskriften. Format er bare en av tre spaker her. De to andre er størrelse (pikslene) og når bildet lastes. Vi kommer tilbake til dem.",
      ],
      tip: {
        title: "Tips: sjekk det største bildet først",
        text: "Åpne siden i Chrome, trykk F12, velg fanen «Network» og filtrer på «Img». Sorter etter størrelse. Det øverste bildet er nesten alltid der du får mest igjen.",
      },
    },
    {
      heading: "Formatene side om side",
      paragraphs: [],
      widget: "webp-sizes",
      table: {
        head: ["Format", "Best til", "Støtte", "Verdt å vite"],
        rows: [
          ["JPEG", "Foto, som reserve", "Alt", "Trygt, men tyngst"],
          ["WebP", "Foto og grafikk, standardvalget", "Rundt 97 prosent", "Rask å lage, finnes overalt"],
          ["AVIF", "Foto der hver kilobyte teller", "Rundt 92 til 96 prosent", "Tregere å lage, tåler ikke eldre nettlesere"],
          ["SVG", "Logo, ikoner, enkle illustrasjoner", "Alt", "Skarp i alle størrelser, ofte under 5 kB"],
          ["PNG", "Skjermbilder med skarp tekst, gjennomsiktighet", "Alt", "Stor for foto"],
        ],
      },
    },
    {
      paragraphs: [
        "Støttetallene varierer mellom kildene, så sjekk [caniuse.com](https://caniuse.com/webp) når du bestemmer deg.",
      ],
    },
    {
      heading: "Når WebP ikke passer",
      paragraphs: [],
    },
    {
      heading: "Logoen og ikonene",
      level: 3,
      paragraphs: [
        "En logo som SVG er som regel mindre enn samme logo i WebP, og den blir skarp på en 4K-skjerm også. Tegnede grafikker går samme vei.",
      ],
    },
    {
      heading: "Skjermbilder med små bokstaver",
      level: 3,
      paragraphs: [
        "Kraftig komprimering gjør tekst uskarp. Bruk WebP uten tap (lossless) eller PNG, og kontroller at teksten er lesbar i full størrelse.",
      ],
    },
    {
      heading: "E-post og vedlegg",
      level: 3,
      paragraphs: [
        "Mange e-postprogrammer viser fortsatt ikke WebP, og noen få eldre systemer åpner det ikke. Hold deg til JPEG og PNG der bildet skal ut av nettsiden din.",
      ],
      tip: {
        title: "Ikke konverter et JPEG som allerede er komprimert flere ganger",
        text: "Hver runde med tapsbasert komprimering fjerner litt mer. Start alltid fra originalen fra kamera eller designer, og behold den et trygt sted.",
        tone: "warn",
      },
    },
    {
      heading: "Slik gjør du det",
      paragraphs: ["Velg verktøyet du faktisk bruker:"],
      tabs: [
        {
          label: "Vanlig HTML",
          body: [
            {
              type: "p",
              text: "Bruk `<picture>`. Nettleseren tar det første formatet den forstår, og faller tilbake på JPEG hvis ingen passer.",
            },
            {
              type: "code",
              caption: "HTML",
              code: `<picture>
  <source srcset="hero-1200.avif" type="image/avif">
  <source srcset="hero-1200.webp" type="image/webp">
  <img src="hero-1200.jpg"
       width="1200" height="800"
       alt="Beskriv hva bildet viser"
       fetchpriority="high">
</picture>`,
            },
            {
              type: "p",
              text: "Er du bare ute etter WebP, fjern `avif`-linjen. Gjør bildet ikke noe under første skjermbilde, bytt `fetchpriority=\"high\"` med `loading=\"lazy\"`.",
            },
          ],
        },
        {
          label: "WordPress",
          body: [
            {
              type: "p",
              text: "WordPress har lastet opp WebP siden versjon 5.8 og AVIF siden 6.5. Det betyr at du kan laste opp filene direkte. For eksisterende bildebibliotek er en plugin som konverterer i bakgrunnen det enkleste.",
            },
            {
              type: "list",
              items: [
                "Velg én konverteringsplugin, ikke to. De kolliderer lett.",
                "Sett kvaliteten rundt 75 til 80 og se på tre ulike bilder før du godtar den.",
                "Ta sikkerhetskopi av opplastingsmappen først.",
              ],
            },
          ],
        },
        {
          label: "Next.js",
          body: [
            {
              type: "p",
              text: "Komponenten `next/image` leverer WebP automatisk. AVIF slår du på selv, og da velger nettleseren det beste formatet den støtter.",
            },
            {
              type: "code",
              caption: "next.config.ts",
              code: `const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;`,
            },
            {
              type: "p",
              text: "Husk `priority` på bildet over skjermbrettet, og oppgi `width` og `height` eller `fill` med en fast ramme.",
            },
          ],
        },
      ],
    },
    {
      heading: "Feil som koster sekunder",
      paragraphs: ["Formatvalget er sjelden det som lager problemer. Disse fire er mer vanlige:"],
    },
    {
      heading: "Bildet er mye større enn det vises",
      level: 3,
      paragraphs: [
        "Et bilde på 4000 piksler i bredden som vises i en kolonne på 700 piksler, sender mer enn fem ganger så mange piksler som nødvendig. Lag flere størrelser og la nettleseren velge med `srcset` og `sizes`.",
      ],
    },
    {
      heading: "Hovedbildet lastes «lazy»",
      level: 3,
      paragraphs: [
        "Utsatt lasting er bra for bilder langt nede på siden. På bildet folk ser først, utsetter den bare det som skulle komme raskest.",
      ],
    },
    {
      heading: "Ingen bredde og høyde",
      level: 3,
      paragraphs: [
        "Uten mål vet ikke nettleseren hvor mye plass bildet trenger, og teksten hopper når det dukker opp. Det gir dårlig CLS (layout shift). Sett alltid `width` og `height`.",
      ],
    },
    {
      heading: "Kvalitet på 100",
      level: 3,
      paragraphs: [
        "Over 85 blir filen mye større uten at noen ser forskjell. Start på 75 til 80 og gå opp bare hvis du ser støy.",
      ],
    },
    {
      heading: "Sjekkliste før du publiserer",
      paragraphs: [],
      checklist: {
        title: "Bilder klare for publisering",
        items: [
          "Foto er WebP (eller AVIF med WebP som reserve)",
          "Logo og ikoner er SVG",
          "Ingen bilder er bredere enn 2000 piksler uten god grunn",
          "Hovedbildet har høy prioritet, resten er lazy",
          "Alle bilder har width, height og en beskrivende alt-tekst",
          "Filnavnene sier hva bildet er (`tannlege-oslo-resepsjon.webp`, ikke `IMG_4471.webp`)",
          "Jeg har testet siden på mobil i PageSpeed Insights",
        ],
      },
    },
  ],
  faq: [
    {
      question: "Er WebP bedre enn JPEG?",
      answer:
        "For bilder på nett, ja. Googles egne tester gir typisk 25 til 34 prosent mindre filer ved samme synlige kvalitet, og nesten alle nettlesere støtter formatet.",
    },
    {
      question: "Skal jeg bruke AVIF i stedet for WebP?",
      answer:
        "AVIF gir ofte enda mindre filer, men er tregere å lage og støttes av litt færre nettlesere. Legg det først i et picture-element med WebP som reserve hvis oppsettet ditt gjør det enkelt.",
    },
    {
      question: "Bør logoen min være WebP?",
      answer: "Nei, bruk SVG. Den er skarp i alle størrelser og ofte under 5 kB.",
    },
    {
      question: "Påvirker bildeformat Google-rangeringen?",
      answer:
        "Ikke direkte. Formatet gjør siden raskere, og hastighet inngår i Core Web Vitals, som Google bruker som ett av mange signaler. Bildene dine kan også dukke opp i bildesøk, så gode filnavn og alt-tekst teller.",
    },
  ],
};
