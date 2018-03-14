import { findAll } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-grid-list/tiles/tile/primary', 'Integration | Component | mdc grid list/tiles/tile/primary', {
  integration: true,
});

test('it renders', function(assert) {
  assert.expect(2);

  // Template block usage:
  this.render(hbs`
    {{#mdc-grid-list/tiles/tile/primary as |primary|}}
      {{primary.primary-content src="my-image.jpg"}}
    {{/mdc-grid-list/tiles/tile/primary}}
  `);

  assert.equal(findAll('.mdc-grid-tile__primary').length, 1);
  assert.equal(findAll('img.mdc-grid-tile__primary-content[src="my-image.jpg"]').length, 1);
});
