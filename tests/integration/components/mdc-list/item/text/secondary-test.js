import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-list/item/text/secondary', 'Integration | Component | mdc list/item/text/secondary', {
  integration: true,
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-list/item/text/secondary}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-list/item/text/secondary}}
      template block text
    {{/mdc-list/item/text/secondary}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
