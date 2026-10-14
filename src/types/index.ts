export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedDate: string;
  readingTime: string;
  category: string;
  sections: BlogSection[];
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  listItems?: string[];
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
