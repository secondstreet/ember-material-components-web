import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-card/primary';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'section',
  classNames: Object.freeze(['mdc-card__primary']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
