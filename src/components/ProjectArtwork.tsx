import { ArrowDown, ArrowRight, Database, FileText, Search, Sparkles } from "lucide-react";
import type { Project } from "../types";

export function ProjectArtwork({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className={`project-art project-art--image project-art--${project.id}`}>
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <span className="project-art__caption">Project interface</span>
      </div>
    );
  }

  return (
    <div className="project-art project-art--flow" role="img" aria-label={project.imageAlt}>
      <div className="flow-visual__topline">
        <span className="flow-dot" />
        <span>RETRIEVAL FLOW</span>
        <span className="flow-visual__index">01 / 04</span>
      </div>
      <div className="flow-visual__nodes">
        <div className="flow-node">
          <FileText size={17} />
          <span>Medical PDFs</span>
        </div>
        <ArrowRight className="flow-arrow" size={17} />
        <div className="flow-node">
          <Search size={17} />
          <span>Semantic search</span>
        </div>
        <ArrowRight className="flow-arrow" size={17} />
        <div className="flow-node flow-node--accent">
          <Sparkles size={17} />
          <span>Grounded answer</span>
        </div>
      </div>
      <div className="flow-visual__base">
        <Database size={15} />
        <span>Embeddings → Pinecone → Groq</span>
        <ArrowDown size={14} />
      </div>
    </div>
  );
}
