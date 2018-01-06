# ember-material-components-web

[![Travis branch](https://img.shields.io/travis/secondstreet/ember-material-components-web/master.svg)](https://travis-ci.org/secondstreet/ember-material-components-web)
[![npm](https://img.shields.io/npm/dw/ember-material-components-web.svg)](https://www.npmjs.com/package/ember-material-components-web)
[![npm](https://img.shields.io/npm/v/ember-material-components-web.svg)](https://www.npmjs.com/package/ember-material-components-web)
[![npm](https://img.shields.io/npm/l/ember-material-components-web.svg)](https://choosealicense.com/licenses/mit/)
[![GitHub issues](https://img.shields.io/github/issues/secondstreet/ember-material-components-web.svg)](https://github.com/secondstreet/ember-material-components-web/issues)
[![David](https://img.shields.io/david/dev/secondstreet/ember-material-components-web.svg)](https://david-dm.org/secondstreet/ember-material-components-web?type=dev)
[![David](https://img.shields.io/david/secondstreet/ember-material-components-web.svg)](https://david-dm.org/secondstreet/ember-material-components-web)
[![Contributors](https://img.shields.io/badge/all_contributors-7-brightgreen.svg)](#contributors)

`ember-material-components-web`, or MDC-Ember, is an Ember CLI addon that provides the Ember way to use [`material-components-web` (MDC-Web)](https://material.io/components/web/). It installs and uses the CSS and JavaScript directly from Google's packages, and provides components you can drop right into your application.

Until proper documentation can be written, please refer to the extensive JSDoc comments in the addon/ directory.

## Demo

A demo app can be found at [secondstreet.github.io/ember-material-components-web](https://secondstreet.github.io/ember-material-components-web/). Its source code is in [`tests/dummy/app`](https://github.com/secondstreet/ember-material-components-web/tree/master/tests/dummy/app) in this repo.


## Usage

### Installation

This library is available as an ember-cli addon. For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

```sh
ember install ember-material-components-web
```

### Upgrading

This project follows [semantic versioning](http://semver.org/spec/v2.0.0.html), so you can safely upgrade minor and patch versions without worrying about breaking changes. If MDC-Web by Google introduces breaking changes, one of two things will happen: MDC-Ember will deal with those breaking changes internally, or MDC-Ember will have similar breaking changes and bump its major version number.

Please note that this project is currently under development, so expect breaking changes while the major version number is `0`.

It's advisable to run `ember g ember-material-components-web` between upgrades as dependencies may have been added, removed, or upgraded between releases. Please try this, along with clearing node_modules and bower_components before reporting issues after upgrading.

Also please note that independently upgrading any of the `@material/[...]` packages in your `package.json`'s `devDependencies` _may_ introduce bugs, as Google is quickly iterating and introducing breaking chanegs on [MDC-Web](https://material.io/components/web/).

### Theming

### Components

#### Button

```hbs
{{#mdc-button
  secondary=false
  raised=false
  unelevated=false
  compact=false
  dense=false
  stroked=false
  disabled=false
  type="submit"
  onclick=(action "buttonClicked")
}}
  Button
{{/mdc-button}}
```

This component binds all global event handlers to its DOM element (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Buttons)

#### Card

```hbs
{{#mdc-card horizontal-block=false as |card|}}
  {{#card.primary as |primary|}}
    {{#card.title large=false}} A title block {{/card.title}}
    {{#card.subtitle}} A subtitle block {{/card.title}}
  {{/card.primary}}
  
  {{!-- Embed any kind of media... --}}
  {{#card.media}}
    <iframe width="560" height="315" src="https://www.youtube.com/embed/wc72cyYt8-c" frameborder="0" allowfullscreen></iframe>
  {{/card.media}}
  
  {{!-- Or just use an <img> instead! --}}
  {{card.media-item src="https://placekitten.com/200/200" alt="Kittens" width="200" size=1}}
  
  {{#card.supporting-text}}
    This area is used for displaying the bulk of the textual content of the card.
  {{/card.supporting-text}}
  
  {{#card.actions vertical=false as |actions|}}
    {{#actions.action}} I'm an instance of `mdc-button`! {{/actions.action}}
    {{#actions.action}} I'm an instance of `mdc-button`! {{/actions.action}}
  {{/card.actions}}
{{/mdc-card}}
```

This component family binds all global event handlers to its DOM elements (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Card)

#### Checkbox

```hbs
{{mdc-checkbox
  checked=false
  indeterminate=false
  disabled=false
  onchange=(action "checkboxChanged")
  name="mailing-list"
  input-id="chkbox-mailing-list"
}}
```

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Checkboxes)

#### Elevation

```hbs
{{#mdc-elevation z=0}}
```

This component binds all global event handlers to its DOM element (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Elevation)

#### Text Fields

```hbs
{{mdc-textfield
  value=""
  placeholder=""
  helptext=""
  type="text"
  helptext-persistent=false
  helptext-validation-msg=false
  disabled=false
  readonly=false
  valid=true
  bad-input=false
  box=false
  fullwidth=false
  multiline=false
  rows=16
  cols=80
  onchange=(action "textfieldChanged")
  onfocus=(action "textfieldFocused")
  onblur=(action "textfieldBlurred")
  oninput=(action "textfieldInput")
  onkeydown=(action "textfieldKeydown")
}}
```

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Text%20Fields)

#### List

```hbs
{{#mdc-list dense=false two-line=true avatar-list=true as |list|}}
  {{#list.item as |item|}}
    {{#item.start-detail as |class|}}
      <img class="{{class}}" src="http://placekitten.com/56/56" width="56" height="56" />
    {{/item.start-detail}}
    
    {{#item.text as |text|}}
      Jane Doe
      {{#text.secondary}} January 8, 2019 {{/text.secondary}}
    {{/item.text}}
    
    {{#item.end-detail as |class|}}
      <i {{action "archive"}} class="material-icons {{class}}">archive</i>
    {{/item.end-detail}}
  {{/list.item}}
  
  {{list.divider}}
  
  {{#list.item as |item|}}
    {{!-- etc. --}}
  {{/list.item}}
{{/mdc-list}}
```

This component family (except `start-detail`, and `end-detail` which are tagless) binds all global event handlers to its DOM elements (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Lists)

#### List Group

```hbs
{{#mdc-list-group as |group|}}
  {{#group.subheader}}
    List Group Subheader
  {{/group.subheader}}
  
  {{#mdc-list}} {{!-- ... --}} {{/mdc-list}}
  
  {{group.divider inset=false}}
  
  {{#mdc-list}} {{!-- ... --}} {{/mdc-list}}
{{/mdc-list-group}}
```

This component family binds all global event handlers to its DOM elements (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=List%20Groups)


#### Grid List

```hbs
{{#mdc-grid-list
  tile-gutter-1=false
  header-caption=false
  twoline-caption=false
  tile-aspect="1x1"
  icon-align="start"
as |list|}}
  {{#list.tiles as |tiles|}}
    {{#tiles.tile as |tile|}}
      {{#tile.primary as |p|}}
        {{p.primary-content src="http://placekitten.com/100/100" alt="Kitten" width=100 height=100}}
      {{/tile.primary}}
      
      {{#tile.secondary as |s|}}
        {{#s.icon as |class|}}
          <i class="material-icons {{class}}">search</i>
        {{/s.icon}}
          
        {{#s.title}}
          Title
        {{/s.title}}
        
        {{#s.support-text}}
          Supporting text goes here.
        {{/s.support-text}}
      {{/tile.secondary}}
    {{/tiles.tile}}
  {{/list.tiles}}
{{/mdc-grid-list}}
```

This component family (except `icon`, which is tagless) binds all global event handlers to its DOM elements (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Grid%20Lists)

#### Layout Grid

```hbs
{{#mdc-layout-grid fixed-column-width=false as |grid|}}
  {{#grid.inner as |inner|}}
    {{#inner.cell
      order=3
      align="center"
      span=6
      span-desktop=1
      span=tablet=4
      span-phone=8
    }}
      Grid cell content
    {{/inner.cell}}
    
    {{#inner.cell span=4}} More content {{/inner.cell}}
  {{/grid.inner}}
{{/mdc-layout-grid}}
```

This component family binds all global event handlers to its DOM elements (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Layout%20Grids)


#### Icon Toggle

```hbs
{{#mdc-icon-toggle
  pressed=isFavorite
  disabled=false
  onchange=(action (mut isFavorite))
  label="Favorite"
}}
  <i class="material-icons">
    {{#if isFavorite}} star {{else}} star_border {{/if}}
  </i>
{{/mdc-icon-toggle}}
```

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Icon%20Toggles)

#### Linear Progress Bar

```hbs
{{mdc-linear-progress
  closed=false
  indeterminate=false
  reversed=false
  secondary=false
  progress=0.5
}}
```

This component binds all global event handlers to its DOM element (`onclick`, `onmouseenter`, etc.).

[Examples & Demos](https://secondstreet.github.io/ember-material-components-web/#/?s=Progress%20Bar)

## Contributors

Thank you to all of our wonderful contributors! Want to be on this list? [Check out our contributing guide!](https://github.com/secondstreet/ember-material-components-web/blob/master/CONTRIBUTING.md) ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/4250958?v=4" width="100px;"/><br /><sub><b>Second Street</b></sub>](http://secondstreet.com)<br />[💵](#financial-secondstreet "Financial") | [<img src="https://avatars1.githubusercontent.com/u/552093?v=4" width="100px;"/><br /><sub><b>Kerrick Long</b></sub>](https://kerricklong.com/)<br />[💬](#question-Kerrick "Answering Questions") [💻](https://github.com/secondstreet/ember-material-components-web/commits?author=Kerrick "Code") [💡](#example-Kerrick "Examples") [👀](#review-Kerrick "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/9326399?v=4" width="100px;"/><br /><sub><b>danielraggs</b></sub>](https://github.com/danielraggs)<br />[💻](https://github.com/secondstreet/ember-material-components-web/commits?author=danielraggs "Code") [💡](#example-danielraggs "Examples") [👀](#review-danielraggs "Reviewed Pull Requests") | [<img src="https://avatars3.githubusercontent.com/u/20466869?v=4" width="100px;"/><br /><sub><b>Vladic</b></sub>](https://github.com/vkkostin)<br />[💻](https://github.com/secondstreet/ember-material-components-web/commits?author=vkkostin "Code") [💡](#example-vkkostin "Examples") [👀](#review-vkkostin "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/6677376?v=4" width="100px;"/><br /><sub><b>Matt Thouvenot</b></sub>](https://github.com/mthouve)<br />[💻](https://github.com/secondstreet/ember-material-components-web/commits?author=mthouve "Code") [💡](#example-mthouve "Examples") [👀](#review-mthouve "Reviewed Pull Requests") | [<img src="https://avatars2.githubusercontent.com/u/948512?v=4" width="100px;"/><br /><sub><b>Nathan Dauber</b></sub>](https://github.com/KnownSubset)<br />[💻](https://github.com/secondstreet/ember-material-components-web/commits?author=KnownSubset "Code") [📖](https://github.com/secondstreet/ember-material-components-web/commits?author=KnownSubset "Documentation") [💡](#example-KnownSubset "Examples") | [<img src="https://avatars3.githubusercontent.com/u/296167?v=4" width="100px;"/><br /><sub><b>Jack Anderson</b></sub>](https://janderson.me)<br />[🐛](https://github.com/secondstreet/ember-material-components-web/issues?q=author%3AJackCA "Bug reports") [💻](https://github.com/secondstreet/ember-material-components-web/commits?author=JackCA "Code") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/5567126?v=4" width="100px;"/><br /><sub><b>Scott Smith</b></sub>](http://www.secondstreet.com)<br />[💻](https://github.com/secondstreet/ember-material-components-web/commits?author=scottosmith "Code") | [<img src="https://avatars1.githubusercontent.com/u/1154834?v=4" width="100px;"/><br /><sub><b>Marc Lundgren</b></sub>](http://marclundgren.github.io/)<br />[🐛](https://github.com/secondstreet/ember-material-components-web/issues?q=author%3Amarclundgren "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/604117?v=4" width="100px;"/><br /><sub><b>Sivakumar Kailasam</b></sub>](https://www.linkedin.com/in/sivakumar-kailasam/)<br />[💻](https://github.com/secondstreet/ember-material-components-web/commits?author=sivakumar-kailasam "Code") [📖](https://github.com/secondstreet/ember-material-components-web/commits?author=sivakumar-kailasam "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
