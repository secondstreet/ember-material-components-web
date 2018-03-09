import { find } from 'ember-native-dom-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-linear-progress', 'Integration | Component | mdc linear progress', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(5);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('isSecondary', false);
  this.set('myProgress', 0.5);
  this.set('isIndeterminate', false);
  this.set('mdcFoundation', {
    setProgress: (x) => {
      assert.equal(x, this.get('myProgress'));
    }
  });
  this.render(hbs`{{mdc-linear-progress secondary=isSecondary progress=myProgress indeterminate=isIndeterminate foundation=mdcFoundation}}`);

  assert.equal(find('*').textContent.trim(), '');

  assert.notOk(find('.mdc-linear-progress').classList.contains('mdc-linear-progress--indeterminate'), 'Progress bar is not in indeterminate state');

  this.set('myProgress', 0.8);

  this.set('isSecondary', true);
  this.set('isIndeterminate', true);
  assert.ok(find('.mdc-linear-progress').classList.contains('mdc-linear-progress--indeterminate'), 'Progress bar is in indeterminate state');
  assert.ok(find('.mdc-linear-progress').classList.contains('mdc-linear-progress--accent'), 'Progress bar is in secondary variation');
});
