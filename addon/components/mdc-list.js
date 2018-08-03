import Component from '@ember/component';
import events from '../utils/global-event-handlers';
import layout from '../templates/components/mdc-list';

export default Component.extend({
  //region Attribute
  /**
   * Styles the density of the list, making it appear more compact.
   * @type {Boolean}
   */
  dense: false,
  /*
   * Modifier to style the list with two lines (primary and secondary lines).
   * @type {Boolean}
   */
  'two-line': false,
  /**
   * @type {Boolean}
   */
  'non-interactive': false,
  /**
   * Configures the leading titles of each row to display images instead of icons.
   * This will make the graphics of the list items larger.
   * @type {Boolean}
   */
  'avatar-list': false,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'ul',
  classNameBindings: [
    'dense:mdc-list--dense',
    'two-line:mdc-list--two-line',
    'non-interactive:mdc-list--non-interactive',
    'avatar-list:mdc-list--avatar-list',
  ],
  classNames: ['mdc-list'],
  attributeBindings: [...events],
  //endregion

  //region Methods
  createFoundation() {
    // TODO: Mix in MDCComponent and implement an adapter for MDCListAdapter
    // https://material.io/develop/web/components/lists/#usage-within-web-frameworks
  },
  //endregion
});
