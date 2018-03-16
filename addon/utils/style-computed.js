import { htmlSafe } from '@ember/string';
import { get, computed } from '@ember/object';

export default prop =>
  computed(`${prop}`, function() {
    return htmlSafe(
      Object.keys(get(this, prop)).reduce((acc, key) => `${acc} ${key}: ${get(this, `${prop}.${key}`)};`, '')
    );
  });
