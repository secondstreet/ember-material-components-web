import { findAll, find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc grid list/tiles/tile', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    // Template block usage:
    await render(hbs`
      {{#mdc-grid-list/tiles/tile as |tile|}}
        {{#tile.primary}}
          template block text
        {{/tile.primary}}
        {{#tile.secondary}}
          template block text
        {{/tile.secondary}}
      {{/mdc-grid-list/tiles/tile}}
    `);

    assert.dom('li.mdc-grid-tile').exists({ count: 1 });
    assert.dom('.mdc-grid-tile__primary').hasText('template block text');
    assert.dom('.mdc-grid-tile__secondary').hasText('template block text');
  });
});
