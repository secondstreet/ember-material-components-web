import Component from '@ember/component';

export default Component.extend({
  //region attributes / bindings
  temporary: false,
  permanent: false,
  persistent: false,
  //endregion
  //region Ember Hooks
  classNameBindings: Object.freeze([
    'temporary:mdc-temporary-drawer__content',
    'permanent:mdc-permanent-drawer__content',
    'persistent:mdc-persistent-drawer__content',
  ]),
  //endregion
});
