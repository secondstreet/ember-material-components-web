import { A } from '@ember/array';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import { set, get } from '@ember/object';
import { MDCMenuFoundation } from '@material/menu';
import layout from '../templates/components/mdc-menu';
import { MDCComponent } from '../mixins/mdc-component';
import styleComputed from '../utils/style-computed';
import getElementProperty from '../utils/get-element-property';

const { strings } = MDCMenuFoundation;
let storedTransformPropertyName_;
const TRANSFORM_PROPERTY = getTransformPropertyName(window);

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
      hasClass: className =>
        getElementProperty(this, 'classList', {
          contains() {
            return false;
          },
        }).contains(className),
      hasNecessaryDom: () => getElementProperty(this, 'querySelectorAll', () => [])(strings.ITEMS_SELECTOR).length,
      getAttributeForEventTarget: (target, attributeName) => target.getAttribute(attributeName),
      getInnerDimensions: () => {
        const item = getElementProperty(this, 'querySelector', () => null)(strings.ITEMS_SELECTOR);
        if (!item) {
          return { width: 0, height: 0 };
        }
        const { height, width } = item.getBoundingClientRect();
        return { width, height };
      },
      hasAnchor: () => get(this, 'anchor'),
      getAnchorDimensions: () => get(this, 'anchor').getAnchorDimensions(),
      getWindowDimensions: () => ({ width: window.innerWidth, height: window.innerHeight }),
      getNumberOfItems: () => get(this, 'items.length'),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener('click', handler),
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
      setMaxHeight: value => this.setStyleFor('mdcStyles', 'max-height', value),
    });
  },
  //endregion
});

// TODO: Once util is exported from @material/menu again, import this function.
/*!
 * getTransformPropertyName is Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns the name of the correct transform property to use on the current browser.
 * @param {!Window} globalObj
 * @param {boolean=} forceRefresh
 * @return {string}
 */
function getTransformPropertyName(globalObj, forceRefresh = false) {
  if (storedTransformPropertyName_ === undefined || forceRefresh) {
    const el = globalObj.document.createElement('div');
    const transformPropertyName = 'transform' in el.style ? 'transform' : 'webkitTransform';
    storedTransformPropertyName_ = transformPropertyName;
  }

  return storedTransformPropertyName_;
}
