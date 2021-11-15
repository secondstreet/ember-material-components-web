import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-list-group/subheader';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'h3',
  classNames: Object.freeze(['mdc-list-group__subheader']),
  attributeBindings: Object.freeze([...events]),
  //endregion
});
