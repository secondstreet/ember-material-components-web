import { readOnly } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../../templates/components/mdc-toolbar/title';
import events from '../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-toolbar__title'],
  attributeBindings: ['style', ...events],
  //endregion

  //region Computed Properties
  style: readOnly('title-style')
  //endregion
});
