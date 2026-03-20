export const SITE_NAME = "IDweb";

export const NAV_LINKS = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/priser", label: "Priser" },
  { href: "/referanser", label: "Referanser" },
  { href: "/blogg", label: "Blogg" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const FOOTER_LINKS = {
  tjenester: [
    { href: "/tjenester#nettside", label: "Nettsider" },
    { href: "/tjenester#seo", label: "SEO-optimalisering" },
    { href: "/tjenester#vedlikehold", label: "Drift og vedlikehold" },
    { href: "/tjenester#design", label: "Grafisk design" },
  ],
  selskap: [
    { href: "/om-oss", label: "Om oss" },
    { href: "/referanser", label: "Referanser" },
    { href: "/priser", label: "Priser" },
    { href: "/blogg", label: "Blogg" },
    { href: "/faq", label: "FAQ" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  juridisk: [
    { href: "/personvern", label: "Personvernerklæring" },
    { href: "/vilkar", label: "Vilkår og betingelser" },
  ],
} as const;

export const CONTACT_INFO = {
  phone: "+47 984 06 164",
  phoneHref: "tel:+4798406164",
  email: "hei@idweb.no",
  emailHref: "mailto:hei@idweb.no",
  hours: "Man – fre: 08:00 – 17:00",
  orgNr: "837 228 972",
} as const;
