[![Build Status](https://travis-ci.org/advanced-rest-client/api-url-data-model.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/paper-chip)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/paper-chip)

# paper-chip

A compact material design element that represent and input, attribute, or action.

<!---
```
<custom-element-demo>
  <template>
    <link rel="import" href="../paper-styles/typography.html">
    <link rel="import" href="../iron-icon/iron-icon.html">
    <link rel="import" href="../iron-icons/iron-icons.html">
    <link rel="import" href="../iron-icons/communication-icons.html">
    <link rel="import" href="../iron-icons/maps-icons.html">
    <link rel="import" href="../iron-icons/device-icons.html">
    <link rel="import" href="../paper-toast/paper-toast.html">
    <link rel="import" href="paper-chip.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<h2>Basics</h2>
<section>
  <paper-chip>
    <span>Simple chip</span>
  </paper-chip>

  <paper-chip>
    <span class="avatar" slot="icon">
      <span>C</span>
    </span>
    <span>Chip with icon</span>
  </paper-chip>

  <paper-chip removable>
    <span class="avatar" slot="icon">
      <span>R</span>
    </span>
    <span>Chip that can be removed</span>
  </paper-chip>

  <paper-chip removable disabled>
    <span class="avatar" slot="icon">
      <span>D</span>
    </span>
    <span>Disabled chip</span>
  </paper-chip>
</section>

<h2>Input chips</h2>
<section>
  <paper-chip removable>
    <iron-icon icon="communication:location-on" slot="icon"></iron-icon>
    <span>Portland</span>
  </paper-chip>

  <paper-chip removable>
    <iron-icon icon="maps:directions-bike" slot="icon"></iron-icon>
    <span>Biking</span>
  </paper-chip>
</section>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)
