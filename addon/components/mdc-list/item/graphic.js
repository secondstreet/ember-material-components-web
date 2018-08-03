import Component from '@ember/component';
import layout from '../../../templates/components/mdc-list/item/graphic';

export default Component.extend({
  //region Ember Hooks
  layout,
  /**
   * This is currently a tagless component, meant only to yield the correct CSS class.
   * @type {String}
   */
  tagName: '',
  //endregion
});
