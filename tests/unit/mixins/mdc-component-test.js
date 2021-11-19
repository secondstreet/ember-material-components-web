/* eslint-disable ember/no-mixins, ember/no-new-mixins */

import EmberObject from '@ember/object';
import MdcComponentMixin from 'ember-material-components-web/mixins/mdc-component';
import { module, test } from 'qunit';

module('Unit | Mixin | mdc component', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let MdcComponentObject = EmberObject.extend(MdcComponentMixin);
    let subject = MdcComponentObject.create();
    assert.ok(subject);
  });
});
