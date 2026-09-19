// The supplied Markdown is the source of truth. Layout changes never rewrite its prose.
import { readFile, writeFile } from 'node:fs/promises';
const base = new URL('../site/work/super-agent/', import.meta.url);
const raw = await readFile(new URL('super-agent-case-study.md', base), 'utf8');
const systemUrl = raw.match(/^design_system_url:\s*(https:\/\/\S+)/m)?.[1];
if (!systemUrl) throw new Error('Missing design system URL in the case-study source');
const home = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline = s => esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
const asset = name => `../../assets/super-agent/${name}`;
const img = (name, alt, eager=false) => `<img src="${asset(name)}" alt="${esc(alt)}" loading="${eager?'eager':'lazy'}" decoding="async"${eager?' fetchpriority="high"':''} />`;
const zoom = (name, alt) => `<a class="study-zoom" href="${asset(name)}" data-enlarge aria-label="Enlarge: ${esc(alt)}">${img(name,alt)}</a>`;
const grid = (items, cls='') => `<div class="study-gallery ${cls}">${items.map(([name,alt])=>zoom(name,alt)).join('')}</div>`;
const pair = (prefix, alt) => `<div class="study-pair">${['before','after'].map(state=>`<figure>${zoom(`${prefix}-${state}.png`,`${alt}, ${state}`)}<figcaption>${state==='before'?'Before':'After'}</figcaption></figure>`).join('')}</div>`;
const carousel = `<div class="study-carousel" role="region" aria-roledescription="carousel" aria-label="Previous product: seven entry points" data-carousel><div class="study-viewport" data-viewport tabindex="0" aria-label="Product screens. Use left and right arrow keys.">${Array.from({length:7},(_,i)=>`<div class="study-slide" role="group" aria-roledescription="slide" aria-label="${i+1} of 7"><div class="study-face" data-carousel-face>${img(`old-0${i+1}.png`,`Previous product, entry point ${i+1}`)}<img data-carousel-edge src="${asset(`old-0${i+1}.png`)}" alt="" aria-hidden="true" loading="lazy" draggable="false" /><div data-carousel-shade aria-hidden="true"></div></div></div>`).join('')}</div><div class="study-carousel-controls"><p>Previous product <span data-count aria-live="polite" aria-atomic="true">1 / 7</span></p><div><button data-prev type="button" aria-label="Previous screen" disabled>Prev</button><button data-next type="button" aria-label="Next screen">Next</button></div></div></div>`;
const comparison = `<figure class="study-comparison"><div class="study-compare-stage" style="--reveal:50%">${img('landing-after.png','Super Agent landing screen after the redesign')}<div class="study-compare-before">${img('landing-before.png','Landing screen before consolidation')}</div><span class="compare-label before">Before</span><span class="compare-label after">After</span><span class="compare-handle" aria-hidden="true">↔</span><input type="range" min="0" max="100" value="50" aria-label="Before and after comparison" aria-valuetext="50% before, 50% after" /></div><figcaption>Drag to compare the landing screens.</figcaption></figure>`;
const systemCta = `<div class="study-system-cta"><a href="${esc(systemUrl)}" target="_blank" rel="noopener noreferrer">View the full component set in Storybook <span aria-hidden="true">↗</span></a></div>`;
function images(markers) {
  const s=markers.join('\n');
  if(s.includes('old version')) return carousel;
  if(s.includes('early exploration')) return grid([1,2,3,4].map(n=>[`exploration-0${n}.avif`,`Landing exploration ${n}`]),'explorations');
  if(s.includes('landing screen')) return comparison;
  if(s.includes('welcome / onboarding')) return grid([['onboarding.png','Welcome and onboarding'],['account-menu.png','Account menu'],['artifact-color.png','Artifact and color components'],['composer.png','Composer and input components'],['sidebar.png','Sidebar navigation'],['artifact-settings.png','Artifact settings panel']],'components') + systemCta;
  if(s.includes('split canvas')) return pair('canvas','Persistent split canvas');
  if(s.includes('Loop Log')) return pair('log','Loop Log');
  if(s.includes('Clarification Cards')) return pair('cards','Clarification cards');
  if(s.includes('Why did this change')) return pair('why','Why did this change follow-up');
  if(s.includes('final product')) return grid([1,2,3,4].map(n=>[`final-0${n}.png`,`Final Super Agent product screen ${n}`]),'final-screens');
  if(s.includes('design system preview')) return `<figure class="study-system-preview">${zoom('system-preview.png','Super Agent design system preview')}</figure>`;
  throw new Error(`Unmapped image markers: ${s}`);
}
const sections = [...raw.slice(raw.indexOf('## 1. About the project')).matchAll(/^## \d+\. (.+)\n([\s\S]*?)(?=^## \d+\.|$(?![\s\S]))/gm)];
const ids=['about','problem','behavior','identity','architecture','friction','takeaways'];
const shortTitles=['About the project','The wrong-door problem','Real behavior','Visual identity','Architecture','Designing for momentum','What I took away'];
function render(md) {
  const lines=md.trim().split('\n'); let out='';
  for(let i=0;i<lines.length;) {
    const line=lines[i];
    if(!line.trim() || line==='---') {i++;continue;}
    if(line==='*(Full design system walkthrough available on a call with Maitreyi.)*') {i++;continue;}
    if(line.startsWith('[image:')) {const group=[]; while(i<lines.length && lines[i].startsWith('[image:')) group.push(lines[i++]); out+=images(group);continue;}
    if(line.startsWith('### ')) {out+=`<h3>${inline(line.replace(/^### \d+\.\d+\s+/,''))}</h3>`;i++;continue;}
    if(line.startsWith('> ')) {out+=`<blockquote><p>${inline(line.slice(2))}</p></blockquote>`;i++;continue;}
    if(line==='```') {const code=[];i++;while(i<lines.length && lines[i]!=='```')code.push(lines[i++]);i++;out+=`<div class="study-architecture" role="img" aria-label="The user states the goal. Intent classification routes it to metric lookup and diagnosis, reports and charts, or financial projections."><p>ONE FRONT DOOR</p><p>“The user states the goal;<br />the platform finds capability.”</p><span aria-hidden="true">↓</span><p>Intent classification</p><div><span>Metric lookup<br />&amp; diagnosis</span><span>Report build<br />&amp; charts</span><span>Financial<br />projections</span></div></div>`;continue;}
    if(line.startsWith('|')) {const rows=[];while(i<lines.length&&lines[i].startsWith('|'))rows.push(lines[i++].split('|').slice(1,-1).map(x=>x.trim()));out+=`<div class="study-table-wrap"><table><thead><tr>${rows[0].map(c=>`<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row=>`<tr>${row.map(c=>`<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;continue;}
    if(/^(- |\d+\. )/.test(line)) {const ordered=/^\d/.test(line);const tag=ordered?'ol':'ul';out+=`<${tag}>`;while(i<lines.length&&/^(?:- |\d+\. )/.test(lines[i]))out+=`<li>${inline(lines[i++].replace(/^(?:- |\d+\. )/,''))}</li>`;out+=`</${tag}>`;continue;}
    if(line.startsWith('**View the full system')) {out+=`<a class="study-system-link" href="https://relaxed-florentine-43d809.netlify.app/" target="_blank" rel="noopener noreferrer">View the full system ↗</a>`;i++;continue;}
    const paragraph=[line];i++;while(i<lines.length&&lines[i].trim()&&!/^(?:#|\[image:|---|>|\||```|- |\d+\. )/.test(lines[i]))paragraph.push(lines[i++]);out+=`<p>${inline(paragraph.join(' '))}</p>`;
  }
  return out;
}
if(sections.length!==8)throw new Error(`Expected eight sections, found ${sections.length}`);
const toc = ids.map((id,i)=>`<li><a href="#${id}">${shortTitles[i]}</a></li>`).join('');
const logo = home.match(/<button\s+class="logo-mark"[\s\S]*?<\/button>/)[0];
const footer = home.match(/<footer id="connect"[\s\S]*?<\/footer>/)[0].replace('href="#home"','href="#top"');
const initTheme=`<script>try{document.documentElement.dataset.theme=localStorage.getItem('maitreyi-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}</script>`;
const page=`<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="theme-color" content="#fafafa" />
<title>Super Agent: One Front Door | Maitreyi</title><meta name="description" content="Designing an AI that understands intent, not interfaces. A case study by Maitreyi Sharma." />
<link rel="icon" href="../../assets/logo.svg" /><link rel="alternate" type="text/markdown" href="super-agent-case-study.md" title="Super Agent for agents" />
${initTheme}<link rel="stylesheet" href="../../styles.css" /><link rel="stylesheet" href="case-study.css" /><script src="../../app.js" defer></script><script src="../../landscape.js" defer></script><script src="case-study.js" defer></script></head>
<body class="study-page" id="top"><a class="skip-link" href="#main">Skip to case study</a>
<header class="study-header"><div class="page-shell"><div class="study-header-inner">${logo}<nav aria-label="Case study navigation"><a href="../../index.html">Back to home</a><a href="#connect">Contact</a><a href="agents/">For agents</a><button id="theme-toggle" class="theme-switch" type="button" role="switch" aria-checked="false" aria-label="Dark theme"><span class="theme-track" aria-hidden="true"><span></span></span><span class="sr-only">Dark theme</span></button></nav></div></div></header>
<main id="main" class="page-shell"><div class="study-reading"><header class="study-intro"><h1>Super Agent: One Front Door</h1><p>Designing an AI that understands intent, not interfaces.</p><figure>${img('hero.png','Super Agent landing screen: What can we help you with today?',true)}</figure></header>
<aside class="study-toc"><details open><summary>On this page</summary><nav aria-label="Contents"><ol>${toc}</ol></nav></details></aside>
<article class="study-article">${sections.slice(0,6).map((s,i)=>`<section id="${ids[i]}" aria-labelledby="${ids[i]}-title"><h2 id="${ids[i]}-title">${inline(s[1])}</h2>${render(s[2])}</section>`).join('\n')}</article></div>
<article class="study-article"><section id="takeaways" aria-labelledby="takeaways-title"><h2 id="takeaways-title">${inline(sections[6][1])}</h2>${render(sections[6][2])}</section></article>
<div class="study-return"><a href="../../index.html#work">← Selected work</a><a href="#top">Back to top ↑</a></div></main>
${footer}<dialog class="study-lightbox" aria-label="Enlarged project image"><form method="dialog"><button aria-label="Close enlarged image">Close ×</button></form><img alt="" /><p></p></dialog><div id="announcement" class="sr-only" role="status" aria-live="polite"></div></body></html>`;
const agentPage=`<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Super Agent | For agents</title><link rel="icon" href="../../../assets/logo.svg" />${initTheme}<link rel="stylesheet" href="../../../styles.css" /><style>main{max-width:568px;margin:auto;padding:40px 24px 70px}nav{margin:0 0 32px;display:flex;flex-wrap:wrap;gap:12px 20px;width:auto;font-size:13px}pre{font:15px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--muted);margin:0}nav a,nav button{text-decoration:underline;text-underline-offset:4px;font:inherit;padding:0}@media(max-width:370px){main{padding-inline:18px}}</style><script src="../../../app.js" defer></script></head><body><main><nav aria-label="Agent view controls"><a href="../">Human view</a><a href="../super-agent-case-study.md">Raw Markdown</a><button id="copy-profile">Copy Markdown</button><button id="theme-toggle">Light / dark</button></nav><pre id="profile-text">${esc(raw)}</pre><div id="announcement" role="status" aria-live="polite"></div></main></body></html>`;
for(const [file,content] of [['index.html',page],['agents/index.html',agentPage]]) {
  if(process.argv.includes('--check')) {if(await readFile(new URL(file,base),'utf8')!==content)throw new Error(`Super Agent ${file} is stale`);}
  else await writeFile(new URL(file,base),content);
}
