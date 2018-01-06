import Component from '@ember/component';
import events from '../../../../../utils/global-event-handlers';
import layout from '../../../../../templates/components/mdc-grid-list/tiles/tile/secondary/title';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: ['mdc-grid-tile__title'],
  attributeBindings: [...events]
  //endregion
});
