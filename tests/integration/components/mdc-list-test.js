import { find, findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-list', 'Integration | Component | mdc list', {
  integration: true,
});

test('it renders', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#mdc-list as |list|}}
      {{#list.item}}Item 1{{/list.item}}
      {{#list.item}}Item 2{{/list.item}}
      {{#list.item}}Item 3{{/list.item}}
    {{/mdc-list}}
  `);

  assert.equal(findAll('.mdc-list-item').length, 3);
  assert.equal(find('.mdc-list-item:first-of-type').textContent.trim(), 'Item 1');
});
