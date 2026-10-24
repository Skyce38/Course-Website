/* Audit authored UI keys and parameterized labels without browser dependencies. */
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm'), assert = require('node:assert/strict');
const source = fs.readFileSync('assets/i18n.js','utf8');
const strings = vm.runInNewContext('('+source.match(/const strings = (\{[\s\S]*?\n  \});/)[1]+')');
for (const [key,pair] of Object.entries(strings)) {
  assert.equal(pair.length,2,key);
  assert.match(pair[0],/[\u0e00-\u0e7f]/,key+' needs Thai');
  assert.match(pair[1],/[A-Za-z]/,key+' needs English');
  assert.deepEqual([...pair[0].matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(),[...pair[1].matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(),key+' placeholders must match');
}
let count = 0;
function scan(folder) {
  for (const item of fs.readdirSync(folder,{withFileTypes:true})) {
    if (['.git','vendor','node_modules','_design-references'].includes(item.name)) continue;
    const file = path.join(folder,item.name);
    if (item.isDirectory()) scan(file);
    else if (/\.(html|js)$/.test(item.name)) {
      const text = fs.readFileSync(file,'utf8');
      for (const pattern of [/data-i18n(?:-(?:aria-label|title|placeholder|aria-valuetext))?=["']([\w]+)["']/g,/\bt\(['"]([\w]+)['"]/g,/dataset\.i18n\s*=\s*['"]([\w]+)['"]/g,/setAttribute\(['"]data-i18n(?:-[\w-]+)?['"],\s*['"](\w+)['"]/g]) {
        for (const [,key] of text.matchAll(pattern)) { assert.ok(strings[key],file+': missing translation '+key); count++; }
      }
    }
  }
}
scan('.');
const context = {window:{},document:{addEventListener(){}},LearningPreferences:{value:{language:'th'}}};
vm.runInNewContext(source,context);
assert.equal(context.window.LearningI18n.t('markComplete'),'ทำเครื่องหมายว่าอ่านจบ');
assert.equal(context.window.LearningI18n.t('resetReadingPosition'),'เริ่มอ่านใหม่');
assert.equal(context.window.LearningI18n.translate('studyProgress'),'ความคืบหน้ารายวิชา');
assert.equal(context.window.LearningI18n.translate('recentReading'),'เอกสารที่เปิดล่าสุด');
assert.equal(context.window.LearningI18n.t('continueReadingLabel',{title:'Week1'}),'อ่านต่อ: Week1');
context.LearningPreferences.value.language = 'en';
assert.equal(context.window.LearningI18n.t('recentReading'),'Recently Opened');
assert.equal(context.window.LearningI18n.t('studyProgress'),'Study Progress');
assert.equal(context.window.LearningI18n.t('markCompleteLabel',{title:'Week1'}),'Mark completed: Week1');
console.log(`PASS: ${Object.keys(strings).length} bilingual UI keys, ${count} authored key references, matching placeholders and parameterized accessibility labels`);
