import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-layout-grid/inner/cell', 'Integration | Component | mdc layout grid/inner/cell', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(8);

  // Template block usage:
  this.render(hbs`
    {{#mdc-layout-grid/inner/cell span=6 span-desktop=8 span-tablet=6 span-phone=4 order=3 align="top"}}
      template block text
    {{/mdc-layout-grid/inner/cell}}
  `);

  assert.equal(this.$('.mdc-layout-grid__cell').text().trim(), 'template block text');
  assert.equal(this.$('.mdc-layout-grid__cell--span-6').length, 1);
  assert.equal(this.$('.mdc-layout-grid__cell--span-8-desktop').length, 1);
  assert.equal(this.$('.mdc-layout-grid__cell--span-6-tablet').length, 1);
  assert.equal(this.$('.mdc-layout-grid__cell--span-4-phone').length, 1);
  assert.equal(this.$('.mdc-layout-grid__cell--order-3').length, 1);
  assert.equal(this.$('.mdc-layout-grid__cell--align-top').length, 1);

  // Template block usage:
  this.render(hbs`
    {{#mdc-layout-grid/inner/cell as |cell|}}
      {{#cell.inner}}
        template block text
      {{/cell.inner}}
    {{/mdc-layout-grid/inner/cell}}
  `);

  assert.equal(this.$('.mdc-layout-grid__inner').text().trim(), 'template block text');
});
