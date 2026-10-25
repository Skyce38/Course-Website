/* Independent catalog navigation replaces path validation; no saved-state ownership. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const catalog=JSON.parse(fs.readFileSync('catalog.json','utf8'));
const sources=JSON.parse(fs.readFileSync('scripts/lessons.json','utf8'));
for(const old of ['learning-paths.json','assets/learning-paths.js','assets/learning-navigation.js','assets/learning-navigation.css','scripts/check-learning-paths.cjs','docs/learning-navigation.md'])assert.ok(!fs.existsSync(old),'Obsolete path component remains: '+old);
for(const source of sources){const {meta}=require('./lesson-build.cjs').metadata(fs.readFileSync(source,'utf8'));const matches=catalog.resources.filter(r=>r.id===meta.id);assert.equal(matches.length,1);const r=matches[0];assert.equal(r.reader,`read/${r.course}/${meta.slug}.html`);assert.ok(fs.existsSync(r.reader));assert.ok(fs.existsSync(`courses/${r.course}/${r.path}`));}
for(const file of ['index.html','templates/lesson.html',...catalog.resources.filter(r=>r.reader).map(r=>r.reader)]){const html=fs.readFileSync(file,'utf8');assert.ok(!/data-learning-(?:course|continue|current)|assets\/learning-(?:paths|navigation)\./.test(html),file+': path runtime remains');}
const index=fs.readFileSync('index.html','utf8');assert.ok(index.includes('function recentReading()'));assert.ok(index.includes('LearningStudy.resumeLink'));assert.ok(index.includes('function courseProgress('));assert.ok(index.includes('data-course-link'));
const study=fs.readFileSync('assets/study.js','utf8');assert.ok(study.includes("const key = 'skyce-learning-study'"));assert.ok(!/localStorage\.clear\(|removeItem\(key\)/.test(study));
console.log('PASS: all registered lessons directly accessible; no path files/imports/hooks; catalog/history/Continue Reading/progress and existing storage ownership retained');
