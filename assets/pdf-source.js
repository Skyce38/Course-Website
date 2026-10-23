/* Canonical local paths remain document IDs; remote bytes come only from this repo/main. */
(() => {
  'use strict';
  function paths(value, base) {
    if (!value) throw Error('Missing PDF');
    const supplied = decodeURIComponent(value);
    if (/[\\\x00-\x1f\x7f]/.test(supplied) || supplied.split('/').some(part => part === '.' || part === '..')) throw Error('Invalid path');
    const app = new URL(base), local = new URL(value, app);
    const decoded = decodeURIComponent(local.pathname);
    const relative = decoded.slice(app.pathname.length);
    if (local.origin !== app.origin || !decoded.startsWith(app.pathname) || local.username || local.password || local.search || local.hash || !/^courses\/[a-z0-9-]+\/(assignments|slides|summaries|tutoring|exams)\/(?:[^/]+\/)*[^/]+\.pdf$/i.test(relative) || decoded.includes('\\') || decoded.split('/').some(part => part === '.' || part === '..')) throw Error('Invalid PDF');
    const remote = new URL('https://raw.githubusercontent.com/Skyce38/Course-Website/main/'+relative.split('/').map(encodeURIComponent).join('/'));
    return {local,remote};
  }
  const pdfType = response => /^(application\/(pdf|octet-stream))(?:;|$)/i.test(response.headers.get('content-type') || '');
  async function resolve(source) {
    try {
      let response = await fetch(source.local,{method:'HEAD',cache:'no-cache',signal:AbortSignal.timeout(12000)});
      if ([405,501].includes(response.status)) {
        response = await fetch(source.local,{signal:AbortSignal.timeout(12000)});
        await response.body?.cancel();
      }
      if (response.ok && pdfType(response)) return {url:source.local.href,remote:false};
    } catch { /* Local preview may not contain newly synced files. */ }
    const response = await fetch(source.remote,{mode:'cors',credentials:'omit',redirect:'error',signal:AbortSignal.timeout(30000)});
    if (!response.ok || !pdfType(response)) throw Error('Unavailable PDF');
    const bytes = await response.arrayBuffer();
    if (!new TextDecoder('ascii').decode(bytes.slice(0,1024)).includes('%PDF-')) throw Error('Invalid PDF content');
    const url = URL.createObjectURL(new Blob([bytes],{type:'application/pdf'}));
    return {url,remote:true,release:() => URL.revokeObjectURL(url)};
  }
  window.LearningPDFSource = {paths,resolve};
})();
