# Instructions for any agent working on this portfolio

Read `PROJECT_MEMORY.md`, `docs/DECISIONS.md`, and `docs/STATUS.md` before making changes. These are the cross-platform memory for this project, including Claude, Codex, Cursor, or a human developer. They replace reliance on the originating chat.

## Current user scope
- Finish and iterate the landing page first. Do not rewrite the case studies yet.
- Keep Experience and How I work / Stack OFF the landing page. A separate page is planned but not commissioned for this version.
- Audience: hiring managers. Position Maitreyi as strong in fundamentals, thoughtful about human behavior, capable in AI design and code, and able to own ambiguous problems end to end.
- Keep exactly three honest AI experiment placeholders until Maitreyi supplies content.
- Use the NEW angular zigzag logo supplied 2026-09-15, black/white only, revealed by one drawing stroke. The earlier face/eyes logo is retired.
- Never display availability or hiring-status language (including open to work or open to opportunities) anywhere on the website or public agent summary.
- No About / Person behind the pixels section. Selected work is a numbered text list with heading and two-line summary, full-page project colors and lateral screens on desktop hover/focus, direct case-study links on mobile.
- Match the supplied Bishal reference: narrow centered reading column, generous side margins, conversational paragraph intro and signature. Header/footer refinements and sound design are deferred.
- Keep light/dark modes, optional interaction sounds, agent-readable text, and mobile behavior.
- Public contact email is `maitreyi0002@gmail.com`.
- GitHub / Vercel are the requested homes. Do not move this project to a proprietary hosting platform.

## Maintenance rules
- Source is plain HTML, CSS, and JavaScript in `site/`. No runtime dependencies or platform APIs. Preserve that simplicity unless a new requirement justifies change.
- Update `site/llms.txt` and the readable `site/agents/index.html` whenever portfolio facts change.
- All shipped project imagery is real user work sourced from her existing portfolio. Do not invent screens, roles, dates, employers, metrics, or outcomes.
- Keep source and handoff documents in the same Git repository. Update the decision log and status after every meaningful iteration. Clearly distinguish user decisions, implementation choices, and unconfirmed proposals.
- The Git repository, not the chat session, is the handoff between agents (Claude, Codex, Cursor). `git pull` before editing and push promptly once a change is verified. Do not leave work uncommitted across sessions: if the user may continue in a different tool or a different local checkout, an unpushed change is invisible to it and can silently diverge into a conflicting one.
- Run `npm run check` and `npm run build` after changes. Check desktop/mobile, both themes, keyboard focus, sound opt-in, reduced motion, and agent mode when changing interactions.
- Never commit credentials, `.env`, work files, downloaded reference HTML, or local tool caches.
- Do not silently declare user satisfaction. A functioning first version still needs the user's design feedback.

## Quick start
`npm run dev` serves `http://127.0.0.1:4173`. `npm run build` copies `site/` to `dist/`. Any static host can serve the result. See README for hosting.

## 2026-09-15: compact spacing and click detail
User requested tighter line spacing and removal of Preview screens controls. Intro/project line-height is 1.45 with smaller paragraph and section gaps. The word click is a keyboard-accessible button that draws a zigzag underline once per activation; reduced motion shows it immediately. Mobile project titles navigate directly; desktop side previews remain. Color accents are proposals only, pending the next iteration.

## 2026-09-15: pixel landscape component revision (latest)
User approved the two-paragraph intro beginning “I’m Maitreyi, a product designer curious about the person behind the screen.” Intro text is now 15px (2px smaller). Keep heading unchanged. Cobalt blue confirmed, not orange: always-visible zigzag under click and all four contact links flows sideways on activation, never draws from empty.
Header is a pink/brown pixel cherry branch confined to 180px desktop / 165px mobile, with interaction-triggered fading petals. Vertical navigation sits at top right with a semantic dark-theme switch and agent link. Mute control removed; sound design remains deferred and audio is disabled, with no hidden stored preference enabling it.
Projects are compact bordered thumbnail cards matching the latest screenshot, retaining real images, case-study links, and desktop side previews. Experiments are numbered rows with uppercase section heading, 18px titles and 16px/24px descriptions; three honest Coming soon placeholders. Footer uses serif heading, four underlined contact links, a divider row, and pixel water responsive to hover, touch, and keyboard. Canvas animation pauses offscreen/when tab hidden and respects reduced motion.
Confirmed footer links: maitreyi0002@gmail.com, https://www.linkedin.com/in/maitreyii/, https://x.com/maitreyi0002, https://github.com/maitreyi0002-beep. Resume removed from footer; historical public resume source can remain in agent summary. No availability language, About, Experience, or Stack.

## Realistic blossom revision
User rejected pixel blossoms and supplied a realistic floral reference to mirror horizontally. Replaced the header with a generated transparent cherry branch entering from upper left and tapering right, plus soft curved falling petals. Header bounds retained; water footer unchanged because the supplied reference and request concern the blossom artwork. Asset is site/assets/cherry-blossom-realistic.png, generated with the supplied image as reference.

## Latest correction: restore pixel blossoms
User rejected the realistic branch. Restore pixel branch and falling squares with six additional blossom clusters. Remove realistic asset from shipped site. Main heading reduced by 4px: 32px desktop, 35px mobile, 30px narrow mobile, ending in three dots. Work section has only Selected work; no Projects pill. Other components unchanged.

## 2026-09-16: agent view synchronization
Agent view is generated from site/index.html with current intro, selected work, experiments, contact IDs and navigation, omitting decorative landscapes and side previews. Removed obsolete About and resume. Raw summary and copy text derive from the same source. Run npm run sync:agents after landing edits; npm run check detects stale generated pages and npm run build regenerates them. Edit scripts/sync-agent.mjs instead of generated agent HTML.

## 2026-09-16: agent mode is literal Markdown
User clarified agent view must look like an .md document, not a styled clone of the portfolio. Show visible Markdown headings and link syntax in a single monospace text column. No cards, thumbnails, decorative art, animated underlines or portfolio footer. Keep compact Human view, raw Markdown, copy and theme controls. Content remains generated from the current homepage; no About/resume or availability language.


## 2026-09-17: real experiments and Loop case study
User supplied all three experiments, superseding the placeholder requirement: components.codes first, Morphing Flow second (the agent skill underpinning the library, per user), Design Observability third. Sources: the two live experiment sites and user-supplied Design Observability skill / August roadmap documents. Public Loop case study separates the scoped reusable skill from the one-off 23-flow, 140-screen roadmap sweep; describes human review, evidence types and limitations without customer identities, internal metrics or private links. Original attachments remain outside the repository. Existing compact landing layout retained. WarmCall added as selected work. Agent summaries include experiment destinations.


## 2026-09-19: Super Agent source of truth
The user has explicitly commissioned the Super Agent case study, superseding the original landing-only scope for this page. Edit `site/work/super-agent/super-agent-case-study.md` for copy and `scripts/sync-super-agent.mjs` for markup. Human and agent HTML are generated. Keep full supplied wording, homepage reading width, right desktop contents and centered top nav. Image layout follows the original Framer reference; do not widen the reading column or summarize the prose again.


## 2026-09-19: Super Agent layout refinement
Keep the case-study header sticky with an opaque background and border. The desktop contents list belongs on the left; mobile contents remains collapsible. Human content ends at “What I took away” and then links to the supplied Storybook component set. Preserve the full raw Markdown, including the design-system section, in the agent route.


## 2026-09-19: Super Agent follow-up
The human Storybook link sits below the six design-system images. The desktop contents list is sticky only within sections 1–6 and stops before takeaways and the footer. “Designing for momentum” is the current section heading and contents label; it is an implementation choice awaiting user feedback.

## 2026-09-19: before/after pairs stack on mobile (supersedes the side-by-side rule above)
User reversed the earlier decision. The four before/after pairs in “Designing for momentum” now stack vertically on mobile, before above after, so each screen is readable at full column width. Desktop keeps the two-column pair layout.


## 2026-09-19: Connect source of truth
The user commissioned Connect as a local case study. Edit `site/work/connect/connect-case-study.md` for copy and `scripts/sync-connect.mjs` for markup; human/agent HTML are generated. Reuse Super Agent styles and interactions, with Connect-specific image/table rules in `site/work/connect/connect.css`. Keep eight human sections, literal full Markdown for agents, native Framer imagery with rounded containers, and vertically stacked mobile image pairs. The contents list stops before reflections/footer. `npm run build` regenerates both case studies; `npm run check` detects stale output.

## 2026-09-19: theme switch redesign and circular reveal (user)
User replaced the old two-tone track with a supplied reference design: a pill holding a sun and a moon, with a circular knob sliding under the active icon. Switching themes reveals the incoming theme as a circle growing from the switch to the far screen corner, via the native View Transitions API. The visible "Dark" text label is gone; the control carries screen-reader-only text instead, matching the case-study header. Keep the no-JavaScript and reduced-motion fallbacks intact.

