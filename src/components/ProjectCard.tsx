import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={`project-card project-card--${project.visual}`}>
      <div className="project-card__visual" aria-hidden="true">
        <span className="project-card__symbol">
          {project.visual === "cinema" && "▶"}
          {project.visual === "world" && "✦"}
          {project.visual === "portrait" && "◯"}
          {project.visual === "system" && "◇"}
        </span>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
    </article>
  );
}

