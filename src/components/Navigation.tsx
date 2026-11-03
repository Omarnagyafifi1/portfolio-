import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";

const links = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "credentials", label: "Credentials" },
];

type NavigationProps = {
  activeSection: string;
};

export function Navigation({ activeSection }: NavigationProps) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="nav-shell page-shell" aria-label="Main navigation">
        <a className="nav-brand" href="#home" onClick={closeMenu} aria-label="Omar Nagy, home">
          <BrandMark small />
          <span>Omar Nagy</span>
        </a>

        <button
          className="nav-toggle icon-button"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div id="primary-navigation" className={`nav-links${open ? " is-open" : ""}`}>
          {links.map((link) => (
            <a
              key={link.id}
              className={activeSection === link.id ? "is-active" : ""}
              href={`#${link.id}`}
              aria-current={activeSection === link.id ? "location" : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
