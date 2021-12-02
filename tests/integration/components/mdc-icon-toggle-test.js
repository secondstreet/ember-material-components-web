import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | mdc icon toggle', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(1);

    await render(hbs`
      {{#mdc-icon-toggle}}
        template block text
      {{/mdc-icon-toggle}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
