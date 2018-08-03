module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies
  afterInstall: function() {
    return this.addPackagesToProject([
      { name: '@material/base', target: '0.35.0' },
      { name: '@material/animation', target: '0.34.0' },
      { name: '@material/theme', target: '0.38.0' },
      { name: '@material/checkbox', target: '0.38.0' },
      { name: '@material/drawer', target: '0.38.0' },
      { name: '@material/radio', target: '0.38.0' },
      { name: '@material/button', target: '0.38.0' },
      { name: '@material/fab', target: '0.38.0' },
      { name: '@material/layout-grid', target: '0.34.0' },
      { name: '@material/elevation', target: '0.38.0' },
      { name: '@material/list', target: '0.38.0' },
      { name: '@material/form-field', target: '0.38.0' },
      { name: '@material/textfield', target: '0.38.0' },
      { name: '@material/menu', target: '0.38.0' },
      { name: '@material/toolbar', target: '0.38.0' },
      { name: '@material/tabs', target: '0.38.0' },
      { name: '@material/ripple', target: '0.38.0' },
      { name: '@material/linear-progress', target: '0.38.0' },
      { name: '@material/switch', target: '0.38.0' },
    ]);
  },
};
