import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-textfield', 'Integration | Component | mdc textfield', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-textfield}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it detects if it is focused based upon classnames', function(assert) {
  const placeholderText='Hi I am the placeholder';
  this.set('placeholderText', placeholderText);

  this.render(hbs`{{mdc-textfield placeholder=placeholderText label='This is a Label'}}`);

  assert.notOk(this.$('input').attr('placeholder'), 'Without focus the placeholder is NOT displayed');
  this.$('input').trigger('focusin');
  assert.equal(this.$('input').attr('placeholder'), placeholderText, 'With focus the placeholder IS displayed');
});
