/* Shared build/browser contract. Data only: no evaluated code or subject-specific execution. */
((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LessonContract = api;
})(typeof globalThis === 'object' ? globalThis : this, () => {
  'use strict';
  const check = (condition, message) => { if (!condition) throw Error('Lesson data: '+message); };
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  const text = (value, max = 2000) => typeof value === 'string' && value.length > 0 && value.length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value);
  const id = value => typeof value === 'string' && /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(value);
  function keys(value, allowed) { check(object(value), 'object required'); check(Object.keys(value).every(key => allowed.includes(key)), 'unknown field'); }
  function validate(data) {
    keys(data,['version','id','title','code','nodes','steps','startLabel','endLabel']);
    check(data.version === 1 && id(data.id), 'version/id');
    check(text(data.title,200) && text(data.code,12000) && data.code.split('\n').length <= 200 && !data.code.includes('\r'), 'title/code');
    check(text(data.startLabel,40) && text(data.endLabel,40), 'endpoint labels');
    check(Array.isArray(data.nodes) && data.nodes.length > 0 && data.nodes.length <= 20, 'nodes');
    const ids = new Set();
    for (const node of data.nodes) {
      keys(node,['id','label']); check(id(node.id) && !ids.has(node.id) && text(node.label,80), 'unique node id/label'); ids.add(node.id);
    }
    check(Array.isArray(data.steps) && data.steps.length > 0 && data.steps.length <= 200, 'steps');
    for (const step of data.steps) {
      keys(step,['line','active','visited','output','explanation']);
      check(Number.isInteger(step.line) && step.line >= 1 && step.line <= data.code.split('\n').length, 'code line');
      check(step.active === null || ids.has(step.active), 'active node');
      check(Array.isArray(step.visited) && step.visited.every(value => ids.has(value)) && new Set(step.visited).size === step.visited.length, 'visited nodes');
      check(typeof step.output === 'string' && step.output.length <= 4000, 'output');
      keys(step.explanation,['th','en']); check(text(step.explanation.th) && text(step.explanation.en), 'bilingual explanation');
    }
    return data;
  }
  return {validate};
});
