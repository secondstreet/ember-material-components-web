import Ember from 'ember';
import layout from '../../templates/components/mdc-toolbar/title';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-toolbar__title'],
  attributeBindings: ['style'],
  //endregion

  //region Computed Properties
  style: Ember.computed.readOnly('title-style')
  //endregion
});
