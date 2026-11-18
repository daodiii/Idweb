import { Bricolage_Grotesque, Figtree, Inter, Plus_Jakarta_Sans, Young_Serif } from "next/font/google";

// The site's one face (a-klar.css --font), the brand face of the green IDweb identity (docs/specs/green-brand.md).
// One variable file covers every weight; latin includes æ, ø and å.
export const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Faces of the example clients in the services section (a-klar-tjenester.css). Not preloaded: the section sits
// below the fold.
export const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  weight: ["800"],
  display: "swap",
  preload: false,
});
export const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});
export const youngSerif = Young_Serif({
  variable: "--font-young",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  preload: false,
});

// Vocura's wordmark in the logo ticker under the hero, set in the face their own site uses.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  preload: false,
});
