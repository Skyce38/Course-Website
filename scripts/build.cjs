const fs=require('node:fs');
const path=require('node:path');
const catalog=JSON.parse(fs.readFileSync('catalog.json','utf8'));
const originalCatalog=JSON.stringify(catalog);
// Include local PDFs before publishing; runtime GitHub sync handles remote additions.
function pdfFiles(folder){
  if(!fs.existsSync(folder))return [];
  return fs.readdirSync(folder,{withFileTypes:true}).flatMap(entry=>{
    const file=path.join(folder,entry.name);
    return entry.isDirectory()?pdfFiles(file):entry.isFile()&&/\.pdf$/i.test(entry.name)?[file]:[];
  }).sort((a,b)=>a.localeCompare(b,'en',{numeric:true}));
}
const known=new Set(catalog.resources.map(r=>r.course+'/'+r.path));
let added=0;
for(const course of catalog.courses){
  const folder=course.folder||'courses/'+course.id;
  for(const category of catalog.categories){
    for(const file of pdfFiles(path.join(folder,category.id))){
      const relative=path.relative(folder,file).split(path.sep).join('/');
      if(known.has(course.id+'/'+relative))continue;
      catalog.resources.push({id:course.id+'-'+relative,course:course.id,category:category.id,
        title:path.basename(file).replace(/\.pdf$/i,''),path:relative,format:'PDF',
        github:'https://github.com/'+catalog.owner+'/'+course.repo+'/blob/main/'+file.split(path.sep).map(encodeURIComponent).join('/')});
      known.add(course.id+'/'+relative);added++;
    }
  }
}
const lessons=require('./lesson-build.cjs').buildLessons(catalog);
if(JSON.stringify(catalog)!==originalCatalog)fs.writeFileSync('catalog.json',JSON.stringify(catalog,null,2)+'\n');
const file='index.html';
let html=fs.readFileSync(file,'utf8');
const marker='const catalog=';
const start=html.indexOf(marker)+marker.length;
const end=html.indexOf(';const $=',start);
if(start<marker.length||end<start)throw Error('Catalog marker missing');
html=html.slice(0,start)+JSON.stringify(catalog).replace(/</g,'\\u003c')+html.slice(end);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const nav=catalog.courses.map(c=>'<a href=\"#course/'+esc(c.id)+'\" data-course-link=\"'+esc(c.id)+'\" class=\"side-link\"><span class=\"side-icon\">'+esc(c.short)+'</span><span>'+esc(c.name)+'</span></a>').join('');
html=html.replace(/<nav id=\"course-nav\">[\s\S]*?<\/nav>/,'<nav id=\"course-nav\">'+nav+'</nav>');
html=html.replace(/SUBJECTS \/ \d+/,'SUBJECTS / '+String(catalog.courses.length).padStart(2,'0'));
fs.writeFileSync(file,html);
console.log('Updated catalog for '+catalog.courses.length+' courses');
console.log('Added '+added+' local PDFs');
console.log('Built '+lessons+' registered Markdown lessons');
