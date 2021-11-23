import Component from '@ember/component';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  tagName: 'li',
  classNames: Object.freeze(['mdc-list-item']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
