import Component from '@ember/component';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  classNames: Object.freeze(['mdc-layout-grid__inner']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
