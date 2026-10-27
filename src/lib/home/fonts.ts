import { Big_Shoulders, Bricolage_Grotesque, Figtree, Fraunces, Gloock, Inter, Michroma, Mona_Sans, Montserrat, Plus_Jakarta_Sans, Schibsted_Grotesk, Young_Serif } from "next/font/google";

// The A · Klar homepage face. Exposed as a CSS variable that a-klar.css reads inside the .ka scope.
export const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// Candidate face for the calm homepage, compared against Schibsted on the preview (?font=jakarta). Not preloaded:
// it only downloads when the comparison switches it on. The losing face is removed before merge.
export const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

// The hero face: headline, lede and buttons at the top of the homepage. Variable weight, exposed as --font-mona.
export const mona = Mona_Sans({
  variable: "--font-mona",
  subsets: ["latin"],
  display: "swap",
});

// The header lockup from IDweb's own logo: Michroma for «IDWEB» (drawn with a stroke in the header SVG to match the
// logo's weight) and Montserrat for the tagline «Webbyrå og systemutvikler».
export const michroma = Michroma({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const montserrat = Montserrat({
  variable: "--font-tagline",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

// Faces of the example clients in the services canvas (a-klar-tjenester.css). Not preloaded: the canvas sits
// below the fold and draws its first frames only when it scrolls into view.
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

// Faces used inside the service pages (styles/tjenester): the example clients' own type.
export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});
export const bigShoulders = Big_Shoulders({
  variable: "--font-bigshoulders",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
});
export const gloock = Gloock({
  variable: "--font-gloock",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  preload: false,
});
