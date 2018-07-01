import Component from '@ember/component';
import { runTask } from 'ember-lifeline';
import { set, get } from '@ember/object';
import layout from '../templates/components/mdc-linear-progress';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { MDCComponent } from '../mixins/mdc-component';
import events from '../utils/global-event-handlers';
import getElementProperty from '../utils/get-element-property';
import styleComputed from '../utils/style-computed';

const { cssClasses, strings } = MDCLinearProgressFoundation;

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  closed: false,

  /**
   * @type {Boolean}
   */
  indeterminate: false,

  /**
   * @type {Boolean}
   */
  reversed: false,

  /**
   * @type {Boolean}
   */
  secondary: false,

  /**
   * @type {Number}
   * Must be a value between 0 and 1
   */
  progress: 1,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-linear-progress'],
  classNameBindings: [
    `indeterminate:${cssClasses.INDETERMINATE_CLASS}`,
    `closed:${cssClasses.CLOSED_CLASS}`,
    `reversed:${cssClasses.REVERSED_CLASS}`,
    'secondary:mdc-linear-progress--accent',
  ],
  attributeBindings: ['role', ...events],
  init() {
    this._super(...arguments);
    set(this, 'mdcPrimaryBarStyles', {});
    set(this, 'mdcBufferStyles', {});
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.sync('progress');
  },
  //endregion

  //region Properties
  role: 'progressbar',
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcPrimaryBarStyles: null,
  mdcBufferStyles: null,
  //endregion

  //region Computed Properties
  primaryBarStyles: styleComputed('mdcPrimaryBarStyles'),
  bufferStyles: styleComputed('mdcBufferStyles'),
  //endregion

  //region Methods
  createFoundation() {
    return new MDCLinearProgressFoundation({
      hasClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').contains(className), 0),
      addClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').addObject(className), 0),
      removeClass: className =>
        !get(this, 'isDestroyed') && runTask(this, () => get(this, 'mdcClasses').removeObject(className), 0),
      getPrimaryBar: () => getElementProperty(this, 'querySelector')(strings.PRIMARY_BAR_SELECTOR),
      getBuffer: () => getElementProperty(this, 'querySelector')(strings.BUFFER_SELECTOR),
      setStyle: (el, property, value) => {
        let elementStyles;
        if (el.classList.contains(strings.PRIMARY_BAR_SELECTOR.slice(1))) {
          elementStyles = 'mdcPrimaryBarStyles';
        } else if (el.classList.contains(strings.BUFFER_SELECTOR.slice(1))) {
          elementStyles = 'mdcBufferStyles';
        }
        !get(this, 'isDestroyed') && runTask(this, () => this.setStyleFor(elementStyles, property, value), 0);
      },
    });
  },
  afterFoundationCreation() {
    this.sync('progress');
  },
  //endregion
});
