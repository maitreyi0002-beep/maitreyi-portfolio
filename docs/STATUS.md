# Current status

Updated: 2026-09-15

## Implementation
Landing-page structural revision implemented for user review. This is not final design approval.

- Narrow centered reading column and conversational intro inspired by the supplied Bishal reference.
- New monochrome angular logo draws once as a stroke; clicking replays it.
- Selected work is two numbered text rows with headings and short descriptions. Desktop hover or keyboard focus reveals real screens from opposite sides and changes the viewport background. Escape and leaving the row dismiss the preview.
- Preview buttons and inline disclosures removed per latest feedback; mobile titles link directly to case studies.
- Tighter intro/project line-height (1.45), paragraph and section gaps. Click in the heading draws a zigzag underline per activation.
- Three honest AI experiment placeholders, with more generous spacing.
- About removed. Never add availability or open-to-work language. Experience and Stack remain excluded.
- Existing light/dark, opt-in sound, agent summary, and contact controls retained. No new hover sound added in this revision.
- Case studies still link to the original Framer pages.
- Decisions, source attribution, and cross-agent memory updated.

## Verification
- `npm run check`, `npm run build`, and JavaScript syntax checks passed.
- Desktop browser: both project focus previews, project background changes, Escape reset, and completed logo stroke checked. Both descriptions occupy two lines at 1280px.
- Mobile browser: expanded previews, exclusive expansion, and no horizontal overflow at 390px and 320px checked. Desktop width also matched viewport at 1280px.
- Dark-theme desktop screenshot inspected with white completed logo and readable intro.
- Reduced-motion CSS disables transitions and presents the completed mark; OS-level emulation not performed.
- A full accessibility audit and real-device testing remain outstanding. No Lighthouse score is claimed.

## Deployment
Repository: https://github.com/maitreyi0002-beep/maitreyi-portfolio
Live URL: https://maitreyi0002-beep.github.io/maitreyi-portfolio/
Revision deployed successfully. Live homepage verified HTTP 200 with the new logo and both project rows.
Source commit: bca0c081eb71959cfcb1677a23cdfb9e6878f078
Workflow: https://github.com/maitreyi0002-beep/maitreyi-portfolio/actions/runs/34927523625

## Next iteration
Review spacing, intro voice, new logo, and project interactions with Maitreyi. Header/footer and sound refinement are explicitly deferred. Do not rewrite case studies yet. Await actual AI experiment content.

Latest compact revision: source check, build, and JavaScript syntax passed. Previous browser results above refer to the prior revision. Desktop activation and completed underline verified in browser; 390px mobile screenshot inspected with no overflow. GitHub Actions run 34944425600 succeeded for source 70dda5d. Live HTML verified with click-word and no preview-button.

## Latest component revision
Pixel blossom header, vertical navigation/theme switch, approved 15px intro, persistent cobalt wave underlines, thumbnail project cards, numbered experiment rows, and interactive pixel-water footer implemented. Contact links updated to email/LinkedIn/X/GitHub.
Browser checked dark desktop and light mobile, semantic theme switch by keyboard, water activation, completed cobalt underline, and 390px layout without overflow. Canopy bottom 165px vs logo top 195px on mobile. Reduced-motion branches checked in source; OS emulation not performed. Full accessibility and real-device audits remain outstanding. Deployed source 6564b8f. Actions run 34961299262 succeeded; live HTML verified with landscape canvas, new script, X link, and no mute control.

## Realistic blossom revision
User rejected pixel blossoms and supplied a realistic floral reference to mirror horizontally. Replaced the header with a generated transparent cherry branch entering from upper left and tapering right, plus soft curved falling petals. Header bounds retained; water footer unchanged because the supplied reference and request concern the blossom artwork. Asset is site/assets/cherry-blossom-realistic.png, generated with the supplied image as reference.
Source check, build and landscape JavaScript syntax passed; light header inspected in browser. Deployment dceacb3 succeeded (Actions 34962974271); live HTML verified with realistic image asset. Mobile check interrupted by navigation, not claimed for this revision.

## Latest correction: restore pixel blossoms
User rejected the realistic branch. Restore pixel branch and falling squares with six additional blossom clusters. Remove realistic asset from shipped site. Main heading reduced by 4px: 32px desktop, 35px mobile, 30px narrow mobile, ending in three dots. Work section has only Selected work; no Projects pill. Other components unchanged.

Restoration source 52c068d deployed successfully via Actions 34963155564. Source check, build and landscape syntax passed.

## Fuller tree, periodic petals, and contrast/link fixes
Added five branching twigs and six flower clusters. Visible blossom canopy releases petals every 5000ms, skipping hidden/offscreen/reduced-motion states. Project preview cards now switch to a light surface with the dark preview text in both themes. Footer displays linkedin/in/maitreyii, x/maitreyi0002, github/maitreyi0002-beep and email. Heading/contact underlines share a fixed 16px repeating wave tile, avoiding stretched SVGs. Contact waves animate on hover, focus and click; heading retains click trigger.

Source 7e7940d deployed, Actions 34964714570 succeeded, live footer IDs and shared underline markup verified. Build/source/syntax passed. Browser verified dark-theme project preview surface rgb(244,250,251), description rgb(54,86,90), all five wave tiles 16px by 8px. Five-second timer and hidden/reduced-motion guards checked in source.

## 2026-09-16: agent view synchronization
Agent view is generated from site/index.html with current intro, selected work, experiments, contact IDs and navigation, omitting decorative landscapes and side previews. Removed obsolete About and resume. Raw summary and copy text derive from the same source. Run npm run sync:agents after landing edits; npm run check detects stale generated pages and npm run build regenerates them. Edit scripts/sync-agent.mjs instead of generated agent HTML.

Agent synchronization source 6ca016b deployed successfully (Actions 35074209792). Live agent HTML and llms.txt verified for approved intro, contact IDs, removal of About/resume. Source/build checks passed. Browser verified desktop layout, copy success, light/dark switch and 390px viewport with document width 390px and 15px intro.

## 2026-09-16: agent mode is literal Markdown
User clarified agent view must look like an .md document, not a styled clone of the portfolio. Show visible Markdown headings and link syntax in a single monospace text column. No cards, thumbnails, decorative art, animated underlines or portfolio footer. Keep compact Human view, raw Markdown, copy and theme controls. Content remains generated from the current homepage; no About/resume or availability language.

Literal-Markdown revision d81b170 deployed successfully (Actions 35074753632); live HTML confirmed as visible preformatted Markdown with no project cards. Source/build checks, copy action and 390px wrapping passed. Desktop screenshot inspected.

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

Final navigation verification: Morphing Flow link clicked through to #experiments; WarmCall overview link clicked through to #work. WarmCall mobile uses existing wc-back control (fefbf80), avoiding overlay; all desktop prototype pages also include a portfolio link. components.codes Sites v8 publication succeeded; portfolio 4dbc1e9 deployment succeeded and both human/agent library links use target=_blank with noopener noreferrer. Framer editor URL requested to complete Super Agent/Connect.
