import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { find } from 'ember-native-dom-helpers';

import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc tab bar scroller', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{#mdc-tab-bar-scroller as |scroller|}}
      {{#scroller.tab-bar links=false as |bar|}}
        {{#bar.tab}}
          One
        {{/bar.tab}}
        {{#bar.tab}}
          Two
        {{/bar.tab}}
        {{#bar.tab}}
          Three
        {{/bar.tab}}
      {{/scroller.tab-bar}}
    {{/mdc-tab-bar-scroller}}`);

    assert.dom('.mdc-tab-bar-scroller').exists();

    //TODO: Add better tests!
  });
});
