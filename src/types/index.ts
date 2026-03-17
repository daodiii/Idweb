export interface NavLink {
  href: string;
  label: string;
}

export interface SectionMeta {
  id: string;
  title: string;
  description?: string;
}

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

export type PortfolioSiteId =
  | "brobekk"
  | "centerrahma"
  | "vocura"
  | "herbs"
  | "iqra"
  | "ringebu";

export interface PortfolioSite {
  id: PortfolioSiteId;
  name: string;
  domain: string;
  images: Record<DeviceViewport, string>;
}

export interface RotationSet {
  laptop: PortfolioSiteId;
  tablet: PortfolioSiteId;
  phone: PortfolioSiteId;
}

export interface ComparisonCard {
  type: 'byrå' | 'idweb';
  icon?: string;
  stat?: string;
  unit?: string;
  title: string;
  description: string;
  accent: string;
}
