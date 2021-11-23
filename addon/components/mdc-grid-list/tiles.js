import Component from '@ember/component';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  tagName: 'ul',
  classNames: Object.freeze(['mdc-grid-list__tiles']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
