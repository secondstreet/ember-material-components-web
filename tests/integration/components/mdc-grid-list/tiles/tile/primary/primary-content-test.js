import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc grid list/tiles/tile/primary/primary content', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{mdc-grid-list/tiles/tile/primary/primary-content}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#mdc-grid-list/tiles/tile/primary/primary-content}}
        template block text
      {{/mdc-grid-list/tiles/tile/primary/primary-content}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
