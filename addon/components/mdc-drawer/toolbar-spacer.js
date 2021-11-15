import Component from '@ember/component';
import layout from '../../templates/components/mdc-drawer/toolbar-spacer';

export default Component.extend({
  //region attributes / bindings
  temporary: false,
  permanent: false,
  persistent: false,
  //endregion
  //region Ember Hooks
  layout,
  classNameBindings: Object.freeze([
    'temporary:mdc-temporary-drawer__toolbar-spacer',
    'permanent:mdc-permanent-drawer__toolbar-spacer',
    'persistent:mdc-persistent-drawer__toolbar-spacer',
  ]),
  //endregion
});
