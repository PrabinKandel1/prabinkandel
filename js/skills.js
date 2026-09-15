export function initSkills(){
 const cards=[...document.querySelectorAll('.capability--interactive')];
 cards.forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${e.clientX-r.left}px`);card.style.setProperty('--my',`${e.clientY-r.top}px`)});});
}
