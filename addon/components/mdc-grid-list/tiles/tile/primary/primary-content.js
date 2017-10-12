import Ember from 'ember';
import layout from '../../../../../templates/components/mdc-grid-list/tiles/tile/primary/primary-content';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'img',
  classNames: ['mdc-grid-tile__primary-content'],
  attributeBindings: [
    'height',
    'src',
    'ismap',
    'longdesc',
    'referrerpolicy',
    'sizes',
    'srcset',
    'usemap',
    'width'
  ]
  //endregion
});
