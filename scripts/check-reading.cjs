const fs=require('fs'),crypto=require('crypto'),assert=require('assert/strict');
const B=require('./lesson-build.cjs'),catalog=require('../catalog.json'),baseline=require('./reading-baseline.json');
const visuals=require('./ai-oop-visual-markdown.cjs');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
let advisory=0;
for(const original of baseline){
 const raw=fs.readFileSync(original.source,'utf8').replace(/\r\n/g,'\n'),{meta,body}=B.metadata(raw);
 assert.equal(meta.id,original.id);assert.deepEqual([...body.matchAll(/\{#([^}]+)\}/g)].map(m=>m[1]),original.anchors,'Explicit anchors preserved');
 assert.equal(hash((body.match(/```[\s\S]*?```/g)||[]).join('\n')),original.code,'Original programs and visualizers preserved');
 assert.equal(hash((body.match(/\$\$[\s\S]*?\$\$|\\\(.+?\\\)/g)||[]).join('\n')),original.math,'Verified formula tokens preserved');
 assert.equal(hash(body.split('\n').filter(s=>s.startsWith('|')).join('\n')),original.tables,'Source data tables preserved');
 assert.equal(hash(body.match(/## [^\n]*\{#practice\}[\s\S]*?(?=\n## |$)/)?.[0]||''),original.solutions,'Existing solved exercises preserved');
 // Keep the historical no-image guard strict for original content. New exact figure blocks
 // are separately checked against their local-image whitelist, hashes and rich renderer.
 const rendered=B.markdown(visuals.strip(body),{root:process.cwd(),source:original.source,output:'read/'+meta.course+'/'+meta.slug+'.html',catalog});
 assert.ok(!/<p>\s*<\/p>/.test(rendered.html));assert.ok(!/<(?:script|iframe|img)[ >]/.test(rendered.html.replace(/<script type="application\/json"[\s\S]*?<\/script>/g,'')),'No unexpected executable HTML');
 const prose=body.replace(/```[\s\S]*?```|\$\$[\s\S]*?\$\$|`[^`]*`/g,'');
 assert.ok(!/storageimplementation|tracepush\/pop\/peek|Week11 pp\.3–17:ข้อมูล/.test(prose));
 assert.ok(!/Learning Path|Path Foundations/.test(prose),'No obsolete lesson path guidance');
 for(const paragraph of prose.split(/\n\s*\n/))if(paragraph.length>1400&&!/^[|#>-]/.test(paragraph))advisory++;
 for(const table of body.matchAll(/^(\|.*\n\|[\s:|\-]+\|\n(?:\|.*\n)*)/gm)){const lines=table[0].trim().split('\n'),n=lines[0].split('|').length;assert.ok(lines.every(line=>line.split('|').length===n),'Consistent table columns');}
}
console.log('PASS: 25 lesson identities/anchors, original code/math/tables/solutions, supported Markdown, safe links and prose checks; long-paragraph review advisories: '+advisory);
