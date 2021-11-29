import Component from '@ember/component';
import events from '../../../../utils/global-event-handlers';
import layout from '../../../../templates/components/mdc-grid-list/tiles/tile/secondary';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: Object.freeze(['mdc-grid-tile__secondary']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
