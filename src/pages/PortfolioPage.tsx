import { Container } from "@/components/Container";
import { PageShell } from "@/components/PageShell";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { useProjectsContent } from "@/hooks/useProjectsContent";

export function PortfolioPage() {
  const { projects, source } = useProjectsContent();
  const [studio, setStudio] = useState<"all" | "story" | "creative" | "ai" | "systems">("all");
  const visibleProjects = studio === "all" ? projects : projects.filter((project) => project.studios.includes(studio));

  const filters = [
    ["all", "Todos"],
    ["story", "Story Studio"],
    ["creative", "Creative Studio"],
    ["ai", "AI Studio"],
    ["systems", "Systems Studio"],
  ] as const;

  return (
    <PageShell>
      <section className="section portfolio-page">
        <Container>
          <SectionHeading
            eyebrow="Portfólio"
            title="Histórias e soluções que se tornaram reais."
            description="Projetos que conectam narrativa, criação, inteligência e sistemas em um único ecossistema."
          />
          {source === "fallback" && (
            <p className="content-notice" role="status">
              Conteúdo editorial de apresentação. Novos cases serão publicados em breve.
            </p>
          )}
          <div className="portfolio-filters" role="group" aria-label="Filtrar projetos por estúdio">
            {filters.map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={studio === value ? "is-active" : ""}
                aria-pressed={studio === value}
                onClick={() => setStudio(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="portfolio__grid">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {visibleProjects.length === 0 && (
            <p className="content-notice" role="status">
              Ainda não há projetos publicados neste estúdio.
            </p>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
import { useState } from "react";
