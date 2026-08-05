export type NavigationItem = {
  label: string;
  href: string;
};

export type Universe = {
  id: string;
  number: string;
  title: string;
  description: string;
  services: string[];
  href: string;
  icon: "story" | "creative" | "ai" | "systems";
};

export type StudioSlug = "story" | "creative" | "ai" | "systems";

export type ProjectMedia = {
  url: string;
  alt?: string;
  title?: string;
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type ProjectEvidence = {
  type: "link" | "image" | "video" | "document" | "metric";
  title: string;
  source: string;
  note: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  studios: StudioSlug[];
  category: string;
  summary: string;
  description: string;
  features: string[];
  status: "disponível" | "em desenvolvimento";
  visual: "cinema" | "world" | "portrait" | "system";
  coverImageUrl?: string;
  projectUrl?: string;
  videoUrl?: string;
  technologies: string[];
  deliveryType: string;
  coverAlt?: string;
  gallery: ProjectMedia[];
  videos: ProjectMedia[];
  links: ProjectLink[];
  evidence: ProjectEvidence[];
  projectDate?: string;
  clientName?: string;
  challenge?: string;
  objective?: string;
  process?: string;
  solution?: string;
  deliverables: string[];
  stage: "concept" | "prototype" | "functional" | "released";
  result?: string;
  locale: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImageUrl?: string;
  isFeatured: boolean;
  sortOrder: number;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};
