import { ArrowUpRight, Layers3 } from "lucide-react";
import type { Project } from "../types";
import { ProjectArtwork } from "./ProjectArtwork";

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <article className={`project-card${project.featured ? " project-card--featured" : ""}`}>
      <button
        className="project-card__open"
        type="button"
        aria-label={`View details for ${project.name}`}
        onClick={() => onOpen(project)}
      >
        <ProjectArtwork project={project} />
        <div className="project-card__body">
          <div className="project-card__topline">
            <span className="project-card__index">0{index + 1}</span>
            <span className="project-card__kind">{project.featured ? "Featured project" : "Case study"}</span>
            <span className="project-card__open-icon"><ArrowUpRight size={17} /></span>
          </div>
          <h3>{project.name}</h3>
          <p className="project-card__subtitle">{project.subtitle}</p>
          <p className="project-card__summary">{project.summary}</p>
          <div className="project-card__result">
            <span className="eyebrow">Result</span>
            <p>{project.results[0]}</p>
          </div>
          <div className="project-card__tech" aria-label="Technology stack">
            {project.technologies.slice(0, 4).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
            {project.technologies.length > 4 ? (
              <span className="project-card__more"><Layers3 size={12} /> +{project.technologies.length - 4}</span>
            ) : null}
          </div>
        </div>
      </button>
    </article>
  );
}
