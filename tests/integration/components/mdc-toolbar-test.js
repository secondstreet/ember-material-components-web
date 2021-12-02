import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | mdc toolbar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      {{#mdc-toolbar as |toolbar|}}
        {{#toolbar.row as |row|}}
          {{#row.section as |section|}}
            {{#section.title}}
              Title text
            {{/section.title}}
          {{/row.section}}
        {{/toolbar.row}}
      {{/mdc-toolbar}}
    `);

    assert.dom('.mdc-toolbar__title').hasText('Title text');
  });
});
