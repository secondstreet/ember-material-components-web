import Ember from 'ember';
import layout from '../templates/components/mdc-tab-bar';
import { MDCTabBarFoundation } from '@material/tabs';
import { MDCComponent } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import getComponentProperty from '../utils/get-component-property';
import styleComputed from '../utils/style-computed';

const { computed, observer, get, set } = Ember;
const { strings } = MDCTabBarFoundation;

export default Ember.Component.extend(MDCComponent, {
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
  classNameBindings: ['isIconsOnly:mdc-tab-bar--icon-tab-bar', 'isIconsWithText:mdc-tab-bar--icons-with-text', 'mdcClassNames', 'dark:mdc-theme--dark'],
  attributeBindings: ['style'],
  init() {
    this._super(...arguments);
    set(this, 'tabs', Ember.A([]));
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
  isIconsOnly: computed.equal('icons', 'only'),
  isIconsWithText: computed.equal('icons', 'with-text'),
  //endregion

  //region Observers
  tabsChanged: observer('tabs.@each.foundation', function() {
    // When a tab is first rendered, its computed measurements are zero. It relies on the tab bar to tell it to find
    // its correct measurements. When the tabs swap out however, they don't know to go find their measurements. So
    // we must trigger the tab bar to inform its new tabs of their measurements.
    get(this, 'tabs').forEach(tab => tab.measureSelf());
    // then we need to reset the indicator styles
    if (get(this, 'foundation')) {
      //TODO: submit a PR to Google asking to have this method made public
      get(this, 'foundation').layoutIndicator_();
    }
  }),
  //endregion

  //region Method
  createFoundation() {
    return new MDCTabBarFoundation({
      addClass: (className) => Ember.run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: (className) => Ember.run(() => get(this, 'mdcClasses').removeObject(className)),
      bindOnMDCTabSelectedEvent: () => null, // no-op because this is bound with Ember actions
      unbindOnMDCTabSelectedEvent: () => null, // no-op because this is bound with Ember actions
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      getOffsetWidth: () => getElementProperty(this, 'offsetWidth', 0),
      setStyleForIndicator: (propertyName, value) => this.setStyleFor('mdcIndicatorStyles', propertyName, value),
      getOffsetWidthForIndicator: () => getElementProperty(this, 'querySelector', () => ({ offsetWidth: 0 }))(strings.INDICATOR_SELECTOR).offsetWidth,
      notifyChange: (evtData) => get(this, 'onchange')(evtData), // TODO
      getNumberOfTabs: () => get(this, 'tabs.length'),
      isTabActiveAtIndex: (index) => this.isTabActiveAtIndex(index),
      setTabActiveAtIndex: (index, isActive) => this.setTabActiveAtIndex(index, isActive),
      isDefaultPreventedOnClickForTabAtIndex: (index) => get(this.tabAt(index), 'preventDefaultOnClick'),
      setPreventDefaultOnClickForTabAtIndex: (index, preventDefaultOnClick) => Ember.run(() => set(this.tabAt(index), 'preventDefaultOnClick', preventDefaultOnClick)),
      measureTabAtIndex: (index) => this.tabAt(index).measureSelf(),
      getComputedWidthForTabAtIndex: (index) => getComponentProperty(this.tabAt(index), 'computedWidth', 0),
      getComputedLeftForTabAtIndex: (index) => getComponentProperty(this.tabAt(index), 'computedLeft', 0)
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
    }
    else {
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
      const index = get(this, 'tabs').indexOf(tab);
      Ember.run(() => get(this, 'foundation').switchToTabAtIndex(index, shouldNotifyChange));
    },
    registerTab(tab) {
      get(this, 'tabs').addObject(tab);
    },
    deregisterTab(tab) {
      get(this, 'tabs').removeObject(tab);
    },
    switchToTab(tab) {
      Ember.run.next(() => get(this, 'foundation').switchToTabAtIndex(get(this, 'tabs').indexOf(tab), true));
    },
    scrollTabIntoView(tab) {
      if (get(this, 'scroll-active-tab-into-view')) {
        Ember.run.next(() => get(this, 'scroll-active-tab-into-view')(get(this, 'tabs').indexOf(tab)));
      }
    }
  }
  //endregion
});
