export function initContact(){
 const copyButtons=document.querySelectorAll('[data-copy]');
 copyButtons.forEach(button=>button.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(button.dataset.copy);const label=button.lastElementChild;const old=label?.textContent||'Copy';if(label)label.textContent='Copied';setTimeout(()=>{if(label)label.textContent=old},1200)}catch{}
 }));
 const form=document.querySelector('#contact-form'),out=document.querySelector('#contact-feedback');
 const dialog=document.querySelector('#contact-dialog'),open=document.querySelector('#contact-open'),close=document.querySelector('#contact-close'),backdrop=dialog?.querySelector('.contact-dialog-backdrop');
 const show=()=>{if(!dialog)return;dialog.hidden=false;document.body.classList.add('dialog-open');open?.setAttribute('aria-expanded','true');window.setTimeout(()=>form?.querySelector('input')?.focus(),40)};
 const hide=()=>{if(!dialog)return;dialog.hidden=true;document.body.classList.remove('dialog-open');open?.setAttribute('aria-expanded','false');open?.focus()};
 open?.addEventListener('click',show);close?.addEventListener('click',hide);backdrop?.addEventListener('click',hide);
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!dialog?.hidden)hide()});
 if(!form)return;
 const config=window.EMAILJS_CONFIG||{};
 form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const button=form.querySelector('button[type=submit]'),original=button?.innerHTML;
  if(button){button.disabled=true;button.innerHTML='Sending… <span>↗</span>'}
  if(window.emailjs&&config.publicKey&&config.serviceId&&config.templateId){
   try{window.emailjs.init({publicKey:config.publicKey});await window.emailjs.sendForm(config.serviceId,config.templateId,form);if(out)out.textContent='Message sent successfully.';form.reset();window.setTimeout(hide,900)}
   catch(error){console.error('[Digital Lab] EmailJS submission failed',error);if(out)out.textContent='Couldn’t send it. Please try again or use the direct email link.'}
  }else{
   const data=new FormData(form),subject=encodeURIComponent(data.get('subject')||'Portfolio message'),body=encodeURIComponent(`Name: ${data.get('name')||''}\nEmail: ${data.get('email')||''}\n\n${data.get('message')||''}`);window.location.href=`mailto:kandelprabin09@gmail.com?subject=${subject}&body=${body}`;if(out)out.textContent='Opening your email client…';
  }
  if(button){button.disabled=false;button.innerHTML=original}
 });
}
