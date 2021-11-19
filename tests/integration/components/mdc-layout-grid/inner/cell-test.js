import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc layout grid/inner/cell', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(8);

    // Template block usage:
    await render(hbs`
      {{#mdc-layout-grid/inner/cell span=6 span-desktop=8 span-tablet=6 span-phone=4 order=3 align="top"}}
        template block text
      {{/mdc-layout-grid/inner/cell}}
    `);

    assert.dom('.mdc-layout-grid__cell').hasText('template block text');
    assert.dom('.mdc-layout-grid__cell--span-6').exists({ count: 1 });
    assert.dom('.mdc-layout-grid__cell--span-8-desktop').exists({ count: 1 });
    assert.dom('.mdc-layout-grid__cell--span-6-tablet').exists({ count: 1 });
    assert.dom('.mdc-layout-grid__cell--span-4-phone').exists({ count: 1 });
    assert.dom('.mdc-layout-grid__cell--order-3').exists({ count: 1 });
    assert.dom('.mdc-layout-grid__cell--align-top').exists({ count: 1 });

    // Template block usage:
    await render(hbs`
      {{#mdc-layout-grid/inner/cell as |cell|}}
        {{#cell.inner}}
          template block text
        {{/cell.inner}}
      {{/mdc-layout-grid/inner/cell}}
    `);

    assert.dom('.mdc-layout-grid__inner').hasText('template block text');
  });
});
