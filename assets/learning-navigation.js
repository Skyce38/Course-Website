/* Presentation of explicit paths only; all progress/history/resume remains owned by LearningStudy. */
(() => {
  'use strict';
  const app=new URL('../',document.currentScript.src),study=window.LearningStudy;
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const t=(key,values)=>LearningI18n.t(key,values);
  const label=key=>'<span data-i18n="'+key+'">'+esc(t(key))+'</span>';
  const href=lesson=>study.resumeLink(lesson,new URL(lesson.reader,app).href);
  const lessonLink=(lesson,key)=>'<a class="icon-button" data-study-open="'+esc(lesson.id)+'" href="'+esc(href(lesson))+'" data-document-title="'+esc(lesson.title)+'" data-i18n-aria-label="'+key+'Label" aria-label="'+esc(t(key+'Label',{title:lesson.title}))+'">'+label(key)+'<span class="learning-link-title">'+esc(lesson.title)+'</span></a>';
  let paths=[];
  function draw() {
    document.querySelectorAll('[data-learning-course],[data-learning-continue]').forEach(host=>{
      const global=host.hasAttribute('data-learning-continue'),path=paths.find(item=>item.course===host.dataset.learningCourse);
      if(!global&&!path){host.hidden=true;return;}
      const available=global?paths:[path],next=LearningPaths.continuing(available,study),current=host.dataset.learningCurrent||'';
      const key=JSON.stringify([available.map(item=>[item.course,item.lessons.map(lesson=>[lesson.id,study.isCompleted(lesson.id),lesson.title,href(lesson)])]),current,next?.id]);
      if(host.dataset.learningKey===key)return;
      host.dataset.learningKey=key;host.hidden=global&&!next;
      let html='<div class="learning-path-heading"><h2>'+label(global?'continueLearning':'learningPath')+'</h2>';
      if(!global){const progress=study.progress(path.lessons);html+='<p data-i18n="learningPathProgress" data-completed="'+progress.completed+'" data-total="'+progress.total+'">'+esc(t('learningPathProgress',progress))+'</p><progress max="'+(progress.total||1)+'" value="'+progress.completed+'" data-i18n-aria-label="learningPathProgress" data-completed="'+progress.completed+'" data-total="'+progress.total+'" aria-label="'+esc(t('learningPathProgress',progress))+'"></progress>';}
      html+='</div>';
      if(!global)html+=path.lessons.length?'<ol class="learning-path-list">'+path.lessons.map(lesson=>'<li'+(lesson.id===current?' class="is-current"':'')+'><a data-study-open="'+esc(lesson.id)+'" href="'+esc(href(lesson))+'"'+(lesson.id===current?' aria-current="page"':'')+'>'+esc(lesson.title)+'</a><span class="learning-path-status">'+(lesson.id===current?label('currentLesson')+' · ':'')+label(study.isCompleted(lesson.id)?'documentCompleted':'lessonIncomplete')+'</span></li>').join('')+'</ol>':'<p>'+label('learningPathEmpty')+'</p>';
      if(current&&path){const {index,previous,next}=LearningPaths.neighbors(path,current);if(index>=0)html+='<nav class="learning-path-neighbors" data-i18n-aria-label="lessonNavigation" aria-label="'+esc(t('lessonNavigation'))+'">'+(previous?lessonLink(previous,'previousLesson'):'<span class="learning-boundary" aria-disabled="true">'+label('previousLesson')+'</span>')+(next?lessonLink(next,'nextLesson'):'<span class="learning-boundary" aria-disabled="true">'+label('nextLesson')+'</span>')+'</nav>';}
      html+=next?'<div class="learning-continue">'+lessonLink(next,'continueLearning')+'</div>':!global&&path.lessons.length?'<p>'+label('learningPathComplete')+'</p>':'';
      host.innerHTML=html;host.classList.add('learning-path');host.setAttribute('role','region');host.setAttribute('data-i18n-aria-label',global?'continueLearning':'learningPath');host.setAttribute('aria-label',t(global?'continueLearning':'learningPath'));
    });
    LearningI18n.apply();
  }
  async function start() {
    try {
      const [response]=await Promise.all([fetch(new URL('learning-paths.json',app)),study.ready]);
      if(!response.ok)throw Error('Learning paths unavailable');
      paths=LearningPaths.validate(await response.json(),{resources:study.resources,courses:study.courses});
      draw();
      for(const name of ['studychange','learningnavigationchange','readingpositionreset'])document.addEventListener(name,draw);
      // Positions may change after a panel was drawn; use the latest shared position at activation.
      const refreshLink=event=>{
        if(event.button>1)return;
        const link=event.target.closest('.learning-path a[data-study-open]');
        const lesson=link&&paths.flatMap(path=>path.lessons).find(item=>item.id===link.dataset.studyOpen);
        if(lesson)link.href=href(lesson);
      };
      for(const name of ['click','auxclick'])document.addEventListener(name,refreshLink,true);
      window.addEventListener('pageshow',draw);
    } catch {document.querySelectorAll('[data-learning-course],[data-learning-continue]').forEach(host=>{host.hidden=true;});} // Readers/library remain usable if optional navigation cannot load.
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
