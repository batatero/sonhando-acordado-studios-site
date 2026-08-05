import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Container } from "@/components/Container";
import { PageShell } from "@/components/PageShell";
import { useProjectsContent } from "@/hooks/useProjectsContent";

const studioNames = {
  story: "Story Studio",
  creative: "Creative Studio",
  ai: "AI Studio",
  systems: "Systems Studio",
} as const;

export function ProjectDetailPage() {
  const { slug } = useParams();
  const { projects } = useProjectsContent();
  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    if (!project) return;
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = project.seoTitle || `${project.title} | Sonhando Acordado Studios`;
    if (description && project.seoDescription) description.content = project.seoDescription;
    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, [project]);

  if (!project) {
    return (
      <PageShell>
        <Container className="empty-state">
          <p className="eyebrow">Projeto não encontrado</p>
          <h1>Este case ainda não está disponível.</h1>
          <p>Ele pode estar em preparação, arquivado ou com outro endereço.</p>
          <Link className="button button--ghost" to="/portfolio">
            Ver portfólio
          </Link>
        </Container>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <article className="project-detail">
        <Container>
          <header className="project-detail__header">
            <p className="eyebrow">
              {project.studios.map((studio) => studioNames[studio]).join(" · ")}
            </p>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
          </header>

          {project.coverImageUrl && (
            <img
              className="project-detail__cover"
              src={project.coverImageUrl}
              alt={project.coverAlt ?? ""}
            />
          )}

          <div className="project-detail__content">
            <section>
              <h2>Sobre o projeto</h2>
              <p>{project.description}</p>
            </section>
            {project.challenge && (
              <section><h2>Desafio</h2><p>{project.challenge}</p></section>
            )}
            {project.objective && (
              <section><h2>Objetivo</h2><p>{project.objective}</p></section>
            )}
            {project.process && (
              <section><h2>Processo</h2><p>{project.process}</p></section>
            )}
            {project.solution && (
              <section><h2>Solução</h2><p>{project.solution}</p></section>
            )}
            {project.result && (
              <section><h2>Resultados comprovados</h2><p>{project.result}</p></section>
            )}
          </div>

          {project.gallery.length > 0 && (
            <section className="project-gallery" aria-labelledby="gallery-title">
              <h2 id="gallery-title">Galeria</h2>
              <div>
                {project.gallery.map((image) => (
                  <img key={image.url} src={image.url} alt={image.alt ?? ""} loading="lazy" />
                ))}
              </div>
            </section>
          )}

          {(project.videos.length > 0 || project.links.length > 0) && (
            <section className="project-resources">
              <h2>Links e conteúdos</h2>
              <ul>
                {[...project.videos.map((video) => ({ label: video.title ?? "Assistir vídeo", url: video.url })), ...project.links].map((link) => (
                  <li key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a></li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </article>
    </PageShell>
  );
}
