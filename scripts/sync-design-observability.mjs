// User-supplied copy owns the wording; shared portfolio chrome is copied at build time.
import { readFile, writeFile } from 'node:fs/promises';
const base = new URL('../site/experiments/design-observability/', import.meta.url);
const raw = await readFile(new URL('case-study.md', base), 'utf8');
const home = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline = s => esc(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
const dimensions = new Map();
async function size(src) {
  if (!dimensions.has(src)) {
    const png = await readFile(new URL(`../../${src}`, base));
    dimensions.set(src, [png.readUInt32BE(16), png.readUInt32BE(20)]);
  }
}
const asset = url => url.replace('https://maitreyi0002-beep.github.io/maitreyi-portfolio/', '').replace('https://maitreyi.design/', '');
function figure(url, alt, caption) {
  const src = asset(url);
  return size(src).then(() => {
    const [width, height] = dimensions.get(src);
    const img = `<img src="../../${src}" width="${width}" height="${height}" alt="${esc(alt)}" loading="lazy" decoding="async" />`;
    return `<figure class="do-figure"><a class="study-zoom" href="../../${src}" data-enlarge aria-label="Enlarge: ${esc(alt)}">${img}</a>${caption ? `<figcaption>${inline(caption)}</figcaption>` : ''}</figure>`;
  });
}
async function render(md) {
  const lines = md.trim().split('\n');
  let out = '';
  for (let i = 0; i < lines.length;) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const pipe = line.match(/^(\d\d \/ .+?) : (.+)$/);
    if (pipe) {
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(\d\d \/ .+?) : (.+)$/);
        if (!m) break;
        items.push(m); i++;
        if (lines[i] === '') i++;
      }
      out += `<ol class="do-pipeline">${items.map(m => `<li><strong>${inline(m[1])}</strong><span>${inline(m[2])}</span></li>`).join('')}</ol>`;
      continue;
    }
    const ev = line.match(/^([A-Z][a-z]+) : (.+)$/);
    if (ev) {
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(/^([A-Z][a-z]+) : (.+)$/);
        if (!m) break;
        items.push(m); i++;
        if (lines[i] === '') i++;
      }
      out += `<div class="do-evidence">${items.map(m => `<div><strong>${inline(m[1])}</strong>${inline(m[2])}</div>`).join('')}</div>`;
      continue;
    }
    if (line.startsWith('> ')) { out += `<blockquote><p>${inline(line.slice(2))}</p></blockquote>`; i++; continue; }
    if (line.startsWith('### ')) { out += `<h3>${inline(line.slice(4))}</h3>`; i++; continue; }
    const img = line.match(/^!\[(.*?)\]\((\S+)\)$/);
    if (img) {
      i++;
      let caption = '';
      if (i < lines.length && lines[i].trim() && !/^(?:#|>|!\[|\d\d \/)/.test(lines[i]) && !/^[A-Z][a-z]+ : /.test(lines[i])) { caption = lines[i]; i++; }
      out += await figure(img[2], img[1], caption);
      continue;
    }
    const p = [line]; i++;
    while (i < lines.length && lines[i].trim() && !/^(?:#|>|!\[|\d\d \/|[A-Z][a-z]+ : )/.test(lines[i])) p.push(lines[i++]);
    out += `<p>${inline(p.join(' '))}</p>`;
  }
  return out;
}
const eyebrow = raw.split('\n')[0];
const h1 = raw.match(/^# (.+)$/m)[1];
const intro = raw.slice(raw.indexOf(h1) + h1.length, raw.indexOf('\n## ')).trim().split('\n\n').map(p => `<p>${inline(p)}</p>`).join('');
const sections = [...raw.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)];
if (sections.length !== 8) throw new Error(`Expected eight Design Observability sections, found ${sections.length}`);
const ids = ['question','pipeline','what-counts','roadmap','planning','review','output','takeaways'];
const shortTitles = ['The question behind the skill', 'Question in, evidence out', 'Deciding what counts', 'From flows to a roadmap', 'Where planning happened', 'Designer review changed it', 'What it did and did not do', 'What I take forward'];
const toc = ids.map((id, i) => `<li><a href="#${id}">${shortTitles[i]}</a></li>`).join('');
const renderedSections = await Promise.all(sections.map((s, i) => render(s[2]).then(body => `<section id="${ids[i]}" aria-labelledby="${ids[i]}-title"><h2 id="${ids[i]}-title">${inline(s[1])}</h2>${body}</section>`)));
const themeSwitch = home.match(/<button[^>]*id="theme-toggle"[\s\S]*?<\/button>/)[0];
const logo = home.match(/<button\s+class="logo-mark"[\s\S]*?<\/button>/)[0];
const footer = home.match(/<footer id="connect"[\s\S]*?<\/footer>/)[0].replace('href="#home"', 'href="#top"');
const initTheme = `<script>try{document.documentElement.dataset.theme=localStorage.getItem('maitreyi-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}</script>`;
const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="theme-color" content="#fafafa" />
<title>${inline(h1)} | Maitreyi</title><meta name="description" content="How Maitreyi built a research skill at Loop to connect customer feedback, product behavior and roadmap decisions across 23 flows." />
<link rel="icon" href="../../assets/logo.svg" /><link rel="alternate" type="text/markdown" href="case-study.md" title="Design Observability for agents" />
${initTheme}<link rel="stylesheet" href="../../styles.css" /><link rel="stylesheet" href="../../work/super-agent/case-study.css" /><link rel="stylesheet" href="design-observability.css" /><script src="../../app.js" defer></script><script src="../../landscape.js" defer></script><script src="../../work/super-agent/case-study.js" defer></script></head>
<body class="study-page do-page" id="top"><a class="skip-link" href="#main">Skip to case study</a>
<header class="study-header"><div class="page-shell"><div class="study-header-inner">${logo}<nav aria-label="Case study navigation"><a href="../../index.html">Back to home</a><a href="#connect">Contact</a><a href="agents/">For agents</a>${themeSwitch}</nav></div></div></header>
<main id="main" class="page-shell"><div class="study-reading"><header class="study-intro"><p class="do-eyebrow">${inline(eyebrow)}</p><h1>${inline(h1)}</h1>${intro}</header>
<aside class="study-toc"><details open><summary>On this page</summary><nav aria-label="Contents"><ol>${toc}</ol></nav></details></aside>
<article class="study-article">${renderedSections.slice(0, 7).join('\n')}</article></div>
<article class="study-article">${renderedSections[7]}</article>
<div class="study-return"><a href="../../index.html#experiments">← Experiments</a><a href="#top">Back to top ↑</a></div></main>
${footer}<dialog class="study-lightbox" aria-label="Enlarged project image"><form method="dialog"><button aria-label="Close enlarged image">Close ×</button></form><img alt="" /><p></p></dialog><div id="announcement" class="sr-only" role="status" aria-live="polite"></div></body></html>`;
const agentPage = `<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Design Observability | For agents</title><link rel="icon" href="../../../assets/logo.svg" />${initTheme}<link rel="stylesheet" href="../../../styles.css" /><style>main{max-width:568px;margin:auto;padding:40px 24px 70px}nav{margin:0 0 32px;display:flex;flex-wrap:wrap;gap:12px 20px;width:auto;font-size:13px}pre{font:15px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--muted);margin:0}nav a,nav button{text-decoration:underline;text-underline-offset:4px;font:inherit;padding:0}@media(max-width:370px){main{padding-inline:18px}}</style><script src="../../../app.js" defer></script></head><body><main><nav aria-label="Agent view controls"><a href="../">Human view</a><a href="../case-study.md">Raw Markdown</a><button id="copy-profile">Copy Markdown</button><button id="theme-toggle">Light / dark</button></nav><pre id="profile-text">${esc(raw)}</pre><div id="announcement" role="status" aria-live="polite"></div></main></body></html>`;
for (const [file, content] of [['index.html', page], ['agents/index.html', agentPage]]) {
  if (process.argv.includes('--check')) { if (await readFile(new URL(file, base), 'utf8') !== content) throw new Error(`Design Observability ${file} is stale`); }
  else await writeFile(new URL(file, base), content);
}
