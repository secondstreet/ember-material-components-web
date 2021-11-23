import Component from '@ember/component';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  vertical: false,
  //endregion

  //region Ember Hooks
  tagName: 'section',
  classNames: Object.freeze(['mdc-card__actions']),
  classNameBindings: Object.freeze(['vertical:mdc-card__actions--vertical']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
