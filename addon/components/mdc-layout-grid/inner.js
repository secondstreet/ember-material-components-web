import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-layout-grid/inner';

export default Component.extend({
  //region Ember Hooks
  classNames: Object.freeze(['mdc-layout-grid__inner']),
  layout,
  attributeBindings: Object.freeze([...events]),
  //endregion
});
