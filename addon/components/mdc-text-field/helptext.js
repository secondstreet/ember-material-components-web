import Component from '@ember/component';
import { computed, get } from '@ember/object';
import layout from '../../templates/components/mdc-text-field/helptext';
import { MDCTextFieldFoundation } from '@material/textfield';

const { strings: { ROLE, ARIA_HIDDEN } } = MDCTextFieldFoundation;
const mdcAttrs = [ROLE, ARIA_HIDDEN];

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
  classNames: ['mdc-text-field-helptext'],
  classNameBindings: ['class-names'],
  attributeBindings: mdcAttrs,
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
