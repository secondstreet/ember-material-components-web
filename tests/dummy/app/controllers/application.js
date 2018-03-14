import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { later } from '@ember/runloop';
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
  actions: {
    alert(what) {
      later(() => {
        window.alert(what);
      }, 300);
      return false;
    },
    logToConsole(eventType) {
      set(this, 'eventType', eventType);
    },
  },
});
