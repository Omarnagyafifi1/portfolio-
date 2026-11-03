export type SkillItem = { name: string; logo?: string };

export type SkillGroup = {
  category: string;
  icon: string;
  items: SkillItem[];
};

export type Experience = {
  role: string;
  organization: string;
  brandMark: string;
  brandLabel?: string;
  type: string;
  period: string;
  location: string;
  current: boolean;
  description: string;
  contributions: string[];
  technologies: string[];
};

export type Project = {
  id: string;
  name: string;
  subtitle: string;
  featured: boolean;
  image?: string;
  imageAlt: string;
  visual?: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  architecture: string[];
  features: string[];
  results: string[];
  technologies: string[];
  repository: string;
  demo: string;
};

export type PortfolioData = {
  identity: {
    name: string;
    title: string;
    slogan: string;
    headline: string;
    intro: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    portrait: string;
    cv: string;
  };
  about: {
    paragraphs: string[];
    languages: { name: string; level: string }[];
  };
  skills: SkillGroup[];
  experience: Experience[];
  projects: Project[];
  education: {
    degree: string;
    institution: string;
    location: string;
    graduationYear: string;
    grade: string;
  };
  certifications: {
    name: string;
    issuer: string;
    date: string;
    kind: string;
    preview: string;
    file: string;
    skills: string[];
  }[];
};
