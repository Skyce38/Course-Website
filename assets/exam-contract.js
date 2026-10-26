/* Pure extended-bank/session rules; all grading remains in PracticeContract. */
((root,factory)=>{if(typeof module==='object'&&module.exports)module.exports=factory(require('./practice-contract.js'));else root.ExamContract=factory(root.PracticeContract)})(globalThis,C=>{
 'use strict';
 const check=(ok,msg)=>{if(!ok)throw Error('Exam: '+msg)},object=v=>v&&typeof v==='object'&&!Array.isArray(v);
 const token=v=>typeof v==='string'&&/^[a-z0-9-]{8,80}$/.test(v);
 function validate(bank){
  check(object(bank)&&Object.keys(bank).every(k=>['data','topics','difficulty','history'].includes(k)),'bank fields');C.validate(bank.data);
  check(Array.isArray(bank.topics)&&bank.topics.length>0&&bank.topics.length<=50&&object(bank.difficulty),'topics');const seen=new Set(),topics=new Set();
  for(const t of bank.topics){check(object(t)&&typeof t.id==='string'&&/^[a-z][a-z0-9-]*$/.test(t.id)&&!topics.has(t.id)&&typeof t.title==='string'&&t.title.length>0&&t.title.length<=300&&Array.isArray(t.ids)&&t.ids.length>0,'topic');topics.add(t.id);for(const id of t.ids){check(!seen.has(id)&&bank.data.questions.some(q=>q.id===id&&q.reference===t.id),'topic membership');seen.add(id)}}
  check(seen.size===bank.data.questions.length,'complete topic membership');
  for(const q of bank.data.questions)check(['easy','medium','hard','original'].includes(bank.difficulty[q.id]),'difficulty');
  if(bank.history!==undefined){check(Array.isArray(bank.history)&&bank.history.length<=5,'history');const revisions=new Set();for(const old of bank.history){check(object(old)&&old.history===undefined,'flat history');validate(old);check(old.data.lesson===bank.data.lesson&&old.data.revision<bank.data.revision&&!revisions.has(old.data.revision),'historical identity');revisions.add(old.data.revision)}}return bank;
 }
 function prepare(base,extra,headings){
  C.validate(base);check(object(extra)&&Object.keys(extra).every(k=>['version','revision','lesson','baseRevision','questions','history'].includes(k))&&extra.version===1&&extra.lesson===base.lesson&&extra.baseRevision===base.revision&&Number.isInteger(extra.revision)&&extra.revision>0&&extra.revision<=1000000,'extension identity');
  check(Array.isArray(extra.questions)&&extra.questions.length>0,'extension questions');const difficulty={},questions=[...base.questions];base.questions.forEach(q=>difficulty[q.id]='original');
  for(const item of extra.questions){const {difficulty:level,verification,...q}=item;check(['easy','medium','hard'].includes(level),'difficulty');check(object(verification)&&['source-review','python','rubric-review'].includes(verification.method)&&typeof verification.evidence==='string'&&verification.evidence.trim().length>15&&verification.evidence.length<=3000,'verification');if(verification.method==='python')check(typeof verification.oracle==='string'&&verification.oracle.length<=3000,'independent oracle');difficulty[q.id]=level;questions.push(q)}
  const data=C.validate({version:1,revision:extra.revision,lesson:base.lesson,title:base.title,questions}),topics=[];
  for(const q of questions){const heading=headings.find(h=>h.id===q.reference);check(heading,'real heading '+q.reference);let t=topics.find(t=>t.id===q.reference);if(!t){t={id:q.reference,title:heading.title,ids:[]};topics.push(t)}t.ids.push(q.id)}
  return validate({data,topics,difficulty,...(extra.history===undefined?{}:{history:extra.history})});
 }
 function choose(bank,mode,topic,count,random=Math.random){
  validate(bank);check(['topic','mock'].includes(mode),'mode');let ids;
  if(mode==='topic'){const t=bank.topics.find(t=>t.id===topic);check(t,'topic selection');ids=[...t.ids];check(count==='full','topic count')}
  else {check(topic==='all','mock topic');ids=bank.data.questions.map(q=>q.id);check(count==='full'||[10,20,30].includes(count)&&count<=ids.length,'mock count');for(let i=ids.length-1;i>0;i--){const v=random();check(Number.isFinite(v)&&v>=0&&v<1,'random');const j=Math.floor(v*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]]}if(count!=='full')ids=ids.slice(0,count)}
  return ids;
 }
 function validSession(bank,s){
  if(!object(s)||!token(s.token)||!['topic','mock'].includes(s.mode)||!Array.isArray(s.ids)||new Set(s.ids).size!==s.ids.length)return false;
  try{const expected=choose(bank,s.mode,s.topic,s.count,()=>0);return s.ids.length===expected.length&&s.ids.every(id=>expected.includes(id)||(s.mode==='mock'&&bank.data.questions.some(q=>q.id===id)))}catch{return false}
 }
 function forRevision(bank,revision){return bank.data.revision===revision?bank:bank.history?.find(old=>old.data.revision===revision)||null}
 function sessionBank(bank,session){return forRevision(bank,session.revision??bank.data.revision)}
 function clean(bank,input){
  const fresh={version:1,revision:bank.data.revision,current:null,sessions:[]};
  if(!object(input)||input.version!==1||!forRevision(bank,input.revision))return fresh;
  const sessions=[],seen=new Set();if(Array.isArray(input.sessions))for(const s of input.sessions.slice(-60)){
   if(!object(s))continue;const revision=s.revision??input.revision,context=forRevision(bank,revision);
   if(context&&validSession(context,s)&&!seen.has(s.token)){seen.add(s.token);sessions.push({token:s.token,mode:s.mode,topic:s.topic,count:s.count,ids:[...s.ids],...(revision===bank.data.revision?{}:{revision})})}
  }
  // Retain up to ten runs per revision; corrected banks never reinterpret old IDs.
  const kept=sessions.filter((s,i)=>sessions.slice(i+1).filter(t=>(t.revision??bank.data.revision)===(s.revision??bank.data.revision)).length<10);
  return {...fresh,sessions:kept,current:kept.some(s=>s.token===input.current)?input.current:kept.at(-1)?.token||null};
 }
 function subset(bank,ids){check(Array.isArray(ids)&&ids.length&&new Set(ids).size===ids.length,'subset');return C.validate({...bank.data,questions:ids.map(id=>{const q=bank.data.questions.find(q=>q.id===id);check(q,'question identity');return q})})}
 return {validate,prepare,choose,validSession,forRevision,sessionBank,clean,subset};
});
