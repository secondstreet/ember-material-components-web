import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-card/media';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-card__media'],
  attributeBindings: [...events]
  //endregion
});
