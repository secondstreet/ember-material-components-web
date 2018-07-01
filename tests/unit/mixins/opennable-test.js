import EmberObject from '@ember/object';
import OpennableMixin from 'ember-material-components-web/mixins/opennable';
import { module, test } from 'qunit';

module('Unit | Mixin | opennable');

// Replace this with your real tests.
test('it works', function(assert) {
  let OpennableObject = EmberObject.extend(OpennableMixin);
  let subject = OpennableObject.create();
  assert.ok(subject);
});
