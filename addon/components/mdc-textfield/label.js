import Component from '@ember/component';

export default Component.extend({
  //region Ember Hooks
  tagName: 'span',
  classNames: Object.freeze(['mdc-textfield__label']),
  classNameBindings: Object.freeze(['class-names']),
  //endregion
});
