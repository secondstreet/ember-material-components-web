import Component from '@ember/component';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-list-group';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-list-group'],
  attributeBindings: [...events],
  //endregion
});
