import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | mdc grid list/tiles/tile/primary', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    assert.expect(2);

    // Template block usage:
    await render(hbs`
      {{#mdc-grid-list/tiles/tile/primary as |primary|}}
        {{primary.primary-content src="my-image.jpg"}}
      {{/mdc-grid-list/tiles/tile/primary}}
    `);

    assert.dom('.mdc-grid-tile__primary').exists({ count: 1 });
    assert.dom('img.mdc-grid-tile__primary-content[src="my-image.jpg"]').exists({ count: 1 });
  });
});
