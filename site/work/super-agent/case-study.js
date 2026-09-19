// Native adaptation of the supplied edge-blur carousel, including pointer drag.
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-carousel]').forEach(carousel => {
  const viewport=carousel.querySelector('[data-viewport]'), slides=[...viewport.children];
  const prev=carousel.querySelector('[data-prev]'), next=carousel.querySelector('[data-next]');
  let selected=0, last=0, frame=0, drag=null;
  const step=()=>slides[1].offsetLeft-slides[0].offsetLeft;
  function paint(){
    frame=0; const progress=viewport.scrollLeft/step(), velocity=Math.min(1,Math.abs(progress-last)*22);last=progress;
    selected=Math.max(0,Math.min(slides.length-1,Math.round(progress)));
    carousel.querySelector('[data-count]').textContent=`${selected+1} / ${slides.length}`;
    prev.disabled=selected===0;next.disabled=selected===slides.length-1;
    slides.forEach((slide,index)=>{
      const offset=Math.max(-1,Math.min(1,index-progress)), distance=Math.abs(offset);
      const amount=reduced.matches||distance<.001?0:Math.min(1,distance*1.8+velocity*.35);
      const face=slide.querySelector('[data-carousel-face]'), edge=slide.querySelector('[data-carousel-edge]'), shade=slide.querySelector('[data-carousel-shade]');
      face.style.transformOrigin=offset<0?'100% 50%':'0% 50%';
      face.style.transform=`perspective(1100px) rotateY(${reduced.matches?0:-offset*26}deg) scale(${1-(reduced.matches?0:distance*.07)})`;
      edge.style.opacity=String(amount);edge.style.filter=`blur(${12*amount}px)`;
      edge.style.maskImage=offset<0?'linear-gradient(90deg,#000,transparent 30%,transparent 48%,#000)':'linear-gradient(90deg,#000,transparent 52%,transparent 70%,#000)';
      shade.style.opacity=String(reduced.matches?0:distance*.24);shade.style.background=`linear-gradient(${offset<0?90:270}deg,transparent 25%,#000)`;
    });
  }
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(paint);};
  const go=index=>viewport.scrollTo({left:Math.max(0,Math.min(slides.length-1,index))*step(),behavior:reduced.matches?'instant':'smooth'});
  prev.addEventListener('click',()=>go(selected-1));next.addEventListener('click',()=>go(selected+1));
  viewport.addEventListener('scroll',schedule,{passive:true});
  viewport.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();go(e.key==='Home'?0:e.key==='End'?slides.length-1:selected+(e.key==='ArrowLeft'?-1:1));}});
  viewport.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,horizontal:false};viewport.setPointerCapture(e.pointerId);});
  viewport.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(!drag.horizontal&&Math.abs(dx)>6&&Math.abs(dx)>Math.abs(dy)){drag.horizontal=true;viewport.classList.add('dragging');}if(drag.horizontal){e.preventDefault();viewport.scrollLeft=drag.left-dx;}});
  const release=()=>{if(!drag)return;const index=Math.round(viewport.scrollLeft/step());drag=null;viewport.classList.remove('dragging');go(index);};
  viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);viewport.addEventListener('dragstart',e=>e.preventDefault());
  new ResizeObserver(schedule).observe(viewport);reduced.addEventListener('change',schedule);paint();
});
document.querySelectorAll('.study-compare-stage input').forEach(input=>input.addEventListener('input',()=>{input.parentElement.style.setProperty('--reveal',`${input.value}%`);input.setAttribute('aria-valuetext',`${input.value}% before, ${100-Number(input.value)}% after`);}));
const contents=document.querySelector('.study-toc details'), narrow=matchMedia('(max-width:1000px)');
const setContents=()=>{contents.open=!narrow.matches;};setContents();narrow.addEventListener('change',setContents);
const links=[...contents.querySelectorAll('a')];
const observer=new IntersectionObserver(entries=>{const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(!active)return;links.forEach(link=>{if(link.hash===`#${active.target.id}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});},{rootMargin:'-10% 0px -55% 0px'});
document.querySelectorAll('.study-article section').forEach(section=>observer.observe(section));
const lightbox=document.querySelector('.study-lightbox');
document.querySelectorAll('[data-enlarge]').forEach(link=>link.addEventListener('click',event=>{if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;event.preventDefault();const source=link.querySelector('img');lightbox.querySelector('img').src=link.href;lightbox.querySelector('img').alt=source.alt;lightbox.querySelector('p').textContent=source.alt;lightbox.showModal();}));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close();});
