import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-list', 'Integration | Component | mdc list', {
  integration: true
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

  assert.equal(this.$('.mdc-list-item').length, 3);
  assert.equal(this.$('.mdc-list-item:first-of-type').text().trim(), 'Item 1');
});
