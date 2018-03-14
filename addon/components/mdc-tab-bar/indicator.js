import Component from '@ember/component';
import layout from '../../templates/components/mdc-tab-bar/indicator';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-tab-bar__indicator'],
  attributeBindings: ['style'],
  //endregion
});
