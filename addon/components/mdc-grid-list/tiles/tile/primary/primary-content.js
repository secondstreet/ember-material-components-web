import Component from '@ember/component';
import events from '../../../../../utils/global-event-handlers';
import layout from '../../../../../templates/components/mdc-grid-list/tiles/tile/primary/primary-content';

export default Component.extend({
  //region Ember Hooks
  layout,
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
