import { capitalize } from '@ember/string';
import { scheduleOnce, next } from '@ember/runloop';
import { A } from '@ember/array';
import Mixin from '@ember/object/mixin';
import { computed, set, get } from '@ember/object';
import { MDCRippleFoundation } from '@material/ripple';
import getElementProperty from '../utils/get-element-property';
import { createRippleAdapter } from '../utils/mdc-ripple-adapter';
import styleComputed from '../utils/style-computed';

const saferPath = path => path.replace(/\./g, '__DOT__');

export const addClass = (className, component) => {
  get(component, 'mdcClasses').addObject(className);
};

export const removeClass = (className, component) => {
  get(component, 'mdcClasses').removeObject(className);
};

/**
 * @typedef {Ember.Mixin} MDCComponent
 */
export const MDCComponent = Mixin.create({
  //region Ember Hooks
  init() {
    this._super(...arguments);
    set(this, 'mdcClasses', A([]));
    set(this, 'mdcInteractionHandlers', A([]));
    set(this, 'mdcStyles', {});
  },

  didInsertElement() {
    this._super(...arguments);
    // We don't want to init the foundation until the next run loop, because
    // many components rely on child components registering themselves, which
    // tend to happen in their own didInsertElement hooks that run _after_ the
    // parent's didInsertElement.
    scheduleOnce('afterRender', this, () => {
      this._attachMdcInteractionHandlers();
      if (get(this, 'createFoundation') && !get(this, 'isDestroyed')) {
        const foundation = this.createFoundation();
        set(this, 'foundation', foundation);
        foundation.init();
        this.afterFoundationCreation(foundation);
      }
      if (get(this, 'ripple')) {
        const rippleFoundation = new MDCRippleFoundation(createRippleAdapter(this, this.rippleOptions()));
        set(this, 'rippleFoundation', rippleFoundation);
        rippleFoundation.init();
      }
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    const foundation = get(this, 'foundation');
    const rippleFoundation = get(this, 'rippleFoundation');
    if (foundation) {
      foundation.destroy();
    }
    if (rippleFoundation) {
      rippleFoundation.destroy();
    }
  },
  //endregion

  //region Properties
  /**
   * This only works for components that are _not_ tagless, and requires that
   * `mdcClassNames` is in `classNameBindings` and `style` is in `attributeBindings`.
   * @type {Boolean}
   */
  ripple: false,

  /**
   * @type {Function}
   * @returns {Object}
   */
  rippleOptions: () => ({}),

  /**
   * @type {MDCFoundation}
   */
  foundation: null,

  /**
   * @type {String[]}
   */
  mdcClasses: null,

  /**
   * @type {Array<String,Function>[]}
   */
  mdcInteractionHandlers: null,

  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcStyles: null,
  //endregion

  //region Computed Properties
  /**
   * If the MDC Component is _not_ tagless, it should have this in its `classNameBindings`.
   * @returns {String}
   */
  mdcClassNames: computed('mdcClasses.[]', function() {
    return get(this, 'mdcClasses').join(' ');
  }),

  /**
   * If the MDC Component is _not_ tagless, it should have this in its `attributeBindings`.
   * @returns {String}
   */
  style: styleComputed('mdcStyles'),
  //endregion

  //region Methods
  /**
   * Use if you want to take actions that must be done after the foundation has been created.
   * @param {Object}
   */
  afterFoundationCreation() {},

  /**
   * Syncs the Ember Component properties with the MDC Foundation properties
   * Assumes that if there is not an isProp method on the foundation then there must be a setProp method.
   * @param {String} prop - A property name that exists on the Foundation
   *                        (as prop and setProp) and on the component
   */
  sync(prop) {
    const foundation = get(this, 'foundation');
    if (!foundation) {
      return;
    }
    const value = get(this, prop);
    const Prop = capitalize(prop);
    if (!foundation[`is${Prop}`] || foundation[`is${Prop}`]() !== value) {
      foundation[`set${Prop}`](value);
    }
  },

  setStyleFor(key, property, value) {
    if (key === 'mdcStyles' && get(this, 'element')) {
      // Eagerly set the style on the root element, to avoid a flash of unstyled content
      get(this, 'element').style.setProperty(property, value);
    }
    next(() => {
      if (get(this, 'isDestroyed')) {
        return;
      }

      // Add the style to an array tracked and bound to the DOM by Ember, so re-renders don't wipe out the style.
      set(this, `${key}.${property}`, value);
      // Setting properties on the object doesn't cause computed properties to recompute
      // (and we can't put every possible CSS property in the dependent keys),
      // so we'll just trigger the change notification manually.
      this.notifyPropertyChange(key);
    });
  },

  _attachMdcInteractionHandlers(selector = null) {
    get(this, `mdcInteractionHandlers${saferPath(selector || '')}`).forEach(([type, handler]) => {
      if (selector) {
        getElementProperty(this, 'querySelector', () => ({ addEventListener() {} }))(selector).addEventListener(
          type,
          handler
        );
      } else {
        getElementProperty(this, 'addEventListener', () => null)(type, handler);
      }
    });
  },

  _detachMdcInteractionHandlers(selector = null) {
    get(this, `mdcInteractionHandlers${saferPath(selector || '')}`).forEach(([type, handler]) => {
      if (selector) {
        getElementProperty(this, 'querySelector', () => ({ removeEventListener() {} }))(selector).removeEventListener(
          type,
          handler
        );
      } else {
        getElementProperty(this, 'removeEventListener', () => null)(type, handler);
      }
    });
  },

  registerMdcInteractionHandler(type, handler, selector = null) {
    next(() => {
      const handlerArrayKey = `mdcInteractionHandlers${saferPath(selector || '')}`;
      if (!get(this, handlerArrayKey)) {
        set(this, handlerArrayKey, A([]));
      }

      this._detachMdcInteractionHandlers(selector);
      get(this, handlerArrayKey).addObject([type, handler]);
      this._attachMdcInteractionHandlers(selector);
    });
  },

  deregisterMdcInteractionHandler(type, handler, selector = null) {
    next(() => {
      this._detachMdcInteractionHandlers(selector);
      get(this, `mdcInteractionHandlers${saferPath(selector || '')}`).removeObject([type, handler]);
      this._attachMdcInteractionHandlers(selector);
    });
  },
  //endregion
});

export default MDCComponent;
