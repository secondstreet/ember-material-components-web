import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import { computed, get } from '@ember/object';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-card/media-item';

const MDC_1x_PIXELS = 80;

export default Component.extend({
  //region Attributes
  /**
   * Must be one of `1`, `1.5`, `2`, or `3`.
   * @type {Number}
   */
  size: 1,
  /**
   * @type {String}
   */
  src: null,
  /**
   * @type {String}
   */
  alt: null,
  /**
   * @type {?Number}
   */
  width: null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'img',
  attributeBindings: Object.freeze(['src', 'alt', 'width', 'height', ...events]),
  classNames: Object.freeze(['mdc-card__media-item']),
  classNameBindings: Object.freeze([
    'isOne:mdc-card__media-item--1x',
    'isOneDotFive:mdc-card__media-item--1dot5x',
    'isTwo:mdc-card__media-item--2x',
    'isThree:mdc-card__media-item--3x',
  ]),
  //endregion

  //region Computed Properties
  isOne: equal('size', 1),
  isOneDotFive: equal('size', 1.5),
  isTwo: equal('size', 2),
  isThree: equal('size', 3),
  height: computed('size', function() {
    return MDC_1x_PIXELS * get(this, 'size');
  }),
  //endregion
});
