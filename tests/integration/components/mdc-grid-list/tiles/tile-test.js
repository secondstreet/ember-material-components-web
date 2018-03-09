import { findAll, find } from 'ember-native-dom-helpers';
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

  assert.equal(findAll('li.mdc-grid-tile').length, 1);
  assert.equal(find('.mdc-grid-tile__primary').textContent.trim(), 'template block text');
  assert.equal(find('.mdc-grid-tile__secondary').textContent.trim(), 'template block text');
});
