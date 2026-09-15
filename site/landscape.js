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
    if (id === 'blossom-canvas') setInterval(() => {
      if (!state.visible || document.hidden || reduced.matches || !state.blossoms.length) return;
      const blossom = state.blossoms[Math.floor(Math.random() * state.blossoms.length)];
      interact(state, blossom.x, blossom.y);
      state.active = true;
      wake();
    }, 5000);
    wake();
  }
  const noise = (x,y) => { const n=Math.sin(x*127.1+y*311.7)*43758.5453; return n-Math.floor(n); };
  landscape('blossom-canvas',(ctx,s,reduce) => {
    const unit = s.width < 500 ? 5 : 6;
    const length = Math.min(s.width*.88,850);
    const scale = length/850;
    const dark = document.documentElement.dataset.theme==='dark';
    const branches = [[-20,28,310,75,11],[260,69,525,47,8],[485,48,805,77,5],[115,48,235,13,6],[312,70,410,112,5],[500,48,600,12,4],[633,61,719,112,4],[30,35,190,103,7],[140,50,350,18,5],[280,70,470,123,5],[475,50,705,19,4],[705,68,842,110,3]];
    const buds = [[170,25],[234,15],[277,69],[343,73],[402,107],[468,48],[535,48],[596,14],[645,65],[713,107],[769,72],[812,78],[95,40],[300,45],[376,88],[552,29],[683,83],[745,76],[145,86],[195,104],[317,23],[461,119],[669,24],[837,109]];
    ctx.fillStyle = dark ? '#95674f' : '#755342';
    for(const [x,y,xx,yy,w] of branches) {
      const distance=Math.hypot(xx-x,yy-y); const count=Math.ceil(distance/unit);
      for(let i=0;i<=count;i++){ const t=i/count;ctx.fillRect(Math.round((x+(xx-x)*t)*scale/unit)*unit,Math.round((y+(yy-y)*t)/unit)*unit,unit,Math.max(unit,w*(1-t*.4))); }
    }
    s.blossoms=[];
    const colors=dark ? ['#b95e87','#dc8bad','#f2b0cc','#ffe0e8'] : ['#ce779f','#e3a0bd','#f1bfd2','#f7d9e4'];
    for(const [bx,by] of buds) {
      for(let dx=-4;dx<=4;dx++)for(let dy=-3;dy<=3;dy++){
        if(dx*dx/18+dy*dy/11>1 || noise(bx+dx,by+dy)<.2)continue;
        const x=Math.round((bx*scale+dx*unit)/unit)*unit,y=Math.round((by+dy*unit)/unit)*unit;
        const color=colors[Math.floor(noise(dx+bx,dy+by)*colors.length)];
        ctx.fillStyle=color;ctx.fillRect(x,y,unit,unit);s.blossoms.push({x,y,color,size:unit});
      }
    }
    const now=performance.now()/1000;
    s.petals=s.petals.filter(p=>now-p.born<1.7);
    if(!reduce) for(const p of s.petals){const age=now-p.born;ctx.globalAlpha=Math.max(0,1-age/1.7);ctx.fillStyle=p.color;ctx.fillRect(Math.round((p.x+Math.sin(age*3+p.x)*15+age*12)/unit)*unit,Math.round((p.y+age*40)/unit)*unit,unit,unit);}
    ctx.globalAlpha=1;s.active=s.petals.length>0;
  },(s,x,y)=>{
    const nearby=s.blossoms.filter(p=>Math.hypot(p.x-x,p.y-y)<65);
    const selected=nearby.length?nearby:s.blossoms.filter((_,i)=>i%23===0);
    s.petals.push(...selected.filter((_,i)=>i%4===0).slice(0,14).map(p=>({...p,born:performance.now()/1000})));s.petals=s.petals.slice(-100);
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
