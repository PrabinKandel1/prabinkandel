const filters=[...document.querySelectorAll('.store-filter')];
const games=[...document.querySelectorAll('.store-game')];
const menuButton=document.querySelector('.store-hamburger');
const mobileMenu=document.querySelector('.store-mobile-menu');

function updateFilterCounts(){
 const counts={all:games.length};
 games.forEach(game=>{const category=game.dataset.category;counts[category]=(counts[category]||0)+1});
 filters.forEach(filter=>{const count=counts[filter.dataset.filter]??0;const small=filter.querySelector('small');if(small)small.textContent=String(count).padStart(2,'0')});
}
function applyFilter(category){
 filters.forEach(button=>button.classList.toggle('active',button.dataset.filter===category));
 games.forEach(game=>{const visible=category==='all'||game.dataset.category===category;game.hidden=!visible;game.setAttribute('aria-hidden',String(!visible))});
}
filters.forEach(filter=>filter.addEventListener('click',()=>applyFilter(filter.dataset.filter)));

const howTo={
 logic:'Use the visible rules to make the next correct move. Plan ahead instead of reacting only to the current turn.',
 deduction:'Collect clues, eliminate impossible answers and commit when the evidence points to one solution.',
 strategy:'Think several moves ahead. Every action changes the position, so protect your next move before acting.',
 memory:'Study the information while it is visible, then reproduce the sequence or matching pattern from memory.',
 speed:'Wait for the correct signal, then act immediately. Your score rewards accuracy as well as quick reactions.',
 words:'Use the available letters and clues to discover the target word before the round ends.',
 numbers:'Follow the numerical rule, calculate carefully and make each decision before the timer or sequence moves on.',
 visual:'Observe the pattern, identify the meaningful visual difference and select the correct target.'
};
function openGameDetail(card){
 const title=card.querySelector('h3')?.textContent.trim()||'Game';
 const desc=card.querySelector('.store-game-copy p')?.textContent.trim()||'';
 const category=(card.dataset.category||'challenge').toUpperCase();
 const href=card.getAttribute('href');
 const modal=document.getElementById('game-detail-modal');
 modal.querySelector('[data-detail-category]').textContent=`${category} / DIGITAL LAB`;
 modal.querySelector('[data-detail-title]').innerHTML=`${title.replace(/&/g,'&amp;')} <em>/ PLAY</em>`;
 modal.querySelector('[data-detail-desc]').textContent=desc;
 modal.querySelector('[data-how]').textContent=howTo[card.dataset.category]||'Read the objective, make your move and improve your local best.';
 modal.querySelector('[data-play-link]').href=href;
 modal.hidden=false;document.body.classList.add('dialog-open');
 requestAnimationFrame(()=>modal.classList.add('is-open'));
}
function closeGameDetail(){const modal=document.getElementById('game-detail-modal');if(!modal)return;modal.classList.remove('is-open');setTimeout(()=>{modal.hidden=true;document.body.classList.remove('dialog-open')},180)}
games.forEach(card=>card.addEventListener('click',e=>{e.preventDefault();openGameDetail(card)}));
document.querySelectorAll('[data-detail-close]').forEach(button=>button.addEventListener('click',closeGameDetail));
document.querySelector('[data-detail-backdrop]')?.addEventListener('click',closeGameDetail);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeGameDetail()});
menuButton?.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('is-open');document.body.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menuButton.textContent=open?'×':'☰'});
mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileMenu.classList.remove('is-open');document.body.classList.remove('menu-open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Open menu');if(menuButton)menuButton.textContent='☰'}));
updateFilterCounts();


// Editorial reveal: games enter as a catalogue, not a card wall.
const revealGames=()=>{
 const rows=[...document.querySelectorAll('.store-game')];
 if(!('IntersectionObserver' in window)){rows.forEach(r=>r.classList.add('is-visible'));return;}
 const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -6% 0px'});
 rows.forEach(row=>io.observe(row));
};
revealGames();
