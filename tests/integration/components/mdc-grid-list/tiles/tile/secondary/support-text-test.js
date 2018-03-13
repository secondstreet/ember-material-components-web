import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'mdc-grid-list/tiles/tile/secondary/support-text',
  'Integration | Component | mdc grid list/tiles/tile/secondary/support text',
  {
    integration: true,
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-grid-list/tiles/tile/secondary/support-text}}`);

  assert.equal(find('*').textContent.trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-grid-list/tiles/tile/secondary/support-text}}
      template block text
    {{/mdc-grid-list/tiles/tile/secondary/support-text}}
  `);

  assert.equal(find('*').textContent.trim(), 'template block text');
});
