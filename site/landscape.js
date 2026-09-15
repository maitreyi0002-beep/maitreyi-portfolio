// Small procedural pixel landscapes. No image downloads or continuous offscreen work.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function landscape(id, draw, interact) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const button = canvas.parentElement;
    const state = { width:0, height:0, time:0, active:false, visible:false, ripples:[], petals:[], blossoms:[] };
    let frame = 0;
    function render(time) {
      frame = 0;
      state.time = reduced.matches ? 0 : time / 1000;
      ctx.clearRect(0,0,state.width,state.height);
      draw(ctx,state,reduced.matches);
      if (state.visible && !document.hidden && !reduced.matches && state.active) frame = requestAnimationFrame(render);
    }
    function wake() { if (!frame) frame = requestAnimationFrame(render); }
    new ResizeObserver(() => {
      const rect = button.getBoundingClientRect();
      state.width = rect.width; state.height = rect.height;
      const ratio = Math.min(devicePixelRatio || 1,2);
      canvas.width = rect.width * ratio; canvas.height = rect.height * ratio;
      ctx.setTransform(ratio,0,0,ratio,0,0); wake();
    }).observe(button);
    new IntersectionObserver(([entry]) => { state.visible = entry.isIntersecting; if(state.visible) wake(); }).observe(button);
    document.addEventListener('visibilitychange', () => { if(!document.hidden) wake(); });
    new MutationObserver(wake).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
    reduced.addEventListener('change',wake);
    let last = 0;
    function input(event) {
      if (performance.now()-last < 75 && event.type==='pointermove') return;
      last = performance.now();
      const box = button.getBoundingClientRect();
      const keyboard = event.type==='click' && event.detail===0;
      interact(state,keyboard ? box.width*.5 : event.clientX-box.left,keyboard ? box.height*.4 : event.clientY-box.top);
      state.active = true; wake();
    }
    button.addEventListener('pointermove',input);
    button.addEventListener('click',input);
    wake();
  }
  const noise = (x,y) => { const n=Math.sin(x*127.1+y*311.7)*43758.5453; return n-Math.floor(n); };
  landscape('blossom-canvas',(ctx,s,reduce) => {
    const now=performance.now()/1000;
    s.petals=s.petals.filter(p=>now-p.born<1.8);
    if(!reduce) for(const p of s.petals){
      const age=now-p.born;
      ctx.save();
      ctx.globalAlpha=Math.max(0,1-age/1.8);
      ctx.translate(p.x+Math.sin(age*2+p.x)*12+age*12,p.y+age*32);
      ctx.rotate(age*1.8+p.x);
      const tint=ctx.createRadialGradient(0,0,0,0,0,7);
      tint.addColorStop(0,'#fff0f5');tint.addColorStop(1,'#d88ba6');
      ctx.fillStyle=tint;ctx.beginPath();ctx.moveTo(0,-6);
      ctx.bezierCurveTo(7,-6,7,4,0,7);ctx.bezierCurveTo(-5,3,-5,-3,0,-6);ctx.fill();ctx.restore();
    }
    s.active=s.petals.length>0;
  },(s,x,y)=>{
    if(y>130)return;
    for(let i=0;i<4;i++)s.petals.push({x:x+(noise(i,x)-.5)*30,y:Math.min(y,105),born:performance.now()/1000});
    s.petals=s.petals.slice(-48);
  });
  landscape('water-canvas',(ctx,s,reduce)=>{
    const pixel=s.width<600?8:10;
    const dark=document.documentElement.dataset.theme==='dark';
    const now=performance.now()/1000;
    s.ripples=s.ripples.filter(r=>now-r.born<2.5);
    for(let y=0;y<s.height;y+=pixel)for(let x=0;x<s.width;x+=pixel){
      let wave=Math.sin(x*.016+y*.034+s.time*.55)*.5+Math.sin(x*.032-y*.028+s.time*.38)*.3;
      for(const r of s.ripples){const age=now-r.born;const distance=Math.hypot(x-r.x,(y-r.y)*1.7);wave+=Math.sin(distance*.07-age*9)*Math.exp(-Math.abs(distance-age*95)/65)*(1-age/2.5)*1.4;}
      const depth=y/s.height;const light=(dark?15:69)+depth*(dark?9:-22)+wave*9+noise(x,y)*4;
      ctx.fillStyle=`hsl(${211+wave*9} ${dark?43:46}% ${light}%)`;
      ctx.globalAlpha=Math.min(1,.14+depth*1.8);ctx.fillRect(x,y,pixel,pixel);
    }
    ctx.globalAlpha=1;s.active=!reduce;
  },(s,x,y)=>{s.ripples.push({x,y,born:performance.now()/1000});s.ripples=s.ripples.slice(-8);});
})();
