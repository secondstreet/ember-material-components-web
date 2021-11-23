import Component from '@ember/component';
import events from '../../../utils/global-event-handlers';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  large: false,
  //endregion

  //region Ember Hooks
  classNames: Object.freeze(['mdc-card__title']),
  classNameBindings: Object.freeze(['large:mdc-card__title--large']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
