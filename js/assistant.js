import {$} from './utils.js';
const answers=[
 [/who|prabin|about/i,'Prabin Kandel is a builder from Pokhara, Nepal focused on interfaces, software projects and interactive browser experiments.'],
 [/education|study|school|gpa|see|ble/i,'The academic archive includes Shree Shitaladevi Community Secondary School for +2 Computer Science, Shree Siddha Baraha Secondary School for Grades 7–10 with SEE GPA 3.79 and BLE GPA 3.48, and Shree Janakalyan English Boarding School for Nursery–Grade 6.'],
 [/skill|html|css|javascript|capabil/i,'The lab focuses on frontend development, UI and interaction, JavaScript, software projects, problem solving and project architecture.'],
 [/win|award|vector|achievement|quiz/i,'The featured record is VECTOR 2082: 3rd National Technical Festival, Open Project Demonstration, winner in the +2 category. Other supplied recognition includes the Lions Club Inter-School Quiz Contest and ANNFSU academic quiz recognition.'],
 [/prometheus|fire|environment/i,'Prometheus X is a private software platform for fire monitoring and environmental data. It organizes supported external measurements such as temperature, humidity, soil moisture, wind-related readings, smoke/air-quality-related readings and GPS/location into a monitoring experience.'],
 [/hire|nepal|job|recruit/i,'Hire-Nepal is a recruitment/job-platform prototype focused on the interface and workflow around job discovery, employer workflows and applications.'],
 [/game|experiment|lab|play/i,'The Interactive Lab contains 30 browser games spanning logic, memory, words, speed, numbers, visual recognition and strategy. Personal bests are local where implemented.']
];
export function initAssistant(){
 const a=$('#assistant'),open=$('#assistant-launcher'),close=$('#assistant-close'),form=$('#assistant-form'),input=$('#assistant-input'),messages=$('#assistant-messages');if(!a||!messages)return;
 const show=()=>{a.classList.add('open');a.setAttribute('aria-hidden','false');input?.focus()};const hide=()=>{a.classList.remove('open');a.setAttribute('aria-hidden','true');open?.focus()};
 open?.addEventListener('click',show);close?.addEventListener('click',hide);document.querySelectorAll('.assistant-prompts button').forEach(b=>b.addEventListener('click',()=>ask(b.dataset.query)));
 function ask(q){messages.insertAdjacentHTML('beforeend',`<div class="user">${q.replace(/[<>]/g,'')}</div>`);const match=answers.find(([r])=>r.test(q));messages.insertAdjacentHTML('beforeend',`<div class="bot">${match?match[1]:'I only know the portfolio archive. Try asking about the work, Prometheus X, Hire-Nepal, skills, recognition, education or the lab.'}</div>`);messages.scrollTop=messages.scrollHeight}
 form?.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(q){ask(q);input.value=''}});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&a.classList.contains('open'))hide()});
}
