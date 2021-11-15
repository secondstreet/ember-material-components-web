import { findAll, find } from 'ember-native-dom-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc grid list/tiles/tile/secondary', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(3);

    // Template block usage:
    await render(hbs`
      {{#mdc-grid-list/tiles/tile/secondary as |secondary|}}
        {{#secondary.icon as |class|}}
          <i class="material-icons {{class}}">star_border</i>
        {{/secondary.icon}}
        {{#secondary.title}}
          template block text
        {{/secondary.title}}
        {{#secondary.support-text}}
          template block text
        {{/secondary.support-text}}
      {{/mdc-grid-list/tiles/tile/secondary}}
    `);

    assert.dom('i.mdc-grid-tile__icon').exists({ count: 1 });
    assert.dom('.mdc-grid-tile__title').hasText('template block text');
    assert.dom('.mdc-grid-tile__support-text').hasText('template block text');
  });
});
