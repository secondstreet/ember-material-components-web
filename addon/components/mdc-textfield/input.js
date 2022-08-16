import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../../templates/components/mdc-textfield/input';

export default Component.extend({
  //region Attributes
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  onfocus: (x) => x,
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  onblur: (x) => x,
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  oninput: (x) => x,
  /**
   * @type {Function}
   * @param {jQuery.Event}
   */
  onkeydown: (x) => x,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'input',
  attributeBindings: Object.freeze([
    'required',
    'disabled',
    'readonly',
    'accept',
    'autocomplete',
    'autosave',
    'dir',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'inputmode',
    'lang',
    'list',
    'max',
    'min',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'size',
    'step',
    'type',
    'value',
    'width',
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
