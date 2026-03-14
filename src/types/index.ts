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

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceExtraItem {
  label: string;
  detail?: string;
  icon?: string;
  value?: string;
}

export interface ServiceExtraSection {
  type: 'checklist' | 'integrations' | 'process' | 'platforms' | 'stats' | 'deliverables';
  headline: string;
  items: ServiceExtraItem[];
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  detailedFeatures: ServiceFeature[];
  extraSection?: ServiceExtraSection;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
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
