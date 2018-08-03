import Component from '@ember/component';
import MDCComponent from '../mixins/mdc-component';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-button';

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  raised: false,
  /**
   * @type {Boolean}
   */
  unelevated: false,
  /**
   * @type {Boolean}
   */
  dense: false,
  /**
   * @type {Boolean}
   */
  outlined: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * @type {?String}
   */
  type: null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'button',
  classNames: 'mdc-button',
  classNameBindings: [
    'raised:mdc-button--raised',
    'unelevated:mdc-button--unelevated',
    'dense:mdc-button--dense',
    'outlined:mdc-button--outlined',
    'mdcClassNames',
  ],
  attributeBindings: ['disabled', 'type', 'style', ...events],
  //endregion

  //region Properties
  ripple: true,
  //endregion
});
