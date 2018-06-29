import EmberError from '@ember/error';
import { A } from '@ember/array';
import Component from '@ember/component';
import { runTask } from 'ember-lifeline';
import { set, getProperties, get, computed } from '@ember/object';
import { MDCComponent } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import { MDCTemporaryDrawerFoundation, MDCPersistentDrawerFoundation } from '@material/drawer';
import layout from '../templates/components/mdc-drawer';

export default Component.extend(MDCComponent, {
  //region Ember Hooks
  layout,
  classNames: ['mdc-drawer'],
  classNameBindings: ['mdcClassNames', 'isPermanent:mdc-permanent-drawer'],

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
   * @returns {MDCPersistentDrawerFoundation|MDCTemporaryDrawerFoundation|Object}
   */
  createFoundation() {
    const { isPermanent, persistent } = getProperties(this, 'isPermanent', 'persistent');
    if (isPermanent) {
      return { init() {}, destroy() {} };
    }

    const Foundation = persistent ? MDCPersistentDrawerFoundation : MDCTemporaryDrawerFoundation;
    runTask(this, () => get(this, 'mdcClasses').addObject(Foundation.cssClasses.ROOT));
    const { FOCUSABLE_ELEMENTS, DRAWER_SELECTOR } = Foundation.strings;

    const adapter = {
      addClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').addObject(className), 0),
      removeClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').removeObject(className), 0),
      hasClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').contains(className), 0),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerDrawerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterDrawerInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerTransitionEndHandler: handler => this.registerMdcInteractionHandler('transitionend', handler),
      deregisterTransitionEndHandler: handler => this.deregisterMdcInteractionHandler('transitionend', handler),
      registerDocumentKeydownHandler: handler =>
        !get(this, 'isDestroyed') && runTask(this, () => window.document.addEventListener('keydown', handler), 0),
      deregisterDocumentKeydownHandler: handler =>
        !get(this, 'isDestroyed') && runTask(this, () => window.document.removeEventListener('keydown', handler), 0),
      getDrawerWidth: () => {
        const { width } = getElementProperty(this, 'getBoundingClientRect', () => ({ width: 0 }))();
        return width;
      },
      setTranslateX: value =>
        !get(this, 'isDestroyed') && runTask(this, () => this.setStyleFor('mdcStyles', 'translateX', `${value}px`), 0),
      saveElementTabState: el => set(this, 'previousTabState', el.tabIndex),
      restoreElementTabState: el => (el.tabIndex = get(this, 'previousTabState')),
      makeElementUntabbable: el => (el.tabIndex = -1),
      notifyOpen: () => !get(this, 'isDestroyed') && runTask(this, () => set(this, 'open', true), 0),
      notifyClose: () => !get(this, 'isDestroyed') && runTask(this, () => set(this, 'open', false), 0),
      isRtl: () => getElementProperty(this, 'direction') === 'rtl',
      getFocusableElements: () => this.element.querySelectorAll(FOCUSABLE_ELEMENTS),
      hasNecessaryDom: () => Boolean(this.element),
      isDrawer: el => get(this, 'element').querySelector(DRAWER_SELECTOR) === el,
    };
    return new Foundation(adapter);
  },
  //endregion
});
