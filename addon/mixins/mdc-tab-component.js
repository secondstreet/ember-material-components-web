/* eslint-disable ember/no-mixins */
/* eslint-disable ember/no-new-mixins */

import { run } from '@ember/runloop';
import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';
import { MDCTabFoundation } from '@material/tabs';
import { MDCComponent } from '../mixins/mdc-component';
import layout from '../templates/components/mdc-tab-bar/tab';

export default Mixin.create(MDCComponent, {
  //region Ember Hooks
  layout,
  classNames: ['mdc-tab'],
  classNameBindings: ['has-icon-and-text:mdc-tab--with-icon-and-text', 'mdcClassNames'],
  attributeBindings: ['style'],
  didInsertElement() {
    this._super(...arguments);
    get(this, 'register-tab')(this);
  },
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'deregister-tab')(this);
  },
  didReceiveAttrs() {
    this._super(...arguments);
    const active = get(this, 'active');
    const foundation = get(this, 'foundation');
    if (foundation) {
      foundation.setActive(active);
    }
    if (active) {
      get(this, 'switch-to-tab')(this);
    }
  },
  //endregion

  //region Properties
  ripple: true,
  //endregion

  //region Computed Properties
  /**
   * @returns {Boolean}
   */
  get preventDefaultOnClick() {
    return get(this, 'foundation').preventsDefaultOnClick();
  },
  set preventDefaultOnClick(value) {
    get(this, 'foundation').setPreventDefaultOnClick(value);
  },
  /**
   * @returns {Number}
   */
  get computedWidth() {
    const foundation = get(this, 'foundation');
    if (foundation) {
      return foundation.getComputedWidth();
    }
    return undefined;
  },
  /**
   * @returns {Number}
   */
  get computedLeft() {
    const foundation = get(this, 'foundation');
    if (foundation) {
      return foundation.getComputedLeft();
    }
    return undefined;
  },
  //endregion

  //region Methods
  createFoundation() {
    return new MDCTabFoundation({
      addClass: className => run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: className => run(() => get(this, 'mdcClasses').removeObject(className)),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      getOffsetWidth: () => get(this, 'element').offsetWidth,
      getOffsetLeft: () => get(this, 'element').offsetLeft,
      notifySelected: () => get(this, 'tab-selected')({ tab: this }, true),
    });
  },
  measureSelf() {
    const foundation = get(this, 'foundation');
    if (foundation) {
      return foundation.measureSelf();
    }
  },
  //endregion
});
