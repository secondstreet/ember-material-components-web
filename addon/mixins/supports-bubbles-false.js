/* eslint-disable ember/no-new-mixins */

import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';

export default Mixin.create({
  //region attributes
  bubbles: true,
  //endregion

  //region actions
  actions: {
    clicked(ev) {
      if (!get(this, 'bubbles')) {
        ev.stopPropagation();
      }
    },
  },
  //endregion
});
