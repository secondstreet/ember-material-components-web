import Component from '@ember/component';
import layout from '../../templates/components/mdc-textfield/label';

export default Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: Object.freeze(['mdc-textfield__label']),
  classNameBindings: Object.freeze(['class-names']),
  //endregion
});
