export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedDate: string;
  readingTime: string;
  category: string;
  sections: BlogSection[];
  /** Shown at the end of the article and added to the page as FAQPage structured data. */
  faq?: FAQ[];
}

/**
 * Text fields accept `code` in backticks and [text](url) links.
 * Optional blocks render after the paragraphs and list, in this order:
 * widget, table, tip, code, tabs, checklist. Use a heading-less section to put text after a block.
 */
export interface BlogSection {
  heading?: string;
  /** Render the heading as h3 under the previous h2. */
  level?: 3;
  paragraphs: string[];
  listItems?: string[];
  tip?: BlogTip;
  code?: BlogCode;
  tabs?: BlogTab[];
  checklist?: BlogChecklist;
  table?: BlogTable;
  /** Interactive figure, rendered by src/components/blog/post-widgets.tsx. */
  widget?: BlogWidget;
}

export type BlogWidget = "webp-sizes" | "php-versions" | "php-quiz" | "answer-first";

export interface BlogTip {
  title: string;
  text: string;
  tone?: "warn";
}

export interface BlogCode {
  caption: string;
  code: string;
}

export type BlogTabBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | ({ type: "code" } & BlogCode);

export interface BlogTab {
  label: string;
  body: BlogTabBlock[];
}

export interface BlogChecklist {
  title: string;
  items: string[];
}

export interface BlogTable {
  head: string[];
  rows: string[][];
}

export interface PainPoint {
  title: string;
  description: string;
}

export interface ServiceFeature {
  iconName: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  categoryTag: string;
  features: string[];
  detailedFeatures: ServiceFeature[];
  painPoints: PainPoint[];
  processSteps: ProcessStep[];
  faq: FAQ[];
  trustStats: TrustSignal[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TestimonialAuthor {
  name: string;
  handle: string;
  company?: string;
  avatar: string;
  rating?: number;
}

export interface Testimonial {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface TrustSignal {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

// -- Portfolio device showcase types --

export type DeviceViewport = "desktop" | "tablet" | "mobile";

export type CollagePosition = "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface CollageImage {
  src: string;
  alt: string;
  position: CollagePosition;
  aspectRatio: "desktop" | "wide" | "landscape" | "tablet" | "square-portrait" | "mobile";
}

export type PortfolioSiteId =
  | "brobekk"
  | "centerrahma"
  | "vocura"
  | "iqra"
  | "ringebu";

export interface PortfolioSite {
  id: PortfolioSiteId;
  name: string;
  domain: string;
  images: Record<DeviceViewport, string> & { full?: string; showcase?: string[]; collage?: CollageImage[]; collageBackground?: string; heroImage?: string };
}

export interface LocalFact {
  label: string;
  value: string;
}

/** Place-specific content for a local landing page (/webbyra-oslo). */
export interface LocalInfo {
  /** Region descriptor used in copy ("Oslo"). */
  region: string;
  /** Unique local context: the area, its districts and its economy. */
  intro: string;
  /** Spec-sheet facts. Verifiable, unique to the place. */
  facts: LocalFact[];
  /** Districts/areas we cover, rendered as a coverage list. */
  areas: string[];
}
