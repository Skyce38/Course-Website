/* Progressive, local-only practice; controls are mounted once to preserve keyboard focus. */
(() => {
  'use strict';
  const C=window.PracticeContract,t=(key,values)=>LearningI18n.t(key,values);
  const text=(node,value)=>{if(node.textContent!==value)node.textContent=value};
  const el=(tag,cls)=>{const node=document.createElement(tag);if(cls)node.className=cls;return node};
  function mount(root,provided,options={}){
    if(root.dataset.practiceReady)return;
    let data;try{data=C.validate(provided||JSON.parse(root.querySelector('.practice-data').textContent))}catch{return}
    const key=options.storageKey||'skyce-learning-practice-v1:'+data.lesson,events=new AbortController();
    let persistent=true,notice='',invalid='',state;
    function read(raw){
      if(raw===null)return C.clean(data,null);
      try{const value=JSON.parse(raw);if(value?.version!==1||value?.revision!==data.revision)notice='practiceUpdated';return C.clean(data,value)}
      catch{notice='practiceRecovered';return C.clean(data,null)}
    }
    try{state=read(localStorage.getItem(key))}catch{persistent=false;state=C.clean(data,null)}
    function save(){
      try{
        const existing=localStorage.getItem(key);let old;try{old=JSON.parse(existing)}catch{}
        if((Number.isSafeInteger(old?.version)&&old.version>1)||(old?.version===1&&Number.isSafeInteger(old.revision)&&old.revision>data.revision)){notice='practiceUpdated';persistent=false;return}
        localStorage.setItem(key,JSON.stringify(state));
      }catch{persistent=false}
    }
    const ui=el('div','practice-session'),position=el('p','practice-position'),select=el('select'),score=el('p','practice-score'),selfCount=el('p','practice-note'),warning=el('p','practice-warning'),message=el('p','practice-message');
    position.setAttribute('role','status');position.setAttribute('aria-live','polite');
    warning.setAttribute('role','status');message.setAttribute('role','status');message.setAttribute('aria-live','polite');
    const controls=el('div','practice-navigation'),positionTrack=el('progress','practice-position-track');controls.append(position,select);
    position.id=(options.idPrefix||'quiz-')+data.lesson+'-position';positionTrack.setAttribute('aria-labelledby',position.id);
    const form=el('form');form.noValidate=true;
    const views=new Map();
    for(const [index,q]of data.questions.entries()){
      const option=el('option');option.value=q.id;option.textContent=String(index+1);select.append(option);
      const fieldset=el('fieldset'),legend=el('legend'),feedback=el('div','practice-feedback'),result=el('strong'),answer=el('p'),explanation=el('p'),reference=el('a','practice-reference'),inputs=[];
      fieldset.dataset.question=q.id;legend.lang='th';legend.textContent=q.prompt;fieldset.append(legend);
      const level=options.questionLabel?el('p','practice-note'):null;if(level)fieldset.append(level);
      const prefix=(options.idPrefix||'quiz-')+data.lesson+'-'+q.id;feedback.id=prefix+'-feedback';feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
      function edit(value){state.responses[q.id]={draft:value,submitted:false,rating:null};state.recorded=false;invalid='';notice='';save();render()}
      if(q.type==='choice')for(const choice of q.choices){
        const label=el('label','practice-option'),input=el('input'),span=el('span');input.type='radio';input.name=prefix;input.value=choice.id;input.addEventListener('change',()=>edit(choice.id));span.lang='th';span.textContent=choice.text;label.append(input,span);fieldset.append(label);inputs.push(input);
      }else{
        const label=el('label'),input=el(q.type==='numeric'?'input':'textarea'),hint=el('p','practice-note');
        label.htmlFor=prefix;input.id=prefix;input.maxLength=q.type==='numeric'?80:3000;
        if(q.type==='numeric'){input.type='text';input.inputMode='decimal'}else input.rows=5;
        hint.id=prefix+'-hint';input.setAttribute('aria-describedby',hint.id+' '+feedback.id);input.addEventListener('input',()=>edit(input.value));fieldset.append(label,input,hint);inputs.push(input);
        views.set(q.id,{label,hint});
      }
      explanation.lang='th';explanation.textContent=q.explanation;feedback.append(result,answer,explanation);
      const ratings=[];
      if(q.type==='self'){
        const rubric=el('ul');rubric.lang='th';for(const item of q.rubric){const li=el('li');li.textContent=item;rubric.append(li)}feedback.append(rubric);
        for(const rating of ['understood','revisit']){const button=el('button','icon-button');button.type='button';button.dataset.rating=rating;button.onclick=()=>{state.responses[q.id].rating=rating;state.recorded=false;notice='';save();render()};ratings.push(button);feedback.append(button)}
      }
      reference.href='#'+q.reference;fieldset.append(feedback,reference);form.append(fieldset);
      views.set(q.id,{...views.get(q.id),fieldset,feedback,result,answer,reference,inputs,ratings,option,level});
    }
    const actions=el('div','practice-actions'),submit=el('button','icon-button'),retry=el('button','icon-button');submit.type='submit';retry.type='button';actions.append(submit,retry);form.append(actions);
    const navigation=el('div','practice-actions'),previous=el('button','icon-button'),next=el('button','icon-button'),review=el('button','icon-button'),finish=el('button','icon-button'),restart=el('button','icon-button');
    for(const button of [previous,next,review,finish,restart]){button.type='button';navigation.append(button)}
    const history=el('details','practice-history'),historyTitle=el('summary'),historyList=el('ol');history.append(historyTitle,historyList);
    ui.append(controls,positionTrack,score,selfCount,warning,message,form,navigation,history);root.append(ui);
    const current=()=>data.questions.find(q=>q.id===state.current),sequence=()=>state.review.length?state.review:data.questions.map(q=>q.id);
    function render(){
      const q=current(),available=sequence(),index=available.indexOf(q.id),totals=C.summary(data,state.responses);
      text(position,t('practicePosition',{current:index+1,total:available.length}));select.value=q.id;select.setAttribute('aria-label',t('practiceSelect'));
      positionTrack.max=available.length;positionTrack.value=index+1;positionTrack.setAttribute('aria-valuetext',position.textContent);
      text(score,t('practiceScore',totals));text(selfCount,t('practiceSelfCount',{count:totals.self}));text(warning,persistent?'':t('practiceStorageUnavailable'));warning.hidden=persistent;
      text(message,notice?t(notice):'');message.hidden=!notice;
      for(const item of data.questions){
        const v=views.get(item.id),r=state.responses[item.id]||{draft:'',submitted:false,rating:null};
        if(v.level)text(v.level,options.questionLabel(item));
        v.fieldset.hidden=item.id!==q.id;v.fieldset.disabled=item.id!==q.id;v.option.disabled=!available.includes(item.id);
        for(const input of v.inputs){if(item.type==='choice')input.checked=input.value===r.draft;else if(input.value!==r.draft)input.value=r.draft;input.setAttribute('aria-invalid',String(invalid===item.id))}
        if(v.label){text(v.label,t(item.type==='numeric'?'practiceNumeric':'practiceSelfResponse'));text(v.hint,item.type==='self'?t('practiceSelfHelp'):t('practiceNumericHelp')+' '+t(item.absoluteTolerance||item.relativeTolerance?'practiceTolerance':'practiceExact',{absolute:item.absoluteTolerance,relative:item.relativeTolerance}))}
        v.feedback.hidden=!r.submitted&&invalid!==item.id;
        const correct=C.grade(item,r.draft);v.feedback.dataset.result=invalid===item.id?'invalid':item.type==='self'?'self':correct?'correct':'incorrect';
        text(v.result,t(invalid===item.id?'practiceInvalid':item.type==='self'?'practiceSelfHelp':correct?'practiceCorrect':'practiceIncorrect'));
        v.answer.hidden=item.type==='self'||invalid===item.id;const expected=item.type==='choice'?item.choices.find(c=>c.id===item.answer).text:item.answer;
        if(item.type!=='self')text(v.answer,t('practiceAnswer',{answer:expected}));
        v.feedback.querySelector('p[lang=th]').hidden=invalid===item.id;
        for(const button of v.ratings){text(button,t(button.dataset.rating==='understood'?'practiceUnderstood':'practiceRevisit'));button.setAttribute('aria-pressed',String(r.rating===button.dataset.rating))}
        text(v.reference,t('practiceReference'));
      }
      text(submit,t(q.type==='self'?'practiceShow':'practiceCheck'));submit.setAttribute('aria-controls',views.get(q.id).feedback.id);
      text(retry,t('practiceRetry'));text(previous,t('practicePrev'));text(next,t('practiceNext'));previous.setAttribute('aria-disabled',String(index===0));next.setAttribute('aria-disabled',String(index===available.length-1));
      text(review,t(state.review.length?'practiceAll':'practiceReview'));review.setAttribute('aria-pressed',String(state.review.length>0));review.setAttribute('aria-disabled',String(!state.review.length&&!totals.incorrect));
      text(finish,t(state.recorded?'practiceRecorded':'practiceSave'));finish.setAttribute('aria-disabled',String(!!totals.unanswered||state.recorded));text(restart,t('practiceRetryAll'));
      text(historyTitle,t('practiceAttempts'));historyList.replaceChildren();
      for(const [i,a]of state.attempts.entries()){const li=el('li');li.textContent=t('practicePast',{number:i+1,...C.summary(data,a.responses)})+' · '+new Date(a.at).toLocaleString(LearningPreferences.value.language==='th'?'th-TH':'en-GB');historyList.append(li)}
      if(!state.attempts.length){const li=el('li');li.textContent=t('practiceNoHistory');historyList.append(li)}
    }
    form.addEventListener('submit',event=>{
      event.preventDefault();const q=current(),r=state.responses[q.id]||{draft:'',submitted:false,rating:null};
      if(q.type!=='self'&&C.grade(q,r.draft)===null){invalid=q.id;render();return}
      r.submitted=true;state.responses[q.id]=r;invalid='';notice='';save();render();
    });
    retry.onclick=()=>{delete state.responses[state.current];state.recorded=false;invalid='';notice='';save();render()};
    function move(id){if(!sequence().includes(id))return;state.current=id;invalid='';notice='';save();render()}
    select.onchange=()=>move(select.value);
    previous.onclick=()=>{const ids=sequence(),i=ids.indexOf(state.current);if(i>0)move(ids[i-1])};next.onclick=()=>{const ids=sequence(),i=ids.indexOf(state.current);if(i<ids.length-1)move(ids[i+1])};
    review.onclick=()=>{
      if(state.review.length)state.review=[];
      else{state.review=data.questions.filter(q=>q.type!=='self'&&state.responses[q.id]?.submitted&&C.grade(q,state.responses[q.id].draft)===false).map(q=>q.id);if(!state.review.length)return;state.current=state.review[0]}
      invalid='';notice='';save();render();
    };
    finish.onclick=()=>{
      if(state.recorded)return;if(C.summary(data,state.responses).unanswered){notice='practiceNeedAnswers';render();return}
      state.attempts.push({at:Date.now(),responses:JSON.parse(JSON.stringify(state.responses))});state.attempts=state.attempts.slice(-10);state.recorded=true;notice='practiceRecorded';save();render();
    };
    restart.onclick=()=>{state={...C.clean(data,null),attempts:state.attempts};invalid='';notice='';save();render()};
    window.addEventListener('storage',event=>{
      if(event.key!==key&&event.key!==null)return;
      notice='';
      const incoming=read(event.newValue),active=document.activeElement;
      if(root.contains(active)){
        incoming.current=state.current;incoming.review=state.review;
        if(active.matches('input,textarea,[data-rating]')){if(state.responses[state.current])incoming.responses[state.current]=state.responses[state.current];else delete incoming.responses[state.current];incoming.recorded=false}
      }
      state=incoming;invalid='';notice=notice||'practiceOtherTab';render();
    },{signal:events.signal});
    document.addEventListener('preferenceschange',render,{signal:events.signal});
    root.dataset.practiceReady='true';if(root.querySelector('.practice-fallback'))root.querySelector('.practice-fallback').hidden=true;render();
    return {destroy(){events.abort();ui.remove();delete root.dataset.practiceReady}};
  }
  window.StudyPractice={mount};
  document.querySelectorAll('.practice-mode:not(.exam-mode)').forEach(root=>mount(root));
})();
