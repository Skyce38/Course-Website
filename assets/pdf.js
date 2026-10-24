/* Local PDF.js rendering with observable scrolling and native/download fallbacks. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  const app = new URL('../', document.currentScript.src);
  const viewer = $('#pdf-pages');
  const status = key => { $('#pdf-status').dataset.i18n = key; $('#pdf-status').textContent = window.LearningI18n?.t(key) || key; };
  let file, sources, resolved, doc, id, page = 1, zoom = LearningPreferences.value.pdfZoom, native = false, changing = false, checking = false, generation = 0;
  let sheets = [], tasks = new Map(), observer, scrollFrame;
  try {
    sources = window.LearningPDFSource.paths(params.get('file'),app);
    file = sources.local;
  } catch { status('invalidPDF'); return; }
  $('#pdf-title').textContent = decodeURIComponent(file.pathname.split('/').pop());
  document.title = $('#pdf-title').textContent+' · Course Website';
  $('#pdf-back').href = './#course/'+encodeURIComponent(decodeURIComponent(file.pathname.slice((app.pathname+'courses/').length).split('/')[0]));
  $('#pdf-open').href = $('#pdf-download').href = file.href;
  $('#pdf-download').download = $('#pdf-title').textContent;
  $('#pdf-fallback').hidden = false;
  const validZoom = value => ['page-width','100','125','150','200'].includes(String(value));
  const clampPage = value => Math.min(doc?.numPages || 10000,Math.max(1,Math.trunc(Number(value)) || 1));
  function controls() {
    $('#pdf-page').value = page;
    $('#pdf-page').max = doc?.numPages || 10000;
    $('#pdf-total').textContent = doc ? '/ '+doc.numPages : '';
    $('#pdf-prev').disabled = page === 1;
    $('#pdf-next').disabled = page === (doc?.numPages || 10000);
    $('#pdf-zoom').value = zoom;
    const route = new URL(location.href); route.searchParams.set('page',page); route.searchParams.set('zoom',zoom); history.replaceState(null,'',route);
  }
  function snapshot() {
    const sheet = sheets[page-1];
    return {page,zoom,offset:sheet ? Math.max(0,(viewer.scrollTop-sheet.offsetTop)/sheet.clientHeight) : 0,left:sheet ? viewer.scrollLeft/sheet.clientWidth : 0};
  }
  function remember() {
    if (!id || changing) return;
    if (!native && sheets.length) page = sheets.findLastIndex(sheet => sheet.offsetTop <= viewer.scrollTop+2)+1 || 1;
    window.LearningStudy.setPosition(id,native ? {page,zoom,offset:0,left:0} : snapshot());
  }
  function nativePage() {
    const frame = $('#pdf-frame'), replacement = frame.cloneNode(false);
    replacement.src = resolved.url+'#page='+page+(zoom === 'page-width' ? '&view=FitH' : '&zoom='+zoom)+'&toolbar='+(LearningPreferences.value.pdfToolbar ? '1' : '0');
    replacement.hidden = false; frame.replaceWith(replacement); controls(); remember();
  }
  function nativeFallback() {
    if (!resolved) return;
    native = true; observer?.disconnect(); viewer.hidden = true; $('#pdf-controls').hidden = false;
    $('#pdf-note').dataset.i18n = 'nativePDFNote'; $('#pdf-note').textContent = window.LearningI18n.t('nativePDFNote');
    nativePage(); status('pdfReady');
  }
  async function render(sheet, token) {
    if (sheet.firstChild || tasks.has(sheet)) return;
    tasks.set(sheet,null);
    try {
      const pdfPage = await doc.getPage(Number(sheet.dataset.page));
      if (token !== generation || !sheet.isConnected) return;
      const viewport = pdfPage.getViewport({scale:sheet.clientWidth/pdfPage.getViewport({scale:1}).width});
      const canvas = document.createElement('canvas');
      // Bound backing-store memory on high-density mobile displays and large slides.
      const ratio = Math.min(window.devicePixelRatio || 1,2,Math.sqrt(8e6/(viewport.width*viewport.height)));
      canvas.width = Math.ceil(viewport.width*ratio); canvas.height = Math.ceil(viewport.height*ratio);
      sheet.append(canvas);
      const task = pdfPage.render({canvasContext:canvas.getContext('2d'),viewport,transform:[ratio,0,0,ratio,0,0]});
      tasks.set(sheet,task); await task.promise;
    } catch (error) { if (error.name !== 'RenderingCancelledException' && token === generation) { nativeFallback(); } }
    finally { tasks.delete(sheet); }
  }
  async function layout(position = {}) {
    changing = true; const token = ++generation;
    observer?.disconnect(); for (const task of tasks.values()) task?.cancel(); tasks.clear();
    viewer.replaceChildren(); sheets = []; viewer.hidden = false; $('#pdf-frame').hidden = true;
    const width = Math.max(100,viewer.clientWidth-(innerWidth <= 600 ? 12 : 24)-2);
    // Measure all page ratios first, so later rendering cannot shift the saved location.
    const sizes = await Promise.all(Array.from({length:doc.numPages},(_,i) => doc.getPage(i+1).then(p => p.getViewport({scale:1}))));
    if (token !== generation) return;
    sizes.forEach((size,i) => {
      const sheet = document.createElement('div'); sheet.className = 'pdf-sheet'; sheet.dataset.page = i+1;
      sheet.setAttribute('role','img'); sheet.setAttribute('data-i18n-aria-label','pdfPageLabel'); sheet.setAttribute('aria-label',window.LearningI18n.t('pdfPageLabel',{page:i+1}));
      const scale = zoom === 'page-width' ? width/size.width : Number(zoom)/100;
      sheet.style.width = size.width*scale+'px'; sheet.style.height = size.height*scale+'px'; viewer.append(sheet); sheets.push(sheet);
    });
    page = clampPage(position.page || page);
    const sheet = sheets[page-1];
    viewer.scrollTop = sheet.offsetTop+Math.min(.999,position.offset || 0)*sheet.clientHeight;
    viewer.scrollLeft = Math.min(1,position.left || 0)*sheet.clientWidth;
    observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) render(entry.target,token);
        else if (!tasks.has(entry.target)) entry.target.replaceChildren();
      }
    },{root:viewer,rootMargin:'600px 0px'});
    sheets.forEach(sheet => observer.observe(sheet));
    controls(); requestAnimationFrame(() => { if (token === generation) { changing = false; remember(); } });
  }
  function navigate(value) {
    page = clampPage(value);
    if (native) nativePage();
    else { changing = true; viewer.scrollTop = sheets[page-1].offsetTop; viewer.scrollLeft = 0; controls(); changing = false; remember(); }
  }
  viewer.addEventListener('scroll',() => {
    if (changing || native || !doc) return;
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = null;
      const top = viewer.scrollTop+2;
      page = sheets.findLastIndex(sheet => sheet.offsetTop <= top)+1 || 1;
      controls(); remember();
    });
  },{passive:true});
  $('#pdf-controls').onsubmit = event => { event.preventDefault(); if ($('#pdf-page').checkValidity()) navigate($('#pdf-page').value); };
  $('#pdf-prev').onclick = () => navigate(page-1);
  $('#pdf-next').onclick = () => navigate(page+1);
  $('#pdf-zoom').onchange = () => { const saved = snapshot(); zoom = $('#pdf-zoom').value; if (native) nativePage(); else layout(saved); };
  $('#pdf-native').onclick = nativeFallback;
  document.addEventListener('readingpositionreset',event => {
    if (event.detail.id !== id) return;
    zoom = LearningPreferences.value.pdfZoom;
    if (native) { page = 1; nativePage(); } else layout({page:1});
  });
  let resize;
  let layoutPosition = null;
  document.addEventListener('layoutwillchange',() => {
    if (doc && !native) {
      if (!changing) remember();
      layoutPosition = changing ? window.LearningStudy.position(id) : snapshot(); changing = true;
    }
  });
  document.addEventListener('preferenceschange',() => {
    if (layoutPosition) { const saved = layoutPosition; layoutPosition = null; layout(saved); }
  });
  window.addEventListener('resize',() => { clearTimeout(resize); if (doc && !native) resize = setTimeout(() => layout(snapshot()),150); });
  window.addEventListener('pagehide',() => { remember(); window.LearningStudy?.flush(); });
  document.addEventListener('visibilitychange',() => { if (document.visibilityState === 'hidden') { remember(); window.LearningStudy?.flush(); } });
  async function load() {
    if (checking) return;
    checking = true; $('#pdf-native').disabled = true; status('loadingPDF');
    try {
      await window.LearningStudy?.ready;
      id = window.LearningStudy?.setPDF(file.href,1);
      const saved = window.LearningStudy?.position(id) || {};
      page = clampPage(params.has('resume') ? saved.page || params.get('page') : params.get('page') || saved.page);
      zoom = validZoom(params.get('zoom')) ? params.get('zoom') : validZoom(saved.zoom) ? saved.zoom : zoom;
      resolved?.release?.(); resolved = null;
      // These direct links remain usable if remote CORS/HTTP validation fails.
      $('#pdf-open').href = $('#pdf-download').href = sources.remote.href;
      resolved = await window.LearningPDFSource.resolve(sources);
      $('#pdf-open').href = $('#pdf-download').href = resolved.url;
      try {
        const pdfjs = await import('./vendor/pdfjs/build/pdf.min.mjs');
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('assets/vendor/pdfjs/build/pdf.worker.min.mjs',app).href;
        const vendor = new URL('assets/vendor/pdfjs/',app).href;
        doc = await pdfjs.getDocument({url:resolved.url,cMapUrl:vendor+'cmaps/',cMapPacked:true,standardFontDataUrl:vendor+'standard_fonts/',wasmUrl:vendor+'wasm/',iccUrl:vendor+'iccs/',isEvalSupported:false}).promise;
        native = false; $('#pdf-controls').hidden = false;
        $('#pdf-note').dataset.i18n = 'trackedPDFNote'; $('#pdf-note').textContent = window.LearningI18n.t('trackedPDFNote');
        await layout({...saved,page:clampPage(page),offset:page === saved.page ? saved.offset : 0}); status('pdfReady');
      } catch { nativeFallback(); }
    } catch { $('#pdf-frame').hidden = viewer.hidden = $('#pdf-controls').hidden = true; status('pdfError'); }
    finally { checking = false; $('#pdf-native').disabled = !resolved; }
  }
  $('#pdf-retry').onclick = load;
  load();
})();
