import Component from '@ember/component';
import layout from '../../templates/components/mdc-drawer/content';

export default Component.extend({
  //region attributes / bindings
  temporary: false,
  permanent: false,
  persistent: false,
  //endregion
  //region Ember Hooks
  layout,
  classNameBindings: Object.freeze([
    'temporary:mdc-temporary-drawer__content',
    'permanent:mdc-permanent-drawer__content',
    'persistent:mdc-persistent-drawer__content',
  ]),
  //endregion
});
