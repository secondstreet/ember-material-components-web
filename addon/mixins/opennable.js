import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';

export default Mixin.create({
  updateOpenness() {
    const foundation = get(this, 'foundation');
    if (!foundation) {
      return;
    }
    const open = get(this, 'open');
    if (foundation.isOpen() && !open) {
      foundation.close();
    }
    if (!foundation.isOpen() && open) {
      foundation.open();
    }
  },
});
