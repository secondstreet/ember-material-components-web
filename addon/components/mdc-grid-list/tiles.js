import Ember from 'ember';
import layout from '../../templates/components/mdc-grid-list/tiles';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'ul',
  classNames: ['mdc-grid-list__tiles']
  //endregion
});
