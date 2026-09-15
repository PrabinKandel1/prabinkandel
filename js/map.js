const LAT=28.248112;
const LON=83.880571;

export function initContactMap(){
  const el=document.querySelector('#contact-map');
  if(!el||el.dataset.ready)return;
  const bbox='83.865571,28.238112,83.895571,28.258112';
  const frame=document.createElement('iframe');
  frame.title='Map showing Prabin Kandel in Pokhara, Nepal';
  frame.loading='lazy';
  frame.referrerPolicy='no-referrer-when-downgrade';
  frame.src=`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${LAT}%2C${LON}`;
  frame.setAttribute('allowfullscreen','');
  frame.style.cssText='width:100%;height:100%;min-height:420px;border:0;display:block;';
  el.replaceChildren(frame);
  el.dataset.ready='1';
}
