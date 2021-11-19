import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | mdc linear progress', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(5);
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.set('isSecondary', false);
    this.set('myProgress', 0.5);
    this.set('isIndeterminate', false);
    this.set('mdcFoundation', {
      setProgress: x => {
        assert.equal(x, this.get('myProgress'));
      },
    });
    await render(
      hbs`{{mdc-linear-progress secondary=isSecondary progress=myProgress indeterminate=isIndeterminate foundation=mdcFoundation}}`
    );

    assert.dom('*').hasText('');

    assert
      .dom('.mdc-linear-progress')
      .hasNoClass('mdc-linear-progress--indeterminate', 'Progress bar is not in indeterminate state');

    this.set('myProgress', 0.8);

    this.set('isSecondary', true);
    this.set('isIndeterminate', true);
    assert
      .dom('.mdc-linear-progress')
      .hasClass('mdc-linear-progress--indeterminate', 'Progress bar is in indeterminate state');
    assert
      .dom('.mdc-linear-progress')
      .hasClass('mdc-linear-progress--accent', 'Progress bar is in secondary variation');
  });
});
