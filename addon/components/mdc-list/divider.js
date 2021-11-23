import Component from '@ember/component';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  inset: false,
  //endregion

  //region Ember Hooks
  tagName: 'li',
  classNames: Object.freeze(['mdc-list-divider']),
  classNameBindings: Object.freeze(['inset:mdc-list-divider--inset']),
  attributeBindings: Object.freeze(['role']),
  //endregion

  //region Properties
  role: 'separator',
  //endregion
});
