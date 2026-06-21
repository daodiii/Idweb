/**
 * Per-page visual identity for the programmatic landing pages.
 *
 * The /nettside/[bransje] and /webutvikler/[sted] pages all reuse the same
 * section components. Without differentiation they read as one template
 * stamped 21 times. This map gives each page its own scarce accent colour,
 * a bespoke product mockup, and an audience noun used to vary the headlines —
 * so the pages feel individually made, not mass-produced.
 *
 * Accents are desaturated, single-hue, and used sparingly (Linear-style):
 * the brand yellow stays the action colour everywhere; the accent carries
 * the page's identity (the mockup, the headline underline, section numerals).
 */

export type MockupKind =
  | "booking"
  | "call"
  | "quote"
  | "valuation"
  | "menu"
  | "gallery"
  | "membership"
  | "directory"
  | "dev";

export interface LandingIdentity {
  /** Scarce per-page accent (hex). */
  accent: string;
  /** Which bespoke product mockup leads the hero. */
  mockup: MockupKind;
  /** Audience noun for headline variation ("pasienter", "jobber", …). */
  noun: string;
  /** Realistic sample business shown inside the mockup. */
  business: string;
}

export const INDUSTRY_IDENTITY: Record<string, LandingIdentity> = {
  tannlege: { accent: "#14B8A6", mockup: "booking", noun: "pasienter", business: "Frogner Tannhelse" },
  elektriker: { accent: "#2563EB", mockup: "call", noun: "jobber", business: "Volt Elektro" },
  rorlegger: { accent: "#0EA5E9", mockup: "call", noun: "akuttjobber", business: "Bekken Rør" },
  advokat: { accent: "#9A7B4F", mockup: "directory", noun: "klienter", business: "Aas & Berg" },
  frisor: { accent: "#DB2777", mockup: "booking", noun: "kunder", business: "Studio Lokk" },
  regnskapsforer: { accent: "#0F766E", mockup: "quote", noun: "kunder", business: "Tallhuset Regnskap" },
  eiendomsmegler: { accent: "#047857", mockup: "valuation", noun: "oppdrag", business: "Nord Eiendom" },
  restaurant: { accent: "#EA580C", mockup: "menu", noun: "gjester", business: "Spiseriet Lyst" },
  fysioterapeut: { accent: "#10B981", mockup: "booking", noun: "pasienter", business: "Aktiv Fysioterapi" },
  byggefirma: { accent: "#5B7290", mockup: "gallery", noun: "oppdrag", business: "Solid Bygg" },
  treningssenter: { accent: "#84CC16", mockup: "membership", noun: "medlemmer", business: "Puls Trening" },
  optiker: { accent: "#6D5DF0", mockup: "booking", noun: "kunder", business: "Klar Optikk" },
  bilverksted: { accent: "#DC2626", mockup: "booking", noun: "kunder", business: "Dahl Bilverksted" },
  legekontor: { accent: "#0284C7", mockup: "booking", noun: "pasienter", business: "Sentrum Legekontor" },
  renhold: { accent: "#22C55E", mockup: "quote", noun: "oppdrag", business: "Blank Renhold" },
};

/** Geo pages share one developer-cluster identity; the place name differentiates them. */
export const GEO_ACCENT = "#6366F1";

export const FALLBACK_IDENTITY: LandingIdentity = {
  accent: "#F4CE14",
  mockup: "dev",
  noun: "kunder",
  business: "Din bedrift",
};

/**
 * Pick readable ink (#0a0a0a or #ffffff) for text sitting on a solid accent
 * fill, via WCAG relative luminance. Keeps accent buttons legible across the
 * full palette — dark ink on bright teal/lime, white on deep red/emerald.
 */
export function accentInk(hex: string): string {
  const h = hex.replace("#", "");
  const toLin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const r = toLin(parseInt(h.slice(0, 2), 16) / 255);
  const g = toLin(parseInt(h.slice(2, 4), 16) / 255);
  const b = toLin(parseInt(h.slice(4, 6), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.36 ? "#0a0a0a" : "#ffffff";
}
