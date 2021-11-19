/* eslint-disable ember/no-mixins, ember/no-new-mixins */

import EmberObject from '@ember/object';
import SupportsBubblesFalseMixin from 'ember-material-components-web/mixins/supports-bubbles-false';
import { module, test } from 'qunit';

module('Unit | Mixin | supports bubbles false', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let SupportsBubblesFalseObject = EmberObject.extend(SupportsBubblesFalseMixin);
    let subject = SupportsBubblesFalseObject.create();
    assert.ok(subject);
  });
});
