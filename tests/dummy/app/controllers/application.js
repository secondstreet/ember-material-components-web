import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import { runTask, runDisposables } from 'ember-lifeline';
import FreestyleController from 'ember-freestyle/controllers/freestyle';

export default FreestyleController.extend({
  emberFreestyle: service(),
  isDemoVisible: true,
  myProgress: 0.5,
  isFirstSwitchOn: true,
  colorPalette: {
    primary: {
      name: 'cyan',
      base: '#00bcd4',
    },
    accent: {
      name: 'amber',
      base: '#ffc107',
    },
    secondary: {
      name: 'greyish',
      base: '#b6b6b6',
    },
    foreground: {
      name: 'blackish',
      base: '#212121',
    },
    background: {
      name: 'white',
      base: '#ffffff',
    },
  },
  destroy() {
    runDisposables(this);
    this._super(...arguments);
  },
  actions: {
    alert(what) {
      !get(this, 'isDestroyed') && runTask(this, () => window.alert(what), 0);
      return false;
    },
    logToConsole(eventType) {
      set(this, 'eventType', eventType);
    },
  },
});
