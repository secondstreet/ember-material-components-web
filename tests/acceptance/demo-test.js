import { click, visit } from 'ember-native-dom-helpers';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | demo');

test('visiting /', async function(assert) {
  await visit('/');

  await click('.toggle-demo-visibility');
  assert.ok(true);
});
