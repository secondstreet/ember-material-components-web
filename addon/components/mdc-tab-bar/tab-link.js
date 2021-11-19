/* eslint-disable ember/no-mixins */
/* eslint-disable ember/no-observers */

import LinkComponent from '@ember/routing/link-component';
import { observer, get } from '@ember/object';
import MDCTabComponent from '../../mixins/mdc-tab-component';

export default LinkComponent.extend(MDCTabComponent, {
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
  activeStateChanged: observer('active', function () {
    if (get(this, 'active')) {
      get(this, 'switch-to-tab')(this);
    }
  }),
  //endregion
});
