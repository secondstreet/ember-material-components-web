/* eslint-disable ember/no-mixins */

import { readOnly } from '@ember/object/computed';
import { A } from '@ember/array';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import { run } from '@ember/runloop';
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
  classNames: Object.freeze(['mdc-toolbar']),
  classNameBindings: Object.freeze([
    `fixed:${cssClasses.FIXED}`,
    'waterfall:mdc-toolbar--waterfall',
    `flexible:${cssClasses.TOOLBAR_ROW_FLEXIBLE}`,
    `fixed-lastrow-only:${cssClasses.FIXED_LASTROW}`,
  ]),
  init() {
    this._super(...arguments);
    set(this, 'mdcTitleStyles', {});
    set(this, 'mdcFirstRowStyles', {});
    set(this, 'rows', A([]));
  },
  attributeBindings: Object.freeze(['style']),
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
      hasClass: className => get(this, 'element').classList.contains(className),
      addClass: className => run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: className => run(() => get(this, 'mdcClasses').removeObject(className)),
      registerScrollHandler: handler => window.addEventListener('scroll', handler, util.applyPassive()),
      deregisterScrollHandler: handler => window.removeEventListener('scroll', handler, util.applyPassive()),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => getElementProperty(this, 'offsetHeight', 0),
      getFirstRowElementOffsetHeight: () =>
        getElementProperty(this, 'querySelector', () => ({ offsetHeight: 0 }))(strings.FIRST_ROW_SELECTOR).offsetHeight,
      notifyChange: evtData => run(() => get(this, 'onchange')(evtData)),
      setStyle: (property, value) => run(() => this.setStyleFor('mdcStyles', property, value)),
      setStyleForTitleElement: (property, value) => run(() => this.setStyleFor('mdcTitleStyles', property, value)),
      setStyleForFlexibleRowElement: (property, value) =>
        run(() => this.setStyleFor('mdcFirstRowStyles', property, value)),
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
