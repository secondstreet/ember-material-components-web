import Component from '@ember/component';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  tagName: 'section',
  classNames: Object.freeze(['mdc-card__primary']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
