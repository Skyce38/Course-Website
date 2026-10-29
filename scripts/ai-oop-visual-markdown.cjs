/* Additive figure integration only. Reuses the existing rich-image Markdown contract. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),spec=require('./ai-oop-visuals.json');
const root=path.resolve(__dirname,'..'),style='<link rel="stylesheet" href="../../assets/ai-oop-visuals.css?v=phase15-visual-1">';
function source(d){return 'courses/'+d.course+'/summaries/'+d.lesson+'.md'}
function output(d){return 'read/'+d.course+'/'+d.lesson+'.html'}
function block(d){return '\n!['+d.alt+'](images/'+d.name+'.webp "'+d.caption+'")\nที่มา: [ภาพเขียนเสริม ตรวจตามบทเรียนและเอกสารเทคนิค]('+d.reference+')\n\nอ่านภาพ: '+d.explanation+'\n\n'}
function strip(raw){for(const d of spec.assets)raw=raw.replace(block(d),'');return raw}
function stripHTML(raw,file,B){
 const selected=spec.assets.filter(d=>output(d)===file);if(!selected.length)return raw;
 const fileSource=source(selected[0]),catalog=require('../catalog.json'),context={root,source:fileSource,output:file,catalog};
 for(const d of selected){const addition=B.markdown(block(d),context).html;assert.equal(raw.split(addition).length,2,'Exactly one generated figure: '+d.id);raw=raw.replace(addition,'');}
 assert.equal(raw.split(style).length,2,'Exactly one scoped stylesheet: '+file);raw=raw.replace(style,'');
 const body=B.metadata(strip(fs.readFileSync(path.join(root,fileSource),'utf8').replace(/\r\n/g,'\n'))).body;
 if(!B.markdown(body,context).features.length)raw=raw.replace('<link rel="stylesheet" href="../../assets/lesson-rich.css?v=rich-lesson-1">','');
 return raw;
}
function preservedBytes(file,B){
 const bytes=fs.readFileSync(path.join(root,file));if(/\.(?:pdf|png|webp|jpe?g|woff2?|ttf|eot)$/i.test(file))return bytes;
 let raw=bytes.toString('utf8').replace(/\r\n/g,'\n');
 if(/^courses\/(?:artificial-intelligence|oop-python)\/summaries\/.*\.md$/.test(file))raw=strip(raw);
 else if(/^read\/(?:artificial-intelligence|oop-python)\//.test(file))raw=stripHTML(raw,file,B);
 return Buffer.from(raw);
}
function integrate(){
 for(const file of new Set(spec.assets.map(source))){
  let raw=strip(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n'));const selected=spec.assets.filter(d=>source(d)===file);
  for(const section of new Set(selected.map(d=>d.section))){
   const heading=new RegExp('^#{2,3} .+\\{#'+section+'\\}\\n','m').exec(raw);assert.ok(heading,'Existing source heading '+file+'#'+section);
   // As in Phase 14, retain the section's original opening evidence before its figures.
   // The first blank paragraph boundary also keeps an opening table/code block intact.
   const start=heading.index+heading[0].length,end=raw.indexOf('\n\n',start+(raw[start]==='\n'?1:0));
   assert.ok(end>=0,'Existing introductory block '+file+'#'+section);
   raw=raw.slice(0,end+2)+selected.filter(d=>d.section===section).map(block).join('')+raw.slice(end+2);
  }
  fs.writeFileSync(path.join(root,file),raw);
 }
 const selector='.lesson-reader .lesson-figure img[src*="/images/visual15-"]';
 const css=['/* Original AI/OOP figures only; reserve exact intrinsic ratios before lazy decode. */',selector+'{display:block;width:min(100%,560px);max-width:100%;height:auto;background:#fff}',...spec.assets.map(d=>'.lesson-reader .lesson-figure img[src$="/'+d.name+'.webp"]{aspect-ratio:'+d.width+'/'+d.height+'}'),'@media print{'+selector+'{max-height:200mm;object-fit:contain}}',''].join('\n');
 fs.writeFileSync(path.join(root,'assets/ai-oop-visuals.css'),css);
 console.log('Added '+spec.assets.length+' reversible figure blocks and scoped ratio CSS to 25 existing lessons; no headings or original prose rewritten.');
}
if(require.main===module)integrate();module.exports={block,strip,stripHTML,preservedBytes,source,output,style};
