import type { BlogPost } from "@/types";

export const aiSokSynlighet: BlogPost = {
  slug: "ai-sok-synlighet",
  title: "Slik blir nettsiden din funnet i AI-søk",
  excerpt:
    "Flere stiller spørsmålet sitt til ChatGPT eller Google AI i stedet for å skrive søkeord. Her er det som faktisk hjelper at nettsiden din blir brukt som kilde, uten triks.",
  metaDescription:
    "Slik blir nettsiden din brukt som kilde i ChatGPT og Google AI: robots.txt, svar først, strukturerte data og hva som ikke hjelper. Praktisk guide for norske bedrifter.",
  publishedDate: "2026-10-22",
  readingTime: "9 min",
  category: "SEO",
  sections: [
    {
      heading: "Kort svar",
      paragraphs: [
        "AI-søk er i stor grad bygget på det samme som vanlig søk: sider som er lette å finne, lette å lese og lette å stole på. Det finnes ingen hemmelig knapp. Det som lønner seg, er klare svar, konkrete fakta om bedriften din og en teknisk base som ikke stenger roboter ute.",
        "Gjør du allerede et godt SEO-arbeid, er du et godt stykke på vei. Mangler du det, er seks tiltak lenger ned en grei plan.",
      ],
    },
    {
      heading: "Hva som har endret seg",
      paragraphs: [
        "Google har begynt å vise AI-oppsummeringer øverst i søkeresultatene, og tjenester som ChatGPT og Perplexity kan søke på nettet og oppgi kilder. Tek.no har skrevet at Google har startet [tester av AI-svar i Norge](https://www.tek.no/nyheter/nyhet/i/eMLg4g/googles-ai-soek-har-kommet-til-norge) og at [AI Mode er på vei til norske brukere](https://www.tek.no/nyheter/nyhet/i/5EPbO1/googles-soek-faar-ai-mode-i-norge). Hva som vises, og til hvem, endrer seg raskt, så sjekk selv hva du får opp.",
        "For deg som driver en bedrift betyr det to ting. Noen besøkende får svaret uten å klikke, og de som fortsatt klikker, har ofte kommet via en kilde AI-en valgte. Målet blir å være den kilden.",
      ],
    },
    {
      heading: "Slik leser en AI siden din",
      paragraphs: [
        "En AI-tjeneste henter ut biter av siden og bruker dem i et svar. Biter som sier noe konkret, kommer med. Biter som er fyldtekst, blir stående igjen. Prøv selv, med en fiktiv klinikk:",
      ],
      widget: "answer-first",
    },
    {
      paragraphs: [
        "Den andre teksten sier hva, hvor, for hvem og når, og det er det en AI kan gjenbruke.",
      ],
    },
    {
      heading: "Seks ting som hjelper",
      paragraphs: [],
    },
    {
      heading: "1. La robotene inn",
      level: 3,
      paragraphs: [
        "Sjekk robots.txt. Blokkerer du de riktige robotene, finnes du ikke i svarene deres. OpenAI har én robot for søk (`OAI-SearchBot`) og én for modelltrening (`GPTBot`), og du kan velge ulikt for dem. Ifølge Google styrer `Google-Extended` bruk i Gemini og ikke vanlig Google-søk, mens AI-oppsummeringene i søk hentes av vanlige Googlebot.",
      ],
      code: {
        caption: "robots.txt",
        code: `# Vanlig søk
User-agent: Googlebot
Allow: /

# ChatGPT-søk og Perplexity
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

# Modelltrening: velg selv. Dette stenger den ute.
User-agent: GPTBot
Disallow: /

Sitemap: https://din-side.no/sitemap.xml`,
      },
    },
    {
      heading: "2. Svar først, forklar etterpå",
      level: 3,
      paragraphs: [
        "Begynn hver seksjon med en til to setninger som svarer på spørsmålet. Detaljene kommer under.",
      ],
    },
    {
      heading: "3. Vær konkret",
      level: 3,
      paragraphs: [
        "Sted, åpningstider, målgruppe, hva noe koster eller hvor lang tid det tar. Generelle fraser kan ikke siteres.",
      ],
    },
    {
      heading: "4. Legg inn strukturerte data",
      level: 3,
      paragraphs: [
        "Schema.org-markering, for eksempel `LocalBusiness`, forteller maskiner hvem du er og hvor du holder til. Eksempelet under er fiktivt.",
      ],
      code: {
        caption: "JSON-LD (eksempel)",
        code: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Nordkvartalet Tannklinikk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Eksempelgata 1",
    "postalCode": "0000",
    "addressLocality": "Oslo"
  },
  "openingHours": "Mo-Fr 08:00-16:00"
}
</script>`,
      },
      tip: {
        title: "Tips: bytt ut eksempelet",
        text: "Alt i koden over er fiktivt. Bruk dine egne opplysninger, og sørg for at de er identiske med det som står på siden og i Google Bedriftsprofil.",
      },
    },
    {
      heading: "5. Rydd opp utenfor egen side",
      level: 3,
      paragraphs: [
        "Google Bedriftsprofil, samme navn og telefon overalt, og ærlige omtaler. AI-tjenester leser også det andre skriver om deg.",
      ],
    },
    {
      heading: "6. Sørg for at teksten ligger i HTML-en",
      level: 3,
      paragraphs: [
        "Innhold som bare dukker opp etter at JavaScript har kjørt, leser ikke alle roboter. Slå av JavaScript i nettleseren og se hva som er igjen.",
      ],
    },
    {
      heading: "Det som ikke hjelper",
      paragraphs: [],
      listItems: [
        "Å fylle siden med AI-skrevet tekst som ikke sier noe nytt. Den blir lik tusen andre sider, og det finnes ingen grunn til å sitere den.",
        "Å skjule tekst for mennesker og skrive den for roboter. Det er gammelt spam i ny drakt.",
        "En llms.txt-fil som hovedtiltak. Google har uttalt at de ikke bruker den. Lag den gjerne senere, men innholdet kommer først.",
        "Å love kunder «topplassering i ChatGPT». Svarene varierer fra person til person og fra dag til dag, så ingen kan garantere dem.",
      ],
    },
    {
      heading: "Slik måler du det",
      paragraphs: [
        "Det finnes ikke en perfekt rapport ennå. Den enkleste metoden er også den beste: still spørsmålene kundene dine stiller, og se hva som kommer opp.",
      ],
      checklist: {
        title: "AI-test av siden din",
        items: [
          "Jeg har skrevet ned fem spørsmål en kunde ville stilt (for eksempel «hvem er beste rørlegger i Drammen?»)",
          "Jeg har stilt dem i ChatGPT, Google og Perplexity og notert resultatet",
          "robots.txt blokkerer ikke OAI-SearchBot, PerplexityBot eller Googlebot",
          "Sidene mine svarer på spørsmålet i de første setningene",
          "Navn, adresse og telefon er helt like på nettsiden og i Google Bedriftsprofil",
          "Siden har strukturerte data som stemmer med innholdet",
          "Jeg gjentar testen om en måned",
        ],
      },
    },
  ],
  faq: [
    {
      question: "Må jeg slippe inn AI-roboter på nettsiden min?",
      answer:
        "Vil du bli nevnt i ChatGPT-søk, bør du ikke blokkere OAI-SearchBot. GPTBot brukes til trening av modeller og kan blokkeres uten at det påvirker om du vises i søk.",
    },
    {
      question: "Trenger jeg en llms.txt-fil?",
      answer:
        "Nei. Google har uttalt at de ikke bruker den, og lite tyder på at andre vektlegger den. Den skader ikke, men bruk tiden på innholdet først.",
    },
    {
      question: "Erstatter AI-søk vanlig SEO?",
      answer:
        "Nei. AI-tjenestene bygger i stor grad på det samme som vanlig søk: sider som er lette å finne, lese og stole på.",
    },
    {
      question: "Kan jeg måle om AI-tjenester nevner bedriften min?",
      answer:
        "Ja, enkelt: still tre til fem spørsmål en kunde ville stilt i ChatGPT, Google og Perplexity hver måned, og noter om og hvordan du nevnes.",
    },
  ],
};
