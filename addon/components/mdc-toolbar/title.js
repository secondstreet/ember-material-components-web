import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  classNames: Object.freeze(['mdc-toolbar__title']),
  attributeBindings: Object.freeze(['style', ...events]),
  //endregion

  //region Computed Properties
  style: readOnly('title-style'),
  //endregion
});
