import Component from '@ember/component';
import events from '../utils/global-event-handlers';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  'horizontal-block': false,
  //endregion

  //region Ember Hooks
  classNames: Object.freeze(['mdc-card']),
  classNameBindings: Object.freeze(['horizontal-block:mdc-card__horizontal-block']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
