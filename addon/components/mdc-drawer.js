import Ember from 'ember';
import {MDCComponent} from '../mixins/mdc-component';
import { MDCTemporaryDrawerFoundation, MDCPersistentDrawerFoundation} from '@material/drawer';
import layout from '../templates/components/mdc-drawer';

const {Component, computed, get, getProperties, set} = Ember;

export default Component.extend(MDCComponent, {
//region Ember Hooks
  layout,
  classNames: ['mdc-drawer'],
  classNameBindings: ['mdcClassNames', 'isPermanent:mdc-permanent-drawer', 'isPersistent:mdc-persistent-drawer', 'isTemporary:mdc-temporary-drawer'],

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
    const {permanent, persistent, temporary} = getProperties(this, 'permanent', 'persistent', 'temporary');
    if (permanent && (temporary || persistent)) {
      throw new Ember.Error('Cannot be permanent and temporary or persistent');
    }
    return permanent;
  }),
  isPersistent: computed('permanent', 'persistent', 'temporary', function () {
    const {permanent, persistent, temporary} = getProperties(this, 'permanent', 'persistent', 'temporary');
    if (persistent && (permanent || temporary)) {
      throw new Ember.Error('Cannot be persistent and permanent or temporary');
    }
    return persistent;
  }),
  isTemporary: computed('permanent', 'persistent', 'temporary', function () {
    const {permanent, persistent, temporary} = getProperties(this, 'permanent', 'persistent', 'temporary');
    if (temporary && (permanent || persistent)) {
      throw new Ember.Error('Cannot be temporary and permanent or persistent');
    }
    return temporary;
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
   * @returns {MDCPersistentDrawerFoundation|MDCTemporaryDrawerFoundation}
   */
  createFoundation() {
    const {permanent, persistent} = getProperties(this, 'permanent', 'persistent');
    if (permanent) {
      return { init() {}, destroy() {} };
    }
    const Foundation = persistent ? MDCPersistentDrawerFoundation : MDCTemporaryDrawerFoundation;
    const {FOCUSABLE_ELEMENTS, ITEMS_SELECTOR, DRAWER_SELECTOR} = Foundation.strings;
    const adapter = {
      addClass: className => get(this, 'mdcClasses').addObject(className),
      removeClass: className => get(this, 'mdcClasses').removeObject(className),
      hasClass: className => get(this, 'element.classList').contains(className),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerDrawerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterDrawerInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerTransitionEndHandler: (handler) => this.registerMdcInteractionHandler('transitionend', handler),
      deregisterTransitionEndHandler: (handler) => this.deregisterMdcInteractionHandler('transitionend', handler),
      registerDocumentKeydownHandler: (handler) => this.registerMdcInteractionHandler('keydown', handler),
      deregisterDocumentKeydownHandler: (handler) => this.deregisterMdcInteractionHandler('keydown', handler),
      getDrawerWidth: () => get(this, 'element').offsetWidth,
      setTranslateX: (value) => this.setStyleFor('mdcStyles', 'translateX', `${value}px`),
      saveElementTabState: (el) => set(this, 'previousTab', el.tabIndex),
      restoreElementTabState: (el) => el.tabIndex = get(this, 'previousTab'), //WTF
      makeElementUntabbable: (el) => el.tabIndex = -1,
      notifyOpen: () => set(this, 'open', true),
      notifyClose: () => set(this, 'open', false),
      isRtl: () => window.getComputedStyle(get(this, 'element')).getPropertyValue('direction') === 'rtl',
      getFocusableElements: () => this.$(FOCUSABLE_ELEMENTS),
      hasNecessaryDom: () => !!get(this, 'element') && !!this.$(ITEMS_SELECTOR).length,
      isDrawer: (el) => get(this, 'element').querySelector(DRAWER_SELECTOR) === el,
    };
    return new Foundation(adapter);
  },
  //endregion
});
