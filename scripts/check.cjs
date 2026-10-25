/* Dependency-free checks. Run from the repository root: node scripts/check.cjs */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const catalog = JSON.parse(fs.readFileSync('catalog.json', 'utf8'));
assert.equal(new Set(catalog.resources.map(r => r.id)).size, catalog.resources.length, 'Duplicate resource IDs');
// Every local course PDF must be included, even before GitHub sync can see it.
function checkPDFs(folder, course, category) {
  if (!fs.existsSync(folder)) return;
  for (const entry of fs.readdirSync(folder, {withFileTypes:true})) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) checkPDFs(file, course, category);
    else if (entry.isFile() && /\.pdf$/i.test(entry.name)) {
      const relative = path.relative(course.folder || 'courses/' + course.id, file).split(path.sep).join('/');
      const matches = catalog.resources.filter(r => r.course === course.id && r.path === relative);
      assert.equal(matches.length, 1, 'PDF missing or duplicated; run build: ' + file);
      assert.equal(matches[0].category, category.id);
      assert.equal(matches[0].format, 'PDF');
    }
  }
}
for (const course of catalog.courses) for (const category of catalog.categories) checkPDFs(path.join(course.folder || 'courses/' + course.id, category.id), course, category);
const exists = file => assert.ok(fs.existsSync(file), 'Missing file: ' + file);
const htmlFiles = ['index.html', 'settings.html', 'pdf.html', 'courses/oop-python/index.html', ...catalog.resources.filter(r => r.reader).map(r => r.reader)];
for (const resource of catalog.resources) {
  exists('courses/' + resource.course + '/' + resource.path);
  if (resource.reader) exists(resource.reader);
  if (resource.url) {
    const url = new URL(resource.url, 'https://example.test/Course-Website/');
    exists(decodeURIComponent(url.pathname.replace('/Course-Website/', '')) + (url.pathname.endsWith('/') ? 'index.html' : ''));
  }
}
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const [,asset] of html.matchAll(/(?:src|href)="([^" ]*assets\/(?:preferences\.(?:js|css)|layouts\.css|readers\.(?:js|css)|(?:practice(?:-contract)?|lesson(?:-(?:components|contract))?)\.(?:js|css)|i18n\.js|study\.js|settings\.js|pdf(?:-source)?\.js)[^" ]*)"/g)) {
    assert.equal(new URL(asset,'https://example.test/').searchParams.get('v'),'phase8-exam-1',file+': version shared UI assets together to prevent stale bundles');
  }
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new vm.Script(match[1], {filename: file});
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, script => script.startsWith('<script src=') ? script : '');
  for (const match of markup.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const link = match[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(link)) continue;
    const local = path.resolve(path.dirname(file), decodeURIComponent(link.split(/[?#]/)[0]));
    exists(local);
  }
}
for (const file of fs.readdirSync('assets').filter(file => file.endsWith('.js'))) new vm.Script(fs.readFileSync('assets/' + file, 'utf8'), {filename: file});
const embedded = fs.readFileSync('index.html', 'utf8').match(/const catalog=([\s\S]*?);const \$=/);
assert.deepEqual(JSON.parse(embedded[1]), catalog, 'Run node scripts/build.cjs to refresh the embedded catalog');
// Exercise shared preference validation without installing a test runner.
const root = {dataset:{},style:{setProperty(){}}};
let migrated, beforeLayout;
const context = {URL,console,CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail}},matchMedia:()=>{throw Error('OS theme queries are disabled')},localStorage:{getItem:()=>'{"theme":"system","preset":"ocean","font":19}',setItem(key,value){migrated=JSON.parse(value)}},document:{currentScript:{src:'https://example.test/Course-Website/assets/preferences.js'},documentElement:root,querySelectorAll:()=>[],dispatchEvent(event){if(event.type==='layoutwillchange')beforeLayout={from:root.dataset.layout,to:event.detail.to}},addEventListener(){}},window:{addEventListener(){}}};
vm.runInNewContext(fs.readFileSync('assets/preferences.js','utf8'), context);
const preferences = context.window.LearningPreferences;
assert.equal(root.dataset.theme, 'light');
assert.equal(root.dataset.layout,'classic','Existing preferences without layout must remain Classic');
assert.equal(migrated.theme, 'light');
assert.equal(migrated.preset, 'ocean');
assert.equal(migrated.font, 19);
assert.equal(preferences.validate({theme:'auto',preset:'sakura'}).preset, 'sakura');
preferences.cycleTheme();
assert.equal(root.dataset.theme, 'dark');
preferences.cycleTheme();
assert.equal(root.dataset.theme, 'light');
assert.equal(preferences.value.preset, 'ocean');
let colorFlushes=0;
context.getComputedStyle=()=>{assert.equal(root.dataset.themeSwitching,'','Scoped transitions must be suppressed during the final color flush');colorFlushes++;return {backgroundColor:'final'};};
context.document.querySelectorAll=selector=>selector.startsWith('.breadcrumbs>a')?[{}]:[];
preferences.cycleTheme();preferences.cycleTheme();
assert.equal(colorFlushes,2);assert.equal(root.dataset.themeSwitching,undefined,'Rapid toggles must not leave suppression enabled');
context.document.querySelectorAll=()=>[];
assert.equal(preferences.validate({}).layout,'classic','New users start in Classic');
assert.equal(preferences.validate({theme:'dark',language:'en'}).layout,'classic','Older exports default to Classic');
preferences.update({layout:'modern'});
assert.equal(root.dataset.layout,'modern','Layout applies synchronously');
assert.equal(beforeLayout.from,'classic','Readers snapshot before layout CSS changes');
assert.equal(beforeLayout.to,'modern');
assert.equal(preferences.value.preset,'ocean','Layout must preserve other preferences');
assert.equal(migrated.layout,'modern','Layout must persist');
assert.throws(()=>preferences.validate({layout:'unknown'}));
preferences.update({layout:'classic'});
console.log('PASS: Classic defaults/legacy imports, layout validation/persistence and synchronous root application');
preferences.update({theme:'light',font:22});
assert.equal(root.dataset.theme, 'light');
assert.equal(preferences.value.font, 22);
for (const input of [null, [], {font:999}, {theme:'invalid'}, {pdfToolbar:'false'}, {language:'xx'}]) assert.throws(()=>preferences.validate(input));
assert.equal(preferences.value.font, 22, 'Invalid imports must not mutate current preferences');
assert.equal(preferences.validate({accent:'blue'}).preset, 'ocean', 'Migrate old accent exports');
assert.equal(preferences.validate({accent:'plum'}).preset, 'lavender');
for (const input of [{preset:'missing'}, {custom:null}, {custom:{primary:'red',background:'#ffffff',surface:'#ffffff'}}]) assert.throws(()=>preferences.validate(input));
const customCases = [
  {primary:'#ffffff',background:'#ffffff',surface:'#000000'},
  {primary:'#000000',background:'#000000',surface:'#ffffff'},
  {primary:'#808080',background:'#808080',surface:'#ffffff'},
  {primary:'#ffff00',background:'#00ff00',surface:'#ff0000'},
  {primary:'#ff00ff',background:'#0000ff',surface:'#00ffff'}
];
for (const preset of Object.keys(preferences.presets)) for (const mode of ['light','dark']) {
  for (const custom of preset === 'custom' ? customCases : [undefined]) {
    const p = preferences.paletteFor(preset, mode, custom);
    for (const background of [p.bg,p.paper,p.soft]) for (const foreground of [p.ink,p.muted,p.accent]) assert.ok(preferences.contrast(foreground,background)>=4.5, `${preset}/${mode}: readable text`);
    assert.ok(preferences.contrast(p['on-accent'],p.accent)>=4.5, `${preset}/${mode}: button contrast`);
    for (const foreground of [p['code-text'],p.muted,p['syntax-keyword'],p['syntax-string'],p['syntax-number']]) assert.ok(preferences.contrast(foreground,p.code)>=4.5, `${preset}/${mode}: code contrast`);
    for (const background of [p.bg,p.paper]) assert.ok(preferences.contrast(p.line,background)>=3, `${preset}/${mode}: border contrast`);
  }
}
console.log('PASS: all theme palettes in light/dark, custom contrast safeguards, legacy migration and invalid-color rejection');
console.log(`PASS: ${catalog.courses.length} courses, ${catalog.resources.length} documents, ${htmlFiles.length} pages, local links, JS syntax, catalog consistency and preference validation`);
require('./check-study.cjs');
require('./check-i18n.cjs');
require('./check-pdf-source.cjs');
require('./check-lessons.cjs');
require('./check-lesson-rich.cjs');
require('./check-catalog-navigation.cjs');
require('./check-practice.cjs');
require('./check-reading.cjs');
require('./check-exam.cjs');
