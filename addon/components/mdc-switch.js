import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../templates/components/mdc-switch';
import SupportsBubblesFalse from '../mixins/supports-bubbles-false';

export default Component.extend(SupportsBubblesFalse, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `onchange` to handle user actions.
   * @type {Boolean}
   */
  checked: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * This will be called when the user indicates they want to change the value
   * of the switch. If you want to simulate two-way binding, you can use the
   * switch like this:
   *
   * {{mdc-switch checked=(eq switchValue "one") onchange=(action "setSwitchValue" "one")}}
   *
   * @type {Function}
   * @param {Boolean} checked
   */
  onchange: x => x,
  /**
   * @type {?String}
   */
  'input-id': null,
  //endregion

  //region Ember Hooks
  layout,
  classNames: 'mdc-switch',
  classNameBindings: Object.freeze(['disabled:mdc-switch--disabled']),
  attributeBindings: Object.freeze(['disabled']),
  //endregion

  //region Actions
  actions: {
    inputChanged(ev) {
      const checked = ev.target.checked;
      get(this, 'onchange')(checked);
    },
  },
  //endregion
});
