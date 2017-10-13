import Ember from 'ember';
import layout from '../templates/components/mdc-layout-grid';

const { computed } = Ember;

export default Ember.Component.extend({
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
  layout,
  //endregion

  //region Computed Properties
  isAlignLeft: computed.equal('align', 'left'),
  isAlignRight: computed.equal('align', 'right')
  //endregion
});
