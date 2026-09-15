# Instructions for any agent working on this portfolio

Read `PROJECT_MEMORY.md`, `docs/DECISIONS.md`, and `docs/STATUS.md` before making changes. These are the cross-platform memory for this project, including Claude, Codex, Cursor, or a human developer. They replace reliance on the originating chat.

## Current user scope
- Finish and iterate the landing page first. Do not rewrite the case studies yet.
- Keep Experience and How I work / Stack OFF the landing page. A separate page is planned but not commissioned for this version.
- Audience: hiring managers. Position Maitreyi as strong in fundamentals, thoughtful about human behavior, capable in AI design and code, and able to own ambiguous problems end to end.
- Keep exactly three honest AI experiment placeholders until Maitreyi supplies content.
- Use the NEW angular zigzag logo supplied 2026-09-15, black/white only, revealed by one drawing stroke. The earlier face/eyes logo is retired.
- Never display availability or hiring-status language (including open to work or open to opportunities) anywhere on the website or public agent summary.
- No About / Person behind the pixels section. Selected work is a numbered text list with heading and two-line summary, full-page project colors and lateral screens on desktop hover/focus, explicit mobile previews.
- Match the supplied Bishal reference: narrow centered reading column, generous side margins, conversational paragraph intro and signature. Header/footer refinements and sound design are deferred.
- Keep light/dark modes, optional interaction sounds, agent-readable text, and mobile behavior.
- Public contact email is `maitreyi0002@gmail.com`.
- GitHub / Vercel are the requested homes. Do not move this project to a proprietary hosting platform.

## Maintenance rules
- Source is plain HTML, CSS, and JavaScript in `site/`. No runtime dependencies or platform APIs. Preserve that simplicity unless a new requirement justifies change.
- Update `site/llms.txt` and the readable `site/agents/index.html` whenever portfolio facts change.
- All shipped project imagery is real user work sourced from her existing portfolio. Do not invent screens, roles, dates, employers, metrics, or outcomes.
- Keep source and handoff documents in the same Git repository. Update the decision log and status after every meaningful iteration. Clearly distinguish user decisions, implementation choices, and unconfirmed proposals.
- Run `npm run check` and `npm run build` after changes. Check desktop/mobile, both themes, keyboard focus, sound opt-in, reduced motion, and agent mode when changing interactions.
- Never commit credentials, `.env`, work files, downloaded reference HTML, or local tool caches.
- Do not silently declare user satisfaction. A functioning first version still needs the user's design feedback.

## Quick start
`npm run dev` serves `http://127.0.0.1:4173`. `npm run build` copies `site/` to `dist/`. Any static host can serve the result. See README for hosting.
