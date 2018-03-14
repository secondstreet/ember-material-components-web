import Component from '@ember/component';
import layout from '../../templates/components/mdc-textfield/label';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: ['mdc-textfield__label'],
  classNameBindings: ['class-names'],
  //endregion
});
