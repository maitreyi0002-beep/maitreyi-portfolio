import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const capture = (regex) => { const match = source.match(regex); if (!match) throw new Error(`Agent sync: missing ${regex}`); return match[1]; };
const intro = capture(/<div class="intro-copy">([\s\S]*?)<\/div>/);
const heading = text(capture(/<h1 id="hero-title">([\s\S]*?)<\/h1>/)).replace(/click\s+\.\.\./,'click...');
const projects = [...source.matchAll(/<article class="project"[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<p id="[^"]+">([\s\S]*?)<\/p>[\s\S]*?<\/article>/g)];
const projectLinks = [...capture(/<div class="project-list">([\s\S]*?)<\/section>/).matchAll(/href="(https:[^"]+)"/g)];
if (!projects.length || projectLinks.length !== projects.length) throw new Error('Agent sync: project count/link mismatch');
const projectLabels = [...source.matchAll(/<a\s+class="project-link"([^>]+)>/g)].map(m=>m[1].match(/data-link-label="([^"]+)"/)?.[1] || 'Read case study');
const contacts = capture(/<div class="contact-links">([\s\S]*?)<\/div>/);
const contactLinks = [...contacts.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
if (contactLinks.length !== 4) throw new Error('Agent sync: expected four contacts');
const experiments = [...source.matchAll(/<div class="experiment">[\s\S]*?<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)];
if (experiments.length !== 3) throw new Error('Agent sync: expected three experiments');
const summary = `# Maitreyi | Product designer\n\n## ${heading}\n${[...intro.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m=>text(m[1])).join('\n\n')}\n\n## Selected work\n${projects.map((p,i)=>`\n### ${text(p[1]).replace('↗','').trim()}\n${text(p[2])}\n[${projectLabels[i]}](${projectLinks[i][1]})\n`).join('')}\n## Latest experiments\n${experiments.map(m=>`[${text(m[1])}](${new URL(m[1].match(/href="([^"]+)"/)[1], 'https://maitreyi0002-beep.github.io/maitreyi-portfolio/').href}): ${text(m[2])}`).join('\n')}\n\n## Contact\n${contactLinks.map(m=>`- [${text(m[2])}](${m[1]})`).join('\n')}\n`;
const escape = s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
// Display literal Markdown, with clickable URLs but no rendered portfolio components.
const linkedSummary = escape(summary).replace(/\]\((https?:[^)]+|mailto:[^)]+)\)/g,
  (_, url) => `](<a href="${url}">${url}</a>)`);
const page = `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Maitreyi | Portfolio for agents</title>
<meta name="description" content="Maitreyi’s portfolio as plain Markdown: profile, selected work, experiments and contact links." />
<link rel="icon" href="../assets/logo.svg" />
<style>
:root { color-scheme:light dark; --bg:#f7f9fb; --text:#33465b; --muted:#64758a; }
@media(prefers-color-scheme:dark) { :root { --bg:#181818; --text:#d2d7de; --muted:#a6b2c0; } }
:root[data-theme="light"] { color-scheme:light; --bg:#f7f9fb; --text:#33465b; --muted:#64758a; }
:root[data-theme="dark"] { color-scheme:dark; --bg:#181818; --text:#d2d7de; --muted:#a6b2c0; }
* { box-sizing:border-box; }
body { margin:0; background:var(--bg); color:var(--text); font:15px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace; }
main { max-width:568px; margin:auto; padding:44px 24px 80px; }
nav { display:flex; flex-wrap:wrap; gap:12px 24px; margin-bottom:40px; font-size:13px; }
a,button { color:var(--muted); }
a { text-decoration:underline; text-underline-offset:3px; }
button { padding:0; border:0; background:none; font:inherit; cursor:pointer; text-decoration:underline; text-underline-offset:3px; }
a:focus-visible,button:focus-visible { outline:2px solid currentColor; outline-offset:4px; }
pre { margin:0; font:inherit; white-space:pre-wrap; overflow-wrap:anywhere; }
@media(max-width:767px) { main { padding:28px 24px 50px; } nav { margin-bottom:28px; } }
@media(max-width:370px) { main { padding-left:18px; padding-right:18px; } }
</style>
<script src="../app.js" defer></script>
</head><body><main>
<nav aria-label="Agent view controls"><a href="../">Human view</a><a href="../llms.txt">Raw Markdown</a><button id="copy-profile" type="button">Copy Markdown</button><button id="theme-toggle" type="button" aria-label="Switch color theme">Light / dark</button></nav>
<pre id="profile-text">${linkedSummary}</pre>
<div id="announcement" role="status" aria-live="polite"></div>
</main></body></html>
`;
for (const [file,content] of [['site/llms.txt',summary],['site/agents/index.html',page]]) {
 const url = new URL('../'+file,import.meta.url);
 if (process.argv.includes('--check')) {
  if (await readFile(url,'utf8') !== content) throw new Error(`${file} is stale. Run npm run sync:agents.`);
 } else await writeFile(url,content);
}
