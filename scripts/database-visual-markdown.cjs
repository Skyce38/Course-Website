/* Database-only authoring integration; uses the existing rich-image contract. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),spec=require('./database-visuals.json'),root=path.resolve(__dirname,'..');
function block(d){return '\n!['+d.alt+'](images/'+d.name+'.webp "'+d.caption+'")\nที่มา: [ภาพเขียนเสริม ตรวจตามบทเรียนและเอกสารเทคนิค]('+d.reference+')\n\nอ่านภาพ: '+d.explanation+'\n\n'}
function strip(raw){
 const names=new Set(spec.assets.map(d=>d.name));
 // Caption/alt edits must not leave the previous authored block beside its replacement.
 return raw.replace(/\n!\[[^\n]*\]\(images\/(db16-[a-z0-9-]+)\.webp "[^\n]*"\)\nที่มา: \[[^\n]*\]\([^\n]+\)\n\nอ่านภาพ: [^\n]+\n\n/g,(whole,name)=>names.has(name)?'':whole);
}
function integrate(){
 for(const lesson of new Set(spec.assets.map(d=>d.lesson))){
  const file=path.join(root,'courses/database-management/summaries',lesson+'.md');let raw=strip(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'));
  for(const d of spec.assets.filter(d=>d.lesson===lesson)){
   const h=new RegExp('^## .+\\{#'+d.section+'\\}\\n','m').exec(raw);assert.ok(h,'Existing section '+d.section);
   const end=raw.indexOf('\n\n',h.index+h[0].length);assert.ok(end>=0);raw=raw.slice(0,end+2)+block(d)+raw.slice(end+2);
  }fs.writeFileSync(file,raw);
 }
 const selector='.lesson-reader .lesson-figure img[src*="/images/db16-"]';
 fs.writeFileSync(path.join(root,'assets/database-visuals.css'),['/* Database figures only: reserve intrinsic space before lazy decode. */',selector+'{display:block;width:min(100%,560px);max-width:100%;height:auto;background:#fff}',...spec.assets.map(d=>'.lesson-reader .lesson-figure img[src$="/'+d.name+'.webp"]{aspect-ratio:'+d.width+'/'+d.height+'}'),'@media print{'+selector+'{max-height:200mm;object-fit:contain}}',''].join('\n'));
 console.log('Integrated20 Database figures without changing heading anchors.');
}
if(require.main===module)integrate();module.exports={block,strip};
