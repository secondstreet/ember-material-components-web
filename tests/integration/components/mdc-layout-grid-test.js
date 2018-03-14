import { findAll, find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-layout-grid', 'Integration | Component | mdc layout grid', {
  integration: true,
});

test('it renders', function(assert) {
  assert.expect(2);

  // Template block usage:
  this.render(hbs`
    {{#mdc-layout-grid as |grid|}}
      {{#grid.inner}}
        template block text
      {{/grid.inner}}
    {{/mdc-layout-grid}}
  `);

  assert.equal(findAll('.mdc-layout-grid').length, 1);
  assert.equal(find('.mdc-layout-grid__inner').textContent.trim(), 'template block text');
});
