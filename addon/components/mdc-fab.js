/* eslint-disable ember/no-mixins */

import Component from '@ember/component';
import events from '../utils/global-event-handlers';
import MDCComponent from '../mixins/mdc-component';

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  mini: false,
  /**
   * @type {Boolean}
   */
  plain: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * @type {?String}
   */
  'aria-label': null,
  //endregion

  //region Ember Hooks
  tagName: 'button',
  classNames: Object.freeze(['mdc-fab']),
  attributeBindings: Object.freeze(['aria-label', 'disabled', 'type', 'style', ...events]),
  classNameBindings: Object.freeze(['mini:mdc-fab--mini', 'plain:mdc-fab--plain', 'mdcClassNames']),
  //endregion

  //region Properties
  ripple: true,
  //endregion
});
