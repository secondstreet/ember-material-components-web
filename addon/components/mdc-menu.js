import { A } from '@ember/array';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import { set, get } from '@ember/object';
import layout from '../templates/components/mdc-menu';
import { MDCComponent } from '../mixins/mdc-component';
import styleComputed from '../utils/style-computed';
import { MDCMenuFoundation, util } from '@material/menu';

const { strings } = MDCMenuFoundation;
const TRANSFORM_PROPERTY = util.getTransformPropertyName(window);

/**
 * @typedef {Ember.Component} MDCMenuComponent
 */
export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  open: false,
  /**
   * If you are using this component within an instance of `mdc-menu-anchor`,
   * that will yield its component instance. Pass it to here as `anchor`.
   * @type {?Ember.Component}
   */
  anchor: null,
  /**
   * Pass an action to call when the menu is canceled without selection.
   * @type {?Function}
   */
  cancel: x => x,
  /**
   * Enabling this is generally a bad idea for accessibility, so think hard about using this attribute.
   * @type {Boolean}
   */
  'disable-focus': false,
  //endregion

  //region Ember Hooks
  init() {
    this._super(...arguments);
    set(this, 'items', A([]));
    set(this, 'itemStyles', A([]));
  },
  didInsertElement() {
    this._super(...arguments);
    this.updateOpenness();
  },
  didUpdateAttrs() {
    this._super(...arguments);
    this.updateOpenness();
  },
  layout,
  classNames: ['mdc-menu'],
  classNameBindings: ['mdcClassNames', 'open:mdc-menu--open'],
  attributeBindings: ['style', 'tabindex'],
  //endregion

  //region Properties
  /**
   * @type {MDCMenuItemComponent[]}
   */
  items: null,
  /**
   * @private
   * @type {HTMLElement}
   */
  previousFocus: null,
  //endregion

  //region Computed Properties
  itemStyle: styleComputed('itemStyles'),
  //endregion

  //region Methods
  /**
   * @public
   * @param {MDCMenuItemComponent} item
   */
  registerItem(item) {
    get(this, 'items').addObject(item);
  },
  /**
   * @public
   * @param {MDCMenuItemComponent} item
   */
  unregisterItem(item) {
    get(this, 'items').removeObject(item);
  },
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
  itemAt(index) {
    return get(this, 'items').objectAt(index);
  },
  createFoundation() {
    return new MDCMenuFoundation({
      addClass: className => run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: className => run(() => get(this, 'mdcClasses').removeObject(className)),
      hasClass: className => get(this, 'element.classList').contains(className),
      hasNecessaryDom: () => !!get(this, 'element') && !!this.element.querySelectorAll(strings.ITEMS_SELECTOR).length,
      getInnerDimensions: () => {
        let item = this.element.querySelector(strings.ITEMS_SELECTOR);
        if (!item) {
          return { width: 0, height: 0 };
        }
        let { height, width } = item.getBoundingClientRect();
        return { width, height };
      },
      hasAnchor: () => get(this, 'anchor'),
      getAnchorDimensions: () => get(this, 'anchor').getAnchorDimensions(),
      getWindowDimensions: () => ({ width: window.innerWidth, height: window.innerHeight }),
      setScale: (x, y) => run(() => this.setStyleFor('mdcStyles', TRANSFORM_PROPERTY, `scale(${x}, ${y}`)),
      setInnerScale: (x, y) => run(() => this.setStyleFor('itemStyles', TRANSFORM_PROPERTY, `scale(${x}, ${y}`)),
      getNumberOfItems: () => get(this, 'items.length'),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener('click', handler),
      getYParamsForItemAtIndex: index => !get(this, 'isDestroyed') && this.itemAt(index).getYParams(),
      setTransitionDelayForItemAtIndex: (index, value) =>
        !get(this, 'isDestroyed') && this.itemAt(index).setTransitionDelay(value),
      getIndexForEventTarget: target =>
        get(this, 'items')
          .mapBy('element')
          .indexOf(target),
      notifySelected: ({ index }) => !get(this, 'isDestroyed') && this.itemAt(index).notifySelected(index),
      notifyCancel: () => get(this, 'cancel')(false), // False is provided as a convenience for the {{mut}} helper
      saveFocus: () => set(this, 'previousFocus', document.activeElement),
      restoreFocus: () => get(this, 'previousFocus') && get(this, 'previousFocus').focus(),
      isFocused: () => document.activeElement === get(this, 'element'),
      focus: () => run(() => !get(this, 'disable-focus') && get(this, 'element').focus()),
      getFocusedItemIndex: () =>
        get(this, 'items')
          .mapBy('element')
          .indexOf(document.activeElement),
      focusItemAtIndex: index =>
        !get(this, 'isDestroyed') && !get(this, 'disable-focus') && get(this.itemAt(index), 'element').focus(),
      isRtl: () => window.getComputedStyle(get(this, 'element')).getPropertyValue('direction') === 'rtl',
      setTransformOrigin: value => run(() => this.setStyleFor('mdcStyles', `${TRANSFORM_PROPERTY}-origin`, value)),
      setPosition: ({ top, right, bottom, left }) => {
        run(() => {
          this.setStyleFor('mdcStyles', 'top', top || null);
          this.setStyleFor('mdcStyles', 'right', right || null);
          this.setStyleFor('mdcStyles', 'bottom', bottom || null);
          this.setStyleFor('mdcStyles', 'left', left || null);
        });
      },
      getAccurateTime: () => window.performance.now(),
    });
  },
  //endregion
});
