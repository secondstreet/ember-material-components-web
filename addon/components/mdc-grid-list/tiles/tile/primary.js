import Component from '@ember/component';
import events from '../../../../utils/global-event-handlers';
import layout from '../../../../templates/components/mdc-grid-list/tiles/tile/primary';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-grid-tile__primary'],
  attributeBindings: [...events],
  //endregion
});
