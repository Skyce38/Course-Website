/* Shared declarative path validation and selection, without storage or DOM ownership. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.LearningPaths=api;})(typeof globalThis!=='undefined'?globalThis:this,()=>{
  'use strict';
  const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
  function validate(config,catalog) {
    if(!object(config)||config.version!==1||!Array.isArray(config.paths)||Object.keys(config).some(key=>!['version','paths'].includes(key)))throw Error('Invalid learning-path configuration');
    const courses=new Map(catalog.courses.map(course=>[course.id,course])),resources=new Map(catalog.resources.map(resource=>[resource.id,resource]));
    if(resources.size!==catalog.resources.length)throw Error('Duplicate learning-path catalog resource');
    const seenCourses=new Set(),seenLessons=new Set();
    return config.paths.map(path=>{
      if(!object(path)||Object.keys(path).some(key=>!['course','lessons'].includes(key))||!/^[-a-z0-9]+$/.test(path.course)||!courses.has(path.course)||seenCourses.has(path.course)||!Array.isArray(path.lessons))throw Error('Invalid/duplicate learning-path course');
      seenCourses.add(path.course);
      const lessons=path.lessons.map(id=>{
        const resource=resources.get(id);
        if(typeof id!=='string'||seenLessons.has(id)||!resource||resource.course!==path.course||resource.generatedLesson!==1||resource.format!=='MD'||!new RegExp('^read/'+path.course+'/[a-z0-9-]+\\.html$').test(resource.reader||''))throw Error('Invalid/missing/duplicate learning-path lesson: '+id);
        seenLessons.add(id);return resource;
      });
      return {course:path.course,title:courses.get(path.course).name,lessons};
    });
  }
  function neighbors(path,id) {
    const index=path.lessons.findIndex(lesson=>lesson.id===id);
    return {index,previous:index>0?path.lessons[index-1]:null,next:index>=0?path.lessons[index+1]||null:null};
  }
  function continuing(paths,study) {
    const unfinished=paths.flatMap(path=>path.lessons).filter(lesson=>!study.isCompleted(lesson.id));
    for(const recent of study.recent) {const lesson=unfinished.find(item=>item.id===recent.id&&item.course===recent.course);if(lesson)return lesson;}
    return unfinished[0]||null;
  }
  return {validate,neighbors,continuing};
});
