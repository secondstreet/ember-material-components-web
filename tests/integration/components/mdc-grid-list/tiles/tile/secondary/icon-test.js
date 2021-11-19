import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc grid list/tiles/tile/secondary/icon', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`<div>{{mdc-grid-list/tiles/tile/secondary/icon}}</div>`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      <div>
        {{#mdc-grid-list/tiles/tile/secondary/icon}}
          template block text
        {{/mdc-grid-list/tiles/tile/secondary/icon}}
      </div>
    `);

    assert.dom('*').hasText('template block text');
  });
});
