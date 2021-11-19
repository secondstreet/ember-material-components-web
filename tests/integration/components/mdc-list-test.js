import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Template block usage:
    await render(hbs`
      {{#mdc-list as |list|}}
        {{#list.item}}Item 1{{/list.item}}
        {{#list.item}}Item 2{{/list.item}}
        {{#list.item}}Item 3{{/list.item}}
      {{/mdc-list}}
    `);

    assert.dom('.mdc-list-item').exists({ count: 3 });
    assert.dom(find('.mdc-list-item:first-of-type')).hasText('Item 1');
  });
});
