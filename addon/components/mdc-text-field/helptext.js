import Component from '@ember/component';
import { computed, get } from '@ember/object';
import layout from '../../templates/components/mdc-text-field/helptext';

const mdcAttrs = ['role', 'aria-hidden'];

const MDCTextFieldHelptextComponent = Component.extend({
  //region Attributes
  /**
   * @type {String[][]}
   */
  'attribute-pairs': null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'p',
  classNames: ['mdc-text-field-helper-text'],
  classNameBindings: ['class-names'],
  attributeBindings: [...mdcAttrs],
  //endregion

  //region Methods
  createFoundation() {
    // TODO: Mix in MDCComponent and implement an adapter for MDCTextFieldHelperTextAdapter
    // https://material.io/develop/web/components/input-controls/text-field/helper-text/#usage-within-web-frameworks
  },
  //endregion
});

mdcAttrs.forEach(attr => {
  MDCTextFieldHelptextComponent.reopen({
    [attr]: computed('attribute-pairs.[]', function() {
      const found = get(this, 'attribute-pairs').find(x => x[0] === attr);
      if (!found) {
        return null;
      }
      return found[1];
    }),
  });
});

export default MDCTextFieldHelptextComponent;
