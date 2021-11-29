import Component from '@ember/component';
import layout from '../../templates/components/mdc-tab-bar/indicator';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: Object.freeze(['mdc-tab-bar__indicator']),
  attributeBindings: Object.freeze(['style']),
  //endregion
});
