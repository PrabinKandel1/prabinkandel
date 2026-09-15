
const items=[...document.querySelectorAll('.cs-section,.cs-overview-card,.cs-visual,.cs-card,.cs-decision,.cs-flow-step')];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce){items.forEach(el=>el.classList.add('is-visible'));}
else if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -7% 0px'});items.forEach(el=>{el.classList.add('cs-reveal');io.observe(el)});}
