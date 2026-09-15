(function(){
  const $ = (s, scope=document) => scope.querySelector(s);
  const $$ = (s, scope=document) => [...scope.querySelectorAll(s)];
  const best = (key,value,lower=false) => { const old=Number(localStorage.getItem(key)); const valid=Number.isFinite(old); if(!valid || (lower ? value < old : value > old)){ localStorage.setItem(key,String(value)); return true; } return false; };
  const rand=(a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
  const fmt=n=>Number.isInteger(n)?String(n):n.toFixed(2);
  window.GameCore={$, $$, best, rand, shuffle, fmt}; Object.assign(window,{ $, $$, best, rand, shuffle, fmt });
})();
