[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/paper-chip.svg)](https://www.npmjs.com/package/@advanced-rest-client/paper-chip)

[![Build Status](https://travis-ci.org/advanced-rest-client/paper-chip.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/paper-chip)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/paper-chip)

# paper-chip

A compact material design element that represent and input, attribute, or action.

### Example

```html
<style>
.avatar {
  background-color: red;
  color: #fff !important;
  width: 24px;
  height: 24px;
}
</style>
<h2>Basics</h2>
<section>
  <paper-chip>Simple chip</paper-chip>

  <paper-chip>
    <span class="avatar" slot="icon">C</span>
    <span>Chip with icon</span>
  </paper-chip>

  <paper-chip removable>
    <span class="avatar" slot="icon">R</span>
    Chip that can be removed
  </paper-chip>

  <paper-chip removable disabled>
    <span class="avatar" slot="icon">D</span>
    Disabled chip
  </paper-chip>
</section>

<h2>Input chips</h2>
<section>
  <paper-chip removable>
    <iron-icon icon="communication:location-on" slot="icon"></iron-icon>
    Portland
  </paper-chip>

  <paper-chip removable>
    <iron-icon icon="maps:directions-bike" slot="icon"></iron-icon>
    Biking
  </paper-chip>
</section>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/paper-chip
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import './node_modules/@advanced-rest-client/paper-chip/paper-chip.js';
    </script>
  </head>
  <body>
    <paper-chip></paper-chip>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from './node_modules/@polymer/polymer';
import './node_modules/@advanced-rest-client/paper-chip/paper-chip.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <paper-chip></paper-chip>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/paper-chip
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
