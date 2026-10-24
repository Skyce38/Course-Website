/* Presentation only: reuse existing heading links, menus and shared reading state. */
(() => {
  'use strict';
  const toc = document.querySelector('.reader-toc,#sidebar nav');
  if (!toc) return;
  const links = [...toc.querySelectorAll('a[href^="#"]')].map(link => {
    try { return {link,target:document.getElementById(decodeURIComponent(link.hash.slice(1)))}; }
    catch { return {link,target:null}; }
  }).filter(item => item.target);
  if (!links.length) return;
  toc.setAttribute('role','navigation');
  toc.setAttribute('data-i18n-aria-label','readerContents');
  toc.setAttribute('aria-label',window.LearningI18n.t('readerContents'));
  if (toc.classList.contains('reader-toc')) {
    const label = document.createElement('p'); label.className = 'reader-contents-label'; label.dataset.i18n = 'readerContents'; label.textContent = window.LearningI18n.t('readerContents'); toc.before(label);
  }
  const breadcrumb = document.querySelector('.breadcrumbs');
  const title = document.querySelector('.reading-page h1');
  if (breadcrumb && title) {
    const context = document.createElement('span'); context.className = 'reader-context'; context.textContent = title.textContent; context.title = title.textContent; breadcrumb.append(context);
  }
  let frame = null;
  const header = document.querySelector('.topbar');
  function headerOffset() {
    if (header) document.documentElement.style.setProperty('--reader-header-offset',Math.ceil(header.getBoundingClientRect().height)+20+'px');
  }
  function draw() {
    frame = null;
    headerOffset();
    const modern = document.documentElement.dataset.layout === 'modern';
    const top = (document.querySelector('.topbar')?.getBoundingClientRect().bottom || 0)+48;
    const visible = links.filter(item => item.target.getClientRects().length && item.link.getClientRects().length);
    const current = visible.filter(item => item.target.getBoundingClientRect().top <= top).at(-1) || visible[0];
    for (const item of links) {
      const active = modern && item === current;
      item.link.classList.toggle('is-current',active);
      if (active) item.link.setAttribute('aria-current','location'); else item.link.removeAttribute('aria-current');
    }
  }
  function schedule() { if (frame === null) frame = requestAnimationFrame(draw); }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  window.addEventListener('hashchange',schedule);
  document.addEventListener('preferenceschange',schedule);
  // Quiz/lesson tabs can change which existing heading links are relevant.
  document.addEventListener('click',schedule);
  if (header) new ResizeObserver(schedule).observe(header);
  window.LearningI18n.apply(); headerOffset(); schedule();
})();
