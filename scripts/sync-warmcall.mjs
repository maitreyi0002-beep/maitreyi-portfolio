// User-supplied copy and imagery; shared portfolio chrome is copied at build time.
import { readFile, writeFile } from 'node:fs/promises';
const base = new URL('../site/work/warmcall/', import.meta.url);
const raw = await readFile(new URL('warmcall-case-study.md',base),'utf8');
const home = await readFile(new URL('../site/index.html',import.meta.url),'utf8');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline = s => esc(s).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
const dimensions = new Map();
for (const name of ['hero','loop','warmcall']) {
  const png=await readFile(new URL(`../../assets/warmcall/${name}.png`,base));
  dimensions.set(name,[png.readUInt32BE(16),png.readUInt32BE(20)]);
}
const figureImage = (name,alt,eager=false) => {
  const src=`../../assets/warmcall/${name}.png`, [width,height]=dimensions.get(name);
  return `<a class="study-zoom" href="${src}" data-enlarge aria-label="Enlarge: ${esc(alt)}"><img src="${src}" width="${width}" height="${height}" alt="${esc(alt)}" loading="${eager?'eager':'lazy'}" decoding="async"${eager?' fetchpriority="high"':''} /></a>`;
};
function render(md) {
  return md.trim().split(/\n\n+/).map(block => {
    const image=block.match(/^!\[(.*?)\]\(.*\/(hero|loop|warmcall)\.png\)$/);
    if(image)return `<figure class="warmcall-figure">${figureImage(image[2],image[1])}</figure>`;
    const link=block.match(/^\[(.*?)\]\((https:\/\/[^)]+)\)$/);
    if(link)return `<div class="study-system-cta"><a href="${esc(link[2])}" target="_blank" rel="noopener noreferrer">${esc(link[1])}</a></div>`;
    if(block.startsWith('### '))return `<h3>${inline(block.slice(4))}</h3>`;
    if(block.startsWith('**Loop →') || block.startsWith('**WarmCall →'))return `<div class="mobile-journey">${block.split('\n').map((line,i)=>i===0?`<p>${inline(line)}</p>`:`<p class="journey-steps">${inline(line)}</p>`).join('')}</div>`;
    return `<p>${block.split('\n').map(inline).join('<br />')}</p>`;
  }).join('\n');
}
const subtitle=raw.split('\n\n')[1];
const sections=[...raw.matchAll(/^## (.+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)];
if(sections.length!==4)throw new Error('Expected four WarmCall sections');
const ids=['mobile','loop','warmcall','takeaways'];
const shortTitles=['Why mobile?','Loop: urgency','WarmCall: accessibility','What I carry forward'];
const toc=ids.map((id,i)=>`<li><a href="#${id}">${shortTitles[i]}</a></li>`).join('');
const themeSwitch = home.match(/<button[^>]*id="theme-toggle"[\s\S]*?<\/button>/)[0];
const logo = home.match(/<button\s+class="logo-mark"[\s\S]*?<\/button>/)[0];
const footer = home.match(/<footer id="connect"[\s\S]*?<\/footer>/)[0].replace('href="#home"','href="#top"');
const initTheme=`<script>try{document.documentElement.dataset.theme=localStorage.getItem('maitreyi-theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}</script>`;
const page=`<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="theme-color" content="#fafafa" />
<title>Designing for the moments that move | Maitreyi</title><meta name="description" content="Loop AI and WarmCall: designing mobile experiences for urgency and accessibility." />
<link rel="icon" href="../../assets/logo.svg" /><link rel="alternate" type="text/markdown" href="warmcall-case-study.md" title="Loop AI × WarmCall for agents" />
${initTheme}<link rel="stylesheet" href="../../styles.css" /><link rel="stylesheet" href="../super-agent/case-study.css" /><link rel="stylesheet" href="warmcall.css" /><script src="../../app.js" defer></script><script src="../../landscape.js" defer></script><script src="../super-agent/case-study.js" defer></script></head>
<body class="study-page warmcall-page" id="top"><a class="skip-link" href="#main">Skip to case study</a>
<header class="study-header"><div class="page-shell"><div class="study-header-inner">${logo}<nav aria-label="Case study navigation"><a href="../../index.html">Back to home</a><a href="#connect">Contact</a><a href="agents/">For agents</a>${themeSwitch}</nav></div></div></header>
<main id="main" class="page-shell"><div class="study-reading"><header class="study-intro"><h1>Designing for the moments that move</h1><p>${inline(subtitle)}</p><p class="warmcall-products">Loop AI × WarmCall</p><figure>${figureImage('hero','Mobile screens from Loop AI and WarmCall',true)}</figure></header>
<aside class="study-toc"><details open><summary>On this page</summary><nav aria-label="Contents"><ol>${toc}</ol></nav></details></aside>
<article class="study-article">${sections.slice(0,3).map((s,i)=>`<section id="${ids[i]}" aria-labelledby="${ids[i]}-title"><h2 id="${ids[i]}-title">${inline(s[1])}</h2>${render(s[2])}</section>`).join('\n')}</article></div>
<article class="study-article"><section id="takeaways" aria-labelledby="takeaways-title"><h2 id="takeaways-title">${inline(sections[3][1])}</h2>${render(sections[3][2])}</section></article>
<div class="study-return"><a href="../../index.html#work">← Selected work</a><a href="#top">Back to top ↑</a></div></main>
${footer}<dialog class="study-lightbox" aria-label="Enlarged project image"><form method="dialog"><button aria-label="Close enlarged image">Close ×</button></form><img alt="" /><p></p></dialog><div id="announcement" class="sr-only" role="status" aria-live="polite"></div></body></html>`;
const agentPage=`<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Loop AI × WarmCall | For agents</title><link rel="icon" href="../../../assets/logo.svg" />${initTheme}<link rel="stylesheet" href="../../../styles.css" /><style>main{max-width:568px;margin:auto;padding:40px 24px 70px}nav{margin:0 0 32px;display:flex;flex-wrap:wrap;gap:12px 20px;width:auto;font-size:13px}pre{font:15px/1.5 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow-wrap:anywhere;color:var(--muted);margin:0}nav a,nav button{text-decoration:underline;text-underline-offset:4px;font:inherit;padding:0}@media(max-width:370px){main{padding-inline:18px}}</style><script src="../../../app.js" defer></script></head><body><main><nav aria-label="Agent view controls"><a href="../">Human view</a><a href="../warmcall-case-study.md">Raw Markdown</a><button id="copy-profile">Copy Markdown</button><button id="theme-toggle">Light / dark</button></nav><pre id="profile-text">${esc(raw)}</pre><div id="announcement" role="status" aria-live="polite"></div></main></body></html>`;
for(const [file,content] of [['index.html',page],['agents/index.html',agentPage]]) {
  if(process.argv.includes('--check')) {if(await readFile(new URL(file,base),'utf8')!==content)throw new Error(`WarmCall ${file} is stale`);}
  else await writeFile(new URL(file,base),content);
}
