import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc grid list/tiles', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // Template block usage:
    await render(hbs`
      {{#mdc-grid-list/tiles as |tiles|}}
        {{#tiles.tile as |tile|}}
          template block text
        {{/tiles.tile}}
      {{/mdc-grid-list/tiles}}
    `);

    assert.dom('ul.mdc-grid-list__tiles').exists({ count: 1 });
    assert.dom('.mdc-grid-tile').hasText('template block text');
  });
});
