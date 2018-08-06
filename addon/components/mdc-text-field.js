import { bool } from '@ember/object/computed';
import { camelize } from '@ember/string';
import { A } from '@ember/array';
import Component from '@ember/component';
import { computed, set, get } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';
import layout from '../templates/components/mdc-text-field';
import { MDCComponent, addClass, removeClass } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import { MDCTextFieldFoundation } from '@material/textfield';
import { util } from '@material/ripple';

const MATCHES = util.getMatchesProperty(HTMLElement.prototype);
const { cssClasses } = MDCTextFieldFoundation;

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `onchange` to handle user actions.
   * @type {String}
   */
  value: '',
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * @type {Boolean}
   */
  readonly: false,
  /**
   * Only used if `textarea` is false.
   * @type {String}
   */
  type: 'text',
  /**
   * Render as a box instead of a bare text-field
   * @type {Boolean}
   */
  box: false,
  /**
   * This will be called when the user indicates they want to change the value
   * of the input. If you want to simulate two-way binding, you can use the
   * input like this:
   *
   * {{mdc-text-field value=myValue onchange=(action (mut myValue))
   *
   * @type {Function}
   * @param {Boolean} checked
   */
  onchange: x => x,
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
  /**
   * @type {Boolean}
   */
  valid: true,
  /**
   * @type {Boolean}
   */
  'bad-input': false,
  /**
   * @type {?String}
   */
  helptext: null,
  /**
   * @type {?String}
   */
  placeholder: null,
  /**
   * @type {Boolean}
   */
  'helptext-persistent': false,
  /**
   * @type {Boolean}
   */
  'helptext-validation-msg': false,
  /**
   * @type {Boolean}
   */
  fullwidth: false,
  /**
   * TODO: Implement @material/notched-outline and then this attribute.
   * @type {Boolean}
   */
  outlined: false,
  /**
   * @type {Boolean}
   */
  textarea: false,
  /**
   * Only if `textarea` is `true`.
   * @type {?Number}
   */
  rows: null,
  /**
   * Only if `textarea` is `true`.
   * @type {?Number}
   */
  cols: null,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-text-field'],
  classNameBindings: [
    'fullwidth:mdc-text-field--fullwidth',
    'textarea:mdc-text-field--textarea',
    'disabled:mdc-text-field--disabled',
  ],
  init() {
    [
      'labelClasses',
      'helpTextAttrs',
      'inputFocusHandlers',
      'inputBlurHandlers',
      'inputInputHandlers',
      'inputKeydownHandlers',
    ].forEach(prop => set(this, prop, A([])));
    this._super(...arguments);
  },
  didReceiveAttrs() {
    this._super(...arguments);
    assert(
      'Do not use `box` or `outlined` to style a `fullwidth` {{mdc-text-field}}',
      !((get(this, 'box') || get(this, 'outlined')) && get(this, 'fullwidth'))
    );
  },
  //endregion

  //region Properties
  /**
   * @type {String[]}
   */
  labelClasses: null,
  /**
   * An array of name/value pairs that should be HTML attributes of the help text element.
   * @type {String[][]}
   */
  helpTextAttrs: null,
  /**
   * @type {EventListener[]}
   */
  inputFocusHandlers: null,
  /**
   * @type {EventListener[]}
   */
  inputBlurHandlers: null,
  /**
   * @type {EventListener[]}
   */
  inputInputHandlers: null,
  /**
   * @type {EventListener[]}
   */
  inputKeydownHandlers: null,
  /**
   * @type {Object}
   */
  CLASS_NAMES: cssClasses,
  rippleOptions() {
    const fallbackHasMatches = () => ({ [MATCHES]: () => false });
    return {
      isSurfaceActive: () =>
        getElementProperty(this, 'querySelector', fallbackHasMatches)('input, textarea')[MATCHES](':active'),
    };
  },
  //endregion

  //region Computed Properties
  isFocused: computed('mdcClassNames', function() {
    const mdcClassNames = get(this, 'mdcClassNames').split(' ');
    const focusedClassName = get(this, 'CLASS_NAMES.FOCUSED');
    return mdcClassNames.includes(focusedClassName);
  }),

  /**
   * @type {String}
   */
  ripple: bool('box'),
  labelClassnames: computed('value', 'labelClasses.[]', function() {
    const classnames = A([]);
    if (get(this, 'value')) {
      classnames.addObject(cssClasses.LABEL_FLOAT_ABOVE);
    }
    return classnames.concat(get(this, 'labelClasses')).join(' ');
  }),
  helptextClassnames: computed('helptext-persistent', 'helptext-validation-msg', function() {
    const classnames = A([]);
    if (get(this, 'helptext-persistent')) {
      classnames.addObject(cssClasses.HELPTEXT_PERSISTENT);
    }
    if (get(this, 'helptext-validation-msg')) {
      classnames.addObject(cssClasses.HELPTEXT_VALIDATION_MSG);
    }
    return classnames.join(' ');
  }),
  //endregion

  //region Methods
  existingHelpTextAttr(name) {
    return get(this, 'helpTextAttrs').find(attr => attr[0] === name);
  },
  createFoundation() {
    const component = this;
    return new MDCTextFieldFoundation({
      addClass(className) {
        return addClass(className, component);
      },
      removeClass(className) {
        return removeClass(className, component);
      },
      addClassToLabel(className) {
        get(component, 'labelClasses').addObject(className);
      },
      removeClassFromLabel(className) {
        get(component, 'labelClasses').removeObject(className);
      },
      helptextHasClass(className) {
        return get(component, 'helptextClassnames')
          .split(' ')
          .includes(className);
      },
      setHelptextAttr(name, value) {
        const existing = component.existingHelpTextAttr(name);
        const attrs = get(component, 'helpTextAttrs');
        if (existing) {
          // Here we do a removeObject instead of simply changing the value,
          // because Ember does not support computed property dependent keys
          // watching changes to arrays within arrays.
          attrs.removeObject(existing);
        }
        attrs.addObject([name, value]);
      },
      removeHelptextAttr(name) {
        const existing = component.existingHelpTextAttr(name);
        if (existing) {
          get(component, 'helpTextAttrs').removeObject(existing);
        }
      },
      registerInputFocusHandler(handler) {
        get(component, 'inputFocusHandlers').addObject(handler);
      },
      deregisterInputFocusHandler(handler) {
        get(component, 'inputFocusHandlers').removeObject(handler);
      },
      registerInputBlurHandler(handler) {
        get(component, 'inputBlurHandlers').addObject(handler);
      },
      deregisterInputBlurHandler(handler) {
        get(component, 'inputBlurHandlers').removeObject(handler);
      },
      registerInputInputHandler(handler) {
        get(component, 'inputInputHandlers').addObject(handler);
      },
      deregisterInputInputHandler(handler) {
        get(component, 'inputInputHandlers').removeObject(handler);
      },
      registerInputKeydownHandler(handler) {
        get(component, 'inputKeydownHandlers').addObject(handler);
      },
      deregisterInputKeydownHandler(handler) {
        get(component, 'inputKeydownHandlers').removeObject(handler);
      },
      getNativeInput() {
        return getElementProperty(component, 'querySelector', () => null)('input, textarea');
      },
    });
  },
  //endregion
  //region Actions
  actions: {
    handle(type, ev) {
      const eventHandler = get(this, `on${type}`.toLowerCase());
      if (isPresent(eventHandler)) {
        eventHandler(ev);
      }
      get(this, camelize(`input ${type} handlers`)).forEach(handler => handler(ev));
    },
    handleInput(ev) {
      this.send('handle', 'input', ev);
      get(this, 'onchange')(ev.target.value);
    },
  },
  //endregion
});
