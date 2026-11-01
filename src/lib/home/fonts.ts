import { Bricolage_Grotesque, Figtree, Inter, Mona_Sans, Plus_Jakarta_Sans, Schibsted_Grotesk, Young_Serif } from "next/font/google";

// The A · Klar homepage face. Exposed as a CSS variable that a-klar.css reads inside the .ka scope.
export const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// The calm homepage face (a-klar-calm.css), chosen over Schibsted in Part 1 of docs/specs/calm-homepage.md.
// One variable file covers every weight; latin includes æ, ø and å.
export const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// The hero face: headline, lede and buttons at the top of the homepage. Variable weight, exposed as --font-mona.
export const mona = Mona_Sans({
  variable: "--font-mona",
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
