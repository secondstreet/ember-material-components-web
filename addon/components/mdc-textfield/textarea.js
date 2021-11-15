import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../../templates/components/mdc-textfield/textarea';

export default Component.extend({
  //region Attributes
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  onfocus: x => x,
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  onblur: x => x,
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  oninput: x => x,
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  onkeydown: x => x,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'textarea',
  attributeBindings: Object.freeze([
    'required',
    'disabled',
    'rows',
    'cols',
    'name',
    'selectionEnd',
    'selectionStart',
    'wrap',
    'lang',
    'dir',
    'value',
  ]),
  classNames: Object.freeze(['mdc-textfield__input']),
  focusIn(ev) {
    get(this, 'onfocus')(ev);
  },
  focusOut(ev) {
    get(this, 'onblur')(ev);
  },
  input(ev) {
    get(this, 'oninput')(ev);
  },
  keyDown(ev) {
    get(this, 'onkeydown')(ev);
  },
  //endregion
});
