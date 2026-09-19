// Supplied Markdown owns the copy; Framer image mappings own the visual evidence.
import { readFile, writeFile } from 'node:fs/promises';
const base = new URL('../site/work/connect/', import.meta.url);
const raw = await readFile(new URL('connect-case-study.md', base), 'utf8');
const home = await readFile(new URL('../site/index.html', import.meta.url), 'utf8');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline = s => esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
const asset = name => `../../assets/connect/${name}.png`;
const dimensions = new Map();
async function size(name) {
  if (!dimensions.has(name)) {
    const png = await readFile(new URL(asset(name), base));
    dimensions.set(name, [png.readUInt32BE(16), png.readUInt32BE(20)]);
  }
}
for (const name of ['hero','step-zero','delegation-before','delegation-after','delegate-guide','skeleton','old-qu','flow-01','flow-02','flow-03','flow-04','flow-05','who-acts-before','who-acts-after','time-before','time-after','access-before','access-after','page-before','page-after']) await size(name);
const img = (name,alt,eager=false) => `<img src="${asset(name)}" width="${dimensions.get(name)[0]}" height="${dimensions.get(name)[1]}" alt="${esc(alt)}" loading="${eager?'eager':'lazy'}" decoding="async"${eager?' fetchpriority="high"':''} />`;
const zoom = (name,alt) => `<a class="study-zoom" href="${asset(name)}" data-enlarge aria-label="Enlarge: ${esc(alt)}">${img(name,alt)}</a>`;
const figure = (name,alt,caption='') => `<figure class="connect-figure">${zoom(name,alt)}${caption?`<figcaption>${inline(caption)}</figcaption>`:''}</figure>`;
const pair = (name,alt) => `<div class="study-pair${name==='delegation'?' connect-diagrams':''}">${['before','after'].map(state=>`<figure>${zoom(`${name}-${state}`,`${alt}, ${state}`)}<figcaption>${state==='before'?'Before':'After'}</figcaption></figure>`).join('')}</div>`;
const steps=['Grant access: waiting on James','Access check: setting up the connection','Data ingestion: no further action needed','Live: the connection is ready','Share additional context'];
function images(markers) {
  const s=markers.join('\n');
  if(s.includes('Step 0 dialog')) return figure('step-zero','Step 0: Are you the admin for this connector? Delegate name and email fields.');
  if(s.includes('diagram —')) return pair('delegation','Forced registration versus the Step 0 delegation engine');
  if(s.includes('standalone delegate guide')) return figure('delegate-guide','QSRSoft standalone delegate guide with step-locked instructions and help');
  if(s.includes('older version')) return figure('old-qu','Previous Connect Qu modal with an email template for the account representative');
  if(s.includes('new flow 1')) return `<div class="connect-flow">${steps.map((label,i)=>figure(`flow-0${i+1}`,`Connect QSRSoft: ${label}`,`${i+1}. ${label}`)).join('')}</div>`;
  if(s.includes('who-acts state')) return pair('who-acts','Explicit ownership of the next action');
  if(s.includes('time honesty')) return pair('time','Realistic time expectations');
  if(s.includes('backend access check')) return pair('access','Backend access verification');
  if(s.includes('Connect page')) return pair('page','Connect workspace redesign');
  throw new Error(`Unmapped Connect image markers: ${s}`);
}
// The attachment uses nested bullets and nested numbered lists. Keep their semantics.
function list(lines,start,indent) {
  const pattern=/^(\s*)(-|\d+\.)\s+(.*)$/;
  const first=lines[start].match(pattern), tag=first[2]==='-'?'ul':'ol';
  let out=`<${tag}>`,i=start;
  while(i<lines.length) {
    const m=lines[i].match(pattern);
    if(!m || m[1].length!==indent || (m[2]==='-'?'ul':'ol')!==tag)break;
    out+=`<li>${inline(m[3])}`;i++;
    while(i<lines.length) {
      const child=lines[i].match(pattern);
      if(!child || child[1].length<=indent)break;
      const nested=list(lines,i,child[1].length);out+=nested.html;i=nested.next;
    }
    out+='</li>';
  }
  return {html:out+`</${tag}>`,next:i};
}
function render(md) {
  const lines=md.trim().split('\n');let out='';
  for(let i=0;i<lines.length;) {
    const line=lines[i];
    if(!line.trim() || line==='---'){i++;continue;}
    if(line.startsWith('[image:')){const group=[];while(i<lines.length&&lines[i].startsWith('[image:'))group.push(lines[i++]);out+=images(group);continue;}
    if(line.startsWith('### ')){out+=`<h3>${inline(line.replace(/^### (?:\d+\.\d+\s+)?/,''))}</h3>`;i++;continue;}
    if(line.startsWith('> ')){out+=`<blockquote><p>${inline(line.slice(2))}</p></blockquote>`;i++;continue;}
    if(line==='```'){const code=[];i++;while(i<lines.length&&lines[i]!=='```')code.push(lines[i++]);i++;out+=figure('skeleton',code.join(' '));continue;}
    if(line.startsWith('|')) {
      const rows=[];while(i<lines.length&&lines[i].startsWith('|'))rows.push(lines[i++].split('|').slice(1,-1).map(x=>x.trim()));
      out+=`<div class="study-table-wrap"><table><thead><tr>${rows[0].map(c=>`<th scope="col">${inline(c)}</th>`).join('')}</tr></thead><tbody>${rows.slice(2).map(row=>`<tr>${row.map(c=>`<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;continue;
    }
    if(/^(?:- |\d+\. )/.test(line)){const result=list(lines,i,0);out+=result.html;i=result.next;continue;}
    const p=[line];i++;while(i<lines.length&&lines[i].trim()&&!/^(?:#|\[image:|---|>|\||```|- |\d+\. )/.test(lines[i]))p.push(lines[i++]);out+=`<p>${inline(p.join(' '))}</p>`;
  }
  return out;
}
const sections=[...raw.slice(raw.indexOf('## 1. Context')).matchAll(/^## \d+\. (.+)\n([\s\S]*?)(?=^## \d+\.|$(?![\s\S]))/gm)];
if(sections.length!==8)throw new Error(`Expected eight Connect sections, found ${sections.length}`);
const ids=['context','research','personas','step-zero','challenge','patterns','solutions','takeaways'];
const shortTitles=['Context & my role','Research: the numbers','Voices of users','The Step 0 solution','How might we…','Six connector patterns','Small solutions','Reflections & takeaways'];
const toc = ids.map((id,i)=>`<li><a href="#${id}">${shortTitles[i]}</a></li>`).join('');
const logo = home.match(/<button\s+class="logo-mark"[\s\S]*?<\/button>/)[0];
const footer = home.match(/<footer id="connect"[\s\S]*?<\/footer>/)[0].replace('href="#home"','href="#top"');
const initTheme=`<script>try{document.documentElement.dataset.theme=localStorage.getItem('maitreyi-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}</script>`;
const page=`<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="theme-color" content="#fafafa" />
<title>Connect: Turning a Hand-Held Sales Process into a Self-Serve Product | Maitreyi</title><meta name="description" content="Turning complex integrations into a self-serve product. A case study by Maitreyi Sharma." />
<link rel="icon" href="../../assets/logo.svg" /><link rel="alternate" type="text/markdown" href="connect-case-study.md" title="Connect for agents" />
${initTheme}<link rel="stylesheet" href="../../styles.css" /><link rel="stylesheet" href="../super-agent/case-study.css" /><link rel="stylesheet" href="connect.css" /><script src="../../app.js" defer></script><script src="../../landscape.js" defer></script><script src="../super-agent/case-study.js" defer></script></head>
<body class="study-page connect-page" id="top"><a class="skip-link" href="#main">Skip to case study</a>
<header class="study-header"><div class="page-shell"><div class="study-header-inner">${logo}<nav aria-label="Case study navigation"><a href="../../index.html">Back to home</a><a href="#connect">Contact</a><a href="agents/">For agents</a><button id="theme-toggle" class="theme-switch" type="button" role="switch" aria-checked="false" aria-label="Dark theme"><span class="theme-track" aria-hidden="true"><span></span></span><span class="sr-only">Dark theme</span></button></nav></div></div></header>
<main id="main" class="page-shell"><div class="study-reading"><header class="study-intro"><h1>Connect: Turning a Hand-Held Sales Process into a Self-Serve Product</h1><figure>${img('hero','Loop Connect: Connect any data source, displayed on a desktop monitor',true)}</figure></header>
<aside class="study-toc"><details open><summary>On this page</summary><nav aria-label="Contents"><ol>${toc}</ol></nav></details></aside>
<article class="study-article">${sections.slice(0,7).map((s,i)=>`<section id="${ids[i]}" aria-labelledby="${ids[i]}-title"><h2 id="${ids[i]}-title">${inline(s[1])}</h2>${render(s[2])}</section>`).join('\n')}</article></div>
<article class="study-article"><section id="takeaways" aria-labelledby="takeaways-title"><h2 id="takeaways-title">${inline(sections[7][1])}</h2>${render(sections[7][2])}</section></article>
<div class="study-return"><a href="../../index.html#work">← Selected work</a><a href="#top">Back to top ↑</a></div></main>
${footer}<dialog class="study-lightbox" aria-label="Enlarged project image"><form method="dialog"><button aria-label="Close enlarged image">Close ×</button></form><img alt="" /><p></p></dialog><div id="announcement" class="sr-only" role="status" aria-live="polite"></div></body></html>`;
const agentPage=`<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Connect | For agents</title><link rel="icon" href="../../../assets/logo.svg" />${initTheme}<link rel="stylesheet" href="../../../styles.css" /><style>main{max-width:568px;margin:auto;padding:40px 24px 70px}nav{margin:0 0 32px;display:flex;flex-wrap:wrap;gap:12px 20px;width:auto;font-size:13px}pre{font:15px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--muted);margin:0}nav a,nav button{text-decoration:underline;text-underline-offset:4px;font:inherit;padding:0}@media(max-width:370px){main{padding-inline:18px}}</style><script src="../../../app.js" defer></script></head><body><main><nav aria-label="Agent view controls"><a href="../">Human view</a><a href="../connect-case-study.md">Raw Markdown</a><button id="copy-profile">Copy Markdown</button><button id="theme-toggle">Light / dark</button></nav><pre id="profile-text">${esc(raw)}</pre><div id="announcement" role="status" aria-live="polite"></div></main></body></html>`;
for(const [file,content] of [['index.html',page],['agents/index.html',agentPage]]) {
  if(process.argv.includes('--check')) {if(await readFile(new URL(file,base),'utf8')!==content)throw new Error(`Connect ${file} is stale`);}
  else await writeFile(new URL(file,base),content);
}
