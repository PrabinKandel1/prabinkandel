import{initLoader}from"./loader.js";
import{initNavigation}from"./navigation.js";
import{initTheme}from"./theme.js";
import{initReveal}from"./reveal.js";
import{initCounters}from"./counters.js";
import{initSkills}from"./skills.js";
import{initGallery}from"./gallery.js";
import{initCredentials}from"./credentials.js";
import{initLightbox}from"./lightbox.js";
import{initContact}from"./contact.js";
import{initAssistant}from"./assistant.js";
import{initPalette}from"./command-palette.js";
import{initArtifact}from"./artifact.js";
import{initContactMap}from"./map.js";
import{initProcess}from"./process.js";

function boot(){
  const tasks=[initLoader,initTheme,initNavigation,initReveal,initCounters,initSkills,initGallery,initCredentials,initLightbox,initContact,initAssistant,initPalette,initArtifact,initContactMap,initProcess];
  for(const task of tasks){try{task()}catch(error){console.error(`[Prabin Lab] ${task.name||'module'} failed`,error)}}
  const year=new Date().getFullYear();
  document.querySelector('#year')?.replaceChildren(String(year));
  document.querySelector('#footer-year')?.replaceChildren(String(year));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
