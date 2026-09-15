/* PRABIN KANDEL — DIGITAL LAB runtime bundle. Source remains modular in /js/*.js. */
(function(){

/* --- utils.js --- */
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));const qs=key=>new URLSearchParams(location.search).get(key);const storage={get(k,f=null){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};

/* --- loader.js --- */
let started = false;

function initLoader() {
  if (started) return;
  started = true;

  const screen = document.querySelector("[data-boot-screen]");
  if (!screen) return;

  const percent = screen.querySelector("[data-boot-percent]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const duration = reduced ? 250 : 2050;
  const start = performance.now();
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    if (percent) percent.textContent = "100%";
    screen.classList.add("is-done");
    document.body.classList.remove("preload", "locked");
    window.setTimeout(() => screen.remove(), reduced ? 0 : 900);
  };

  const tick = (now) => {
    if (finished) return;
    const progress = Math.min(1, (now - start) / duration);
    if (percent) percent.textContent = `${String(Math.round(progress * 100)).padStart(3, "0")}%`;
    if (progress < 1) window.requestAnimationFrame(tick);
    else finish();
  };

  window.requestAnimationFrame(tick);

  // Safety net: a blocked animation frame or browser throttling must never leave the site behind the boot screen.
  window.setTimeout(finish, duration + 1200);
}


/* --- navigation.js --- */
function initNavigation(){const header=$("#site-header"),menu=$("#menu-toggle"),nav=$("#mobile-nav"),links=$$(".desktop-nav a, .mobile-nav a");window.addEventListener("scroll",()=>{header.classList.toggle("scrolled",scrollY>30);const h=document.documentElement,ratio=scrollY/(h.scrollHeight-innerHeight);$("#scroll-progress").style.width=(ratio*100)+"%";let active="";$$("main section[id]").forEach(s=>{if(scrollY>=s.offsetTop-180)active=s.id});$$(".desktop-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+active))},{passive:true});menu?.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));nav.hidden=open;document.body.classList.toggle("mobile-menu-open",!open)});links.forEach(a=>a.addEventListener("click",()=>{nav.hidden=true;menu?.setAttribute("aria-expanded","false");document.body.classList.remove("mobile-menu-open")}));nav?.addEventListener("click",e=>{if(e.target===nav){nav.hidden=true;menu?.setAttribute("aria-expanded","false");document.body.classList.remove("mobile-menu-open")}});}

/* --- theme.js --- */
function initTheme(){const root=document.documentElement,btn=$("#theme-toggle"),saved=localStorage.getItem("pk-theme");if(saved)root.dataset.theme=saved;btn?.addEventListener("click",()=>{const next=root.dataset.theme==="light"?"dark":"light";root.dataset.theme=next;localStorage.setItem("pk-theme",next)});}

/* --- reveal.js --- */
function initReveal(){const els=[...document.querySelectorAll(".reveal,.skill")];if(matchMedia("(prefers-reduced-motion: reduce)").matches){els.forEach(e=>e.classList.add("is-visible"));return}const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e));}

/* --- counters.js --- */
function initCounters(){const els=[...document.querySelectorAll("[data-counter]")];const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;if(el.dataset.done)return;el.dataset.done="1";const target=Number(el.dataset.counter),dec=Number(el.dataset.decimals||0),suffix=el.dataset.suffix||"",prefix=el.dataset.prefix||"";const start=performance.now(),dur=1100;const step=t=>{const p=Math.min(1,(t-start)/dur),v=target*(1-Math.pow(1-p,3));el.textContent=prefix+v.toFixed(dec)+suffix;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step);io.unobserve(el)}),{threshold:.6});els.forEach(e=>io.observe(e));}

/* --- skills.js --- */
function initSkills(){
 const cards=[...document.querySelectorAll('.capability--interactive')];
 cards.forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`)});});
}


/* --- gallery.js --- */
const images=["66.webp","8.webp","7.webp","22.webp","4.webp","3.webp","1.webp","IMG_20260531_121051.webp","IMG_20260531_121307.webp","IMG_20260531_121116.webp","IMG_20260531_121033.webp","IMG_20260531_121231.webp"];const captions=["Portrait / mural field note","Project day / exhibition floor","Presentation / technical showcase","Recognition / certificate moment","Field note / school life","Event / official record","Medal archive / competition trail","Lions Club quiz / 2nd place","VECTOR 2082 / winner certificate","Training / certificate record","Academic recognition / archive","School record / academic document"];function initGallery(){const grid=$("#gallery-grid");if(!grid)return;grid.innerHTML=images.map((im,i)=>`<button class="gallery-item" type="button" data-lightbox="assets/images/${im}" data-caption="${captions[i]}"><img loading="lazy" decoding="async" src="assets/images/${im}" alt="${captions[i]}"><span class="gallery-caption"><span>FIELD NOTE / ${String(i+1).padStart(2,"0")}</span><strong>${captions[i]}</strong></span></button>`).join("");}

/* --- credentials.js --- */
const items=[["competition","VECTOR 2082","Winner · +2 category · Open Project Demonstration","assets/images/IMG_20260531_121307.webp"],["competition","Lions Club Inter-School Quiz Contest","2nd place recognition","assets/images/IMG_20260531_121051.webp"],["competition","Academic quiz recognition","ANNFSU recognition preserved in the supplied archive","assets/images/IMG_20260531_121033.webp"],["academic","Academic record","Certificate/document from the supplied school archive","assets/images/IMG_20260531_121212.webp"],["academic","School record","Transfer / academic document preserved from the original archive","assets/images/IMG_20260531_121231.webp"],["training","Certificate record","Training / participation certificate from the supplied archive","assets/images/IMG_20260531_121116.webp"]];function initCredentials(){const grid=$("#credentials-grid"),search=$("#credential-search"),buttons=[...document.querySelectorAll("[data-filter]")];if(!grid)return;let filter="all";const render=()=>{const q=(search?.value||"").toLowerCase().trim(),found=items.filter(x=>(filter==="all"||x[0]===filter)&&x.slice(0,3).join(" ").toLowerCase().includes(q));grid.innerHTML=found.length?found.map((x,i)=>`<article class="archive-item"><figure><img loading="lazy" decoding="async" src="${x[3]}" alt="${x[1]} evidence"></figure><div class="archive-copy"><small>${x[0].toUpperCase()} / ${String(i+1).padStart(2,"0")}</small><h3>${x[1]}</h3><p>${x[2]}</p></div><button type="button" data-lightbox="${x[3]}" data-caption="${x[1]} — ${x[2]}">OPEN EVIDENCE ↗</button></article>`).join(""):`<div class="empty">No archive item matches that search.</div>`};buttons.forEach(b=>b.addEventListener("click",()=>{buttons.forEach(x=>x.classList.remove("active"));b.classList.add("active");filter=b.dataset.filter;render()}));search?.addEventListener("input",render);render();}

/* --- lightbox.js --- */
function initLightbox(){const box=$("#lightbox"),img=$("#lightbox-image"),cap=$("#lightbox-caption"),close=$("#lightbox-close"),prev=$("#lightbox-prev"),next=$("#lightbox-next");let index=0;const items=()=>[...document.querySelectorAll("[data-lightbox]")];const open=i=>{const all=items();if(!all.length)return;index=(i+all.length)%all.length;const x=all[index];img.src=x.dataset.lightbox;img.alt=x.querySelector("img")?.alt||x.dataset.caption||"";cap.textContent=x.dataset.caption||"";box.hidden=false;document.body.style.overflow="hidden";close.focus()};const hide=()=>{box.hidden=true;document.body.style.overflow=""};document.addEventListener("click",e=>{const x=e.target.closest("[data-lightbox]");if(x)open(items().indexOf(x))});close.addEventListener("click",hide);prev.addEventListener("click",()=>open(index-1));next.addEventListener("click",()=>open(index+1));document.addEventListener("keydown",e=>{if(box.hidden)return;if(e.key==="Escape")hide();if(e.key==="ArrowLeft")open(index-1);if(e.key==="ArrowRight")open(index+1)});}

/* --- contact.js --- */
function initContact(){
 const copyButtons=document.querySelectorAll('[data-copy]');
 copyButtons.forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);const label=button.lastElementChild;const old=label?.textContent||'Copy';if(label)label.textContent='Copied';setTimeout(()=>{if(label)label.textContent=old},1200)}catch{}}));
 const form=document.querySelector('#contact-form'),out=document.querySelector('#contact-feedback');
 const dialog=document.querySelector('#contact-dialog'),open=document.querySelector('#contact-open'),close=document.querySelector('#contact-close'),backdrop=dialog?.querySelector('.contact-dialog-backdrop');
 const show=()=>{if(!dialog)return;dialog.hidden=false;document.body.classList.add('dialog-open');open?.setAttribute('aria-expanded','true');setTimeout(()=>form?.querySelector('input')?.focus(),40)};
 const hide=()=>{if(!dialog)return;dialog.hidden=true;document.body.classList.remove('dialog-open');open?.setAttribute('aria-expanded','false');open?.focus()};
 open?.addEventListener('click',show);close?.addEventListener('click',hide);backdrop?.addEventListener('click',hide);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!dialog?.hidden)hide()});
 if(!form)return;
 const config=window.EMAILJS_CONFIG||{};
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const button=form.querySelector('button[type=submit]'),original=button?.innerHTML;if(button){button.disabled=true;button.innerHTML='Sending… <span>↗</span>'}
  if(window.emailjs&&config.publicKey&&config.serviceId&&config.templateId){
   try{window.emailjs.init({publicKey:config.publicKey});await window.emailjs.sendForm(config.serviceId,config.templateId,form);if(out)out.textContent='Message sent successfully.';form.reset();setTimeout(hide,900)}
   catch(error){console.error('[Digital Lab] EmailJS submission failed',error);if(out)out.textContent='Couldn’t send it. Please try again or use the direct email link.'}
  }else{
   const data=new FormData(form),subject=encodeURIComponent(data.get('subject')||'Portfolio message'),body=encodeURIComponent(`Name: ${data.get('name')||''}\nEmail: ${data.get('email')||''}\n\n${data.get('message')||''}`);window.location.href=`mailto:kandelprabin09@gmail.com?subject=${subject}&body=${body}`;if(out)out.textContent='Opening your email client…';
  }
  if(button){button.disabled=false;button.innerHTML=original}
 });
}

/* --- assistant.js --- */
const answers=[
 [/who|prabin|about/i,'Prabin Kandel is a builder from Pokhara, Nepal focused on interfaces, software projects and interactive browser experiments.'],
 [/education|study|school|gpa|see|ble/i,'The academic archive includes Shree Shitaladevi Community Secondary School for +2 Computer Science, Shree Siddha Baraha Secondary School for Grades 7–10 with SEE GPA 3.79 and BLE GPA 3.48, and Shree Janakalyan English Boarding School for Nursery–Grade 6.'],
 [/skill|html|css|javascript|capabil/i,'The lab focuses on frontend development, UI and interaction, JavaScript, software projects, problem solving and project architecture.'],
 [/win|award|vector|achievement|quiz/i,'The featured record is VECTOR 2082: 3rd National Technical Festival, Open Project Demonstration, winner in the +2 category. Other supplied recognition includes the Lions Club Inter-School Quiz Contest and ANNFSU academic quiz recognition.'],
 [/prometheus|fire|environment/i,'Prometheus X is a private software platform for fire monitoring and environmental data. It organizes supported external measurements such as temperature, humidity, soil moisture, wind-related readings, smoke/air-quality-related readings and GPS/location into a monitoring experience.'],
 [/hire|nepal|job|recruit/i,'Hire-Nepal is a recruitment/job-platform prototype focused on the interface and workflow around job discovery, employer workflows and applications.'],
 [/game|experiment|lab|play/i,'The Interactive Lab contains 30 browser games spanning logic, memory, words, speed, numbers, visual recognition and strategy. Personal bests are local where implemented.']
];
function initAssistant(){
 const a=$('#assistant'),open=$('#assistant-launcher'),close=$('#assistant-close'),form=$('#assistant-form'),input=$('#assistant-input'),messages=$('#assistant-messages');if(!a||!messages)return;
 const show=()=>{a.classList.add('open');a.setAttribute('aria-hidden','false');input?.focus()};const hide=()=>{a.classList.remove('open');a.setAttribute('aria-hidden','true');open?.focus()};
 open?.addEventListener('click',show);close?.addEventListener('click',hide);document.querySelectorAll('.assistant-prompts button').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.query)));
 function ask(q){messages.insertAdjacentHTML('beforeend',`<div class="user">${q.replace(/[<>]/g,'')}</div>`);const match=answers.find(([r])=>r.test(q));messages.insertAdjacentHTML('beforeend',`<div class="bot">${match?match[1]:'I only know the portfolio archive. Try asking about the work, Prometheus X, Hire-Nepal, skills, recognition, education or the lab.'}</div>`);messages.scrollTop=messages.scrollHeight}
 form?.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q){ask(q);input.value=''}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&a.classList.contains('open'))hide()});
}


/* --- command-palette.js --- */
function initPalette(){
 const box=$('#palette'),input=$('#palette-input'),results=$('#palette-results'),open=$('#command-open');
 if(!box||!input||!results)return;
 const items=[['About','#about'],['Skills','#skills'],['Process','#process'],['Work','#projects'],['Interactive Lab','games/index.html'],['Recognition','#work'],['Vault','#credentials'],['Gallery','#gallery'],['Contact','#contact'],['Prometheus X','case-studies/prometheus-x.html'],['Hire-Nepal','case-studies/hire-nepal.html'],['Toggle Theme','theme']];
 let selected=0;
 const render=()=>{const q=input.value.toLowerCase().trim();const list=items.filter(x=>x[0].toLowerCase().includes(q));selected=Math.min(selected,Math.max(0,list.length-1));results.innerHTML=list.length?list.map((x,i)=>`<button class="palette-result ${i===selected?'selected':''}" type="button" data-target="${x[1]}"><span>${x[0]}</span><small>${x[1]==='theme'?'THEME':'OPEN'}</small></button>`).join(''):'<p class="palette-empty">No command matches.</p>';$$('.palette-result',results).forEach((b,i)=>b.addEventListener('click',()=>run(list[i][1])))};
 const show=()=>{box.hidden=false;input.value='';selected=0;render();input.focus();document.body.classList.add('palette-open')};
 const hide=()=>{box.hidden=true;document.body.classList.remove('palette-open');open?.focus()};
 const run=t=>{hide();if(t==='theme'){document.querySelector('#theme-toggle')?.click();return}if(t.startsWith('#'))document.querySelector(t)?.scrollIntoView({behavior:'smooth'});else location.href=t};
 open?.addEventListener('click',show);$$('[data-palette-close]').forEach(x=>x.addEventListener('click',hide));input.addEventListener('input',()=>{selected=0;render()});input.addEventListener('keydown',e=>{const btns=$$('.palette-result',results);if(e.key==='ArrowDown'){e.preventDefault();selected=Math.min(selected+1,Math.max(0,btns.length-1));render()}if(e.key==='ArrowUp'){e.preventDefault();selected=Math.max(selected-1,0);render()}if(e.key==='Enter'){e.preventDefault();btns[selected]?.click()}if(e.key==='Escape')hide()});document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();show()}if(e.key==='/'&&!e.metaKey&&!e.ctrlKey&&!['INPUT','TEXTAREA'].includes(document.activeElement?.tagName)){e.preventDefault();show()}if(e.key==='Escape'&&!box.hidden)hide()});
}


/* --- artifact.js --- */
const root=document.documentElement;
const finePointer=window.matchMedia('(pointer:fine)');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const aq=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];

function initArtifact(){
  initMagnetic(); initPaletteShortcut(); initThemeIcon();
  if(!reduced){ initParallax(); initSpotlight(); initTilt(); }
  root.classList.add('premium-ready');
}
function initMagnetic(){
  if(!finePointer.matches||reduced)return;
  qsa('.magnetic,.brand-mark,.assistant-launcher').forEach(el=>{
    el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const dx=(e.clientX-r.left-r.width/2)*.08,dy=(e.clientY-r.top-r.height/2)*.08;el.style.transform=`translate(${dx}px,${dy}px)`});
    el.addEventListener('pointerleave',()=>el.style.transform='');
  });
}
function initPaletteShortcut(){document.addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement?.tagName||'')){e.preventDefault();aq('#command-open')?.click();}})}
function initThemeIcon(){const b=aq('#theme-toggle');if(!b)return;const paint=()=>{const light=root.dataset.theme==='light';b.textContent=light?'☼':'◐';b.setAttribute('aria-label',light?'Switch to dark mode':'Switch to light mode');b.title=light?'Switch to dark mode':'Switch to light mode'};paint();new MutationObserver(paint).observe(root,{attributes:true,attributeFilter:['data-theme']});}

function initContactMap() {
  const el = document.querySelector('#contact-map');
  if (!el || el.dataset.ready) return;
  const lat = 28.248112, lon = 83.880571;
  const bbox = '83.865571,28.238112,83.895571,28.258112';
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const frame = document.createElement('iframe');
  frame.title = 'Map showing Prabin Kandel in Pokhara, Nepal';
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.src = src;
  frame.setAttribute('allowfullscreen','');
  frame.style.cssText = 'width:100%;height:100%;min-height:420px;border:0;display:block;';
  el.replaceChildren(frame);
  el.dataset.ready = '1';
}


/* --- process.js --- */
function initProcess(){const section=document.querySelector('#process');const rail=document.querySelector('.process-layout');if(!section||!rail)return;const update=()=>{const r=section.getBoundingClientRect();const total=Math.max(1,r.height-innerHeight);const progress=Math.min(100,Math.max(0,((innerHeight-r.top)/total)*100));rail.style.setProperty('--process-progress',progress+'%')};window.addEventListener('scroll',update,{passive:true});update();}


/* --- case-study-transition.js --- */
function initPageTransitions(){
  const links=document.querySelectorAll(
    '.work-text-link[href^="case-studies/"],.work-actions .button-light[href^="case-studies/"]'
  );

  if(!links.length)return;

  const transition=document.createElement('div');
  transition.className='pk-page-transition';

  transition.innerHTML=
    '<div class="pk-transition-grid"></div>'+
    '<div class="pk-transition-line"></div>'+
    '<div class="pk-transition-core">'+
      '<div class="pk-transition-meta">'+
        '<span>05 / CASE STUDY</span>'+
        '<span>PK / PROJECT ARCHIVE</span>'+
      '</div>'+
      '<h2 class="pk-transition-title">Opening <em>case file.</em></h2>'+
      '<div class="pk-transition-status">'+
        '<i></i>'+
        '<span>Preparing project record</span>'+
      '</div>'+
    '</div>'+
    '<div class="pk-transition-progress"><span></span></div>';

  document.body.appendChild(transition);

  links.forEach(link=>{
    link.addEventListener('click',event=>{
      if(
        event.defaultPrevented||
        event.button!==0||
        event.metaKey||
        event.ctrlKey||
        event.shiftKey||
        event.altKey||
        link.target==='_blank'
      )return;

      const destination=link.getAttribute('href');
      if(!destination)return;

      event.preventDefault();

      document.body.classList.add('pk-transitioning');
      transition.classList.add('is-active');

      window.setTimeout(()=>{
        window.location.href=destination;
      },1100);
    });
  });
}


function bootPortfolio(){
  const tasks=[initLoader,initTheme,initNavigation,initReveal,initCounters,initSkills,initGallery,initCredentials,initLightbox,initContact,initAssistant,initPalette,initArtifact,initContactMap,initProcess,initPageTransitions];
  for(const task of tasks){try{task()}catch(error){console.error(`[Prabin Lab] ${task.name||"module"} failed`,error)}}
  const year=new Date().getFullYear();
  document.querySelector("#year")?.replaceChildren(String(year));
  document.querySelector("#footer-year")?.replaceChildren(String(year));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",bootPortfolio,{once:true});else bootPortfolio();
})();
