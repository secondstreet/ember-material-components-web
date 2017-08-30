import Ember from 'ember';

const { Mixin, get } = Ember;

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
    }
  }
  //endregion
});
