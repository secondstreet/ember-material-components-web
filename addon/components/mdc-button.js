import Ember from 'ember';
import MDCComponent from '../mixins/mdc-component';
import layout from '../templates/components/mdc-button';

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  secondary: false,
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
  compact: false,
  /**
   * @type {Boolean}
   */
  dense: false,
  /**
   * @type {Boolean}
   */
  stroked: false,
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
    'secondary:mdc-button--accent',
    'raised:mdc-button--raised',
    'unelevated:mdc-button--unelevated',
    'compact:mdc-button--compact',
    'dense:mdc-button--dense',
    'stroked:mdc-button--stroked',
    'mdcClassNames'
  ],
  attributeBindings: ['disabled', 'type', 'style'],
  //endregion

  //region Properties
  ripple: true
  //endregion
});
