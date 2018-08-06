import Component from '@ember/component';
import events from '../utils/global-event-handlers';
import MDCComponent from '../mixins/mdc-component';
import layout from '../templates/components/mdc-fab';

export default Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  mini: false,
  /**
   * @type {Boolean}
   */
  extended: false,
  /**
   * @type {Boolean}
   */
  exited: false,
  /**
   * @type {?String}
   */
  'aria-label': null,
  /**
   * Can be passed in to apply a given style to
   * @type {?String}
   */
  'icon-class': '',
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'button',
  classNames: ['mdc-fab'],
  attributeBindings: ['aria-label', 'type', 'style', ...events],
  classNameBindings: ['mini:mdc-fab--mini', 'extended:mdc-fab--extended', 'exited:mdc-fab--exited', 'mdcClassNames'],
  //endregion

  //region Properties
  ripple: true,
  //endregion
});
