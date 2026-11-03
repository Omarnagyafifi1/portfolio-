import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  BadgeCheck,
  BrainCircuit,
  CalendarDays,
  Check,
  Cloud,
  Code2,
  Database,
  Download,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Network,
  Phone,
  Send,
  Workflow,
} from "lucide-react";
import {
  siCplusplus,
  siDjango,
  siDocker,
  siFastapi,
  siFlask,
  siGit,
  siGithub,
  siGithubactions,
  siHuggingface,
  siMysql,
  siNextdotjs,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siReact,
  siScikitlearn,
  siSqlite,
} from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { BrandMark } from "./components/BrandMark";
import { CertificateDialog } from "./components/CertificateDialog";
import { Navigation } from "./components/Navigation";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectDialog } from "./components/ProjectDialog";
import { Reveal } from "./components/Reveal";
import { SectionHeading } from "./components/SectionHeading";
import { portfolio } from "./data";
import type { Project } from "./types";

const navSectionIds = ["about", "skills", "experience", "projects", "education", "credentials", "contact"];

const skillIcons = {
  code: Code2,
  database: Database,
  workflow: Workflow,
  chart: BarChart3,
  cloud: Cloud,
  brain: BrainCircuit,
  layers: Layers3,
} as const;

const technologyIcons: Record<string, SimpleIcon> = {
  python: siPython,
  cplusplus: siCplusplus,
  sqlite: siSqlite,
  postgresql: siPostgresql,
  mysql: siMysql,
  pandas: siPandas,
  numpy: siNumpy,
  scikitlearn: siScikitlearn,
  docker: siDocker,
  githubactions: siGithubactions,
  git: siGit,
  huggingface: siHuggingface,
  fastapi: siFastapi,
  flask: siFlask,
  django: siDjango,
  react: siReact,
  nextdotjs: siNextdotjs,
};

function BrandIcon({ slug }: { slug?: string }) {
  if (!slug || slug === "databases") return <Database size={16} aria-hidden="true" />;
  const icon = technologyIcons[slug];
  if (!icon) return <Database size={16} aria-hidden="true" />;
  return (
    <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  );
}

function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social profiles">
      <a href={portfolio.identity.linkedin} target="_blank" rel="noreferrer" aria-label="Open Omar Nagy's LinkedIn profile">
        <Network size={17} aria-hidden="true" />
        <span>LinkedIn</span>
        <ArrowUpRight size={13} className="social-links__outbound" />
      </a>
      <a href={portfolio.identity.github} target="_blank" rel="noreferrer" aria-label="Open Omar Nagy's GitHub profile">
        <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={siGithub.path} /></svg>
        <span>GitHub</span>
        <ArrowUpRight size={13} className="social-links__outbound" />
      </a>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("about");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof portfolio.certifications)[number] | null>(null);
  const [formMessage, setFormMessage] = useState("");

  const featuredProjects = useMemo(() => portfolio.projects, []);

  useEffect(() => {
    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);
      setShowTop(window.scrollY > 520);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const mailSubject = encodeURIComponent(subject || `Portfolio enquiry from ${name}`);
    const mailBody = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);

    setFormMessage("Your email app will open with the message ready for you to review and send.");
    window.location.href = `mailto:${portfolio.identity.email}?subject=${mailSubject}&body=${mailBody}`;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
      <Navigation activeSection={activeSection} />

      <main id="main-content">
        <section className="hero-section" id="home" aria-labelledby="hero-title">
          <div className="hero-grid page-shell">
            <Reveal className="hero-copy">
              <div className="hero-kicker"><span className="hero-kicker__line" /> {portfolio.identity.title} <span>·</span> New Cairo, Egypt</div>
              <h1 id="hero-title">Omar <span>Nagy</span></h1>
              <p className="hero-title">{portfolio.identity.title.toUpperCase()}</p>
              <p className="hero-slogan">{portfolio.identity.slogan}</p>
              <h2 className="hero-headline">{portfolio.identity.headline}</h2>
              <p className="hero-intro">{portfolio.identity.intro}</p>
              <div className="hero-actions">
                <a className="button button--light" href="#projects">Explore my work <ArrowRight size={16} /></a>
                <a className="button button--outline" href={portfolio.identity.cv} download>
                  <Download size={16} /> Download CV
                </a>
              </div>
              <div className="hero-social-row">
                <SocialLinks />
                <a className="hero-email" href={`mailto:${portfolio.identity.email}`} aria-label={`Email Omar at ${portfolio.identity.email}`}>
                  <Mail size={16} /> Email me
                </a>
              </div>
            </Reveal>

            <Reveal className="hero-portrait-wrap" delay={0.12}>
              <div className="hero-portrait-frame">
                <div className="hero-portrait-frame__top">
                  <span>01 — PROFILE</span>
                  <span>CAIRO / EGYPT</span>
                </div>
                <img className="hero-portrait" src={portfolio.identity.portrait} alt="Portrait of Omar Nagy" fetchPriority="high" />
                <div className="hero-portrait-frame__bottom">
                  <BrandMark />
                  <div>
                    <span className="hero-portrait-frame__name">Omar Nagy</span>
                    <span className="hero-portrait-frame__role">{portfolio.identity.title}</span>
                  </div>
                  <ArrowDown size={18} aria-hidden="true" />
                </div>
              </div>
              <span className="hero-index" aria-hidden="true">ON · 2026</span>
            </Reveal>
          </div>
          <a className="hero-scroll" href="#about"><span>Scroll to explore</span><ArrowDown size={15} /></a>
        </section>

        <section className="section section--about" id="about" aria-labelledby="about-title">
          <div className="page-shell about-layout">
            <Reveal>
              <SectionHeading
                eyebrow="01 / About"
                title="Data with a clear purpose."
                description="A practical engineering mindset, from the structure behind a system to the experience people use."
              />
            </Reveal>
            <Reveal className="about-content" delay={0.1}>
              <div className="about-copy">
                <span className="eyebrow about-copy__lead">A little about me</span>
                {portfolio.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                <div className="language-row">
                  <span className="eyebrow">Languages</span>
                  {portfolio.about.languages.map((language) => (
                    <span key={language.name} className="language-chip"><b>{language.name}</b><span>{language.level}</span></span>
                  ))}
                </div>
              </div>
              <div className="about-aside">
                <div className="about-aside__mark"><BrandMark /></div>
                <p>DATA FLOWS.<br /><span>IDEAS GROW.</span></p>
                <div className="about-aside__rule" />
                <span className="eyebrow">Engineering · systems · impact</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section--skills" id="skills" aria-labelledby="skills-title">
          <div className="page-shell">
            <Reveal>
              <SectionHeading
                eyebrow="02 / Technical skills"
                title="Tools for the whole data journey."
                description="Technologies and methods supported by the CV and project documentation."
                number="07 GROUPS"
              />
            </Reveal>
            <div className="skills-grid">
              {portfolio.skills.map((group, index) => {
                const GroupIcon = skillIcons[group.icon as keyof typeof skillIcons] ?? Layers3;
                return (
                  <Reveal className="skill-card" key={group.category} delay={Math.min(index * 0.035, 0.18)}>
                    <div className="skill-card__heading">
                      <span className="skill-card__icon"><GroupIcon size={19} strokeWidth={1.6} /></span>
                      <div>
                        <span className="eyebrow">Skill group 0{index + 1}</span>
                        <h3>{group.category}</h3>
                      </div>
                    </div>
                    <div className="skill-list">
                      {group.items.map((item) => (
                        <span className="skill-pill" key={item.name}>
                          <BrandIcon slug={item.logo} />
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <p className="skills-note"><BadgeCheck size={15} /> No proficiency ratings; skills are shown as experience and project evidence.</p>
          </div>
        </section>

        <section className="section section--experience" id="experience" aria-labelledby="experience-title">
          <div className="page-shell">
            <Reveal>
              <SectionHeading
                eyebrow="03 / Experience"
                title="Learning through real systems."
                description="Internship and training experiences, clearly distinguished from full-time employment."
              />
            </Reveal>
            <div className="timeline">
              {portfolio.experience.map((item, index) => (
                <Reveal className="timeline-item" key={`${item.organization}-${item.period}`} delay={index * 0.06}>
                  <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <article className="experience-card">
                    <div className="experience-card__top">
                      <div className="experience-card__identity">
                        <span className={`experience-card__mark${item.brandLabel ? " experience-card__mark--labeled" : ""}`} role="img" aria-label={`${item.organization} mark`}>
                          <strong>{item.brandMark}</strong>
                          {item.brandLabel ? <small>{item.brandLabel}</small> : null}
                        </span>
                        <div className="experience-card__content">
                          <span className="eyebrow">{item.type}</span>
                          <h3>{item.role}</h3>
                          <p className="experience-card__organization">{item.organization}</p>
                        </div>
                      </div>
                    </div>
                    <div className="experience-meta">
                      <span><CalendarDays size={14} /> {item.period}</span>
                      <span><MapPin size={14} /> {item.location}</span>
                    </div>
                    <p className="experience-card__description">{item.description}</p>
                    <ul className="experience-contributions">
                      {item.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                    </ul>
                    <div className="experience-tech">
                      {item.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--projects" id="projects" aria-labelledby="projects-title">
          <div className="page-shell">
            <Reveal>
              <SectionHeading
                eyebrow="04 / Selected projects"
                title="Systems built to make data useful."
                description="Three projects that show data workflows, applied machine learning, and retrieval-backed applications."
                number="03 PROJECTS"
              />
            </Reveal>
            <div className="project-grid">
              {featuredProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.07}>
                  <ProjectCard project={project} index={index} onOpen={setSelectedProject} />
                </Reveal>
              ))}
            </div>
            <div className="project-footnote"><span className="eyebrow">Project details</span><p>Open a project to explore its workflow, contribution, features, and source links.</p></div>
          </div>
        </section>

        <section className="section section--education" id="education" aria-labelledby="education-title">
          <div className="page-shell education-layout">
            <Reveal>
              <SectionHeading eyebrow="05 / Education" title="A foundation in engineering." />
            </Reveal>
            <Reveal delay={0.1}>
              <article className="education-card">
                <div className="education-card__icon"><GraduationCap size={25} strokeWidth={1.4} /></div>
                <div className="education-card__main">
                  <span className="eyebrow">Bachelor of Science · {portfolio.education.graduationYear}</span>
                  <h3>{portfolio.education.degree}</h3>
                  <p>{portfolio.education.institution}</p>
                  <div className="education-card__meta">
                    <span><MapPin size={14} /> {portfolio.education.location}</span>
                    <span><BadgeCheck size={14} /> {portfolio.education.grade}</span>
                  </div>
                </div>
                <span className="education-card__year">{portfolio.education.graduationYear}</span>
              </article>
            </Reveal>
          </div>
        </section>

        <section className="section section--credentials" id="credentials" aria-labelledby="credentials-title">
          <div className="page-shell">
            <Reveal>
              <SectionHeading
                eyebrow="06 / Certifications & training"
                title="Learning that keeps moving."
                description="Verified certificate evidence supplied for the portfolio. Training programs are listed in the experience timeline."
              />
            </Reveal>
            <div className="certificate-grid">
              {portfolio.certifications.map((certificate, index) => (
                <Reveal className="certificate-card" key={certificate.name} delay={index * 0.06}>
                  <button className="certificate-card__preview" type="button" onClick={() => setSelectedCertificate(certificate)} aria-label={`Preview ${certificate.name}`}>
                    <img src={certificate.preview} alt={`${certificate.name} certificate preview`} loading="lazy" />
                    <span className="certificate-card__view">View certificate <ArrowUpRight size={15} /></span>
                  </button>
                  <div className="certificate-card__body">
                    <div className="certificate-card__type"><span>{certificate.kind}</span><span>{certificate.date}</span></div>
                    <h3>{certificate.name}</h3>
                    <p>{certificate.issuer}</p>
                    <div className="certificate-card__skills">
                      {certificate.skills.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                    <button className="text-link" type="button" onClick={() => setSelectedCertificate(certificate)}>
                      Enlarge preview <ArrowUpRight size={15} />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--contact" id="contact" aria-labelledby="contact-title">
          <div className="page-shell contact-layout">
            <Reveal className="contact-copy">
              <SectionHeading
                eyebrow="07 / Contact"
                title="Let’s build something useful."
                description="Have a data challenge or an engineering opportunity? I’d be glad to hear from you."
              />
              <div className="contact-details">
                <a href={`mailto:${portfolio.identity.email}`}><span className="contact-details__icon"><Mail size={18} /></span><span><small>Email</small>{portfolio.identity.email}</span><ArrowUpRight size={16} /></a>
                <a href={`tel:${portfolio.identity.phone}`}><span className="contact-details__icon"><Phone size={18} /></span><span><small>Phone</small>{portfolio.identity.phone}</span><ArrowUpRight size={16} /></a>
                <div><span className="contact-details__icon"><MapPin size={18} /></span><span><small>Location</small>{portfolio.identity.location}</span></div>
              </div>
              <SocialLinks />
            </Reveal>

            <Reveal className="contact-form-wrap" delay={0.12}>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form__heading">
                  <span className="eyebrow">Send a message</span>
                  <span className="contact-form__index">FORM / 01</span>
                </div>
                <label>
                  <span>Full name</span>
                  <input name="name" type="text" autoComplete="name" placeholder="Your name" required />
                </label>
                <label>
                  <span>Email address</span>
                  <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                </label>
                <label>
                  <span>Subject</span>
                  <input name="subject" type="text" placeholder="What would you like to discuss?" required />
                </label>
                <label>
                  <span>Message</span>
                  <textarea name="message" rows={4} placeholder="Write your message..." required />
                </label>
                <button className="button button--light contact-form__submit" type="submit">Prepare email <Send size={16} /></button>
                <p className="contact-form__note">Your default email app opens with the message ready for you to review and send.</p>
                {formMessage ? <p className="form-message" role="status"><Check size={14} /> {formMessage}</p> : null}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell site-footer__inner">
          <a className="footer-brand" href="#home"><BrandMark small /><span>Omar Nagy</span></a>
          <span className="footer-slogan">DATA FLOWS. IDEAS GROW.</span>
          <span className="footer-copy">© {new Date().getFullYear()} Omar Nagy</span>
          <a className="footer-top" href="#home">Back to top <ArrowUp size={14} /></a>
        </div>
      </footer>

      {showTop ? (
        <button className="back-to-top icon-button" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <ArrowUp size={18} />
        </button>
      ) : null}

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CertificateDialog certificate={selectedCertificate} onClose={() => setSelectedCertificate(null)} />
    </>
  );
}

export default App;
