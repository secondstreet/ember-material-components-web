import Component from '@ember/component';
import layout from '../../templates/components/mdc-text-field/label';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: ['mdc-floating-label'],
  classNameBindings: ['class-names'],
  //endregion
});
