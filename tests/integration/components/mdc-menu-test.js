import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-menu', 'Integration | Component | mdc menu', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-menu}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-menu as |menu|}}
      {{#menu.item}}template block text{{/menu.item}}
    {{/mdc-menu}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
