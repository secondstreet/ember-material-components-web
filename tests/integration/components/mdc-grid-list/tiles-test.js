import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-grid-list/tiles', 'Integration | Component | mdc grid list/tiles', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Template block usage:
  this.render(hbs`
    {{#mdc-grid-list/tiles as |tiles|}}
      {{#tiles.tile as |tile|}}
        template block text
      {{/tiles.tile}}
    {{/mdc-grid-list/tiles}}
  `);

  assert.equal(this.$('ul.mdc-grid-list__tiles').length, 1);
  assert.equal(this.$('.mdc-grid-tile').text().trim(), 'template block text');
});
