import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-drawer/toolbar-spacer', 'Integration | Component | mdc drawer/toolbar spacer', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-drawer/toolbar-spacer}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-drawer/toolbar-spacer}}
      template block text
    {{/mdc-drawer/toolbar-spacer}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
