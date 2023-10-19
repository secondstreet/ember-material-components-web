import { htmlSafe } from '@ember/template';
import { get, computed } from '@ember/object';

export default (prop) =>
  computed(`${prop}`, function () {
    const obj = get(this, prop);
    return htmlSafe(
      Object.keys(obj).reduce((acc, key) => {
        if (key !== '@each') {
          // avoid deprecation
          return `${acc} ${key}: ${get(this, `${prop}.${key}`)};`;
        }
        return acc;
      }, '')
    );
  });
