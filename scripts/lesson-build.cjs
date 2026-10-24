/* Restricted Markdown for registered lessons; rich math uses vendored build-time KaTeX. */
const fs = require('node:fs'), path = require('node:path');
const {validate} = require('../assets/lesson-contract.js');
const rich = require('./lesson-rich.cjs');
const VERSION = 'theme-flash-1';
const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
function metadata(source) {
  const match = source.replace(/\r\n/g,'\n').match(/^---\n([\s\S]+?)\n---\n/);
  if (!match) throw Error('Lesson requires JSON metadata between --- delimiters');
  const meta = JSON.parse(match[1]), allowed = ['version','id','slug','course','category','title','language'];
  if (!meta || Array.isArray(meta) || Object.keys(meta).some(key=>!allowed.includes(key)) || meta.version !== 1 || !/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(meta.slug) || meta.id !== meta.course+'-'+meta.slug || !['th','en'].includes(meta.language) || typeof meta.title !== 'string' || !meta.title.trim() || meta.title.length > 200) throw Error('Invalid lesson metadata');
  return {meta,body:source.replace(/\r\n/g,'\n').slice(match[0].length)};
}
function urlFor(raw, context) {
  if (/^https:\/\//i.test(raw)) { const url = new URL(raw); if (url.username || url.password) throw Error('Credentials in link'); return url.href; }
  if (/^[a-z][a-z0-9+.-]*:|^\/|\\|[\u0000-\u0020]/i.test(raw)) throw Error('Unsafe Markdown link: '+raw);
  const match = raw.match(/^([^#?]*)(#[^?]*)?$/); if (!match) throw Error('Unsupported Markdown link');
  if (!match[1]) return match[2] || '#';
  const target = path.resolve(context.root,path.dirname(context.source),decodeURIComponent(match[1]));
  if (!target.startsWith(context.root+path.sep) || !fs.existsSync(target) || !fs.statSync(target).isFile() || !/\.(?:md|html|pdf)$/i.test(target)) throw Error('Missing/unsafe lesson link: '+raw);
  const resource = context.catalog.resources.find(r=>path.resolve(context.root,'courses',r.course,r.path) === target);
  if (/\.pdf$/i.test(target)) {
    const query = new URLSearchParams({file:path.relative(context.root,target).split(path.sep).join('/')});
    if (/^#page=\d+$/.test(match[2] || '')) query.set('page',match[2].slice(6));
    return path.relative(path.resolve(context.root,path.dirname(context.output)),path.join(context.root,'pdf.html')).split(path.sep).join('/')+'?'+query;
  }
  const destination = resource?.reader ? path.resolve(context.root,resource.reader) : target;
  return path.relative(path.resolve(context.root,path.dirname(context.output)),destination).split(path.sep).map(encodeURIComponent).join('/')+(match[2] || '');
}
function inline(text, context) {
  const pattern = /`(?<code>[^`]+)`|\\\((?<math>.+?)\\\)|\*\*(?<bold>[^*]+)\*\*|\[(?<label>[^\]]+)\]\((?<url>[^)]+)\)/g;
  let result = '', last = 0;
  for (const match of text.matchAll(pattern)) {
    if (/\\[()]/.test(text.slice(last,match.index))) throw Error('Unmatched inline lesson equation delimiter');
    result += esc(text.slice(last,match.index));
    const token=match.groups;
    result += token.code !== undefined ? '<code>'+esc(token.code)+'</code>' : token.math !== undefined ? rich.math(token.math,false,context) : token.bold !== undefined ? '<strong>'+inline(token.bold,context)+'</strong>' : '<a href="'+esc(urlFor(token.url,context))+'">'+esc(token.label)+'</a>';
    last = match.index+match[0].length;
  }
  if (/\\[()]/.test(text.slice(last))) throw Error('Unmatched inline lesson equation delimiter');
  return result+esc(text.slice(last));
}
function codeViewer(code, id) {
  return '<div class="code-viewer" id="'+id+'" role="group" data-i18n-aria-label="pythonCode" aria-label="โค้ด Python"><div class="code-toolbar"><span>Python</span><button type="button" class="icon-button code-copy" data-i18n="copyCode" hidden>คัดลอกโค้ด</button><span class="copy-status" role="status"></span></div><pre tabindex="0" data-i18n-aria-label="pythonCode" aria-label="โค้ด Python"><code>'+code.split('\n').map((line,i)=>'<span class="code-line" data-line="'+(i+1)+'"><span class="line-number" aria-hidden="true">'+(i+1)+'</span><span class="line-source">'+esc(line)+'</span></span>').join('')+'</code></pre></div>';
}
function stepper(data) {
  validate(data);
  return '<section class="step-visualizer" id="demo-'+data.id+'" tabindex="0" role="group" aria-labelledby="step-title-'+data.id+'"><h3 id="step-title-'+data.id+'">'+esc(data.title)+'</h3>'+codeViewer(data.code,'step-code-'+data.id)+'<div class="step-diagram" role="list" data-i18n-aria-label="stepDiagram" aria-label="แผนภาพตามลำดับ"><span class="step-endpoint">'+esc(data.startLabel)+'</span>'+data.nodes.map(node=>'<span class="step-arrow" aria-hidden="true">→</span><span role="listitem" class="step-node" data-node="'+node.id+'">'+esc(node.label)+'</span>').join('')+'<span class="step-arrow" aria-hidden="true">→</span><span class="step-endpoint step-end">'+esc(data.endLabel)+'</span></div><p class="step-legend" data-i18n="stepLegend">กรอบหนา = ตำแหน่งปัจจุบัน · ✓ = ประมวลผลแล้ว</p><div class="step-controls" hidden><button type="button" class="icon-button" data-step-action="previous" data-i18n="previousStep">ก่อนหน้า</button><button type="button" class="icon-button" data-step-action="next" data-i18n="nextStep">ถัดไป</button><button type="button" class="icon-button" data-step-action="reset" data-i18n="resetSteps">เริ่มใหม่</button></div><div class="step-live" role="status" aria-live="polite" hidden><p class="step-position"></p><p class="step-explanation"></p><p><strong data-i18n="programOutput">ผลลัพธ์</strong></p><pre class="step-output"></pre></div><details class="step-fallback" open><summary data-i18n="staticSteps">อ่านขั้นตอนทั้งหมด (ใช้ได้โดยไม่เปิด JavaScript)</summary><ol>'+data.steps.map(step=>'<li><strong>Python '+step.line+'</strong> — '+esc(step.explanation.th)+'<br><span lang="en">'+esc(step.explanation.en)+'</span><pre>'+esc(step.output || '—')+'</pre></li>').join('')+'</ol></details><script type="application/json" class="step-data">'+json(data)+'</script></section>';
}
function markdown(body, context) {
  context={...context,root:path.resolve(context.root),features:new Set()};
  const lines = body.split('\n'), headings = [], ids = new Set(['main-content','sidebar','menu','overlay','theme','font-less','font-more','font-value','print']);
  let result = '', codeCount = 0, interactive = false;
  const addID = id => { if (ids.has(id)) throw Error('Duplicate lesson anchor: '+id); ids.add(id); };
  for (let i=0;i<lines.length;) {
    const line = lines[i]; if (!line.trim()) { i++; continue; }
    if (line==='$$' || line==='\\[') {
      const close=line==='$$'?'$$':'\\]',block=[];i++;
      while(i<lines.length && lines[i]!==close) block.push(lines[i++]);
      if(i===lines.length) throw Error('Unclosed lesson equation');i++;
      result+=rich.math(block.join('\n'),true,context);
    } else if (line.startsWith('![')) {
      const figure=line.match(/^!\[([^\]]*)\]\((\S+?)(?: "([^"]*)")?\)$/);
      if(!figure) throw Error('Use a standalone lesson image with alt text and optional caption');
      const img=rich.image(figure[2],figure[1],context);i++;
      let source='';const attribution=(lines[i] || '').match(/^(?:Source|ที่มา): (.+)$/);
      if(attribution) { if(!/^\[[^\]]+\]\([^)]+\)$/.test(attribution[1])) throw Error('Figure source requires a labeled source link');source='<span class="lesson-figure-source">'+inline(attribution[1],context)+'</span>';i++; }
      result+='<figure class="lesson-figure">'+img+((figure[3] || source)?'<figcaption>'+(figure[3]?inline(figure[3],context):'')+source+'</figcaption>':'')+'</figure>';
    } else if (line.startsWith('```')) {
      const lang = line.slice(3).trim(); const block = []; i++;
      while (i<lines.length && lines[i] !== '```') block.push(lines[i++]);
      if (i===lines.length) throw Error('Unclosed code fence'); i++;
      const code = block.join('\n');
      if (lang==='study-stepper') { const data = validate(JSON.parse(code)); for (const id of ['demo-','step-title-','step-code-']) addID(id+data.id); result+=stepper(data); interactive=true; }
      else if (lang==='python') { const id='code-block-'+(++codeCount); addID(id); result+=codeViewer(code,id); interactive=true; }
      else if (lang==='text' || lang==='') result+='<pre><code>'+esc(code)+'</code></pre>';
      else throw Error('Unsupported code language: '+lang);
    } else if (/^#{1,6} /.test(line)) {
      const match = line.match(/^(#{2,4}) (.+?)(?: \{#([a-z][a-z0-9-]*)\})?$/); if (!match) throw Error('Use level 2–4 lesson headings');
      const base = match[3] || match[2].normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,'-').replace(/^-|-$/g,'') || 'section';
      let id=base, suffix=2; if (!match[3]) while(ids.has(id)) id=base+'-'+suffix++;
      addID(id); headings.push({id,title:match[2],level:match[1].length}); result+='<h'+match[1].length+' id="'+esc(id)+'">'+inline(match[2],context)+'</h'+match[1].length+'>'; i++;
    } else if (line.startsWith('|') && /^\|[\s:|\-]+\|$/.test(lines[i+1] || '')) {
      const cells = value => value.slice(1,-1).split('|').map(cell=>inline(cell.trim(),context));
      result+='<div class="table-scroll"><table><thead><tr>'+cells(line).map(cell=>'<th scope="col">'+cell+'</th>').join('')+'</tr></thead><tbody>'; i+=2;
      while(i<lines.length && lines[i].startsWith('|')) { result+='<tr>'+cells(lines[i++]).map(cell=>'<td>'+cell+'</td>').join('')+'</tr>'; } result+='</tbody></table></div>';
    } else if (/^- /.test(line)) {
      result+='<ul>'; while(i<lines.length && /^- /.test(lines[i])) result+='<li>'+inline(lines[i++].slice(2),context)+'</li>'; result+='</ul>';
    } else if (/^> /.test(line)) { result+='<blockquote><p>'+inline(line.slice(2),context)+'</p></blockquote>'; i++; }
    else {
      const paragraph=[line]; i++; while(i<lines.length && lines[i].trim() && !/^(?:#{1,6} |```|- |> |\||!\[|\$\$$|\\\[$)/.test(lines[i])) paragraph.push(lines[i++]);
      result+='<p>'+inline(paragraph.join(' '),context)+'</p>';
    }
  }
  for (const [,anchor] of result.matchAll(/href="#([^"\s]+)"/g)) if (!ids.has(decodeURIComponent(anchor))) throw Error('Missing lesson anchor: '+anchor);
  return {html:result,headings,interactive,features:[...context.features]};
}
function tocHTML(headings) {
  let section = '';
  return headings.map(h => {
    if (h.level === 2) section = h.id;
    return '<a href="#'+encodeURIComponent(h.id)+'"'+(h.level>2?' class="sub"':'')+(h.level>2 && section==='practice'?' data-toc-detail="practice"':'')+'>'+esc(h.title)+'</a>';
  }).join('');
}
function buildLessons(catalog, root = process.cwd()) {
  root=path.resolve(root);
  if (new Set(catalog.resources.map(r=>r.id)).size !== catalog.resources.length) throw Error('Duplicate catalog IDs');
  const sources = JSON.parse(fs.readFileSync(path.join(root,'scripts/lessons.json'),'utf8'));
  if (!Array.isArray(sources) || new Set(sources).size !== sources.length) throw Error('Duplicate/invalid lesson registry');
  const plans = [], seen = new Set();
  for (const source of sources) {
    if (typeof source !== 'string' || !/^courses\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+\.md$/.test(source)) throw Error('Invalid registered lesson path');
    const {meta,body} = metadata(fs.readFileSync(path.join(root,source),'utf8'));
    const course=catalog.courses.find(c=>c.id===meta.course), category=catalog.categories.find(c=>c.id===meta.category);
    if (!course || !category || source!==`courses/${meta.course}/${meta.category}/${meta.slug}.md` || seen.has(meta.id)) throw Error('Invalid/duplicate lesson identity'); seen.add(meta.id);
    const output=`read/${meta.course}/${meta.slug}.html`, target=path.join(root,output), marker=`<!-- Study generated lesson v1; source: ${source} -->`;
    if (fs.existsSync(target) && !fs.readFileSync(target,'utf8').replace(/\r\n/g,'\n').startsWith(marker+'\n')) throw Error('Refusing to overwrite manual reader: '+output);
    const matches=catalog.resources.filter(r=>r.id===meta.id || r.reader===output || (r.course===meta.course && r.path===`${meta.category}/${meta.slug}.md`));
    if (matches.length>1) throw Error('Conflicting lesson resources');
    const old=matches[0];
    if (old && (old.generatedLesson!==1 || old.id!==meta.id || old.reader!==output || old.path!==`${meta.category}/${meta.slug}.md`)) throw Error('Lesson conflicts with existing resource');
    const resource={id:meta.id,course:meta.course,category:meta.category,title:meta.title,path:`${meta.category}/${meta.slug}.md`,format:'MD',reader:output,generatedLesson:1,github:`https://github.com/${catalog.owner}/${course.repo}/blob/main/${source}`};
    const rendered=markdown(body,{source,output,root,catalog});
    if (!rendered.headings.length) throw Error('Lesson requires headings');
    const values={MARKER:marker,TITLE:esc(meta.title),LANG:meta.language,COURSE:esc(course.name),COURSE_ID:esc(course.id),CATEGORY:esc(category.name),CATEGORY_ID:esc(category.id),VERSION,BODY:rendered.html,TOC:tocHTML(rendered.headings),COMPONENTS:rendered.interactive?'<script src="../../assets/lesson-contract.js?v='+VERSION+'" defer></script><script src="../../assets/lesson-components.js?v='+VERSION+'" defer></script>':''};
    if (rendered.interactive) values.COMPONENTS='<link rel="stylesheet" href="../../assets/lesson-components.css?v='+VERSION+'">'+values.COMPONENTS;
    values.RICH_CONTENT=rendered.features.length?'<link rel="stylesheet" href="../../assets/lesson-rich.css?v=rich-lesson-1">':'';
    if(rendered.features.includes('math')) values.RICH_CONTENT='<link rel="stylesheet" href="../../assets/vendor/katex/katex.min.css?v=0.19.1">'+values.RICH_CONTENT;
    const template=fs.readFileSync(path.join(root,'templates/lesson.html'),'utf8').replace(/\r\n/g,'\n');
    const html=template.replace(/\{\{([A-Z_]+)\}\}/g,(_,key)=>{ if (!(key in values)) throw Error('Unknown template token'); return values[key]; });
    plans.push({target,html,resource,old});
  }
  // Validate every lesson before any generated file or catalog entry is changed.
  for (const plan of plans) { fs.mkdirSync(path.dirname(plan.target),{recursive:true}); if (!fs.existsSync(plan.target) || fs.readFileSync(plan.target,'utf8')!==plan.html) fs.writeFileSync(plan.target,plan.html); if (plan.old) catalog.resources[catalog.resources.indexOf(plan.old)]=plan.resource; else catalog.resources.push(plan.resource); }
  return plans.length;
}
module.exports = {buildLessons,markdown,metadata,codeViewer,stepper,VERSION};
