import type { Service } from "@/types";

/**
 * Geo landing pages — programmatic local SEO.
 *
 * Targets "webutvikler [sted]" for municipalities around Oslo where
 * competition is lower than the Oslo head term. IDweb is Oslo-based and
 * serves the greater Oslo region, so each page is framed as a local
 * developer for that area (with real local context to avoid thin pages).
 *
 * Oslo itself is intentionally excluded here — it has a dedicated page at
 * /tjenester/webutvikler-oslo (avoids duplicate-content cannibalisation).
 *
 * Shape mirrors `SERVICES` so the existing /tjenester template components
 * are reused. Route: /webutvikler/[sted]  ·  data id === slug.
 */
export const LOCATIONS: Service[] = [
  {
    id: "baerum",
    title: "Webutvikler i Bærum",
    shortDescription:
      "Lokal webutvikler for bedrifter i Bærum — raske, skreddersydde nettsider med personlig oppfølging.",
    longDescription:
      "Bærum er blant landets mest næringstette kommuner, fra Sandvika og Bekkestua til Fornebu og Høvik — og konkurransen om kundene på nett er hard. Vi lager raske, skreddersydde nettsider for bedrifter i Bærum, bygget i moderne Next.js i stedet for tung WordPress. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Bærum.",
    categoryTag: "Bærum",
    features: [
      "Skreddersydd Next.js — ingen tung WordPress",
      "Lokal SEO for «[bransje] Bærum» og «Sandvika»",
      "Personlig oppfølging — du snakker med utvikleren",
      "Heldigital prosess — oppstart og oppfølging på video",
      "Lynrask lasting og topp PageSpeed-score",
      "Norsk hosting, GDPR-trygg",
    ],
    detailedFeatures: [
      { iconName: "map-pin", title: "Lokal i Bærum", description: "Synlig på lokalsøk i Sandvika, Bekkestua og Fornebu" },
      { iconName: "zap", title: "Lynrask Next.js", description: "Moderne rammeverk i stedet for tung WordPress" },
      { iconName: "search", title: "Lokal SEO", description: "Optimalisert for bransjesøk i Bærum" },
      { iconName: "message-square", title: "Direkte kontakt", description: "Du snakker med utvikleren — ingen mellomledd" },
      { iconName: "shield", title: "Norsk hosting", description: "Servere i Norge, GDPR-trygg og rask" },
    ],
    painPoints: [
      { title: "Byråer som outsourcer", description: "Mange setter ut kodingen til utlandet — du betaler dyrt for en mellommann" },
      { title: "Treg WordPress", description: "Tunge ferdigløsninger gir 3–5 sek lastetid og svak PageSpeed" },
      { title: "Usynlig lokalt", description: "Konkurrenten i Bærum rangerer på bransjesøkene — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Digital oppstart", description: "Uforpliktende videomøte — vi blir kjent med bedriften og målene dine" },
      { step: 2, title: "Design", description: "Visuell prototype basert på bedriften og målene dine" },
      { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer for fart og SEO" },
      { step: 4, title: "Lansering", description: "Vi setter siden live og overleverer. Du eier alt." },
    ],
    faq: [
      { question: "Jobber dere med bedrifter i Bærum?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Bærum-området. Oppstart, oppfølging og levering skjer på video, e-post og telefon — uten reisetid og ekstra kostnader." },
      { question: "Kan dere få oss synlige på «[bransje] Bærum»?", answer: "Ja. Vi bygger inn lokal SEO og strukturerte data og kobler nettsiden mot Google Bedriftsprofil, slik at dere rangerer i lokalsøk og i Maps for Bærum-området." },
      { question: "Hva koster en nettside?", answer: "En profesjonell bedriftsnettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Bruker dere WordPress?", answer: "Nei. Vi bygger i moderne Next.js, som gir vesentlig raskere sider, bedre sikkerhet og bedre PageSpeed enn WordPress med plugins." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "skreddersydd kode" },
    ],
  },
  {
    id: "asker",
    title: "Webutvikler i Asker",
    shortDescription:
      "Lokal webutvikler for bedrifter i Asker — moderne, raske nettsider bygget for å skaffe kunder.",
    longDescription:
      "Asker har et bredt næringsliv fra sentrum til Heggedal, Holmen og det gamle Røyken og Hurum. Vi lager skreddersydde nettsider for Asker-bedrifter som vil skille seg ut og bli funnet lokalt — raske, mobilvennlige og bygget i Next.js. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Asker.",
    categoryTag: "Asker",
    features: [
      "Skreddersydd Next.js — ingen tung WordPress",
      "Lokal SEO for «[bransje] Asker»",
      "Personlig oppfølging — du snakker med utvikleren",
      "Heldigital prosess — oppstart og oppfølging på video",
      "Lynrask lasting og topp PageSpeed-score",
      "Norsk hosting, GDPR-trygg",
    ],
    detailedFeatures: [
      { iconName: "map-pin", title: "Lokal i Asker", description: "Synlig på lokalsøk i Asker, Heggedal og Holmen" },
      { iconName: "zap", title: "Lynrask Next.js", description: "Moderne rammeverk i stedet for tung WordPress" },
      { iconName: "search", title: "Lokal SEO", description: "Optimalisert for bransjesøk i Asker" },
      { iconName: "message-square", title: "Direkte kontakt", description: "Du snakker med utvikleren — ingen mellomledd" },
      { iconName: "shield", title: "Norsk hosting", description: "Servere i Norge, GDPR-trygg og rask" },
    ],
    painPoints: [
      { title: "Byråer som outsourcer", description: "Mange setter ut kodingen til utlandet — du betaler dyrt for en mellommann" },
      { title: "Treg WordPress", description: "Tunge ferdigløsninger gir 3–5 sek lastetid og svak PageSpeed" },
      { title: "Usynlig lokalt", description: "Konkurrenten i Asker rangerer på bransjesøkene — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Digital oppstart", description: "Uforpliktende videomøte — vi blir kjent med bedriften og målene dine" },
      { step: 2, title: "Design", description: "Visuell prototype basert på bedriften og målene dine" },
      { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer for fart og SEO" },
      { step: 4, title: "Lansering", description: "Vi setter siden live og overleverer. Du eier alt." },
    ],
    faq: [
      { question: "Jobber dere med bedrifter i Asker?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Asker-området. Oppstart, oppfølging og levering skjer på video, e-post og telefon — uten reisetid og ekstra kostnader." },
      { question: "Kan dere få oss synlige på «[bransje] Asker»?", answer: "Ja. Vi bygger inn lokal SEO og kobler nettsiden mot Google Bedriftsprofil, slik at dere rangerer i lokalsøk og i Maps for Asker-området." },
      { question: "Hva koster en nettside?", answer: "En profesjonell bedriftsnettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Bruker dere WordPress?", answer: "Nei. Vi bygger i moderne Next.js, som gir vesentlig raskere sider, bedre sikkerhet og bedre PageSpeed enn WordPress med plugins." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "skreddersydd kode" },
    ],
  },
  {
    id: "lillestrom",
    title: "Webutvikler i Lillestrøm",
    shortDescription:
      "Lokal webutvikler for bedrifter i Lillestrøm og på Romerike — raske, skreddersydde nettsider.",
    longDescription:
      "Lillestrøm kommune samler et voksende næringsliv fra Lillestrøm sentrum og Strømmen til Skedsmokorset og Kjeller. Vi lager moderne, raske nettsider for bedrifter på Romerike som vil bli funnet av lokale kunder — bygget i Next.js, ikke tung WordPress. Vi er Oslo-baserte og jobber heldigitalt med bedrifter på Romerike.",
    categoryTag: "Lillestrøm",
    features: [
      "Skreddersydd Next.js — ingen tung WordPress",
      "Lokal SEO for «[bransje] Lillestrøm» og Romerike",
      "Personlig oppfølging — du snakker med utvikleren",
      "Heldigital prosess — oppstart og oppfølging på video",
      "Lynrask lasting og topp PageSpeed-score",
      "Norsk hosting, GDPR-trygg",
    ],
    detailedFeatures: [
      { iconName: "map-pin", title: "Lokal på Romerike", description: "Synlig på lokalsøk i Lillestrøm, Strømmen og Kjeller" },
      { iconName: "zap", title: "Lynrask Next.js", description: "Moderne rammeverk i stedet for tung WordPress" },
      { iconName: "search", title: "Lokal SEO", description: "Optimalisert for bransjesøk i Lillestrøm-området" },
      { iconName: "message-square", title: "Direkte kontakt", description: "Du snakker med utvikleren — ingen mellomledd" },
      { iconName: "shield", title: "Norsk hosting", description: "Servere i Norge, GDPR-trygg og rask" },
    ],
    painPoints: [
      { title: "Byråer som outsourcer", description: "Mange setter ut kodingen til utlandet — du betaler dyrt for en mellommann" },
      { title: "Treg WordPress", description: "Tunge ferdigløsninger gir 3–5 sek lastetid og svak PageSpeed" },
      { title: "Usynlig lokalt", description: "Konkurrenten på Romerike rangerer på bransjesøkene — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Digital oppstart", description: "Uforpliktende videomøte — vi blir kjent med bedriften og målene dine" },
      { step: 2, title: "Design", description: "Visuell prototype basert på bedriften og målene dine" },
      { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer for fart og SEO" },
      { step: 4, title: "Lansering", description: "Vi setter siden live og overleverer. Du eier alt." },
    ],
    faq: [
      { question: "Jobber dere med bedrifter i Lillestrøm?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Lillestrøm-området. Oppstart, oppfølging og levering skjer på video, e-post og telefon — uten reisetid og ekstra kostnader." },
      { question: "Kan dere få oss synlige på «[bransje] Lillestrøm»?", answer: "Ja. Vi bygger inn lokal SEO og kobler nettsiden mot Google Bedriftsprofil, slik at dere rangerer i lokalsøk og i Maps på Romerike." },
      { question: "Hva koster en nettside?", answer: "En profesjonell bedriftsnettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Bruker dere WordPress?", answer: "Nei. Vi bygger i moderne Next.js, som gir vesentlig raskere sider, bedre sikkerhet og bedre PageSpeed enn WordPress med plugins." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "skreddersydd kode" },
    ],
  },
  {
    id: "lorenskog",
    title: "Webutvikler i Lørenskog",
    shortDescription:
      "Lokal webutvikler for bedrifter i Lørenskog — moderne, raske nettsider som skaffer flere kunder.",
    longDescription:
      "Lørenskog ligger midt mellom Oslo og Lillestrøm, med et aktivt næringsliv rundt Lørenskog sentrum, Metro og Visperud. Vi lager skreddersydde, lynraske nettsider for Lørenskog-bedrifter — bygget i Next.js for fart og synlighet i Google. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Lørenskog.",
    categoryTag: "Lørenskog",
    features: [
      "Skreddersydd Next.js — ingen tung WordPress",
      "Lokal SEO for «[bransje] Lørenskog»",
      "Personlig oppfølging — du snakker med utvikleren",
      "Heldigital prosess — oppstart og oppfølging på video",
      "Lynrask lasting og topp PageSpeed-score",
      "Norsk hosting, GDPR-trygg",
    ],
    detailedFeatures: [
      { iconName: "map-pin", title: "Lokal i Lørenskog", description: "Synlig på lokalsøk rundt Lørenskog sentrum og Metro" },
      { iconName: "zap", title: "Lynrask Next.js", description: "Moderne rammeverk i stedet for tung WordPress" },
      { iconName: "search", title: "Lokal SEO", description: "Optimalisert for bransjesøk i Lørenskog" },
      { iconName: "message-square", title: "Direkte kontakt", description: "Du snakker med utvikleren — ingen mellomledd" },
      { iconName: "shield", title: "Norsk hosting", description: "Servere i Norge, GDPR-trygg og rask" },
    ],
    painPoints: [
      { title: "Byråer som outsourcer", description: "Mange setter ut kodingen til utlandet — du betaler dyrt for en mellommann" },
      { title: "Treg WordPress", description: "Tunge ferdigløsninger gir 3–5 sek lastetid og svak PageSpeed" },
      { title: "Usynlig lokalt", description: "Konkurrenten i Lørenskog rangerer på bransjesøkene — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Digital oppstart", description: "Uforpliktende videomøte — vi blir kjent med bedriften og målene dine" },
      { step: 2, title: "Design", description: "Visuell prototype basert på bedriften og målene dine" },
      { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer for fart og SEO" },
      { step: 4, title: "Lansering", description: "Vi setter siden live og overleverer. Du eier alt." },
    ],
    faq: [
      { question: "Jobber dere med bedrifter i Lørenskog?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Lørenskog-området. Oppstart, oppfølging og levering skjer på video, e-post og telefon — uten reisetid og ekstra kostnader." },
      { question: "Kan dere få oss synlige på «[bransje] Lørenskog»?", answer: "Ja. Vi bygger inn lokal SEO og kobler nettsiden mot Google Bedriftsprofil, slik at dere rangerer i lokalsøk og i Maps for Lørenskog." },
      { question: "Hva koster en nettside?", answer: "En profesjonell bedriftsnettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Bruker dere WordPress?", answer: "Nei. Vi bygger i moderne Next.js, som gir vesentlig raskere sider, bedre sikkerhet og bedre PageSpeed enn WordPress med plugins." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "skreddersydd kode" },
    ],
  },
  {
    id: "drammen",
    title: "Webutvikler i Drammen",
    shortDescription:
      "Lokal webutvikler for bedrifter i Drammen — raske, skreddersydde nettsider bygget for å bli funnet.",
    longDescription:
      "Drammen er en by i sterk vekst, med næringsliv fra Bragernes og Strømsø til Gulskogen og Mjøndalen. Vi lager moderne, lynraske nettsider for Drammens-bedrifter som vil skille seg ut og bli funnet lokalt i Google — bygget i Next.js i stedet for tung WordPress. Vi er Oslo-baserte og dekker hele Drammensregionen.",
    categoryTag: "Drammen",
    features: [
      "Skreddersydd Next.js — ingen tung WordPress",
      "Lokal SEO for «[bransje] Drammen»",
      "Personlig oppfølging — du snakker med utvikleren",
      "Dekker hele Drammensregionen",
      "Lynrask lasting og topp PageSpeed-score",
      "Norsk hosting, GDPR-trygg",
    ],
    detailedFeatures: [
      { iconName: "map-pin", title: "Lokal i Drammen", description: "Synlig på lokalsøk i Bragernes, Strømsø og Gulskogen" },
      { iconName: "zap", title: "Lynrask Next.js", description: "Moderne rammeverk i stedet for tung WordPress" },
      { iconName: "search", title: "Lokal SEO", description: "Optimalisert for bransjesøk i Drammen" },
      { iconName: "message-square", title: "Direkte kontakt", description: "Du snakker med utvikleren — ingen mellomledd" },
      { iconName: "shield", title: "Norsk hosting", description: "Servere i Norge, GDPR-trygg og rask" },
    ],
    painPoints: [
      { title: "Byråer som outsourcer", description: "Mange setter ut kodingen til utlandet — du betaler dyrt for en mellommann" },
      { title: "Treg WordPress", description: "Tunge ferdigløsninger gir 3–5 sek lastetid og svak PageSpeed" },
      { title: "Usynlig lokalt", description: "Konkurrenten i Drammen rangerer på bransjesøkene — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Digital oppstart", description: "Uforpliktende videomøte — vi blir kjent med bedriften og målene dine" },
      { step: 2, title: "Design", description: "Visuell prototype basert på bedriften og målene dine" },
      { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer for fart og SEO" },
      { step: 4, title: "Lansering", description: "Vi setter siden live og overleverer. Du eier alt." },
    ],
    faq: [
      { question: "Jobber dere med bedrifter i Drammen?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i hele Drammensregionen. Oppstart, oppfølging og levering skjer på video, e-post og telefon." },
      { question: "Kan dere få oss synlige på «[bransje] Drammen»?", answer: "Ja. Vi bygger inn lokal SEO og kobler nettsiden mot Google Bedriftsprofil, slik at dere rangerer i lokalsøk og i Maps for Drammen." },
      { question: "Hva koster en nettside?", answer: "En profesjonell bedriftsnettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Bruker dere WordPress?", answer: "Nei. Vi bygger i moderne Next.js, som gir vesentlig raskere sider, bedre sikkerhet og bedre PageSpeed enn WordPress med plugins." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "skreddersydd kode" },
    ],
  },
  {
    id: "ski",
    title: "Webutvikler i Ski",
    shortDescription:
      "Lokal webutvikler for bedrifter i Ski og Nordre Follo — moderne, raske nettsider som konverterer.",
    longDescription:
      "Ski er handels- og knutepunktsbyen i Nordre Follo, med et næringsliv som strekker seg fra Ski sentrum til Kolbotn og Langhus. Vi lager skreddersydde, raske nettsider for bedrifter i Follo som vil bli funnet av lokale kunder — bygget i Next.js for fart og god synlighet i Google. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Follo.",
    categoryTag: "Ski",
    features: [
      "Skreddersydd Next.js — ingen tung WordPress",
      "Lokal SEO for «[bransje] Ski» og Nordre Follo",
      "Personlig oppfølging — du snakker med utvikleren",
      "Heldigital prosess — oppstart og oppfølging på video",
      "Lynrask lasting og topp PageSpeed-score",
      "Norsk hosting, GDPR-trygg",
    ],
    detailedFeatures: [
      { iconName: "map-pin", title: "Lokal i Follo", description: "Synlig på lokalsøk i Ski, Kolbotn og Langhus" },
      { iconName: "zap", title: "Lynrask Next.js", description: "Moderne rammeverk i stedet for tung WordPress" },
      { iconName: "search", title: "Lokal SEO", description: "Optimalisert for bransjesøk i Nordre Follo" },
      { iconName: "message-square", title: "Direkte kontakt", description: "Du snakker med utvikleren — ingen mellomledd" },
      { iconName: "shield", title: "Norsk hosting", description: "Servere i Norge, GDPR-trygg og rask" },
    ],
    painPoints: [
      { title: "Byråer som outsourcer", description: "Mange setter ut kodingen til utlandet — du betaler dyrt for en mellommann" },
      { title: "Treg WordPress", description: "Tunge ferdigløsninger gir 3–5 sek lastetid og svak PageSpeed" },
      { title: "Usynlig lokalt", description: "Konkurrenten i Follo rangerer på bransjesøkene — ikke du" },
    ],
    processSteps: [
      { step: 1, title: "Digital oppstart", description: "Uforpliktende videomøte — vi blir kjent med bedriften og målene dine" },
      { step: 2, title: "Design", description: "Visuell prototype basert på bedriften og målene dine" },
      { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer for fart og SEO" },
      { step: 4, title: "Lansering", description: "Vi setter siden live og overleverer. Du eier alt." },
    ],
    faq: [
      { question: "Jobber dere med bedrifter i Ski?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Ski og Nordre Follo. Oppstart, oppfølging og levering skjer på video, e-post og telefon — uten reisetid og ekstra kostnader." },
      { question: "Kan dere få oss synlige på «[bransje] Ski»?", answer: "Ja. Vi bygger inn lokal SEO og kobler nettsiden mot Google Bedriftsprofil, slik at dere rangerer i lokalsøk og i Maps for Nordre Follo." },
      { question: "Hva koster en nettside?", answer: "En profesjonell bedriftsnettside starter fra kr 15 000. Du får alltid et uforpliktende tilbud først, tilpasset omfang og funksjoner." },
      { question: "Bruker dere WordPress?", answer: "Nei. Vi bygger i moderne Next.js, som gir vesentlig raskere sider, bedre sikkerhet og bedre PageSpeed enn WordPress med plugins." },
    ],
    trustStats: [
      { value: 90, suffix: "+", label: "PageSpeed-score" },
      { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
      { value: 100, suffix: "%", label: "skreddersydd kode" },
    ],
  },
];

export const LOCATION_SEO: Record<string, { title: string; description: string }> = {
  baerum: {
    title: "Webutvikler i Bærum — skreddersydde nettsider for bedrifter",
    description:
      "Lokal webutvikler i Bærum. Vi lager raske, skreddersydde nettsider i Next.js for bedrifter i Sandvika, Bekkestua og Fornebu. Faste priser, ingen bindingstid.",
  },
  asker: {
    title: "Webutvikler i Asker — skreddersydde nettsider for bedrifter",
    description:
      "Lokal webutvikler i Asker. Vi lager raske, skreddersydde nettsider i Next.js for bedrifter i Asker og omegn. Faste priser, ingen bindingstid. Få et tilbud.",
  },
  lillestrom: {
    title: "Webutvikler i Lillestrøm — nettsider for bedrifter på Romerike",
    description:
      "Lokal webutvikler i Lillestrøm. Raske, skreddersydde nettsider i Next.js for bedrifter på Romerike. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  lorenskog: {
    title: "Webutvikler i Lørenskog — skreddersydde nettsider for bedrifter",
    description:
      "Lokal webutvikler i Lørenskog. Raske, skreddersydde nettsider i Next.js for bedrifter i Lørenskog. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  drammen: {
    title: "Webutvikler i Drammen — skreddersydde nettsider for bedrifter",
    description:
      "Lokal webutvikler i Drammen. Raske, skreddersydde nettsider i Next.js for bedrifter i Drammensregionen. Faste priser, ingen bindingstid. Få et tilbud.",
  },
  ski: {
    title: "Webutvikler i Ski — nettsider for bedrifter i Nordre Follo",
    description:
      "Lokal webutvikler i Ski. Raske, skreddersydde nettsider i Next.js for bedrifter i Nordre Follo. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
};

export function getLocation(slug: string): Service | undefined {
  return LOCATIONS.find((l) => l.id === slug);
}

export function getAllLocationSlugs(): string[] {
  return LOCATIONS.map((l) => l.id);
}
