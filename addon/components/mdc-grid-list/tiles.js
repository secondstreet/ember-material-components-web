import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-grid-list/tiles';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'ul',
  classNames: ['mdc-grid-list__tiles'],
  attributeBindings: [...events]
  //endregion
});
