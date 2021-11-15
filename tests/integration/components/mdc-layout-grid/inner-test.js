import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc layout grid/inner', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // Template block usage:
    await render(hbs`
      {{#mdc-layout-grid/inner as |inner|}}
        {{#inner.cell}}
          template block text
        {{/inner.cell}}
      {{/mdc-layout-grid/inner}}
    `);

    assert.dom('.mdc-layout-grid__inner').exists({ count: 1 });
    assert.dom('.mdc-layout-grid__cell').hasText('template block text');
  });
});
