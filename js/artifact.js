const root=document.documentElement;
const finePointer=window.matchMedia('(pointer:fine)');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];

export function initArtifact(){
  initPaletteShortcut(); initThemeIcon();
  if(!reduced){ initCursor(); initParallax(); initSpotlight(); initTilt(); }
  root.classList.add('premium-ready');
}
function initMagnetic(){
  if(!finePointer.matches||reduced)return;
  qsa('.magnetic,.brand-mark,.assistant-launcher').forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const dx=(e.clientX-r.left-r.width/2)*.08,dy=(e.clientY-r.top-r.height/2)*.08;el.style.transform=`translate(${dx}px,${dy}px)`});
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });
}
function initPaletteShortcut(){document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')){e.preventDefault();qs('#command-open')?.click();}})}
function initThemeIcon(){const b=qs('#theme-toggle');if(!b)return;const paint=()=>{const light=root.dataset.theme==='light';b.textContent=light?'☼':'◐';b.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');b.title=light?'Switch to dark mode':'Switch to light mode'};paint();new MutationObserver(paint).observe(root,{attributes:true,attributeFilter:['data-theme']});}
function initHeroClock(){const panel=qs('.hero-live-panel');if(!panel)return;const small=panel.querySelector('small');const tick=()=>{if(small){const d=new Date();small.textContent=`ONLINE · ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`}};tick();setInterval(tick,1000)}
function initCursor(){if(!finePointer.matches)return;const dot=document.createElement('span'),ring=document.createElement('span');dot.className='cursor-dot';ring.className='cursor-ring';document.body.append(dot,ring);let x=innerWidth/2,y=innerHeight/2,rx=x,ry=y;addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;dot.style.opacity='1';ring.style.opacity='1'},{passive:true});const loop=()=>{rx+=(x-rx)*.14;ry+=(y-ry)*.14;dot.style.left=x+'px';dot.style.top=y+'px';ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)};loop();qsa('a,button,.gallery-item,.archive-item,.game,.certificate,input,textarea').forEach(el=>{el.addEventListener('mouseenter',()=>ring.classList.add('is-hover'));el.addEventListener('mouseleave',()=>ring.classList.remove('is-hover'));});}
function initParallax(){if(!finePointer.matches)return;const img=qs('.hero-visual img');if(!img)return;addEventListener('pointermove',e=>{const nx=e.clientX/innerWidth-.5,ny=e.clientY/innerHeight-.5;img.style.transform=`scale(1.025) translate(${nx*-7}px,${ny*-7}px)`},{passive:true});}
function initSpotlight(){qsa('.capability,.archive-item,.gallery-item,.project-card,.contact-map-wrap').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',`${e.clientX-r.left}px`);el.style.setProperty('--my',`${e.clientY-r.top}px`);el.classList.add('has-spotlight')});el.addEventListener('pointerleave',()=>el.classList.remove('has-spotlight'));});}
function initTilt(){qsa('.game,.archive-item').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${y*-1.6}deg) rotateY(${x*1.6}deg) translateY(-5px)`});card.addEventListener('pointerleave',()=>card.style.transform='');});}
