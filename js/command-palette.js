import {$,$$} from './utils.js';
export function initPalette(){
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
