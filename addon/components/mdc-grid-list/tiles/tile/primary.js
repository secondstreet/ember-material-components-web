import Component from '@ember/component';
import events from '../../../../utils/global-event-handlers';
import layout from '../../../../templates/components/mdc-grid-list/tiles/tile/primary';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: Object.freeze(['mdc-grid-tile__primary']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
