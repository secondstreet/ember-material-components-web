import { A } from '@ember/array';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import layout from '../templates/components/mdc-menu';
import { MDCComponent } from '../mixins/mdc-component';
import Opennable from '../mixins/opennable';
import styleComputed from '../utils/style-computed';
import { MDCSimpleMenuFoundation, util } from '@material/menu';
import { runTask } from 'ember-lifeline';

const { strings } = MDCSimpleMenuFoundation;
const TRANSFORM_PROPERTY = util.getTransformPropertyName(window);

/**
 * @typedef {Ember.Component} MDCMenuComponent
 */
export default Component.extend(MDCComponent, Opennable, {
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
  classNames: ['mdc-simple-menu'],
  classNameBindings: ['mdcClassNames', 'open:mdc-simple-menu--open'],
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
  itemAt(index) {
    return get(this, 'items').objectAt(index);
  },
  createFoundation() {
    return new MDCSimpleMenuFoundation({
      addClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').addObject(className), 0),
      removeClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').removeObject(className), 0),
      hasClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'element.classList').contains(className), 0),
      hasNecessaryDom: () => !!get(this, 'element') && !!this.element.querySelectorAll(strings.ITEMS_SELECTOR).length,
      getInnerDimensions: () => {
        let item = this.element.querySelector(strings.ITEMS_SELECTOR);
        if (!item) {
          return { width: 0, height: 0 };
        }
        let { height, width } = item.getBoundingClientRect();
        return { width, height };
      },
      hasAnchor: () => !get(this, 'isDestroyed') && runTask(this, () => get(this, 'anchor'), 0),
      getAnchorDimensions: () =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'anchor').getAnchorDimensions(), 0),
      getWindowDimensions: () => ({ width: window.innerWidth, height: window.innerHeight }),
      setScale: (x, y) =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => this.setStyleFor('mdcStyles', TRANSFORM_PROPERTY, `scale(${x}, ${y}`), 0),
      setInnerScale: (x, y) =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => this.setStyleFor('itemStyles', TRANSFORM_PROPERTY, `scale(${x}, ${y}`), 0),
      getNumberOfItems: () => !get(this, 'isDestroyed') && runTask(this, () => get(this, 'items.length'), 0),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener('click', handler),
      getYParamsForItemAtIndex: index =>
        !get(this, 'isDestroyed') && runTask(this, () => this.itemAt(index).getYParams(), 0),
      setTransitionDelayForItemAtIndex: (index, value) =>
        !get(this, 'isDestroyed') && runTask(this, () => this.itemAt(index).setTransitionDelay(value), 0),
      getIndexForEventTarget: target =>
        get(this, 'items')
          .mapBy('element')
          .indexOf(target),
      notifySelected: ({ index }) =>
        !get(this, 'isDestroyed') && runTask(this, () => this.itemAt(index).notifySelected(index), 0),
      notifyCancel: () => get(this, 'cancel')(false), // False is provided as a convenience for the {{mut}} helper
      saveFocus: () => set(this, 'previousFocus', document.activeElement),
      restoreFocus: () => get(this, 'previousFocus') && get(this, 'previousFocus').focus(),
      isFocused: () => document.activeElement === get(this, 'element'),
      focus: () =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => !get(this, 'disable-focus') && get(this, 'element').focus(), 0),
      getFocusedItemIndex: () =>
        get(this, 'items')
          .mapBy('element')
          .indexOf(document.activeElement),
      focusItemAtIndex: index =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => !get(this, 'disable-focus') && get(this.itemAt(index), 'element').focus(), 0),
      isRtl: () => window.getComputedStyle(get(this, 'element')).getPropertyValue('direction') === 'rtl',
      setTransformOrigin: value =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => this.setStyleFor('mdcStyles', `${TRANSFORM_PROPERTY}-origin`, value), 0),
      setPosition: ({ top, right, bottom, left }) => {
        !get(this, 'isDestroyed') &&
          runTask(
            this,
            () => {
              this.setStyleFor('mdcStyles', 'top', top || null);
              this.setStyleFor('mdcStyles', 'right', right || null);
              this.setStyleFor('mdcStyles', 'bottom', bottom || null);
              this.setStyleFor('mdcStyles', 'left', left || null);
            },
            0
          );
      },
      getAccurateTime: () => window.performance.now(),
    });
  },
  //endregion
});
