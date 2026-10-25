/* Shared build/browser data validation and pure scoring. No lesson code is executed. */
((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PracticeContract=api;})(typeof globalThis==='object'?globalThis:this,()=>{
  'use strict';
  const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const id=v=>typeof v==='string'&&v.length<=160&&/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(v);
  const check=(ok,message)=>{if(!ok)throw Error('Practice: '+message)};
  const text=(v,max=3000)=>typeof v==='string'&&v.trim().length>0&&v.length<=max&&!/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(v);
  function keys(v,allowed){check(object(v)&&Object.keys(v).every(k=>allowed.includes(k)),'unknown field/object')}
  function validate(data){
    keys(data,['version','revision','lesson','title','questions']);
    check(data.version===1&&Number.isInteger(data.revision)&&data.revision>0&&data.revision<=1000000&&id(data.lesson)&&text(data.title,200),'version/revision/lesson/title');
    check(Array.isArray(data.questions)&&data.questions.length>0&&data.questions.length<=50,'questions');
    const ids=new Set();
    for(const q of data.questions){
      keys(q,['id','type','prompt','reference','choices','answer','absoluteTolerance','relativeTolerance','explanation','rubric']);
      check(id(q.id)&&!ids.has(q.id)&&['choice','numeric','self'].includes(q.type)&&text(q.prompt)&&id(q.reference)&&text(q.explanation,6000),'question identity/content');ids.add(q.id);
      if(q.type==='choice'){
        check(Array.isArray(q.choices)&&q.choices.length>=2&&q.choices.length<=8,'choices');const choices=new Set();
        for(const c of q.choices){keys(c,['id','text']);check(id(c.id)&&!choices.has(c.id)&&text(c.text,1200),'choice identity/text');choices.add(c.id)}
        check(choices.has(q.answer)&&q.absoluteTolerance===undefined&&q.relativeTolerance===undefined&&q.rubric===undefined,'choice answer');
      }else if(q.type==='numeric'){
        check(Number.isFinite(q.answer)&&Math.abs(q.answer)<=1e12&&Number.isFinite(q.absoluteTolerance)&&q.absoluteTolerance>=0&&q.absoluteTolerance<=1e6&&Number.isFinite(q.relativeTolerance)&&q.relativeTolerance>=0&&q.relativeTolerance<=.1&&q.choices===undefined&&q.rubric===undefined,'numeric answer/tolerance');
      }else check(q.answer===undefined&&q.choices===undefined&&q.absoluteTolerance===undefined&&q.relativeTolerance===undefined&&Array.isArray(q.rubric)&&q.rubric.length>0&&q.rubric.length<=10&&q.rubric.every(v=>text(v,1000)),'self-assessment rubric');
    }
    return data;
  }
  function number(raw){
    if(typeof raw!=='string'||raw.length>80||!/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[-+]?\d+)?$/i.test(raw.trim()))return null;
    const value=Number(raw);return Number.isFinite(value)&&Math.abs(value)<=1e12&&!(value===0&&/[1-9]/.test(raw.trim().split(/e/i)[0]))?value:null;
  }
  function grade(q,raw){
    if(q.type==='self')return null;
    if(q.type==='choice')return q.choices.some(c=>c.id===raw)?raw===q.answer:null;
    const value=number(raw);if(value===null)return null;
    const tolerance=q.absoluteTolerance+q.relativeTolerance*Math.abs(q.answer);
    if(tolerance===0)return value===q.answer;
    return Math.abs(value-q.answer)<=tolerance+Number.EPSILON*Math.max(Math.abs(value),Math.abs(q.answer),tolerance)*4;
  }
  function responses(data,input){
    const result={};if(!object(input))return result;
    for(const q of data.questions){
      const r=input[q.id];if(!object(r))continue;
      const draft=typeof r.draft==='string'&&r.draft.length<=(q.type==='self'?3000:q.type==='choice'?160:80)?r.draft:'';
      const submitted=r.submitted===true&&(q.type==='self'||grade(q,draft)!==null);
      result[q.id]={draft,submitted,rating:q.type==='self'&&submitted&&['understood','revisit'].includes(r.rating)?r.rating:null};
    }
    return result;
  }
  function summary(data,answers){
    let correct=0,incorrect=0,unanswered=0,self=0;
    for(const q of data.questions){const r=answers[q.id];if(q.type==='self'){if(r?.submitted)self++;continue}if(!r?.submitted||grade(q,r.draft)===null)unanswered++;else if(grade(q,r.draft))correct++;else incorrect++}
    return {correct,incorrect,unanswered,self,total:correct+incorrect+unanswered};
  }
  function clean(data,input){
    const fresh={version:1,revision:data.revision,current:data.questions[0].id,review:[],responses:{},attempts:[],recorded:false};
    if(!object(input)||input.version!==1||input.revision!==data.revision)return fresh;
    const ids=data.questions.map(q=>q.id),review=Array.isArray(input.review)?[...new Set(input.review.filter(v=>data.questions.some(q=>q.id===v&&q.type!=='self')))]:[];
    const answers=responses(data,input.responses),attempts=[];
    if(Array.isArray(input.attempts))for(const a of input.attempts.slice(-10)){
      if(!object(a)||!Number.isSafeInteger(a.at)||a.at<0||a.at>8640000000000000)continue;
      const r=responses(data,a.responses);if(summary(data,r).unanswered===0)attempts.push({at:a.at,responses:r});
    }
    const current=ids.includes(input.current)?input.current:ids[0];
    return {...fresh,current:review.length&&!review.includes(current)?review[0]:current,review,responses:answers,attempts,recorded:input.recorded===true&&summary(data,answers).unanswered===0&&attempts.length>0&&JSON.stringify(attempts.at(-1).responses)===JSON.stringify(answers)};
  }
  return {validate,number,grade,responses,summary,clean};
});
