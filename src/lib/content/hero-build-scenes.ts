export type TokenKind =
  | "keyword"
  | "tag"
  | "attr"
  | "string"
  | "comment"
  | "punct"
  | "plain";

export type Token = { text: string; kind: TokenKind };

export type PreviewSlot =
  | "headline"
  | "subtitle"
  | "cta"
  | "snippet-title"
  | "snippet-url"
  | "snippet-desc"
  | "plan-name"
  | "plan-price"
  | "plan-delivery"
  | "plan-feature-1"
  | "plan-feature-2"
  | "plan-feature-3";

export type PreviewLayout = "site-hero" | "google-snippet" | "pricing-card";

export type SceneLine = {
  /** Raw text of the line; tokenizer derives tokens from this. */
  text: string;
  /** Slot to reveal in the preview pane when this line finishes typing. */
  revealsPreview?: PreviewSlot;
};

export type Scene = {
  id: "hero" | "metadata" | "pricing";
  filename: string;
  language: "tsx" | "ts";
  tabs: { label: string; active: boolean }[];
  lines: SceneLine[];
  preview: {
    chrome: { url: string };
    layout: PreviewLayout;
    content: {
      headline?: string;
      subtitle?: string;
      cta?: string;
      snippetTitle?: string;
      snippetUrl?: string;
      snippetDesc?: string;
      planName?: string;
      planPrice?: string;
      planDelivery?: string;
      planFeatures?: [string, string, string];
    };
  };
};

export const HERO_BUILD_SCENES: Scene[] = [
  {
    id: "hero",
    filename: "app/page.tsx",
    language: "tsx",
    tabs: [
      { label: "page.tsx", active: true },
      { label: "Hero.tsx", active: false },
      { label: "globals.css", active: false },
    ],
    lines: [
      { text: `import { Button } from "@/ui/button";` },
      { text: `` },
      { text: `export default function Page() {` },
      { text: `  return (` },
      { text: `    <section className="hero">` },
      { text: `      <h1>Nettsider som konverterer.</h1>`, revealsPreview: "headline" },
      { text: `      <p>Bygget for Oslo — av Oslo.</p>`, revealsPreview: "subtitle" },
      { text: `      <Button>Få et tilbud</Button>`, revealsPreview: "cta" },
      { text: `    </section>` },
      { text: `  );` },
      { text: `}` },
    ],
    preview: {
      chrome: { url: "idweb.no" },
      layout: "site-hero",
      content: {
        headline: "Nettsider som konverterer.",
        subtitle: "Bygget for Oslo — av Oslo.",
        cta: "Få et tilbud",
      },
    },
  },
  {
    id: "metadata",
    filename: "app/layout.tsx",
    language: "ts",
    tabs: [
      { label: "layout.tsx", active: true },
      { label: "page.tsx", active: false },
      { label: "robots.ts", active: false },
    ],
    lines: [
      { text: `export const metadata = {` },
      {
        text: `  title: "IDweb · Webutvikling i Oslo",`,
        revealsPreview: "snippet-title",
      },
      {
        text: `  description: "Nettsider som faktisk konverterer.",`,
        revealsPreview: "snippet-desc",
      },
      {
        text: `  alternates: { canonical: "https://idweb.no" },`,
        revealsPreview: "snippet-url",
      },
      { text: `  openGraph: {` },
      { text: `    locale: "nb_NO",` },
      { text: `    images: ["/og.png"],` },
      { text: `  },` },
      { text: `};` },
    ],
    preview: {
      chrome: { url: "google.com/search?q=webutvikling+oslo" },
      layout: "google-snippet",
      content: {
        snippetTitle: "IDweb · Webutvikling i Oslo",
        snippetUrl: "https://idweb.no",
        snippetDesc: "Nettsider som faktisk konverterer. Bygget i Oslo.",
      },
    },
  },
  {
    id: "pricing",
    filename: "lib/plans.ts",
    language: "ts",
    tabs: [
      { label: "plans.ts", active: true },
      { label: "page.tsx", active: false },
      { label: "checkout.ts", active: false },
    ],
    lines: [
      { text: `export const starterPlan = {` },
      { text: `  name: "Starter",`, revealsPreview: "plan-name" },
      { text: `  price: 9990,`, revealsPreview: "plan-price" },
      { text: `  delivery: "2 uker",`, revealsPreview: "plan-delivery" },
      { text: `  features: [` },
      { text: `    "Skreddersydd design",`, revealsPreview: "plan-feature-1" },
      { text: `    "Lynrask ytelse",`, revealsPreview: "plan-feature-2" },
      { text: `    "SEO på dag én",`, revealsPreview: "plan-feature-3" },
      { text: `  ],` },
      { text: `};` },
    ],
    preview: {
      chrome: { url: "idweb.no/priser" },
      layout: "pricing-card",
      content: {
        planName: "Starter",
        planPrice: "9 990 kr",
        planDelivery: "Leveres på 2 uker",
        planFeatures: [
          "Skreddersydd design",
          "Lynrask ytelse",
          "SEO på dag én",
        ],
      },
    },
  },
];

const KEYWORDS = new Set([
  "import",
  "export",
  "from",
  "return",
  "function",
  "const",
  "let",
  "var",
  "default",
  "as",
  "type",
  "interface",
]);

const JSX_HOLE_REGEX = /^[A-Z][A-Za-z0-9]*$/;
const COMMENT_RE = /^\/\/.*/;
const STRING_RE = /^(["'`])(?:\\.|(?!\1).)*\1/;
const NUMBER_RE = /^\d[\d_]*(?:\.\d+)?/;
const TAG_RE = /^(<\/?)([A-Za-z][A-Za-z0-9]*)/;
const ID_RE = /^[\p{L}_][\p{L}\p{N}_]*/u;
const WS_RE = /^\s+/;

/**
 * Tokenize one line of TSX/TS source. Hand-tuned for the three hero scenes —
 * not a general-purpose parser. Tokens are returned left-to-right and their
 * concatenated `text` always equals the input line.
 */
export function tokenizeLine(line: string, language: "tsx" | "ts"): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    const rest = line.slice(i);

    const comment = rest.match(COMMENT_RE);
    if (comment) {
      tokens.push({ text: comment[0], kind: "comment" });
      i += comment[0].length;
      continue;
    }

    const str = rest.match(STRING_RE);
    if (str) {
      tokens.push({ text: str[0], kind: "string" });
      i += str[0].length;
      continue;
    }

    const num = rest.match(NUMBER_RE);
    if (num) {
      tokens.push({ text: num[0], kind: "string" });
      i += num[0].length;
      continue;
    }

    if (language === "tsx") {
      const tag = rest.match(TAG_RE);
      if (tag) {
        tokens.push({ text: tag[1], kind: "punct" });
        tokens.push({
          text: tag[2],
          kind: JSX_HOLE_REGEX.test(tag[2]) ? "plain" : "tag",
        });
        i += tag[0].length;
        continue;
      }
    }

    const id = rest.match(ID_RE);
    if (id) {
      const word = id[0];
      const followsEquals = rest.charAt(word.length) === "=";
      if (KEYWORDS.has(word)) {
        tokens.push({ text: word, kind: "keyword" });
      } else if (language === "tsx" && followsEquals) {
        tokens.push({ text: word, kind: "attr" });
      } else {
        tokens.push({ text: word, kind: "plain" });
      }
      i += word.length;
      continue;
    }

    const ws = rest.match(WS_RE);
    if (ws) {
      tokens.push({ text: ws[0], kind: "plain" });
      i += ws[0].length;
      continue;
    }

    tokens.push({ text: rest[0], kind: "punct" });
    i += 1;
  }

  return tokens;
}

/** Total characters in a scene including a newline per line. */
export function totalSceneChars(scene: Scene): number {
  return scene.lines.reduce((sum, l) => sum + l.text.length + 1, 0);
}
