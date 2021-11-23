import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import { get, computed } from '@ember/object';
import events from '../../../utils/global-event-handlers';

export default Component.extend({
  //region Attributes
  /**
   * @type {Number}
   */
  order: null,
  /**
   * Must be one of `top`,`middle`, or `bottom`
   * @type {String}
   */
  align: 'center',
  /**
   * @type {Number}
   */
  span: null,
  /**
   * @type {Number}
   */
  'span-desktop': null,
  /**
   * @type {Number}
   */
  'span-tablet': null,
  /**
   * @type {Number}
   */
  'span-phone': null,
  //endregion

  //region Ember Hooks
  classNames: Object.freeze(['mdc-layout-grid__cell']),
  classNameBindings: Object.freeze([
    'orderClass',
    'isAlignTop:mdc-layout-grid__cell--align-top',
    'isAlignMiddle:mdc-layout-grid__cell--align-middle',
    'isAlignBottom:mdc-layout-grid__cell--align-bottom',
    'spanClass',
    'spanDesktopClass',
    'spanTabletClass',
    'spanPhoneClass',
  ]),
  attributeBindings: Object.freeze([...events]),
  //endregion

  //region Computed Properties
  orderClass: computed('order', function () {
    const order = get(this, 'order');
    return parseInt(order) ? `mdc-layout-grid__cell--order-${order}` : null;
  }),
  spanClass: computed('span', function () {
    const span = get(this, 'span');
    return parseInt(span) ? `mdc-layout-grid__cell--span-${span}` : null;
  }),
  spanDesktopClass: computed('span-desktop', function () {
    const span = get(this, 'span-desktop');
    return parseInt(span) ? `mdc-layout-grid__cell--span-${span}-desktop` : null;
  }),
  spanTabletClass: computed('span-tablet', function () {
    const span = get(this, 'span-tablet');
    return parseInt(span) ? `mdc-layout-grid__cell--span-${span}-tablet` : null;
  }),
  spanPhoneClass: computed('span-phone', function () {
    const span = get(this, 'span-phone');
    return parseInt(span) ? `mdc-layout-grid__cell--span-${span}-phone` : null;
  }),
  isAlignTop: equal('align', 'top'),
  isAlignMiddle: equal('align', 'middle'),
  isAlignBottom: equal('align', 'bottom'),
  //endregion
});
