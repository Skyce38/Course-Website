/* Rich-content security and compatibility fixtures; never publish test lessons. */
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
const {markdown,buildLessons}=require('./lesson-build.cjs');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'study-rich-check-'));
try {
  const source='courses/test/summaries/rich.md',output='read/test/rich.html',context={root:temp,source,output,catalog:{resources:[]}};
  const write=(name,data)=>{fs.mkdirSync(path.dirname(path.join(temp,name)),{recursive:true});fs.writeFileSync(path.join(temp,name),data);};
  write('courses/test/summaries/images/test image.png',Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR4nGP4//8/AAX+Av4N70a4AAAAAElFTkSuQmCC','base64'));
  write('courses/test/slides/source.pdf','Existing local source fixture');
  const body=String.raw`## เนื้อหา {#concepts}
สมการ \(x^2 + y_1 \leq \frac{1}{2}\) และ **\(P(A \mid B)\)** พร้อม \(\text{<script> \& "quote"}\).
$$
\begin{aligned} EU(a)&=\sum_s P(s\mid I,a)U(a,s) \\ A&=\begin{bmatrix}1&0\\0&1\end{bmatrix}\end{aligned}
$$
\[
\forall x\in\mathbb{R},\quad x^2\geq0
\]
![ภาพทดสอบ "alt" <safe>](images/test%20image.png "คำอธิบายภาพ **ตัวอย่าง**")
ที่มา: [สไลด์ หน้า 3](../slides/source.pdf#page=3)

| ตัวแปร | ความหมาย |
| --- | --- |
| \(P(A\mid B)\) | ความน่าจะเป็นแบบมีเงื่อนไข |

${'```'}text
\(not math\) <script>
${'```'}
`;
  const content=body;
  const result=markdown(content,context);assert.deepEqual(result.features,['math','figure']);
  assert.ok(result.html.includes('<math'));assert.ok(result.html.includes('<annotation encoding="application/x-tex">'));
  assert.ok(!result.html.includes('<script>'));assert.match(result.html,/alt="ภาพทดสอบ &quot;alt&quot; &lt;safe&gt;"/);
  assert.match(result.html,/<figcaption>คำอธิบายภาพ <strong>ตัวอย่าง<\/strong>/);
  assert.match(result.html,/src="..\/..\/courses\/test\/summaries\/images\/test%20image.png"/);
  assert.match(result.html,/pdf\.html\?file=courses%2Ftest%2Fslides%2Fsource.pdf&amp;page=3/);
  assert.match(result.html,/<pre><code>\\\(not math\\\) &lt;script&gt;/);
  for(const bad of [String.raw`\(\notARealCommand{x}\)`,String.raw`\(\href{javascript:alert(1)}{x}\)`,String.raw`\(\includegraphics{https://evil.test/a.png}\)`,String.raw`\(\htmlStyle{color:red}{x}\)`,String.raw`\(\def\a{\a}\a\)`,String.raw`\(missing close`,String.raw`missing open\)`, '$$\nx','$$\n\n$$']) assert.throws(()=>markdown(bad,context),bad);
  for(const bad of ['https://evil.test/a.png','//evil.test/a.png','data:image/png,x','images/missing.png','../../../../outside.png','%2fetc/file.png','images%5ctest.png','images/test%00.png','images/test%20image.png?x=1','images/test%20image.png#x','images/bad.svg']) assert.throws(()=>markdown('![説明]('+bad+')',context),bad);
  assert.throws(()=>markdown('![](images/test%20image.png)',context),/alt/);
  write('courses/test/summaries/images/fake.png','<script>alert(1)</script>');assert.throws(()=>markdown('![ภาพ](images/fake.png)',context),/mismatched/);
  assert.throws(()=>markdown('![ภาพ](images/test%20image.png)\nSource: [bad](javascript:evil)',context));
  fs.symlinkSync(os.tmpdir(),path.join(temp,'courses/test/summaries/escape'),process.platform==='win32'?'junction':'dir');
  const outside=temp+'-outside.png';fs.copyFileSync(path.join(temp,'courses/test/summaries/images/test image.png'),outside);
  try {assert.throws(()=>markdown('![ภาพ](escape/'+path.basename(outside)+')',context),/escapes/);} finally {fs.unlinkSync(outside);}
  const css=fs.readFileSync('assets/vendor/katex/katex.min.css','utf8');
  for(const [,url] of css.matchAll(/url\(([^)]+)\)/g)) { assert.ok(url.endsWith('.woff2'));assert.ok(fs.existsSync(path.join('assets/vendor/katex',url))); }
  assert.equal(markdown('ราคา $20 และ $30; `\\(literal\\)`',context).features.length,0,'Currency and inline code must stay literal');
  const title={version:1,id:'test-rich',course:'test',category:'summaries',slug:'rich',title:'ทดสอบ',language:'th'};
  write(source,'---\n'+JSON.stringify(title)+'\n---\n'+content);write('scripts/lessons.json',JSON.stringify([source]));write('templates/lesson.html',fs.readFileSync('templates/lesson.html'));
  const catalog={owner:'test',courses:[{id:'test',repo:'repo',name:'ทดสอบ'}],categories:[{id:'summaries',name:'สรุป'}],resources:[]};
  buildLessons(catalog,temp);const generated=fs.readFileSync(path.join(temp,output),'utf8'),before=JSON.stringify(catalog);
  assert.ok(generated.includes('katex.min.css?v=0.19.1'));assert.ok(generated.includes('lesson-rich.css?v=rich-lesson-1'));assert.ok(!generated.includes('katex.min.js'));assert.ok(!generated.includes('lesson-components.'));assert.ok(!/\{\{[A-Z_]+\}\}/.test(generated));
  buildLessons(catalog,temp);assert.equal(fs.readFileSync(path.join(temp,output),'utf8'),generated);assert.equal(JSON.stringify(catalog),before);
  write(source,'---\n'+JSON.stringify(title)+'\n---\n## Invalid\n'+String.raw`\(\invalidCommand{x}\)`);assert.throws(()=>buildLessons(catalog,temp));assert.equal(fs.readFileSync(path.join(temp,output),'utf8'),generated);assert.equal(JSON.stringify(catalog),before,'Invalid rich content must not partially update the catalog/output');
  write(source,'---\n'+JSON.stringify(title)+'\n---\n## Plain\nPlain lesson.');buildLessons(catalog,temp);assert.ok(!fs.readFileSync(path.join(temp,output),'utf8').includes('lesson-rich.css'));
  const pilotRoot=process.env.AI_PILOT_ROOT;
  if(pilotRoot) {const pilotSource='courses/artificial-intelligence/summaries/ai-foundations-agents.md',pilot=require('./lesson-build.cjs').metadata(fs.readFileSync(path.join(pilotRoot,pilotSource),'utf8'));const rendered=markdown(pilot.body,{root:pilotRoot,source:pilotSource,output:'read/artificial-intelligence/ai-foundations-agents.html',catalog:JSON.parse(fs.readFileSync(path.join(pilotRoot,'catalog.json')))});assert.deepEqual(rendered.features,[]);assert.ok(fs.readFileSync(path.join(pilotRoot,'read/artificial-intelligence/ai-foundations-agents.html'),'utf8').includes(rendered.html));console.log('PASS: staged AI pilot body renders byte-identically (read-only compatibility check)');}
  console.log('PASS: inline/block math, MathML/TeX fallback, figures/captions/attribution, encoded image paths, XSS/unsafe-resource rejection, legacy literal content, conditional assets and deterministic rich builds');
} finally {fs.rmSync(temp,{recursive:true,force:true});}
