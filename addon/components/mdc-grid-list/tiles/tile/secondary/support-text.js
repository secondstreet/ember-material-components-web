import Component from '@ember/component';
import events from '../../../../../utils/global-event-handlers';
import layout from '../../../../../templates/components/mdc-grid-list/tiles/tile/secondary/support-text';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: ['mdc-grid-tile__support-text'],
  attributeBindings: [...events],
  //endregion
});
