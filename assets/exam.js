/* Session selection only: shared PracticeContract/StudyPractice own answers and scoring. */
(() => {
 'use strict';
 const E=window.ExamContract;
 const tx=k=>{const key='exam'+k[0].toUpperCase()+k.slice(1);return LearningI18n.t(key)},node=(tag,cls)=>{const n=document.createElement(tag);if(cls)n.className=cls;return n};
 document.querySelectorAll('.exam-mode').forEach(root=>{
  let bank;try{bank=E.validate(JSON.parse(root.querySelector('.exam-data').textContent))}catch{return}
  const key='skyce-learning-exam-config-v1:'+bank.data.lesson,runPrefix='skyce-learning-exam-v1:'+bank.data.lesson+':';
  let config=E.clean(bank,null),persistent=true,locked=false,stale=false,notice='',mounted,lastRaw=null;
  function newer(v){return v&&(v.version>1||v.version===1&&v.revision>bank.data.revision)}
  let raw;try{raw=localStorage.getItem(key);lastRaw=raw}catch{persistent=false;notice='unavailable'}
  if(raw)try{const parsed=JSON.parse(raw);locked=newer(parsed);config=E.clean(bank,parsed);if(locked)notice='newer';else if(!parsed||parsed.version!==1||parsed.revision!==bank.data.revision||config.sessions.length!==parsed.sessions?.length||!config.current)notice='recovered'}catch{notice='recovered'}
  const ui=node('div','exam-controls'),help=node('p','practice-note'),modeLabel=node('label'),mode=node('select'),topicLabel=node('label'),topic=node('select'),countLabel=node('label'),count=node('select'),start=node('button','icon-button'),pastLabel=node('label'),past=node('select'),status=node('p','exam-status'),active=node('p','practice-note'),host=node('div','exam-host');
  status.setAttribute('role','status');status.setAttribute('aria-live','polite');start.type='button';
  for(const [label,input,name]of [[modeLabel,mode,'mode'],[topicLabel,topic,'topic'],[countLabel,count,'count'],[pastLabel,past,'sessions']]){input.id='exam-select-'+name;label.htmlFor=input.id;const wrap=node('div','exam-field');wrap.append(label,input);ui.append(wrap)}
  const add=(select,value)=>{const o=node('option');o.value=String(value);select.append(o);return o};
  const modes=[add(mode,'topic'),add(mode,'mock')];for(const topicData of bank.topics){const o=add(topic,topicData.id);o.textContent=topicData.title;o.lang='th'}
  topic.value=(bank.topics.find(t=>!['practice','sources','summary'].includes(t.id))||bank.topics[0]).id;
  for(const size of [10,20,30])if(size<=bank.data.questions.length)add(count,size).textContent=String(size);add(count,'full');
  root.append(help,ui,start,status,active,host);root.querySelector('.exam-fallback').hidden=true;
  function writeConfig(){
   if(locked||stale)return;try{const live=localStorage.getItem(key);let old;try{old=JSON.parse(live||'null')}catch{}if(newer(old)){locked=true;notice='newer';return}if(live!==lastRaw){stale=true;notice='other';return}const value=JSON.stringify(config);localStorage.setItem(key,value);lastRaw=value}catch{persistent=false;notice='unavailable'}
  }
  function options(){const selected=past.value;past.replaceChildren();for(const [i,s]of config.sessions.entries()){const o=add(past,s.token);o.textContent=(i+1)+' · '+tx(s.mode==='topic'?'topicMode':'mockMode')+' · '+s.ids.length+(s.mode==='topic'?' · '+bank.topics.find(t=>t.id===s.topic).title:'')}past.value=config.current||selected;past.disabled=!config.sessions.length;past.setAttribute('aria-disabled',String(locked||stale))}
  function render(){
   root.querySelector('[data-i18n=examTitle]').textContent=tx('title');help.textContent=tx('help');modeLabel.textContent=tx('mode');topicLabel.textContent=tx('topic');countLabel.textContent=tx('count');pastLabel.textContent=tx('sessions');start.textContent=tx('start');start.setAttribute('aria-disabled',String(locked||stale));
   modes[0].textContent=tx('topicMode');modes[1].textContent=tx('mockMode');count.querySelector('[value=full]').textContent=tx('full');topic.disabled=mode.value!=='topic';count.disabled=mode.value==='topic';topicLabel.parentElement.hidden=topic.disabled;countLabel.parentElement.hidden=count.disabled;pastLabel.parentElement.hidden=config.sessions.length<2;
   status.textContent=notice?tx(notice):!persistent?tx('unavailable'):!config.current?tx('empty'):'';status.hidden=!status.textContent;
   const s=config.sessions.find(s=>s.token===config.current);active.textContent=s?tx('active')+': '+tx(s.mode==='topic'?'topicMode':'mockMode')+' · '+s.ids.length:'';active.hidden=!s;options();
  }
  function open(){
   mounted?.destroy();host.replaceChildren();const s=config.sessions.find(s=>s.token===config.current);if(!s)return;
   mode.value=s.mode;if(s.mode==='topic')topic.value=s.topic;else count.value=String(s.count);
   const run=node('div','practice-mode exam-run');host.append(run);mounted=StudyPractice.mount(run,E.subset(bank,s.ids),{storageKey:runPrefix+s.token,idPrefix:'exam-',questionLabel:q=>bank.difficulty[q.id]==='original'?tx('original'):tx('difficulty')+': '+tx(bank.difficulty[q.id])});
  }
  start.onclick=()=>{
   if(locked||stale)return;
   const selectionMode=mode.value,selectedTopic=selectionMode==='topic'?topic.value:'all',selectedCount=selectionMode==='topic'?'full':count.value==='full'?'full':Number(count.value);
   const bytes=new Uint32Array(4);crypto.getRandomValues(bytes);const token=Array.from(bytes,n=>n.toString(36)).join('-');
   const s={token,mode:selectionMode,topic:selectedTopic,count:selectedCount,ids:E.choose(bank,selectionMode,selectedTopic,selectedCount)};
   const before=config,removed=config.sessions.length===10?config.sessions[0]:null;config={...config,sessions:[...config.sessions,s].slice(-10),current:token};notice='';writeConfig();
   if(locked||stale){config=before;render();return}
   if(removed&&persistent&&!locked)try{localStorage.removeItem(runPrefix+removed.token)}catch{persistent=false}
   open();render();
  };
  past.onchange=()=>{if(locked||stale){render();return}if(!config.sessions.some(s=>s.token===past.value))return;const previous=config.current;config.current=past.value;writeConfig();if(locked||stale)config.current=previous;else open();render()};mode.onchange=render;
  window.addEventListener('storage',event=>{if(event.key===key||event.key===null){let value;try{value=JSON.parse(event.newValue)}catch{}if(newer(value)){locked=true;notice='newer'}else{stale=true;notice='other'}render()}});
  document.addEventListener('preferenceschange',render);open();render();
 });
})();
