/**
 * The homepage quote request («Få et pristilbud»): what a visitor can ask for, the checks the wizard runs per step,
 * and the summary both the wizard and the e-mail to IDweb show. The server action runs the same checks, so the
 * wording a visitor sees is the same whichever side catches a mistake. No prices anywhere: IDweb replies with an offer.
 */

export type QuoteMode = "ny" | "har";

export const QUOTE_MODES: Record<QuoteMode, { title: string; text: string; summary: string }> = {
  ny: { title: "Ny nettside", text: "Skreddersydd for bedriften.", summary: "Ny skreddersydd nettside" },
  har: { title: "Noe til siden vi har", text: "Dere har nettside og vil legge til noe.", summary: "Noe til nettsiden vi har" },
};

export const QUOTE_EXTRAS = [
  { id: "booking", name: "Timebestilling", text: "Kundene bestiller time selv, når det passer dem." },
  { id: "chat", name: "AI-chatbot", text: "Svarer på spørsmål på nettsiden, døgnet rundt." },
  { id: "butikk", name: "Nettbutikk", text: "Selg varene på nett, med betaling og frakt." },
  { id: "portal", name: "Kundeportal", text: "Henvendelser og kunder samlet bak én innlogging." },
  { id: "seo", name: "SEO og AI-synlighet", text: "Bli funnet på Google og i svar fra ChatGPT." },
  { id: "drift", name: "Drift og vedlikehold", text: "Vi holder siden oppe, oppdatert og trygg." },
] as const;

/** [the button, the line in the summary] */
export const QUOTE_PAGE_COUNTS = [
  ["3", "Omtrent 3 sider"],
  ["5", "Omtrent 5 sider"],
  ["8+", "8 sider eller flere"],
  ["Vet ikke", "Vet ikke ennå"],
] as const;

export const QUOTE_PAGE_TYPES = ["Forside", "Tjenester", "Om oss", "Kontakt", "Priser", "Referanser", "Ansatte", "Blogg", "Spørsmål og svar"] as const;

export const QUOTE_WHEN = ["Så snart som mulig", "Innen en måned", "Innen tre måneder", "Ingen hast"] as const;

export type Quote = {
  mode: QuoteMode | null;
  extras: string[];
  pages: string | null;
  pageTypes: string[];
  url: string;
  industry: string;
  when: string | null;
  message: string;
  name: string;
  company: string;
  email: string;
  phone: string;
};

export type QuoteField = keyof Quote;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

export const EMPTY_QUOTE: Quote = {
  mode: null,
  extras: [],
  pages: null,
  pageTypes: [],
  url: "",
  industry: "",
  when: null,
  message: "",
  name: "",
  company: "",
  email: "",
  phone: "",
};

/** The terms shown beside the ask. Each is already stated elsewhere on the site (om oss, kontakt, vilkår). */
export const QUOTE_TERMS = ["Fast pris, avtalt før vi starter", "Ingen bindingstid", "Svar innen 24 timer"] as const;

export const QUOTE_LIMITS ={ url: 200, industry: 100, message: 5000, name: 100, company: 100, phone: 20 } as const;

/** What they need: a new site or an extra; an extra is required when they keep the site they have. */
export function checkNeeds(q: Quote): QuoteErrors {
  if (!q.mode) return { mode: "Velg ny nettside eller noe til siden dere har." };
  if (q.mode === "har" && !q.extras.length) return { extras: "Velg minst én ting dere vil legge til." };
  return {};
}

/** How big the new site is; «Vet ikke» is a fine answer. */
export function checkSize(q: Quote): QuoteErrors {
  if (q.mode === "ny" && !q.pages) return { pages: "Velg omtrent hvor mange sider. «Vet ikke» går fint." };
  return {};
}

/** The optional context: only lengths can be wrong. */
export function checkAbout(q: Quote): QuoteErrors {
  const e: QuoteErrors = {};
  if (q.url.trim().length > QUOTE_LIMITS.url || /\s/.test(q.url.trim())) e.url = "Sjekk nettadressen. Den ser ikke riktig ut.";
  if (q.industry.trim().length > QUOTE_LIMITS.industry) e.industry = "Bransjen er for lang.";
  if (q.message.trim().length > QUOTE_LIMITS.message) e.message = "Meldingen er for lang (maks 5000 tegn).";
  return e;
}

/** Who gets the offer. Same rules and wording as the contact form's server action. */
export function checkContact(q: Quote): QuoteErrors {
  const e: QuoteErrors = {};
  const name = q.name.trim();
  const company = q.company.trim();
  const email = q.email.trim();
  const phone = q.phone.trim();
  if (!name) e.name = "Skriv navnet ditt.";
  else if (name.length > QUOTE_LIMITS.name) e.name = "Navnet er for langt.";
  if (!company) e.company = "Skriv navnet på bedriften.";
  else if (company.length > QUOTE_LIMITS.company) e.company = "Bedriftsnavnet er for langt.";
  if (!email) e.email = "Skriv e-posten deres, så vi vet hvor tilbudet skal.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) e.email = "Sjekk e-postadressen. Den ser ikke riktig ut.";
  if (phone && !/^[\d\s\-+()]{5,20}$/.test(phone)) e.phone = "Sjekk telefonnummeret. Det ser ikke riktig ut.";
  return e;
}

export function checkQuote(q: Quote): QuoteErrors {
  return { ...checkNeeds(q), ...checkSize(q), ...checkAbout(q), ...checkContact(q) };
}

/** Reads a submitted form into a Quote, keeping only the choices the wizard offers. */
export function quoteFromForm(form: FormData): Quote {
  const text = (k: string) => (typeof form.get(k) === "string" ? (form.get(k) as string).trim() : "");
  const pick = <T extends string>(k: string, allowed: readonly T[]) => (allowed as readonly string[]).includes(text(k)) ? text(k) : null;
  const many = (k: string, allowed: readonly string[]) => [...new Set(form.getAll(k).filter((v): v is string => typeof v === "string" && allowed.includes(v)))];
  const mode = pick("mode", ["ny", "har"] as const) as QuoteMode | null;
  return {
    mode,
    extras: many("extras", QUOTE_EXTRAS.map((x) => x.id)),
    pages: mode === "ny" ? pick("pages", QUOTE_PAGE_COUNTS.map(([v]) => v)) : null,
    pageTypes: mode === "ny" ? many("pageTypes", QUOTE_PAGE_TYPES) : [],
    url: text("url"),
    industry: text("industry"),
    when: pick("when", QUOTE_WHEN),
    message: text("message"),
    name: text("name"),
    company: text("company"),
    email: text("email"),
    phone: text("phone"),
  };
}

/** The request as label/value rows, in the order IDweb reads them. Empty optional rows are left out. */
export function quoteRows(q: Quote, { contact = true } = {}): [string, string][] {
  const rows: [string, string][] = [];
  if (q.mode) rows.push(["Behov", QUOTE_MODES[q.mode].summary]);
  const extras = QUOTE_EXTRAS.filter((x) => q.extras.includes(x.id)).map((x) => x.name);
  if (extras.length) rows.push(["Ekstra", extras.join("\n")]);
  else if (q.mode === "ny") rows.push(["Ekstra", "Ingen"]);
  if (q.mode === "ny" && q.pages) {
    const line = QUOTE_PAGE_COUNTS.find(([v]) => v === q.pages)?.[1] ?? q.pages;
    const types = QUOTE_PAGE_TYPES.filter((p) => q.pageTypes.includes(p)).join(", ");
    rows.push(["Sider", types ? `${line}\n${types}` : line]);
  }
  if (q.url.trim()) rows.push(["Nettside", q.url.trim()]);
  if (q.industry.trim()) rows.push(["Bransje", q.industry.trim()]);
  if (q.when) rows.push(["Klart", q.when]);
  if (q.message.trim()) rows.push(["Melding", q.message.trim()]);
  if (contact) {
    const who = [q.name, q.company, q.email, q.phone].map((s) => s.trim()).filter(Boolean).join("\n");
    if (who) rows.push(["Kontakt", who]);
  }
  return rows;
}
