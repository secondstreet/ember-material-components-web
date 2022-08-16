import Component from '@ember/component';
import { computed, get } from '@ember/object';
import layout from '../../templates/components/mdc-textfield/helptext';
import { MDCTextfieldFoundation } from '@material/textfield';

const {
  strings: { ROLE, ARIA_HIDDEN },
} = MDCTextfieldFoundation;
const mdcAttrs = [ROLE, ARIA_HIDDEN];

const MDCTextfieldHelptextComponent = Component.extend({
  //region Attributes
  /**
   * @type {String[][]}
   */
  'attribute-pairs': null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'p',
  classNames: Object.freeze(['mdc-textfield-helptext']),
  classNameBindings: Object.freeze(['class-names']),
  attributeBindings: mdcAttrs,
  //endregion
});

mdcAttrs.forEach((attr) => {
  MDCTextfieldHelptextComponent.reopen({
    [attr]: computed('attribute-pairs.[]', function () {
      const found = get(this, 'attribute-pairs').find((x) => x[0] === attr);
      if (!found) {
        return null;
      }
      return found[1];
    }),
  });
});

export default MDCTextfieldHelptextComponent;
