import Component from '@ember/component';
import layout from '../../templates/components/mdc-fab/label';

export default Component.extend({
  //region Ember Hooks
  tagName: 'span',
  classNames: ['mdc-fab__label'],
  layout,
  //endregion
});
