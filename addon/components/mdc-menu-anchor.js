import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../templates/components/mdc-menu-anchor';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-menu-anchor'],
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
