import { hbs } from 'ember-cli-htmlbars';
import { find, focus } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | mdc textfield', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{mdc-textfield}}`);

    assert.dom('*').hasText('');
  });

  test('it detects if it is focused based upon classnames', async function (assert) {
    const placeholderText = 'Hi I am the placeholder';
    this.set('placeholderText', placeholderText);

    await render(hbs`{{mdc-textfield placeholder=this.placeholderText label="This is a Label"}}`);

    assert.notOk(find('input').getAttribute('placeholder'), 'Without focus the placeholder is NOT displayed');
    await focus('input');
    assert.dom('input').hasAttribute('placeholder', placeholderText, 'With focus the placeholder IS displayed');
  });
});
