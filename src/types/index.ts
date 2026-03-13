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

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  company: string;
  role: string;
  quote: string;
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
