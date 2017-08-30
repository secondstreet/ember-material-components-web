import Ember from 'ember';
import SupportsBubblesFalseMixin from 'ember-material-components-web/mixins/supports-bubbles-false';
import { module, test } from 'qunit';

module('Unit | Mixin | supports bubbles false');

// Replace this with your real tests.
test('it works', function(assert) {
  let SupportsBubblesFalseObject = Ember.Object.extend(SupportsBubblesFalseMixin);
  let subject = SupportsBubblesFalseObject.create();
  assert.ok(subject);
});
