import Component from '@ember/component';
import layout from '../../templates/components/mdc-list/divider';

export default Component.extend({
  //region Attributes
  /**
   * Leaves gaps on each side of divider to match padding of {{mdc-list/item/meta}}
   * @type {Boolean}
   */
  padded: false,
  /**
   * Increases the leading margin of the divider so that it does not intersect the avatar column
   * @type {Boolean}
   */
  inset: false,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'li',
  classNames: ['mdc-list-divider'],
  classNameBindings: ['padded:mdc-list-divider--padded', 'inset:mdc-list-divider--inset'],
  attributeBindings: ['role'],
  //endregion

  //region Properties
  role: 'separator',
  //endregion
});
