/* Native PDF embedding; direct links remain available on unsupported browsers. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const params = new URLSearchParams(location.search);
  const app = new URL('../', document.currentScript.src);
  let file;
  const status = (key, fallback) => {
    $('#pdf-status').dataset.i18n = key;
    $('#pdf-status').textContent = window.LearningI18n?.t(key) || fallback;
  };
  try {
    if (!params.get('file')) throw Error('Missing file');
    file = new URL(params.get('file'), app);
    const decoded = decodeURIComponent(file.pathname);
    if (file.origin !== app.origin || !decoded.startsWith(app.pathname + 'courses/') || decoded.split('/').some(part => part === '.' || part === '..') || !/\.pdf$/i.test(file.pathname) || file.username || file.password || file.search || file.hash) throw Error('Invalid file');
  } catch {
    status('invalidPDF', 'ลิงก์ PDF ไม่ถูกต้อง เลือกเอกสารจากหน้าวิชาอีกครั้ง');
    return;
  }
  $('#pdf-title').textContent = decodeURIComponent(file.pathname.split('/').pop());
  document.title = $('#pdf-title').textContent + ' · Course Website';
  const course = decodeURIComponent(file.pathname.slice((app.pathname + 'courses/').length).split('/')[0]);
  $('#pdf-back').href = './#course/' + encodeURIComponent(course);
  $('#pdf-open').href = file.href;
  $('#pdf-download').href = file.href;
  $('#pdf-download').download = $('#pdf-title').textContent;
  $('#pdf-fallback').hidden = false;
  let page = Math.min(10000, Math.max(1, Number(params.get('page')) || 1));
  page = Math.trunc(page);
  $('#pdf-zoom').value = LearningPreferences.value.pdfZoom;
  function showPage() {
    $('#pdf-page').value = page;
    $('#pdf-prev').disabled = page === 1;
    $('#pdf-next').disabled = page === 10000;
    const zoom = $('#pdf-zoom').value;
    const fragment = '#page=' + page + (zoom === 'page-width' ? '&view=FitH' : '&zoom=' + zoom) + '&toolbar=' + (LearningPreferences.value.pdfToolbar ? '1' : '0');
    // Chrome's native viewer ignores fragment-only navigations after loading.
    // A fresh iframe makes page and zoom parameters apply on every navigation.
    const frame = $('#pdf-frame');
    const replacement = frame.cloneNode(false);
    replacement.src = file.href + fragment;
    replacement.onerror = frame.onerror;
    frame.replaceWith(replacement);
    const route = new URL(location.href);
    route.searchParams.set('page', page);
    history.replaceState(null, '', route);
  }
  $('#pdf-controls').onsubmit = event => {
    event.preventDefault();
    if (!$('#pdf-page').checkValidity()) return;
    page = Number($('#pdf-page').value); showPage();
  };
  $('#pdf-prev').onclick = () => { page = Math.max(1, page - 1); showPage(); };
  $('#pdf-next').onclick = () => { page = Math.min(10000, page + 1); showPage(); };
  $('#pdf-zoom').onchange = showPage;
  $('#pdf-frame').onerror = () => {
    $('#pdf-frame').hidden = true;
    status('pdfError', 'ไม่สามารถแสดงเอกสารได้ ลองเปิด PDF โดยตรงหรือดาวน์โหลด');
  };
  let checking = false;
  async function load() {
    if (checking) return;
    checking = true;
    status('loadingPDF', 'กำลังตรวจเอกสาร…');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(file, {method: 'HEAD', signal: controller.signal, cache: 'no-cache'});
      if (!response.ok || !/application\/(pdf|octet-stream)/i.test(response.headers.get('content-type') || '')) throw Error('Unavailable PDF');
      $('#pdf-frame').hidden = false;
      $('#pdf-controls').hidden = false;
      showPage();
      status('pdfReady', 'พร้อมอ่าน · เปิด PDF โดยตรงได้หากตัวอ่านไม่แสดง');
    } catch {
      $('#pdf-frame').hidden = true;
      $('#pdf-controls').hidden = true;
      status('pdfError', 'ไม่สามารถแสดงเอกสารได้ ลองเปิด PDF โดยตรงหรือดาวน์โหลด');
    } finally { clearTimeout(timeout); checking = false; }
  }
  $('#pdf-retry').onclick = load;
  load();
})();
