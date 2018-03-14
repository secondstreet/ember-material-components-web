import Component from '@ember/component';
import { get, computed } from '@ember/object';
import layout from '../../templates/components/mdc-toolbar/row';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-toolbar__row'],
  attributeBindings: ['style'],
  didInsertElement() {
    get(this, 'register-row')(this);
  },
  willDestroyElement() {
    get(this, 'deregister-row')(this);
  },
  //endregion

  //region Computed Properties
  style: computed('isFirstRow', 'first-row-style', function() {
    if (get(this, 'isFirstRow')) {
      return get(this, 'first-row-style');
    }
    return null;
  }),
  isFirstRow: computed('first-row', function() {
    return get(this, 'first-row') === this;
  }),
  //endregion
});
