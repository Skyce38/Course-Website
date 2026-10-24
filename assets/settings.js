(() => {
  'use strict';
  const preferences = LearningPreferences;
  const gallery = document.querySelector('#theme-gallery');
  for (const [id, preset] of Object.entries(preferences.presets)) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-choice';
    button.dataset.preset = id;
    button.setAttribute('aria-pressed', 'false');
    const swatch = document.createElement('span');
    swatch.className = 'theme-swatch';
    swatch.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 3; i++) swatch.append(document.createElement('i'));
    const label = document.createElement('span');
    label.className = 'theme-name';
    label.dataset.i18n = preset.label;
    label.textContent = LearningI18n.t(preset.label);
    const selected = document.createElement('span');
    selected.className = 'theme-selected';
    selected.textContent = '✓';
    selected.setAttribute('aria-hidden', 'true');
    button.append(swatch, label, selected);
    button.onclick = () => {
      preferences.update({preset: id});
      if (!preferences.canPersist) status('localOnly');
    };
    gallery.append(button);
  }
  const status = key => {
    const node = document.querySelector('#settings-status');
    node.dataset.i18n = key;
    node.textContent = LearningI18n.t(key);
  };
  function refresh() {
    document.querySelectorAll('[data-layout-choice]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.layoutChoice === preferences.value.layout)));
    document.querySelectorAll('[data-preference]').forEach(control => {
      const value = preferences.value[control.dataset.preference];
      if (control.type === 'checkbox') control.checked = value;
      else control.value = value;
    });
    gallery.querySelectorAll('[data-preset]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.preset === preferences.value.preset));
      const palette = preferences.paletteFor(button.dataset.preset, document.documentElement.dataset.theme, preferences.value.custom);
      for (const [name, color] of Object.entries({bg:palette.bg, paper:palette.paper, primary:palette.accent, line:palette.line})) button.style.setProperty('--swatch-' + name, color);
    });
    document.querySelectorAll('[data-custom]').forEach(input => {
      input.value = preferences.value.custom[input.dataset.custom];
      document.querySelector('#custom-' + input.dataset.custom + '-value').textContent = input.value;
    });
    if (preferences.value.preset === 'custom') document.querySelector('#custom-theme').open = true;
  }
  document.querySelectorAll('[data-preference]').forEach(control => {
    control.onchange = () => {
      const name = control.dataset.preference;
      const value = name === 'font' ? Number(control.value) : control.type === 'checkbox' ? control.checked : control.value;
      preferences.update({[name]: value});
      if (!preferences.canPersist) status('localOnly');
    };
  });
  document.querySelectorAll('[data-layout-choice]').forEach(button => {
    button.onclick = () => {
      preferences.update({layout:button.dataset.layoutChoice});
      if (!preferences.canPersist) status('localOnly');
    };
  });
  document.querySelectorAll('[data-custom]').forEach(input => {
    input.oninput = () => {
      preferences.update({preset: 'custom', custom: {...preferences.value.custom, [input.dataset.custom]:input.value}});
      if (!preferences.canPersist) status('localOnly');
    };
  });
  document.querySelector('#theme-reset').onclick = () => {
    const {theme, preset, accent, custom} = preferences.defaults;
    preferences.update({theme, preset, accent, custom});
    status(preferences.canPersist ? 'resetSuccess' : 'localOnly');
  };
  document.addEventListener('preferenceschange', refresh);
  document.querySelector('#settings-export').onclick = () => {
    const data = JSON.stringify({version: 1, preferences: {...preferences.value}}, null, 2);
    const url = URL.createObjectURL(new Blob([data], {type: 'application/json'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'course-website-preferences.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const fileInput = document.querySelector('#settings-file');
  document.querySelector('#settings-import').onclick = () => fileInput.click();
  fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return;
    try {
      if (file.size > 16384) throw Error('File too large');
      const data = JSON.parse(await file.text());
      if (!data || data.version !== 1 || !data.preferences) throw Error('Invalid export');
      const next = preferences.validate(data.preferences);
      preferences.update(next);
      status(preferences.canPersist ? 'importSuccess' : 'localOnly');
    } catch { status('importError'); }
    fileInput.value = '';
  };
  document.querySelector('#settings-reset').onclick = () => {
    preferences.update(preferences.defaults);
    status(preferences.canPersist ? 'resetSuccess' : 'localOnly');
  };
  refresh();
  if (!preferences.canPersist) status('localOnly');
})();
