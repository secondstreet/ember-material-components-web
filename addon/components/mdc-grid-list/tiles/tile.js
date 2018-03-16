import Component from '@ember/component';
import events from '../../../utils/global-event-handlers';
import layout from '../../../templates/components/mdc-grid-list/tiles/tile';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'li',
  classNames: ['mdc-grid-tile'],
  attributeBindings: [...events],
  //endregion
});
