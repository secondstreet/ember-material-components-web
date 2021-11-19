import Component from '@ember/component';
import { computed, get } from '@ember/object';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-elevation';

export default Component.extend({
  //region Attributes
  /*
   * A number between 0 and 24
   * @type {Number}
   */
  z: 0,
  //endregion

  //region Ember Hooks
  layout,
  classNameBindings: Object.freeze(['elevationClass']),
  classNames: Object.freeze(['mdc-elevation-transition']),
  attributeBindings: Object.freeze([...events]),
  //endregion

  //region Computed Properties
  elevationClass: computed('z', function () {
    return `mdc-elevation--z${get(this, 'z')}`;
  }),
  //endregion
});
