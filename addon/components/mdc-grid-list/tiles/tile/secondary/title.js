import Component from '@ember/component';
import events from '../../../../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  tagName: 'span',
  classNames: Object.freeze(['mdc-grid-tile__title']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
