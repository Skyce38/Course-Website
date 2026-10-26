/* Derived public banks, not a new question or saved-data format. Dashboard-only download. */
const fs=require('node:fs'),path=require('node:path'),C=require('../assets/practice-contract.js'),E=require('../assets/exam-contract.js');
function build(catalog,root=process.cwd()){
 const lessons=catalog.resources.filter(r=>r.generatedLesson===1).map(r=>{
  const html=fs.readFileSync(path.join(root,r.reader),'utf8'),bank=E.validate(JSON.parse(html.match(/<script type="application\/json" class="exam-data">([\s\S]*?)<\/script>/)[1]));
  const practice=C.validate(JSON.parse(fs.readFileSync(path.join(root,'courses',r.course,'practice',r.path.split('/').at(-1).replace(/\.md$/,'.json')),'utf8')));
  return {id:r.id,course:r.course,title:r.title,reader:r.reader,practiceRevision:practice.revision,practiceIds:practice.questions.map(q=>q.id),bank};
 });
 const manifest=require('../assets/insights-contract.js').validate({version:1,lessons});fs.writeFileSync(path.join(root,'assets/insights-banks.json'),JSON.stringify(manifest)+'\n');return manifest;
}
module.exports={build};
