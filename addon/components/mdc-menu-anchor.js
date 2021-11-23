import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  //region Ember Hooks
  classNames: Object.freeze(['mdc-menu-anchor']),
  //endregion

  //region Methods
  /**
   * @public
   * @returns {DOMRect|null}
   */
  getAnchorDimensions() {
    const el = get(this, 'element');
    if (!el) {
      return null;
    }
    return el.getBoundingClientRect();
  },
  //endregion
});
