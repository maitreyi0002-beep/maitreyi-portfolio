# Maitreyi's portfolio

A portable, dependency-free portfolio. The repository contains the website **and the project memory** so any developer or agent can continue without the original conversation.

## Start here
Read `AGENTS.md`, `PROJECT_MEMORY.md`, `docs/DECISIONS.md`, and `docs/STATUS.md`. Claude also discovers `CLAUDE.md` automatically.

## Run locally
Requires Node.js 20+; no package installation is required.

```sh
npm run dev
```

Open http://127.0.0.1:4173. Edit `site/index.html`, `site/styles.css`, and `site/app.js`. Refresh to see changes.

```sh
npm run check
npm run build
```

The production output is `dist/`. To serve that exact output, use `node scripts/serve.mjs --dist` after stopping the development server.

## Files
- `site/index.html`: landing page and content.
- `site/styles.css`: responsive layout, both themes, logo motion.
- `site/app.js`: progressive enhancement for sound, theme, logo, and copy.
- `site/agents/index.html`: readable public agent summary.
- `site/llms.txt`: direct machine-readable portfolio text.
- `site/assets/`: self-hosted real product screenshots, logo, and font.
- `docs/`: decisions, source attribution, QA status, and deployment details.

## Deploy to Vercel
Import this GitHub repository in your Vercel account. `vercel.json` selects **Other**, build command `npm run build`, output directory `dist`. No environment variables or database are required. Deployments can track your main branch. CLI alternative from this folder: `npx vercel --prod` (requires your Vercel authentication).

## Deploy to GitHub Pages
Use the included `.github/workflows/pages.yml`, then select **GitHub Actions** as the Pages source in repository Settings > Pages. The workflow builds and deploys only `dist/`; repository memory is not served by the website. Relative asset links work under a project URL as well as a root domain. Repository visibility/plan must support Pages.

## Custom domain
Primary address: https://maitreyi.design/ (GoDaddy DNS, GitHub Pages hosting).
GitHub Settings > Pages holds the custom domain; the Actions deployment does not need a CNAME file.
GoDaddy has four A records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, and `www` CNAME `maitreyi0002-beep.github.io` (all TTL 1 hour).
GitHub provisions the HTTPS certificate after DNS validation; enable Enforce HTTPS when available. See `docs/STATUS.md` for verification status.

## Continue in another agent
Open this repository in Claude Code, Cursor, or another coding environment and say:

> Read AGENTS.md, PROJECT_MEMORY.md, docs/DECISIONS.md, and docs/STATUS.md. Continue the landing-page iteration from the current version. Keep Experience and Stack off this page and leave the case studies for later. Document any new decisions and update the public agent summary if facts change.

## Content ownership
Product screenshots and logo belong to Maitreyi or their respective owners. Do not treat portfolio assets as open-source licensed merely because the repository is accessible. Geist's separate font license is included.
