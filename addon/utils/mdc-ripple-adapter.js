import { get } from '@ember/object';
import { run } from '@ember/runloop';
import getElementProperty from '../utils/get-element-property';
import { util } from '@material/ripple';

const MATCHES = util.getMatchesProperty(HTMLElement.prototype);

/**
 * @param {Ember.Component} component - The component must mix in {@link MDCComponent}
 * @param {Object} overrides
 * @returns {Object}
 */
export const createRippleAdapter = (component, overrides) =>
  Object.assign(
    {
      browserSupportsCssVars: () => util.supportsCssVariables(window),
      isUnbounded: () => false,
      isSurfaceActive: () => get(component, 'element')[MATCHES](':active'),
      isSurfaceDisabled: () => get(component, 'disabled'),
      addClass: className => run(() => get(component, 'mdcClasses').addObject(className)),
      removeClass: className => run(() => get(component, 'mdcClasses').removeObject(className)),
      containsEventTarget: target => get(component, 'element') && get(component, 'element').contains(target),
      registerInteractionHandler: (evtType, handler) => component.registerMdcInteractionHandler(evtType, handler),
      deregisterInteractionHandler: (evtType, handler) => component.deregisterMdcInteractionHandler(evtType, handler),
      registerDocumentInteractionHandler: (evtType, handler) => window.document.addEventListener(evtType, handler),
      deregisterDocumentInteractionHandler: (evtType, handler) => window.document.removeEventListener(evtType, handler),
      registerResizeHandler: handler => window.addEventListener('resize', handler),
      deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
      updateCssVariable: (varName, value) => component.setStyleFor('mdcStyles', varName, value),
      computeBoundingRect: () =>
        getElementProperty(component, 'getBoundingClientRect', () => ({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: 0,
          height: 0,
        }))(),
      getWindowPageOffset: () => ({ x: window.pageXOffset, y: window.pageYOffset }),
    },
    overrides
  );

export default createRippleAdapter;
