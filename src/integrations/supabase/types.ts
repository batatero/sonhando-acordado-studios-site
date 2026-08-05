import type {
  ProjectEvidence,
  ProjectLink,
  ProjectMedia,
  StudioSlug,
} from "@/types/content";

export type ProjectStatus = "draft" | "published" | "archived";
export type ProjectVisual = "cinema" | "world" | "portrait" | "system";
export type ProjectStage = "concept" | "prototype" | "functional" | "released";

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  studios: StudioSlug[];
  services: string[];
  delivery_type: string;
  cover_image_url: string | null;
  cover_alt: string;
  gallery: ProjectMedia[];
  videos: ProjectMedia[];
  external_links: ProjectLink[];
  evidence: ProjectEvidence[];
  status: ProjectStatus;
  is_featured: boolean;
  sort_order: number;
  project_date: string | null;
  client_name: string | null;
  client_authorized: boolean;
  challenge: string | null;
  objective: string | null;
  process: string | null;
  solution: string | null;
  deliverables: string[];
  results: string | null;
  technologies: string[];
  stage: ProjectStage;
  locale: string;
  seo_title: string | null;
  seo_description: string | null;
  seo_image_url: string | null;
  visual: ProjectVisual;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectInsert = Omit<
  ProjectRow,
  "id" | "created_at" | "updated_at" | "published_at"
> & {
  id?: string;
  published_at?: string | null;
};

export type ProjectUpdate = Partial<ProjectInsert>;
