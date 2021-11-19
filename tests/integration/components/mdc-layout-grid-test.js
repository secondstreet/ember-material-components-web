import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc layout grid', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    // Template block usage:
    await render(hbs`
      {{#mdc-layout-grid as |grid|}}
        {{#grid.inner}}
          template block text
        {{/grid.inner}}
      {{/mdc-layout-grid}}
    `);

    assert.dom('.mdc-layout-grid').exists({ count: 1 });
    assert.dom('.mdc-layout-grid__inner').hasText('template block text');
  });
});
