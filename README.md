# Omar Nagy - Data Engineer Portfolio

A responsive, monochrome portfolio built with React, TypeScript, Vite, Motion, and Lucide. Portfolio content is kept in `src/data/portfolio.json`; the supplied portrait, project screenshots, and verified certificate are in `public/`.

## Run locally

Requirements: Node.js 22.12+ or 24. The project uses Vite 8.

```powershell
npm install
npm run dev
```

## Build and check

```powershell
npm run typecheck
npm run build
npm run preview
```

The static production site is written to `dist/`. GitHub Pages deploys it automatically from `main` through `.github/workflows/pages.yml`. The contact form prepares a message in the visitor's default email app; it does not submit to a server.

## Update the portfolio

- Edit biography, experience, skills, projects, education, and certificate details in `src/data/portfolio.json`.
- Replace images under `public/assets/` and update the matching paths in the JSON.
- Keep project facts and numerical results tied to repository evidence. No house-price score is published because the available materials report conflicting values.
- Keep the public CV in sync with the JSON by regenerating it after changing the resume content.

## Regenerate the public CV

The downloadable CV is generated from the portfolio data with ReportLab:

```powershell
uv run --with reportlab python scripts/generate_public_cv.py
```

This writes `public/omar-nagy-cv.pdf`. The original CV is not part of the public site.

## Project sources

- [DataPilot AI](https://github.com/Omarnagyafifi1/datapilot-ai)
- [HousePrice AI](https://github.com/Omarnagyafifi1/HousePriceAI)
- [Medical Question Answering Chatbot](https://github.com/Omarnagyafifi1/EnglishMedicalChatbot)

## Deployment notes

This is a static single-page site with no server-side secrets. Local asset URLs follow Vite's `base` setting, so subdirectory hosting can be configured in `vite.config.ts`. The DataPilot demo is an external service; the site links to it but does not control its uptime.
