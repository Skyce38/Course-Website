/* Remove only reviewed Database additions before checking older immutable baselines.
 * Existing answer banks/readers/runtime are never normalized or exempted here.
 */
const course='database-management';
function catalog(data){data=structuredClone(data);data.resources=data.resources.filter(r=>!(r.course===course&&r.generatedLesson===1));data.courses.find(c=>c.id===course).code='';return data}
function normalize(file,bytes){
 let text=bytes.toString('utf8').replace(/\r\n/g,'\n');
 if(file==='catalog.json')text=JSON.stringify(catalog(JSON.parse(text)),null,2)+'\n';
 else if(file==='assets/insights-banks.json'){const m=JSON.parse(text);m.courses=m.courses.filter(c=>c.id!==course);m.lessons=m.lessons.filter(l=>l.course!==course);text=JSON.stringify(m)+'\n'}
 else if(file==='scripts/lessons.json')text=JSON.stringify(JSON.parse(text).filter(s=>!s.startsWith('courses/'+course+'/')),null,2)+'\n';
 else if(file==='assets/i18n.js')text=text.replace("    sqlCode:['โค้ด SQL','SQL code'],\n",'').replace("    phpCode:['โค้ด PHP','PHP code'],\n",'');
 else if(file==='assets/insights.js')text=text.replace('insights-banks.json?v=phase16-db-1','insights-banks.json?v=phase13-iot-1');
 else if(file==='insights.html')text=text.replace('assets/insights.js?v=phase16-db-1','assets/insights.js?v=phase13-iot-1');
 else if(file==='courses/database-management/course.json'){const d=JSON.parse(text);d.code='';text=JSON.stringify(d,null,2)+'\n'}
 else if(file==='index.html'){const marker='const catalog=',start=text.indexOf(marker)+marker.length,end=text.indexOf(';const $=',start);if(start<marker.length||end<start)throw Error('Missing catalog markers');text=text.slice(0,start)+JSON.stringify(catalog(JSON.parse(text.slice(start,end)))).replace(/</g,'\\u003c')+text.slice(end)}
 else return bytes;
 return Buffer.from(text);
}
module.exports={normalize};
