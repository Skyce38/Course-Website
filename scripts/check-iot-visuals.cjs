/* Exact additive-content preservation and new visual asset contracts. No browser dependency. */
const fs=require('fs'),crypto=require('crypto'),assert=require('assert/strict'),B=require('./lesson-build.cjs'),{block,strip}=require('./iot-visual-markdown.cjs'),spec=require('./iot-visuals.json'),catalog=require('../catalog.json'),baseline=require('./iot-visual-preservation.json');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex'),read=p=>fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n');
assert.equal(spec.assets.length,25);assert.deepEqual([...new Set(spec.assets.map(d=>d.lesson))].length,9);assert.equal(spec.assets.filter(d=>d.nets.length).length,5);
const ids=new Set(),names=new Set();let bytes=0;
for(const d of spec.assets){
 assert.ok(!ids.has(d.number)&&!names.has(d.name));ids.add(d.number);names.add(d.name);assert.ok(d.alt.length>60&&d.caption.length>25&&d.explanation.length>60);assert.match(d.alt,/[\u0e00-\u0e7f]/);assert.match(d.review,/hardware NOT TESTED/);assert.match(d.reference,/^https:\/\//);
 const image=fs.readFileSync(d.file),svg=read(d.svg);assert.equal(image.subarray(0,4).toString(),'RIFF');assert.equal(image.subarray(8,12).toString(),'WEBP');assert.equal(image.length,d.bytes);assert.equal(sha(image),d.sha256);assert.equal(sha(Buffer.from(svg)),d.svgSha256);assert.ok(!/<script|foreignObject|(?:href|url)=["']https?:/i.test(svg));assert.match(svg,/viewBox="0 0 560 /);assert.ok(svg.includes('width="'+d.width+'"'));assert.ok(svg.includes('height="'+d.height+'"'));assert.equal(d.bodyFont,32);bytes+=d.bytes;
 const source='courses/internet-of-things/summaries/'+d.lesson+'.md',html=read('read/internet-of-things/'+d.lesson+'.html');assert.equal(read(source).split(block(d)).length,2,d.name+': exactly one adjacent block');assert.match(read(source),new RegExp('^## .+\\{#'+d.section+'\\}','m'));assert.ok(html.includes('images/'+d.name+'.webp'));assert.ok(html.includes('alt="'+B.markdown(block(d),{root:process.cwd(),source,output:'read/internet-of-things/'+d.lesson+'.html',catalog}).html.match(/alt="([^"]*)"/)[1]+'"'));assert.match(html,/iot-visuals\.css\?v=phase14-iot-visual-1/);assert.ok(read('assets/iot-visuals.css').includes('aspect-ratio:'+d.width+'/'+d.height));
 if(d.nets.length){assert.ok(block(d).includes('| จาก | ถึง |'));assert.ok(d.nets.every(row=>row.length===3&&row.every(v=>v.length>2)));}
}
assert.ok(bytes<1500000,'Authoring size budget:1.5MB across25 lossless diagrams');
for(const [file,expected]of Object.entries(baseline.files)){
 let value;if(file.startsWith('courses/internet-of-things/summaries/')&&file.endsWith('.md'))value=Buffer.from(strip(read(file)));
 else if(file.startsWith('read/internet-of-things/')){
  const lesson=file.split('/').at(-1).replace('.html',''),source='courses/internet-of-things/summaries/'+lesson+'.md',context={root:process.cwd(),source,output:file,catalog};let html=read(file);
  for(const d of spec.assets.filter(d=>d.lesson===lesson)){const addition=B.markdown(block(d),context).html;assert.ok(html.includes(addition));html=html.replace(addition,'');}
  html=html.replace('<link rel="stylesheet" href="../../assets/iot-visuals.css?v=phase14-iot-visual-1">','');
  if(!B.markdown(B.metadata(strip(read(source))).body,context).features.length)html=html.replace('<link rel="stylesheet" href="../../assets/lesson-rich.css?v=rich-lesson-1">','');value=Buffer.from(html);
 }else value=/\.(?:pdf|png)$/.test(file)?fs.readFileSync(file):Buffer.from(read(file));
 assert.equal(sha(value),expected,'Original content/banks/runtime unchanged: '+file);
}
assert.equal(require('./lessons.json').length,46);assert.equal(require('../assets/insights-banks.json').lessons.flatMap(l=>l.bank.data.questions).length,1380);
assert.equal(require('./reading-baseline.json').reduce((n,l)=>n+l.anchors.length,0),370);
console.log('PASS:25 local images/source SVGs/alt/captions/connection tables,dimensions/hashes/space reservation; all46 original lesson prose/code/headings/readers preserved outside additive blocks,1380 immutable questions,370 old anchors,15PDFs and storage/grading contracts;'+bytes+' raster bytes');
