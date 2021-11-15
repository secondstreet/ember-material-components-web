import { find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc icon toggle', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(1);

    await render(hbs`
      {{#mdc-icon-toggle as |class|}}
        template block text
      {{/mdc-icon-toggle}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
