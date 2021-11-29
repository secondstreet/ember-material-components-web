import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-grid-list/tiles';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'ul',
  classNames: Object.freeze(['mdc-grid-list__tiles']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
