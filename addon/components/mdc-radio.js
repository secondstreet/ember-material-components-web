import Component from '@ember/component';
import { get } from '@ember/object';
import { run, scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/mdc-radio';
import getElementProperty from '../utils/get-element-property';
import { MDCComponent } from '../mixins/mdc-component';
import { MDCRadioFoundation } from '@material/radio';
import SupportsBubblesFalse from '../mixins/supports-bubbles-false';

export default Component.extend(MDCComponent, SupportsBubblesFalse, {
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
   * of the checkbox. If you want to simulate two-way binding, you can use the
   * checkbox like this:
   *
   * {{mdc-radio checked=(eq radioValue "one") onchange=(action "setRadioValue" "one")}}
   *
   * @type {Function}
   * @param {Boolean} checked
   */
  onchange: x => x,
  /**
   * @type {?String}
   */
  name: null,
  /**
   * @type {?String}
   */
  'input-id': null,
  //endregion

  //region Ember Hooks
  classNames: ['mdc-radio'],
  classNameBindings: ['mdcClassNames', 'disabled:mdc-radio--disabled'],
  attributeBindings: ['style'],
  layout,
  didRender() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, () => {
      this.sync('checked');
      this.sync('disabled');
    });
  },
  //endregion

  //region Properties
  ripple: true,
  rippleOptions() {
    return {
      isUnbounded: () => true,
      isSurfaceActive: () => false,
      computeBoundingRect: () => {
        const size = 40;
        const { left, top } = getElementProperty(this, 'getBoundingClientRect', () => ({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
        }))();
        return {
          top,
          left,
          bottom: left + size,
          right: left + size,
          width: size,
          height: size,
        };
      },
    };
  },
  //endregion

  //region Methods
  _attachMdcInteractionHandlers() {
    const input = getElementProperty(this, 'querySelector', () => ({ addEventListener() {} }))('input');
    get(this, 'mdcInteractionHandlers').forEach(([type, handler]) => input.addEventListener(type, handler));
  },
  _detachMdcInteractionHandlers() {
    const input = getElementProperty(this, 'querySelector', () => ({ removeEventListener() {} }))('input');
    get(this, 'mdcInteractionHandlers').forEach(([type, handler]) => input.removeEventListener(type, handler));
  },
  /**
   * @returns {MDCRadioFoundation}
   */
  createFoundation() {
    return new MDCRadioFoundation({
      getNativeControl: () => getElementProperty(this, 'querySelector', () => null)('input'),
      addClass: className => run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: className => run(() => get(this, 'mdcClasses').removeObject(className)),
    });
  },
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
