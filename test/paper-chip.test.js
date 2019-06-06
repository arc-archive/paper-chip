import { fixture, assert } from '@open-wc/testing';
import '../paper-chip.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('<paper-chip>', function() {
  async function basicFixture() {
    return /** @type {PaperChip} */ (await fixture('<paper-chip>test label</paper-chip>'));
  }

  async function removableFixture() {
    return /** @type {PaperChip} */ (await fixture('<paper-chip removable>test label</paper-chip>'));
  }

  async function withLabelFixture() {
    return /** @type {PaperChip} */ (await fixture('<paper-chip>My label</paper-chip>'));
  }

  async function withIconFixture() {
    return /** @type {PaperChip} */ (await fixture(`<paper-chip>
      <span class="avatar" slot="icon">C</span>
      <span>My label</span>
    </paper-chip>`));
  }

  async function roleFixture() {
    return /** @type {PaperChip} */ (await fixture(`<paper-chip role="radio"></paper-chip>`));
  }

  async function togglesFixture() {
    return /** @type {PaperChip} */ (await fixture(`<paper-chip removable toggles>test label</paper-chip>`));
  }

  async function disabledFixture() {
    return /** @type {PaperChip} */ (await fixture(`<paper-chip disabled>test label</paper-chip>`));
  }

  async function tabIndexFixture() {
    return /** @type {PaperChip} */ (await fixture(`<paper-chip tabindex="1">test label</paper-chip>`));
  }

  async function flush() {
    return new Promise((resolve) => {
      setTimeout(() => resolve());
    });
  }

  describe('Basics', () => {
    let element;

    it('_hasIconNode is not computed', async () => {
      element = await basicFixture();
      assert.isUndefined(element._hasIconNode);
    });

    it('Close icon is not rendered', async () => {
      element = await basicFixture();
      const node = element.shadowRoot.querySelector('.close');
      assert.notOk(node);
    });

    it('Adds icon when removable', async () => {
      element = await removableFixture();
      const node = element.shadowRoot.querySelector('.close');
      assert.ok(node);
    });

    it('Container has no additional class names for label only', async () => {
      element = await withLabelFixture();
      const node = element.shadowRoot.querySelector('.container');
      assert.isFalse(node.classList.contains('with-remove'));
      assert.isFalse(node.classList.contains('with-icon'));
    });

    it('Container has with-remove class for removable', async () => {
      element = await removableFixture();
      const node = element.shadowRoot.querySelector('.container');
      assert.isTrue(node.classList.contains('with-remove'));
    });

    it('Container has with-icon class for icon', async () => {
      element = await withIconFixture();
      const node = element.shadowRoot.querySelector('.container');
      assert.isTrue(node.classList.contains('with-icon'));
    });

    it('_hasIconNode is computed when icon is set', async () => {
      element = await withIconFixture();
      assert.isTrue(element._hasIconNode);
    });

    it('_hasIconNode is computed when icon is removed', async () => {
      element = await withIconFixture();
      const node = element.querySelector('.avatar');
      node.parentNode.removeChild(node);
      await flush();
      assert.isFalse(element._hasIconNode);
    });

    it('Sets disabled property to undefined when not previously set', async () => {
      element = await basicFixture();
      assert.isUndefined(element.disabled);
    });

    it('Sets disabled property to true', async () => {
      element = await disabledFixture();
      assert.isTrue(element.disabled);
    });

    it('Sets disabled property to false', async () => {
      element = await disabledFixture();
      element.removeAttribute('disabled');
      assert.isFalse(element.disabled);
    });
  });

  describe('remove()', () => {
    let element;
    it('Dispatches `chip-removed` custom event', async () => {
      element = await removableFixture();
      const spy = sinon.spy();
      element.addEventListener('chip-removed', spy);
      const node = element.shadowRoot.querySelector('.close');
      node.click();
      assert.isTrue(spy.called);
    });

    it('Chip is not active when removed', async () => {
      element = await togglesFixture();
      const node = element.shadowRoot.querySelector('.close');
      node.click();
      assert.isFalse(element.active);
    });
  });

  describe('_detectHasIcon()', () => {
    let element;
    it('Computes value when no icon', async () => {
      element = await basicFixture();
      element._detectHasIcon();
      assert.isFalse(element._hasIconNode);
    });

    it('Computes value when icon', async () => {
      element = await withIconFixture();
      element._detectHasIcon();
      assert.isTrue(element._hasIconNode);
    });
  });

  describe('_keyDownHandler()', () => {
    let element;

    [
      ['Backspace', 'remove'],
      ['Delete', 'remove'],
      [' ', '_clickHandler'],
      ['Enter', '_clickHandler'],
      [' ', '_asyncClick'],
      ['Enter', '_asyncClick']
    ].forEach((item) => {
      it(`Calls ${item[1]}() when backspace key`, async () => {
        element = await removableFixture();
        const spy = sinon.spy(element, item[1]);
        element._keyDownHandler({
          key: item[0]
        });
        assert.isTrue(spy.called);
      });
    });

    it('Ignores other keys', async () => {
      element = await removableFixture();
      const spy1 = sinon.spy(element, 'remove');
      const spy2 = sinon.spy(element, '_clickHandler');
      element._keyDownHandler({
        key: 'E'
      });
      assert.isFalse(spy1.called);
      assert.isFalse(spy2.called);
    });
  });

  describe('_computeContainerClass()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('Returns empty string when no attributes', () => {
      const result = element._computeContainerClass();
      assert.equal(result, '');
    });

    it('Adds "with-icon"', () => {
      const result = element._computeContainerClass(true);
      assert.equal(result, 'with-icon');
    });

    it('Adds "with-remove"', () => {
      const result = element._computeContainerClass(false, true);
      assert.equal(result, 'with-remove');
    });

    it('Adds both', () => {
      const result = element._computeContainerClass(true, true);
      assert.equal(result, 'with-icon with-remove');
    });
  });

  describe('_focusBlurHandler()', () => {
    let element;
    before(async () => {
      element = await basicFixture();
    });

    it('Sets "focused" when event type is focus', () => {
      element._focusBlurHandler({
        type: 'focus'
      });
      assert.isTrue(element.focused);
    });

    it('Removes "focused" when event type is not focus', () => {
      element._focusBlurHandler({
        type: 'blur'
      });
      assert.isFalse(element.focused);
    });

    it('Sets "focused" property for focus event', () => {
      const e = new CustomEvent('focus', {});
      element.dispatchEvent(e);
      assert.isTrue(element.focused);
    });

    it('Removes "focused" property for blur event', async () => {
      element.dispatchEvent(new CustomEvent('focus', {}));
      await flush();
      element.dispatchEvent(new CustomEvent('blur', {}));
      assert.isFalse(element.focused);
    });

    it('Sets "focused" attribute for focus event', () => {
      const e = new CustomEvent('focus', {});
      element.dispatchEvent(e);
      assert.isTrue(element.hasAttribute('focused'));
    });

    it('Removes "focused" attribute for blur event', async () => {
      element.dispatchEvent(new CustomEvent('focus', {}));
      await flush();
      element.dispatchEvent(new CustomEvent('blur', {}));
      assert.isFalse(element.hasAttribute('focused'));
    });
  });

  describe('_iconSlot getter', () => {
    it('Returns reference to icon slot', async () => {
      const element = await basicFixture();
      const ref = element._iconSlot;
      assert.ok(ref);
      assert.equal(ref.nodeName, 'SLOT');
    });
  });

  describe('_disabledChanged()', () => {
    it('Sets aria-disabled when disabled', async () => {
      const element = await basicFixture();
      element.disabled = true;
      assert.isTrue(element.hasAttribute('aria-disabled'));
      assert.equal(element.getAttribute('aria-disabled'), 'true');
    });

    it('Sets aria-disabled when not disabled', async () => {
      const element = await disabledFixture();
      element.disabled = false;
      assert.isTrue(element.hasAttribute('aria-disabled'));
      assert.equal(element.getAttribute('aria-disabled'), 'false');
    });

    it('Sets pointer events style when disabled', async () => {
      const element = await basicFixture();
      element.disabled = true;
      const value = element.style.pointerEvents.trim().toLowerCase();
      assert.equal(value, 'none');
    });

    it('Re-sets pointer events style when not disabled', async () => {
      const element = await disabledFixture();
      element.disabled = false;
      const value = element.style.pointerEvents.trim();
      assert.equal(value, '');
    });

    it('Sets tabindex to -1 when disabled', async () => {
      const element = await tabIndexFixture();
      element.disabled = true;
      assert.equal(element.getAttribute('tabindex'), '-1');
    });

    it('Sets _oldTabIndex property when disabled', async () => {
      const element = await tabIndexFixture();
      element.disabled = true;
      assert.equal(element._oldTabIndex, '1');
    });

    it('Removes focused state when disabled', async () => {
      const element = await basicFixture();
      element._focused = true;
      element.disabled = true;
      assert.isFalse(element._focused);
    });

    it('Calls blur() when disabled', async () => {
      const element = await basicFixture();
      const spy = sinon.spy(element, 'blur');
      element.disabled = true;
      assert.isTrue(spy.called);
    });

    it('Restors tabindex when not disabled', async () => {
      const element = await tabIndexFixture();
      element.disabled = true;
      await flush();
      element.disabled = false;
      assert.equal(element.getAttribute('tabindex'), '1');
    });

    it('Removes tabindex when not disabled and was not set previously', async () => {
      const element = await basicFixture();
      // tabindex is added when missing when element is created
      element.removeAttribute('tabindex');
      element.disabled = true;
      await flush();
      element.disabled = false;
      assert.isFalse(element.hasAttribute('tabindex'));
    });

    it('Does nothing otherwise', async () => {
      const element = await basicFixture();
      element._disabledChanged(false);
      // coverage
    });
  });

  describe('_clickHandler()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Calls _userActivate() with when toggles and not active', () => {
      const spy = sinon.spy(element, '_userActivate');
      element.toggles = true;
      element._clickHandler();
      assert.isTrue(spy.args[0][0]);
    });

    it('Calls _userActivate() with false when toggles and active', () => {
      const spy = sinon.spy(element, '_userActivate');
      element._active = true;
      element.toggles = true;
      element._clickHandler();
      assert.isFalse(spy.args[0][0]);
    });

    it('Sets active to false when not toggles and active', () => {
      element._active = true;
      element._clickHandler();
      assert.isFalse(element.active);
    });

    it('Does nothing otherwise', () => {
      element._clickHandler();
      // It's for coverage
      assert.isFalse(element.active);
    });
  });

  describe('_userActivate()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Does nothing if "active" equals argument', () => {
      element._active = true;
      element._userActivate(true);
      assert.isTrue(element.active);
      // It's for coverage
    });

    it('Updates "active" value', () => {
      element._active = true;
      element._userActivate(false);
      assert.isFalse(element.active);
      // It's for coverage
    });
  });

  describe('_asyncClick()', () => {
    it('Calls click() with a delay', async () => {
      const element = await basicFixture();
      const spy = sinon.spy(element, 'click');
      element._asyncClick();
      await flush();
      assert.isTrue(spy.called);
    });
  });

  describe('__activeChanged()', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Adds active attribute when true and has none', () => {
      element.__activeChanged(true);
      assert.isTrue(element.hasAttribute('active'));
    });

    it('Does nothing when true and has attribute', () => {
      element.setAttribute('active', '');
      element.__activeChanged(true);
      assert.isTrue(element.hasAttribute('active'));
      // Coverage
    });

    it('Removes active attribute when false and has one', () => {
      element.setAttribute('active', '');
      element.__activeChanged(false);
      assert.isFalse(element.hasAttribute('active'));
    });

    it('Does nothing when false and has no attribute', () => {
      element.__activeChanged(false);
      assert.isFalse(element.hasAttribute('active'));
      // Coverage
    });

    it('Removes aria-pressed attribute when not toggles', () => {
      element.setAttribute('aria-pressed', 'true');
      element.__activeChanged(false);
      assert.isFalse(element.hasAttribute('aria-pressed'));
    });

    it('Does nothing when not toggles and no aria-pressed', () => {
      element.__activeChanged(false);
      assert.isFalse(element.hasAttribute('aria-pressed'));
      // For coverage
    });

    it('Sets aria-pressed to true', () => {
      element.toggles = true;
      element.__activeChanged(true);
      assert.equal(element.getAttribute('aria-pressed'), 'true');
    });

    it('Sets aria-pressed to false', () => {
      element.toggles = true;
      element.__activeChanged(false);
      assert.equal(element.getAttribute('aria-pressed'), 'false');
    });
  });

  describe('Aria', () => {
    it('Sets default tabindex', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('tabindex'), '0');
    });

    it('Respects existing tabindex', async () => {
      const element = await tabIndexFixture();
      assert.equal(element.getAttribute('tabindex'), '1');
    });

    it('Sets default role', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('role'), 'button');
    });

    it('Respects existing role', async () => {
      const element = await roleFixture();
      assert.equal(element.getAttribute('role'), 'radio');
    });
  });
});
