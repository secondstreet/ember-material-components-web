import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-list/item';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  activated: false,
  /**
   * @type {Boolean}
   */
  selected: false,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'li',
  classNames: ['mdc-list-item'],
  classNameBindings: ['activated:mdc-list-item--activated', 'selected:mdc-list-item--selected'],
  attributeBindings: [...events],
  //endregion
});
