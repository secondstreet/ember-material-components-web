import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc tab bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{mdc-tab-bar}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#mdc-tab-bar links=false additional-indicator-classes="foo" as |bar|}}
        {{#bar.tab}}template block text{{/bar.tab}}
      {{/mdc-tab-bar}}
      {{mdc-tab-bar/indicator}}
    `);

    assert.dom('*').hasText('template block text');
    assert.dom('.mdc-tab-bar .mdc-tab-bar__indicator').exists('tab bar indicator appears');

    assert
      .dom('.mdc-tab-bar .mdc-tab-bar__indicator')
      .hasClass('foo', 'custom class names can be passed into the indicator');
  });
});
