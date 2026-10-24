/* Generated reader shell only; preferences and study state remain shared. */
(() => {
  'use strict';
  const sidebar = document.querySelector('#sidebar'), menu = document.querySelector('#menu'), overlay = document.querySelector('#overlay');
  const mobile = matchMedia('(max-width:800px)');
  function close() { sidebar.classList.remove('open'); overlay.hidden = true; menu.setAttribute('aria-expanded','false'); sidebar.inert = mobile.matches; }
  function fit() { close(); }
  menu.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) return close();
    sidebar.inert = false; sidebar.classList.add('open'); overlay.hidden = false; menu.setAttribute('aria-expanded','true'); sidebar.querySelector('a').focus();
  });
  overlay.addEventListener('click',close);
  sidebar.addEventListener('click',event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown',event => {
    if (!mobile.matches || !sidebar.classList.contains('open')) return;
    if (event.key === 'Escape') { close(); menu.focus(); }
    if (event.key === 'Tab') {
      const links = [...sidebar.querySelectorAll('a')], first = links[0], last = links.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change',fit); fit();
  document.querySelector('#font-less').onclick = () => LearningPreferences.update({font:Math.max(14,LearningPreferences.value.font-1)});
  document.querySelector('#font-more').onclick = () => LearningPreferences.update({font:Math.min(22,LearningPreferences.value.font+1)});
  document.querySelector('#print').onclick = () => window.print();
})();
