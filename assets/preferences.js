/* Shared across the library and readers. No network or account required. */
(() => {
  'use strict';
  const key = 'skyce-learning-preferences';
  const app = new URL('../', document.currentScript.src);
  const presets = {
    forest: {label:'forestGreen', light:['#285f4b','#f5f5ee','#fffefa'], dark:['#acd2b5','#14251e','#20352b']},
    ocean: {label:'oceanBlue', light:['#17618c','#edf6fb','#fbfdff'], dark:['#91cdeb','#101f30','#1a3046']},
    lavender: {label:'lavender', light:['#7051a1','#f4f0fb','#fdfbff'], dark:['#ccb3ed','#201a30','#302640']},
    sakura: {label:'sakuraPink', light:['#9d4165','#fff0f4','#fffafd'], dark:['#f1b1c9','#2d1924','#402635']},
    sunset: {label:'warmSunset', light:['#9c4d24','#fff3e7','#fffcf5'], dark:['#f2be8e','#2b1e18','#3e2d23']},
    midnight: {label:'midnight', light:['#465b92','#edf0f8','#fafbff'], dark:['#a8bbf1','#0c1223','#172139']},
    custom: {label:'customTheme'}
  };
  const legacyPresets = {forest:'forest', blue:'ocean', plum:'lavender'};
  const defaults = {theme: 'light', preset: 'forest', accent: 'forest', custom: {primary:'#285f4b', background:'#f5f5ee', surface:'#fffefa'}, font: 17, width: 'comfortable', language: 'th', pdfZoom: 'page-width', pdfToolbar: true};
  const choices = {theme: ['light', 'dark'], preset: Object.keys(presets), accent: ['forest', 'blue', 'plum'], width: ['narrow', 'comfortable', 'wide'], language: ['th', 'en'], pdfZoom: ['page-width', '100', '125', '150']};
  const rgb = color => color.slice(1).match(/../g).map(channel => parseInt(channel, 16));
  const mix = (a, b, amount) => '#' + rgb(a).map((channel, i) => Math.round(channel * (1 - amount) + rgb(b)[i] * amount).toString(16).padStart(2, '0')).join('');
  function luminance(color) {
    return rgb(color).map(channel => {
      const n = channel / 255;
      return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4;
    }).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
  }
  function contrast(a, b) {
    const first = luminance(a), second = luminance(b);
    return (Math.max(first, second) + .05) / (Math.min(first, second) + .05);
  }
  function readable(color, backgrounds, minimum = 4.5) {
    const score = candidate => Math.min(...backgrounds.map(bg => contrast(candidate, bg)));
    if (score(color) >= minimum) return color;
    const target = score('#000000') > score('#ffffff') ? '#000000' : '#ffffff';
    for (let step = 1; step <= 100; step++) {
      const candidate = mix(color, target, step / 100);
      if (score(candidate) >= minimum) return candidate;
    }
    return target;
  }
  function paletteFor(preset, mode, custom = defaults.custom) {
    let seeds = presets[preset][mode];
    if (preset === 'custom') seeds = mode === 'dark'
      ? [mix(custom.primary, '#ffffff', .45), mix(custom.background, '#090c14', .91), mix(custom.surface, '#121722', .86)]
      : [custom.primary, custom.background, custom.surface];
    const [primary, bg, requestedSurface] = seeds;
    const ink = readable(mode === 'dark' ? '#edf2fa' : '#20242c', [bg]);
    // Opposing custom backgrounds/surfaces cannot share readable text: harmonize the surface.
    let paper = requestedSurface;
    for (let step = 1; contrast(ink, paper) < 4.5 && step <= 100; step++) paper = mix(requestedSurface, bg, step / 100);
    let soft = mix(primary, paper, .90);
    if (contrast(ink, soft) < 4.5) soft = paper;
    const surfaces = [bg, paper, soft];
    const accent = readable(primary, surfaces);
    let code = mix(paper, bg, .60);
    if (contrast(ink, code) < 4.5) code = paper;
    return {bg, paper, ink, soft, accent,
      muted:readable(mix(ink, bg, .30), [...surfaces, code]), line:readable(mix(ink, bg, .70), [bg, paper], 3),
      'on-accent':readable('#ffffff', [accent]), gold:soft,
      code, 'code-text':readable(ink, [code]), danger:readable(mode === 'dark' ? '#ffb4a9' : '#aa332a', surfaces),
      'syntax-keyword':readable(mode === 'dark' ? '#e8bcff' : '#704099', [code]),
      'syntax-string':readable(mode === 'dark' ? '#aad8bb' : '#266d45', [code]),
      'syntax-number':readable(mode === 'dark' ? '#9bd2fa' : '#265e91', [code])};
  }
  function validate(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw Error('Invalid preferences');
    const result = {...defaults, custom: {...defaults.custom}};
    for (const [name, values] of Object.entries(choices)) {
      if (name in input) {
        const candidate = name === 'theme' && ['system', 'auto'].includes(input[name]) ? 'light' : input[name];
        if (!values.includes(candidate)) throw Error('Invalid ' + name);
        result[name] = candidate;
      }
    }
    if (!('preset' in input) && input.accent) result.preset = legacyPresets[input.accent];
    if ('custom' in input) {
      if (!input.custom || typeof input.custom !== 'object' || Array.isArray(input.custom)) throw Error('Invalid custom theme');
      for (const name of ['primary', 'background', 'surface']) {
        if (typeof input.custom[name] !== 'string' || !/^#[0-9a-f]{6}$/i.test(input.custom[name])) throw Error('Invalid custom ' + name);
        result.custom[name] = input.custom[name].toLowerCase();
      }
    }
    if ('font' in input) {
      if (!Number.isInteger(input.font) || input.font < 14 || input.font > 22) throw Error('Invalid font');
      result.font = input.font;
    }
    if ('pdfToolbar' in input) {
      if (typeof input.pdfToolbar !== 'boolean') throw Error('Invalid PDF toolbar');
      result.pdfToolbar = input.pdfToolbar;
    }
    return result;
  }
  let value, canPersist = true;
  let raw = '{}';
  try { raw = localStorage.getItem(key) || '{}'; } catch { canPersist = false; }
  try {
    const saved = JSON.parse(raw);
    value = validate(saved);
    if (['system', 'auto'].includes(saved.theme)) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch { canPersist = false; }
    }
  } catch { value = validate({}); }
  function apply() {
    const root = document.documentElement;
    root.dataset.theme = value.theme;
    root.dataset.accent = value.accent;
    root.dataset.preset = value.preset;
    const palette = paletteFor(value.preset, root.dataset.theme, value.custom);
    for (const [name, color] of Object.entries(palette)) root.style.setProperty('--' + name, color);
    root.style.colorScheme = root.dataset.theme;
    root.dataset.width = value.width;
    root.lang = value.language;
    root.style.setProperty('--text-size', value.font + 'px');
    root.style.setProperty('--reading-size', value.font + 'px');
    document.querySelectorAll('#theme, #theme-toggle').forEach(button => {
      button.textContent = value.theme === 'dark' ? '☀' : '☾';
      button.setAttribute('aria-label', value.language === 'en'
        ? (value.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode')
        : (value.theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'));
      button.setAttribute('aria-pressed', String(root.dataset.theme === 'dark'));
    });
    document.querySelectorAll('#font-value, #font-size').forEach(node => node.textContent = value.font);
    document.dispatchEvent(new CustomEvent('preferenceschange', {detail: {...value}}));
  }
  function update(patch) {
    const incoming = {...value, ...patch};
    if ('accent' in patch && !('preset' in patch)) incoming.preset = legacyPresets[patch.accent];
    const next = validate(incoming);
    Object.assign(value, next);
    try { localStorage.setItem(key, JSON.stringify(value)); canPersist = true; } catch { canPersist = false; }
    apply();
  }
  function cycleTheme() { update({theme: value.theme === 'dark' ? 'light' : 'dark'}); }
  window.LearningPreferences = {value, defaults, presets, paletteFor, contrast, validate, update, apply, cycleTheme, get canPersist() { return canPersist; }};
  window.addEventListener('storage', event => {
    if (event.key !== key && event.key !== null) return;
    try { Object.assign(value, validate(JSON.parse(event.newValue || '{}'))); apply(); } catch { /* Ignore invalid external data. */ }
  });
  apply();
  document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.endsWith('/settings.html')) {
      const toolbar = document.querySelector('.top-actions, .toolbar, .foundation-header nav');
      if (toolbar && !toolbar.querySelector('[data-settings-link], a[href$="settings.html"]')) {
        const link = document.createElement('a');
        link.href = new URL('settings.html', app).href;
        link.className = 'icon-button';
        link.dataset.settingsLink = '';
        link.dataset.i18n = 'settings';
        link.textContent = 'ตั้งค่า';
        toolbar.append(link);
      }
    }
    document.querySelectorAll('#theme, #theme-toggle').forEach(button => button.onclick = cycleTheme);
    apply();
  });
})();
