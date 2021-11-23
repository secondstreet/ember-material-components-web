import Component from '@ember/component';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  'align-end': false,
  //endregion
  //region Ember hooks
  classNames: Object.freeze(['mdc-form-field']),
  classNameBindings: Object.freeze(['align-end:mdc-form-field--align-end']),
  //endregion
});
