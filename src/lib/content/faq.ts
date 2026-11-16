import type { FAQ } from "@/types";

export const FAQ_PAGE = {
  headline: "Vanlige spørsmål",
  subheadline:
    "Her finner du svar på de vanligste spørsmålene vi får. Finner du ikke det du leter etter? Ta gjerne kontakt — vi svarer alltid innen 24 timer.",
} as const;

export const FAQS: FAQ[] = [
  {
    question: "Hva koster en nettside?",
    answer:
      "Prisen avhenger av omfanget og kompleksiteten til prosjektet. En enkel bedriftsnettside ligger et helt annet sted enn en løsning med nettbutikk eller spesialfunksjonalitet. Vi gir alltid fastpris før vi starter, slik at du vet nøyaktig hva du betaler for. Ta kontakt for et uforpliktende tilbud tilpasset ditt behov.",
  },
  {
    question: "Hvor lang tid tar det å lage en nettside?",
    answer:
      "Leveringstiden avhenger av omfanget. En enkel bedriftsnettside tar som regel rundt 2 uker, mens større sider med flere undersider og funksjoner tar 4–6 uker. Vi setter alltid opp en tydelig tidsplan i starten av prosjektet, slik at du vet nøyaktig når nettsiden din er klar.",
  },
  {
    question: "Trenger jeg en driftsavtale etter lansering?",
    answer:
      "Det er ikke et krav, men vi anbefaler det sterkt. Nettsider krever regelmessige oppdateringer, sikkerhetskopier og vedlikehold for å fungere optimalt. Uten vedlikehold kan nettsiden bli treg, usikker eller slutte å fungere etter hvert som teknologi endres. Driftsavtalen vår sikrer at nettsiden din alltid er oppdatert, rask og trygg — og inkluderer prioritert support.",
  },
  {
    question: "Kan jeg oppdatere innholdet selv etter lansering?",
    answer:
      "Med driftsavtale sender du en melding, så gjør vi endringen. Innholdsendringer er inkludert. Du kan også gjøre endringer selv, men det krever at du kan jobbe i koden, med GitHub. Vi har ikke et enklere redigeringsverktøy i dag.",
  },
  {
    question: "Er nettsidene mobiloptimaliserte?",
    answer:
      "Alltid. Alle nettsider vi lager er responsive, som betyr at de tilpasser seg automatisk til skjermstørrelsen — enten besøkeren bruker mobil, nettbrett eller desktop. De fleste besøker nettsider fra mobilen, så mobiloptimalisering er ikke et tilvalg. Vi tester på flere enheter og nettlesere før lansering.",
  },
  {
    question: "Hva er SEO, og trenger jeg det?",
    answer:
      "SEO står for søkemotoroptimalisering og handler om å gjøre nettsiden din synlig i Google når folk søker etter det du tilbyr. Kort sagt: uten SEO finner ikke kundene deg. Alle nettsidene vi lager har grunnleggende SEO innebygd (rask lastetid, riktig struktur, metatagger). For de som ønsker å rangere enda høyere, tilbyr vi også løpende SEO-tjenester med søkeordanalyse og innholdsoptimalisering.",
  },
  {
    question: "Hvilken teknologi bruker dere?",
    answer:
      "Vi bygger i Next.js. Hver side lages ferdig på serveren, så den er rask og Google kan lese all teksten. Nettbutikker bygger vi på samme måte, med betaling og frakt koblet inn. Vil du redigere alt innhold selv i et tradisjonelt publiseringsverktøy, passer WordPress ofte bedre, og det sier vi fra om i første samtale.",
  },
  {
    question: "Hva inkluderes i prisen?",
    answer:
      "Alle våre priser inkluderer design, utvikling, mobiloptimalisering, grunnleggende SEO, kontaktskjema og SSL-sertifikat. Hosting og domenenavn kan inkluderes i driftsavtalen eller håndteres separat. Vi er alltid tydelige på hva som er inkludert og hva som eventuelt kommer i tillegg — ingen overraskelser.",
  },
  {
    question: "Tilbyr dere hosting?",
    answer:
      "Ja. Vi tilbyr rask og sikker hosting med daglige sikkerhetskopier. Hosting kan bestilles som en del av driftsavtalen eller som en separat tjeneste. Vi håndterer alt det tekniske slik at du slipper å forholde deg til serveradministrasjon.",
  },
  {
    question: "Er det bindingstid på avtalene?",
    answer:
      "Nei, vi har ingen bindingstid på noen av tjenestene våre. Vi tror på å beholde kunder gjennom kvalitet, ikke kontrakter. Du kan når som helst si opp driftsavtalen med én måneds varsel. Nettsiden er din — du eier alt innhold, design og kode.",
  },
  {
    question: "Kan dere hjelpe med innhold og tekst til nettsiden?",
    answer:
      "Ja, vi tilbyr innholdsproduksjon som en del av prosjektet eller som en tilleggstjeneste. Vi hjelper med å skrive tekster som er både engasjerende for leserne og optimaliserte for søkemotorer. Godt innhold er avgjørende for at nettsiden skal rangere i Google og overbevise besøkende om å ta kontakt.",
  },
  {
    question: "Hva om jeg allerede har en nettside — kan dere forbedre den?",
    answer:
      "Absolutt. Vi tilbyr både redesign av eksisterende nettsider og optimalisering av ytelse, SEO og brukeropplevelse. Noen ganger er det mest effektivt å bygge nytt fra bunnen, mens andre ganger kan vi oppgradere det du allerede har. Vi gir deg en ærlig vurdering av hva som gir best resultat for pengene.",
  },
  {
    question: "Jobber dere med bedrifter i hele Norge?",
    answer:
      "Ja, vi jobber med bedrifter over hele landet. Alt samarbeid kan skje digitalt — via videomøter, e-post og telefon. Vi har erfaring med kunder fra Kristiansand til Tromsø, og avstanden har aldri vært et hinder for godt samarbeid.",
  },
  {
    question: "Hva trenger dere fra meg for å komme i gang?",
    answer:
      "For å gi deg et godt tilbud trenger vi en kort beskrivelse av bedriften din, hva du ønsker å oppnå med nettsiden, og eventuelt eksempler på nettsider du liker. Når prosjektet starter, trenger vi logo, bilder, tekster og annet innhold — men vi hjelper gjerne med å produsere det som mangler.",
  },
  {
    question: "Hvordan er betalingsmodellen?",
    answer:
      "Vi opererer med en todeling: 50 % ved oppstart og 50 % ved lansering. For større prosjekter kan vi tilpasse betalingsplanen. Driftsavtaler faktureres månedlig eller årlig etter ønske. Du får alltid en detaljert faktura med oversikt over hva du betaler for.",
  },
];
