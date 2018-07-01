import { A } from '@ember/array';
import Component from '@ember/component';
import { runTask, runDisposables } from 'ember-lifeline';
import { set, get, computed } from '@ember/object';
import { MDCTabBarScrollerFoundation } from '@material/tabs';
import { getCorrectPropertyName } from '@material/animation';
import { MDCComponent } from '../mixins/mdc-component';
import layout from '../templates/components/mdc-tab-bar-scroller';
import getElementProperty from '../utils/get-element-property';
import getComponentProperty from '../utils/get-component-property';
import styleComputed from '../utils/style-computed';

const { cssClasses, strings } = MDCTabBarScrollerFoundation;

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * Pass as true for white text on a darker background
   * @type {Boolean}
   */
  dark: false,
  //endregion

  //region Ember Hooks
  classNames: ['mdc-tab-bar-scroller'],
  classNameBindings: ['dark:mdc-theme--dark'],
  layout,
  init() {
    this._super(...arguments);
    set(this, 'backIndicatorClasses', A([]));
    set(this, 'forwardIndicatorClasses', A([]));
    set(this, 'mdcScrollFrameStyles', {});
  },
  didInsertElement() {
    this._super(...arguments);
    set(this, 'scrollFrameElement', getElementProperty(this, 'querySelector', () => null)(strings.FRAME_SELECTOR));
    set(this, 'tabBarElement', getElementProperty(this, 'querySelector', () => null)(strings.TABS_SELECTOR));
    set(
      this,
      'forwardIndicatorElement',
      getElementProperty(this, 'querySelector', () => null)(strings.INDICATOR_FORWARD_SELECTOR)
    );
    set(
      this,
      'backIndicatorElement',
      getElementProperty(this, 'querySelector', () => null)(strings.INDICATOR_BACK_SELECTOR)
    );
  },
  destroy() {
    runDisposables(this);
    this._super(...arguments);
  },
  //endregion

  //region Properties
  /**
   * @type {Object}
   */
  CLASS_NAMES: cssClasses,

  /**
   * @property {HTMLElement}
   */
  scrollFrameElement: null,

  /**
   * @property {HTMLElement}
   */
  tabBarElement: null,

  /**
   * @property {HTMLElement}
   */
  forwardIndicatorElement: null,

  /**
   * @property {HTMLElement}
   */
  backIndicatorElement: null,

  /**
   * @type {String[]}
   */
  backIndicatorClasses: null,

  /**
   * @type {String[]}
   */
  forwardIndicatorClasses: null,

  /**
   * @type {Ember.Component}
   */
  'tab-bar': null,

  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcScrollFrameStyles: null,
  //endregion

  //region Methods
  createFoundation() {
    return new MDCTabBarScrollerFoundation({
      addClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').addObject(className), 0),
      removeClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').removeObject(className), 0),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      addClassToForwardIndicator: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'forwardIndicatorClasses').addObject(className), 0),
      removeClassFromForwardIndicator: className =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => get(this, 'forwardIndicatorClasses').removeObject(className), 0),
      addClassToBackIndicator: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'backIndicatorClasses').addObject(className), 0),
      removeClassFromBackIndicator: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'backIndicatorClasses').removeObject(className), 0),
      isRTL: () =>
        !get(this, 'isDestroyed') &&
        runTask(
          this,
          () =>
            !!this &&
            !!get(this, 'element') &&
            getComputedStyle(get(this, 'element')).getPropertyValue('direction') === 'rtl',
          0
        ),
      registerBackIndicatorClickHandler: handler =>
        get(this, 'backIndicatorElement').addEventListener('click', handler),
      deregisterBackIndicatorClickHandler: handler =>
        get(this, 'backIndicatorElement').removeEventListener('click', handler),
      registerForwardIndicatorClickHandler: handler =>
        get(this, 'forwardIndicatorElement').addEventListener('click', handler),
      deregisterForwardIndicatorClickHandler: handler =>
        get(this, 'forwardIndicatorElement').removeEventListener('click', handler),
      registerCapturedInteractionHandler: (evt, handler) => get(this, 'element').addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) =>
        get(this, 'element').removeEventListener(evt, handler, true),
      registerWindowResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterWindowResizeHandler: handler => window.removeEventListener('resize', handler),
      getNumberOfTabs: () => get(this, 'tab-bar.tabs.length'),
      getComputedWidthForTabAtIndex: index =>
        getComponentProperty(get(this, 'tab-bar').tabAt(index), 'computedWidth', 0),
      getComputedLeftForTabAtIndex: index => getComponentProperty(get(this, 'tab-bar').tabAt(index), 'computedLeft', 0),
      getOffsetWidthForScrollFrame: () => get(this, 'scrollFrameElement').offsetWidth,
      getScrollLeftForScrollFrame: () => get(this, 'scrollFrameElement').scrollLeft,
      setScrollLeftForScrollFrame: scrollLeftAmount => (get(this, 'scrollFrameElement').scrollLeft = scrollLeftAmount),
      getOffsetWidthForTabBar: () => get(this, 'tabBarElement').offsetWidth,
      setTransformStyleForTabBar: value => {
        !get(this, 'isDestroyed') &&
          runTask(
            this,
            () => this.setStyleFor('mdcScrollFrameStyles', getCorrectPropertyName(window, 'transform'), value),
            0
          );
      },
      getOffsetLeftForEventTarget: target => target.offsetLeft,
      getOffsetWidthForEventTarget: target => target.offsetWidth,
    });
  },
  //endregion

  //region Computed Properties
  scrollFrameStyles: styleComputed('mdcScrollFrameStyles'),
  /**
   * @returns {String}
   */
  backIndicatorClassNames: computed('backIndicatorClasses.[]', function() {
    return get(this, 'backIndicatorClasses').join(' ');
  }),
  /**
   * @returns {String}
   */
  forwardIndicatorClassNames: computed('forwardIndicatorClasses.[]', function() {
    return get(this, 'forwardIndicatorClasses').join(' ');
  }),
  //endregion

  //region Actions
  actions: {
    registerTabBar(tabBar) {
      set(this, 'tab-bar', tabBar);
    },
    deregisterTabBar() {
      set(this, 'tab-bar', null);
    },
    scrollActiveTabIntoView(index) {
      // TODO: Need to submit an issue asking Google to make a scroll method that only triggers if tab is hidden, must do this until then

      const { left: scrollerLeftBoundary, right: scrollerRightBoundary } = this.element
        .querySelector('.mdc-tab-bar-scroller__scroll-frame')
        .getBoundingClientRect();

      const { left: tabLeftBoundary, right: tabRightBoundary } = get(this, 'tab-bar')
        .tabAt(index)
        .element.getBoundingClientRect();

      if (tabRightBoundary > scrollerRightBoundary || tabLeftBoundary < scrollerLeftBoundary) {
        get(this, 'foundation').scrollToTabAtIndex(index);
      }
    },
  },
  //endregion
});
