import Ember from 'ember';
import layout from '../../../../../templates/components/mdc-grid-list/tiles/tile/secondary/support-text';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: ['mdc-grid-tile__support-text']
  //endregion
});
