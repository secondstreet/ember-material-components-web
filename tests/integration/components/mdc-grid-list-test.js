import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc grid list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(7);

    // Template block usage:
    await render(hbs`
      {{#mdc-grid-list
        tile-gutter-1=true
        header-caption=true
        twoline-caption=true
        icon-align="start"
        tile-aspect="16x9"
        as |list|
      }}
        {{#list.tiles}}
          template block text
        {{/list.tiles}}
      {{/mdc-grid-list}}
    `);

    assert.dom('.mdc-grid-list').exists({ count: 1 });
    assert.dom('.mdc-grid-list--tile-gutter-1').exists({ count: 1 });
    assert.dom('.mdc-grid-list--header-caption').exists({ count: 1 });
    assert.dom('.mdc-grid-list--twoline-caption').exists({ count: 1 });
    assert.dom('.mdc-grid-list--with-icon-align-start').exists({ count: 1 });
    assert.dom('.mdc-grid-list--tile-aspect-16x9').exists({ count: 1 });
    assert.dom('.mdc-grid-list__tiles').hasText('template block text');
  });
});
