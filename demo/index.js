import { html, render } from 'lit-html';
import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/paper-toast/paper-toast.js';
import '../paper-chip.js';

class DemoPage {
  constructor() {
    this._toggleAmenitiesFilter = this._toggleAmenitiesFilter.bind(this);
    this._toggleTypesChoice = this._toggleTypesChoice.bind(this);
    this._handleAction = this._handleAction.bind(this);

    this.amenities = [
      {label: 'Elevator'},
      {label: 'Washer / Dryer'},
      {label: 'Fireplace'},
      {label: 'Wheelchair access'},
      {label: 'Dogs ok'},
      {label: 'Cats ok'}
    ];
  }

  get types() {
    return [
      'Extra soft',
      'Soft',
      'Medium',
      'Hard',
      'Extra hard'
    ];
  }

  _toggleAmenitiesFilter(e) {
    const index = Number(e.target.dataset.index);
    if (isNaN(index)) {
      return;
    }
    const item = Object.assign({}, this.amenities[index]);
    item.selected = !item.selected;
    this.amenities[index] = item;
    this.render();
  }

  _toggleTypesChoice(e) {
    const selectedClass = 'iron-selected';
    const selected = document.querySelector('.types .' + selectedClass);
    if (selected) {
      selected.classList.remove(selectedClass);
    }
    e.currentTarget.classList.add(selectedClass);
  }

  _handleAction(e) {
    const action = e.currentTarget.dataset.action;
    if (!action) {
      return;
    }
    const toast = document.getElementById(action + 'Action');
    toast.opened = true;
  }

  get partsTestMessage() {
    const p = document.createElement('span');
    const hasParts = p.part !== undefined;
    return hasParts ? html`<p>Your browser support CSS Shadow Parts</p>` :
      html`<p>Your browser do not support CSS Shadow Parts</p>`;
  }

  render() {
    render(html`<div class="vertical-section-container centered" role="main">
      <h2>Basics</h2>
      <section class="demo line">
        <paper-chip>
          <span>Simple chip</span>
        </paper-chip>

        <paper-chip>
          <span class="avatar" slot="icon">
            <span>C</span>
          </span>
          Chip with icon
        </paper-chip>

        <paper-chip removable="">
          <span class="avatar" slot="icon">
            <span>R</span>
          </span>
          Chip that can be removed
        </paper-chip>

        <paper-chip removable="" disabled="">
          <span class="avatar" slot="icon">
            <span>D</span>
          </span>
          Disabled chip
        </paper-chip>
      </section>

      <h2>Input chips</h2>
      <section class="demo line">
        <paper-chip removable="">
          <iron-icon icon="communication:location-on" slot="icon"></iron-icon>
          Portland
        </paper-chip>

        <paper-chip removable="">
          <iron-icon icon="maps:directions-bike" slot="icon"></iron-icon>
          Biking
        </paper-chip>
      </section>

      <h2>Choice chips</h2>
      <section class="demo">
        <h3>Select type</h3>
        <div class="wrap-horizontal types">
        ${this.types.map((item) => html`<paper-chip @click="${this._toggleTypesChoice}">
          ${item}
        </paper-chip>`)}
        </div>
      </section>

      <h2>Filter chips</h2>
      <section class="demo">
        <h3>Choose amenities</h3>
        <div class="wrap-horizontal">
          ${this.amenities.map((item, index) => html`<paper-chip @click="${this._toggleAmenitiesFilter}"
            toggles data-index="${index}">
            ${item.selected ? html`<iron-icon icon="check" slot="icon"></iron-icon>` : ''}
            ${item.label}
          </paper-chip>`)}
        </div>
      </section>

      <h2>Action chips</h2>
      <section class="demo">
        <div class="wrap-horizontal actions">
          <paper-chip @click="${this._handleAction}" data-action="brightness">
            <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
            <span>Turn on lights</span>
          </paper-chip>

          <paper-chip @click="${this._handleAction}" data-action="alarm">
            <iron-icon icon="alarm" slot="icon"></iron-icon>
            <span>Set alarm</span>
          </paper-chip>

          <paper-chip @click="${this._handleAction}" data-action="clear">
            <iron-icon icon="communication:clear-all" slot="icon"></iron-icon>
            <span>Clear all</span>
          </paper-chip>
        </div>
      </section>

      <h2>Themed chips</h2>
      <section class="demo">
        <div class="wrap-horizontal actions">
          <div class="themed">
            <paper-chip>
              <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
              Styled text child
            </paper-chip>

            <paper-chip>
              <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
              <span>Styled element child</span>
            </paper-chip>
          </div>
        </div>
      </section>

      <h2>Themed chips with CSS parts</h2>
      ${this.partsTestMessage}
      <section class="demo">
        <div class="wrap-horizontal actions">
          <div class="themed-parts">
            <paper-chip removable>
              <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
              Styled with CSS parts
            </paper-chip>

            <paper-chip>
              <iron-icon icon="device:brightness-low" slot="icon"></iron-icon>
              <span>Also styled with parts</span>
            </paper-chip>
          </div>
        </div>
      </section>
    </div>

    <paper-toast id="brightnessAction" text="Turing lights on"></paper-toast>
    <paper-toast id="alarmAction" text="Setting the alarm"></paper-toast>
    <paper-toast id="clearAction" text="Clearing all actions"></paper-toast>`, document.querySelector('#demo'));
  }
}

window.addEventListener('chip-removed', (e) => {
  e.target.parentNode.removeChild(e.target);
});

const instance = new DemoPage();
instance.render();
window._demo = instance;
