import { find, triggerEvent } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-text-field', 'Integration | Component | mdc text-field', {
  integration: true,
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-text-field}}`);

  assert.equal(find('*').textContent.trim(), '');
});

test('it detects if it is focused based upon classnames', async function(assert) {
  const placeholderText = 'Hi I am the placeholder';
  this.set('placeholderText', placeholderText);

  this.render(hbs`{{mdc-text-field placeholder=placeholderText label='This is a Label'}}`);

  assert.notOk(find('input').getAttribute('placeholder'), 'Without focus the placeholder is NOT displayed');
  await triggerEvent('input', 'focusin');
  assert.equal(find('input').getAttribute('placeholder'), placeholderText, 'With focus the placeholder IS displayed');
});
