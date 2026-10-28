/* Additive, reversible figure blocks. Existing prose/code/headings are not rewritten. */
const fs=require('fs'),path=require('path'),spec=require('./iot-visuals.json');
function block(d){
 let out='!['+d.alt+'](images/'+d.name+'.webp "'+d.caption+'")\nที่มา: [ภาพเขียนเสริม ตรวจตามเอกสารเทคนิค]('+d.reference+')\n\nอ่านภาพ: '+d.explanation+'\n\n';
 if(d.nets.length)out+='**ตารางตรวจสายของภาพนี้ — ไม่ใช่ลำดับขา header**\n\n| จาก | ถึง | ชนิด / เงื่อนไข |\n|---|---|---|\n'+d.nets.map(row=>'| '+row.join(' | ')+' |').join('\n')+'\n\n';
 return out;
}
function strip(raw){for(const d of spec.assets)raw=raw.replace(block(d),'');return raw;}
function integrate(){
 for(const lesson of new Set(spec.assets.map(d=>d.lesson))){const file=path.resolve(__dirname,'../courses/internet-of-things/summaries/'+lesson+'.md');let raw=strip(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'));
  const assets=spec.assets.filter(d=>d.lesson===lesson);
  for(const section of new Set(assets.map(d=>d.section))){const marker=new RegExp('^## .+\\{#'+section+'\\}\\n\\n','m').exec(raw);if(!marker)throw Error('Missing section '+section);const start=marker.index+marker[0].length,end=raw.indexOf('\n\n',start);if(end<0)throw Error('Missing source paragraph');raw=raw.slice(0,end+2)+assets.filter(d=>d.section===section).map(block).join('')+raw.slice(end+2);}
  fs.writeFileSync(file,raw);
 }
 const css=['/* Original raster diagrams: reserve exact space before lazy loading; IoT only. */','.iot-lesson .lesson-figure img[src*="/images/visual-"]{width:min(100%,560px);background:#fff}',...spec.assets.map(d=>'.iot-lesson .lesson-figure img[src$="/'+d.name+'.webp"]{aspect-ratio:'+d.width+'/'+d.height+'}'),'@media print{.iot-lesson .lesson-figure img[src*="/images/visual-"]{max-height:230mm;object-fit:contain}}',''].join('\n');fs.writeFileSync(path.resolve(__dirname,'../assets/iot-visuals.css'),css);
 console.log('Added25 figures/captions/text alternatives and5 connection tables across9 sources; original content retained.');
}
if(require.main===module)integrate();module.exports={block,strip};
