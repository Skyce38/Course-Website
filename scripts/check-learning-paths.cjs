/* Pure path contracts: invented multi-lesson IDs stay in memory, never in the catalog. */
const fs=require('node:fs'),assert=require('node:assert/strict');
const {validate,neighbors,continuing}=require('../assets/learning-paths.js');
const lesson=(id,course='test')=>({id,course,title:id,format:'MD',path:'summaries/'+id+'.md',reader:'read/'+course+'/'+id+'.html',generatedLesson:1});
const catalog={courses:[{id:'test',name:'Test'},{id:'other',name:'Other'}],resources:[lesson('first'),lesson('second'),lesson('third'),lesson('other-lesson','other')]};
const config=ids=>({version:1,paths:[{course:'test',lessons:ids}]});
assert.deepEqual(validate({version:1,paths:[]},catalog),[]);
const empty=validate(config([]),catalog)[0],single=validate(config(['first']),catalog)[0],multi=validate(config(['third','first','second']),catalog)[0];
assert.deepEqual(multi.lessons.map(item=>item.id),['third','first','second']);
assert.deepEqual(neighbors(empty,'first'),{index:-1,previous:null,next:null});
assert.deepEqual(neighbors(single,'first'),{index:0,previous:null,next:null});
assert.equal(neighbors(multi,'third').previous,null);assert.equal(neighbors(multi,'third').next.id,'first');
assert.equal(neighbors(multi,'first').previous.id,'third');assert.equal(neighbors(multi,'first').next.id,'second');assert.equal(neighbors(multi,'second').next,null);
assert.deepEqual(neighbors(multi,'missing'),{index:-1,previous:null,next:null});
for(const bad of [{version:2,paths:[]},{version:1,paths:'test'},{...config([]),extra:true},config(['missing']),config(['first','first']),config(['other-lesson']),{version:1,paths:[{course:'missing',lessons:[]}]},{version:1,paths:[{course:'test',lessons:[]},{course:'test',lessons:[]}]}])assert.throws(()=>validate(bad,catalog));
for(const patch of [{format:'PDF'},{generatedLesson:undefined},{reader:'javascript:alert(1)'},{reader:'read/other/first.html'},{reader:'../first.html'},{reader:'https://example.test/a.html'}])assert.throws(()=>validate(config(['first']),{...catalog,resources:[{...lesson('first'),...patch}]}));
assert.throws(()=>validate(config(['first']),{...catalog,resources:[lesson('first'),lesson('first')]}));
const completed=new Set(),study={recent:[],isCompleted:id=>completed.has(id)};
assert.equal(continuing([empty],study),null);assert.equal(continuing([multi],study).id,'third');
study.recent=[{id:'missing',course:'test'},{id:'second',course:'other'},{id:'first',course:'test',reader:'javascript:stale'}];
assert.equal(continuing([multi],study),catalog.resources[0],'History must resolve to authoritative catalog data, never its cached URL');
completed.add('first');assert.equal(continuing([multi],study).id,'third');completed.add('third');assert.equal(continuing([multi],study).id,'second');completed.add('second');assert.equal(continuing([multi],study),null);
const paths=validate({version:1,paths:[{course:'test',lessons:['first']},{course:'other',lessons:['other-lesson']}]},catalog);
assert.equal(continuing(paths,study).id,'other-lesson');assert.equal(continuing([paths[0]],study),null,'Course Continue must never jump to another course');
const actual=JSON.parse(fs.readFileSync('catalog.json','utf8')),before=JSON.stringify(actual);
const actualPaths=validate(JSON.parse(fs.readFileSync('learning-paths.json','utf8')),actual);
for(const item of actualPaths.flatMap(path=>path.lessons)){assert.ok(fs.existsSync(item.reader));assert.ok(fs.existsSync('courses/'+item.course+'/'+item.path));}
assert.equal(JSON.stringify(actual),before);
console.log('PASS: explicit learning-path integrity/order, empty/single/multi boundaries, unfinished selection, stale/missing history, course isolation and unchanged catalog');
