import Ember from 'ember';
import layout from '../../templates/components/mdc-drawer/content';

export default Ember.Component.extend({
  //region attributes / bindings
  temporary: false,
  permanent: false,
  persistent: false,
  //endregion
  //region Ember Hooks
  layout,
  classNameBindings: ['temporary:mdc-temporary-drawer__content', 'permanent:mdc-permanent-drawer__content', 'persistent:mdc-persistent-drawer__content'],
  //endregion
});
