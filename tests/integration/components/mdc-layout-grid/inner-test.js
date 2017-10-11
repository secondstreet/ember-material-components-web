import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-layout-grid/inner', 'Integration | Component | mdc layout grid/inner', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Template block usage:
  this.render(hbs`
    {{#mdc-layout-grid/inner as |inner|}}
      {{#inner.cell}}
        template block text
      {{/inner.cell}}
    {{/mdc-layout-grid/inner}}
  `);

  assert.equal(this.$('.mdc-layout-grid__inner').length, 1);
  assert.equal(this.$('.mdc-layout-grid__cell').text().trim(), 'template block text');
});
