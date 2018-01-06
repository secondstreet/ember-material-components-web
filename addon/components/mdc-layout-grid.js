import { equal } from '@ember/object/computed';
import Component from '@ember/component';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-layout-grid';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  'fixed-column-width': false,
  /**
   * Must be `left` or `right` if used
   * @type {String}
   */
  align: null,
  //endregion

  //region Ember Hooks
  classNames: ['mdc-layout-grid'],
  classNameBindings: [
    'fixed-column-width:mdc-layout-grid--fixed-column-width',
    'isAlignLeft:mdc-layout-grid--align-left',
    'isAlignRight:mdc-layout-grid--align-right'
  ],
  attributeBindings: [...events],
  layout,
  //endregion

  //region Computed Properties
  isAlignLeft: equal('align', 'left'),
  isAlignRight: equal('align', 'right')
  //endregion
});
