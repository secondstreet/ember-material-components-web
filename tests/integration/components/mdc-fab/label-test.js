import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-fab/label', 'Integration | Component | mdc fab/label', {
  integration: true,
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // Template block usage:
  this.render(hbs`
    {{#mdc-fab/label}}
      template block text
    {{/mdc-fab/label}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
