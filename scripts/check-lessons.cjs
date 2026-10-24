/* Focused contracts/build tests; all writes stay in an isolated OS temporary folder. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {buildLessons,markdown,metadata,stepper}=require('./lesson-build.cjs');
const {validate}=require('../assets/lesson-contract.js');
const catalog=JSON.parse(fs.readFileSync('catalog.json','utf8')),source='courses/oop-python/summaries/linked-list.md',output='read/oop-python/linked-list.html';
const context={root:process.cwd(),source,output,catalog};
const raw=fs.readFileSync(source,'utf8'),parsed=metadata(raw);
assert.equal(parsed.meta.id,'oop-python-linked-list');
assert.equal(metadata(raw.replace(/\r\n/g,'\n').replace(/\n/g,'\r\n')).meta.id,parsed.meta.id);
assert.throws(()=>metadata('No metadata'));
assert.throws(()=>metadata(raw.replace('"version":1','"version":2')));
assert.throws(()=>metadata(raw.replace('"slug":"linked-list"','"slug":"../linked-list"')));
const safe=markdown('## Safe {#safe}\n<script>alert(1)</script>\n\n```python\nprint("<script>")\n```',context);
assert.ok(safe.html.includes('&lt;script&gt;'));assert.ok(!safe.html.includes('<script>'));assert.equal(safe.interactive,true);
for(const url of ['javascript:alert(1)','data:text/html,x','//evil.test/a','https://user:pass@evil.test/a','../../../../secret.md','missing.md','file:///secret.md']) assert.throws(()=>markdown('[unsafe]('+url+')',context),url);
assert.match(markdown('[source](../slides/Week10.pdf#page=13)',context).html,/pdf\.html\?file=courses%2Foop-python%2Fslides%2FWeek10\.pdf&amp;page=13/);
assert.match(markdown('[source](final-week10-15.md)',context).html,/href="final-week10-15\.html"/);
assert.deepEqual(markdown('## Same\n## Same',context).headings.map(h=>h.id),['same','same-2']);
assert.throws(()=>markdown('## A {#same}\n## B {#same}',context));assert.throws(()=>markdown('## A {#main-content}',context));
assert.throws(()=>markdown('[missing](#missing)',context));assert.ok(markdown('## Existing {#existing}\n[valid](#existing)',context).html.includes('href="#existing"'));
assert.throws(()=>markdown('```python\nmissing close',context));assert.throws(()=>markdown('```javascript\nalert(1)\n```',context));
const fixture=JSON.parse(fs.readFileSync('scripts/fixtures/stepper.json','utf8'));
assert.equal(validate(fixture),fixture);
for(const patch of [{version:2},{nodes:[fixture.nodes[0],fixture.nodes[0]]},{steps:[{...fixture.steps[0],line:0}]},{steps:[{...fixture.steps[0],active:'missing'}]},{steps:[{...fixture.steps[0],visited:['missing']}]},{steps:[{...fixture.steps[0],explanation:{th:'ไทย'}}]},{script:'alert(1)'}]) assert.throws(()=>validate({...fixture,...patch}));
assert.throws(()=>validate({...fixture,steps:[{...fixture.steps[0],visited:['input','input']}]}));
const injection=structuredClone(fixture);injection.steps[0].explanation.en='</script><script>globalThis.pwned=true</script>';
const component=stepper(injection);assert.ok(component.includes('\\u003c/script>'));assert.equal((component.match(/<script\b/g)||[]).length,1);
const demo=JSON.parse(parsed.body.match(/```study-stepper\n([\s\S]*?)\n```/)[1]);validate(demo);
assert.deepEqual(demo.steps.map(s=>s.line),[1,2,3,4,2,3,4,2,3,4,2]);
assert.deepEqual(demo.steps.filter(s=>s.line===3).map(s=>s.output),['10','10\n20','10\n20\n30']);
assert.equal(demo.steps.at(-1).active,null);assert.deepEqual(demo.steps.at(-1).visited,['n10','n20','n30']);
assert.deepEqual(demo.steps.map(s=>[s.active,s.visited.join(',')]),[['n10',''],['n10',''],['n10','n10'],['n20','n10'],['n20','n10'],['n20','n10,n20'],['n30','n10,n20'],['n30','n10,n20'],['n30','n10,n20,n30'],[null,'n10,n20,n30'],[null,'n10,n20,n30']]);
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'study-lesson-check-'));
assert.equal(path.dirname(path.resolve(temp)),path.resolve(os.tmpdir()),'Scratch cleanup must stay inside the OS temp directory');
try {
  for(const file of ['scripts/lessons.json','templates/lesson.html',source]) { fs.mkdirSync(path.dirname(path.join(temp,file)),{recursive:true});fs.copyFileSync(file,path.join(temp,file)); }
  fs.writeFileSync(path.join(temp,'scripts/lessons.json'),JSON.stringify([source])); // Keep this isolated fixture independent of other registered lessons.
  for(const file of ['courses/oop-python/summaries/final-week10-15.md','courses/oop-python/slides/Week10.pdf']) { fs.mkdirSync(path.dirname(path.join(temp,file)),{recursive:true});fs.writeFileSync(path.join(temp,file),'Fixture only'); }
  const data=structuredClone(catalog);buildLessons(data,temp);
  const target=path.join(temp,output),html=fs.readFileSync(target,'utf8'),before=JSON.stringify(data);
  assert.equal(html,fs.readFileSync(output,'utf8'),'Generated lesson is stale; run build');
  assert.equal((html.match(/data-toc-detail="practice"/g)||[]).length,5,'Practice details remain deep-linkable but grouped in the Modern TOC');
  for(const anchor of ['question-head','question-empty','question-single','question-tail','question-cost']) assert.ok(html.includes('id="'+anchor+'"'));
  buildLessons(data,temp);assert.equal(fs.readFileSync(target,'utf8'),html);assert.equal(JSON.stringify(data),before);
  assert.equal(data.resources.filter(r=>r.id===parsed.meta.id).length,1);
  fs.writeFileSync(target,'<!doctype html><p>Manual reader</p>');assert.throws(()=>buildLessons(data,temp),/manual reader/);assert.equal(fs.readFileSync(target,'utf8'),'<!doctype html><p>Manual reader</p>');
  fs.unlinkSync(target);const simple=raw.slice(0,raw.indexOf('---',4)+3)+'\n## Static {#static}\nJust text.\n';fs.writeFileSync(path.join(temp,source),simple);buildLessons(data,temp);
  assert.ok(!fs.readFileSync(target,'utf8').includes('lesson-components.'));assert.ok(!fs.readFileSync(target,'utf8').includes('lesson-contract.js'));
  data.resources.find(r=>r.id===parsed.meta.id).generatedLesson=undefined;assert.throws(()=>buildLessons(data,temp),/conflicts/);
} finally { fs.rmSync(temp,{recursive:true,force:true}); }
console.log('PASS: lesson metadata/IDs, restricted Markdown/XSS/link/anchor tests, independent component fixtures and traversal snapshots, manual-reader protection, conditional assets, deterministic builds and catalog registration');
