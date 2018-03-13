import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-icon-toggle', 'Integration | Component | mdc icon toggle', {
  integration: true,
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#mdc-icon-toggle as |class|}}
      template block text
    {{/mdc-icon-toggle}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
