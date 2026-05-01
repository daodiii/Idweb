/**
 * SEO metadata for all pages.
 *
 * Targeting strategy: each page has ONE primary keyword (in title + first H1)
 * and 2-4 secondary keywords (in body, H2s, internal links). Meta `keywords`
 * is omitted because Google ignores it and bloat dilutes per-page focus.
 */

export const SEO = {
  home: {
    title: "Webutvikler i Oslo — Skreddersydde nettsider for bedrifter | IDweb",
    description:
      "IDweb er en norsk webutvikler i Oslo som lager raske, mobiloptimaliserte nettsider for bedrifter. Faste priser, ingen bindingstid. Få et uforpliktende tilbud.",
  },
  services: {
    title: "Tjenester — Nettside, SEO og vedlikehold i Oslo",
    description:
      "Skreddersydde nettsider, profesjonell SEO-optimalisering og pålitelig vedlikehold for norske bedrifter. Faste priser, ingen bindingstid. Webutvikler i Oslo.",
  },
  about: {
    title: "Om IDweb — Norsk webutvikler i Oslo",
    description:
      "IDweb er en norsk webutvikler i Oslo som hjelper bedrifter med å lykkes på nett. Skreddersydde nettsider, ærlige priser og personlig oppfølging.",
  },
  faq: {
    title: "Vanlige spørsmål om nettsider, priser og webdesign",
    description:
      "Finn svar på vanlige spørsmål om nettsider, priser, SEO, hosting og vedlikehold. Alt du lurer på om å lage nettside for bedriften din.",
  },
  contact: {
    title: "Kontakt oss — Få et gratis tilbud på ny nettside",
    description:
      "Ta kontakt for en uforpliktende samtale om din nye nettside. Vi svarer innen 24 timer. Ring, send e-post eller bruk kontaktskjemaet.",
  },
  blog: {
    title: "Blogg — Tips om nettsider, SEO og digital markedsføring",
    description:
      "Les våre artikler om nettsider, SEO, digital markedsføring og webdesign. Praktiske tips for norske bedrifter som vil lykkes på nett.",
  },
  privacy: {
    title: "Personvernerklæring",
    description:
      "Les vår personvernerklæring og hvordan vi behandler personopplysninger i samsvar med GDPR og norsk personvernlovgivning.",
  },
};

export const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  nettside: {
    title: "Skreddersydd nettside — Webdesign for bedrifter i Oslo",
    description:
      "Vi designer skreddersydde nettsider med fokus på hastighet, SEO og konvertering. Responsivt design, SSL og administrasjon inkludert. Webutvikler i Oslo.",
  },
  seo: {
    title: "SEO-optimalisering i Oslo — Bli synlig i Google",
    description:
      "Profesjonell søkemotoroptimalisering for bedrifter i Oslo og hele Norge. Teknisk SEO, innhold og lokal SEO. Månedlig rapportering og faste priser.",
  },
  vedlikehold: {
    title: "Drift og vedlikehold av nettside — Trygg drift",
    description:
      "Løpende vedlikehold, sikkerhetskopier og oppdateringer. Vi holder nettsiden din trygg og rask med pålitelig norsk hosting. Ingen bindingstid.",
  },
  "webutvikler-oslo": {
    title: "Webutvikler i Oslo — Lokal nettsideutvikling for bedrifter",
    description:
      "Søker du en webutvikler i Oslo? IDweb lager raske, skreddersydde nettsider for Oslo-bedrifter. Personlig oppfølging, faste priser og ingen bindingstid.",
  },
  nettbutikk: {
    title: "Nettbutikk-utvikling — Skreddersydde e-handelsløsninger",
    description:
      "Vi bygger nettbutikker som faktisk selger. Lynraske, mobilvennlige løsninger med Stripe og Vipps. Fra enkel produktkatalog til full e-handelsplattform.",
  },
};
