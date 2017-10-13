import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-grid-list/tiles/tile', 'Integration | Component | mdc grid list/tiles/tile', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  // Template block usage:
  this.render(hbs`
    {{#mdc-grid-list/tiles/tile as |tile|}}
      {{#tile.primary}}
        template block text
      {{/tile.primary}}
      {{#tile.secondary}}
        template block text
      {{/tile.secondary}}
    {{/mdc-grid-list/tiles/tile}}
  `);

  assert.equal(this.$('li.mdc-grid-tile').length, 1);
  assert.equal(this.$('.mdc-grid-tile__primary').text().trim(), 'template block text');
  assert.equal(this.$('.mdc-grid-tile__secondary').text().trim(), 'template block text');
});
