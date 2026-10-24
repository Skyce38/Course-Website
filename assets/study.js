/* Local reading history and explicit document completion, independent of preferences/quiz data. */
(() => {
  'use strict';
  const key = 'skyce-learning-study';
  const app = new URL('../', document.currentScript.src);
  const fields = ['id','course','category','path','title','format','reader','url','github'];
  let resources = [], courses = [], current = null, pdf = null;
  const t = name => window.LearningI18n?.t(name) || name;
  let pending = null, restoring = false, restoreVersion = 0;
  let ready;
  const loaded = new Promise(resolve => { ready = resolve; });
  function cleanPosition(input = {}) {
    if (!input || typeof input !== 'object') return {};
    const result = {};
    for (const name of ['page','scroll','offset','left','sectionOffset']) {
      const value = input[name];
      if (Number.isFinite(value) && value >= (name === 'page' ? 1 : name === 'sectionOffset' ? -1e8 : 0) && value <= 1e8) result[name] = name === 'page' ? Math.min(10000, Math.trunc(value)) : value;
    }
    if (input.zoom === 'page-width' || ['100','125','150','200'].includes(String(input.zoom))) result.zoom = String(input.zoom);
    if (typeof input.anchor === 'string' && input.anchor.startsWith('#') && input.anchor.length < 2048) result.anchor = input.anchor;
    return result;
  }
  function safeURL(value) {
    try {
      const url = new URL(value, app);
      if (url.username || url.password) return false;
      return url.origin === app.origin && url.pathname.startsWith(app.pathname) || url.protocol === 'https:' && url.hostname === 'github.com' && url.pathname.startsWith('/Skyce38/Course-Website/');
    } catch { return false; }
  }
  function cleanResource(input) {
    if (!input || typeof input !== 'object' || !['id','course','category','path','title','format'].every(name => typeof input[name] === 'string' && input[name].length > 0 && input[name].length <= 2048)) return null;
    if (!/^[a-z0-9-]+$/.test(input.course) || !['assignments','slides','summaries','tutoring','exams'].includes(input.category) || input.path.includes('\\') || input.path.startsWith('/') || input.path.split('/').some(part => part === '.' || part === '..')) return null;
    const result = Object.fromEntries(fields.filter(name => typeof input[name] === 'string').map(name => [name,input[name]]));
    for (const name of ['reader','url','github']) if (result[name] && !safeURL(result[name])) return null;
    if (Number.isInteger(input.page) && input.page >= 1 && input.page <= 10000) result.page = input.page;
    if (typeof input.anchor === 'string' && input.anchor.startsWith('#') && input.anchor.length < 2048) result.anchor = input.anchor;
    result.openedAt = Number.isFinite(input.openedAt) ? input.openedAt : Date.now();
    return result;
  }
  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '{}');
      const recent = Array.isArray(value?.recent) ? value.recent.map(cleanResource).filter(Boolean) : [];
      const positions = Object.fromEntries(Object.entries(value?.positions || {}).filter(([id]) => id.length <= 2048).map(([id,position]) => [id,cleanPosition(position)]));
      for (const item of recent) if (!positions[item.id]) positions[item.id] = cleanPosition(item);
      return {recent:[...new Map(recent.map(item => [item.id,item])).values()].sort((a,b) => b.openedAt-a.openedAt).slice(0,20), positions, completed:Array.isArray(value?.completed) ? [...new Set(value.completed.filter(id => typeof id === 'string' && id.length <= 2048))] : []};
    } catch { return {recent:[],completed:[],positions:{}}; }
  }
  let state = read();
  function changed() { document.dispatchEvent(new CustomEvent('studychange')); updateControls(); }
  function save(defer = false) {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* Session tracking remains usable. */ }
    if (defer) setTimeout(changed, 0); else changed();
  }
  function flush() {
    if (pending !== null) clearTimeout(pending);
    pending = null;
    try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* Session fallback. */ }
  }
  function position(id) { return {...state.positions[id]}; }
  function setPosition(id, value) {
    state.positions[id] = {...position(id),...cleanPosition(value)};
    if (pending === null) pending = setTimeout(flush, 400);
  }
  function resetPosition(id) {
    delete state.positions[id];
    const entry = state.recent.find(item => item.id === id);
    if (entry) { delete entry.page; delete entry.anchor; }
    flush();
    document.dispatchEvent(new CustomEvent('readingpositionreset', {detail:{id}}));
    if (current?.id === id && !pdf) { restoring = true; window.scrollTo({top:0,behavior:'instant'}); history.replaceState(null,'',location.pathname+location.search); setTimeout(() => { restoring = false; },100); }
  }
  function open(resource, position = {}) {
    const item = cleanResource({...resource,...position,openedAt:Date.now()});
    if (!item) return;
    if (Object.keys(position).length) setPosition(item.id,position);
    state.recent = [item,...state.recent.filter(entry => entry.id !== item.id)].slice(0,20);
    save(true);
  }
  function toggleCompleted(id) {
    state.completed = state.completed.includes(id) ? state.completed.filter(value => value !== id) : [...state.completed,id];
    save();
  }
  function progress(items) {
    const ids = [...new Set(items.map(item => item.id))];
    return {completed:ids.filter(id => state.completed.includes(id)).length,total:ids.length};
  }
  function resumeLink(resource, fallback) {
    const entry = position(resource.id);
    const url = new URL(fallback, app);
    url.searchParams.set('resume','1');
    if (/\.pdf$/i.test(resource.path) && entry?.page) url.searchParams.set('page',entry.page);
    if (entry.zoom) url.searchParams.set('zoom',entry.zoom);
    if (resource.reader && entry?.anchor) url.hash = entry.anchor;
    return url.href;
  }
  function updateControls() {
    document.querySelectorAll('[data-complete]').forEach(button => {
      const complete = state.completed.includes(button.dataset.complete);
      const set = (name,value) => { if (button.getAttribute(name) !== value) button.setAttribute(name,value); };
      set('aria-pressed', String(complete));
      set('data-i18n', complete ? 'documentCompleted' : 'markComplete');
      const text = t(button.dataset.i18n);
      if (window.LearningI18n?.setText) window.LearningI18n.setText(button, text);
      else if (button.textContent !== text) button.textContent = text;
      const labelKey = complete ? 'markIncompleteLabel' : 'markCompleteLabel';
      const label = window.LearningI18n?.t(labelKey,{title:button.dataset.documentTitle || ''}) || labelKey;
      set('data-i18n-aria-label',labelKey); set('data-i18n-title',labelKey);
      set('aria-label',label); set('title',label);
    });
  }
  function showReader(resource, position = {}) {
    current = resource;
    let bar = document.querySelector('#study-reader-actions');
    if (!bar) {
      bar = document.createElement('div'); bar.id = 'study-reader-actions'; bar.className = 'study-reader-actions';
      const button = document.createElement('button'); button.type = 'button'; button.className = 'icon-button study-complete'; bar.append(button);
      const reset = document.createElement('button'); reset.type = 'button'; reset.className = 'icon-button'; reset.dataset.i18n = 'resetReadingPosition'; reset.setAttribute('data-i18n-aria-label','resetReadingPositionLabel'); reset.setAttribute('data-i18n-title','resetReadingPositionLabel'); reset.textContent = t('resetReadingPosition'); reset.onclick = () => resetPosition(current.id); bar.append(reset);
      const host = document.querySelector('#pdf-controls,.reader-nav,.reader-top,#main-content');
      if (!host) return;
      if (host.tagName === 'MAIN') host.prepend(bar); else host.before(bar);
    }
    const button = bar.querySelector('button'); button.dataset.complete = resource.id; button.dataset.documentTitle = resource.title;
    bar.querySelector('button:last-child').dataset.documentTitle = resource.title;
    updateControls(); window.LearningI18n?.apply(); open(resource);
  }
  function identify() {
    const all = [...resources,...state.recent];
    if (pdf) {
      const path = decodeURIComponent(pdf.file.pathname.slice(app.pathname.length));
      const resource = all.find(item => path === 'courses/' + item.course + '/' + item.path);
      if (resource) showReader(resource,{page:pdf.page});
      else {
        const parts = path.split('/'), course = courses.find(item => item.id === parts[1]);
        if (course && parts[0] === 'courses' && parts.length >= 4) showReader({id:course.id+'-'+parts.slice(2).join('/'),course:course.id,category:parts[2],path:parts.slice(2).join('/'),title:parts.at(-1).replace(/\.pdf$/i,''),format:'PDF'},{page:pdf.page});
      }
      return;
    }
    const canonical = path => path.replace(/index\.html$/, '');
    const matches = all.filter(item => item.reader || item.url).filter(item => canonical(new URL(item.reader || item.url, app).pathname) === canonical(location.pathname));
    const resource = matches.find(item => new URL(item.reader || item.url, app).hash === location.hash) || matches.find(item => !new URL(item.reader || item.url, app).hash);
    if (resource && current?.id !== resource.id) { captureHTML(); showReader(resource); restoreHTML(); }
  }
  function captureHTML() {
    if (!current || pdf || restoring) return;
    const top = document.documentElement.dataset.layout === 'modern' ? (document.querySelector('.topbar')?.getBoundingClientRect().bottom || 76)+48 : 100;
    const headings = [...document.querySelectorAll('h1[id],h2[id],h3[id],section[id],article[id]')].filter(node => node.getClientRects().length && node.getBoundingClientRect().top <= top);
    const section = headings.at(-1);
    setPosition(current.id,{scroll:window.scrollY,anchor:section ? '#'+encodeURIComponent(section.id) : location.hash || '#',sectionOffset:section ? -section.getBoundingClientRect().top : 0});
  }
  async function restoreHTML(force = false) {
    const saved = position(current.id), version = ++restoreVersion;
    const navigation = window.performance?.getEntriesByType('navigation')[0]?.type;
    const reopening = navigation === 'reload' || navigation === 'back_forward';
    if (!Object.keys(saved).length || (!force && !reopening && location.hash && new URL(location.href).searchParams.get('resume') !== '1' && location.hash !== saved.anchor)) { restoring = false; return; }
    restoring = true;
    history.scrollRestoration = 'manual';
    if (document.readyState !== 'complete') await new Promise(resolve => window.addEventListener('load',resolve,{once:true}));
    await document.fonts?.ready;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    if (version !== restoreVersion) return;
    let section;
    try { section = document.getElementById(decodeURIComponent((saved.anchor || '').slice(1))); } catch { /* Invalid anchor falls back to scroll. */ }
    if (section && section.getClientRects().length) window.scrollTo({top:section.getBoundingClientRect().top+window.scrollY+(saved.sectionOffset || 0),behavior:'instant'});
    else window.scrollTo({top:saved.scroll || 0,behavior:'instant'});
    requestAnimationFrame(() => { restoring = false; if (force) captureHTML(); });
  }
  window.LearningStudy = {
    ready:loaded,
    configure(items, subjects) { resources = items; courses = subjects; ready(); }, open, toggleCompleted, progress, resumeLink, position, setPosition, resetPosition, flush, refreshControls:updateControls,
    get resources() { return resources; }, get courses() { return courses; },
    get recent() { return state.recent; }, isCompleted:id => state.completed.includes(id),
    setPDF(file,page) { pdf = {file:new URL(file,app),page}; if (!current) identify(); return current?.id; }
  };
  document.addEventListener('click', event => {
    const complete = event.target.closest('[data-complete]');
    if (complete) { event.preventDefault(); toggleCompleted(complete.dataset.complete); return; }
    const link = event.target.closest('[data-study-open]');
    if (!link) return;
    const resource = resources.find(item => item.id === link.dataset.studyOpen) || state.recent.find(item => item.id === link.dataset.studyOpen);
    if (resource) {
      open(resource);
    }
  });
  document.addEventListener('auxclick', event => {
    if (event.button !== 1) return;
    const link = event.target.closest('[data-study-open]');
    const resource = link && resources.find(item => item.id === link.dataset.studyOpen);
    if (resource) open(resource);
  });
  document.addEventListener('preferenceschange', updateControls);
  let layoutPending = false;
  document.addEventListener('layoutwillchange', () => {
    if (current && !pdf) { captureHTML(); restoring = true; layoutPending = true; }
  });
  document.addEventListener('preferenceschange', () => {
    if (layoutPending) { layoutPending = false; restoreHTML(true); }
  });
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) { state = read(); changed(); } });
  // A restored BFCache page must see completion/history written on the page just left.
  window.addEventListener('pageshow', event => { if (event.persisted) { state = read(); changed(); } });
  window.addEventListener('hashchange', () => { if (current && !pdf) identify(); });
  window.addEventListener('scroll', captureHTML, {passive:true});
  window.addEventListener('pagehide', () => { captureHTML(); flush(); });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') { captureHTML(); flush(); } });
  document.addEventListener('DOMContentLoaded', async () => {
    if (!location.pathname.startsWith(app.pathname+'read/') && !location.pathname.startsWith(app.pathname+'courses/') && !location.pathname.endsWith('/pdf.html')) return;
    try {
      const response = await fetch(new URL('catalog.json',app));
      if (!response.ok) throw Error('Catalog unavailable');
      const catalog = await response.json(); resources = catalog.resources; courses = catalog.courses;
      identify();
    } catch { identify(); }
    ready();
  });
})();
