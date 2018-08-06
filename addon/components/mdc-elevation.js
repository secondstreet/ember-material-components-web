import Component from '@ember/component';
import { computed, get } from '@ember/object';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-elevation';

export default Component.extend({
  //region Attributes
  /*
   * Sets the elevation to the (N)dp, where 1 <= N <= 24
   * @type {Number}
   */
  z: 0,
  //endregion

  //region Ember Hooks
  layout,
  classNameBindings: ['elevationClass'],
  classNames: ['mdc-elevation-transition'],
  attributeBindings: [...events],
  //endregion

  //region Computed Properties
  elevationClass: computed('z', function() {
    return `mdc-elevation--z${get(this, 'z')}`;
  }),
  //endregion
});
