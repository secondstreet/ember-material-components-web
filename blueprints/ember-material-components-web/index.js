module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies
  afterInstall: function() {
    return this.addPackagesToProject([
      { name: '@material/base', target: '0.2.5' },
      { name: '@material/animation', target: '0.3.1' },
      { name: '@material/theme', target: '0.2.0' },
      { name: '@material/checkbox', target: '0.4.5' },
      { name: '@material/drawer', target: '0.5.9' },
      { name: '@material/radio', target: '0.2.12' },
      { name: '@material/button', target: '0.5.0' },
      { name: '@material/fab', target: '0.3.16' },
      { name: '@material/card', target: '0.2.7' },
      { name: '@material/grid-list', target: '0.2.13' },
      { name: '@material/icon-toggle', target: '0.1.19' },
      { name: '@material/layout-grid', target: '0.4.4' },
      { name: '@material/elevation', target: '0.1.11' },
      { name: '@material/list', target: '0.2.17' },
      { name: '@material/form-field', target: '0.2.14' },
      { name: '@material/textfield', target: '0.3.6' },
      { name: '@material/menu', target: '0.4.5' },
      { name: '@material/toolbar', target: '0.4.7' },
      { name: '@material/tabs', target: '0.3.0' },
      { name: '@material/ripple', target: '0.8.6' },
      { name: '@material/linear-progress', target: '0.1.8' },
      { name: '@material/switch', target: '0.1.12' },
    ]);
  },
};
