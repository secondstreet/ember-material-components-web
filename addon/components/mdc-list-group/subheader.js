import Component from '@ember/component';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  tagName: 'h3',
  classNames: Object.freeze(['mdc-list-group__subheader']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
