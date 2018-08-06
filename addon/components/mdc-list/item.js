import Component from '@ember/component';
import { get, computed } from '@ember/object';
import events from '../../utils/global-event-handlers';
import layout from '../../templates/components/mdc-list/item';

export default Component.extend({
  //region Attributes
  /**
   * Multiple items can be selected at the same time when using the selected state.
   *
   * Selected state should be used when it is likely to change soon
   * (e.g. selecting one or more photos to share in Google Photos).
   *
   * @type {Boolean}
   */
  selected: false,
  /**
   * Activated state is similar to selected state, however
   * should only be used once within a specific list.
   *
   * Activated state is more permanent than selected state,
   * and will NOT change soon relative to the lifetime of the page.
   *
   * @type {Boolean}
   */
  activated: false,
  /**
   * @type {Boolean}
   */
  'two-line': false,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'li',
  classNames: ['mdc-list-item'],
  classNameBindings: ['activated:mdc-list-item--activated', 'selected:mdc-list-item--selected'],
  attributeBindings: ['aria-selected', ...events],
  //endregion

  //region Computed Properties
  'aria-selected': computed('selected', function() {
    return get(this, 'selected') ? 'true' : null;
  }),
  //endregion
});
