import rawPortfolio from "./portfolio.json";
import type { PortfolioData } from "../types";

const publicUrl = (path: string) => (path.startsWith("/") ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path);

export const portfolio: PortfolioData = {
  ...rawPortfolio,
  identity: {
    ...rawPortfolio.identity,
    portrait: publicUrl(rawPortfolio.identity.portrait),
    cv: publicUrl(rawPortfolio.identity.cv),
  },
  projects: rawPortfolio.projects.map((project) => ({
    ...project,
    image: project.image ? publicUrl(project.image) : undefined,
  })),
  certifications: rawPortfolio.certifications.map((certificate) => ({
    ...certificate,
    preview: publicUrl(certificate.preview),
    file: publicUrl(certificate.file),
  })),
} as PortfolioData;
