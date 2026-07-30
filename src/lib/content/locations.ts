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
      "Lokal SEO for «advokat Bærum» og «tannlege Sandvika»",
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
      { question: "Jobber dere med bedrifter i Bærum når dere sitter i Oslo?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Bærum. Oppstart, innspill og overlevering skjer på video, e-post og telefon. Du slipper å betale for reisetid, og vi er like tilgjengelige for en bedrift på Fornebu som for en i Sandvika." },
      { question: "Kan dere få oss synlige på søk som «advokat Bærum» eller «tannlege Sandvika»?", answer: "Det er akkurat den typen søk vi bygger for. Vi legger inn lokal SEO og strukturerte data, og kobler siden mot Google Bedriftsprofil slik at dere kan dukke opp både i vanlige treff og i Maps. Vi lover ingen bestemt plassering, men siden blir bygget for å konkurrere om dem." },
      { question: "Kundene her er vant til gjennomarbeidede merkevarer. Holder en enkel nettside?", answer: "Sjelden. Bærum har tunge fagmiljøer på Fornebu og Lysaker, og kundene sammenligner dere med selskaper som bruker mye på design. En malbasert side som laster tregt skiller seg negativt ut. Det trenger ikke bety en stor side, men den må se ut som dere mener alvor." },
      { question: "Dekker dere hele Bærum, eller bare Sandvika?", answer: "Hele kommunen. Vi bygger sider for bedrifter i Sandvika, Fornebu, Lysaker, Bekkestua, Stabekk, Høvik, Rud og Kolsås. Skal dere være synlige i flere av områdene, legger vi dem inn som egne stedssignaler på siden." },
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
      "Lokal SEO for «tannlege Asker» og «byggefirma Heggedal»",
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
      { question: "Jobber dere med bedrifter i Asker?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt, så avstanden spiller ingen rolle. Alt fra oppstartsmøte til overlevering går på video og e-post, og dere betaler ikke for reisetid." },
      { question: "Kan dere få oss synlige på «tannlege Asker» eller «byggefirma Heggedal»?", answer: "Ja, det er den typen søk vi optimaliserer for. Vi bygger inn lokal SEO og kobler siden mot Google Bedriftsprofil. Bestemte plasseringer kan ingen love, men siden blir bygget teknisk riktig fra dag én." },
      { question: "Asker strekker seg fra Holmen til Tofte. Hvordan treffer vi hele kommunen?", answer: "Etter sammenslåingen med Røyken og Hurum er Asker geografisk stor, og folk søker fortsatt på de gamle stedsnavnene. Vi legger inn de områdene dere faktisk jobber i, som Slemmestad, Vollen, Røyken og Sætre, i stedet for å satse alt på ordet «Asker»." },
      { question: "Vi er en liten håndverksbedrift. Blir dette for stort for oss?", answer: "Nei. Mange av bedriftene i Asker er små tjeneste- og håndverksbedrifter, og de trenger sjelden en stor side. Tre til fem sider som laster raskt og er lette å kontakte fra mobil gjør som regel jobben." },
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
      "Lokal SEO for «elektriker Lillestrøm» og «rørlegger Strømmen»",
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
      { question: "Jobber dere med bedrifter på Romerike?", answer: "Ja. Vi holder til i Oslo og jobber heldigitalt med bedrifter i Lillestrøm og resten av Romerike. Toget tar ti minutter, men vi trenger det som regel ikke: oppstart og oppfølging går fint på video." },
      { question: "Kan dere få oss synlige på «elektriker Lillestrøm» eller «rørlegger Strømmen»?", answer: "Det er søkene vi bygger for. Vi legger inn lokal SEO, strukturerte data og kobling mot Google Bedriftsprofil. Konkurransen på håndverkersøk her er reell, så dette er et arbeid over tid, ikke en bryter vi skrur på." },
      { question: "Vi holder til på Kjeller eller Skedsmokorset. Teller det som Lillestrøm i Google?", answer: "Ikke automatisk. Google skiller på stedsnavn, og mange søker på nærområdet sitt framfor bykjernen. Vi legger derfor inn de stedene dere faktisk dekker, som Kjeller, Strømmen, Skedsmokorset, Sørumsand og Frogner, som egne signaler på siden." },
      { question: "Konkurransen på håndverkersøk i Lillestrøm er hard. Hva skal til?", answer: "Tre ting, i denne rekkefølgen: en side som laster raskt på mobil, en oppdatert Google Bedriftsprofil med ekte omtaler, og tekst som svarer på det kundene faktisk lurer på. Det er sjelden design som avgjør, men om dere er lette å finne og lette å ringe." },
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
      "Lokal SEO for «frisør Lørenskog» og «tannlege Skårer»",
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
      { question: "Jobber dere med bedrifter i Lørenskog?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i Lørenskog. Oppstart, innspill og overlevering går på video og e-post, uten reisetid lagt på prisen." },
      { question: "Kan dere få oss synlige på «frisør Lørenskog» eller «tannlege Skårer»?", answer: "Ja, det er den typen lokalsøk vi bygger for. Vi legger inn lokal SEO og kobler siden mot Google Bedriftsprofil slik at dere kan dukke opp i Maps. Plasseringer kan ingen garantere, men grunnlaget blir riktig." },
      { question: "Vi ligger tett på Oslo. Bør vi satse på Oslo-søk eller Lørenskog-søk?", answer: "Som regel Lørenskog først. Oslo-søkene har mange ganger så mange om beinet, og en ny side vinner dem sjelden. Lokalsøkene i Lørenskog er langt lettere å nå, og kundene der er nærmere. Oslo kan komme som et neste steg." },
      { question: "Mye av handelen her skjer rundt Metro og Triaden. Hjelper en nettside da?", answer: "Ja, men på en annen måte enn folk tror. Kundene finner dere kanskje fysisk, men de sjekker dere på mobilen først: åpningstider, priser, om det ser seriøst ut. Er siden treg eller utdatert, taper dere kunder som allerede var i nærheten." },
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
      "Lokal SEO for «byggefirma Drammen» og «elektriker Gulskogen»",
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
      { question: "Jobber dere med bedrifter i Drammen når dere sitter i Oslo?", answer: "Ja. Vi jobber heldigitalt, og toget tar rundt 35 minutter om det skulle trengs. I praksis går oppstart, innspillsrunder og overlevering på video og e-post, og dere betaler ikke for reisetid." },
      { question: "Kan dere få oss synlige på «byggefirma Drammen» eller «elektriker Gulskogen»?", answer: "Det er de søkene vi bygger for. Vi legger inn lokal SEO, strukturerte data og kobling mot Google Bedriftsprofil. Vi lover ingen bestemt plassering, men siden blir bygget for å kunne konkurrere om dem." },
      { question: "Drammen er mer enn sentrum. Treffer vi også Mjøndalen og Konnerud?", answer: "Ja, hvis vi legger dem inn. Folk søker på sitt eget nærområde, ikke på kommunenavnet. Vi tar med de stedene dere faktisk jobber i, som Bragernes, Strømsø, Gulskogen, Åssiden, Konnerud, Mjøndalen og Svelvik, framfor å satse alt på ordet «Drammen»." },
      { question: "Vi er en industri- eller byggbedrift, ikke en butikk. Trenger vi egentlig nettside?", answer: "Kundene deres sjekker dere før de tar kontakt, også når avtalene inngås over telefon. En side som viser referanseprosjekter, godkjenninger og hvem dere er, gjør at dere framstår som et trygt valg. Det teller mer i bygg og industri enn i de fleste andre bransjer." },
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
      "Lokal SEO for «tannlege Ski» og «frisør Kolbotn»",
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
      { question: "Jobber dere med bedrifter i Ski og Nordre Follo?", answer: "Ja. Vi er Oslo-baserte og jobber heldigitalt med bedrifter i hele Nordre Follo. Oppstart og oppfølging går på video og e-post, så dere betaler ikke for reisetid." },
      { question: "Kan dere få oss synlige på «tannlege Ski» eller «frisør Kolbotn»?", answer: "Ja, det er den typen søk vi bygger for. Vi legger inn lokal SEO og kobler siden mot Google Bedriftsprofil. Bestemte plasseringer kan vi ikke love, men siden blir teknisk riktig fra start." },
      { question: "Kommunen heter Nordre Follo nå. Bør vi skrive «Ski» eller «Nordre Follo»?", answer: "Begge deler, men «Ski» og «Kolbotn» veier tyngst. Folk søker på stedet de bor, ikke på kommunenavnet, og de gamle navnene sitter fortsatt i språket. Vi bruker stedsnavnene i tekstene og tar med kommunenavnet der det hører hjemme." },
      { question: "Follobanen har gjort at flere flytter hit. Hvordan når vi tilflytterne?", answer: "Tilflyttere har ingen lokale vaner ennå, så de googler alt: tannlege, frisør, treningssenter. Det er den gruppen som er lettest å vinne, fordi de ikke har valgt noen fra før. En side som svarer tydelig på hvor dere er og hva det koster å komme i gang, tar dem." },
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
