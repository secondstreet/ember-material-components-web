import { readOnly } from '@ember/object/computed';
import { A } from '@ember/array';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { runTask } from 'ember-lifeline';
import layout from '../templates/components/mdc-toolbar';
import { MDCToolbarFoundation, util } from '@material/toolbar';
import { MDCComponent } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import styleComputed from '../utils/style-computed';

const { cssClasses, strings } = MDCToolbarFoundation;

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  fixed: false,
  /**
   * @type {Boolean}
   */
  waterfall: false,
  /**
   * @type {Boolean}
   */
  flexible: false,
  /**
   * @type {Boolean}
   */
  'fixed-lastrow-only': false,
  /**
   * @type {Function<Object>}
   */
  onchange: x => x,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-toolbar'],
  classNameBindings: [
    `fixed:${cssClasses.FIXED}`,
    'waterfall:mdc-toolbar--waterfall',
    `flexible:${cssClasses.TOOLBAR_ROW_FLEXIBLE}`,
    `fixed-lastrow-only:${cssClasses.FIXED_LASTROW}`,
  ],
  attributeBindings: ['style'],
  init() {
    this._super(...arguments);
    set(this, 'mdcTitleStyles', {});
    set(this, 'mdcFirstRowStyles', {});
    set(this, 'rows', A([]));
  },
  //endregion

  //region Properties
  /**
   * @type {Ember.Component[]}
   */
  rows: null,
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcTitleStyles: null,
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcFirstRowStyles: null,
  //endregion

  //region Computed Properties
  titleStyle: styleComputed('mdcTitleStyles'),
  firstRowStyle: styleComputed('mdcFirstRowStyles'),
  firstRow: readOnly('rows.firstObject'),
  //endregion

  //region Methods
  createFoundation() {
    return new MDCToolbarFoundation({
      hasClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'element').classList.contains(className), 0),
      addClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').addObject(className), 0),
      removeClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').removeObject(className), 0),
      registerScrollHandler: handler => window.addEventListener('scroll', handler, util.applyPassive()),
      deregisterScrollHandler: handler => window.removeEventListener('scroll', handler, util.applyPassive()),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => getElementProperty(this, 'offsetHeight', 0),
      getFirstRowElementOffsetHeight: () =>
        getElementProperty(this, 'querySelector', () => ({ offsetHeight: 0 }))(strings.FIRST_ROW_SELECTOR).offsetHeight,
      notifyChange: evtData => !get(this, 'isDestroyed') && runTask(this, () => get(this, 'onchange')(evtData), 0),
      setStyle: (property, value) =>
        !get(this, 'isDestroyed') && runTask(this, () => this.setStyleFor('mdcStyles', property, value), 0),
      setStyleForTitleElement: (property, value) =>
        !get(this, 'isDestroyed') && runTask(this, () => this.setStyleFor('mdcTitleStyles', property, value), 0),
      setStyleForFlexibleRowElement: (property, value) =>
        !get(this, 'isDestroyed') && runTask(this, () => this.setStyleFor('mdcFirstRowStyles', property, value), 0),
      setStyleForFixedAdjustElement: () => null, // no-op
    });
  },
  //endregion

  //region Actions
  actions: {
    /**
     * @param {Ember.Component} row
     */
    registerRow(row) {
      get(this, 'rows').addObject(row);
    },
    /**
     * @param {Ember.Component} row
     */
    deregisterRow(row) {
      get(this, 'rows').removeObject(row);
    },
  },
  //endregion
});
