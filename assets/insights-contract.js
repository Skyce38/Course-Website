/* Read-only observations, not a mastery model. Existing contracts own validation/grading. */
((root,factory)=>{if(typeof module==='object'&&module.exports)module.exports=factory(require('./practice-contract.js'),require('./exam-contract.js'));else root.InsightsContract=factory(root.PracticeContract,root.ExamContract)})(globalThis,(C,E)=>{
 'use strict';
 const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
 const prefix={practice:'skyce-learning-practice-v1:',config:'skyce-learning-exam-config-v1:',run:'skyce-learning-exam-v1:',history:'skyce-learning-exam-config-history-v1:'};
 function reader(getItem){
  const cache=new Map();
  return key=>{let raw;try{raw=getItem(key)}catch{return {kind:'denied'}}
   if(raw===null||raw===undefined){cache.delete(key);return {kind:'missing'}}
   if(cache.get(key)?.raw===raw)return cache.get(key).result;
   let result;try{if(typeof raw!=='string'||raw.length>2000000)throw Error();result={kind:'ok',value:JSON.parse(raw)}}catch{result={kind:'invalid'}}
   cache.set(key,{raw,result});if(cache.size>512)cache.delete(cache.keys().next().value);return result;
  };
 }
 function validate(manifest){
  if(!object(manifest)||manifest.version!==1||!Array.isArray(manifest.lessons))throw Error('Insights manifest');
  const ids=new Set();for(const l of manifest.lessons){
   E.validate(l.bank);if(!['artificial-intelligence','oop-python'].includes(l.course)||l.id!==l.bank.data.lesson||ids.has(l.id)||typeof l.title!=='string'||!l.title.length||l.title.length>300||!new RegExp('^read/'+l.course+'/[a-z0-9-]+\\.html$').test(l.reader)||l.id!==l.course+'-'+l.reader.split('/').at(-1).replace(/\.html$/,''))throw Error('Insights lesson');ids.add(l.id);
   if(!Array.isArray(l.practiceIds)||new Set(l.practiceIds).size!==l.practiceIds.length||!l.practiceIds.length||!l.practiceIds.every(id=>l.bank.data.questions.some(q=>q.id===id)))throw Error('Insights practice IDs');
   C.validate({...l.bank.data,revision:l.practiceRevision,questions:l.bank.data.questions.filter(q=>l.practiceIds.includes(q.id))});
  }return manifest;
 }
 function create(manifest,read){
  validate(manifest);
  const summaries=new WeakMap();
  function refresh(){
   const result={records:[],excluded:{invalid:0,incomplete:0,incompatible:0,archived:0,duplicate:0},denied:false},exclude=kind=>result.excluded[kind]++;
   function get(key){const r=read(key);if(r.kind==='denied')result.denied=true;else if(r.kind==='invalid'||r.kind==='ok'&&!object(r.value))exclude('invalid');return r.kind==='ok'&&object(r.value)?r.value:null}
   function responses(data,value){
    if(!object(value)||Object.keys(value).some(id=>!data.questions.some(q=>q.id===id)))return null;
    for(const [id,r]of Object.entries(value)){const q=data.questions.find(q=>q.id===id);
     if(!object(r)||typeof r.draft!=='string'||r.draft.length>(q.type==='self'?3000:q.type==='choice'?160:80)||typeof r.submitted!=='boolean'||(r.rating!==null&&r.rating!==undefined&&!(q.type==='self'&&r.submitted&&['understood','revisit'].includes(r.rating)))||q.type!=='self'&&r.submitted&&C.grade(q,r.draft)===null)return null;
    }return C.responses(data,value);
   }
   function completed(data,input){
    const answers=responses(data,input);if(!answers){exclude('invalid');return null}
    if(C.summary(data,answers).unanswered){if(Object.keys(answers).length)exclude('incomplete');return null}
    if(!data.questions.some(q=>answers[q.id]?.submitted))return null;
    return answers;
   }
   const signature=(data,answers)=>JSON.stringify(data.questions.filter(q=>answers[q.id]?.submitted).map(q=>[q.id,answers[q.id].draft,answers[q.id].rating]));
   function run(lesson,data,key,mode){
    const value=get(key);if(value===null)return;
    if(!object(value)||value.version!==1||value.revision!==data.revision){exclude('incompatible');return}
    const saved=[],seen=new Set();
    if(value.attempts!==undefined&&!Array.isArray(value.attempts)){exclude('invalid');return}
    if(value.attempts?.length>10){exclude('invalid');return}
    for(const attempt of value.attempts||[]){
     if(!object(attempt)||!Number.isSafeInteger(attempt.at)||attempt.at<0||attempt.at>8640000000000000){exclude('invalid');continue}
     const answers=completed(data,attempt.responses);if(!answers)continue;const sig=signature(data,answers),identity=attempt.at+':'+sig;
     if(seen.has(identity)){exclude('duplicate');continue}seen.add(identity);saved.push(sig);result.records.push({source:key,lesson:lesson.id,course:lesson.course,mode,at:attempt.at,answers,data});
    }
    if(value.current!==undefined&&!data.questions.some(q=>q.id===value.current)){exclude('invalid');return}
    const answers=completed(data,value.responses??{});if(!answers)return;const sig=signature(data,answers);
    if(saved.at(-1)===sig){exclude('duplicate');return}
    result.records.push({source:key,lesson:lesson.id,course:lesson.course,mode,at:null,answers,data});
   }
   for(const l of manifest.lessons){
    const practice={...l.bank.data,revision:l.practiceRevision,questions:l.bank.data.questions.filter(q=>l.practiceIds.includes(q.id))};run(l,practice,prefix.practice+l.id,'practice');
    const configs=[get(prefix.config+l.id),...(l.bank.history||[]).map(old=>get(prefix.history+l.id+':r'+old.data.revision))],tokens=new Set();
    for(const config of configs){if(config===null)continue;if(!object(config)||config.version!==1||!E.forRevision(l.bank,config.revision)){exclude('incompatible');continue}
     if(!Array.isArray(config.sessions)||config.sessions.length>60){exclude('invalid');continue}
     for(const s of config.sessions){
      const revision=s?.revision??config.revision,context=E.forRevision(l.bank,revision);
      if(!context){exclude('incompatible');continue}
      if(!E.validSession(context,s)){exclude('invalid');continue}if(tokens.has(s.token))continue;tokens.add(s.token);
      if(revision!==l.bank.data.revision){exclude('archived');continue} // Never read or regrade archived responses.
      run(l,E.subset(context,s.ids),prefix.run+l.id+':'+s.token,s.mode);
     }
    }
   }return result;
  }
  function summarize(result,course='all'){
   if(summaries.get(result)?.has(course))return summaries.get(result).get(course);
   const lessons=manifest.lessons.filter(l=>course==='all'||l.course===course),topics=new Map(),practiced=new Set(),unique=new Set();let correct=0,incorrect=0,self=0,revisit=0;
   for(const l of lessons)for(const t of l.bank.topics)topics.set(l.id+':'+t.id,{lesson:l.id,course:l.course,reader:l.reader,lessonTitle:l.title,id:t.id,title:t.title,practice:t.ids.some(id=>l.practiceIds.includes(id)),correct:0,incorrect:0,self:0,revisit:0,unique:new Set()});
   const records=result.records.filter(r=>course==='all'||r.course===course);
   for(const r of records){practiced.add(r.lesson);for(const q of r.data.questions){const a=r.answers[q.id];if(!a?.submitted)continue;const topic=topics.get(r.lesson+':'+q.reference);if(!topic)continue;
    if(q.type==='self'){self++;topic.self++;if(a.rating==='revisit'){revisit++;topic.revisit++}continue}
    const ok=C.grade(q,a.draft);if(ok===null)continue;unique.add(r.lesson+':'+q.id);topic.unique.add(q.id);if(ok){correct++;topic.correct++}else{incorrect++;topic.incorrect++}
   }}
   const total=correct+incorrect;
   const summary={correct,incorrect,total,accuracy:total?correct/total:null,unique:unique.size,repeated:total-unique.size,self,revisit,practiced:practiced.size,available:lessons.length,records,
    topics:[...topics.values()].map(t=>({...t,unique:t.unique.size,total:t.correct+t.incorrect,accuracy:t.correct+t.incorrect?t.correct/(t.correct+t.incorrect):null,limited:t.unique.size<3||t.correct+t.incorrect<5}))};
   if(!summaries.has(result))summaries.set(result,new Map());summaries.get(result).set(course,summary);return summary;
  }
  return {refresh,summarize};
 }
 return {reader,validate,create,prefix};
});
