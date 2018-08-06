import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../../templates/components/mdc-drawer/toolbar-spacer';

export default Component.extend({
  //region Ember Hooks
  classNameBindings: ['spacerClass'],
  layout,
  //endregion

  //region Computed Properties
  spacerClass: computed('persistent', 'temporary', 'permanent', function() {
    return get(this, 'persistent')
      ? 'mdc-persistent-drawer__toolbar-spacer'
      : get(this, 'temporary')
        ? 'mdc-temporary-drawer__toolbar-spacer'
        : get(this, 'permanent') ? 'mdc-permanent-drawer__toolbar-spacer' : 'mdc-drawer__toolbar-spacer';
  }),
  //endregion
});
