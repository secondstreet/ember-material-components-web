import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc list/item/end detail', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`<div>{{mdc-list/item/end-detail}}</div>`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      <div>
        {{#mdc-list/item/end-detail}}
          template block text
        {{/mdc-list/item/end-detail}}
      </div>
    `);

    assert.dom('*').hasText('template block text');
  });
});
