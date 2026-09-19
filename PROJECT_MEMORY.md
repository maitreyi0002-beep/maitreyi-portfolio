# Maitreyi's portfolio: shared project memory

Last updated: 2026-09-15. This file records project context, not private chat transcripts or credentials.

## Purpose and audience
The portfolio should convince hiring managers that Maitreyi understands design fundamentals, stays current in AI design, can build with code, studies behavior and psychology, and can own ambiguous problems end to end. Preserve an approachable, curious personal voice.

## Original portfolio
https://uxmaitreyii.framer.website/
Current case studies: `/super-agent` and `/connect` on that domain. The original homepage used a dark forest, retro television, floating app dock, record player, scattered positioning statements, projects, a long personal section, skills, testimonials, and footer. The user found it busy and distracting from the work. Full visual overhaul and copy revision are authorized.

## References and what the user likes
- https://bishal.cc/: small ASMR-like interaction sounds, project interactions, looping eye animation. Apply the idea to Maitreyi's supplied logo; do not copy the reference branding.
- https://www.rakshit.design/: concise visual case studies, explanatory illustrations, clear separation of case studies and AI experiments. Case study rewriting is postponed.
- https://www.abstract.systems/: agent-readable view, concise connect/experience, workflow/stack. User subsequently removed experience and stack from this landing-page scope.
- https://jakubantalik.com/: craft, light/dark treatment, work presentation, code implementations. Benchmark for improving interaction craft, not content to copy.

## Explicit decisions, chronological
2026-09-10: Minimalist background, good spacing, small interactive animations, mobile considered, three experiment placeholders, possible copy rewrite.
2026-09-14: Supplied an M-shaped looping face logo with two circular eyes and a flat mouth. Target hiring managers; emphasize behavioral understanding, strong basics, AI/coding capability, ambiguity, end-to-end ownership.
2026-09-14: Landing page first, case studies later. Move away from Framer to portable code. End-to-end GitHub or Vercel hosting requested. Record decisions in repository for another agent to continue if tokens run out.
2026-09-14 follow-up: No Experience section on landing page. No How I work / Stack on landing page. A separate page is planned. Public email: maitreyi0002@gmail.com.

## Current page order
Header -> narrow conversational introduction with new monochrome stroke logo -> numbered project text rows with peripheral hover previews -> three spaced experiment placeholders -> existing contact footer. No About, Experience, Stack, or availability language.

## Confirmed content sources
Super Agent: four specialized AI products consolidated into one entry point; behavioral research, interaction design, design systems. Connect: 22 workflows, six reusable patterns, 50+ connectors. These are existing portfolio claims, not independently validated results. Do not invent post-launch improvements.
Email explicitly provided by user. LinkedIn and resume links come from the original public portfolio. The About hobby details come from the original portfolio.

## Deferred / unresolved
- User satisfaction and revisions to first visual version.
- Whether to keep current project preview selections.
- Names, demos, and descriptions for the three experiments.
- Separate workflow/stack page and its exact scope.
- Case study rewrite, metric validation, roles, shipping status, and outcomes.
- Original research wording conflict: homepage calls 1,776 "conversations"; case study calls them "interactive sessions." Avoid that number on this landing page until clarified.

## Portability principle
The repository is the source of truth. Maintain AGENTS.md, CLAUDE.md, this memory, decision log, status, source attribution, and hosting instructions in Git. Any static host can serve the built site; no Codex, Sites, Framer, or Vercel-specific API is needed at runtime.

## Published first version
Live: https://maitreyi0002-beep.github.io/maitreyi-portfolio/
Repository: https://github.com/maitreyi0002-beep/maitreyi-portfolio
GitHub Pages deployment verified on 2026-09-14. Source and cross-agent memory are committed together. Vercel configuration is included for optional migration. First version awaits Maitreyi's visual feedback; do not treat publication as final design approval.

## Latest steering: 2026-09-15 (supersedes earlier conflicting decisions)
- Follow Bishal screenshot for side margins, narrow intro and natural first-person tone.
- Replace the face with supplied angular zigzag shape; black and white only; one stroke drawing into the completed mark, no blink or greeting.
- NEVER mention open to work or any equivalent availability language anywhere in public content.
- Work becomes heading + two-line description, with project-colored full-page background and screenshots sliding in/out at the sides on hover.
- Keep three experiments, improve section spacing. Remove Person behind the pixels / About entirely.
- Header and footer will be refined later. Sound design is also postponed. Keep case studies unchanged.

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

## Fuller tree, periodic petals, and contrast/link fixes
Added five branching twigs and six flower clusters. Visible blossom canopy releases petals every 5000ms, skipping hidden/offscreen/reduced-motion states. Project preview cards now switch to a light surface with the dark preview text in both themes. Footer displays linkedin/in/maitreyii, x/maitreyi0002, github/maitreyi0002-beep and email. Heading/contact underlines share a fixed 16px repeating wave tile, avoiding stretched SVGs. Contact waves animate on hover, focus and click; heading retains click trigger.

## 2026-09-16: agent view synchronization
Agent view is generated from site/index.html with current intro, selected work, experiments, contact IDs and navigation, omitting decorative landscapes and side previews. Removed obsolete About and resume. Raw summary and copy text derive from the same source. Run npm run sync:agents after landing edits; npm run check detects stale generated pages and npm run build regenerates them. Edit scripts/sync-agent.mjs instead of generated agent HTML.

## 2026-09-16: agent mode is literal Markdown
User clarified agent view must look like an .md document, not a styled clone of the portfolio. Show visible Markdown headings and link syntax in a single monospace text column. No cards, thumbnails, decorative art, animated underlines or portfolio footer. Keep compact Human view, raw Markdown, copy and theme controls. Content remains generated from the current homepage; no About/resume or availability language.

## Markdown view margins
User requests the same narrow reading column as the normal page. Agent Markdown now uses 568px outer shell, 520px inner column, 24px side padding (18px below 370px), and 15px/1.5 text rhythm matching the intro. Literal Markdown retained.

## 2026-09-17: WarmCall selected work
Added WarmCall as the third selected project, linking to the live mobile/desktop prototype overview at https://maitreyi0002-beep.github.io/warmcall-prototype/. Description based on visible public overview: AI sales prototype with simulated buyers and personalized pitches. Screenshots captured from its real buyer home and bot personalization views; no invented outcomes. Prototype labeled as such in agent summary. Three experiment placeholders remain unchanged. Source repo: https://github.com/maitreyi0002-beep/warmcall-prototype.


## 2026-09-17: real experiments and Loop case study
User supplied all three experiments, superseding the placeholder requirement: components.codes first, Morphing Flow second (the agent skill underpinning the library, per user), Design Observability third. Sources: the two live experiment sites and user-supplied Design Observability skill / August roadmap documents. Public Loop case study separates the scoped reusable skill from the one-off 23-flow, 140-screen roadmap sweep; describes human review, evidence types and limitations without customer identities, internal metrics or private links. Original attachments remain outside the repository. Existing compact landing layout retained. WarmCall added as selected work. Agent summaries include experiment destinations.


## Loop adoption context
User confirmed weekly use of Slack outputs for sprint planning by PMs/product owners, roadmap co-design with VP Engineering, positive CEO response. Text updated; adoption is not measured product impact. Screenshot publication requires pending explicit permission after auto-review block; no screenshots copied into repository. First release cce93dc deployed successfully (Actions 35195890322). Desktop/mobile and both themes checked; agent summary and WarmCall keyboard preview verified.


## Approved Slack summary publication
User explicitly approved publishing the second summary-table screenshot to the public GitHub Pages case study. Included unchanged as site/assets/loop-weekly-feedback.png, with full-size link and descriptive alt text. Detailed customer conversation screenshot remains private and outside repository. Text adoption update 9870b91 deployed successfully.


## 2026-09-17 return navigation
User approved direct return links: WarmCall to #work; Morphing Flow and Loop to #experiments; components.codes gets quiet creator link and opens in a new tab from portfolio. WarmCall root/mobile are bundled templates; modify template JSON, not generated runtime. External repositories edited separately. Framer case studies have no editable source in these repositories and remain outstanding.

Navigation publication: portfolio da3e861; Morphing Flow 67331d0 (build/typecheck passed and return link clicked successfully); WarmCall d8c1e5f pushed to main AND gh-pages (Pages serves gh-pages). Bundled template JSON must escape HTML < as \u003c to preserve closing-script safety. components.codes 5fe7efc mirrored to GitHub and Sites, version 8 deployed successfully; its footer links to portfolio experiments. Portfolio check/build passed. Framer Super Agent/Connect require editor access and remain unchanged.
## 2026-09-18: Super Agent case study migration
User supplied the definitive Super Agent Markdown and product-image archive, authorizing migration from Framer into this repository. Human case study route: `site/work/super-agent/`; raw source: `site/work/super-agent/super-agent-case-study.md`; agent route: `site/work/super-agent/agents/`. Human copy starts at About the project after its title and hero, omitting the supplied agent-only Quick facts section. The agent route shows that full Markdown literally. The home Super Agent card links internally. Seven previous-entry screens use a native accessible scroll-snap carousel rather than the provided React/Embla component, preserving the dependency-free static architecture. All image assets are supplied work and renamed only for stable web paths.

Published in source `edf767e`; GitHub Pages returned HTTP 200 for the human case study, its agent route, hero asset, and the updated landing page.


## 2026-09-19: Super Agent rebuild after design feedback
User rejected the initial migration. This revision restores the complete supplied prose, the homepage's 568px outer shell / 520px reading column and existing type scale. Human content starts at About the project; agent-only facts stay in the full literal-Markdown route. The original Framer page informs the 2×2 explorations, landing comparison slider, 3×2 component gallery, paired solution images and 2×2 final screens. Image enlargement preserves access to detail within the narrow column.

Implementation: `scripts/sync-super-agent.mjs` generates both routes from the supplied Markdown and copies current homepage logo/footer. Build regenerates pages and check detects stale output. The attached carousel's perspective, edge blur and shading are implemented in native JavaScript with seven numbered screens, drag, keyboard and reduced-motion handling; no React runtime added. Centered top navigation, right desktop contents index, collapsed mobile contents, portfolio return and back-to-top are retained. Missing cards-after and system-preview images were recovered from the user's public Framer case study, not invented. Their asset source IDs are XxulW8jC7KNTeOYnED4rQpZL2E and YDBdB2eFzTstZ7F91SHH24K3yI on framerusercontent.com.

Validation: desktop and 390px screenshots inspected in both themes; 320px human/agent pages have no horizontal overflow. Verified carousel next and End (7/7), comparison keyboard adjustment, image dialog and Escape, contents links and footer navigation. Browser reported no console errors. Reduced-motion handling reviewed in source. User design satisfaction remains unconfirmed.


## 2026-09-19: Super Agent navigation and component-set revision
User requested a sticky top navigation with an opaque surface and thin border; plain “Back to home” text without an arrow; desktop contents on the left; a heading/subheading spanning the same reading width as the hero; and removal of the final human design-system section in favor of a prominent Storybook component-set button. The source Markdown and its literal agent view retain the full original section. The button uses the `design_system_url` supplied in that Markdown. The destination was opened and verified as a working Storybook with component documentation. Desktop and 390px/320px layouts were visually checked; 320px had no horizontal overflow.


## 2026-09-19: Super Agent gallery, contents and mobile pairs (user)
Move the Storybook component-set button directly below the six-image design-system gallery and reduce its padding. Keep the four before/after image pairs side by side on mobile. Bound the desktop contents list so it leaves with the story before “What I took away,” never appearing beside the footer. Rename the “Designing for human friction” section so it conveys the solutions too.

Implementation: “Designing for momentum” is the chosen heading and contents label, pending Maitreyi’s wording feedback. The source Markdown and generated agent route use the same heading. A CSS sticky contents list now lives inside a grid wrapper that ends after the sixth section; “What I took away” sits outside that wrapper. The gallery renderer inserts the Storybook button immediately after the six component images, with 13px/16px padding; the outdated call-only note is omitted from the human rendering but retained in the complete Markdown source. The source’s final design-system section stays in agent Markdown, as previously requested.

Validation: check/build passed. Desktop screenshots confirmed initial contents position and that its lower edge is above the viewport when the footer begins. At 390px, all four before/after pairs rendered as two equal columns without horizontal overflow; dark mobile text and image contrast were inspected. The human and agent pages remain generated from the Markdown. User satisfaction remains unconfirmed.


## 2026-09-19: Connect case study
User commissioned a local Connect page using the approved Super Agent format, rounded screenshots, the same top navigation and footer, and a left contents list. Copy is preserved from the supplied `connect-case-study.md`; the agent-only quick facts and frontmatter appear only in the literal Markdown agent view. This supersedes the earlier landing-only scope for Connect.

Implementation: `scripts/sync-connect.mjs` generates the human/agent pages from `site/work/connect/connect-case-study.md`. It reuses Super Agent CSS and interaction JavaScript, with local image/table styles in `site/work/connect/connect.css`. The reading column is 520px, and the sticky contents wrapper ends before reflections. All eight human sections are retained. Twenty native-resolution Framer assets are stored locally, with source URLs in `docs/SOURCES.md`; screenshots enlarge on click/keyboard. Five sequential new-flow screens form a two-column desktop gallery and single-column mobile stack; before/after pairs also stack vertically on mobile. Metrics and quotes are supplied author claims, not independently verified outcomes.

The homepage now links to `work/connect/`. Its old 22-workflow summary conflicted with the supplied 70+ flow count, so the summary now says “complex workflows” without a number; the case study retains the supplied wording. Global agent files are regenerated from that homepage. No new dependencies.

## 2026-09-19: theme switch redesign and circular reveal
User supplied a reference image for the theme toggle and commissioned the change directly. The switch is a 50x26 pill with a sun on the left and a moon on the right, both always visible, and a 20px knob that slides 22px between them. Active icon takes near-black on light and near-white on dark; the inactive icon stays mid grey. Track and knob use their own tokens so the control keeps its own contrast rather than inheriting page surfaces.

Theme changes now run through `document.startViewTransition`, with a `clip-path` circle animated from the switch centre to the farthest viewport corner over 520ms. Default view-transition cross-fades are disabled so the change reads as a clean wipe. Browsers without the API and users preferring reduced motion get an instant switch.

User approved the design and the spacing after review. The removed visible "Dark" label is an implementation choice they accepted in the same review.

