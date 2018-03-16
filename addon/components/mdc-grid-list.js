import Component from '@ember/component';
import { get, computed } from '@ember/object';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-grid-list';

export default Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-grid-list'],
  classNameBindings: [
    'tile-gutter-1:mdc-grid-list--tile-gutter-1',
    'header-caption:mdc-grid-list--header-caption',
    'twoline-caption:mdc-grid-list--twoline-caption',
    'tileAspectRatioClass',
    'iconAlignStartClass',
    'iconAlignEndClass',
  ],
  attributeBindings: [...events],
  //endregion

  //region Attributes
  /**
   * This specifies whether to set the tile padding at 1px instead of 4px.
   * @type {Boolean}
   */
  'tile-gutter-1': false,
  /**
   * This changes the footer caption to be a header caption.
   * @type {Boolean}
   */
  'header-caption': false,
  /**
   * When enabled this specifies an additional line of support text.
   * @type {Boolean}
   */
  'twoline-caption': false,
  /**
   * Changes tile aspect ratio.  Possible values are `1x1`, `16x9`, `2x3`, `3x2`, `4x3`, and `3x4`.
   * @type {String}
   */
  'tile-aspect': null,
  /**
   * Aligns icons inside secondary content components. Possible values are `start` or `end`.
   * @type {String}
   */
  'icon-align': null,
  //endregion

  //region Computed Properties
  tileAspectRatioClass: computed('tile-aspect', function() {
    const aspect = get(this, 'tile-aspect');
    return aspect ? `mdc-grid-list--tile-aspect-${aspect}` : null;
  }),
  iconAlignStartClass: computed('icon-align', function() {
    return get(this, 'icon-align') === 'start' ? 'mdc-grid-list--with-icon-align-start' : null;
  }),
  iconAlignEndClass: computed('icon-align', function() {
    return get(this, 'icon-align') === 'end' ? 'mdc-grid-list--with-icon-align-end' : null;
  }),
  //endregion
});
