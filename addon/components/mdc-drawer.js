import Ember from 'ember';
import { MDCComponent } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import { MDCTemporaryDrawerFoundation, MDCPersistentDrawerFoundation } from '@material/drawer';
import layout from '../templates/components/mdc-drawer';

const { Component, computed, get, getProperties, run, set } = Ember;

export default Component.extend(MDCComponent, {
//region Ember Hooks
  layout,
  classNames: ['mdc-drawer'],
  classNameBindings: ['mdcClassNames', 'isPermanent:mdc-permanent-drawer'],

  init() {
    this._super(...arguments);
    set(this, 'changeHandlers', Ember.A([]));
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

  //region ComputedProperties
  isPermanent: computed('permanent', 'persistent', 'temporary', function () {
    const { permanent, persistent, temporary } = getProperties(this, 'permanent', 'persistent', 'temporary');
    if (permanent && (temporary || persistent)) {
      throw new Ember.Error('Cannot be permanent and temporary or persistent');
    }
    return permanent;
  }),
  //endregion

  //region Methods
  updateOpenness() {
    const foundation = get(this, 'foundation');
    if (!foundation) { return; }
    const open = get(this, 'open');
    if (foundation.isOpen() && !open) {
      foundation.close();
    }
    if (!foundation.isOpen() && open) {
      foundation.open();
    }
  },
  /**
   * @returns {MDCPersistentDrawerFoundation|MDCTemporaryDrawerFoundation|Object}
   */
  createFoundation() {
    const { isPermanent, persistent } = getProperties(this, 'isPermanent', 'persistent');
    if (isPermanent) {
      return { init() {}, destroy() {} };
    }
    const Foundation = persistent ? MDCPersistentDrawerFoundation : MDCTemporaryDrawerFoundation;
    run(() => get(this, 'mdcClasses').addObject(Foundation.cssClasses.ROOT));
    const { FOCUSABLE_ELEMENTS, ITEMS_SELECTOR, DRAWER_SELECTOR } = Foundation.strings;
    const adapter = {
      addClass: className => run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: className => run(() => get(this, 'mdcClasses').removeObject(className)),
      hasClass: className => get(this, 'mdcClasses').includes(className),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerDrawerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterDrawerInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerTransitionEndHandler: (handler) => this.registerMdcInteractionHandler('transitionend', handler),
      deregisterTransitionEndHandler: (handler) => this.deregisterMdcInteractionHandler('transitionend', handler),
      registerDocumentKeydownHandler: (handler) => run(() => window.document.addEventListener('keydown', handler)),
      deregisterDocumentKeydownHandler: (handler) => run(() => window.document.removeEventListener('keydown', handler)),
      getDrawerWidth: () => {
        const { width } = getElementProperty(this, 'getBoundingClientRect', () => ({ width: 0 }))();
        return width;
      },
      setTranslateX: (value) => run(() => this.setStyleFor('mdcStyles', 'translateX', `${value}px`)),
      saveElementTabState: (el) => set(this, 'previousTabState', el.tabIndex),
      restoreElementTabState: (el) => el.tabIndex = get(this, 'previousTabState'),
      makeElementUntabbable: (el) => el.tabIndex = -1,
      notifyOpen: () => set(this, 'open', true),
      notifyClose: () => set(this, 'open', false),
      isRtl: () => getElementProperty(this, 'direction') === 'rtl',
      getFocusableElements: () => this.$(FOCUSABLE_ELEMENTS),
      hasNecessaryDom: () => !!get(this, 'element') && !!this.$(ITEMS_SELECTOR).length,
      isDrawer: (el) => get(this, 'element').querySelector(DRAWER_SELECTOR) === el,
    };
    return new Foundation(adapter);
  },
  //endregion
});
