import Component from '@ember/component';
import events from '../../../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  classNames: Object.freeze(['mdc-grid-tile__primary']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
