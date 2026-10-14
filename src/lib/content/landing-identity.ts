/**
 * Visual identity for the landing pages built on IndustryHero (/webbyra-oslo).
 *
 * Accents are desaturated, single-hue, and used sparingly (Linear-style):
 * the brand yellow stays the action colour everywhere; the accent carries
 * the page's identity (the mockup, the headline underline, section numerals).
 */

/** Accent for the Oslo agency page. */
export const GEO_ACCENT = "#6366F1";

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
