import globalEventHandlers from 'dummy/utils/global-event-handlers';
import { module, test } from 'qunit';

module('Unit | Utility | global event handlers');

test('it is an array of string event names', function(assert) {
  const result = globalEventHandlers;
  assert.ok(Array.isArray(result));
  assert.ok(result.every(x => typeof x === 'string'));
});
