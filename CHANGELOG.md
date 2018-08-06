# MDC-Ember Changelog

### 0.38.0 Jet Jindo (August 3, 2018)

#### New Versioning Strategy

Because the `@material/` family of packages now all share a version number, it
makes sense to align `ember-material-components-web`'s versioning with the
upstream dependencies. This aligns with the Ember community's common strategy
of versioning Ember CLI, Ember Data, and many addons based on the version of
Ember.js they were developed against. Important caveats:

- Only the [semver major and minor](https://semver.org/) numbers will align
  with MDC-Web; this library may release patch versions without waiting
  for MDC-Web to release patch versions.
- Patch version bumps may introduce new features, such as implementing a
  previously-unimplemented component from MDC-Web.
- We're still keeping the precious stone + dog breed naming convention
  because it's fun.

#### New Features

- :sparkles: `{{mdc-fab}}` variant: Extended
- :sparkles: `{{mdc-fab}}` attribute: `exited`
- :sparkles: `{{mdc-button}}` variant: Outlined
- :sparkles: `{{mdc-list}}` attribute: `non-interactive`
- :sparkles: `{{mdc-list/item}}` attribute: `selected`
- :sparkles: `{{mdc-list/item}}` attribute: `activated`
- :sparkles: `{{mdc-list/divider}}` attribute: `padded`

#### Breaking Changes

- :boom: Removes `disabled` attribute from `{{mdc-fab}}` due to [upstream changes](https://github.com/material-components/material-components-web/pull/1198)
- :boom: Removes `plain` attribute from `{{mdc-fab}}` due to [upstream changes](https://github.com/material-components/material-components-web/pull/12490)
- :boom: Removes `secondary` attribute from `{{mdc-button}}` due to [upstream changes](https://github.com/material-components/material-components-web/pull/1270)
- :boom: Removes `secondary` attribute from `{{mdc-linear-progress}}` due to [upstream changes](https://github.com/material-components/material-components-web/issues/1541)
- :boom: Renames `multiline` attribute to `textarea` for `{{mdc-textfield}}` due to [upstream changes](https://github.com/material-components/material-components-web/pull/998)
- :boom: Renames `{{mdc-textfield}}` component to `{{mdc-text-field}}` due to [upstream changes](https://github.com/material-components/material-components-web/issues/1485)
- :boom: Renames `{{mdc-list/item/start-detail}}` component to `{{mdc-list/item/graphic}}` due to [upstream changes]()
- :boom: Renames `{{mdc-list/item/end-detail}}` component to `{{mdc-list/item/meta}}` due to [upstream changes]()
- :boom: Removes `{{mdc-card}}` component (to be re-implemented later) due to extensive [upstream changes](https://github.com/material-components/material-components-web/pull/2025)
- :boom: Removes `compact` attribute from `{{mdc-button}}` due to [upstream changes](https://github.com/material-components/material-components-web/pull/2361)
- :boom: Removes `{{mdc-icon-toggle}}` component due to [upstream removal](https://github.com/material-components/material-components-web/pull/2766)
- :boom: Removes `{{mdc-grid-list}}` component due to [upstream deprecation](https://github.com/material-components/material-components-web/pull/2694)
- :boom: Removes the `.mdc-fab__icon` DOM node from `{{mdc-fab}}`'s template and yields `{{fab.iconClass}}` so you can use your own SVG, `i`, `span`, or `img` icons.
- :boom: `{{mdc-list/item/text}}` now expects text to be contained in either `{{text.primary}}` or `{{text.secondary}}`, not as a direct text node child of `{{text}}`.

### 0.0.40 Ivory Irish terrier (March 29, 2018)
- :bug: Fix issue with destroyed {{mdc-menu}}s (#70)
- :bug: impure function needs to be wrapped in `Ember.run` (#68)

### 0.0.39 Hematite Harrier (March 16, 2018)

- :heavy_plus_sign: Add prettier.js (#67)
- :heavy_plus_sign: Add prettier.js (#62)
- :heavy_minus_sign: Replace jQuery with native methods (#59)
- :sparkles: Bind DOM events to some components (#61)
- :bug: Don't set foundations on destroyed components (#60)
- :ambulance: Fix CI autodeploy
- :busts_in_sillhouette: Add Contributor
- :rocket: AutoDeploy docs to GitHub Pages on merge to master (#58)
- :green_heart: Temporary Travis CI workaround
- :busts_in_silhouette: Add contributor
- :arrow_up: [docs] Upgrade Ember Composable Helpers
- :bug: Fix #52
- :memo: Fix contributors (#53)
- :arrow_up: Upgrade Ember CLI to 2.18.0
- :bug: If no label is present show the placeholder
- :bug: Move ember-freestyle to devDependencies
- :sparkles: Implement {{mdc-drawer}}  (#45)

### 0.0.38 Garnet Greyhound (December 18, 2017)

- :sparkles: Binds the `tabindex` attribute
- :sparkles: Adds `disable-focus` attribute to `mdc-menu` to disable focusing on menu open

### 0.0.37 Feldspar French bulldog (October 19, 2017)

- :bug: {{mdc-tab}} indicator fixes (#31)
- :wrench: Use unminified js/css in non-prod environments (#46)
- :memo: Add contributor gallery to README (#40)
- :sparkles: Implement {{mdc-layout-grid}} (#42)
- :sparkles: Implement {{mdc-grid-list}} (#43)
- :bug: :memo: Fix toolbar bug, add toolbar docs. (#37)
- :bulb: :memo: Update documentation to use ember-freestyle (#44)
- :bug: {{mdc-textfield}}'s placeholder and value no longer overlap (#41)
- :boom: {{mdc-card}}'s children now yield their own children (#39)
- :sparkles: {{mdc-textfield}} exposes event handlers (#38)
- :sparkles: {{mdc-list}} now yields text and secondary text (#36)
- :memo: Create CODE_OF_CONDUCT.md (#35)

#### Breaking Changes

- :boom: {{mdc-card}}'s children now yield their own children (#39).
  If you were previously using the `{{mdc-card}}` family of components,
  this will require a minor change to your application.


### 0.0.36 Emerald English setter (September 7, 2017)

- :arrow_up: Upgrade @material packages to 0.19 versions
    - :boom: Change "accent" to "secondary" globally, as done by MDC-Web.
      https://github.com/material-components/material-components-web/pull/1116
    - :sparkles: `{{mdc-button}}` now has `unelevated` boolean attribute (default: `false`)
    - :sparkles: `{{mdc-button}}` now has `dense` boolean attribute (default: `false`)
    - :sparkles: `{{mdc-button}}` now has `compact` boolean attribute (default: `false`)
    - :sparkles: `{{mdc-textfield}}` now has `box` boolean attribute (default: `false`)
- :bug: `{{mdc-checkbox}}`, `{{mdc-radio}}`, and `{{mdc-switch}}` now respect checked attr (#29)
- :green_heart: Switch CI to use Headless Chrome (#28)
- :sparkles: Event bubbling can be disabled for checkboxes, radio buttons, and switches (#27)

#### Breaking Changes
- :boom: In the spec, "accent" color was renamed to "secondary" to be more
  semantically correct. All occurrences of the word "accent" have been
  changed to "secondary", in line with MDC-Web's [breaking
  change](https://github.com/material-components/material-components-web/pull/1116)
  to @material/theme.

### 0.0.35 Diamond Doberman (August 30, 2017)

- :bug: Fix unsafe HTML element access
- :sparkles: Dark theme can be used for tab bars and tab bar scrollers (#26)
- :zap: Don't unnecessarily (de|re)-attach handlers (#25)
- :sparkles: Implement tab-bar-scroller from @material/tabs (#21)
- :sparkles: Implement @material/switch (#24)

### 0.0.34 Citrine Chihuahua (July 14, 2017)

- :sparkles: Implement @material/linear-progress (#20)

### 0.0.33 Beryl Beagle (July 3, 2017)

- :fire: Remove isDevelopingAddon
- :bug: Fix bug in ripple adapter
- :arrow_up: Upgrade @material/ripple to 0.7.0
- :arrow_up: Upgrade @material/toolbar to 0.4.1

### 0.0.32 Agate Akita (June 28, 2017)

- :arrow_up: upgrade to @material/menu 0.4.0 (#18)
- :memo: Create CONTRIBUTING.md
- :memo: Update README.md

