import { findAll, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-grid-list', 'Integration | Component | mdc grid list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(7);

  // Template block usage:
  this.render(hbs`
    {{#mdc-grid-list
      tile-gutter-1=true
      header-caption=true
      twoline-caption=true
      icon-align="start"
      tile-aspect="16x9"
      as |list|
    }}
      {{#list.tiles as |tiles|}}
        template block text
      {{/list.tiles}}
    {{/mdc-grid-list}}
  `);

  assert.equal(findAll('.mdc-grid-list').length, 1);
  assert.equal(findAll('.mdc-grid-list--tile-gutter-1').length, 1);
  assert.equal(findAll('.mdc-grid-list--header-caption').length, 1);
  assert.equal(findAll('.mdc-grid-list--twoline-caption').length, 1);
  assert.equal(findAll('.mdc-grid-list--with-icon-align-start').length, 1);
  assert.equal(findAll('.mdc-grid-list--tile-aspect-16x9').length, 1);
  assert.equal(find('.mdc-grid-list__tiles').textContent.trim(), 'template block text');
});
