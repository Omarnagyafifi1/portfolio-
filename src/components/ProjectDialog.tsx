import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight, ExternalLink, X } from "lucide-react";
import { siGithub } from "simple-icons";
import type { Project } from "../types";
import { ProjectArtwork } from "./ProjectArtwork";

type ProjectDialogProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="detail-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {project ? (
        <div className="detail-dialog__content">
          <div className="detail-dialog__bar">
            <span className="eyebrow">Project case study</span>
            <button className="icon-button detail-dialog__close" type="button" onClick={onClose} aria-label="Close project details">
              <X size={20} />
            </button>
          </div>
          <div className="detail-dialog__hero">
            <ProjectArtwork project={project} />
            <div>
              <p className="eyebrow">{project.subtitle}</p>
              <h2 id="project-dialog-title">{project.name}</h2>
              <p>{project.summary}</p>
            </div>
          </div>

          <div className="detail-dialog__grid">
            <section className="detail-block">
              <span className="eyebrow">The problem</span>
              <p>{project.problem}</p>
            </section>
            <section className="detail-block">
              <span className="eyebrow">The solution</span>
              <p>{project.solution}</p>
            </section>
            <section className="detail-block detail-block--wide">
              <span className="eyebrow">Workflow</span>
              <ol className="architecture-list">
                {project.architecture.map((step, index) => (
                  <li key={step}>
                    <span className="architecture-list__number">0{index + 1}</span>
                    <span>{step}</span>
                    {index < project.architecture.length - 1 ? <ArrowDownRight size={15} aria-hidden="true" /> : null}
                  </li>
                ))}
              </ol>
            </section>
            <section className="detail-block">
              <span className="eyebrow">Features</span>
              <ul className="detail-list">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </section>
            <section className="detail-block">
              <span className="eyebrow">Contribution</span>
              <p>{project.role}</p>
            </section>
            <section className="detail-block detail-block--wide">
              <span className="eyebrow">Results</span>
              <ul className="detail-list detail-results-list">
                {project.results.map((result) => <li key={result}>{result}</li>)}
              </ul>
            </section>
            <section className="detail-block detail-block--wide">
              <span className="eyebrow">Technology stack</span>
              <div className="detail-tech-list">
                {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
            </section>
          </div>

          <div className="detail-dialog__actions">
            {project.repository ? (
              <a className="button button--outline" href={project.repository} target="_blank" rel="noreferrer">
                <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={siGithub.path} /></svg> Repository <ExternalLink size={14} />
              </a>
            ) : null}
            {project.demo ? (
              <a className="button button--light" href={project.demo} target="_blank" rel="noreferrer">
                Live demo <ArrowUpRight size={16} />
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
