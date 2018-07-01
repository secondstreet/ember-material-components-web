import { equal } from '@ember/object/computed';
import { runTask, scheduleTask } from 'ember-lifeline';
import { A } from '@ember/array';
import Component from '@ember/component';
import { set, observer, getProperties, get } from '@ember/object';
import layout from '../templates/components/mdc-tab-bar';
import { MDCTabBarFoundation } from '@material/tabs';
import { MDCComponent } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import getComponentProperty from '../utils/get-component-property';
import styleComputed from '../utils/style-computed';

const { strings } = MDCTabBarFoundation;

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  links: true,
  /**
   * If present, must be one of `only` or `with-text`
   * @type {?String}
   */
  icons: null,
  /**
   * Pass as true for white text on a darker background
   * @type {Boolean}
   */
  dark: false,
  /**
   * @type {String}
   */
  'additional-indicator-classes': '',
  /**
   * @type {Function}
   * @param {Object} evtData
   */
  onchange: x => x,
  /**
   * @type {Function}
   */
  'register-tab-bar': x => x,
  /**
   * @type {Function}
   */
  'deregister-tab-bar': x => x,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-tab-bar'],
  classNameBindings: [
    'isIconsOnly:mdc-tab-bar--icon-tab-bar',
    'isIconsWithText:mdc-tab-bar--icons-with-text',
    'mdcClassNames',
    'dark:mdc-theme--dark',
  ],
  attributeBindings: ['style'],
  init() {
    this._super(...arguments);
    set(this, 'tabs', A([]));
    set(this, 'mdcIndicatorStyles', {});
  },
  didInsertElement() {
    this._super(...arguments);
    get(this, 'register-tab-bar')(this);
  },
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'deregister-tab-bar')();
  },
  //endregion

  //region Properties
  /**
   * @type {Ember.Component[]}
   */
  tabs: null,
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcIndicatorStyles: null,
  //endregion

  //region Computed Properties
  indicatorStyle: styleComputed('mdcIndicatorStyles'),
  isIconsOnly: equal('icons', 'only'),
  isIconsWithText: equal('icons', 'with-text'),
  //endregion

  //region Observers
  tabsChanged: observer('tabs.@each.foundation', function() {
    // When a tab is first rendered, its computed measurements are zero. It relies on the tab bar to tell it to find
    // its correct measurements. When the tabs swap out however, they don't know to go find their measurements. So
    // we must trigger the tab bar to inform its new tabs of their measurements.
    const { tabs, foundation } = getProperties(this, 'tabs', 'foundation');
    tabs.forEach(tab => tab.measureSelf());
    // then we need to reset the indicator styles
    if (foundation) {
      foundation.layout();
    }
  }),
  //endregion

  //region Method
  createFoundation() {
    return new MDCTabBarFoundation({
      addClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').addObject(className), 0),
      removeClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').removeObject(className), 0),
      bindOnMDCTabSelectedEvent: () => null, // no-op because this is bound with Ember actions
      unbindOnMDCTabSelectedEvent: () => null, // no-op because this is bound with Ember actions
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getOffsetWidth: () => getElementProperty(this, 'offsetWidth', 0),
      setStyleForIndicator: (propertyName, value) =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => this.setStyleFor('mdcIndicatorStyles', propertyName, value), 0),
      getOffsetWidthForIndicator: () =>
        getElementProperty(this, 'querySelector', () => ({ offsetWidth: 0 }))(strings.INDICATOR_SELECTOR).offsetWidth,
      notifyChange: evtData => get(this, 'onchange')(evtData), // TODO
      getNumberOfTabs: () => get(this, 'tabs.length'),
      isTabActiveAtIndex: index => this.isTabActiveAtIndex(index),
      setTabActiveAtIndex: (index, isActive) =>
        !get(this, 'isDestroyed') && runTask(this, () => this.setTabActiveAtIndex(index, isActive), 0),
      isDefaultPreventedOnClickForTabAtIndex: index => get(this.tabAt(index), 'preventDefaultOnClick'),
      setPreventDefaultOnClickForTabAtIndex: (index, preventDefaultOnClick) =>
        !get(this, 'isDestroyed') &&
        runTask(this, () => set(this.tabAt(index), 'preventDefaultOnClick', preventDefaultOnClick), 0),
      measureTabAtIndex: index => this.tabAt(index).measureSelf(),
      getComputedWidthForTabAtIndex: index => getComponentProperty(this.tabAt(index), 'computedWidth', 0),
      getComputedLeftForTabAtIndex: index => getComponentProperty(this.tabAt(index), 'computedLeft', 0),
    });
  },
  tabAt(index) {
    return get(this, 'tabs').objectAt(index);
  },
  setTabActiveAtIndex(index, isActive) {
    if (get(this, 'links')) {
      if (this.tabAt(index) && isActive) {
        this.tabAt(index)._invoke({ stopPropagation() {}, preventDefault() {} }); // TODO: Probably shouldn't be calling private APIs or stubbing events
        if (get(this, 'scroll-active-tab-into-view')) {
          get(this, 'scroll-active-tab-into-view')(index);
        }
      }
    } else {
      get(this.tabAt(index), 'become-active')(isActive);
    }
  },
  isTabActiveAtIndex(index) {
    return !!get(this.tabAt(index), 'active');
  },
  //endregion

  //region Actions
  actions: {
    tabSelected({ tab }, shouldNotifyChange) {
      const { tabs, foundation } = getProperties(this, 'tabs', 'foundation');
      const index = tabs.indexOf(tab);
      runTask(this, () => foundation && foundation.switchToTabAtIndex(index, shouldNotifyChange), 0);
    },
    registerTab(tab) {
      get(this, 'tabs').addObject(tab);
    },
    deregisterTab(tab) {
      get(this, 'tabs').removeObject(tab);
    },
    switchToTab(tab) {
      const tabs = get(this, 'tabs') || [];
      const tabIndex = tabs.indexOf(tab);
      if (tabIndex < 0 || get(this, 'isDestroyed')) {
        return;
      }
      scheduleTask(this, 'actions', () => get(this, 'foundation').switchToTabAtIndex(tabIndex, true));
    },
    scrollTabIntoView(tab) {
      const tabs = get(this, 'tabs') || [];
      const tabIndex = tabs.indexOf(tab);
      if (tabIndex < 0 || get(this, 'isDestroyed')) {
        return;
      }
      if (get(this, 'scroll-active-tab-into-view')) {
        scheduleTask(this, 'actions', get(this, 'scroll-active-tab-into-view')(tabIndex));
      }
    },
  },
  //endregion
});
