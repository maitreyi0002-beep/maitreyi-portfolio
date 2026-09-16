# Decision log

## 2026-09-14: audience and scope (user)
Hiring managers should see fundamentals, behavioral understanding, AI design awareness, code capability, and ownership of ambiguity. Complete the landing page first; retain existing external case studies. Three experiments remain honest placeholders.

## 2026-09-14: remove lower-priority sections (user)
Experience and How I work / Stack are not on this landing page. Preserve the idea for a future separate page. Email explicitly confirmed as maitreyi0002@gmail.com.

## 2026-09-14: visual direction (implementation, open to feedback)
Neutral near-white / charcoal surfaces, Geist sans-serif, a restrained green accent for availability and focus, generous margins, compact hero, two large real product previews. Dial interpretation: variance 5, motion 4, density 3. The supplied logo is the primary expressive element. Other motion is limited to hover scale, reveal of a project link, and tactile controls. No custom cursor, parallax, scrolling hijack, decorative background, or invented product preview.
Main content max width is 896px at wide desktop (960px shell with padding). Mobile becomes one column. 12px media radii, 8px control radii, circular sound/theme forms; pill only for temporary project-open control. Z-index 5 only for the keyboard skip link. These values are implementation choices, not user approvals.

## 2026-09-14: logo (implementation)
Transcribed supplied logo silhouette to SVG for sharp scaling and independently animated eyes. Preserve the looping M, two dots, and flat mouth. Idle blink every 7 seconds. Tap or click triggers a short greeting. Reduced motion disables all animation. Original reference is kept locally in ignored work/source; no raw chat attachment path is required at runtime.

## 2026-09-14: audio (implementation)
Default off, explicit opt-in, local preference remembered. Short low-volume synthesized tactile tones on controls and project hover after audio activation. No autoplay media, tracking, or third-party sound assets. Exact ASMR timbre remains a refinement opportunity.

## 2026-09-14: agent mode (implementation)
Dedicated human-readable plain summary page plus direct `llms.txt`. Normal homepage is semantic server-delivered HTML so agents do not need to press a button or run scripts. Agent mode contains only public facts, not repository memory or internal plans. Copy summary uses clipboard with selectable-text fallback.

## 2026-09-14: architecture / hosting (user requirement + implementation)
User explicitly requests portable coded website on GitHub or Vercel. Use dependency-free HTML/CSS/JavaScript because this landing page needs no app runtime. Node scripts provide local preview, verification, and static output. Both GitHub Pages and Vercel can deploy it. No Sites registration or proprietary hosting performed, honoring user's hosting choice. Add platform-neutral agent instructions and memory files to source control.

## 2026-09-14: factual restraint (implementation)
Do not fabricate experience dates, tool lists, outcomes, or demo projects. Portfolio copy is a proposed rewrite based on user positioning. Selected project metrics describe system scope, not measured impact. No 1,776 research metric pending clarification.

## 2026-09-14: first version published (implementation)
Created maitreyi0002-beep/maitreyi-portfolio and deployed to GitHub Pages. Repository contains source and portable handoff context. Verified successful deployment plus HTTP 200 and expected content for homepage, agent page, raw summary, and logo. A later documentation-only commit records deployment results. User approval of visual direction is still pending.

## 2026-09-15: structural revision (user)
The current decisions override the 2026-09-14 visual, logo, availability, and About choices. Narrow the centered reading column to match Bishal, with first-person paragraphs and a signature. Replace large inline case-study cards with numbered headings and short summaries, changing the whole background to project colors while screens slide in from the viewport sides. Preserve three experiment placeholders with more breathing room. Remove About and all availability messaging. Leave sound, top navigation, and footer refinements for later.

## 2026-09-15: implementation details
Use a 520px desktop content column (568px outer shell), 17px conversational intro, and a 36px Georgia heading to match the supplied serif reference. This explicit reference overrides the default sans display recommendation. The new supplied angular mark is faithfully redrawn as a filled vector under an animated single-path mask; the reveal lasts 1.8 seconds once, with click replay. Only black or white. Reduced motion shows the complete mark immediately.

Above 1100px with a hover-capable pointer, focus/hover on a project triggers a fixed clipped scene: two actual project images slide from opposite sides over a project-specific cyan/teal backdrop. Text stays unobstructed. Escape, pointer exit, focus exit, window blur, and scrolling the row out of view clear the scene. At smaller widths and on touch, Preview screens expands real images inline and leaves the heading link navigable. Existing sound controls remain; no new project sound design in this revision.

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
