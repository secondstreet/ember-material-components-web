import Component from '@ember/component';
import events from '../../../../../utils/global-event-handlers';

export default Component.extend({
  //region Ember Hooks
  tagName: 'img',
  classNames: Object.freeze(['mdc-grid-tile__primary-content']),
  attributeBindings: Object.freeze([
    'alt',
    'height',
    'src',
    'ismap',
    'longdesc',
    'referrerpolicy',
    'sizes',
    'srcset',
    'usemap',
    'width',
    ...events,
  ]),
  //endregion
});
