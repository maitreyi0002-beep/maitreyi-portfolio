import { readFile, writeFile } from 'node:fs/promises';
const source = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const text = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const capture = (regex) => { const match = source.match(regex); if (!match) throw new Error(`Agent sync: missing ${regex}`); return match[1]; };
const intro = capture(/<div class="intro-copy">([\s\S]*?)<\/div>/);
const heading = text(capture(/<h1 id="hero-title">([\s\S]*?)<\/h1>/)).replace(/click\s+\.\.\./,'click...');
const projects = [...source.matchAll(/<article class="project"[\s\S]*?<h3>([\s\S]*?)<\/h3>[\s\S]*?<p id="[^"]+">([\s\S]*?)<\/p>[\s\S]*?<\/article>/g)];
const projectLinks = [...capture(/<div class="project-list">([\s\S]*?)<\/section>/).matchAll(/href="(https:[^"]+)"/g)];
if (projects.length !== 2 || projectLinks.length !== 2) throw new Error('Agent sync: expected two projects');
const contacts = capture(/<div class="contact-links">([\s\S]*?)<\/div>/);
const contactLinks = [...contacts.matchAll(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)];
if (contactLinks.length !== 4) throw new Error('Agent sync: expected four contacts');
const experiments = [...source.matchAll(/<div class="experiment">[\s\S]*?<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g)];
if (experiments.length !== 3) throw new Error('Agent sync: expected three experiments');
const summary = `# Maitreyi | Product designer\n\n## ${heading}\n${[...intro.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m=>text(m[1])).join('\n\n')}\n\n## Selected work\n${projects.map((p,i)=>`\n### ${text(p[1]).replace('↗','').trim()}\n${text(p[2])}\nCase study: ${projectLinks[i][1]}\n`).join('')}\n## Latest experiments\n${experiments.map(m=>`${text(m[1])}: ${text(m[2])}`).join('\n')}\n\n## Contact\n${contactLinks.map(m=>`${text(m[2])}: ${m[1]}`).join('\n')}\n`;
const escape = s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
// Reuse the current semantic sections and controls; remove purely decorative scenes.
let page = source.replace(/<div class="project-stage"[\s\S]*?(?=<button class="blossom-canopy")/,'')
 .replace(/<button class="blossom-canopy"[\s\S]*?<\/button>/,'')
 .replace(/<button\s+class="logo-mark"[\s\S]*?<\/button>/,'')
 .replace(/<button class="water-surface"[\s\S]*?<\/button>/,'')
 .replace(/<script src="landscape.js" defer><\/script>/,'')
 .replace(/ data-project="[^"]+"/g,'')
 .replace(/<title>[\s\S]*?<\/title>/,'<title>Maitreyi | Portfolio for agents</title>')
 .replace('<body>','<body class="agent-page synced-agent">')
 .replace('<a class="agent-toggle" href="agents/">For agents</a>','<a class="agent-toggle" href="../">Human view</a>')
 .replace(/(href|src)="(assets\/|styles.css|app.js|llms.txt)/g,'$1="../$2')
 .replace('<h1 id="hero-title">','<p class="intro-label">For agents · Current portfolio</p><h1 id="hero-title">')
 .replace('</div>\n          <p class="signature">','</div>\n          <div class="agent-toolbar"><button class="copy-button" id="copy-profile" type="button">Copy summary</button><a href="../llms.txt">Open raw text ↗</a></div><pre id="profile-text" hidden>'+escape(summary)+'</pre>\n          <p class="signature">');
for (const [file,content] of [['site/llms.txt',summary],['site/agents/index.html',page]]) {
 const url = new URL('../'+file,import.meta.url);
 if (process.argv.includes('--check')) {
  if (await readFile(url,'utf8') !== content) throw new Error(`${file} is stale. Run npm run sync:agents.`);
 } else await writeFile(url,content);
}
