import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-grid-list/tiles/tile/secondary', 'Integration | Component | mdc grid list/tiles/tile/secondary', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  // Template block usage:
  this.render(hbs`
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

  assert.equal(this.$('i.mdc-grid-tile__icon').length, 1);
  assert.equal(this.$('.mdc-grid-tile__title').text().trim(), 'template block text');
  assert.equal(this.$('.mdc-grid-tile__support-text').text().trim(), 'template block text');
});
