import Component from '@ember/component';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-card';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  'horizontal-block': false,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-card'],
  classNameBindings: ['horizontal-block:mdc-card__horizontal-block'],
  attributeBindings: [...events]
  //endregion
});
