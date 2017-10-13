import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-toolbar', 'Integration | Component | mdc toolbar', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`
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

  assert.equal(this.$('.mdc-toolbar__title').text().trim(), 'Title text');
});
