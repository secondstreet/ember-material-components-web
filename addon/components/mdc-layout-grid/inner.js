import Component from '@ember/component';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-layout-grid/inner';

export default Component.extend({
  //region Ember Hooks
  classNames: ['mdc-layout-grid__inner'],
  layout,
  attributeBindings: [...events],
  //endregion
});
