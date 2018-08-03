import Component from '@ember/component';
import layout from '../templates/components/mdc-form-field';

export default Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  'align-end': false,
  //endregion
  //region Ember hooks
  layout,
  classNames: ['mdc-form-field'],
  classNameBindings: ['align-end:mdc-form-field--align-end'],
  //endregion

  //region Methods
  createFoundation() {
    // TODO: Mix in MDCComponent and implement an adapter for MDCFormFieldAdapter
    // https://material.io/develop/web/components/input-controls/form-fields/#usage-within-web-frameworks
  },
  //endregion
});
