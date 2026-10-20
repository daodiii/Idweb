import type { OgCard } from "@/lib/og";
import { BLOG_POSTS } from "@/lib/content/blog";
import { CASES } from "@/lib/content/kundecase";
import { SERVICE_PAGES } from "@/components/tjenester/pages";

/** The link preview image's name for a page path: "/" is "hjem", "/tjenester/seo" is "tjenester-seo". */
export function ogKey(path: string): string {
  return path === "/" ? "hjem" : path.replace(/^\//, "").replaceAll("/", "-");
}

let pages: Record<string, OgCard> | undefined;

/**
 * What each page's link preview says, keyed by ogKey. Headlines are the pages' own h1s. Built on first use, since
 * the service pages' own metadata helper imports this module.
 */
export function ogPages(): Record<string, OgCard> {
  pages ??= {
    hjem: { kicker: "Webbyrå og systemutvikler i Oslo", title: "Vi skreddersyr autentiske nettsider som reflekterer din bedrift." },
    "om-oss": { kicker: "Om oss", title: "«IDweb tok det derfra.»" },
    kontakt: { kicker: "Kontakt", title: "La oss snakke ærlig om nettsiden din." },
    faq: { kicker: "Spørsmål og svar", title: "Alt du lurer på, besvart uten omveier." },
    blogg: { kicker: "Artikler", title: "Praktiske artikler om nettsider som selger." },
    referanser: { kicker: "Kundecaser", title: "Slik laget vi nettsidene til to av kundene våre." },
    tjenester: { kicker: "Tjenester", title: "Alt bedriften trenger på nett, fra én leverandør." },
    "webbyra-oslo": { kicker: "Webbyrå i Oslo", title: "Nettsider og systemer for bedrifter i Oslo." },
    personvern: { kicker: "Personvern", title: "Slik tar vi vare på ditt personvern." },
    vilkar: { kicker: "Vilkår", title: "Vilkår for våre tjenester." },
    ...Object.fromEntries(
      Object.entries(SERVICE_PAGES).map(([slug, s]) => [ogKey(`/tjenester/${slug}`), { kicker: s.name, title: s.title }]),
    ),
    ...Object.fromEntries(CASES.map((c) => [ogKey(`/referanser/${c.slug}`), { kicker: `Kundecase · ${c.name}`, title: c.headline }])),
    ...Object.fromEntries(BLOG_POSTS.map((p) => [ogKey(`/blogg/${p.slug}`), { kicker: p.category, title: p.title }])),
  };
  return pages;
}
