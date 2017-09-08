import Ember from 'ember';
import MDCTabComponent from '../../mixins/mdc-tab-component';

const { get, observer } = Ember;

export default Ember.LinkComponent.extend(MDCTabComponent, {
  //region Ember Hooks
  activeClass: 'mdc-tab--active',
  didInsertElement() {
    this._super(...arguments);
    if (get(this, 'active')) {
      get(this, 'scroll-into-view')(this);
    }
  },
  //endregion

  //region Observers
  activeStateChanged: observer('active', function() {
    if (get(this, 'active')) {
      get(this, 'switch-to-tab')(this);
    }
  }),
  //endregion
});
