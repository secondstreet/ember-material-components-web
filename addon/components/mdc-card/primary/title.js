import Component from '@ember/component';
import events from '../../../utils/global-event-handlers';
import layout from '../../../templates/components/mdc-card/primary/title';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  large: false,
  //endregion

  //region Ember Hooks
  layout,
  classNames: Object.freeze(['mdc-card__title']),
  classNameBindings: Object.freeze(['large:mdc-card__title--large']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
