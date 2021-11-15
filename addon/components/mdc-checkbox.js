import { A } from '@ember/array';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { run, next, scheduleOnce } from '@ember/runloop';
import layout from '../templates/components/mdc-checkbox';
import {
  addClass,
  removeClass,
  MDCComponent
} from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import { MDCCheckboxFoundation } from '@material/checkbox';
import SupportsBubblesFalse from '../mixins/supports-bubbles-false';

const { ANIM_END_EVENT_NAME } = MDCCheckboxFoundation.strings;

export default Component.extend(MDCComponent, SupportsBubblesFalse, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `onchange` to handle user actions.
   * @type {Boolean}
   */
  checked: false,
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action.
   * @type {Boolean}
   */
  indeterminate: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * This will be called when the user indicates they want to change the value
   * of the checkbox. If you want to simulate two-way binding, you can use the
   * checkbox like this:
   *
   * {{mdc-checkbox checked=isChecked onchange=(action (mut isChecked))}}
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
  classNames: Object.freeze(['mdc-checkbox']),
  classNameBindings: Object.freeze(['mdcClassNames']),
  attributeBindings: Object.freeze(['style']),
  layout,
  init() {
    this._super(...arguments);
    set(this, 'changeHandlers', A([]));
  },
  didRender() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, () => {
      this.sync('checked');
      this.sync('indeterminate');
      this.sync('disabled');
    });
  },
  //endregion

  //region Properties
  /**
   * @type {EventListener[]}
   */
  changeHandlers: null,
  ripple: true,
  //endregion

  //region Methods
  /**
   * @returns {MDCCheckboxFoundation}
   */
  createFoundation() {
    return new MDCCheckboxFoundation({
      addClass: className => next(() => addClass(className, this)),
      removeClass: className => next(() => removeClass(className, this)),
      registerAnimationEndHandler: handler =>
        getElementProperty(this, 'addEventListener', () => null)(ANIM_END_EVENT_NAME, handler),
      deregisterAnimationEndHandler: handler =>
        getElementProperty(this, 'removeEventListener', () => null)(ANIM_END_EVENT_NAME, handler),
      registerChangeHandler: handler => run(() => get(this, 'changeHandlers').addObject(handler)),
      deregisterChangeHandler: handler => run(() => get(this, 'changeHandlers').removeObject(handler)),
      getNativeControl: () => this.element.querySelector('input'),
      forceLayout: () => undefined,
      isAttachedToDOM: () => !!get(this, 'element'),
    });
  },
  //endregion

  //region Actions
  actions: {
    inputChanged(ev) {
      const checked = ev.target.checked;
      get(this, 'changeHandlers').forEach(handler => handler(ev));
      get(this, 'onchange')(checked);
    },
  },
  //endregion
});
