/* Progressive enhancement of validated, static lesson components. Never runs lesson code. */
(() => {
  'use strict';
  const t = (key,values) => LearningI18n.t(key,values);
  document.querySelectorAll('.code-viewer').forEach(viewer => {
    const copy = viewer.querySelector('.code-copy'), status = viewer.querySelector('.copy-status'); copy.hidden = false;
    copy.onclick = async () => {
      try { await navigator.clipboard.writeText([...viewer.querySelectorAll('.line-source')].map(line=>line.textContent).join('\n')); status.dataset.i18n='codeCopied'; }
      catch { status.dataset.i18n='copyUnavailable'; }
      status.textContent=t(status.dataset.i18n);
    };
  });
  document.querySelectorAll('.step-visualizer').forEach(root => {
    let data;
    try { data = LessonContract.validate(JSON.parse(root.querySelector('.step-data').textContent)); }
    catch { return; } // Leave the complete static fallback and code intact.
    let index = 0;
    const controls = root.querySelector('.step-controls'), live = root.querySelector('.step-live'), fallback = root.querySelector('.step-fallback');
    function render() {
      const step = data.steps[index];
      root.querySelectorAll('[data-node]').forEach(node => {
        const active = node.dataset.node === step.active, visited = step.visited.includes(node.dataset.node);
        node.dataset.state = active ? 'active' : visited ? 'visited' : 'pending';
        node.classList.toggle('is-visited',visited);
        node.setAttribute('aria-label',node.textContent+' — '+t(active?'activeNode':visited?'visitedNode':'pendingNode'));
      });
      const end = root.querySelector('.step-end'); end.classList.toggle('is-current',step.active === null);
      end.setAttribute('aria-label',data.endLabel+(step.active === null?' — '+t('activeNode'):''));
      root.querySelectorAll('.code-line').forEach(line => {
        const active = Number(line.dataset.line) === step.line; line.classList.toggle('is-active',active);
        if (active) line.setAttribute('aria-current','step'); else line.removeAttribute('aria-current');
      });
      const position = root.querySelector('.step-position'); position.dataset.page=index+1; position.dataset.total=data.steps.length; position.dataset.i18n='stepPosition'; position.textContent=t('stepPosition',{page:index+1,total:data.steps.length});
      root.querySelector('.step-explanation').textContent=step.explanation[LearningPreferences.value.language];
      root.querySelector('.step-output').textContent=step.output || '—';
      controls.querySelector('[data-step-action=previous]').disabled=index===0;
      controls.querySelector('[data-step-action=next]').disabled=index===data.steps.length-1;
      controls.querySelector('[data-step-action=reset]').disabled=index===0;
    }
    function move(action) { index=action==='reset'?0:Math.max(0,Math.min(data.steps.length-1,index+(action==='next'?1:-1))); render(); }
    controls.addEventListener('click',event => { const action=event.target.closest('[data-step-action]'); if (action) move(action.dataset.stepAction); });
    root.addEventListener('keydown',event => {
      if (event.target !== root && !event.target.matches('[data-step-action]')) return;
      const action={ArrowLeft:'previous',ArrowRight:'next',Home:'reset'}[event.key]; if (action) { event.preventDefault(); move(action); }
    });
    document.addEventListener('preferenceschange',render);
    controls.hidden=false; live.hidden=false; fallback.open=false; render();
  });
})();
