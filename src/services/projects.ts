import { fallbackFeaturedProject, fallbackProjects } from "@/data/projects";
import { supabase } from "@/integrations/supabase/client";
import type { ProjectRow } from "@/integrations/supabase/types";
import type { Project } from "@/types/content";

export type ProjectsContent = {
  projects: Project[];
  featuredProject: Project;
  source: "database" | "fallback";
};

export const fallbackProjectsContent: ProjectsContent = {
  projects: fallbackProjects,
  featuredProject: fallbackFeaturedProject,
  source: "fallback",
};

export function mapProjectRow(row: ProjectRow): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    studios: row.studios,
    category: row.category,
    summary: row.summary,
    description: row.description,
    features: row.services,
    status: "disponível",
    visual: row.visual,
    coverImageUrl: row.cover_image_url ?? undefined,
    coverAlt: row.cover_alt,
    projectUrl: `/portfolio/${row.slug}`,
    videoUrl: row.videos[0]?.url,
    technologies: row.technologies,
    deliveryType: row.delivery_type,
    gallery: row.gallery,
    videos: row.videos,
    links: row.external_links,
    evidence: row.evidence,
    projectDate: row.project_date ?? undefined,
    clientName: row.client_authorized ? row.client_name ?? undefined : undefined,
    challenge: row.challenge ?? undefined,
    objective: row.objective ?? undefined,
    process: row.process ?? undefined,
    solution: row.solution ?? undefined,
    deliverables: row.deliverables,
    stage: row.stage,
    result: row.results ?? undefined,
    locale: row.locale,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    seoImageUrl: row.seo_image_url ?? undefined,
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
  };
}

export async function getProjectsContent(): Promise<ProjectsContent> {
  if (!supabase) return fallbackProjectsContent;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error || !data?.length) return fallbackProjectsContent;

  const projects = (data as ProjectRow[]).map(mapProjectRow);
  const featuredProject =
    projects.find((project) => project.isFeatured) ?? projects[0];

  return { projects, featuredProject, source: "database" };
}
