# Hosting and continuity

Repository: https://github.com/maitreyi0002-beep/maitreyi-portfolio

Live website (verified): https://maitreyi0002-beep.github.io/maitreyi-portfolio/
Agent view: https://maitreyi0002-beep.github.io/maitreyi-portfolio/agents/

Hosting choice: GitHub Pages, as permitted by the user's request for GitHub or Vercel. The source repository is public and the site is intended as a public professional portfolio. The same source is Vercel-ready; no second hosting account is required for the first version.

Only `site/` (copied to `dist/`) is deployed. Agent instructions, memory, decisions, and source attribution remain in the repository for handoff; they are not served as portfolio pages. Do not put secrets in either location.

Deployment workflow: `.github/workflows/pages.yml`. Changes to site source, scripts, or workflow on `main` deploy automatically. Documentation-only commits do not redeploy. Manual deployment is available through Actions > Deploy portfolio to GitHub Pages > Run workflow.

For migration to Vercel, import the same GitHub repository. `vercel.json` supplies build command and output directory. Keep the source repo connected so the next agent or developer can work through normal commits.

See `docs/STATUS.md` for verified live deployment status. Never assume a successful source push means a successful website deployment.
