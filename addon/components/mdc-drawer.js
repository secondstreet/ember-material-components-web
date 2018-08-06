import EmberError from '@ember/error';
import { A } from '@ember/array';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import { computed, get, getProperties, set } from '@ember/object';
import { MDCComponent } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import layout from '../templates/components/mdc-drawer';
import { MDCTemporaryDrawerFoundation, MDCPersistentDrawerFoundation, util } from '@material/drawer';

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  permanent: true,
  /**
   * @type {Boolean}
   */
  persistent: false,
  /**
   * @type {Boolean}
   */
  temporary: false,
  /**
   * @type {Boolean}
   */
  open: false,
  onopen: x => x,
  onclose: x => x,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-drawer'],
  classNameBindings: [
    'mdcClassNames',
    'permanent:mdc-drawer--permanent',
    'persistent:mdc-drawer--persistent',
    'temporary:mdc-drawer--temporary',
  ],

  init() {
    this._super(...arguments);
    set(this, 'changeHandlers', A([]));
  },

  didInsertElement() {
    this._super(...arguments);
    this.updateOpenness();
  },
  didUpdateAttrs() {
    this._super(...arguments);
    this.updateOpenness();
  },
  //endregion

  //region ComputedProperties
  isPermanent: computed('permanent', 'persistent', 'temporary', function() {
    const { permanent, persistent, temporary } = getProperties(this, 'permanent', 'persistent', 'temporary');
    if (permanent && (temporary || persistent)) {
      throw new EmberError('Cannot be permanent and temporary or persistent');
    }
    return permanent;
  }),
  //endregion

  //region Methods
  updateOpenness() {
    const foundation = get(this, 'foundation');
    if (!foundation) {
      return;
    }
    const open = get(this, 'open');
    if (foundation.isOpen() && !open) {
      foundation.close();
    }
    if (!foundation.isOpen() && open) {
      foundation.open();
    }
  },
  /**
   * @returns {MDCTemporaryDrawerFoundation|Object}
   */
  createFoundation() {
    if (!get(this, 'temporary') && !get(this, 'persistent')) {
      return { init() {}, destroy() {} };
    }

    const Foundation = get(this, 'temporary') ? MDCTemporaryDrawerFoundation : MDCPersistentDrawerFoundation;

    run(() => get(this, 'mdcClasses').addObject(Foundation.cssClasses.ROOT));
    const { FOCUSABLE_ELEMENTS, DRAWER_SELECTOR, OPACITY_VAR_NAME } = Foundation.strings;

    return new Foundation({
      addClass: className => run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: className => run(() => get(this, 'mdcClasses').removeObject(className)),
      hasClass: className => get(this, 'mdcClasses').includes(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      addBodyClass: className => document.querySelector('body').classList.add(className),
      removeBodyClass: className => document.querySelector('body').classList.remove(className),
      hasNecessaryDom: () => Boolean(this.element.querySelector(DRAWER_SELECTOR)),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerDrawerInteractionHandler: (type, handler) =>
        this.registerMdcInteractionHandler(type, handler, DRAWER_SELECTOR),
      deregisterDrawerInteractionHandler: (type, handler) =>
        this.deregisterMdcInteractionHandler(type, handler, DRAWER_SELECTOR),
      registerTransitionEndHandler: handler => this.registerMdcInteractionHandler('transitionend', handler),
      deregisterTransitionEndHandler: handler => this.deregisterMdcInteractionHandler('transitionend', handler),
      registerDocumentKeydownHandler: handler => run(() => window.document.addEventListener('keydown', handler)),
      deregisterDocumentKeydownHandler: handler => run(() => window.document.removeEventListener('keydown', handler)),
      getDrawerWidth: () => getElementProperty(this, 'getBoundingClientRect', () => ({ width: 0 }))().width,
      setTranslateX: value => run(() => this.setStyleFor('mdcStyles', 'translateX', `${value}px`)),
      updateCssVariable: value =>
        util.supportsCssCustomProperties() &&
        getElementProperty(this, 'style', { setProperty() {} }).setProperty(OPACITY_VAR_NAME, value),
      getFocusableElements: () => getElementProperty(this, 'querySelectorAll', () => [])(FOCUSABLE_ELEMENTS),
      saveElementTabState: el => set(this, 'previousTabState', el.tabIndex),
      restoreElementTabState: el => (el.tabIndex = get(this, 'previousTabState')),
      makeElementUntabbable: el => (el.tabIndex = -1),
      notifyOpen: () => set(this, 'open', true),
      notifyClose: () => set(this, 'open', false),
      isRtl: () => getElementProperty(this, 'direction') === 'rtl',
      isDrawer: el => getElementProperty(this, 'querySelector', () => null)(DRAWER_SELECTOR) === el,
    });
  },
  //endregion
});
