/* Exact additive preservation, asset integrity and static presentation contracts. */
const fs=require('fs'),crypto=require('crypto'),assert=require('assert/strict'),B=require('./lesson-build.cjs'),V=require('./ai-oop-visual-markdown.cjs'),spec=require('./ai-oop-visuals.json'),baseline=require('./ai-oop-visual-preservation.json'),catalog=require('../catalog.json');
const read=p=>fs.readFileSync(p,'utf8').replace(/\r\n/g,'\n'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const expected=require('./lessons.json').filter(p=>/^courses\/(?:artificial-intelligence|oop-python)\//.test(p));
assert.equal(spec.assets.length,50);assert.equal(new Set(spec.assets.map(d=>d.id)).size,50);assert.equal(new Set(spec.assets.map(d=>d.number)).size,50);
assert.deepEqual([...new Set(spec.assets.map(V.source))].sort(),expected.slice().sort());
assert.equal(spec.assets.filter(d=>d.course==='artificial-intelligence').length,24);assert.equal(spec.assets.filter(d=>d.course==='oop-python').length,26);
const css=read('assets/ai-oop-visuals.css');assert.ok(css.includes('width:min(100%,560px)')&&css.includes('height:auto')&&css.includes('max-height:200mm'));
let total=0;
for(const d of spec.assets){
 for(const field of ['id','resourceId','purpose','source','reference','assumptions','verification','review','copyright','alt','caption','svg','file'])assert.ok(typeof d[field]==='string'&&d[field].trim(),d.id+' '+field);
 assert.ok(d.review.startsWith('PASS: scoped model'),d.id+': completed technical review');
 assert.equal(d.id,d.name);assert.match(d.id,/^visual15-[a-z0-9-]+$/);assert.equal(d.resourceId,d.course+'-'+d.lesson);assert.match(d.alt,/[\u0e00-\u0e7f]/);assert.ok(d.alt.length>60&&d.caption.length>30&&d.explanation.length>60);assert.ok(!d.alt.includes(']'));assert.equal(d.bodyFont,32);
 assert.equal(d.file,'courses/'+d.course+'/summaries/images/'+d.name+'.webp');assert.equal(d.svg,'docs/diagrams/ai-oop/'+d.name+'.svg');assert.ok(new URL(d.reference).protocol==='https:');
 const bytes=fs.readFileSync(d.file),svg=read(d.svg);assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(bytes.subarray(8,12).toString(),'WEBP');assert.equal(bytes.subarray(12,16).toString(),'VP8L');
 const packed=bytes.readUInt32LE(21);assert.deepEqual([(packed&0x3fff)+1,((packed>>>14)&0x3fff)+1],[d.width,d.height]);
 assert.equal(bytes.length,d.bytes);assert.equal(sha(bytes),d.sha256);assert.equal(sha(Buffer.from(svg)),d.svgSha256);total+=bytes.length;
 assert.ok(!/<script|foreignObject|(?:href|url)=["']https?:/i.test(svg));assert.ok(svg.includes('width="'+d.width+'"')&&svg.includes('height="'+d.height+'"'));assert.ok(d.labelCount>=5);
 const source=V.source(d),file=V.output(d),raw=read(source),html=read(file),context={root:process.cwd(),source,output:file,catalog};
 assert.match(raw,new RegExp('^#{2,3} .+\\{#'+d.section+'\\}','m'));assert.equal(raw.split(V.block(d)).length,2,'One exact additive block: '+d.id);
 const addition=B.markdown(V.block(d),context).html;assert.equal(html.split(addition).length,2,'One rendered figure: '+d.id);assert.equal(html.split(V.style).length,2);
 assert.ok(css.includes('img[src$="/'+d.name+'.webp"]{aspect-ratio:'+d.width+'/'+d.height+'}'));
}
assert.ok(total<3000000,'Three-MB budget for fifty lossless figures');
for(const source of expected)assert.equal(spec.assets.filter(d=>V.source(d)===source).length,2,source+': two useful figures');
for(const [file,hash]of Object.entries(baseline.files)){
 let bytes;
 if(expected.includes(file))bytes=Buffer.from(V.strip(read(file)));
 else if(/^read\/(?:artificial-intelligence|oop-python)\//.test(file))bytes=Buffer.from(V.stripHTML(read(file),file,B));
 else bytes=/\.(?:pdf|png|webp|jpe?g|woff2?|ttf|eot)$/i.test(file)?fs.readFileSync(file):Buffer.from(read(file));
 bytes=require('./database-preservation.cjs').normalize(file,bytes);
 assert.equal(sha(bytes),hash,'Preserved original: '+file);
}
for(const source of require('./lessons.json')){
 const meta=B.metadata(read(source)).meta,file='read/'+meta.course+'/'+meta.slug+'.html';
 assert.equal(read(file).includes('assets/ai-oop-visuals.css'),expected.includes(source),'Load visual CSS only in the 25 illustrated readers');
}
assert.equal(require('./lessons.json').filter(s=>!s.startsWith('courses/database-management/')).length,46);assert.equal(require('../assets/insights-banks.json').lessons.filter(l=>l.course!=='database-management').flatMap(l=>l.bank.data.questions).length,1380);assert.equal(require('./reading-baseline.json').reduce((n,l)=>n+l.anchors.length,0),370);
console.log('PASS:50 AI/OOP WebPs+SVGs/two per lesson,all hashes/intrinsic sizes/alt/captions/ratios;'+total+' bytes;271 original files preserved after removing only exact figure blocks/styles;46 identities/1380 questions/370 historical anchors/15PDFs/IoT assets/storage unchanged');
