import { LitElement, html, css } from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';
/**
 * `paper-chip`
 *
 * A compact material design element that represent and input, attribute, or action.
 *
 * A chip contains a label and optionally an icon and remove icon.
 *
 * Remove icon is predefined. However icon can be any HTML element with
 * `slot="icon"` attribute. Per material design guidelines the icon is rounded.
 *
 * ## Example
 *
 * ```html
 * <paper-chip removable>
 *  <iron-icon icon="maps:directions-bike" slot="icon"></iron-icon>
 *  Biking
 * </paper-chip>
 * ```
 *
 * The "Bliking" is the label rendered next to the icon. The chip also renders
 * built-in remove icon. Clicking on the icon dispatches `chip-removed`
 * custom event only. It does not remove the chip from the document as the
 * application logic might use different ways of removing elements from dom
 * than web platform APIs.
 *
 * ## Styling
 *
 * `<paper-chip>` provides the following custom properties for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--paper-chip-background-color` | Chip background color | `rgba(35, 47, 52, 0.12)`
 * `--paper-chip-focused-background-color` | Background color when focused | `#D6D6D6`
 * `--paper-chip-active-background-color` | Background color when toggle is active | `#cdcdcd`
 * `--paper-chip-icon-color` | Color of the icon | `#666666`
 * `--paper-chip-label-color` | Color of the label | `#232F34`
 * `--paper-chip-label-focused-color` | Color of the when focused | ``
 * `--paper-chip-label-active-color` | Color of the when active | ``
 * `--paper-chip-icon-close-color` | Color of the close icon | `#dfdfdf`
 * `--paper-chip-icon-close-background-color` | Background color of the close icon | `#666666`
 *
 * `<paper-chip>` provides the following [parts](https://www.w3.org/TR/css-shadow-parts-1/):
 *
 * Part name | Description
 * ----------------|-------------
 * `paper-chip-container` | Styles applied to the chip container
 * `paper-chip-icon` | Styles applied to the icon container
 * `paper-chip-label` | Styles applied to the label container
 * `paper-chip-remove` | Styles applied to the delete icon
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 */
export class PaperChip extends LitElement {
  static get styles() {
    return css`:host {
      display: inline-block;
      outline: none;
      cursor: default;
      margin: 4px;
      box-sizing: border-box;
    }

    .container {
      border-radius: 16px;
      background-color: var(--paper-chip-background-color, rgba(35, 47, 52, 0.12));
      height: inherit;
      min-height: 32px;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);

      display: flex;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-align: center;
      align-items: center;
    }

    :host([focused]) .container {
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                  0 1px 5px 0 rgba(0, 0, 0, 0.12),
                  0 3px 1px -2px rgba(0, 0, 0, 0.2);
      background-color: var(--paper-chip-focused-background-color, #D6D6D6);
    }

    :host([active]) .container {
      background-color: var(--paper-chip-active-background-color, #cdcdcd);
    }

    :host([toggles]) {
      cursor: pointer;
    }

    :host([disabled]) {
      opacity: 0.54;
      pointer-events: none;
    }

    .icon ::slotted([slot=icon]) {
      border-radius: 50%;
      margin: 4px 0 4px 6px;
      color: var(--paper-chip-icon-color, #666666);
    }

    .label {
      display: inline-block;
      padding: 0px 8px;
      margin-left: 12px;
      margin-right: 12px;
      font-size: var(--arc-font-body2-font-size);
      font-weight: var(--arc-font-body2-font-weight);
      line-height: var(--arc-font-body2-line-height);
      color: var(--paper-chip-label-color, #232F34);
    }

    .label ::slotted([slot]) {
      font-size: var(--arc-font-body2-font-size);
      font-weight: var(--arc-font-body2-font-weight);
      line-height: var(--arc-font-body2-line-height);
      color: var(--paper-chip-label-color, #232F34);
    }

    :host([focused]) ::slotted([slot]),
    :host([focused]) .label {
      color: var(--paper-chip-label-focused-color);
    }

    :host([active]) ::slotted([slot]),
    :host([active]) .label {
      color: var(--paper-chip-label-active-color);
    }

    .with-icon .label {
      margin-left: 0;
    }

    .with-remove .label {
      margin-right: 0;
    }

    .close {
      width: 16px;
      height: 16px;
      background-color: var(--paper-chip-icon-close-background-color, #666666);
      color: var(--paper-chip-icon-close-color, #dfdfdf);
      border-radius: 50%;
      margin-right: 6px;
      cursor: pointer;
    }`;
  }

  static get properties() {
    return {
      /**
       * If set the chip can be removed.
       * The element does not remove itself from the DOM. It rather dispatch
       * `chip-removed` custom event to inform parent element about the action.
       */
      removable: { type: Boolean },
      /**
       * A name of the icon to render when `removable` property is set.
       * By default it referes to Polymer's default icons library, to the
       * `clear` icon. You must include this library into your document.
       * You can also use whatever other icons library.
       */
      removeIcon: { type: String },

      _hasIconNode: { type: Boolean },
      /**
       * If true, the user cannot interact with this element.
       */
      disabled: { type: Boolean, reflect: true },
      /**
       * If true, the button toggles the active state with each click or press
       * of the spacebar or enter.
       */
      toggles: { type: Boolean, reflect: true }
    };
  }

  set disabled(value) {
    this.__disabled = value;
    this._disabledChanged(value);
  }
  /**
   * @return {Boolean} True if the button is in disabled state.
   */
  get disabled() {
    return this.__disabled;
  }
  /**
   * @return {Boolean} True if the button is currently in active state. Only
   * available if the button `toggles`.
   */
  get active() {
    return this.__active;
  }

  get _active() {
    return this.__active;
  }

  set _active(value) {
    this.__active = value;
    this.__activeChanged(value);
  }
  /**
   * @return {Boolean} True if the button is currently in focused state.
   */
  get focused() {
    return this.__focused || false;
  }

  get _focused() {
    return this.__focused;
  }

  set _focused(value) {
    this.__focused = value;
    if (value && !this.hasAttribute('focused')) {
      this.setAttribute('focused', '');
    } else if (!value && this.hasAttribute('focused')) {
      this.removeAttribute('focused');
    }
  }

  _iconSlotTemplate() {
    return html`<span part="paper-chip-icon" class="icon"><slot name="icon"></slot></span>`;
  }

  _removeTemplate() {
    if (!this.removable) {
      return '';
    }
    return html`<iron-icon
      part="paper-chip-remove"
      class="close"
      icon="${this.removeIcon}"
      @click="${this._removeHandler}"></iron-icon>`;
  }

  render() {
    const containerClass = this._computeContainerClass(this._hasIconNode, this.removable);
    return html`<div part="paper-chip-container" class="container ${containerClass}">
      ${this._iconSlotTemplate()}
      <span part="paper-chip-label" class="label"><slot></slot></span>
      ${this._removeTemplate()}
    </div>`;
  }
  /**
   * @return {HTMLElement} Reference to the icon slot element.
   */
  get _iconSlot() {
    return this.shadowRoot.querySelector('slot[name="icon"]');
  }

  constructor() {
    super();
    this.removeIcon = 'clear';
    this._keyDownHandler = this._keyDownHandler.bind(this);
    this._focusBlurHandler = this._focusBlurHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    /* istanbul ignore else */
    if (this.__active === undefined) {
      this._active = false;
    }
    this._addSlotEvent();
    this.addEventListener('keydown', this._keyDownHandler, true);
    this.addEventListener('focus', this._focusBlurHandler, true);
    this.addEventListener('blur', this._focusBlurHandler, true);
    this.addEventListener('click', this._clickHandler, true);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
    this.removeEventListener('keydown', this._keyDownHandler);
    this.removeEventListener('focus', this._focusBlurHandler);
    this.removeEventListener('blur', this._focusBlurHandler);
    this.removeEventListener('click', this._clickHandler);
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.__firstUpdated = true;
    this._addSlotEvent();
  }

  /**
   * Adds the `slotchange` event listener to the icon slot.
   */
  _addSlotEvent() {
    if (!this.__firstUpdated) {
      return;
    }
    this._iconSlot.addEventListener('slotchange', () => this._detectHasIcon());
  }

  /**
   * Handler for remove icon click event.
   * Cancels the event and calls `remove()`
   *
   * @param {ClickEvent} e
   */
  _removeHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    this.remove();
  }

  /**
   * Dispatches `chip-remove` custom event to inform application
   * that the user requested to remove the item.
   *
   * Note, this does not check if `removable` is set.
   */
  remove() {
    this._active = false;
    this.dispatchEvent(new CustomEvent('chip-removed', {
      composed: true,
      bubbles: true
    }));
  }
  /**
   * According to material design spec, when there's no icon the
   * left hand side padding should be 12dp. Slotted styling API does now
   * allow to detect when there's no contect so it has to be done using
   * node observer.
   */
  _detectHasIcon() {
    const nodes = this._iconSlot.assignedNodes()
      .filter((node) => node.nodeType === Node.ELEMENT_NODE);
    this._hasIconNode = !!nodes.length;
  }
  /**
   * Computes class name for the container.
   * @param {Boolean} hasIconNode True if the element has an icon in the light DOM.
   * @param {Boolean} removable True if the element can be removed.
   * @return {String} Class name.
   */
  _computeContainerClass(hasIconNode, removable) {
    let klass = '';
    if (hasIconNode) {
      klass += 'with-icon';
    }
    if (removable) {
      if (klass) {
        klass += ' ';
      }
      klass += 'with-remove';
    }
    return klass;
  }
  /**
   * Handler for key down when element is focused.
   * Removes the item when delete key is pressed.
   * @param {KeyboardEvent} e
   */
  _keyDownHandler(e) {
    if (this.removable && (e.key === 'Backspace' || e.key === 'Delete')) {
      this.remove();
    } else if (e.key === ' ' || e.key === 'Enter') {
      this._clickHandler();
      this._asyncClick();
    }
  }
  /**
   * Sets state of the `focused` property depending on the event handled by this
   * listener.
   * @param {Event} e Either focus or blur events
   */
  _focusBlurHandler(e) {
    this._focused = e.type === 'focus';
  }
  /**
   * Calles when the value of `disabled` property change. Sets `aria-disabled`
   * and `tabIndex` attributes.
   * @param {Boolean} disabled Current value of `disabled` property.
   */
  _disabledChanged(disabled) {
    this.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    this.style.pointerEvents = disabled ? 'none' : '';
    if (disabled) {
      // Read the `tabindex` attribute instead of the `tabIndex` property.
      // The property returns `-1` if there is no `tabindex` attribute.
      // This distinction is important when restoring the value because
      // leaving `-1` hides shadow root children from the tab order.
      this._oldTabIndex = this.getAttribute('tabindex');
      this._focused = false;
      this.setAttribute('tabindex', -1);
      this.blur();
    } else if (this._oldTabIndex !== undefined) {
      if (this._oldTabIndex === null) {
        this.removeAttribute('tabindex');
      } else {
        this.setAttribute('tabindex', this._oldTabIndex);
      }
    }
  }
  /**
   * Handles click event (as well as Space and Enter key down) as sets the
   * `active` property.
   */
  _clickHandler() {
    if (this.toggles) {
      this._userActivate(!this._active);
    } else if (this._active) {
      this._active = false;
    }
  }
  /**
   * Sets `_active` property depending on the input and current state of `_active`.
   * @param {Boolean} active The value to set.
   */
  _userActivate(active) {
    if (this._active !== active) {
      this._active = active;
    }
  }
  /**
   * Calls `clic()` function on this element so event listeners can handle
   * the action.
   */
  _asyncClick() {
    setTimeout(() => {
      this.click();
    }, 1);
  }
  /**
   * Called when the `active` value change.
   * It sets `active` attribute and, if the button toggles, `aria-pressed` attribute.
   * @param {Boolean} active Current state of `active`./
   */
  __activeChanged(active) {
    if (active) {
      if (!this.hasAttribute('active')) {
        this.setAttribute('active', '');
      }
    } else {
      if (this.hasAttribute('active')) {
        this.removeAttribute('active');
      }
    }
    if (this.toggles) {
      this.setAttribute('aria-pressed', active ? 'true' : 'false');
    } else {
      if (this.hasAttribute('aria-pressed')) {
        this.removeAttribute('aria-pressed');
      }
    }
  }
  /**
   * Dispatched when the user clicked on "remove" button or when `remove()`
   * function is called.
   * The event bubbles through shadow DOM.
   *
   * @event chip-removed
   */
}
